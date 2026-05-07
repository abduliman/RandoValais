// RandoValais — Points of Interest System
const POI_CATEGORIES = {
  transport:   { icon: '<i data-lucide="bus"></i>', color: '#3B82F6', label: { fr: 'Transport public', de: 'Öffentlicher Verkehr', en: 'Public transport' } },
  restaurant:  { icon: '<i data-lucide="utensils"></i>', color: '#EF4444', label: { fr: 'Restaurant', de: 'Restaurant', en: 'Restaurant' } },
  hotel:       { icon: '<i data-lucide="hotel"></i>', color: '#8B5CF6', label: { fr: 'Hébergement', de: 'Unterkunft', en: 'Accommodation' } },
  viewpoint:   { icon: '<i data-lucide="eye"></i>', color: '#06B6D4', label: { fr: 'Point de vue', de: 'Aussichtspunkt', en: 'Viewpoint' } },
  bridge:      { icon: '<i data-lucide="map"></i>', color: '#78350F', label: { fr: 'Pont / Passerelle', de: 'Brücke / Steg', en: 'Bridge / Walkway' } },
  vertigo:     { icon: '<i data-lucide="triangle-alert"></i>', color: '#EF4444', label: { fr: 'Sujet au vertige', de: 'Schwindelgefahr', en: 'Vertigo risk' } },
  refreshment: { icon: '<i data-lucide="coffee"></i>', color: '#F59E0B', label: { fr: 'Buvette / Refuge', de: 'Berghütte', en: 'Mountain hut' } },
  museum:      { icon: '<i data-lucide="building-2"></i>', color: '#5D4037', label: { fr: 'Musée / Culture', de: 'Museum / Kultur', en: 'Museum / Culture' } },
  waterfall:   { icon: '<i data-lucide="droplets"></i>', color: '#3B82F6', label: { fr: 'Cascade / Source', de: 'Wasserfall / Quelle', en: 'Waterfall / Spring' } },
  parking:     { icon: '<i data-lucide="car"></i>', color: '#475569', label: { fr: 'Parking', de: 'Parkplatz', en: 'Parking' } },
  info:        { icon: '<i data-lucide="info"></i>', color: '#3B82F6', label: { fr: 'Info / Panneau', de: 'Info / Tafel', en: 'Info / Sign' } },
  lake:        { icon: '<i data-lucide="waves"></i>', color: '#0EA5E9', label: { fr: 'Lac', de: 'See', en: 'Lake' } }
};

// Static POIs for each hike (curated, known points)
const HIKE_POIS = {
  1: [ // Bisse du Torrent-Neuf
    { type: 'transport', name: 'Bus Savièse-Village', coords: [46.2620, 7.3380], info: { fr: 'Ligne 1 depuis Sion, cadence 30min', de: 'Linie 1 ab Sitten, alle 30min', en: 'Line 1 from Sion, every 30min' } },
    { type: 'vertigo', name: 'Passerelles suspendues', coords: [46.2660, 7.3470], info: { fr: 'Passages vertigineux — déconseillé aux personnes sensibles', de: 'Schwindelerregende Passagen', en: 'Vertigo-inducing passages' } },
    { type: 'bridge', name: 'Pont du Torrent-Neuf', coords: [46.2670, 7.3500], info: { fr: 'Passerelle historique accrochée à la falaise', de: 'Historischer Steg an der Felswand', en: 'Historic walkway clinging to cliff' } },
    { type: 'viewpoint', name: 'Belvédère vallée du Rhône', coords: [46.2680, 7.3530], info: { fr: 'Vue panoramique sur la vallée du Rhône', de: 'Panoramablick auf das Rhonetal', en: 'Panoramic view of the Rhône valley' } },
    { type: 'refreshment', name: 'Buvette du Bisse', coords: [46.2700, 7.3590], info: { fr: 'Boissons et snacks, ouvert mai-oct', de: 'Getränke und Snacks, Mai-Okt', en: 'Drinks and snacks, May-Oct' } },
    { type: 'parking', name: 'Parking Ste-Marguerite', coords: [46.2615, 7.3375], info: { fr: 'Parking gratuit, 30 places', de: 'Gratis Parkplatz, 30 Plätze', en: 'Free parking, 30 spots' } }
  ],
  2: [ // Lac de Derborence
    { type: 'parking', name: 'Parking Derborence', coords: [46.2800, 7.2100], info: { fr: 'Parking principal, CHF 5/jour', de: 'Hauptparkplatz, CHF 5/Tag', en: 'Main parking, CHF 5/day' } },
    { type: 'restaurant', name: 'Auberge du Lac', coords: [46.2830, 7.2160], info: { fr: 'Cuisine valaisanne, terrasse vue lac', de: 'Walliser Küche, Seeterrasse', en: 'Valaisan cuisine, lake terrace' } },
    { type: 'viewpoint', name: 'Point de vue éboulement', coords: [46.2840, 7.2180], info: { fr: 'Vue sur l\'éboulement historique de 1749', de: 'Blick auf den Bergsturz von 1749', en: 'View of the 1749 landslide' } },
    { type: 'lake', name: 'Lac de Derborence', coords: [46.2833, 7.2167], info: { fr: 'Lac naturel formé en 1749, baignade interdite', de: 'Natursee von 1749, Baden verboten', en: 'Natural lake formed in 1749, no swimming' } },
    { type: 'info', name: 'Panneau forêt vierge', coords: [46.2825, 7.2210], info: { fr: 'Réserve naturelle — forêt vierge protégée', de: 'Naturschutzgebiet — geschützter Urwald', en: 'Nature reserve — protected virgin forest' } }
  ],
  3: [ // 5 Seenweg
    { type: 'transport', name: 'Blauherd (télécabine)', coords: [46.0350, 7.7600], info: { fr: 'Arrivée télécabine, départ randonnée', de: 'Bergstation Gondelbahn, Start', en: 'Cable car arrival, hike start' } },
    { type: 'lake', name: 'Stellisee', coords: [46.0320, 7.7570], info: { fr: 'Reflet du Cervin — le plus photographié', de: 'Matterhorn-Spiegelung — meistfotografiert', en: 'Matterhorn reflection — most photographed' } },
    { type: 'lake', name: 'Grindjisee', coords: [46.0290, 7.7540], info: { fr: 'Lac avec arolles centenaires', de: 'See mit alten Arven', en: 'Lake with ancient stone pines' } },
    { type: 'lake', name: 'Grünsee', coords: [46.0260, 7.7510], info: { fr: 'Eaux émeraude, cadre sauvage', de: 'Smaragdgrünes Wasser', en: 'Emerald waters, wild setting' } },
    { type: 'lake', name: 'Moosjisee', coords: [46.0200, 7.7480], info: { fr: 'Lac artificiel, vue sur le glacier', de: 'Stausee mit Gletscherblick', en: 'Reservoir lake, glacier view' } },
    { type: 'lake', name: 'Leisee', coords: [46.0150, 7.7390], info: { fr: 'Baignade possible en été !', de: 'Baden im Sommer möglich!', en: 'Swimming possible in summer!' } },
    { type: 'refreshment', name: 'Bergrestaurant Sunnegga', coords: [46.0160, 7.7420], info: { fr: 'Restaurant panoramique, terrasse soleil', de: 'Panoramarestaurant mit Sonnenterrasse', en: 'Panoramic restaurant, sun terrace' } },
    { type: 'transport', name: 'Sunnegga (funiculaire)', coords: [46.0150, 7.7390], info: { fr: 'Funiculaire retour vers Zermatt', de: 'Standseilbahn zurück nach Zermatt', en: 'Funicular back to Zermatt' } }
  ],
  4: [ // Mont Noble
    { type: 'transport', name: 'Bus Nax', coords: [46.2250, 7.4200], info: { fr: 'Bus depuis Sion, 4x/jour', de: 'Bus ab Sitten, 4x/Tag', en: 'Bus from Sion, 4x/day' } },
    { type: 'viewpoint', name: 'Sommet Mont Noble 2654m', coords: [46.2390, 7.4390], info: { fr: 'Panorama 360° — Mont Blanc au Cervin', de: '360°-Panorama — Mont Blanc bis Matterhorn', en: '360° panorama — Mont Blanc to Matterhorn' } },
    { type: 'refreshment', name: 'Buvette de Tsévra', coords: [46.2330, 7.4320], info: { fr: 'Fromage d\'alpage, été uniquement', de: 'Alpkäse, nur Sommer', en: 'Alpine cheese, summer only' } },
    { type: 'parking', name: 'Parking Nax', coords: [46.2255, 7.4205], info: { fr: 'Parking départ, gratuit', de: 'Startparkplatz, gratis', en: 'Start parking, free' } }
  ],
  5: [ // Bisses de Nendaz
    { type: 'transport', name: 'Bus Nendaz-Station', coords: [46.1780, 7.2900], info: { fr: 'Ligne Sion-Nendaz, cadence 60min', de: 'Linie Sitten-Nendaz, stündlich', en: 'Sion-Nendaz line, hourly' } },
    { type: 'info', name: 'Musée des Bisses', coords: [46.1800, 7.2950], info: { fr: 'Histoire des bisses du Valais — entrée libre', de: 'Geschichte der Walliser Suonen — Eintritt frei', en: 'History of Valais bisses — free entry' } },
    { type: 'viewpoint', name: 'Belvédère Grand Bisse', coords: [46.1840, 7.3030], info: { fr: 'Vue plongeante sur Sion et la plaine', de: 'Blick auf Sitten und die Ebene', en: 'View down to Sion and the plain' } },
    { type: 'refreshment', name: 'Bistrot du Bisse', coords: [46.1830, 7.3010], info: { fr: 'Terrasse ombragée, raclette', de: 'Schattenterrasse, Raclette', en: 'Shaded terrace, raclette' } },
    { type: 'waterfall', name: 'Cascade du Bisse Vieux', coords: [46.1860, 7.3070], info: { fr: 'Chute d\'eau spectaculaire au printemps', de: 'Spektakulärer Wasserfall im Frühling', en: 'Spectacular waterfall in spring' } }
  ],
  6: [ // Gorges de la Dala
    { type: 'transport', name: 'Gare de Loèche', coords: [46.3750, 7.6250], info: { fr: 'CFF — trains directs depuis Berne/Sion', de: 'SBB — Direktzüge ab Bern/Sitten', en: 'SBB — direct trains from Bern/Sion' } },
    { type: 'bridge', name: 'Passerelle des Gorges', coords: [46.3810, 7.6310], info: { fr: 'Pont suspendu au-dessus du torrent', de: 'Hängebrücke über den Wildbach', en: 'Suspension bridge over torrent' } },
    { type: 'vertigo', name: 'Passage étroit', coords: [46.3830, 7.6330], info: { fr: 'Escaliers métalliques — vertige possible', de: 'Metalltreppen — Schwindelgefahr', en: 'Metal stairs — vertigo possible' } },
    { type: 'hotel', name: 'Therme Leukerbad', coords: [46.3890, 7.6360], info: { fr: 'Bains thermaux Leukerbad, ouvert toute l\'année', de: 'Thermalbäder Leukerbad, ganzjährig', en: 'Leukerbad thermal baths, year-round' }, email: 'info@leukerbad-therme.ch', phone: '+41 27 472 20 20' },
    { type: 'restaurant', name: 'Restaurant Waldhaus', coords: [46.3870, 7.6350], info: { fr: 'Spécialités valaisannes, vue sur les gorges', de: 'Walliser Spezialitäten, Schluchtblick', en: 'Valaisan specialties, gorge view' } }
  ],
  7: [ // Cabane Dent Blanche
    { type: 'transport', name: 'Bus Ferpècle', coords: [46.0700, 7.5300], info: { fr: 'Dernier bus retour à 17h30', de: 'Letzter Rückbus um 17:30', en: 'Last return bus at 5:30 PM' } },
    { type: 'refreshment', name: 'Cabane de la Dent Blanche CAS', coords: [46.0510, 7.5170], info: { fr: 'Nuitée CHF 70, demi-pension, réservation obligatoire', de: 'Übernachtung CHF 70, HP, Reservation nötig', en: 'Overnight CHF 70, half board, reservation required' }, email: 'cabane.dentblanche@cas-sion.ch', phone: '+41 27 281 15 15' },
    { type: 'viewpoint', name: 'Vue sur Dent Blanche', coords: [46.0560, 7.5200], info: { fr: 'Vue imprenable sur la face nord (4357m)', de: 'Blick auf die Nordwand (4357m)', en: 'Stunning view of the north face (4357m)' } },
    { type: 'vertigo', name: 'Arête finale', coords: [46.0530, 7.5180], info: { fr: 'Passage exposé avec câbles, concentration requise', de: 'Ausgesetzter Abschnitt mit Ketten', en: 'Exposed section with cables' } },
    { type: 'waterfall', name: 'Cascade de Ferpècle', coords: [46.0650, 7.5250], info: { fr: 'Cascade glaciaire impressionnante', de: 'Beeindruckender Gletscherwasserfall', en: 'Impressive glacial waterfall' } }
  ],
  8: [ // Chemin des Chamois
    { type: 'transport', name: 'Gare AOMC Champéry', coords: [46.1700, 6.8600], info: { fr: 'Train régional depuis Aigle, cadence 1h', de: 'Regionalbahn ab Aigle, stündlich', en: 'Regional train from Aigle, hourly' } },
    { type: 'viewpoint', name: 'Panorama Dents du Midi', coords: [46.1750, 6.8710], info: { fr: 'Vue spectaculaire sur les 7 sommets', de: 'Blick auf alle 7 Gipfel', en: 'View of all 7 summits' } },
    { type: 'refreshment', name: 'Buvette d\'alpage', coords: [46.1740, 6.8690], info: { fr: 'Fromage et petit-lait frais, été', de: 'Käse und Molke, Sommer', en: 'Cheese and fresh whey, summer' } },
    { type: 'info', name: 'Panneau faune alpine', coords: [46.1730, 6.8670], info: { fr: 'Zone de protection de la faune', de: 'Wildschutzgebiet', en: 'Wildlife protection zone' } }
  ],
  9: [ // Tour des Muverans
    { type: 'transport', name: 'Bus Ovronnaz', coords: [46.2100, 7.0900], info: { fr: 'Bus depuis Leytron, 6x/jour', de: 'Bus ab Leytron, 6x/Tag', en: 'Bus from Leytron, 6x/day' } },
    { type: 'refreshment', name: 'Cabane Rambert CAS', coords: [46.2170, 7.1020], info: { fr: 'Nuitée CHF 65, cuisine maison, réservation', de: 'Übernachtung CHF 65, Reservation', en: 'Overnight CHF 65, reservation needed' }, email: 'cabane.rambert@cas-diablerets.ch', phone: '+41 27 207 11 22' },
    { type: 'refreshment', name: 'Cabane Fenestral', coords: [46.2200, 7.1100], info: { fr: 'Refuge gardé juillet-septembre', de: 'Bewartete Hütte Juli-Sept', en: 'Staffed hut July-September' }, email: 'info@cabanefenestral.ch', phone: '+41 27 207 25 40' },
    { type: 'viewpoint', name: 'Col des Martinets', coords: [46.2210, 7.1120], info: { fr: 'Vue sur le Léman et les Préalpes', de: 'Blick auf Genfersee und Voralpen', en: 'View of Lake Geneva and Prealps' } },
    { type: 'vertigo', name: 'Passage du Pacheu', coords: [46.2180, 7.1050], info: { fr: 'Passage câblé, attention par temps humide', de: 'Gesicherter Abschnitt, Vorsicht bei Nässe', en: 'Cable-secured section, careful when wet' } }
  ],
  10: [ // Bisse de Clavau
    { type: 'transport', name: 'Gare CFF de Sion', coords: [46.2300, 7.3600], info: { fr: 'Trains IC/IR toutes les 30min', de: 'IC/IR-Züge alle 30min', en: 'IC/IR trains every 30min' } },
    { type: 'museum', name: 'Château de Valère', coords: [46.2320, 7.3640], info: { fr: 'Musée d\'histoire, basilique fortifiée XIIe s.', de: 'Geschichtsmuseum, Wehrkirche 12. Jh.', en: 'History museum, 12th c. fortified basilica' } },
    { type: 'museum', name: 'Château de Tourbillon', coords: [46.2330, 7.3660], info: { fr: 'Ruines du château épiscopal, accès libre', de: 'Ruinen der Bischofsburg, freier Zugang', en: 'Episcopal castle ruins, free access' } },
    { type: 'restaurant', name: 'Cave de Tous Vents', coords: [46.2340, 7.3680], info: { fr: 'Dégustation vins valaisans, vue vignoble', de: 'Walliser Weinverkostung', en: 'Valaisan wine tasting, vineyard view' } },
    { type: 'viewpoint', name: 'Belvédère du vignoble', coords: [46.2345, 7.3700], info: { fr: 'Vue sur Sion, la plaine et les Alpes bernoises', de: 'Blick auf Sitten und Berner Alpen', en: 'View of Sion and Bernese Alps' } }
  ],
  11: [ // Lac Bleu d'Arolla
    { type: 'transport', name: 'Bus Arolla', coords: [46.0400, 7.4900], info: { fr: 'Bus PostAuto depuis Sion via Evolène', de: 'PostAuto ab Sitten über Evolène', en: 'PostBus from Sion via Evolène' } },
    { type: 'lake', name: 'Lac Bleu', coords: [46.0330, 7.4830], info: { fr: 'Bleu intense dû aux particules glaciaires', de: 'Intensives Blau durch Gletscherpartikel', en: 'Intense blue from glacial particles' } },
    { type: 'hotel', name: 'Hôtel du Pigne', coords: [46.0395, 7.4895], info: { fr: 'Hôtel 3★, départ randonnées, spa', de: '3★ Hotel, Wanderstart, Spa', en: '3★ hotel, hiking start, spa' }, email: 'info@hoteldupigne.ch', phone: '+41 27 283 71 00' },
    { type: 'viewpoint', name: 'Vue sur Mont Collon', coords: [46.0360, 7.4860], info: { fr: 'Glacier du Mont Collon en toile de fond', de: 'Mont Collon Gletscher im Hintergrund', en: 'Mont Collon glacier backdrop' } }
  ],
  12: [ // Pont suspendu de Randa
    { type: 'transport', name: 'Gare MGB Randa', coords: [46.1050, 7.7900], info: { fr: 'Train Matterhorn Gotthard Bahn, cadence 30min', de: 'MGB-Zug, alle 30min', en: 'MGB train, every 30min' } },
    { type: 'bridge', name: 'Pont Charles Kuonen', coords: [46.1000, 7.7850], info: { fr: '494m de long, 85m de haut — record mondial !', de: '494m lang, 85m hoch — Weltrekord!', en: '494m long, 85m high — world record!' } },
    { type: 'vertigo', name: 'Milieu du pont', coords: [46.0995, 7.7843], info: { fr: 'Point le plus haut : 85m au-dessus du vide', de: 'Höchster Punkt: 85m über dem Abgrund', en: 'Highest point: 85m above the void' } },
    { type: 'viewpoint', name: 'Vue Cervin & Weisshorn', coords: [46.0990, 7.7840], info: { fr: 'Vue sur le Cervin, Dom et Weisshorn', de: 'Blick auf Matterhorn, Dom und Weisshorn', en: 'View of Matterhorn, Dom and Weisshorn' } },
    { type: 'refreshment', name: 'Restaurant Weisshorn Randa', coords: [46.1045, 7.7895], info: { fr: 'Cuisine locale, terrasse, ouvert midi', de: 'Lokale Küche, Terrasse, mittags', en: 'Local cuisine, terrace, open lunch' } }
  ]
};

// ===== OVERPASS API — Auto-fetch nearby POIs =====
const POI_CACHE = {};

async function fetchNearbyPOIs(hikeId) {
  if (POI_CACHE[hikeId]) return POI_CACHE[hikeId];

  const hike = HIKES.find(h => h.id === hikeId);
  if (!hike) return [];

  const [lat, lon] = hike.coords;
  const radius = 2000; // 2km around center

  const query = `[out:json][timeout:10];(
    node["tourism"="viewpoint"](around:${radius},${lat},${lon});
    node["amenity"="restaurant"](around:${radius},${lat},${lon});
    node["amenity"="cafe"](around:${radius},${lat},${lon});
    node["tourism"="hotel"](around:${radius},${lat},${lon});
    node["tourism"="alpine_hut"](around:${radius},${lat},${lon});
    node["tourism"="museum"](around:${radius},${lat},${lon});
    node["amenity"="parking"](around:${radius},${lat},${lon});
    node["highway"="bus_stop"](around:${radius},${lat},${lon});
    node["natural"="waterfall"](around:${radius},${lat},${lon});
  );out body 30;`;

  try {
    const resp = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST', body: 'data=' + encodeURIComponent(query)
    });
    const data = await resp.json();

    const pois = data.elements.map(el => {
      const type = mapOSMType(el.tags);
      if (!type) return null;
      return {
        type, name: el.tags.name || tHikePOILabel(type),
        coords: [el.lat, el.lon],
        info: { fr: el.tags.name || '', de: el.tags.name || '', en: el.tags.name || '' },
        auto: true
      };
    }).filter(Boolean);

    POI_CACHE[hikeId] = pois;
    return pois;
  } catch (e) {
    console.warn('Overpass API error:', e);
    return [];
  }
}

function mapOSMType(tags) {
  if (tags.tourism === 'viewpoint') return 'viewpoint';
  if (tags.amenity === 'restaurant' || tags.amenity === 'cafe') return 'restaurant';
  if (tags.tourism === 'hotel') return 'hotel';
  if (tags.tourism === 'alpine_hut') return 'refreshment';
  if (tags.tourism === 'museum') return 'museum';
  if (tags.amenity === 'parking') return 'parking';
  if (tags.highway === 'bus_stop') return 'transport';
  if (tags.natural === 'waterfall') return 'waterfall';
  return null;
}

function tHikePOILabel(type) {
  const cat = POI_CATEGORIES[type];
  return cat ? tHike(cat.label) : type;
}
