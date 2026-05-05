const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const { DOMParser } = require('@xmldom/xmldom');

const BASE_URL = 'https://www.valais.ch';
const START_URLS = [
  'https://www.valais.ch/fr/explorer/activites/randonnees/bisses',
  'https://www.valais.ch/fr/explorer/activites/randonnees/bisses?page=2'
];

async function fetchGPX(gpxUrl) {
  try {
    const res = await axios.get(gpxUrl);
    const gpxText = res.data;
    const doc = new DOMParser().parseFromString(gpxText, 'text/xml');
    const trkpts = doc.getElementsByTagName('trkpt');
    const trail = [];
    for (let i = 0; i < trkpts.length; i++) {
      const lat = parseFloat(trkpts[i].getAttribute('lat'));
      const lon = parseFloat(trkpts[i].getAttribute('lon'));
      if (!isNaN(lat) && !isNaN(lon)) {
        trail.push([lat, lon]);
      }
    }
    // Return sampled trail to avoid huge files (take max 1000 points)
    const sampled = [];
    const step = Math.max(1, Math.floor(trail.length / 500));
    for (let i = 0; i < trail.length; i += step) {
      sampled.push(trail[i]);
    }
    return sampled;
  } catch (err) {
    console.error("Error fetching GPX:", gpxUrl, err.message);
    return [];
  }
}

async function scrapeHike(url) {
  try {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);
    
    const title = $('h1').first().text().trim() || $('title').text().split('|')[0].trim();
    
    // Attempt to extract Region from next to the title or specific tags
    const regionEl = $('.region-tag').text().trim() || $('h1').next().text().trim();
    const region = regionEl.length < 50 ? regionEl : 'Valais';

    let difficulty = 'Moyen'; // Default
    let distance = 0;
    let duration = '0h00';
    let up = 0;
    let down = 0;

    // The stats are usually in some specific format, let's search for keywords
    $('h6, h5, h4, h3, strong, p').each((i, el) => {
      const text = $(el).text().trim().toLowerCase();
      if (text.includes('difficulté')) {
        const val = $(el).next().text().trim().toLowerCase();
        if (val.includes('facile')) difficulty = 'Facile';
        if (val.includes('moyen')) difficulty = 'Moyen';
        if (val.includes('difficile') || val.includes('difficile')) difficulty = 'Difficile';
      }
      if (text.includes('distance')) {
        const val = $(el).next().text().trim();
        distance = parseFloat(val.replace(',', '.')) || 0;
      }
      if (text.includes('temps de marche') || text.includes('durée')) {
        duration = $(el).next().text().trim() || '0h00';
      }
      if (text.includes('dénivelé')) {
        const val = $(el).next().text().trim(); // "+129m, -650m"
        const mUp = val.match(/\+(\d+)/);
        const mDown = val.match(/\-(\d+)/);
        if (mUp) up = parseInt(mUp[1]);
        if (mDown) down = parseInt(mDown[1]);
      }
    });

    // We can also extract from text content directly if DOM isn't strictly sibling
    const fullText = $('body').text();
    if (fullText.includes('Facile')) difficulty = 'Facile';
    else if (fullText.includes('Difficile')) difficulty = 'Difficile';
    else difficulty = 'Moyen';

    // Description
    const description = $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content') || '';
    
    // Image
    let image = $('meta[property="og:image"]').attr('content');
    if (!image) {
      const hero = $('.hero img').first().attr('src');
      if (hero) image = hero.startsWith('http') ? hero : BASE_URL + hero;
    }
    if (!image) image = 'assets/images/placeholder.jpg';

    // GPX
    const gpxLink = $('a[href*="/download/gpx"]').attr('href');
    let trail = [];
    if (gpxLink) {
      const gpxUrl = gpxLink.startsWith('http') ? gpxLink : BASE_URL + gpxLink;
      trail = await fetchGPX(gpxUrl);
    }
    
    // Provide a default coordinate if GPX fails (Sion center)
    let coords = [46.22935, 7.35869]; 
    if (trail.length > 0) {
      coords = trail[0];
    }

    return {
      name: { fr: title, de: title, en: title },
      region: region.split('\n')[0].trim(),
      difficulty: difficulty,
      category: 'Bisses',
      duration: duration,
      distance: distance,
      elevation: { up, down },
      altitude: { min: 1000, max: 2000 },
      season: { fr: 'Juin - Octobre', de: 'Juni - Oktober', en: 'June - October' },
      coords: coords,
      trail: trail,
      description: { fr: description, de: description, en: description },
      access: { fr: 'En transport public', de: 'Mit öffentlichen Verkehrsmitteln', en: 'By public transport' },
      image: image
    };

  } catch (e) {
    console.error("Error scraping hike:", url, e.message);
    return null;
  }
}

async function run() {
  const allUrls = new Set();
  
  console.log("Fetching list pages...");
  for (const listUrl of START_URLS) {
    const res = await axios.get(listUrl);
    const $ = cheerio.load(res.data);
    $('a[href*="/explorer/activites/randonnees/bisses/"]').each((i, el) => {
      const href = $(el).attr('href');
      if (href) {
         allUrls.add(href.startsWith('http') ? href : BASE_URL + href);
      }
    });
  }
  
  const urls = Array.from(allUrls);
  console.log(`Found ${urls.length} bisses. Scraping details...`);
  
  const results = [];
  let idCounter = 200; // Start IDs at 200 to avoid collision
  
  for (let i = 0; i < urls.length; i++) {
    console.log(`Scraping ${i+1}/${urls.length}: ${urls[i]}`);
    const hike = await scrapeHike(urls[i]);
    if (hike) {
      hike.id = idCounter++;
      results.push(hike);
    }
    // Small delay to be polite
    await new Promise(r => setTimeout(r, 500));
  }
  
  fs.writeFileSync('new_bisses.json', JSON.stringify(results, null, 2));
  console.log(`Done! Saved ${results.length} bisses to new_bisses.json`);
}

run();
