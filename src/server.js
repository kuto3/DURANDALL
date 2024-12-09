// server.js
const { createServer } = require('http');
const next = require('next');
const WebSocket = require('ws');
const { sendEventToClients } = require('./pages/api/webhook');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  // Serveur WebSocket
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('Client connected');
    connections.push(ws);

    ws.on('close', () => {
      console.log('Client disconnected');
      connections = connections.filter((conn) => conn !== ws);
    });
  });

  server.listen(3001, (err) => {
    if (err) throw err;
    console.log('Server is running on http://localhost:3001');
  });
});
