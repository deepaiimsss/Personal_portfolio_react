const fs = require('fs');

const htmlPath = 'C:\\Users\\DELL\\Desktop\\Personal Website modified\\index.html';
const html = fs.readFileSync(htmlPath, 'utf8');

// Extract everything inside <body>
const bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/i);
let bodyContent = bodyMatch ? bodyMatch[1] : '';

// Extract all scripts at the bottom
const scriptRegex = /<script\s+[^>]*src="([^"]+)"[^>]*><\/script>/gi;
const scriptsToLoad = [];
let match;
while ((match = scriptRegex.exec(bodyContent)) !== null) {
    if (!match[1].startsWith('js/')) {
        scriptsToLoad.push(match[1]);
    }
}

// Extract inline scripts
const inlineScriptRegex = /<script\b(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi;
const inlineScripts = [];
while ((match = inlineScriptRegex.exec(bodyContent)) !== null) {
    inlineScripts.push(match[1]);
}

// Remove scripts from body to let React inject them sequentially
bodyContent = bodyContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

const jsContent = `export const htmlContent = ${JSON.stringify(bodyContent)};\nexport const scriptsToLoad = ${JSON.stringify(scriptsToLoad)};\nexport const inlineScripts = ${JSON.stringify(inlineScripts)};\n`;

fs.writeFileSync('src/htmlContent.js', jsContent);
console.log("Successfully generated src/htmlContent.js");
