const express = require('express');
const router = express.Router();
const method = require('../method');
const parklotData = method.parklot;
const validation = require('../validation');

//TODO: Add validation for all below APIs.
router.get('/:id', async (req, res) => {
    if (req.session.user) {
        let userId = req.params.id;
        console.log(userId);
        try {
            userId = validation.checkId(userId, 'ID');
        } catch (e) {
            return res.status(400).render('user/error', { layout: 'user', content: 'Invalid ID', userId: userId });
        }
        try {
            let myParkingLots = await parklotData.findAllParkingLotsByUploaderId(userId);
            let myParkingLotsExists = myParkingLots.length !== 0 ? true : false;
            res.render('user/myParkingLots', { layout: 'user', title: 'Add New Parking Lot', userId: userId, myParkingLots: myParkingLots, myParkingLotsExists: myParkingLotsExists });
        } catch (e) {
            res.status(500).json({ error: e });
        }
    } else {
        res.status(403).redirect('/logsign');
    }

});

module.exports = router;