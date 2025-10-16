const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
 
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

  const extname = path.extname(filePath);


  let contentType = 'text/html';
  switch (extname) {
    case '.js':
    contentType = 'text/javascript';
    break;
    case '.css':
    contentType = 'text/css';
    break;
    case '.json':
    contentType = 'application/json';
    break;
    case '.png':
    contentType = 'image/png';
    break;
    case '.jpg':
    case '.jpeg':
    contentType = 'image/jpeg';
    break;
    case '.gif':
    contentType = 'image/gif';
    break;
    case '.svg':
    contentType = 'image/svg+xml';
    break;
}


fs.readFile(filePath, (err, content) => {
    if (err) {
    if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - File not found</h1>');
    } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
    }
    } else {
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
    }
});
});

const hostname = '127.0.0.1';
const port = 5000;
server.listen(port, hostname, () => {
console.log(`Server running ${hostname}:${port}`);
});