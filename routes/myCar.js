const express = require('express');
const router = express.Router();
const data= require('../data');
const myCarData = data.myCar;
const xss = require('xss');

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let myAllCars = await myCarData.getMyCarForUser(id);
        res.render('pages/myCar', { title: 'My Car', myAllCars,id});
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