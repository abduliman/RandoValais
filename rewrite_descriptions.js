const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = 'https://www.valais.ch';
const LIST_URLS = [
  'https://www.valais.ch/fr/explorer/activites/randonnees/bisses',
  'https://www.valais.ch/fr/explorer/activites/randonnees/bisses?page=2'
];

function makeEngaging(text) {
  if (!text || text.length < 10) return text;
  
  // Clean text
  let cleaned = text.replace(/\n+/g, ' ').replace(/\s{2,}/g, ' ').trim();
  
  // Create an engaging wrapper
  let engaging = `✨ <strong>Une aventure inoubliable vous attend !</strong><br><br>`;
  engaging += cleaned;
  
  // Add some bolding to key positive words to make it marketing-friendly
  const positiveWords = ['magnifique', 'spectaculaire', 'incroyable', 'exceptionnel', 'panoramique', 'superbe', 'incontournable', 'idyllique', 'sauvage'];
  positiveWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    engaging = engaging.replace(regex, `<strong>${word}</strong>`);
  });

  return engaging;
}

async function run() {
  console.log("Loading data.js...");
  const dataJsPath = 'js/data.js';
  let dataJsContent = fs.readFileSync(dataJsPath, 'utf8');
  
  // Extract HIKES array
  const hikesMatch = dataJsContent.match(/const HIKES = (\[[\s\S]*?\]);\n/);
  if (!hikesMatch) {
    console.error("Could not find HIKES array in data.js");
    return;
  }
  
  const HIKES = eval(hikesMatch[1]);
  
  console.log("Fetching all bisse detail URLs...");
  const urlMap = new Map();
  for (const listUrl of LIST_URLS) {
    try {
      const res = await axios.get(listUrl);
      const $ = cheerio.load(res.data);
      $('a[href*="/explorer/activites/randonnees/bisses/"]').each((i, el) => {
        const href = $(el).attr('href');
        let title = $(el).find('h3, h2, h4, .title').text().trim();
        if (!title) title = $(el).find('h1').text().trim() || $(el).text().trim().split('\n')[0].trim();
        if (href) {
          urlMap.set(title.toLowerCase(), href.startsWith('http') ? href : BASE_URL + href);
        }
      });
    } catch (e) {
      console.error("Error fetching list:", listUrl);
    }
  }
  
  console.log(`Found ${urlMap.size} URLs to process.`);
  
  let updatedCount = 0;
  
  for (const hike of HIKES) {
    const nameFr = hike.name.fr.toLowerCase();
    
    // Try to find matching URL
    let matchUrl = urlMap.get(nameFr);
    
    // Fuzzy match if exact fails
    if (!matchUrl) {
      for (const [key, val] of urlMap.entries()) {
        if (key.includes(nameFr) || nameFr.includes(key)) {
          matchUrl = val;
          break;
        }
      }
    }
    
    if (matchUrl) {
      console.log(`Scraping full text for: ${hike.name.fr}`);
      try {
        const res = await axios.get(matchUrl);
        const $ = cheerio.load(res.data);
        
        // Extract main text (usually in .page-content, .text-block, or main paragraphs)
        let fullText = '';
        $('.ce-text p, .activity-detail__text p, .text-block p, article p').each((i, el) => {
          const pText = $(el).text().trim();
          if (pText.length > 50 && !pText.includes('Voir plus')) {
            fullText += pText + '\n\n';
          }
        });
        
        if (fullText.trim().length > 100) {
          const rewritten = makeEngaging(fullText);
          hike.description.fr = rewritten;
          hike.description.de = rewritten; // fallback
          hike.description.en = rewritten; // fallback
          updatedCount++;
        } else {
          console.log(`  -> Warning: No long text found for ${hike.name.fr}`);
        }
        
      } catch (e) {
        console.error(`Error scraping ${matchUrl}:`, e.message);
      }
      
      // Be polite
      await new Promise(r => setTimeout(r, 400));
    }
  }
  
  if (updatedCount > 0) {
    // Reconstruct data.js
    console.log(`Successfully updated ${updatedCount} descriptions.`);
    const newHikesStr = 'const HIKES = ' + JSON.stringify(HIKES, null, 2) + ';\n';
    dataJsContent = dataJsContent.replace(/const HIKES = \[[\s\S]*?\];\n/, newHikesStr);
    fs.writeFileSync(dataJsPath, dataJsContent);
    console.log("data.js saved!");
  } else {
    console.log("No descriptions were updated.");
  }
}

run();
