const express = require('express');
const router = express.Router();
const method = require('../method');
const myCommentsData = method.comment;
const parklotData= method.parklot;

//TODO: Add validation for all below APIs.
router.get('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let myComments = await myCommentsData.getByUserId(id);
        let myCommentsExists = myComments.length !== 0 ? true : false;
        res.render('user/myComments', { layout: 'user', title: 'My Comments', userId: id, myComments: myComments,  myCommentsExists: myCommentsExists });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

// router.post('/', async (req, res) => {
//     let myCollectionPostInfo = req.body;
//     let userId = myCollectionPostInfo.userId;
//     let parkingLotId = myCollectionPostInfo.parkingLotId;
//     try {
//         await myCollectionData.addParkingLotToUserCollection(parkingLotId, userId);
//         res.status(200).json({ mesage: 'Parking lot has been added to my collection successfully.' });
//     } catch (e) {
//         res.status(500).json({ error: e });
//     }
// });

router.delete('/:id', async (req, res) => {
    let commentId = req.params.id;
    try {
        await myCommentsData.remove(commentId);
        res.status(200).json({ mesage: 'Parking lot has been removed from my collection successfully.' });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.get('/favorite/:id', async (req, res) => {
    let id = req.params.id;
    req.session.user.userId="626dcbb98ce6dca27a55ea18";
    try {
      
        await myCollectionData.addParkingLotToUserCollectionTemp(id, req.session.user.userId);
        let parkinglot = await parklotData.get(id);
        let commentList = await commentData.getAllCommentsOfTheOneParkLotID(id);
        res.render('pages/parkinglot', { title: parkinglot.parkLotname, parkinglotInfo: parkinglot, commentlistInfo:commentList,content:"Parking lot has been added to my collection successfully." });
    } catch (e) {
      let parkinglot = await parklotData.get(id);
      let commentList = await commentData.getAllCommentsOfTheOneParkLotID(id);
      res.status(500).render('pages/parkinglot',{ title: parkinglot.parkLotname, parkinglotInfo: parkinglot, commentlistInfo:commentList,error: e});
    }
  });
  

module.exports = router;