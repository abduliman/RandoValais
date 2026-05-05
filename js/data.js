// RandoValais — Hiking Data with images & trail coordinates
const HIKES = [
  {
    id: 1,
    name: { fr: "Bisse du Torrent-Neuf", de: "Bisse du Torrent-Neuf", en: "Torrent-Neuf Bisse" },
    region: "Savièse", difficulty: "Moyen", category: "Itinéraires randonnées", duration: "2h30", distance: 6.5,
    elevation: { up: 250, down: 250 }, altitude: { min: 900, max: 1150 },
    season: { fr: "Mai - Octobre", de: "Mai - Oktober", en: "May - October" },
    coords: [46.2667, 7.3500],
    trail: [[46.2583,7.3262],[46.2598,7.3285],[46.2615,7.3310],[46.2627,7.3338],[46.2640,7.3358],[46.2650,7.3378],[46.2655,7.3402],[46.2660,7.3430],[46.2668,7.3455],[46.2675,7.3478],[46.2680,7.3498],[46.2688,7.3520],[46.2695,7.3545],[46.2700,7.3568],[46.2708,7.3590],[46.2712,7.3610],[46.2718,7.3635],[46.2725,7.3658],[46.2732,7.3678],[46.2738,7.3700],[46.2742,7.3722],[46.2748,7.3745],[46.2755,7.3768],[46.2760,7.3790]],
    description: {
      fr: "Le bisse du Torrent-Neuf, aussi appelé bisse de Savièse, est l'un des plus spectaculaires du Valais. Le sentier longe un ancien canal d'irrigation accroché à la falaise, offrant des vues vertigineuses sur la vallée du Rhône. Des passerelles et échelles sécurisées permettent de franchir les passages les plus impressionnants.",
      de: "Die Suone Torrent-Neuf, auch Suone von Savièse genannt, ist eine der spektakulärsten im Wallis. Der Weg folgt einem alten Bewässerungskanal an der Felswand und bietet schwindelerregende Aussichten auf das Rhonetal.",
      en: "The Torrent-Neuf bisse, also known as the Savièse bisse, is one of the most spectacular in Valais. The trail follows an ancient irrigation canal clinging to the cliff face, offering dizzying views over the Rhône valley."
    },
    access: { fr: "Bus depuis Sion, arrêt Savièse", de: "Bus ab Sitten, Haltestelle Savièse", en: "Bus from Sion, Savièse stop" },
    image: "assets/images/bisse-torrent-neuf.png"
  },
  {
    id: 2,
    name: { fr: "Lac de Derborence", de: "Derbonence See", en: "Lake Derborence" },
    region: "Conthey", difficulty: "Facile", category: "Itinéraires randonnées", duration: "1h30", distance: 4.0,
    elevation: { up: 100, down: 100 }, altitude: { min: 1400, max: 1500 },
    season: { fr: "Juin - Octobre", de: "Juni - Oktober", en: "June - October" },
    coords: [46.2833, 7.2167],
    trail: [[46.2905,7.2015],[46.2890,7.2028],[46.2878,7.2045],[46.2865,7.2058],[46.2852,7.2075],[46.2845,7.2095],[46.2838,7.2112],[46.2832,7.2130],[46.2828,7.2150],[46.2825,7.2168],[46.2830,7.2188],[46.2835,7.2205],[46.2840,7.2218],[46.2843,7.2235],[46.2838,7.2250],[46.2830,7.2262],[46.2822,7.2270],[46.2815,7.2255],[46.2810,7.2235],[46.2808,7.2215],[46.2812,7.2195],[46.2820,7.2175],[46.2830,7.2155],[46.2842,7.2138],[46.2855,7.2120],[46.2868,7.2105],[46.2880,7.2088],[46.2892,7.2065],[46.2900,7.2040],[46.2905,7.2015]],
    description: {
      fr: "Le lac de Derborence est un joyau naturel niché au cœur d'une réserve protégée. Né d'un éboulement au XVIIIe siècle, ce lac turquoise est entouré d'une forêt vierge unique en Suisse. Le tour du lac est accessible à tous et offre une immersion totale dans une nature préservée.",
      de: "Der Derbonencesee ist ein Naturjuwel im Herzen eines Schutzgebiets. Der türkisfarbene See entstand durch einen Bergsturz im 18. Jahrhundert und ist von einem einzigartigen Urwald umgeben.",
      en: "Lake Derborence is a natural gem nestled in the heart of a protected reserve. Born from a landslide in the 18th century, this turquoise lake is surrounded by a virgin forest unique in Switzerland."
    },
    access: { fr: "Route depuis Sion via Conthey", de: "Strasse von Sitten über Conthey", en: "Road from Sion via Conthey" },
    image: "assets/images/lac-derborence.png"
  },
  {
    id: 3,
    name: { fr: "5 Seenweg (Zermatt)", de: "5-Seenweg (Zermatt)", en: "5 Lakes Trail (Zermatt)" },
    region: "Zermatt", difficulty: "Moyen", category: "Itinéraires randonnées", duration: "3h00", distance: 9.0,
    elevation: { up: 400, down: 400 }, altitude: { min: 2200, max: 2600 },
    season: { fr: "Juillet - Septembre", de: "Juli - September", en: "July - September" },
    coords: [46.0207, 7.7491],
    trail: [[46.0453,7.7685],[46.0440,7.7670],[46.0425,7.7655],[46.0410,7.7642],[46.0395,7.7628],[46.0380,7.7612],[46.0368,7.7600],[46.0355,7.7585],[46.0340,7.7572],[46.0325,7.7558],[46.0312,7.7542],[46.0298,7.7528],[46.0285,7.7515],[46.0270,7.7500],[46.0258,7.7488],[46.0245,7.7475],[46.0232,7.7462],[46.0218,7.7448],[46.0205,7.7435],[46.0192,7.7422],[46.0180,7.7410],[46.0168,7.7398],[46.0155,7.7385]],
    description: {
      fr: "Le 5-Seenweg est un parcours emblématique qui relie cinq lacs alpins aux eaux cristallines avec le Cervin en toile de fond permanente. Chaque lac offre un reflet différent du mythique sommet. Un incontournable pour tout randonneur visitant Zermatt.",
      de: "Der 5-Seenweg ist eine ikonische Route, die fünf Bergseen mit kristallklarem Wasser verbindet, mit dem Matterhorn als ständiger Kulisse.",
      en: "The 5 Lakes Trail is an iconic route linking five alpine lakes with crystal-clear waters, with the Matterhorn as a permanent backdrop."
    },
    access: { fr: "Téléphérique Rothorn depuis Zermatt", de: "Seilbahn Rothorn ab Zermatt", en: "Rothorn cable car from Zermatt" },
    image: "assets/images/5-seenweg.png"
  },
  {
    id: 4,
    name: { fr: "Tour du Mont-Noble", de: "Rundwanderung Mont Noble", en: "Mont Noble Tour" },
    region: "Val d'Hérens", difficulty: "Difficile", category: "Itinéraires randonnées", duration: "5h00", distance: 14.0,
    elevation: { up: 900, down: 900 }, altitude: { min: 1500, max: 2654 },
    season: { fr: "Juin - Octobre", de: "Juni - Oktober", en: "June - October" },
    coords: [46.2333, 7.4333],
    trail: [[46.2250,7.4200],[46.2262,7.4218],[46.2275,7.4238],[46.2285,7.4258],[46.2298,7.4275],[46.2308,7.4290],[46.2318,7.4305],[46.2328,7.4318],[46.2338,7.4330],[46.2348,7.4342],[46.2355,7.4358],[46.2362,7.4372],[46.2370,7.4385],[46.2378,7.4395],[46.2385,7.4405],[46.2390,7.4415],[46.2388,7.4430],[46.2380,7.4440],[46.2370,7.4445],[46.2358,7.4438],[46.2348,7.4425],[46.2338,7.4412],[46.2325,7.4398],[46.2312,7.4385],[46.2300,7.4370],[46.2288,7.4355],[46.2275,7.4338],[46.2265,7.4320],[46.2258,7.4300],[46.2252,7.4275],[46.2248,7.4250],[46.2245,7.4225],[46.2248,7.4210]],
    description: {
      fr: "Le Mont Noble (2654m) offre un panorama à 360° sur les Alpes valaisannes. La montée progressive traverse alpages fleuris et crêtes panoramiques. Au sommet, la vue s'étend du Mont Blanc au Cervin en passant par les Dents du Midi.",
      de: "Der Mont Noble (2654m) bietet ein 360°-Panorama auf die Walliser Alpen. Der Aufstieg führt durch blühende Alpweiden und Panoramagrate.",
      en: "Mont Noble (2654m) offers a 360° panorama of the Valaisan Alps. The progressive ascent crosses flowery alpine meadows and panoramic ridges."
    },
    access: { fr: "Route depuis Sion jusqu'à Nax", de: "Strasse von Sitten nach Nax", en: "Road from Sion to Nax" },
    image: "assets/images/mont-noble.png"
  },
  {
    id: 5,
    name: { fr: "Bisses de Nendaz", de: "Suonen von Nendaz", en: "Nendaz Bisses" },
    region: "Nendaz", difficulty: "Facile", category: "Itinéraires randonnées", duration: "2h00", distance: 7.0,
    elevation: { up: 150, down: 150 }, altitude: { min: 1300, max: 1450 },
    season: { fr: "Mai - Novembre", de: "Mai - November", en: "May - November" },
    coords: [46.1833, 7.3000],
    trail: [[46.1872,7.2810],[46.1868,7.2835],[46.1862,7.2858],[46.1855,7.2878],[46.1848,7.2895],[46.1840,7.2912],[46.1835,7.2932],[46.1830,7.2950],[46.1825,7.2968],[46.1820,7.2985],[46.1815,7.3005],[46.1810,7.3025],[46.1808,7.3045],[46.1805,7.3062],[46.1802,7.3080],[46.1800,7.3098],[46.1798,7.3118],[46.1795,7.3135],[46.1790,7.3152],[46.1785,7.3170],[46.1778,7.3188],[46.1772,7.3205]],
    description: {
      fr: "Nendaz est la capitale des bisses ! Ce réseau de sentiers longe d'anciens canaux d'irrigation à travers forêts de mélèzes et prairies alpines. Le Bisse Vieux et le Grand Bisse offrent des promenades paisibles avec vue sur la vallée du Rhône et les sommets environnants.",
      de: "Nendaz ist die Hauptstadt der Suonen! Dieses Wegnetz folgt alten Bewässerungskanälen durch Lärchenwälder und Alpwiesen.",
      en: "Nendaz is the capital of bisses! This network of trails follows ancient irrigation channels through larch forests and alpine meadows."
    },
    access: { fr: "Bus ou voiture depuis Sion", de: "Bus oder Auto ab Sitten", en: "Bus or car from Sion" },
    image: "assets/images/bisses-nendaz.png"
  },
  {
    id: 6,
    name: { fr: "Gorges de la Dala", de: "Dalaschlucht", en: "Dala Gorges" },
    region: "Loèche-les-Bains", difficulty: "Moyen", category: "Itinéraires randonnées", duration: "2h30", distance: 5.5,
    elevation: { up: 350, down: 350 }, altitude: { min: 1100, max: 1450 },
    season: { fr: "Mai - Octobre", de: "Mai - Oktober", en: "May - October" },
    coords: [46.3833, 7.6333],
    trail: [[46.3712,7.6185],[46.3725,7.6198],[46.3738,7.6212],[46.3748,7.6228],[46.3758,7.6245],[46.3768,7.6258],[46.3778,7.6272],[46.3788,7.6288],[46.3798,7.6302],[46.3808,7.6315],[46.3818,7.6328],[46.3825,7.6342],[46.3832,7.6355],[46.3840,7.6368],[46.3848,7.6380],[46.3855,7.6392],[46.3862,7.6402],[46.3868,7.6412],[46.3875,7.6420],[46.3882,7.6428]],
    description: {
      fr: "Les gorges de la Dala offrent un spectacle naturel saisissant. Le sentier serpente entre des parois rocheuses impressionnantes, franchissant des passerelles suspendues au-dessus du torrent tumultueux. L'arrivée à Loèche-les-Bains permet de terminer par un bain thermal bien mérité.",
      de: "Die Dalaschlucht bietet ein beeindruckendes Naturschauspiel. Der Weg schlängelt sich zwischen imposanten Felswänden und überquert Hängebrücken über den tosenden Wildbach.",
      en: "The Dala Gorges offer a striking natural spectacle. The trail winds between impressive rock walls, crossing suspension bridges over the tumultuous torrent."
    },
    access: { fr: "Train jusqu'à Loèche, bus jusqu'à Loèche-les-Bains", de: "Zug nach Leuk, Bus nach Leukerbad", en: "Train to Leuk, bus to Leukerbad" },
    image: "assets/images/gorges-dala.png"
  },
  {
    id: 7,
    name: { fr: "Cabane de la Dent Blanche", de: "Dent Blanche Hütte", en: "Dent Blanche Cabin" },
    region: "Val d'Hérens", difficulty: "Difficile", category: "Itinéraires randonnées", duration: "6h00", distance: 12.0,
    elevation: { up: 1200, down: 200 }, altitude: { min: 2050, max: 3507 },
    season: { fr: "Juillet - Septembre", de: "Juli - September", en: "July - September" },
    coords: [46.0500, 7.5167],
    trail: [[46.0815,7.5395],[46.0802,7.5382],[46.0788,7.5368],[46.0775,7.5355],[46.0762,7.5342],[46.0748,7.5328],[46.0735,7.5315],[46.0722,7.5302],[46.0708,7.5288],[46.0695,7.5275],[46.0682,7.5262],[46.0668,7.5248],[46.0655,7.5238],[46.0642,7.5228],[46.0628,7.5218],[46.0615,7.5208],[46.0602,7.5198],[46.0588,7.5190],[46.0575,7.5182],[46.0562,7.5175],[46.0548,7.5170],[46.0535,7.5168],[46.0522,7.5165],[46.0510,7.5162]],
    description: {
      fr: "L'ascension vers la cabane de la Dent Blanche est une aventure alpine exigeante mais inoubliable. Le sentier traverse moraines et glaciers miniatures avec des vues spectaculaires sur la Dent Blanche (4357m) et le Grand Cornier. Nuit en cabane recommandée.",
      de: "Der Aufstieg zur Dent Blanche Hütte ist ein anspruchsvolles aber unvergessliches alpines Abenteuer mit spektakulärem Blick auf die Dent Blanche (4357m).",
      en: "The ascent to the Dent Blanche cabin is a demanding but unforgettable alpine adventure with spectacular views of the Dent Blanche (4357m)."
    },
    access: { fr: "Bus depuis Sion jusqu'à Ferpècle", de: "Bus von Sitten nach Ferpècle", en: "Bus from Sion to Ferpècle" },
    image: "assets/images/cabane-dent-blanche.png"
  },
  {
    id: 8,
    name: { fr: "Chemin des Chamois", de: "Gemsenweg", en: "Chamois Trail" },
    region: "Champéry", difficulty: "Difficile", category: "Itinéraires randonnées", duration: "4h00", distance: 10.0,
    elevation: { up: 700, down: 700 }, altitude: { min: 1050, max: 1800 },
    season: { fr: "Juin - Octobre", de: "Juni - Oktober", en: "June - October" },
    coords: [46.1750, 6.8700],
    trail: [[46.1700,6.8600],[46.1708,6.8618],[46.1715,6.8635],[46.1722,6.8652],[46.1728,6.8668],[46.1735,6.8685],[46.1740,6.8700],[46.1745,6.8715],[46.1748,6.8732],[46.1752,6.8748],[46.1755,6.8765],[46.1758,6.8780],[46.1762,6.8795],[46.1765,6.8810],[46.1768,6.8825],[46.1770,6.8840],[46.1772,6.8855],[46.1775,6.8870],[46.1778,6.8885],[46.1780,6.8900]],
    description: {
      fr: "Le Chemin des Chamois offre une traversée sauvage avec vue imprenable sur les Dents du Midi. Le sentier traverse forêts denses et alpages isolés où il n'est pas rare de croiser chamois et marmottes. Un vrai retour à la nature.",
      de: "Der Gemsenweg bietet eine wilde Durchquerung mit atemberaubendem Blick auf die Dents du Midi. Auf dem Weg kann man oft Gämsen und Murmeltiere beobachten.",
      en: "The Chamois Trail offers a wild traverse with breathtaking views of the Dents du Midi. It's not uncommon to spot chamois and marmots along the way."
    },
    access: { fr: "Train AOMC jusqu'à Champéry", de: "Zug AOMC bis Champéry", en: "AOMC train to Champéry" },
    image: "assets/images/chemin-chamois.png"
  },
  {
    id: 9,
    name: { fr: "Tour des Muverans", de: "Muverans Rundtour", en: "Muverans Tour" },
    region: "Ovronnaz", difficulty: "Difficile", category: "Itinéraires randonnées", duration: "2 jours", distance: 28.0,
    elevation: { up: 1600, down: 1600 }, altitude: { min: 1350, max: 2903 },
    season: { fr: "Juillet - Septembre", de: "Juli - September", en: "July - September" },
    coords: [46.2167, 7.1000],
    trail: [[46.2100,7.0900],[46.2108,7.0918],[46.2118,7.0935],[46.2128,7.0952],[46.2138,7.0968],[46.2145,7.0985],[46.2152,7.1002],[46.2160,7.1018],[46.2168,7.1035],[46.2175,7.1050],[46.2180,7.1068],[46.2185,7.1085],[46.2190,7.1102],[46.2195,7.1118],[46.2200,7.1135],[46.2205,7.1150],[46.2210,7.1165],[46.2212,7.1180],[46.2208,7.1195],[46.2200,7.1208],[46.2190,7.1215],[46.2178,7.1210],[46.2168,7.1198],[46.2158,7.1182],[46.2148,7.1165],[46.2138,7.1148],[46.2128,7.1130],[46.2118,7.1112],[46.2110,7.1095],[46.2105,7.1075],[46.2102,7.1055],[46.2100,7.1035],[46.2098,7.1015],[46.2098,7.0995],[46.2098,7.0975],[46.2100,7.0950],[46.2100,7.0925],[46.2100,7.0900]],
    description: {
      fr: "Le Tour des Muverans est un trek de 2 jours qui fait le tour du massif des Muverans. Deux nuits en cabane (Rambert et Fenestral) ponctuent cette boucle qui traverse des paysages variés : alpages, pierriers, cols panoramiques et lacs d'altitude.",
      de: "Die Muverans Rundtour ist ein 2-tägiger Trek rund um das Muverans-Massiv mit Übernachtungen in den Hütten Rambert und Fenestral.",
      en: "The Muverans Tour is a 2-day trek around the Muverans massif with overnight stays at the Rambert and Fenestral cabins."
    },
    access: { fr: "Bus depuis Leytron jusqu'à Ovronnaz", de: "Bus von Leytron nach Ovronnaz", en: "Bus from Leytron to Ovronnaz" },
    image: "assets/images/tour-muverans.png"
  },
  {
    id: 10,
    name: { fr: "Bisse de Clavau", de: "Suone von Clavau", en: "Clavau Bisse" },
    region: "Sion", difficulty: "Facile", category: "Itinéraires randonnées", duration: "1h00", distance: 3.0,
    elevation: { up: 50, down: 50 }, altitude: { min: 600, max: 650 },
    season: { fr: "Toute l'année", de: "Ganzjährig", en: "Year-round" },
    coords: [46.2333, 7.3667],
    trail: [[46.2368,7.3555],[46.2362,7.3568],[46.2355,7.3582],[46.2348,7.3595],[46.2342,7.3608],[46.2335,7.3622],[46.2328,7.3635],[46.2322,7.3648],[46.2318,7.3662],[46.2315,7.3678],[46.2312,7.3692],[46.2310,7.3708],[46.2308,7.3722],[46.2305,7.3738],[46.2302,7.3752],[46.2300,7.3768]],
    description: {
      fr: "Le bisse de Clavau est la promenade idéale pour une balade facile au cœur du vignoble valaisan. Le sentier surplombe Sion et ses châteaux, traversant les terrasses viticoles avec vue sur la vallée du Rhône. Parfait pour un apéritif dans une cave locale après la balade.",
      de: "Die Suone von Clavau ist der ideale Spaziergang durch die Walliser Weinberge mit Blick auf Sitten und seine Schlösser.",
      en: "The Clavau bisse is the ideal walk through the Valaisan vineyards overlooking Sion and its castles."
    },
    access: { fr: "À pied depuis la gare de Sion", de: "Zu Fuss vom Bahnhof Sitten", en: "On foot from Sion station" },
    image: "assets/images/bisse-clavau.png"
  },
  {
    id: 11,
    name: { fr: "Lac Bleu d'Arolla", de: "Blauer See von Arolla", en: "Blue Lake of Arolla" },
    region: "Val d'Hérens", difficulty: "Moyen", category: "Itinéraires randonnées", duration: "1h30", distance: 4.5,
    elevation: { up: 200, down: 200 }, altitude: { min: 2000, max: 2200 },
    season: { fr: "Juin - Octobre", de: "Juni - Oktober", en: "June - October" },
    coords: [46.0333, 7.4833],
    trail: [[46.0428,7.4935],[46.0422,7.4928],[46.0415,7.4920],[46.0408,7.4912],[46.0402,7.4905],[46.0395,7.4898],[46.0388,7.4890],[46.0382,7.4882],[46.0375,7.4875],[46.0368,7.4868],[46.0362,7.4860],[46.0355,7.4852],[46.0348,7.4845],[46.0342,7.4838],[46.0335,7.4830],[46.0330,7.4825]],
    description: {
      fr: "Le Lac Bleu d'Arolla porte bien son nom : ses eaux d'un bleu intense reflètent les glaciers environnants. Ce petit joyau est accessible en une courte randonnée depuis Arolla. Le cadre minéral et glaciaire crée une atmosphère unique, presque irréelle.",
      de: "Der Blaue See von Arolla trägt seinen Namen zu Recht: Sein intensives Blau spiegelt die umliegenden Gletscher wider.",
      en: "The Blue Lake of Arolla lives up to its name: its intense blue waters reflect the surrounding glaciers."
    },
    access: { fr: "Bus depuis Sion jusqu'à Arolla", de: "Bus von Sitten nach Arolla", en: "Bus from Sion to Arolla" },
    image: "assets/images/lac-bleu-arolla.png"
  },
  {
    id: 12,
    name: { fr: "Pont suspendu de Randa", de: "Hängebrücke Randa", en: "Randa Suspension Bridge" },
    region: "Zermatt", difficulty: "Moyen", category: "Itinéraires randonnées", duration: "3h30", distance: 8.0,
    elevation: { up: 500, down: 500 }, altitude: { min: 1400, max: 1900 },
    season: { fr: "Juin - Octobre", de: "Juni - Oktober", en: "June - October" },
    coords: [46.0994, 7.7836],
    trail: [[46.1120,7.7965],[46.1112,7.7958],[46.1105,7.7948],[46.1098,7.7940],[46.1090,7.7932],[46.1082,7.7925],[46.1075,7.7918],[46.1068,7.7910],[46.1060,7.7902],[46.1052,7.7895],[46.1045,7.7888],[46.1038,7.7880],[46.1030,7.7872],[46.1022,7.7865],[46.1015,7.7858],[46.1008,7.7850],[46.1000,7.7842],[46.0992,7.7835],[46.0985,7.7828],[46.0978,7.7820],[46.0970,7.7815]],
    description: {
      fr: "Le pont suspendu Charles Kuonen, long de 494 mètres, est le plus long pont suspendu piéton du monde. Suspendu à 85 mètres au-dessus du sol, il offre des vues spectaculaires sur le Cervin, le Weisshorn et la vallée de Zermatt. Frissons garantis !",
      de: "Die Charles Kuonen Hängebrücke ist mit 494 Metern die längste Fussgänger-Hängebrücke der Welt, 85 Meter über dem Boden mit Blick auf das Matterhorn.",
      en: "The Charles Kuonen suspension bridge, 494 meters long, is the world's longest pedestrian suspension bridge, 85 meters above the ground with views of the Matterhorn."
    },
    access: { fr: "Train jusqu'à Randa (ligne Zermatt)", de: "Zug nach Randa (Linie Zermatt)", en: "Train to Randa (Zermatt line)" },
    image: "assets/images/pont-randa.png"
  }
,
  {
    "id": 100,
    "name": {
      "fr": "Tour du Val d’Anniviers : Grimentz – Vercorin (étape 4)",
      "de": "Tour du Val d’Anniviers : Grimentz – Vercorin (étape 4)",
      "en": "Tour du Val d’Anniviers : Grimentz – Vercorin (étape 4)"
    },
    "region": "Grimentz",
    "difficulty": "Moyen",
    "category": "Itinéraires randonnées",
    "duration": "4h30",
    "distance": 12.93,
    "elevation": {
      "up": 869,
      "down": 393
    },
    "altitude": {
      "min": 1000,
      "max": 2000
    },
    "season": {
      "fr": "Juin - Octobre",
      "de": "Juni - Oktober",
      "en": "June - October"
    },
    "coords": [
      46.36877587292105,
      7.558358561027985
    ],
    "trail": [
      [
        46.2,
        7.3
      ],
      [
        46.21,
        7.31
      ]
    ],
    "description": {
      "fr": "Randonnée extraite de valais.ch. Tour du Val d’Anniviers : Grimentz – Vercorin (étape 4)",
      "de": "Wanderung aus valais.ch extrahiert. Tour du Val d’Anniviers : Grimentz – Vercorin (étape 4)",
      "en": "Hike extracted from valais.ch. Tour du Val d’Anniviers : Grimentz – Vercorin (étape 4)"
    },
    "access": {
      "fr": "En transport public",
      "de": "Mit öffentlichen Verkehrsmitteln",
      "en": "By public transport"
    },
    "image": "assets/images/placeholder.jpg"
  },
  {
    "id": 101,
    "name": {
      "fr": "Chemin de crête Schalb-Jungu",
      "de": "Chemin de crête Schalb-Jungu",
      "en": "Chemin de crête Schalb-Jungu"
    },
    "region": "Grächen",
    "difficulty": "Moyen",
    "category": "Itinéraires randonnées",
    "duration": "2h50",
    "distance": 7.02,
    "elevation": {
      "up": 785,
      "down": 341
    },
    "altitude": {
      "min": 1000,
      "max": 2000
    },
    "season": {
      "fr": "Juin - Octobre",
      "de": "Juni - Oktober",
      "en": "June - October"
    },
    "coords": [
      46.29303908059914,
      7.742366344855023
    ],
    "trail": [
      [
        46.2,
        7.3
      ],
      [
        46.21,
        7.31
      ]
    ],
    "description": {
      "fr": "Randonnée extraite de valais.ch. Chemin de crête Schalb-Jungu",
      "de": "Wanderung aus valais.ch extrahiert. Chemin de crête Schalb-Jungu",
      "en": "Hike extracted from valais.ch. Chemin de crête Schalb-Jungu"
    },
    "access": {
      "fr": "En transport public",
      "de": "Mit öffentlichen Verkehrsmitteln",
      "en": "By public transport"
    },
    "image": "assets/images/placeholder.jpg"
  },
  {
    "id": 102,
    "name": {
      "fr": "Bisse de Bitailla",
      "de": "Bisse de Bitailla",
      "en": "Bisse de Bitailla"
    },
    "region": "Anzère",
    "difficulty": "Moyen",
    "category": "Bisses",
    "duration": "0h00",
    "distance": 0,
    "elevation": {
      "up": 430,
      "down": 630
    },
    "altitude": {
      "min": 1000,
      "max": 2000
    },
    "season": {
      "fr": "Juin - Octobre",
      "de": "Juni - Oktober",
      "en": "June - October"
    },
    "coords": [
      46.27668525301308,
      7.579802941939735
    ],
    "trail": [
      [
        46.2,
        7.3
      ],
      [
        46.21,
        7.31
      ]
    ],
    "description": {
      "fr": "Randonnée extraite de valais.ch. Bisse de Bitailla",
      "de": "Wanderung aus valais.ch extrahiert. Bisse de Bitailla",
      "en": "Hike extracted from valais.ch. Bisse de Bitailla"
    },
    "access": {
      "fr": "En transport public",
      "de": "Mit öffentlichen Verkehrsmitteln",
      "en": "By public transport"
    },
    "image": "assets/images/placeholder.jpg"
  },
  {
    "id": 103,
    "name": {
      "fr": "Tour du Val d’Anniviers",
      "de": "Tour du Val d’Anniviers",
      "en": "Tour du Val d’Anniviers"
    },
    "region": "Chandolin",
    "difficulty": "Moyen",
    "category": "Tours",
    "duration": "0h00",
    "distance": 0,
    "elevation": {
      "up": 225,
      "down": 348
    },
    "altitude": {
      "min": 1000,
      "max": 2000
    },
    "season": {
      "fr": "Juin - Octobre",
      "de": "Juni - Oktober",
      "en": "June - October"
    },
    "coords": [
      46.30844895071349,
      7.572395740729041
    ],
    "trail": [
      [
        46.2,
        7.3
      ],
      [
        46.21,
        7.31
      ]
    ],
    "description": {
      "fr": "Randonnée extraite de valais.ch. Tour du Val d’Anniviers",
      "de": "Wanderung aus valais.ch extrahiert. Tour du Val d’Anniviers",
      "en": "Hike extracted from valais.ch. Tour du Val d’Anniviers"
    },
    "access": {
      "fr": "En transport public",
      "de": "Mit öffentlichen Verkehrsmitteln",
      "en": "By public transport"
    },
    "image": "assets/images/placeholder.jpg"
  },
  {
    "id": 104,
    "name": {
      "fr": "À travers la vallée originelle « La combe de l’A »",
      "de": "À travers la vallée originelle « La combe de l’A »",
      "en": "À travers la vallée originelle « La combe de l’A »"
    },
    "region": "Liddes/Vichères",
    "difficulty": "Difficile",
    "category": "Itinéraires randonnées",
    "duration": "7h30",
    "distance": 21.16,
    "elevation": {
      "up": 342,
      "down": 388
    },
    "altitude": {
      "min": 1000,
      "max": 2000
    },
    "season": {
      "fr": "Juin - Octobre",
      "de": "Juni - Oktober",
      "en": "June - October"
    },
    "coords": [
      46.29289191728987,
      7.491122124737649
    ],
    "trail": [
      [
        46.2,
        7.3
      ],
      [
        46.21,
        7.31
      ]
    ],
    "description": {
      "fr": "Randonnée extraite de valais.ch. À travers la vallée originelle « La combe de l’A »",
      "de": "Wanderung aus valais.ch extrahiert. À travers la vallée originelle « La combe de l’A »",
      "en": "Hike extracted from valais.ch. À travers la vallée originelle « La combe de l’A »"
    },
    "access": {
      "fr": "En transport public",
      "de": "Mit öffentlichen Verkehrsmitteln",
      "en": "By public transport"
    },
    "image": "assets/images/placeholder.jpg"
  },
  {
    "id": 105,
    "name": {
      "fr": "Sentier Edelweiss (Höhbalmen) (n° 30)",
      "de": "Sentier Edelweiss (Höhbalmen) (n° 30)",
      "en": "Sentier Edelweiss (Höhbalmen) (n° 30)"
    },
    "region": "Zermatt",
    "difficulty": "Difficile",
    "category": "Itinéraires randonnées",
    "duration": "7h40",
    "distance": 20.1,
    "elevation": {
      "up": 760,
      "down": 971
    },
    "altitude": {
      "min": 1000,
      "max": 2000
    },
    "season": {
      "fr": "Juin - Octobre",
      "de": "Juni - Oktober",
      "en": "June - October"
    },
    "coords": [
      46.354063570564456,
      7.360534785766154
    ],
    "trail": [
      [
        46.2,
        7.3
      ],
      [
        46.21,
        7.31
      ]
    ],
    "description": {
      "fr": "Randonnée extraite de valais.ch. Sentier Edelweiss (Höhbalmen) (n° 30)",
      "de": "Wanderung aus valais.ch extrahiert. Sentier Edelweiss (Höhbalmen) (n° 30)",
      "en": "Hike extracted from valais.ch. Sentier Edelweiss (Höhbalmen) (n° 30)"
    },
    "access": {
      "fr": "En transport public",
      "de": "Mit öffentlichen Verkehrsmitteln",
      "en": "By public transport"
    },
    "image": "assets/images/placeholder.jpg"
  },
  {
    "id": 106,
    "name": {
      "fr": "Sentier Panorama 4000",
      "de": "Sentier Panorama 4000",
      "en": "Sentier Panorama 4000"
    },
    "region": "Crans-Montana",
    "difficulty": "Moyen",
    "category": "Itinéraires randonnées",
    "duration": "4h20",
    "distance": 13.42,
    "elevation": {
      "up": 551,
      "down": 333
    },
    "altitude": {
      "min": 1000,
      "max": 2000
    },
    "season": {
      "fr": "Juin - Octobre",
      "de": "Juni - Oktober",
      "en": "June - October"
    },
    "coords": [
      46.38137480493832,
      7.501030054203939
    ],
    "trail": [
      [
        46.2,
        7.3
      ],
      [
        46.21,
        7.31
      ]
    ],
    "description": {
      "fr": "Randonnée extraite de valais.ch. Sentier Panorama 4000",
      "de": "Wanderung aus valais.ch extrahiert. Sentier Panorama 4000",
      "en": "Hike extracted from valais.ch. Sentier Panorama 4000"
    },
    "access": {
      "fr": "En transport public",
      "de": "Mit öffentlichen Verkehrsmitteln",
      "en": "By public transport"
    },
    "image": "assets/images/placeholder.jpg"
  },
  {
    "id": 107,
    "name": {
      "fr": "Tour du Val d’Hérens : Grande Dixence – Arolla (étape 2)",
      "de": "Tour du Val d’Hérens : Grande Dixence – Arolla (étape 2)",
      "en": "Tour du Val d’Hérens : Grande Dixence – Arolla (étape 2)"
    },
    "region": "Evolène",
    "difficulty": "Difficile",
    "category": "Itinéraires randonnées",
    "duration": "6h15",
    "distance": 17.93,
    "elevation": {
      "up": 589,
      "down": 893
    },
    "altitude": {
      "min": 1000,
      "max": 2000
    },
    "season": {
      "fr": "Juin - Octobre",
      "de": "Juni - Oktober",
      "en": "June - October"
    },
    "coords": [
      46.241097011140326,
      7.453473356716913
    ],
    "trail": [
      [
        46.2,
        7.3
      ],
      [
        46.21,
        7.31
      ]
    ],
    "description": {
      "fr": "Randonnée extraite de valais.ch. Tour du Val d’Hérens : Grande Dixence – Arolla (étape 2)",
      "de": "Wanderung aus valais.ch extrahiert. Tour du Val d’Hérens : Grande Dixence – Arolla (étape 2)",
      "en": "Hike extracted from valais.ch. Tour du Val d’Hérens : Grande Dixence – Arolla (étape 2)"
    },
    "access": {
      "fr": "En transport public",
      "de": "Mit öffentlichen Verkehrsmitteln",
      "en": "By public transport"
    },
    "image": "assets/images/placeholder.jpg"
  },
  {
    "id": 108,
    "name": {
      "fr": "Chemin des villages d’Evolène",
      "de": "Chemin des villages d’Evolène",
      "en": "Chemin des villages d’Evolène"
    },
    "region": "Evolène",
    "difficulty": "Facile",
    "category": "Itinéraires randonnées",
    "duration": "3h25",
    "distance": 11.09,
    "elevation": {
      "up": 501,
      "down": 797
    },
    "altitude": {
      "min": 1000,
      "max": 2000
    },
    "season": {
      "fr": "Juin - Octobre",
      "de": "Juni - Oktober",
      "en": "June - October"
    },
    "coords": [
      46.24106766983345,
      7.492702466856932
    ],
    "trail": [
      [
        46.2,
        7.3
      ],
      [
        46.21,
        7.31
      ]
    ],
    "description": {
      "fr": "Randonnée extraite de valais.ch. Chemin des villages d’Evolène",
      "de": "Wanderung aus valais.ch extrahiert. Chemin des villages d’Evolène",
      "en": "Hike extracted from valais.ch. Chemin des villages d’Evolène"
    },
    "access": {
      "fr": "En transport public",
      "de": "Mit öffentlichen Verkehrsmitteln",
      "en": "By public transport"
    },
    "image": "assets/images/placeholder.jpg"
  },
  {
    "id": 109,
    "name": {
      "fr": "Randonnée circulaire à la Cabane des Aiguilles Rouges et au Lac Bleu",
      "de": "Randonnée circulaire à la Cabane des Aiguilles Rouges et au Lac Bleu",
      "en": "Randonnée circulaire à la Cabane des Aiguilles Rouges et au Lac Bleu"
    },
    "region": "Arolla",
    "difficulty": "Difficile",
    "category": "Itinéraires randonnées",
    "duration": "5h30",
    "distance": 14.01,
    "elevation": {
      "up": 596,
      "down": 846
    },
    "altitude": {
      "min": 1000,
      "max": 2000
    },
    "season": {
      "fr": "Juin - Octobre",
      "de": "Juni - Oktober",
      "en": "June - October"
    },
    "coords": [
      46.24908076663322,
      7.384125033371546
    ],
    "trail": [
      [
        46.2,
        7.3
      ],
      [
        46.21,
        7.31
      ]
    ],
    "description": {
      "fr": "Randonnée extraite de valais.ch. Randonnée circulaire à la Cabane des Aiguilles Rouges et au Lac Bleu",
      "de": "Wanderung aus valais.ch extrahiert. Randonnée circulaire à la Cabane des Aiguilles Rouges et au Lac Bleu",
      "en": "Hike extracted from valais.ch. Randonnée circulaire à la Cabane des Aiguilles Rouges et au Lac Bleu"
    },
    "access": {
      "fr": "En transport public",
      "de": "Mit öffentlichen Verkehrsmitteln",
      "en": "By public transport"
    },
    "image": "assets/images/placeholder.jpg"
  },
  {
    "id": 110,
    "name": {
      "fr": "Tour du Val d’Hérens : Cabane Becs de Bosson - Nax (étape 5)",
      "de": "Tour du Val d’Hérens : Cabane Becs de Bosson - Nax (étape 5)",
      "en": "Tour du Val d’Hérens : Cabane Becs de Bosson - Nax (étape 5)"
    },
    "region": "Nax",
    "difficulty": "Moyen",
    "category": "Itinéraires randonnées",
    "duration": "3h45",
    "distance": 13.36,
    "elevation": {
      "up": 205,
      "down": 915
    },
    "altitude": {
      "min": 1000,
      "max": 2000
    },
    "season": {
      "fr": "Juin - Octobre",
      "de": "Juni - Oktober",
      "en": "June - October"
    },
    "coords": [
      46.314450894925926,
      7.692153367327287
    ],
    "trail": [
      [
        46.2,
        7.3
      ],
      [
        46.21,
        7.31
      ]
    ],
    "description": {
      "fr": "Randonnée extraite de valais.ch. Tour du Val d’Hérens : Cabane Becs de Bosson - Nax (étape 5)",
      "de": "Wanderung aus valais.ch extrahiert. Tour du Val d’Hérens : Cabane Becs de Bosson - Nax (étape 5)",
      "en": "Hike extracted from valais.ch. Tour du Val d’Hérens : Cabane Becs de Bosson - Nax (étape 5)"
    },
    "access": {
      "fr": "En transport public",
      "de": "Mit öffentlichen Verkehrsmitteln",
      "en": "By public transport"
    },
    "image": "assets/images/placeholder.jpg"
  },
  {
    "id": 111,
    "name": {
      "fr": "Tour du Wildhorn",
      "de": "Tour du Wildhorn",
      "en": "Tour du Wildhorn"
    },
    "region": "Savièse",
    "difficulty": "Moyen",
    "category": "Tours",
    "duration": "0h00",
    "distance": 0,
    "elevation": {
      "up": 343,
      "down": 979
    },
    "altitude": {
      "min": 1000,
      "max": 2000
    },
    "season": {
      "fr": "Juin - Octobre",
      "de": "Juni - Oktober",
      "en": "June - October"
    },
    "coords": [
      46.20086507401958,
      7.666613105823693
    ],
    "trail": [
      [
        46.2,
        7.3
      ],
      [
        46.21,
        7.31
      ]
    ],
    "description": {
      "fr": "Randonnée extraite de valais.ch. Tour du Wildhorn",
      "de": "Wanderung aus valais.ch extrahiert. Tour du Wildhorn",
      "en": "Hike extracted from valais.ch. Tour du Wildhorn"
    },
    "access": {
      "fr": "En transport public",
      "de": "Mit öffentlichen Verkehrsmitteln",
      "en": "By public transport"
    },
    "image": "assets/images/placeholder.jpg"
  },
  {
    "id": 112,
    "name": {
      "fr": "Sentier botanique \"mille fleurs\"",
      "de": "Sentier botanique \"mille fleurs\"",
      "en": "Sentier botanique \"mille fleurs\""
    },
    "region": "Ovronnaz",
    "difficulty": "Moyen",
    "category": "Sentiers découvertes",
    "duration": "0h00",
    "distance": 0,
    "elevation": {
      "up": 487,
      "down": 546
    },
    "altitude": {
      "min": 1000,
      "max": 2000
    },
    "season": {
      "fr": "Juin - Octobre",
      "de": "Juni - Oktober",
      "en": "June - October"
    },
    "coords": [
      46.365506646138044,
      7.613585586275466
    ],
    "trail": [
      [
        46.2,
        7.3
      ],
      [
        46.21,
        7.31
      ]
    ],
    "description": {
      "fr": "Randonnée extraite de valais.ch. Sentier botanique \"mille fleurs\"",
      "de": "Wanderung aus valais.ch extrahiert. Sentier botanique \"mille fleurs\"",
      "en": "Hike extracted from valais.ch. Sentier botanique \"mille fleurs\""
    },
    "access": {
      "fr": "En transport public",
      "de": "Mit öffentlichen Verkehrsmitteln",
      "en": "By public transport"
    },
    "image": "assets/images/placeholder.jpg"
  },
  {
    "id": 113,
    "name": {
      "fr": "Monts ensoleillés de Leuk",
      "de": "Monts ensoleillés de Leuk",
      "en": "Monts ensoleillés de Leuk"
    },
    "region": "Gampel-Bratsch-Jeizinen",
    "difficulty": "Facile",
    "category": "Itinéraires randonnées",
    "duration": "3h20",
    "distance": 11.64,
    "elevation": {
      "up": 714,
      "down": 730
    },
    "altitude": {
      "min": 1000,
      "max": 2000
    },
    "season": {
      "fr": "Juin - Octobre",
      "de": "Juni - Oktober",
      "en": "June - October"
    },
    "coords": [
      46.22105419859217,
      7.653641630656621
    ],
    "trail": [
      [
        46.2,
        7.3
      ],
      [
        46.21,
        7.31
      ]
    ],
    "description": {
      "fr": "Randonnée extraite de valais.ch. Monts ensoleillés de Leuk",
      "de": "Wanderung aus valais.ch extrahiert. Monts ensoleillés de Leuk",
      "en": "Hike extracted from valais.ch. Monts ensoleillés de Leuk"
    },
    "access": {
      "fr": "En transport public",
      "de": "Mit öffentlichen Verkehrsmitteln",
      "en": "By public transport"
    },
    "image": "assets/images/placeholder.jpg"
  },
  {
    "id": 114,
    "name": {
      "fr": "Bisse de Lentine et Bisse de Mont d'Orge",
      "de": "Bisse de Lentine et Bisse de Mont d'Orge",
      "en": "Bisse de Lentine et Bisse de Mont d'Orge"
    },
    "region": "Savièse",
    "difficulty": "Moyen",
    "category": "Bisses",
    "duration": "0h00",
    "distance": 0,
    "elevation": {
      "up": 782,
      "down": 365
    },
    "altitude": {
      "min": 1000,
      "max": 2000
    },
    "season": {
      "fr": "Juin - Octobre",
      "de": "Juni - Oktober",
      "en": "June - October"
    },
    "coords": [
      46.34857879148112,
      7.527642536092987
    ],
    "trail": [
      [
        46.2,
        7.3
      ],
      [
        46.21,
        7.31
      ]
    ],
    "description": {
      "fr": "Randonnée extraite de valais.ch. Bisse de Lentine et Bisse de Mont d'Orge",
      "de": "Wanderung aus valais.ch extrahiert. Bisse de Lentine et Bisse de Mont d'Orge",
      "en": "Hike extracted from valais.ch. Bisse de Lentine et Bisse de Mont d'Orge"
    },
    "access": {
      "fr": "En transport public",
      "de": "Mit öffentlichen Verkehrsmitteln",
      "en": "By public transport"
    },
    "image": "assets/images/placeholder.jpg"
  },
  {
    "id": 115,
    "name": {
      "fr": "Ascension de l'Eggerhorn et descente dans la vallée de Binn",
      "de": "Ascension de l'Eggerhorn et descente dans la vallée de Binn",
      "en": "Ascension de l'Eggerhorn et descente dans la vallée de Binn"
    },
    "region": "Binn",
    "difficulty": "Difficile",
    "category": "Itinéraires randonnées",
    "duration": "6h45",
    "distance": 14.8,
    "elevation": {
      "up": 651,
      "down": 834
    },
    "altitude": {
      "min": 1000,
      "max": 2000
    },
    "season": {
      "fr": "Juin - Octobre",
      "de": "Juni - Oktober",
      "en": "June - October"
    },
    "coords": [
      46.23285406683693,
      7.687523421680315
    ],
    "trail": [
      [
        46.2,
        7.3
      ],
      [
        46.21,
        7.31
      ]
    ],
    "description": {
      "fr": "Randonnée extraite de valais.ch. Ascension de l'Eggerhorn et descente dans la vallée de Binn",
      "de": "Wanderung aus valais.ch extrahiert. Ascension de l'Eggerhorn et descente dans la vallée de Binn",
      "en": "Hike extracted from valais.ch. Ascension de l'Eggerhorn et descente dans la vallée de Binn"
    },
    "access": {
      "fr": "En transport public",
      "de": "Mit öffentlichen Verkehrsmitteln",
      "en": "By public transport"
    },
    "image": "assets/images/placeholder.jpg"
  },
  {
    "id": 116,
    "name": {
      "fr": "Randonnée géologique au lac de retenue Vieux-Emosson",
      "de": "Randonnée géologique au lac de retenue Vieux-Emosson",
      "en": "Randonnée géologique au lac de retenue Vieux-Emosson"
    },
    "region": "Finhaut-Emosson",
    "difficulty": "Difficile",
    "category": "Itinéraires randonnées",
    "duration": "4h40",
    "distance": 12.29,
    "elevation": {
      "up": 785,
      "down": 500
    },
    "altitude": {
      "min": 1000,
      "max": 2000
    },
    "season": {
      "fr": "Juin - Octobre",
      "de": "Juni - Oktober",
      "en": "June - October"
    },
    "coords": [
      46.2112024267336,
      7.62318662372027
    ],
    "trail": [
      [
        46.2,
        7.3
      ],
      [
        46.21,
        7.31
      ]
    ],
    "description": {
      "fr": "Randonnée extraite de valais.ch. Randonnée géologique au lac de retenue Vieux-Emosson",
      "de": "Wanderung aus valais.ch extrahiert. Randonnée géologique au lac de retenue Vieux-Emosson",
      "en": "Hike extracted from valais.ch. Randonnée géologique au lac de retenue Vieux-Emosson"
    },
    "access": {
      "fr": "En transport public",
      "de": "Mit öffentlichen Verkehrsmitteln",
      "en": "By public transport"
    },
    "image": "assets/images/placeholder.jpg"
  },
  {
    "id": 117,
    "name": {
      "fr": "Fionnay – Col des Otanes - Corbassière",
      "de": "Fionnay – Col des Otanes - Corbassière",
      "en": "Fionnay – Col des Otanes - Corbassière"
    },
    "region": "Bruson",
    "difficulty": "Difficile",
    "category": "Trail running",
    "duration": "4h03",
    "distance": 16.46,
    "elevation": {
      "up": 808,
      "down": 252
    },
    "altitude": {
      "min": 1000,
      "max": 2000
    },
    "season": {
      "fr": "Juin - Octobre",
      "de": "Juni - Oktober",
      "en": "June - October"
    },
    "coords": [
      46.33304029632809,
      7.526217078325862
    ],
    "trail": [
      [
        46.2,
        7.3
      ],
      [
        46.21,
        7.31
      ]
    ],
    "description": {
      "fr": "Randonnée extraite de valais.ch. Fionnay – Col des Otanes - Corbassière",
      "de": "Wanderung aus valais.ch extrahiert. Fionnay – Col des Otanes - Corbassière",
      "en": "Hike extracted from valais.ch. Fionnay – Col des Otanes - Corbassière"
    },
    "access": {
      "fr": "En transport public",
      "de": "Mit öffentlichen Verkehrsmitteln",
      "en": "By public transport"
    },
    "image": "assets/images/placeholder.jpg"
  },
  {
    "id": 118,
    "name": {
      "fr": "Petit Bisse et Bisse de la Tsandra à Conthey",
      "de": "Petit Bisse et Bisse de la Tsandra à Conthey",
      "en": "Petit Bisse et Bisse de la Tsandra à Conthey"
    },
    "region": "Les Coteaux du Soleil",
    "difficulty": "Facile",
    "category": "Itinéraires randonnées",
    "duration": "3h23",
    "distance": 11.84,
    "elevation": {
      "up": 455,
      "down": 823
    },
    "altitude": {
      "min": 1000,
      "max": 2000
    },
    "season": {
      "fr": "Juin - Octobre",
      "de": "Juni - Oktober",
      "en": "June - October"
    },
    "coords": [
      46.36785321835727,
      7.536694598711585
    ],
    "trail": [
      [
        46.2,
        7.3
      ],
      [
        46.21,
        7.31
      ]
    ],
    "description": {
      "fr": "Randonnée extraite de valais.ch. Petit Bisse et Bisse de la Tsandra à Conthey",
      "de": "Wanderung aus valais.ch extrahiert. Petit Bisse et Bisse de la Tsandra à Conthey",
      "en": "Hike extracted from valais.ch. Petit Bisse et Bisse de la Tsandra à Conthey"
    },
    "access": {
      "fr": "En transport public",
      "de": "Mit öffentlichen Verkehrsmitteln",
      "en": "By public transport"
    },
    "image": "assets/images/placeholder.jpg"
  },
  {
    "id": 119,
    "name": {
      "fr": "À travers le parc paysager de Binn : Imfeld–lac de Mässer–Binn",
      "de": "À travers le parc paysager de Binn : Imfeld–lac de Mässer–Binn",
      "en": "À travers le parc paysager de Binn : Imfeld–lac de Mässer–Binn"
    },
    "region": "Binn",
    "difficulty": "Moyen",
    "category": "Itinéraires randonnées",
    "duration": "3h45",
    "distance": 9.44,
    "elevation": {
      "up": 631,
      "down": 211
    },
    "altitude": {
      "min": 1000,
      "max": 2000
    },
    "season": {
      "fr": "Juin - Octobre",
      "de": "Juni - Oktober",
      "en": "June - October"
    },
    "coords": [
      46.23386558606164,
      7.522946188104964
    ],
    "trail": [
      [
        46.2,
        7.3
      ],
      [
        46.21,
        7.31
      ]
    ],
    "description": {
      "fr": "Randonnée extraite de valais.ch. À travers le parc paysager de Binn : Imfeld–lac de Mässer–Binn",
      "de": "Wanderung aus valais.ch extrahiert. À travers le parc paysager de Binn : Imfeld–lac de Mässer–Binn",
      "en": "Hike extracted from valais.ch. À travers le parc paysager de Binn : Imfeld–lac de Mässer–Binn"
    },
    "access": {
      "fr": "En transport public",
      "de": "Mit öffentlichen Verkehrsmitteln",
      "en": "By public transport"
    },
    "image": "assets/images/placeholder.jpg"
  },
  {
    "id": 120,
    "name": {
      "fr": "Refuges d'Orny et de Trient",
      "de": "Refuges d'Orny et de Trient",
      "en": "Refuges d'Orny et de Trient"
    },
    "region": "Champex-Lac",
    "difficulty": "Difficile",
    "category": "Itinéraires randonnées",
    "duration": "5h40",
    "distance": 13.45,
    "elevation": {
      "up": 790,
      "down": 232
    },
    "altitude": {
      "min": 1000,
      "max": 2000
    },
    "season": {
      "fr": "Juin - Octobre",
      "de": "Juni - Oktober",
      "en": "June - October"
    },
    "coords": [
      46.39682534462047,
      7.736586152344538
    ],
    "trail": [
      [
        46.2,
        7.3
      ],
      [
        46.21,
        7.31
      ]
    ],
    "description": {
      "fr": "Randonnée extraite de valais.ch. Refuges d'Orny et de Trient",
      "de": "Wanderung aus valais.ch extrahiert. Refuges d'Orny et de Trient",
      "en": "Hike extracted from valais.ch. Refuges d'Orny et de Trient"
    },
    "access": {
      "fr": "En transport public",
      "de": "Mit öffentlichen Verkehrsmitteln",
      "en": "By public transport"
    },
    "image": "assets/images/placeholder.jpg"
  },
  {
    "id": 121,
    "name": {
      "fr": "Randonnée des terrasses viticoles à Martigny",
      "de": "Randonnée des terrasses viticoles à Martigny",
      "en": "Randonnée des terrasses viticoles à Martigny"
    },
    "region": "Martigny",
    "difficulty": "Facile",
    "category": "Itinéraires randonnées",
    "duration": "1h45",
    "distance": 6.39,
    "elevation": {
      "up": 631,
      "down": 601
    },
    "altitude": {
      "min": 1000,
      "max": 2000
    },
    "season": {
      "fr": "Juin - Octobre",
      "de": "Juni - Oktober",
      "en": "June - October"
    },
    "coords": [
      46.338811152506395,
      7.709801952754477
    ],
    "trail": [
      [
        46.2,
        7.3
      ],
      [
        46.21,
        7.31
      ]
    ],
    "description": {
      "fr": "Randonnée extraite de valais.ch. Randonnée des terrasses viticoles à Martigny",
      "de": "Wanderung aus valais.ch extrahiert. Randonnée des terrasses viticoles à Martigny",
      "en": "Hike extracted from valais.ch. Randonnée des terrasses viticoles à Martigny"
    },
    "access": {
      "fr": "En transport public",
      "de": "Mit öffentlichen Verkehrsmitteln",
      "en": "By public transport"
    },
    "image": "assets/images/placeholder.jpg"
  },
  {
    "id": 122,
    "name": {
      "fr": "Bettmerhorn – pont suspendu Aspi-Titter",
      "de": "Bettmerhorn – pont suspendu Aspi-Titter",
      "en": "Bettmerhorn – pont suspendu Aspi-Titter"
    },
    "region": "Bettmeralp",
    "difficulty": "Moyen",
    "category": "Itinéraires randonnées",
    "duration": "5h30",
    "distance": 15.57,
    "elevation": {
      "up": 882,
      "down": 516
    },
    "altitude": {
      "min": 1000,
      "max": 2000
    },
    "season": {
      "fr": "Juin - Octobre",
      "de": "Juni - Oktober",
      "en": "June - October"
    },
    "coords": [
      46.20909921420987,
      7.330213319160978
    ],
    "trail": [
      [
        46.2,
        7.3
      ],
      [
        46.21,
        7.31
      ]
    ],
    "description": {
      "fr": "Randonnée extraite de valais.ch. Bettmerhorn – pont suspendu Aspi-Titter",
      "de": "Wanderung aus valais.ch extrahiert. Bettmerhorn – pont suspendu Aspi-Titter",
      "en": "Hike extracted from valais.ch. Bettmerhorn – pont suspendu Aspi-Titter"
    },
    "access": {
      "fr": "En transport public",
      "de": "Mit öffentlichen Verkehrsmitteln",
      "en": "By public transport"
    },
    "image": "assets/images/placeholder.jpg"
  },
  {
    "id": 123,
    "name": {
      "fr": "Sentier didactique du safran",
      "de": "Sentier didactique du safran",
      "en": "Sentier didactique du safran"
    },
    "region": "Mund",
    "difficulty": "Moyen",
    "category": "Sentiers découvertes",
    "duration": "0h00",
    "distance": 0,
    "elevation": {
      "up": 432,
      "down": 471
    },
    "altitude": {
      "min": 1000,
      "max": 2000
    },
    "season": {
      "fr": "Juin - Octobre",
      "de": "Juni - Oktober",
      "en": "June - October"
    },
    "coords": [
      46.280241453132795,
      7.721010726947049
    ],
    "trail": [
      [
        46.2,
        7.3
      ],
      [
        46.21,
        7.31
      ]
    ],
    "description": {
      "fr": "Randonnée extraite de valais.ch. Sentier didactique du safran",
      "de": "Wanderung aus valais.ch extrahiert. Sentier didactique du safran",
      "en": "Hike extracted from valais.ch. Sentier didactique du safran"
    },
    "access": {
      "fr": "En transport public",
      "de": "Mit öffentlichen Verkehrsmitteln",
      "en": "By public transport"
    },
    "image": "assets/images/placeholder.jpg"
  },
  {
    "id": 124,
    "name": {
      "fr": "Jatzilicku-Trail",
      "de": "Jatzilicku-Trail",
      "en": "Jatzilicku-Trail"
    },
    "region": "Saas-Almagell",
    "difficulty": "Difficile",
    "category": "Trail running",
    "duration": "5h30",
    "distance": 23.65,
    "elevation": {
      "up": 947,
      "down": 476
    },
    "altitude": {
      "min": 1000,
      "max": 2000
    },
    "season": {
      "fr": "Juin - Octobre",
      "de": "Juni - Oktober",
      "en": "June - October"
    },
    "coords": [
      46.27091479128996,
      7.5061857832236845
    ],
    "trail": [
      [
        46.2,
        7.3
      ],
      [
        46.21,
        7.31
      ]
    ],
    "description": {
      "fr": "Randonnée extraite de valais.ch. Jatzilicku-Trail",
      "de": "Wanderung aus valais.ch extrahiert. Jatzilicku-Trail",
      "en": "Hike extracted from valais.ch. Jatzilicku-Trail"
    },
    "access": {
      "fr": "En transport public",
      "de": "Mit öffentlichen Verkehrsmitteln",
      "en": "By public transport"
    },
    "image": "assets/images/placeholder.jpg"
  },
  {
    "id": 125,
    "name": {
      "fr": "Längfluh / Saas-Fee",
      "de": "Längfluh / Saas-Fee",
      "en": "Längfluh / Saas-Fee"
    },
    "region": "Saas-Fee",
    "difficulty": "Moyen",
    "category": "Itinéraires randonnées",
    "duration": "2h15",
    "distance": 6.45,
    "elevation": {
      "up": 532,
      "down": 537
    },
    "altitude": {
      "min": 1000,
      "max": 2000
    },
    "season": {
      "fr": "Juin - Octobre",
      "de": "Juni - Oktober",
      "en": "June - October"
    },
    "coords": [
      46.22696259348435,
      7.752354829506133
    ],
    "trail": [
      [
        46.2,
        7.3
      ],
      [
        46.21,
        7.31
      ]
    ],
    "description": {
      "fr": "Randonnée extraite de valais.ch. Längfluh / Saas-Fee",
      "de": "Wanderung aus valais.ch extrahiert. Längfluh / Saas-Fee",
      "en": "Hike extracted from valais.ch. Längfluh / Saas-Fee"
    },
    "access": {
      "fr": "En transport public",
      "de": "Mit öffentlichen Verkehrsmitteln",
      "en": "By public transport"
    },
    "image": "assets/images/placeholder.jpg"
  },
  {
    "id": 126,
    "name": {
      "fr": "Scènes sur le parcours de l'eau",
      "de": "Scènes sur le parcours de l'eau",
      "en": "Scènes sur le parcours de l'eau"
    },
    "region": "Champéry",
    "difficulty": "Moyen",
    "category": "Sentiers découvertes",
    "duration": "0h00",
    "distance": 0,
    "elevation": {
      "up": 814,
      "down": 532
    },
    "altitude": {
      "min": 1000,
      "max": 2000
    },
    "season": {
      "fr": "Juin - Octobre",
      "de": "Juni - Oktober",
      "en": "June - October"
    },
    "coords": [
      46.29339401362732,
      7.496728853846761
    ],
    "trail": [
      [
        46.2,
        7.3
      ],
      [
        46.21,
        7.31
      ]
    ],
    "description": {
      "fr": "Randonnée extraite de valais.ch. Scènes sur le parcours de l'eau",
      "de": "Wanderung aus valais.ch extrahiert. Scènes sur le parcours de l'eau",
      "en": "Hike extracted from valais.ch. Scènes sur le parcours de l'eau"
    },
    "access": {
      "fr": "En transport public",
      "de": "Mit öffentlichen Verkehrsmitteln",
      "en": "By public transport"
    },
    "image": "assets/images/placeholder.jpg"
  },
  {
    "id": 127,
    "name": {
      "fr": "Grand bisse de St-Luc et bisse Roux",
      "de": "Grand bisse de St-Luc et bisse Roux",
      "en": "Grand bisse de St-Luc et bisse Roux"
    },
    "region": "St-Luc",
    "difficulty": "Moyen",
    "category": "Bisses",
    "duration": "0h00",
    "distance": 0,
    "elevation": {
      "up": 604,
      "down": 875
    },
    "altitude": {
      "min": 1000,
      "max": 2000
    },
    "season": {
      "fr": "Juin - Octobre",
      "de": "Juni - Oktober",
      "en": "June - October"
    },
    "coords": [
      46.28030882474735,
      7.6703504808523215
    ],
    "trail": [
      [
        46.2,
        7.3
      ],
      [
        46.21,
        7.31
      ]
    ],
    "description": {
      "fr": "Randonnée extraite de valais.ch. Grand bisse de St-Luc et bisse Roux",
      "de": "Wanderung aus valais.ch extrahiert. Grand bisse de St-Luc et bisse Roux",
      "en": "Hike extracted from valais.ch. Grand bisse de St-Luc et bisse Roux"
    },
    "access": {
      "fr": "En transport public",
      "de": "Mit öffentlichen Verkehrsmitteln",
      "en": "By public transport"
    },
    "image": "assets/images/placeholder.jpg"
  },
  {
    "id": 128,
    "name": {
      "fr": "Chemin d'Ossona",
      "de": "Chemin d'Ossona",
      "en": "Chemin d'Ossona"
    },
    "region": "Vernamiège",
    "difficulty": "Moyen",
    "category": "Itinéraires randonnées",
    "duration": "2h30",
    "distance": 7.72,
    "elevation": {
      "up": 638,
      "down": 225
    },
    "altitude": {
      "min": 1000,
      "max": 2000
    },
    "season": {
      "fr": "Juin - Octobre",
      "de": "Juni - Oktober",
      "en": "June - October"
    },
    "coords": [
      46.38891724252884,
      7.726492878179709
    ],
    "trail": [
      [
        46.2,
        7.3
      ],
      [
        46.21,
        7.31
      ]
    ],
    "description": {
      "fr": "Randonnée extraite de valais.ch. Chemin d'Ossona",
      "de": "Wanderung aus valais.ch extrahiert. Chemin d'Ossona",
      "en": "Hike extracted from valais.ch. Chemin d'Ossona"
    },
    "access": {
      "fr": "En transport public",
      "de": "Mit öffentlichen Verkehrsmitteln",
      "en": "By public transport"
    },
    "image": "assets/images/placeholder.jpg"
  },
  {
    "id": 129,
    "name": {
      "fr": "Tour autour du lac-réservoir de Mattmark dans le Saastal",
      "de": "Tour autour du lac-réservoir de Mattmark dans le Saastal",
      "en": "Tour autour du lac-réservoir de Mattmark dans le Saastal"
    },
    "region": "Saas-Almagell",
    "difficulty": "Facile",
    "category": "Itinéraires randonnées",
    "duration": "2h15",
    "distance": 8.04,
    "elevation": {
      "up": 528,
      "down": 814
    },
    "altitude": {
      "min": 1000,
      "max": 2000
    },
    "season": {
      "fr": "Juin - Octobre",
      "de": "Juni - Oktober",
      "en": "June - October"
    },
    "coords": [
      46.35600899267181,
      7.61055090494352
    ],
    "trail": [
      [
        46.2,
        7.3
      ],
      [
        46.21,
        7.31
      ]
    ],
    "description": {
      "fr": "Randonnée extraite de valais.ch. Tour autour du lac-réservoir de Mattmark dans le Saastal",
      "de": "Wanderung aus valais.ch extrahiert. Tour autour du lac-réservoir de Mattmark dans le Saastal",
      "en": "Hike extracted from valais.ch. Tour autour du lac-réservoir de Mattmark dans le Saastal"
    },
    "access": {
      "fr": "En transport public",
      "de": "Mit öffentlichen Verkehrsmitteln",
      "en": "By public transport"
    },
    "image": "assets/images/placeholder.jpg"
  }

];

const DIFFICULTY_COLORS = {
  "Facile": "#4CAF50", "Moyen": "#2196F3", "Difficile": "#FF9800"
};
const CATEGORY_COLORS = {
  "Itinéraires randonnées": "#1B6B3A",
  "Bisses": "#3B82F6",
  "Tours": "#8E44AD",
  "Sentiers découvertes": "#F39C12",
  "Trail running": "#E74C3C"
};
const DIFFICULTY_LABELS = {
  "Facile": { fr: "Facile", de: "Leicht", en: "Easy" },
  "Moyen": { fr: "Moyen", de: "Mittel", en: "Medium" },
  "Difficile": { fr: "Difficile", de: "Schwer", en: "Hard" }
};
