require('dotenv').config();

const cors = require('cors');
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;
const frontendDistPath = path.resolve(__dirname, '..', 'frontend', 'dist');

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'calculator-api',
    database: connectDB.getStatus(),
  });
});

app.use(express.static(frontendDistPath));

app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    return res.sendFile(path.join(frontendDistPath, 'index.html'));
  }

  return next();
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Internal server error.' });
});

connectDB();

app.listen(PORT, () => {
  console.log(`Calculator server running on port ${PORT}`);
});

module.exports = app;
