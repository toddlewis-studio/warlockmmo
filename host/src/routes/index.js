const express = require('express');
const router = express.Router();

// Welcome route
router.get('/', async (req, res) => {
  res.json({ message: 'Welcome to Warlock MMO API' });
});

module.exports = router;