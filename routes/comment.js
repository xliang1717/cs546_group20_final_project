const express = require('express');
const router = express.Router();
const method = require('../method');
const commentsData = method.comment;
const parkLotData = method.parklot;
const xss = require('xss');
const validation = require('../validation');
//const mongoCollections = require('../config/mongoCollections');
//const { ObjectId } = require('mongodb');
//const users = mongoCollections.user;


////暂时没用
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
//         let commentsDataList = await commentsData.getAll();
//         //let result = allusersDataList.map(({_id, name}) =>({_id,name}));
//         if(commentsDataList){
//             if(Array.isArray(commentsDataList))
//             res.render('partials/parkLot',{layout:null, commentsDataList});
//         }else if (typeof commentsDataList === 'string'){
//             res.render('partials/parkLot',{layout:null, result : commentsDataList});
//         }else{
//             res.status(500).render('partials/parkLot',{layout:null, error : "Can't find the comments of this ParkLot"});
//         }
//     } catch(e) {
//         res.status(400).render('partials/parkLot',{layout:null, error : e});
//     }
// });

//建seed时候要注释掉（现在不需要了）
router.get('/:id', async (req, res) =>{
    let id = req.params.id; //这个id 是停车场的id
    try {
        id = validation.checkId(id, 'ID');
    }catch(e){
        res.status(400).render('result/comment',{title : 'The parklot comment',  haserror : true,   error : e});
        return;
    };

    try{
        let ParkLotDetail = await parkLotData.get(id);
        ParkLotDetail.parkingChargeStandard = JSON.stringify(ParkLotDetail.parkingChargeStandard);
        ParkLotDetail.parkingLotCoordinates = JSON.stringify(ParkLotDetail.parkingLotCoordinates);
        let commentsList = await commentsData.getAllCommentsOfTheOneParkLotID(id);

        if(commentsList && ParkLotDetail){
            if(typeof commentsList === 'string'){
                res.render('result/comment',{title : 'The parklot comment',  haserror : true,   error : commentsList});
            }else{
                res.render('result/comment',{title : 'The parklot comment', commentsList, ParkLotDetail});
            }
        }else{
            res.status(500).render('result/comment',{title : 'The parklot comment', haserror : true,  error : "Can't find the comments of this ParkLot"});
        }
        
    }catch(e){
        res.status(400).render('result/comment',{title : 'The parklot comment',  haserror : true,   error : e});
    }
});

router.post('/comment', async (req, res) => {
    req.session.user = { username: 'shuang', userId: '66666666666' }; //test
    
    if (req.session.user) {

        let date = new Date().toUTCString();
        let parklotId = xss(req.body.parkLotId);
        parklotId = validation.checkId(parklotId, 'ParkLotId');
        let tag = xss(req.body.commentTag); 
        tag = validation.checkString(tag, 'CommentTag');
        let commentS = xss(req.body.commentInfo);
        commentS = validation.checkString(commentS, 'Comment contents');
        let rating= xss(req.body.level);
        rating = validation.checkRate(rating, 'Rating');

        let newComment = await commentsData.create(
            
            req.session.user.username,
            xss(tag),
            date,
            xss(parklotId),//commentPostInfo.parkLotId
            req.session.user.userId,
            xss(commentS),
            xss(rating)
        );

        if (newComment) {
            res.json({success : true});
        } else {
            return res.json({success : false , error : e});
        }

    } else {
        return res.json({success : false , error : 'You need login first'});
    }

});

router.delete('/usercomment', async (req, res) => {
    try {
        let id = xss(req.body.commentID); //comment Id
        let UserId = xss(req.body.UserId);
        if (req.session.user) {
            if (req.session.user.UserId === UserId) {
                let message = await commentsData.remove(id)
                if (message) {
                    res.redirect('/parkLot', { result: message })
                } else {
                    res.status(500).render('partials/parkLot', { layout: null, error: "Can't delete this comment!" });
                }
            } else {
                res.status(403).render('partials/parkLot', { layout: null, error: "You are not allowed to delete this comment!" });
            }
        } else {
            res.status(403).render('result/login', { title: 'Login' });
        }
    } catch (e) {
        res.status(400).render('partials/parkLot', { layout: null, error: e })
    }

})

    //直接在载入用户信息的页面添加所有的comments就行
    // router.get('user/comments', async(req,res) =>{

    //     let comment = await commentsData.getUserAllComments(id);

    //     if(req.session.user){
    //         if(comment){
    //             res.render('partials/parkLot',{})
    //         }
    //     }

    // } )





    // //////建seed的时候用的(现在不需要了)
    ;
// router.get('/:id', async (req, res) => {
//     let id = req.params.id;
//     // try {
//     //     id = validation.checkId(id, 'ID URL Param');
//     // }catch(e){
//     //     return res.status(400).json({error : e });
//     // }

//     try {
//         let comment = await commentsData.get(id);
//         res.status(200).json(comment);
//     } catch (e) {
//         res.status(404).json({ error: e });
//     }
// });
////建seed的时候用的(现在不需要了)
// router.get('/', async (req, res) => {
//     try {

//         // let bandCollection = await bands();
//         // let allBandsList = await bandCollection.find({},{projection : {name : 1}}).toArray();

//         // if (allBandsList.length !== 0) {
//         //     for (let i = 0; i < allBandsList.length; i++) {
//         //         allBandsList[i]._id = allBandsList[i]._id.toString();
//         //     }
//         // }
//         // res.status(200).json(allBandsList);

//         let commentsDataList = await commentsData.getAll();
//         //let result = allusersDataList.map(({_id, name}) =>({_id,name}));
//         res.status(200).json(commentsDataList);
//     } catch (e) {
//         res.status(500).json({ error: e });
//     }
// });

module.exports = router;