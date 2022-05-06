const express = require('express');
const router = express.Router();
const method = require('../method');

router.get('/', async (req, res) => {
    try {
        res.render('partials/filter', { title: 'Parking Search' });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

module.exports = router;