
(function($){

    var result = $('#result'),
        error = $('#error'),
        commentsListArea = $('#commentList'),
        addNewComment = $('#addNewComment');
        commentContent = $('#comment-content');
        commentRating =$('#rating');
        commentTag = $("input[name='tag']");
        parkingId = $('#ParkLotId');
        

    addNewComment.submit((event) =>{
        event.preventDefault();

        let commentInfo = commentContent.val().trim();
        let rating =commentRating.val();
        let parkLotId = parkingId.val();

        let check_val = [];
        for (x in commentTag){
            if (commentTag[x].checked) check_val.push(commentTag[x].value);
        };

        let body = {            
            commentTag : check_val,
            parkLotId : parkLotId,
            commentInfo : commentInfo,
            level : rating
        };

        var requestConfig = {
            url : 'http://localhost:3000/comment/comment',
            method : 'POST',
            dataType : "json", 
            contentType: 'application/json',
            data : JSON.stringify(body),
        };

        $.ajax(requestConfig).then(function(responseMessage){
            if(responseMessage.length === 0) {
                // return shows;
                commentsListArea.hide();
                error.show();
                error.html('No show is mathched this term');

            }else{
                alert('You have successfully comment !')
            }
    
        });
    });
    

})(window.jQuery);