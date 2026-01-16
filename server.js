const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// API routes
app.post('/api/verify', require('./dashboard/api/verify'));
app.post('/api/list', require('./dashboard/api/list'));
app.post('/api/update', require('./dashboard/api/update'));
app.post('/api/upload', require('./dashboard/api/upload'));
app.post('/auth/login', require('./dashboard/auth/login'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});