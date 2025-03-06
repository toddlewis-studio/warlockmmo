const express = require('express');
const router = express.Router();

const test = require('../services/test');

// Welcome route
router.get('/', async (req, res) => {
  res.json({ message: 'Welcome to Warlock MMO API' });
});

module.exports = router;