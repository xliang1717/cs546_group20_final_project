const mongoCollections = require('../config/mongoCollections');
const comments = mongoCollections.comment;
const parklot = mongoCollections.parklot;
const { ObjectId } = require('mongodb');
const validation = require('../validation');
// test


module.exports = {
    async get(id) {
    if (arguments.length !== 1)  throw " You must provide an id and only one id to search for!";
    id = validation.checkId(id,'ID');
        
    const commentCollection = await comments();
    const commentData = await commentCollection.findOne( {_id : ObjectId(id) });
    if (commentData=== null) throw 'No comment with that id';
    commentData._id = commentData._id.toString();
    return commentData;
    },

    async getByUserId(id) {
        if (arguments.length !== 1)  throw " You must provide an id and only one id to search for!";
        id = validation.checkId(id,'ID'); 
        const commentCollection = await comments();
        const commentsList = await commentCollection.find( {UserId: id}).toArray();
        if (commentsList.length== 0) return "This user has no comments";
        // for(let i = 0; i < commentsList.length; i++) {
        //     commentsList[i]._id = commentsList[i]._id.toString();
        // }
    
        return commentsList;

        // for(i= 0;i < commentCollection.length;i++){
        //     if(id.toString() == commentCollection[i].UserId.toString()){
        //         commentData.append(commentCollection[i])  
        //     }
        // }
        // if(commentData.length == 0) return "This user has no comments";
        // //const commentData = await commentCollection.findOne( {UserId : ObjectId(id) });
        // //if (commentData=== null) throw 'No comment with that id';
        // //commentData._id = commentData._id.toString();
        // return commentData;
        },

    async getAllCommentsOfTheOneParkLotID(id) {
        if (arguments.length !== 1)  throw " You must provide an id and only one id to search for!";
        id = validation.checkId(id,'ID');
            
        const commentCollection = await comments();
        const commentsList = await commentCollection.find( {parkLotId : id }).toArray();
        if (commentsList.length== 0) return "There is no comment for this parkLot, add one now!";
        for(let i = 0; i < commentsList.length; i++) {
            commentsList[i]._id = commentsList[i]._id.toString();
        }
    
        return commentsList;
        },

    async create ( isDelete, commentTag, commentdate, parkLotId, UserId, commentInfo, level) {

        if (arguments.length !== 7) {
            throw "There must be 7 arguments !"
        }

        if(typeof isDelete !== 'boolean') {
            throw 'isDelete should be Boolean'
        }

        commentTag = validation.checkStringArray(commentTag, 'commentTag');

        commentdate = validation.checkValidDate(commentdate, 'commentdate'); 

        parkLotId = validation.checkId(parkLotId,'parkLotId');

        UserId = validation.checkId(UserId,'UserId');

        commentInfo = validation.checkString(commentInfo, 'CommentInfo');

        level = validation.checkRate(level,'Level');
        
        const commentCollection = await comments();

        let newComment = {

            isDelete : isDelete,
            commentTag : commentTag, 
            commentdate : commentdate,
            parkLotId : parkLotId,
            UserId : UserId,
            commentInfo : commentInfo,
            rating: level

        };

        const insertInfo = await commentCollection.insertOne(newComment);
        if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Could not add the band !';

        const newId = insertInfo.insertedId.toString();

        const commentData = await commentCollection.findOne( {_id : ObjectId(newId) });
        let rate = commentData.rating;

        if (rate){
            const parkLotCollection = await parklot();
            const parklotData = await parkLotCollection.findOne( {_id : ObjectId(parkLotId) });
            if(parklotData.totalCommentNumber){
                await parkLotCollection.updateOne({_id : ObjectId(parkLotId)},{$inc : {totalCommentRating : rate, totalCommentNumber : 1} });
            }else{
                await parkLotCollection.updateOne({_id:ObjectId(parkLotId)}, {$set : {totalCommentRating : rate, totalCommentNumber: 1}})
            }

            let avgbefore = await parkLotCollection.findOne( {_id : ObjectId(parkLotId) });

            let avgrating = (avgbefore.totalCommentRating / avgbefore.totalCommentNumber);

            await parkLotCollection.updateOne({_id : ObjectId(parkLotId)}, {$set : {rating : avgrating}});

        }


        const comment = await this.get(newId);
        return comment
    },

    async remove(id) {
        if(arguments.length !== 1) throw "There must be one and one only argument !";
        id = validation.checkId(id, 'ID');

        const commentCollection = await comments();
                
        const deletecomment = await commentCollection.findOne({_id : ObjectId(id)});
        if (!deletecomment) throw `${id} not in the database ! `; 

        let deleterating = deletecomment.rating;
        let parkLotId = deletecomment.parkLotId;
        
        if(deleterating){
            const parkLotCollection = await parklot();
            const parklotData = await parkLotCollection.findOne( {_id : ObjectId(parkLotId) });
            if(parklotData.totalCommentNumber >= 2){
                await parkLotCollection.updateOne({_id : ObjectId(parkLotId)},{$inc : {totalCommentRating : -deleterating, totalCommentNumber : -1} });
                let avgbefore = await parkLotCollection.findOne( {_id : ObjectId(parkLotId) });
                let avgrating = (avgbefore.totalCommentRating / avgbefore.totalCommentNumber);
                await parkLotCollection.updateOne({_id : ObjectId(parkLotId)}, {$set : {rating : avgrating}});
            }else{
                await parkLotCollection.updateOne({_id : ObjectId(parkLotId)}, {$set : {rating : 0, totalCommentNumber : 0, totalCommentRating : 0}});
            }
        }
        
        const deletionInfo = await commentCollection.deleteOne({_id : ObjectId(id)});

        if (deletionInfo.deletedCount === 0) throw `Could not delete band with id of ${id}`;
        return "your comment has been successfully deleted" ;
    }

}