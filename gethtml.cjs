const fs = require('fs');
const content = fs.readFileSync('src/htmlContent.js', 'utf8');
const start = content.indexOf('<section id="about"');
const end = content.indexOf('</section>', start);
console.log(content.substring(start, end + 10));
