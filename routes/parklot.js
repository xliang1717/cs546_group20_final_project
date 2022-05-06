const express = require('express');
const router = express.Router();
const method = require('../method');
const parklotsData = method.parklot;
//const validation = require('../validation');
//const mongoCollections = require('../config/mongoCollections');
//const { ObjectId } = require('mongodb');
//const users = mongoCollections.user;

// router.get('/', async (req,res) => {
//     try {
        
//         // let bandCollection = await bands();
//         // let allBandsList = await bandCollection.find({},{projection : {name : 1}}).toArray();

//         // if (allBandsList.length !== 0) {
//         //     for (let i = 0; i < allBandsList.length; i++) {
//         //         allBandsList[i]._id = allBandsList[i]._id.toString();
//         //     }
//         // }
//         // res.status(200).json(allBandsList);

//         let parklotsDataList = await parklotsData.getAll();
//         //let result = allusersDataList.map(({_id, name}) =>({_id,name}));
//         res.status(200).json(parklotsDataList);
//     } catch(e) {
//         res.status(500).json({error : e});
//     }
// });

router.get('/addNewParkLot', async (req,res) => {
    try {
        res.render('result/parkLots',{title : 'Add new parklot'});
    } catch(e) {
        res.status(500).json({error : e});
    }
});


router.get('/:id', async (req, res) =>{
    let id = req.params.id;
    // try {
    //     id = validation.checkId(id, 'ID URL Param');
    // }catch(e){
    //     return res.status(400).json({error : e });
    // }

    try{
        let parklot = await parklotsData.get(id);
        res.status(200).json(parklot);
    }catch(e){
        res.status(404).json({error : e});
    }
});




router.post('/', async(req, res) =>{
    try{
        req.session.user = {UserId : '62616e5169c3b43a2e6f38f1'};
        idfromUploader = req.session.user.UserId;
    }catch(e){
        return res.status(403).render('result/login',{title : 'Login'});
    }

    let ParkLotInfo = req.body;
    
    try{
        if(!ParkLotInfo) throw 'There is no ParkLotInfo in the post body !';
    }catch(e){
        return res.status(400).json({error:e});

    }
    

//     try{
//         if(Object.keys(bandPostInfo).length !== 6) throw 'There is wrong bandPostInfo number in the post body !';
//     }catch(e){
//         return res.status(400).json({error:e});
//     }

//     try{
//         bandPostInfo.name = validation.checkString(bandPostInfo.name, 'Name');
//     }catch(e){
//         return res.status(400).json({error:e});
//     }

//     try{
//         bandPostInfo.genre = validation.checkStringArray(bandPostInfo.genre,'Genre');
//     }catch(e){
//         return res.status(400).json({error:e});
//     }

//     try{
        
//         bandPostInfo.website = validation.checkString(bandPostInfo.website,'Website');

//         if (!bandPostInfo.website.match(/^[hH][tT][tT][pP]:\/\/[wW][wW][wW]\.[a-zA-Z0-9][^\s]{4,}\.[cC][oO][mM]$/)) {
//             throw "The website format is invalid !"
//         };
        
//     }catch(e){
//         return res.status(400).json({error:e});
//     }

//     try{
//         bandPostInfo.genre = validation.checkStringArray(bandPostInfo.genre,'Genre');
//     }catch(e){
//         return res.status(400).json({error:e});
//     }

//     try{
//         bandPostInfo.recordLabel = validation.checkString(bandPostInfo.recordLabel,'RecordLabel');
//     }catch(e){
//         return res.status(400).json({error:e});
//     }

//     try{
//         bandPostInfo.bandMembers = validation.checkStringArray(bandPostInfo.bandMembers,'BandMembers');
//     }catch(e){
//         return res.status(400).json({error:e});
//     }

//     try{
//         bandPostInfo.yearFormed = validation.checkYear(bandPostInfo.yearFormed,'YearFormed');
//     }catch(e){
//         return res.status(400).json({error:e});
//     }

    try {
        const newParkLot = await parklotsData.create(

            ParkLotInfo.ParkLotName,
            ParkLotInfo.parkingChargeStandard,
            ParkLotInfo.parkingLotCoordinates,
            ParkLotInfo.ParkingLotLocationZipCode,
            ParkLotInfo.DisabilityFriendly,
            ParkLotInfo.suitableVehicleSize,
            idfromUploader,
            ParkLotInfo.TrafficConditions,
            ParkLotInfo.capacity,


        )
        if(newParkLot){
            res.status(200).json("You have successfully add the new parkLot");
        }else{
            res.status(500).json({error : e});
        }
    }catch(e){
        res.status(500).json({error: e});
    }

});


router.delete('/deleteParkLot', async(req,res) =>{
    try{
        let id =xss(req.body.commentID); //comment Id
        let UserId = xss(req.body.UserId);
        if(req.session.user){
            if(req.session.user.UserId === UserId){
                let message =  await parklotsData.remove(id)
                if(message){
                    res.status(200).json("You have successfully add the new comment!");
                }else{
                    // res.status(500).render('partials/parkLot',{layout:null, error: "Can't delete this comment!"});
                }
            }else{
                // res.status(403).render('partials/parkLot',{layout:null, error: "You are not allowed to delete this comment!"});
            }
        }else{
            res.status(403).render('result/login',{title : 'Login'});
        }
    }catch(e){
        res.status(400).render('partials/parkLot',{layout:null, error: e})
    }

})

// router.put('/:id', async(req,res) =>{
//     let id = req.params.id;
//     let bandPutInfo = req.body;
//     let bandCollection = await bands();
//     try{
//         if(!bandPutInfo) throw 'There is no bandPutInfo in the put body !';
//     }catch(e){
//         return res.status(400).json({error:e});
//     }

//     try{
//         if(Object.keys(bandPutInfo).length !== 6) throw 'There is wrong bandPutInfo number in the put body !';
//     }catch(e){
//         return res.status(400).json({error:e});
//     }

    
//     try {
//         id = validation.checkId(id, 'ID URL Param');
//     }catch(e){
//         return res.status(400).json({error : e});
//     }

//     try {
//         bandPutInfo.name = validation.checkString(bandPutInfo.name, 'Name');
//     }catch(e){
//         return res.status(400).json({error : e});
//     }

//     try{
//         bandPutInfo.genre = validation.checkStringArray(bandPutInfo.genre,'Genre');
//     }catch(e){
//         return res.status(400).json({error : e});
//     }

//     try{
        
//         bandPutInfo.website = validation.checkString(bandPutInfo.website, 'Website');
        
//         if (!bandPutInfo.website.match(/^[hH][tT][tT][pP]:\/\/[wW][wW][wW]\.[a-zA-Z0-9][^\s]{4,}\.[cC][oO][mM]$/)) {
//             throw "The website format is invalid !"
//         };
//     }catch(e){
//         return res.status(400).json({error : e});
//     }

//     try{
//         bandPutInfo.recordLabel = validation.checkString(bandPutInfo.recordLabel, ' RecordLabel');
//     }catch(e){
//         return res.status(400).json({error : e});
//     }

//     try{
//         bandPutInfo.bandMembers = validation.checkStringArray(bandPutInfo.bandMembers, 'BandMembers');
//     }catch(e){
//         return res.status(400).json({error : e});
//     }

//     try{
//         bandPutInfo.yearFormed = validation.checkYear(bandPutInfo.yearFormed , 'YearFormed');
//     }catch(e){
//         return res.status(400).json({error : e});
//     }

//     try{
//         let checkTheBand = await bandCollection.findOne({_id : ObjectId(id)});  
//         if (!checkTheBand) throw " No band with that id !"     
//     }catch(e){
//         return res.status(404).json({error : e});
//     }

//     try{
//         await bandsData.update(
//             id,
//             bandPutInfo.name,
//             bandPutInfo.genre,
//             bandPutInfo.website,
//             bandPutInfo.recordLabel,
//             bandPutInfo.bandMembers,
//             bandPutInfo.yearFormed
//         );  
//     }catch(e){
//         return res.status(500).json({error : e});
//     }

//     try {
//         let theBandNew = await bandsData.get(id);
//         res.status(200).json(theBandNew);
//     }catch(e){
//         res.status(404).json({error : e});
//     }

// });

// router.delete('/:id', async(req,res) =>{
//     let id = req.params.id;
//     let bandCollection = await bands();
//     try {
//         id = validation.checkId(id, 'ID URL Param');
//     }catch(e){
//         return res.status(400).json({error : e});
//     }

//     try {
//         await bandsData.get(id);
//     }catch(e){
//         return res.status(404).json({error : e});
//     }

//     try {
//         await bandCollection.deleteOne({_id : ObjectId(id)});
//         res.status(200).json({bandId : id, deleted : true});
//     }catch(e){
//         res.status(500).json({error : e})
//     }
// })

module.exports = router;