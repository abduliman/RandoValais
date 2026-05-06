const fs = require('fs');
const { DOMParser } = require('@xmldom/xmldom');

let data = fs.readFileSync('js/data.js', 'utf8');
const match = data.match(/const HIKES = (\[[\s\S]*?\]);\n\nconst DIFFICULTY/);

if(match) {
  let hikes = eval(match[1]);
  let updated = 0;
  
  hikes = hikes.map(h => {
    const gpxPath = 'assets/tracks/' + h.id + '.gpx';
    if(fs.existsSync(gpxPath)) {
      const gpxText = fs.readFileSync(gpxPath, 'utf8');
      const doc = new DOMParser().parseFromString(gpxText, 'text/xml');
      
      let pts = doc.getElementsByTagName('trkpt');
      if(!pts || pts.length === 0) {
        pts = doc.getElementsByTagName('rtept');
      }
      
      let trail = [];
      for(let i=0; i<pts.length; i++) {
        let lat = parseFloat(pts[i].getAttribute('lat'));
        let lon = parseFloat(pts[i].getAttribute('lon'));
        if(!isNaN(lat) && !isNaN(lon)) trail.push([lat, lon]);
      }
      
      if(trail.length > 1) {
        const sampled = [];
        const step = Math.max(1, Math.floor(trail.length / 500));
        for (let i = 0; i < trail.length; i += step) sampled.push(trail[i]);
        
        h.trail = sampled;
        h.coords = sampled[0];
        h.gpxFile = gpxPath;
        
        const coordsStr = sampled.map(pt => pt[1] + ',' + pt[0] + ',0').join(' ');
        const kmlText = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>${h.name.fr.replace(/&/g, '&amp;')}</name>
    <Placemark>
      <name>Itinéraire</name>
      <LineString>
        <coordinates>${coordsStr}</coordinates>
      </LineString>
    </Placemark>
  </Document>
</kml>`;
        fs.writeFileSync('assets/tracks/' + h.id + '.kml', kmlText);
        h.kmlFile = 'assets/tracks/' + h.id + '.kml';
        updated++;
      }
    }
    return h;
  });
  
  const newStr = 'const HIKES = ' + JSON.stringify(hikes, null, 2) + ';\n\nconst DIFFICULTY';
  data = data.replace(/const HIKES = \[[\s\S]*?\];\n\nconst DIFFICULTY/, newStr);
  fs.writeFileSync('js/data.js', data);
  console.log('Successfully re-parsed', updated, 'GPX files and updated data.js');
}
