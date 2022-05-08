const express = require('express');
const router = express.Router();
const method = require('../method');
const myCollectionData = method.myCollection;
const parklotData = method.parklot;
const commentData = method.comment;
const validation = require("../validation");

//TODO: Add validation for all below APIs.
router.get('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        id = validation.checkId(id, 'ID');
    } catch (e) {
        return res.status(400).render('user/error', { layout: 'user', content: 'Invalid ID',  userId: id});
    }
    try {
        let myCollectionParkingLots = await myCollectionData.getCollectionForUser(id);
        for (let i = 0; i < myCollectionParkingLots.length; i++) {
            if (myCollectionParkingLots[i].parkingChargeStandard != undefined) {
                myCollectionParkingLots[i].parkingFeeMessage = 'Parking Fee';
            } else {
                myCollectionParkingLots[i].parkingFeeMessage = 'No Parking Fee';
            }
            if ('True' == myCollectionParkingLots[i].disabilityFriendly) {
                myCollectionParkingLots[i].disabilityFriendly = 'Facilities For Disability';
            } else {
                myCollectionParkingLots[i].disabilityFriendly = 'No Facilities For Disability';
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
        await myCollectionData.getCollectionForUser(userId);
        res.status(200).json({ mesage: 'Parking lot has been removed from my collection successfully.' });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.get('/favorite/:id', async (req, res) => {
    let id = req.params.id;
    req.session.user.userId = "626dcbb98ce6dca27a55ea18";
    try {

        await myCollectionData.addParkingLotToUserCollectionTemp(id, req.session.user.userId);
        let parkinglot = await parklotData.get(id);
        let commentList = await commentData.getAllCommentsOfTheOneParkLotID(id);
        res.render('pages/parkinglot', { title: parkinglot.parkLotname, parkinglotInfo: parkinglot, commentlistInfo: commentList, content: "Parking lot has been added to my collection successfully." });
    } catch (e) {
        let parkinglot = await parklotData.get(id);
        let commentList = await commentData.getAllCommentsOfTheOneParkLotID(id);
        res.status(500).render('pages/parkinglot', { title: parkinglot.parkLotname, parkinglotInfo: parkinglot, commentlistInfo: commentList, error: e });
    }
});


module.exports = router;