const express = require('express');
const router = express.Router();

const userService = require('../../services/user');

// Welcome route
router.post('/', async (req, res) => {
    const user = await userService.init(req.body.id, req.body.username);
    if(user)
        res.json(user)
    else
        res.status(500).json({
            error: 'UserInitError',
            message: 'Error initializing user'
        });
});

module.exports = router;