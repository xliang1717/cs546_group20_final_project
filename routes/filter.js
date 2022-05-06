const express = require('express');
const router = express.Router();
const method = require('../method');
const xss = require('xss');
router.get('/', async (req, res) => {
    let result = [];
    try {
        result = await method.filter.allPark();
    } catch (e) {
        console.log(e);
    }
    try {
        if (result.length == 0) {
            res.render('partials/filter', { title: 'Parking Search', data: [], flag: false });
        } else {
            res.render('partials/filter', { title: 'Parking Search', data: result, flag: true });
        }
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.post('/', async (req, res) => {
    try {
        let valPF = xss(req.body.valPF);
        let valCT = xss(req.body.valCT);
        let valDF = xss(req.body.valDF);
        let locVal = xss(req.body.locVal);
        let zipVal = xss(req.body.zipVal);
        let filter = [];
        filter.push(valPF);
        filter.push(valCT);
        filter.push(valDF);
        filter.push(locVal);
        filter.push(zipVal);
        console.log(filter);
        await method.filter.getFilterParkLot(filter);
        res.redirect('/filter');
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

module.exports = router;
