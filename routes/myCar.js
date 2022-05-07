const express = require('express');
const router = express.Router();
const data= require('../method');
const myCarData = data.myCar;
const validation= require("../validation");
const xss = require('xss');

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    try{
      id = validation.checkId(id,'ID');
    }catch(e){
      res.status(400).render('pages/error', { title:"Error", class: "error-to-show", content:"Invalid ID"});
    }
    try {
        let myAllCars = await myCarData.getMyCarForUser(id);
        if(myAllCars.length > 0){
            res.render('pages/myCar', { title: 'My Car', myAllCars,id});
        }else{
            res.render('pages/myCar', { title: 'My Car', content:"No car added for this user.",id});
        }
      
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.get('/', async (req, res) => {
    try {
    
        res.render('pages/myCar', { title: 'My Car'});
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.post('/', async (req, res) => {
    let myCarsInfo = req.body;
    req.session.user.userId="626dcbb98ce6dca27a55ea18";
    let carname = xss(myCarsInfo.carname_input);
    try {
        await myCarData.addNewCarToUser(carname,req.session.user.userId  );
        res.status(200).render('pages/myCar',{content:"New car has been added successfully." } );
    } catch (e) {
      res.render('pages/myCar',{error: e})
    }
});

router.delete('/:id', async (req, res) => {
    let userId = req.params.id;
    let carname= req.body.myCar;
 
    try {
        await myCarData.removeCarFromUser(carname, userId);
        //let myAllCars = await myCarData.getMyCarForUser(userId);
        res.status(200).json({ message: 'Car has been removed successfully.' });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

module.exports = router;