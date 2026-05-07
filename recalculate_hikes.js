const fs = require('fs');
const path = require('path');

console.log("SLOW ELEVATION FETCH V5");

async function getElevation(coords) {
  if (coords.length === 0) return [];
  const results = [];
  for (let i = 0; i < coords.length; i += 50) {
    const chunk = coords.slice(i, i + 50);
    const lats = chunk.map(c => c[0]).join(',');
    const lons = chunk.map(c => c[1]).join(',');
    const url = `https://api.open-meteo.com/v1/elevation?latitude=${lats}&longitude=${lons}`;
    
    let success = false;
    let retries = 0;
    while (!success && retries < 3) {
      try {
        const resp = await fetch(url);
        if (resp.status === 429) {
          console.warn("Rate limited. Waiting 10s...");
          await new Promise(r => setTimeout(r, 10000));
          retries++;
          continue;
        }
        if (!resp.ok) {
          console.error(`Chunk failed: ${resp.status}`);
          break;
        }
        const data = await resp.json();
        if (data.elevation) results.push(...data.elevation);
        success = true;
      } catch (e) {
        console.error(`Fetch error: ${e.message}`);
        await new Promise(r => setTimeout(r, 2000));
        retries++;
      }
    }
    await new Promise(r => setTimeout(r, 1000));
  }
  return results;
}

async function run() {
  const dataPath = path.join(__dirname, 'js', 'data.js');
  let content = fs.readFileSync(dataPath, 'utf8');
  const HIKES_MATCH = content.match(/const HIKES = (\[[\s\S]*\]);/);
  const hikes = JSON.parse(HIKES_MATCH[1]);

  for (let hike of hikes) {
    if (hike.trail && hike.trail.length > 1) {
      // Check if already has data to skip if wanted? User said "all", but let's be smart.
      // If we already updated it in this session (e.g. distance is not 0), maybe skip?
      // No, let's do all but slowly.
      
      console.log(`Hike ${hike.id}...`);
      const step = Math.max(1, Math.floor(hike.trail.length / 50));
      const sampled = hike.trail.filter((_, idx) => idx % step === 0);
      
      const elevations = await getElevation(sampled);
      if (elevations.length > 0) {
        let up = 0;
        let down = 0;
        for (let j = 0; j < elevations.length - 1; j++) {
          const diff = elevations[j+1] - elevations[j];
          if (diff > 0) up += diff;
          else down += Math.abs(diff);
        }
        hike.elevation = { up: Math.round(up), down: Math.round(down) };
        hike.altitude = { min: Math.round(Math.min(...elevations)), max: Math.round(Math.max(...elevations)) };
        
        let dist = 0;
        for (let j = 0; j < hike.trail.length - 1; j++) {
          dist += haversine(hike.trail[j][0], hike.trail[j][1], hike.trail[j+1][0], hike.trail[j+1][1]);
        }
        hike.distance = Math.round(dist * 10) / 10;
        const durHours = (hike.distance / 4) + (up / 600);
        const h = Math.floor(durHours);
        const m = Math.round((durHours - h) * 60);
        hike.duration = `${h}:${m.toString().padStart(2, '0')} h`;
        
        console.log(` -> ${hike.distance}km, ${hike.duration}`);
      }
    }
  }

  fs.writeFileSync(dataPath, `const HIKES = ${JSON.stringify(hikes, null, 2)};`);
  console.log("Done.");
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

run();
