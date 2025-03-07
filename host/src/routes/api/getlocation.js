const express = require('express');
const router = express.Router();

const locationService = require('../../services/location');

// Welcome route
router.post('/', async (req, res) => {
    const location = await locationService.getLocation(req.body.territoryId, req.body.nodeId);
    if(location)
        res.json(location)
    else
        res.status(500).json({
            error: 'UserNotFoundError',
            message: 'User not found'
        });
});

module.exports = router;