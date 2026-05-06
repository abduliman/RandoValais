const axios = require('axios');
const cheerio = require('cheerio');
axios.get('https://www.valais.ch/fr/explorer/activites/randonnees/itineraires/chemin-du-vin-venthone-leuk-etape-4').then(res => {
  const $ = cheerio.load(res.data);
  $('a').each((i, el) => {
    const href = $(el).attr('href');
    if (href && href.includes('download')) {
      console.log('Download link found:', href);
    }
  });
});
