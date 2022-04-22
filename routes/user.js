const express = require('express');
const router = express.Router();
const method = require('../method');
const usersData = method.user;
const myAreaData = method.myArea;

router.get('/', async (req, res) => {
    try {
        let allusersDataList = await usersData.getAll();
        //let result = allusersDataList.map(({_id, name}) =>({_id,name}));
        res.status(200).json(allusersDataList);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let user = await usersData.get(id);
        res.render('user/detail', { layout: 'user', title: 'User Detail', user: user, userId: id });
        // Below should not be required. Will remove later.
        // res.status(200).json(user);
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

router.post('/area', async (req, res) => {
    let userId = req.body.userId;
    let newArea = req.body.newArea;
    try {
        let myAreas = await myAreaData.addNewAreaToUser(newArea, userId);
        res.render('partials/areas', {layout: null, userArea: myAreas});
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

module.exports = router;