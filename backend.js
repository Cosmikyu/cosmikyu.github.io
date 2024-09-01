const express = require('express');
const app = express();
const { exec } = require('child_process');

app.use(express.json());

app.post('/command', (req, res) => {
  exec(req.body.command, (error, stdout, stderr) => {
    if (error) {
      res.send(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      res.send(`stderr: ${stderr}`);
      return;
    }
    res.send(`stdout: ${stdout}`);
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));