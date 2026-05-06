const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'js', 'data.js');
let data = fs.readFileSync(dataPath, 'utf8');

// Replace <strong>, </strong> and <br><br> with empty strings or spaces
data = data.replace(/✨ <strong>/g, '✨ ');
data = data.replace(/<\/strong><br><br>/g, ' ');
data = data.replace(/<strong>/g, '');
data = data.replace(/<\/strong>/g, '');
data = data.replace(/<br><br>/g, ' ');

fs.writeFileSync(dataPath, data, 'utf8');
console.log('data.js cleaned of HTML tags.');
