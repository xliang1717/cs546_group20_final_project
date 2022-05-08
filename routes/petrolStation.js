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

router.get('/addnewpetrolStation', async (req, res) =>{

    if(!req.session.user) return res.render('result/addPetrol',{title : 'Error' , haserror :true, error:'You need log in first'})

    try {
        res.render('result/addPetrol',{title : 'Add new petrol'});
    } catch(e) {
        res.status(500).json({error : e});
    }
});

router.post('/addnewpetrol', async(req, res) =>{
   

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
            return res.json({success : false, error : e,  exe : "There is an error"});
        }

    }else{
        return res.json({success : false , error : 'You need login first',  exe : "There is an error"});
    }
});

module.exports = router;