const express = require('express');
const router = express.Router();
const method = require('../method');
const commentsData = method.comment;
const parkLotData = method.parklot;
const xss = require('xss');
const validation = require('../validation');

router.get('/:id', async (req, res) =>{
    
    let id = req.params.id; //This is parklot Id
    
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
                res.render('result/comment',{title : 'The parklot comment',  ParkLotDetail,  AA : commentsList});
            }else{
                res.render('result/comment',{title : 'The parklot comment', commentsList, ParkLotDetail});
            }
        }else{
            console.log(4)
            res.status(500).render('result/comment',{title : 'The parklot comment', haserror : true,  error : "Can't find the comments of this ParkLot"});
        }
        
    }catch(e){
        console.log(5)
        res.status(400).render('result/comment',{title : 'The parklot comment',  haserror : true,   error : e});
    }
});

router.post('/comment', async (req, res) => {
    // req.session.user = { username: 'shuang', userId: '66666666666' }; //test

    let parklotId;
    let tag;
    let commentS;
    let rating;
    let date;
    let newComment;


    if (req.session.user) {
        console.log(req.session.user.username);
        try{
            date = new Date().toUTCString();
            parklotId = xss(req.body.parkLotId);
            parklotId = validation.checkId(parklotId, 'ParkLotId');
            tag = xss(req.body.commentTag); 
            tag = validation.checkString(tag, 'CommentTag');
            commentS = xss(req.body.commentInfo);
            commentS = validation.checkString(commentS, 'Comment contents');
            rating= xss(req.body.level);
            rating = Number(rating); 
            if(typeof rating !=='number' && isNaN(rating) ) throw "The rating must be number and number only"
            rating = validation.checkRate(rating, 'Rating');
        }catch(e){
            return res.json({success : false , error : e});
        }


        try{
        newComment = await commentsData.create(
                
                req.session.user.username,
                xss(tag),
                date,
                xss(parklotId),//commentPostInfo.parkLotId
                req.session.user.userId,
                xss(commentS),
                xss(rating)
            );
        }catch(e){
            return res.json({success : false , error : e});
        };

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
            //这个user Id 不行就改成 paramater
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

module.exports = router;