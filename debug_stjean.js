const axios = require('axios');
axios.get('https://www.valais.ch/fr/explorer/activites/randonnees/bisses/grand-bisse-de-st-jean').then(res => {
  const html = res.data;
  console.log('Contains gpx:', html.includes('.gpx') || html.includes('gpx'));
  console.log('Contains outdooractive:', html.includes('outdooractive'));
  console.log('Contains json:', html.includes('.json'));
  
  const m = html.match(/href="[^"]*gpx[^"]*"/g);
  console.log('GPX links:', m);
}).catch(e=>console.log(e.message));
