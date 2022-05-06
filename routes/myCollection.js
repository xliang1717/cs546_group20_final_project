const express = require('express');
const router = express.Router();
const method = require('../method');
const myCollectionData = method.myCollection;

//TODO: Add validation for all below APIs.
router.get('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let myCollectionParkingLots = await myCollectionData.getCollectionForUser(id);
        for (let i = 0; i < myCollectionParkingLots.length; i++) {
            if (myCollectionParkingLots[i].parkingChargeStandard != undefined) {
                myCollectionParkingLots[i].parkingFeeMessage = 'Parking Fee';
            } else {
                myCollectionParkingLots[i].parkingFeeMessage = 'No Parking Fee';
            }
            myCollectionParkingLots[i].userId = id;
        }
        let myCollectionExists = myCollectionParkingLots.length !== 0 ? true : false;
        res.render('user/myCollection', { layout: 'user', title: 'My Collection', myCollection: myCollectionParkingLots, userId: id, myCollectionExists: myCollectionExists });
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
        res.status(200).json({ mesage: 'Parking lot has been added to my collection successfully.' });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.delete('/:id', async (req, res) => {
    let userId = req.params.id;
    let parkingLotId = req.query.parkingLotId;
    try {
        await myCollectionData.removeParkingLotFromUserCollection(parkingLotId, userId);
        let myCollectionParkingLots = await myCollectionData.getCollectionForUser(userId);
        for (let i = 0; i < myCollectionParkingLots.length; i++) {
            if (myCollectionParkingLots[i].parkingChargeStandard != undefined) {
                myCollectionParkingLots[i].parkingFeeMessage = 'Parking Fee';
            } else {
                myCollectionParkingLots[i].parkingFeeMessage = 'No Parking Fee';
            }
            myCollectionParkingLots[i].userId = userId;
        }
        let myCollectionExists = myCollectionParkingLots.length == 0 ? true : false;
        res.status(200).json({ mesage: 'Parking lot has been removed from my collection successfully.' });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

module.exports = router;