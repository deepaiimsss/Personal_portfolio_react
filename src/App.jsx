import React, { useEffect } from 'react';
import { htmlContent, scriptsToLoad, inlineScripts } from './htmlContent';

function App() {
  useEffect(() => {
    // Execute inline scripts first
    inlineScripts.forEach(scriptCode => {
      try {
        const fn = new Function(scriptCode);
        fn();
      } catch(e) { console.error('Inline script error', e); }
    });

    // Load external scripts
    const loadScripts = async () => {
      // First, load external scripts (like Typed.js)
      for (const src of scriptsToLoad) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = src;
          script.async = false;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      }

      // Then, load our local bundled scripts dynamically so they run AFTER the HTML is rendered
      await import('./js/devtools-blocker.js');
      await import('./js/script.js');
      await import('./js/mail.js');
      await import('./js/theme.js');
      await import('./js/effects.js');
      await import('./js/projects.js');
      await import('./js/style-switcher.js');
    };
    loadScripts();
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

export default App;
