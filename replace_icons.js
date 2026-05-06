const fs = require('fs');

const replacements = {
  // nav / generic
  '⚙️ Admin': '<i data-lucide="settings" class="icon-inline"></i> Admin',
  '⚙️ Dashboard Admin': '<i data-lucide="layout-dashboard" class="icon-inline"></i> Dashboard Admin',
  '🌙': '<i data-lucide="moon"></i>',
  '👤': '<i data-lucide="user"></i>',
  '📍': '<i data-lucide="map-pin"></i>',
  '🗺️': '<i data-lucide="map"></i>',
  '📥': '<i data-lucide="download"></i>',
  '💬': '<i data-lucide="message-square"></i>',
  '📧': '<i data-lucide="mail"></i>',
  '🔗': '<i data-lucide="link"></i>',
  
  // detail icons
  '⏱️': '<i data-lucide="clock" class="icon-inline"></i>',
  '📏': '<i data-lucide="ruler" class="icon-inline"></i>',
  '⬆️': '<i data-lucide="arrow-up" class="icon-inline"></i>',
  '⬇️': '<i data-lucide="arrow-down" class="icon-inline"></i>',
  '🏔️': '<i data-lucide="mountain" class="icon-inline"></i>',
  '🌤️': '<i data-lucide="sun-dim" class="icon-inline"></i>',
  '🔥': '<i data-lucide="flame" class="icon-inline"></i>',
  '🎒': '<i data-lucide="backpack" class="icon-inline"></i>',
  '📸': '<i data-lucide="camera" class="icon-inline"></i>',
  '📝': '<i data-lucide="pen-tool" class="icon-inline"></i>',
  '👥': '<i data-lucide="users" class="icon-inline"></i>',
  '🚁': '<i data-lucide="plane" class="icon-inline"></i>',
  '🚔': '<i data-lucide="shield-alert" class="icon-inline"></i>',
  '🚑': '<i data-lucide="cross" class="icon-inline"></i>',
  '⛰️': '<i data-lucide="mountain-snow" class="icon-inline"></i>',

  // js/app.js specific emojis
  '🚪 Déconnexion': '<i data-lucide="log-out" class="icon-inline"></i> Déconnexion',
  '📌': '<i data-lucide="map-pin" class="icon-inline"></i>',
  '📞': '<i data-lucide="phone" class="icon-inline"></i>',
  '📅': '<i data-lucide="calendar" class="icon-inline"></i>',
  '🌅': '<i data-lucide="sunrise" class="icon-inline"></i>',
  '🌇': '<i data-lucide="sunset" class="icon-inline"></i>',
  '💧': '<i data-lucide="droplets" class="icon-inline"></i>',
  '👣': '<i data-lucide="footprints" class="icon-inline"></i>',
  '🥾': '<i data-lucide="footprints" class="icon-inline"></i>',
  '📱': '<i data-lucide="smartphone" class="icon-inline"></i>',
  '🧴': '<i data-lucide="flask-conical" class="icon-inline"></i>',
  '🧢': '<i data-lucide="sun" class="icon-inline"></i>',
  '🍫': '<i data-lucide="cookie" class="icon-inline"></i>',
  '🧥': '<i data-lucide="shirt" class="icon-inline"></i>',
  '🦯': '<i data-lucide="activity" class="icon-inline"></i>',
  '🧤': '<i data-lucide="hand" class="icon-inline"></i>',
  '🔦': '<i data-lucide="flashlight" class="icon-inline"></i>',
  '🧗': '<i data-lucide="person-standing" class="icon-inline"></i>',
  '❌': '<i data-lucide="x-circle" class="icon-inline"></i>'
};

function replaceEmojis(content) {
  let res = content;
  for (const [emoji, icon] of Object.entries(replacements)) {
    res = res.split(emoji).join(icon);
  }
  return res;
}

['index.html', 'js/app.js'].forEach(file => {
  let text = fs.readFileSync(file, 'utf8');
  if (file === 'index.html' && !text.includes('unpkg.com/lucide')) {
    text = text.replace('</head>', '  <script src="https://unpkg.com/lucide@latest"></script>\n</head>');
    text = text.replace('</body>', '  <script>lucide.createIcons();</script>\n</body>');
  }
  let newText = replaceEmojis(text);
  fs.writeFileSync(file, newText, 'utf8');
});

console.log('Emojis replaced with Lucide SVG icons.');
