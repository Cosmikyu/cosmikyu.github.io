const express = require('express');
const app = express();
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

app.use(express.json());

app.post('/command', (req, res) => {
  // Handle incoming messages from clients
  const message = req.body.message;
  wss.clients.forEach((client) => {
    client.send(message);
  });
  res.send(`Message sent: ${message}`);
});

app.listen(3000, () => console.log('Server running on port 3000'));