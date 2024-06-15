const express = require('express');
const path = require('path');

const router = express.Router();

// Define a route for /Info
router.get('/', (req, res) => {
  const PagePath = path.join(__dirname, 'client', 'pages', 'Info.html');
  res.sendFile(PagePath);
});

module.exports = router;