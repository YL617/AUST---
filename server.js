const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
    '.html': 'text/html;charset=utf-8',
    '.css': 'text/css;charset=utf-8',
    '.js': 'application/javascript;charset=utf-8',
    '.json': 'application/json;charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
    const reqUrl = new URL(req.url, 'http://localhost');
    let filePath = reqUrl.pathname === '/' ? '/index.html' : reqUrl.pathname;
    filePath = path.join(__dirname, decodeURIComponent(filePath));
    const ext = path.extname(filePath);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain;charset=utf-8' });
            res.end('404 Not Found');
            return;
        }
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'text/plain;charset=utf-8' });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log('Server running at http://localhost:' + PORT);
});
