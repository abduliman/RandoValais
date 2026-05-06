const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const { DOMParser } = require('@xmldom/xmldom');

const BASE_URL = 'https://www.valais.ch';
const START_URLS = [
  'https://www.valais.ch/fr/explorer/activites/randonnees/itineraires',
  'https://www.valais.ch/fr/explorer/activites/randonnees/itineraires?page=2',
  'https://www.valais.ch/fr/explorer/activites/randonnees/itineraires?page=3',
  'https://www.valais.ch/fr/explorer/activites/randonnees/itineraires?page=4'
];

function makeEngaging(text) {
  if (!text || text.length < 10) return text;
  let cleaned = text.replace(/\n+/g, ' ').replace(/\s{2,}/g, ' ').trim();
  let engaging = `✨ <strong>Une aventure inoubliable vous attend !</strong><br><br>` + cleaned;
  const positiveWords = ['magnifique', 'spectaculaire', 'incroyable', 'exceptionnel', 'panoramique', 'superbe', 'incontournable', 'idyllique', 'sauvage'];
  positiveWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    engaging = engaging.replace(regex, `<strong>${word}</strong>`);
  });
  return engaging;
}

async function downloadFile(url, dest) {
  try {
    const res = await axios({ url, responseType: 'stream' });
    const writer = fs.createWriteStream(dest);
    res.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (e) {
    console.error(`Failed to download ${url}: ${e.message}`);
  }
}

async function fetchAndSaveGPXAndKML(gpxUrl, id, nameStr) {
  const gpxDest = path.join(__dirname, 'assets', 'tracks', `${id}.gpx`);
  const kmlDest = path.join(__dirname, 'assets', 'tracks', `${id}.kml`);
  let trail = [];
  try {
    const res = await axios.get(gpxUrl);
    const gpxText = res.data;
    fs.writeFileSync(gpxDest, gpxText); // Save original GPX
    
    // Parse GPX for our interactive map
    const doc = new DOMParser().parseFromString(gpxText, 'text/xml');
    const trkpts = doc.getElementsByTagName('trkpt');
    for (let i = 0; i < trkpts.length; i++) {
      const lat = parseFloat(trkpts[i].getAttribute('lat'));
      const lon = parseFloat(trkpts[i].getAttribute('lon'));
      if (!isNaN(lat) && !isNaN(lon)) trail.push([lat, lon]);
    }
    
    // Sample trail
    const sampled = [];
    const step = Math.max(1, Math.floor(trail.length / 500));
    for (let i = 0; i < trail.length; i += step) sampled.push(trail[i]);
    
    // Generate simple KML and save it
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
    console.error("Error fetching/processing GPX:", gpxUrl, err.message);
    return [];
  }
}

async function scrapeHike(url, id) {
  try {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);
    
    const title = $('h1').first().text().trim() || $('title').text().split('|')[0].trim();
    const regionEl = $('.region-tag').text().trim() || $('h1').next().text().trim();
    const region = regionEl.length < 50 ? regionEl : 'Valais';

    let difficulty = 'Moyen';
    let distance = 0, duration = '0h00', up = 0, down = 0;

    $('h6, h5, h4, h3, strong, p').each((i, el) => {
      const text = $(el).text().trim().toLowerCase();
      if (text.includes('difficulté')) {
        const val = $(el).next().text().trim().toLowerCase();
        if (val.includes('facile')) difficulty = 'Facile';
        if (val.includes('moyen')) difficulty = 'Moyen';
        if (val.includes('difficile')) difficulty = 'Difficile';
      }
      if (text.includes('distance')) {
        distance = parseFloat($(el).next().text().trim().replace(',', '.')) || 0;
      }
      if (text.includes('temps de marche') || text.includes('durée')) {
        duration = $(el).next().text().trim() || '0h00';
      }
      if (text.includes('dénivelé')) {
        const val = $(el).next().text().trim();
        const mUp = val.match(/\+(\d+)/);
        const mDown = val.match(/\-(\d+)/);
        if (mUp) up = parseInt(mUp[1]);
        if (mDown) down = parseInt(mDown[1]);
      }
    });

    const fullText = $('body').text();
    if (fullText.includes('Facile') && difficulty === 'Moyen') difficulty = 'Facile';
    else if (fullText.includes('Difficile') && difficulty === 'Moyen') difficulty = 'Difficile';

    let rawDesc = '';
    $('.ce-text p, .activity-detail__text p, .text-block p, article p').each((i, el) => {
      const pText = $(el).text().trim();
      if (pText.length > 50 && !pText.includes('Voir plus')) rawDesc += pText + '\\n\\n';
    });
    const description = makeEngaging(rawDesc);

    let imgUrl = $('meta[property="og:image"]').attr('content');
    if (!imgUrl) {
      const hero = $('.hero img').first().attr('src');
      if (hero) imgUrl = hero.startsWith('http') ? hero : BASE_URL + hero;
    }
    
    let localImagePath = 'assets/images/placeholder.jpg';
    if (imgUrl) {
      const ext = imgUrl.split('.').pop().split('?')[0] || 'jpg';
      const imgName = `${id}.${ext}`;
      const dest = path.join(__dirname, 'assets', 'images', 'hikes', imgName);
      await downloadFile(imgUrl, dest);
      localImagePath = `assets/images/hikes/${imgName}`;
    }

    const gpxLink = $('a[href*="/download/gpx"]').attr('href');
    let trail = [], coords = [46.22, 7.35];
    if (gpxLink) {
      const gpxUrl = gpxLink.startsWith('http') ? gpxLink : BASE_URL + gpxLink;
      trail = await fetchAndSaveGPXAndKML(gpxUrl, id, title);
    }
    if (trail.length > 0) coords = trail[0];

    return {
      id: id,
      name: { fr: title, de: title, en: title },
      region: region.split('\\n')[0].trim(),
      difficulty: difficulty,
      category: 'Itinéraires',
      duration: duration,
      distance: distance,
      elevation: { up, down },
      altitude: { min: 1000, max: up > 0 ? 1000 + up : 2000 },
      season: { fr: 'Juin - Octobre', de: 'Juni - Oktober', en: 'June - October' },
      coords: coords,
      trail: trail,
      description: { fr: description, de: description, en: description },
      access: { fr: 'En transport public', de: 'Mit öffentlichen Verkehrsmitteln', en: 'By public transport' },
      image: localImagePath,
      gpxFile: trail.length > 0 ? `assets/tracks/${id}.gpx` : null,
      kmlFile: trail.length > 0 ? `assets/tracks/${id}.kml` : null
    };

  } catch (e) {
    console.error("Error scraping hike:", url, e.message);
    return null;
  }
}

async function run() {
  const allUrls = new Set();
  
  console.log("Fetching itinerary list pages...");
  for (const listUrl of START_URLS) {
    try {
      const res = await axios.get(listUrl);
      const $ = cheerio.load(res.data);
      $('a').each((i, el) => {
        const href = $(el).attr('href');
        if (href && href.includes('/randonnees/itineraires/')) {
          allUrls.add(href.startsWith('http') ? href : BASE_URL + href);
        }
      });
    } catch(e) { console.error("Error fetching list:", listUrl); }
  }
  
  let urls = Array.from(allUrls);
  if (urls.length > 40) urls = urls.slice(0, 40); // Limit to 40
  console.log(`Found ${urls.length} itineraries. Scraping details and downloading files...`);
  
  const results = [];
  let idCounter = 1; // Overwrite 1-37
  
  for (let i = 0; i < urls.length; i++) {
    console.log(`Scraping ${i+1}/${urls.length}: ${urls[i]}`);
    const hike = await scrapeHike(urls[i], idCounter);
    if (hike) {
      results.push(hike);
      idCounter++;
    }
    await new Promise(r => setTimeout(r, 500));
  }
  
  // Read existing data.js
  const dataJsPath = path.join(__dirname, 'js', 'data.js');
  let dataJsContent = fs.readFileSync(dataJsPath, 'utf8');
  
  // Extract existing HIKES array
  const hikesMatch = dataJsContent.match(/const HIKES = (\[[\s\S]*?\]);\n/);
  if (!hikesMatch) {
    console.error("Could not find HIKES array in data.js");
    return;
  }
  const existingHIKES = eval(hikesMatch[1]);
  
  // Keep only Bisses (ID >= 200)
  const bisses = existingHIKES.filter(h => h.id >= 200);
  
  // Combine new itineraries + old bisses
  const combinedHikes = [...results, ...bisses];
  
  console.log(`Successfully scraped ${results.length} new itineraries.`);
  console.log(`Total hikes in DB now: ${combinedHikes.length}`);
  
  const newHikesStr = 'const HIKES = ' + JSON.stringify(combinedHikes, null, 2) + ';\n';
  dataJsContent = dataJsContent.replace(/const HIKES = \[[\s\S]*?\];\n/, newHikesStr);
  fs.writeFileSync(dataJsPath, dataJsContent);
  console.log("data.js updated with new local assets!");
}

run();
