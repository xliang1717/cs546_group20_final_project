const express = require('express');
const router = express.Router();
const data = require('../method');
const myCollectionData = data.myCollection;
const parklotData= data.parklot;
const commentData = data.comment;

router.get('/favorite/:id', async (req, res) => {
  let id = req.params.id;
  req.session.user.userId="626dcbb98ce6dca27a55ea18";
  try {
    
      await myCollectionData.addParkingLotToUserCollection(id, req.session.user.userId);
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