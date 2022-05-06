const express = require('express');
const router = express.Router();
const method = require('../method');
const parklotData = method.parklot;

//TODO: Add validation for all below APIs.
router.get('/:id', async (req, res) => {
    let userId = req.params.id;
    try {
        let myParkingLots = await parklotData.findAllParkingLotsByUploaderId(userId);
        let myParkingLotsExists = myParkingLots.length !== 0 ? true : false;
        res.render('user/myParkingLots', { layout: 'user', title: 'Add New Parking Lot', userId: userId, myParkingLots: myParkingLots, myParkingLotsExists: myParkingLotsExists });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

module.exports = router;