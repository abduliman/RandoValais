const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const { DOMParser } = require('@xmldom/xmldom');

const BASE_URL = 'https://www.valais.ch';
const START_URLS = [];
for (let i = 1; i <= 15; i++) START_URLS.push(`https://www.valais.ch/fr/explorer/activites/randonnees/itineraires?page=${i}`);
for (let i = 1; i <= 5; i++) START_URLS.push(`https://www.valais.ch/fr/explorer/activites/randonnees/bisses?page=${i}`);

async function fetchAndSaveGPXAndKML(gpxUrl, id, nameStr) {
  const gpxDest = path.join(__dirname, 'assets', 'tracks', `${id}.gpx`);
  const kmlDest = path.join(__dirname, 'assets', 'tracks', `${id}.kml`);
  let trail = [];
  try {
    const res = await axios.get(gpxUrl);
    const gpxText = res.data;
    fs.writeFileSync(gpxDest, gpxText); 
    
    const doc = new DOMParser().parseFromString(gpxText, 'text/xml');
    const trkpts = doc.getElementsByTagName('trkpt');
    for (let i = 0; i < trkpts.length; i++) {
      const lat = parseFloat(trkpts[i].getAttribute('lat'));
      const lon = parseFloat(trkpts[i].getAttribute('lon'));
      if (!isNaN(lat) && !isNaN(lon)) trail.push([lat, lon]);
    }
    
    const sampled = [];
    const step = Math.max(1, Math.floor(trail.length / 500));
    for (let i = 0; i < trail.length; i += step) sampled.push(trail[i]);
    
    const coordsStr = trail.map(pt => `${pt[1]},${pt[0]},0`).join(' ');
    const kmlText = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>${nameStr}</name>
    <Placemark>
      <name>Itinéraire</name>
      <LineString>
        <coordinates>${coordsStr}</coordinates>
      </LineString>
    </Placemark>
  </Document>
</kml>`;
    fs.writeFileSync(kmlDest, kmlText);
    
    return sampled;
  } catch (err) {
    console.error("Error fetching GPX:", gpxUrl, err.message);
    return [];
  }
}

function cleanTitle(t) {
  return t.toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function run() {
  const urlMap = new Map();
  console.log("Fetching all list pages to map titles to URLs...");
  for (const listUrl of START_URLS) {
    try {
      const res = await axios.get(listUrl);
      const $ = cheerio.load(res.data);
      $('a').each((i, el) => {
        const href = $(el).attr('href');
        let title = $(el).find('h3, h2, h4, .title').text().trim();
        if (!title) title = $(el).find('h1').text().trim() || $(el).text().trim().split('\\n')[0].trim();
        if (href && (href.includes('/randonnees/itineraires/') || href.includes('/randonnees/bisses/'))) {
          urlMap.set(cleanTitle(title), href.startsWith('http') ? href : BASE_URL + href);
        }
      });
    } catch(e) {}
  }
  
  const dataJsPath = path.join(__dirname, 'js', 'data.js');
  let dataJsContent = fs.readFileSync(dataJsPath, 'utf8');
  
  const hikesMatch = dataJsContent.match(/const HIKES = (\[[\s\S]*?\]);\n/);
  if (!hikesMatch) return;
  const HIKES = eval(hikesMatch[1]);
  
  let updatedCount = 0;
  
  for (const hike of HIKES) {
    if (!hike.trail || hike.trail.length < 2) {
      console.log(`Missing trail for: ${hike.name.fr}`);
      
      let matchUrl = urlMap.get(cleanTitle(hike.name.fr));
      if (!matchUrl) {
        for (const [key, val] of urlMap.entries()) {
          if (key.length > 10 && (key.includes(cleanTitle(hike.name.fr)) || cleanTitle(hike.name.fr).includes(key))) {
            matchUrl = val; break;
          }
        }
      }
      
      if (matchUrl) {
        try {
          const res = await axios.get(matchUrl);
          const $ = cheerio.load(res.data);
          let gpxLink = '';
          $('a').each((i, el) => {
            const h = $(el).attr('href');
            if (h && (h.includes('download.tour.gpx') || h.includes('download/gpx') || h.includes('download'))) {
              if (h.includes('gpx') || h.includes('download.tour.gpx')) {
                gpxLink = h.startsWith('http') ? h : BASE_URL + h;
              }
            }
          });
          
          if (gpxLink) {
            console.log(`  -> Found GPX link! Downloading...`);
            const trail = await fetchAndSaveGPXAndKML(gpxLink, hike.id, hike.name.fr);
            if (trail.length > 0) {
              hike.trail = trail;
              hike.coords = trail[0];
              hike.gpxFile = `assets/tracks/${hike.id}.gpx`;
              hike.kmlFile = `assets/tracks/${hike.id}.kml`;
              updatedCount++;
            }
          } else {
            console.log(`  -> No GPX link found on page. (URL: ${matchUrl})`);
          }
        } catch(e) { console.error(`  -> Error parsing ${matchUrl}`); }
      } else {
        console.log(`  -> Could not find URL for hike.`);
      }
      await new Promise(r => setTimeout(r, 3000));
    }
  }
  
  if (updatedCount > 0) {
    console.log(`Successfully fixed ${updatedCount} trails!`);
    const newHikesStr = 'const HIKES = ' + JSON.stringify(HIKES, null, 2) + ';\n';
    dataJsContent = dataJsContent.replace(/const HIKES = \[[\s\S]*?\];/, newHikesStr);
    fs.writeFileSync(dataJsPath, dataJsContent);
  } else {
    console.log("No trails were updated.");
  }
}

run();
