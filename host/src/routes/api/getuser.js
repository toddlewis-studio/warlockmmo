const express = require('express');
const router = express.Router();

const userService = require('../../services/user');

// Welcome route
router.post('/', async (req, res) => {
    const user = await userService.getUser(req.body.id);
    if(user)
        res.json(user)
    else
        res.status(500).json({
            error: 'UserNotFoundError',
            message: 'User not found'
        });
});

module.exports = router;