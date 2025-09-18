const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server, path: '/server' });

let buttonPressed = false;

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// Serve static files for button and poster apps
const projectRoot = path.join(__dirname, '..');
const buttonDir = path.join(projectRoot, 'button');
const posterDir = path.join(projectRoot, 'poster');

// Static mounts so assets like script.js, images, and fonts load
app.use('/button', express.static(buttonDir));
app.use('/poster', express.static(posterDir));
// Also serve shared assets (e.g., images, fonts) from project root
app.use('/', express.static(projectRoot));

// Route without trailing slash should still serve index.html
app.get('/button', (req, res) => {
  res.sendFile(path.join(buttonDir, 'index.html'));
});

app.get('/poster', (req, res) => {
  res.sendFile(path.join(posterDir, 'index.html'));
});

app.post('/server/press', (req, res) => {
  console.log('Received POST /press');
  buttonPressed = true;
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      console.log('Sending button_pressed to client');
      client.send('button_pressed');
    }
  });
  res.sendStatus(200);
});

server.listen(3500, () => {
  console.log('Server running on http://localhost:3500');
  console.log('WebSocket server running on ws://localhost:3500');
});