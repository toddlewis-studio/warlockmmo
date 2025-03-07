const express = require('express');
const router = express.Router();

const userService = require('../../services/user');

// Welcome route
router.post('/', async (req, res) => {
    try{
        const user = await userService.init(req.body.id, req.body.username);
        res.json(user)
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router;