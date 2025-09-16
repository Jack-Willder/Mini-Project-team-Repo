const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let buttonPressed = false;

app.use(express.json());
app.post('/press', (req, res) => {
  buttonPressed = true;
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send('button_pressed');
    }
  });
  res.sendStatus(200);
});

server.listen(3000, () => console.log('Backend on http://localhost:3000'));
