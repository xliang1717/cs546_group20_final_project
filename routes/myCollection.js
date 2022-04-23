const express = require('express');
const router = express.Router();
const method = require('../method');
const myCollectionData = method.myCollection;

//TODO: Add validation for all below APIs.
router.get('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let myCollectionParkingLots = await myCollectionData.getCollectionForUser(id);
        res.status(200).json(myCollectionParkingLots);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.post('/', async (req, res) => {
    let myCollectionPostInfo = req.body;
    let userId = myCollectionPostInfo.userId;
    let parkingLotId = myCollectionPostInfo.parkingLotId;
    try {
        await myCollectionData.addParkingLotToUserCollection(parkingLotId, userId);
        res.status(200).json({mesage: 'Parking lot has been added to my collection successfully.'});
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.delete('/', async (req, res) => {
    let myCollectionPostInfo = req.body;
    let userId = myCollectionPostInfo.userId;
    let parkingLotId = myCollectionPostInfo.parkingLotId;
    try {
        await myCollectionData.removeParkingLotFromUserCollection(parkingLotId, userId);
        res.status(200).json({mesage: 'Parking lot has been removed from my collection successfully.'});
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

module.exports = router;