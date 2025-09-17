const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let buttonPressed = false;

app.use(express.json());

app.post('/press', (req, res) => {
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

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
  console.log('WebSocket server running on ws://localhost:3000');
});