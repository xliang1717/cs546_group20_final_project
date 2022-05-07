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

module.exports = router;