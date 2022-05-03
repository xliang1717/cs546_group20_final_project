const express = require('express');
const router = express.Router();
const method = require('../method');
const usersData = method.user;

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
        res.render('user/detail', { layout: 'user', title: 'User Detail', user: user });
        // Below should not be required. Will remove later.
        // res.status(200).json(user);
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

module.exports = router;