'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');
const upath = require('upath');
const LiveReload = require('livereload');

const SITE_HOST = process.env.HOST || 'localhost';
const SITE_PORT = parseInt(process.env.PORT, 10) || 3000;
const LIVERELOAD_PORT = parseInt(process.env.LIVERELOAD_PORT, 10) || 35729;
const DEBUG = process.env.DEBUG === 'true';

const distDir = upath.resolve(__dirname, '../dist');

// File extensions in dist/ that should trigger a browser reload.
const WATCH_EXTS = [
    'html',
    'css',
    'js',
    'json',
    'map',
    'svg',
    'webmanifest',
    'png',
    'jpg',
    'jpeg',
    'gif',
    'webp',
    'ico',
    'eot',
    'ttf',
    'otf',
    'woff',
    'woff2'
];

// LiveReload server.
//
// It listens on LIVERELOAD_PORT and pushes "reload" events to every
// connected browser whenever a file in dist/ changes. It also serves
// the livereload client script itself, which the static server below
// injects into every HTML page:
//
// <script src="http://localhost:35729/livereload.js"></script>
const liveReloadServer = LiveReload.createServer({
    port: LIVERELOAD_PORT,
    exts: WATCH_EXTS,
    debug: DEBUG
});

liveReloadServer.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE') {
        console.error(`Error: LiveReload port ${LIVERELOAD_PORT} is already in use. Is another dev server running?`);
        process.exit(1);
    }
    console.error(err);
});

liveReloadServer.watch(distDir);

const LIVERELOAD_SCRIPT = `<script src="http://${SITE_HOST}:${LIVERELOAD_PORT}/livereload.js"></script>`;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.map': 'application/json; charset=utf-8',
    '.webmanifest': 'application/manifest+json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.txt': 'text/plain; charset=utf-8',
    '.xml': 'application/xml; charset=utf-8',
    '.csv': 'text/csv; charset=utf-8',
    '.eot': 'application/vnd.ms-fontobject',
    '.ttf': 'font/ttf',
    '.otf': 'font/otf',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2'
};

// Inject the LiveReload client into a rendered HTML page so the
// browser reloads whenever the development build changes.
function injectLiveReload(html) {
    if (/<\/body>/i.test(html)) {
        return html.replace(/<\/body>/i, `${LIVERELOAD_SCRIPT}\n</body>`);
    }
    if (/<\/html>/i.test(html)) {
        return html.replace(/<\/html>/i, `${LIVERELOAD_SCRIPT}\n</html>`);
    }
    return html + '\n' + LIVERELOAD_SCRIPT;
}

// Resolve a URL path to a file inside dist/ (prevents path traversal).
function resolveRequestPath(urlPath) {
    const filePath = upath.normalize(upath.join(distDir, urlPath));
    if (filePath !== distDir && !filePath.startsWith(distDir + path.sep)) {
        return null;
    }
    return filePath;
}

const server = http.createServer((req, res) => {
    res.setHeader('Cache-Control', 'no-store');

    let urlPath;
    try {
        urlPath = decodeURIComponent(new URL(req.url, `http://${SITE_HOST}`).pathname);
    } catch (err) {
        res.writeHead(400, { 'Content-Type': 'text/plain' }).end('Bad Request');
        return;
    }

    const filePath = resolveRequestPath(urlPath);
    if (filePath === null) {
        res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not Found');
        return;
    }

    fs.stat(filePath, (err, stats) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not Found');
            return;
        }

        // Directory requests (e.g. "/") resolve to index.html.
        const targetPath = stats.isDirectory() ? path.join(filePath, 'index.html') : filePath;

        fs.stat(targetPath, (err, stats) => {
            if (err || !stats.isFile()) {
                res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not Found');
                return;
            }

            const content = fs.readFileSync(targetPath);
            const isHtml = /\.html$/i.test(targetPath);
            const contentType =
                MIME_TYPES[path.extname(targetPath).toLowerCase()] || 'application/octet-stream';

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(isHtml ? injectLiveReload(content.toString()) : content);
        });
    });
});

server.listen(SITE_PORT, SITE_HOST, () => {
    console.log('### DEV SERVER ###');
    console.log(`Website:      http://${SITE_HOST}:${SITE_PORT}`);
    console.log(`LiveReload:   http://${SITE_HOST}:${LIVERELOAD_PORT}/livereload.js`);
    console.log(`Serving:      ${distDir}`);
});
