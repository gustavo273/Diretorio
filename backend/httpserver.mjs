import { createServer } from 'node:http';
const server = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain'});
    res.end('Hello World!\n');
});
server.listen(30, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});
// execute com 'node server.mjs'
