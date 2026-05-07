const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.valais.ch';
const WEBCAMS_PAGE = `${BASE_URL}/fr/webcams`;

async function getWebcamInfo(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    let lat, lng, img;
    const scriptTexts = [];
    $('script').each((i, el) => {
      const txt = $(el).html();
      if (txt) scriptTexts.push(txt);
    });
    for (const txt of scriptTexts) {
      const latMatch = txt.match(/latitude\s*[:=]\s*([0-9.+-]+)/i);
      const lngMatch = txt.match(/longitude\s*[:=]\s*([0-9.+-]+)/i);
      if (latMatch && lngMatch) {
        lat = parseFloat(latMatch[1]);
        lng = parseFloat(lngMatch[1]);
        break;
      }
    }
    const ogImg = $('meta[property="og:image"]').attr('content');
    img = ogImg || '';
    if (!img) {
      const imgTag = $('img').filter((i, el) => $(el).attr('src') && $(el).attr('src').includes('webcam'))[0];
      if (imgTag) img = $(imgTag).attr('src');
    }
    const name = $('h1').first().text().trim() || url.split('/').pop();
    return { name, url, lat, lng, img };
  } catch (e) {
    console.error('Error fetching webcam', url, e.message);
    return null;
  }
}

async function scrape() {
  console.log('Fetching webcam list…');
  const { data } = await axios.get(WEBCAMS_PAGE);
  const $ = cheerio.load(data);
  const links = new Set();
  $('a').each((i, el) => {
    const href = $(el).attr('href');
    if (href && href.includes('/webcams/') && !href.endsWith('/webcams')) {
      const full = href.startsWith('http') ? href : `${BASE_URL}${href}`;
      links.add(full);
    }
  });
  console.log(`Found ${links.size} webcam links.`);
  const webcams = [];
  for (const link of links) {
    const info = await getWebcamInfo(link);
    if (info && typeof info.lat === 'number' && typeof info.lng === 'number') {
      webcams.push(info);
    }
  }
  const outPath = path.join(__dirname, 'assets', 'webcams.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(webcams, null, 2), 'utf8');
  console.log(`Written ${webcams.length} webcams to ${outPath}`);
}

scrape();
