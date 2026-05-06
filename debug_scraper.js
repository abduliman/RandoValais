const axios = require('axios');
const cheerio = require('cheerio');

axios.get('https://www.valais.ch/fr/explorer/activites/randonnees/itineraires').then(res => {
  const $ = cheerio.load(res.data);
  const hrefs = new Set();
  $('a').each((i, el) => {
    const href = $(el).attr('href');
    if (href && href.includes('/randonnees/')) hrefs.add(href);
  });
  console.log(Array.from(hrefs).slice(0, 20));
});
