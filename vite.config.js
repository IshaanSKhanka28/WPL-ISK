import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';

// Every .html file in the project root is a page of the portal (Experiments 1-6);
// react-app/ is the single-page React application (Experiments 7 and 8).
const pages = Object.fromEntries(
    readdirSync('.')
        .filter((file) => file.endsWith('.html'))
        .map((file) => [file.replace('.html', ''), resolve(file)]),
);

// React Router uses real URLs (/react-app/stations), so serve the SPA shell for them in dev.
const reactAppFallback = {
    name: 'react-app-fallback',
    configureServer(server) {
        server.middlewares.use((req, _res, next) => {
            const path = req.url.split('?')[0];
            if (path.startsWith('/react-app/') && !path.includes('.')) req.url = '/react-app/index.html';
            next();
        });
    },
};

export default defineConfig({
    plugins: [react(), reactAppFallback],
    build: { rollupOptions: { input: { ...pages, 'react-app': resolve('react-app/index.html') } } },
});
