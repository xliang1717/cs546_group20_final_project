
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

        let e = false;

        let commentInfo = commentContent.val().trim();
        if(!commentInfo) {
            alert('You must have comment content!');
            e = true;
        }
        if(typeof commentInfo !== 'string') {
            alert('The comment content must be string !');
            e = true;
        }
        
        let rating =commentRating.val();
        if(!rating) {
            alert('You must need have rating!');
            e = true;
        }


        if(rating < 1 || rating >5) {
            alert('The rating must between 1~5 !');
            e = true;
        }


        if(!parseInt(rating)) {
            alert("You must input a number in the rating area!");
            e = true;
        }


        if(rating % 1 != 0) {
            alert("The rating must be an Interger !");
            e = true;
        }


        let parkLotId = parkingId.val();

        let check_val = [];
        for (x in commentTag){
            if (commentTag[x].checked) check_val.push(commentTag[x].value);
        };

        // 如果tag 可以不选的话，就保留push那一行，然后在validation单独写checktag，可以没有输入的， 要先判断有没有输入
        if(check_val.length === 0 ) {
            check_val.push('N/A');
            alert("You should checked some comment Tag !"); 
            e = true;
        }

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

        if(!e){
            $.ajax(requestConfig).then(function(responseMessage){
                if(responseMessage.length === 0) {
                    // return shows;
                    commentsListArea.hide();
                    error.show();
                    error.html('can not add the comments');

                }else{
                    error.hide();
                    addNewComment.trigger('reset');
                    commentContent.val('');
                    alert('You have successfully comment, refresh to see your comment!');
                }
        
            });
    
        };
    
    });
    

})(window.jQuery);