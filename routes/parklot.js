const express = require('express');
const router = express.Router();
const method = require('../method');
const validation = require('../validation');
const parklotsData = method.parklot;
const commentData = method.comment;
const xss = require('xss');


router.get('/addNewParkLot', async (req, res) => {
    try {
        res.render('result/parkLots', { title: 'Add new parklot' });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

//这个是子慧的function
router.get('/:id', async (req, res) => {
    id = req.params.id;
    try {
        id = validation.checkId(id, "ID");

    } catch (e) {
        res.status(400).render('pages/error', { title: "Error", class: "error", content: "Invalid ID" });
    }

    try {
        let parkinglot = await parklotsData.get(id);
        let commentList = await commentData.getAllCommentsOfTheOneParkLotID(id);
        if (Object.keys(parkinglot).length === 0) {
            res.status(404).render('pages/error', { title: "Error", class: "error-not-found", content: "There is no parkinglot found for the given ID" });
            return;
        }

        res.render('pages/parkinglot', { title: parkinglot.parkLotname, parkinglotInfo: parkinglot, commentlistInfo: commentList });

    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.post('/', async (req, res) => {
    try {
        req.session.user = { UserId: '62616e5169c3b43a2e6f38f1' };
        if (!req.session.user) throw 'You need log in first!'
        idfromUploader = req.session.user.UserId;
    } catch (e) {
        return res.json({ success: false, error: e });;
    }

    let ParkLotInfo = req.body;

    try {
        if (!ParkLotInfo) throw 'There is no ParkLotInfo in the post body !';

        ParkLotName = validation.checkString(xss(ParkLotInfo.ParkLotName), 'parkLotName'),

            parkingChargeStandard = Object.values(ParkLotInfo.parkingChargeStandard);
        var keys = Object.keys(ParkLotInfo.parkingChargeStandard);
        for (x in parkingChargeStandard) {
            parkingChargeStandard[x] = Number(parkingChargeStandard[x]);
            if (typeof parkingChargeStandard[x] !== 'number' || isNaN(parkingChargeStandard[x])) throw 'The parkingChargeStandard should only contain numbers';
            ParkLotInfo.parkingChargeStandard[keys[x]] = xss(parkingChargeStandard[x]);
        };

        parkingLotCoordinates = Object.values(ParkLotInfo.parkingLotCoordinates);
        var keyss = Object.keys(ParkLotInfo.parkingLotCoordinates);

        for (y in parkingLotCoordinates) {
            parkingLotCoordinates[y] = Number(parkingLotCoordinates[y]);
            if (typeof parkingLotCoordinates[y] !== 'number' || isNaN(parkingLotCoordinates[y])) throw 'The parkingLotCoordinates should only contain numbers';
            ParkLotInfo.parkingLotCoordinates[keyss[y]] = xss(parkingLotCoordinates[y])

        };

        if (!ParkLotInfo.ParkingLotLocationZipCode.match(/^\d{5}(?:[-\s]\d{4})?$/)) throw 'The zip code not valid.';

        if (ParkLotInfo.DisabilityFriendly !== 'True' && ParkLotInfo.DisabilityFriendly !== 'False') throw 'The disabilityFriendly should be Boolean';

        var size = ParkLotInfo.suitableVehicleSize;
        for (i in size) {
            size[i] = validation.checkString(xss(size[i]), 'suitableVehicleSize');
        }

        suitableVehicleSize = validation.checkStringArray(ParkLotInfo.suitableVehicleSize, 'suitableVehicleSize');


        idfromUploader = validation.checkId(idfromUploader, 'idfromUploader');

        let Conditions = Object.values(ParkLotInfo.TrafficConditions);
        var keysss = Object.keys(ParkLotInfo.TrafficConditions);
        for (z in Conditions) {
            validation.checkString(Conditions[z], 'trafficConditions');
            ParkLotInfo.TrafficConditions[keysss[z]] = xss(Conditions[z])
        };

        var capacity = validation.checkIntNumber(xss(ParkLotInfo.capacity), 'capacity');

    } catch (e) {
        return res.json({ success: false, error: e });

    };

    try {
        const newParkLot = await parklotsData.create(

            ParkLotInfo.ParkLotName,
            ParkLotInfo.parkingChargeStandard,
            ParkLotInfo.parkingLotCoordinates,
            ParkLotInfo.ParkingLotLocationZipCode,
            xss(ParkLotInfo.DisabilityFriendly),
            size,
            idfromUploader,
            ParkLotInfo.TrafficConditions,
            capacity,


        )
        if (newParkLot) {
            res.json({ success: true });
        } else {
            res.json({ success: false, error: e });
        }
    } catch (e) {
        res.json({ success: false, error: e });
    }

});

// 还需要更改返回信息，要根据删除按钮的hanlderbar
router.delete('/deleteParkLot', async (req, res) => {
    try {
        let id = xss(req.body.commentID); //comment Id
        let UserId = xss(req.body.UserId);
        if (req.session.user) {
            if (req.session.user.UserId === UserId) {
                let message = await parklotsData.remove(id)
                if (message) {
                    res.status(200).json("You have successfully add the new comment!");
                } else {
                    // res.status(500).render('partials/parkLot',{layout:null, error: "Can't delete this comment!"});
                }
            } else {
                // res.status(403).render('partials/parkLot',{layout:null, error: "You are not allowed to delete this comment!"});
            }
        } else {
            res.status(403).render('result/login', { title: 'Login' });
        }
    } catch (e) {
        res.status(400).render('partials/parkLot', { layout: null, error: e })
    }

})

module.exports = router;