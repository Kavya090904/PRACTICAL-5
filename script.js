const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON and serve static files
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to log user visits
app.use((req, res, next) => {
  const log = `IP: ${req.ip}, Time: ${new Date().toISOString()}\n`;
  fs.appendFile('visits.log', log, (err) => {
    if (err) console.error('Error writing to log file:', err);
  });
  next();
});

// Route to retrieve visit logs
app.get('/logs', (req, res) => {
  fs.readFile('visits.log', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading log file');
    const logs = data.split('\n').filter(line => line.trim() !== '');
    res.json(logs);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});