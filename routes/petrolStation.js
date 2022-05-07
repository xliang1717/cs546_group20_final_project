const express = require('express');
const router = express.Router();
const method = require('../method');
const validation = require('../validation');
const petrolStationsData = method.petrolStation;
const xss = require('xss');


router.get('/', async (req,res) => {
    try {
        let petrolStationsDataList = await petrolStationsData.getAll();
    
        if(petrolStationsDataList){
            res.render('result/petrolStation',{title : 'The List of petrolStation', petrolStationsDataList});
        }
    } catch(e) {
        res.render('result/petrolStation',{title : 'The List of petrolStation', haserror : true, error: 'Not find any petrol Station'});
    }
});

// router.get('/:id', async (req, res) =>{
//     let id = req.params.id;
//     // try {
//     //     id = validation.checkId(id, 'ID URL Param');
//     // }catch(e){
//     //     return res.status(400).json({error : e });
//     // }

//     try{
//         let petrolStation = await petrolStationsData.get(id);
//         res.status(200).json(petrolStation);
//     }catch(e){
//         res.status(404).json({error : e});
//     }
// });

router.get('/addnewpetrolStation', async (req, res) =>{
    
    try {
        res.render('result/addPetrol',{title : 'Add new petrol'});
    } catch(e) {
        res.status(500).json({error : e});
    }
});

router.post('/addnewpetrol', async(req, res) =>{
    req.session.user = { username: 'shuang', userId: '66666666666' }; //test

    if(req.session.user) {
        try{
            location =xss(req.body.location);
            
            location = validation.checkString(location, 'Location');
            
            coordinate = req.body.coordinate
            
            let position = Object.values(coordinate);
            var keyss = Object.keys(coordinate)
            for(x in position) {
                position[x] = Number(position[x])
                if (typeof position[x] !=='number' || isNaN(position[x]) ) throw 'The coodinate should only contain number!';
                coordinate[keyss[x]] = xss(position[x]);
            };

            var Name = xss(req.body.name);
            Name = validation.checkString(Name, 'name');
            
            var Typee = req.body.type
            for(y in Typee ){
                Typee[y] = validation.checkString( xss(Typee[y]), 'type');
            }
            


        }catch(e){
            return res.json({success : false, error : e, exe : "There is an error"});
        }

        
        let petrol = await petrolStationsData.create(location, coordinate, Name, Typee);

        if(petrol){
            res.json({success : true});
        }else{
            return res.json({success : false, error : e});
        }

    }else{
        return res.json({success : false , error : 'You need login first'});
    }
});

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