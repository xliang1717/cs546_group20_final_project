const express = require("express");
const router = express.Router();
const data = require('../data');
const commentData = data.comment;
const parkinglots = data.parklot;
//const { ObjectId } = require('mongodb');
const validation = require("../validation");


router.get('/', async (req,res) => {
  try {
      let parklotsDataList = await parkinglots.getAllParkinglots();
      res.status(200).json(parklotsDataList);
  } catch(e) {
      res.status(500).json({error : e});
  }
});


router.get('/:id', async (req, res) => {
  id = req.params.id;
  try{
    id = validation.checkId(id,"ID");

  }catch(e){
    res.status(400).render('pages/error', { title:"Error", class: "error", content:"Invalid ID"});
  }
  
  try {
    let parkinglot = await parkinglots.get(id);
    let commentList = await commentData.getAllCommentsOfTheOneParkLotID(id);
    if (Object.keys(parkinglot).length === 0) {
      res.status(404).render('pages/error', { title:"Error", class: "error-not-found", content: "There is no parkinglot found for the given ID" });
      return;
    }

    res.render('pages/parkinglot', { title: parkinglot.parkLotname, parkinglotInfo: parkinglot, commentlistInfo:commentList });

  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;