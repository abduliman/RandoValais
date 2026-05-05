// RandoValais — Internationalization
const I18N = {
  fr: {
    siteTitle: "RandoValais",
    subtitle: "Randonner en Valais, c'est magique !",
    nav: { home: "Accueil", hikes: "Randonnées", favorites: "Favoris", map: "Carte", profile: "Profil" },
    hero: { cta: "Découvrir les randonnées", stats_hikes: "Randonnées", stats_km: "km de sentiers", stats_elev: "m de dénivelé", description: "Découvrez les plus beaux bisses des Alpes suisses. Un guide complet avec itinéraires détaillés, cartes interactives et conseils d'expert pour vos randonnées en Valais." },
    hikes: { title: "Nos Randonnées", search: "Rechercher une randonnée...", filterAll: "Toutes", duration: "Durée", elevation: "Dénivelé", distance: "Distance", difficulty: "Difficulté", sort: "Trier par", sortPop: "Popularité", sortDiff: "Difficulté", sortDur: "Durée", region: "Région", noResults: "Aucune randonnée trouvée" },
    detail: { info: "Informations", description: "Description", access: "Accès", comments: "Commentaires", photos: "Photos", like: "J'aime", liked: "Aimé", addFav: "Ajouter aux favoris", removeFav: "Retirer des favoris", altMin: "Alt. min", altMax: "Alt. max", season: "Saison", back: "Retour" },
    comments: { title: "Commentaires", add: "Ajouter un commentaire", name: "Votre pseudo", text: "Votre commentaire...", rating: "Note", submit: "Publier", noComments: "Aucun commentaire. Soyez le premier !" },
    photos: { title: "Galerie Photos", add: "Ajouter une photo", upload: "Choisir une photo", caption: "Légende (optionnel)", submit: "Envoyer", noPhotos: "Aucune photo. Partagez la vôtre !" },
    favorites: { title: "Mes Favoris", empty: "Vous n'avez pas encore de favoris. Explorez les randonnées et ajoutez-en !" },
    login: { title: "Connexion", subtitle: "Rejoignez la communauté RandoValais", name: "Nom d'utilisateur", email: "Email", password: "Mot de passe", submit: "Se connecter", register: "Créer un compte", guest: "Continuer en invité", or: "ou", welcome: "Bienvenue" },
    profile: { title: "Mon Profil", likes: "Randos aimées", favs: "Favoris", comments: "Commentaires", photos: "Photos", logout: "Déconnexion", member: "Membre depuis" },
    map: { title: "Carte des Randonnées" },
    footer: { made: "Fait avec ❤️ en Valais", rights: "Tous droits réservés" },
    lang: { fr: "Français", de: "Deutsch", en: "English" }
  },
  de: {
    siteTitle: "RandoValais",
    subtitle: "Wandern im Wallis ist magisch!",
    nav: { home: "Startseite", hikes: "Wanderungen", favorites: "Favoriten", map: "Karte", profile: "Profil" },
    hero: { cta: "Wanderungen entdecken", stats_hikes: "Wanderungen", stats_km: "km Wanderwege", stats_elev: "m Höhenunterschied", description: "Entdecken Sie die schönsten Suonen der Schweizer Alpen. Ein vollständiger Führer mit detaillierten Routen, interaktiven Karten und Expertentipps für Ihre Wanderungen im Wallis." },
    hikes: { title: "Unsere Wanderungen", search: "Wanderung suchen...", filterAll: "Alle", duration: "Dauer", elevation: "Höhenunterschied", distance: "Distanz", difficulty: "Schwierigkeit", sort: "Sortieren", sortPop: "Beliebtheit", sortDiff: "Schwierigkeit", sortDur: "Dauer", region: "Region", noResults: "Keine Wanderung gefunden" },
    detail: { info: "Informationen", description: "Beschreibung", access: "Zugang", comments: "Kommentare", photos: "Fotos", like: "Gefällt mir", liked: "Gefällt", addFav: "Zu Favoriten", removeFav: "Aus Favoriten", altMin: "Min. Höhe", altMax: "Max. Höhe", season: "Saison", back: "Zurück" },
    comments: { title: "Kommentare", add: "Kommentar hinzufügen", name: "Benutzername", text: "Ihr Kommentar...", rating: "Bewertung", submit: "Veröffentlichen", noComments: "Keine Kommentare. Seien Sie der Erste!" },
    photos: { title: "Fotogalerie", add: "Foto hinzufügen", upload: "Foto wählen", caption: "Bildunterschrift (optional)", submit: "Senden", noPhotos: "Keine Fotos. Teilen Sie Ihres!" },
    favorites: { title: "Meine Favoriten", empty: "Sie haben noch keine Favoriten. Entdecken Sie Wanderungen!" },
    login: { title: "Anmelden", subtitle: "Treten Sie der RandoValais-Community bei", name: "Benutzername", email: "E-Mail", password: "Passwort", submit: "Anmelden", register: "Konto erstellen", guest: "Als Gast fortfahren", or: "oder", welcome: "Willkommen" },
    profile: { title: "Mein Profil", likes: "Gefällt mir", favs: "Favoriten", comments: "Kommentare", photos: "Fotos", logout: "Abmelden", member: "Mitglied seit" },
    map: { title: "Wanderkarte" },
    footer: { made: "Mit ❤️ im Wallis gemacht", rights: "Alle Rechte vorbehalten" },
    lang: { fr: "Français", de: "Deutsch", en: "English" }
  },
  en: {
    siteTitle: "RandoValais",
    subtitle: "Hiking in Valais is magical!",
    nav: { home: "Home", hikes: "Hikes", favorites: "Favorites", map: "Map", profile: "Profile" },
    hero: { cta: "Discover hikes", stats_hikes: "Hikes", stats_km: "km of trails", stats_elev: "m elevation", description: "Discover the most beautiful bisses of the Swiss Alps. A complete guide with detailed itineraries, interactive maps and expert advice for your hikes in Valais." },
    hikes: { title: "Our Hikes", search: "Search a hike...", filterAll: "All", duration: "Duration", elevation: "Elevation", distance: "Distance", difficulty: "Difficulty", sort: "Sort by", sortPop: "Popularity", sortDiff: "Difficulty", sortDur: "Duration", region: "Region", noResults: "No hikes found" },
    detail: { info: "Information", description: "Description", access: "Access", comments: "Comments", photos: "Photos", like: "Like", liked: "Liked", addFav: "Add to favorites", removeFav: "Remove from favorites", altMin: "Min alt.", altMax: "Max alt.", season: "Season", back: "Back" },
    comments: { title: "Comments", add: "Add a comment", name: "Your name", text: "Your comment...", rating: "Rating", submit: "Post", noComments: "No comments yet. Be the first!" },
    photos: { title: "Photo Gallery", add: "Add a photo", upload: "Choose a photo", caption: "Caption (optional)", submit: "Upload", noPhotos: "No photos yet. Share yours!" },
    favorites: { title: "My Favorites", empty: "No favorites yet. Explore hikes and add some!" },
    login: { title: "Login", subtitle: "Join the RandoValais community", name: "Username", email: "Email", password: "Password", submit: "Sign in", register: "Create account", guest: "Continue as guest", or: "or", welcome: "Welcome" },
    profile: { title: "My Profile", likes: "Liked hikes", favs: "Favorites", comments: "Comments", photos: "Photos", logout: "Logout", member: "Member since" },
    map: { title: "Hiking Map" },
    footer: { made: "Made with ❤️ in Valais", rights: "All rights reserved" },
    lang: { fr: "Français", de: "Deutsch", en: "English" }
  }
};

function t(key) {
  const lang = localStorage.getItem('rv_lang') || 'fr';
  const keys = key.split('.');
  let val = I18N[lang];
  for (const k of keys) { val = val?.[k]; }
  return val || key;
}

function tHike(obj) {
  const lang = localStorage.getItem('rv_lang') || 'fr';
  return obj?.[lang] || obj?.fr || '';
}
