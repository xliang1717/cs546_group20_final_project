(function ($) {

    // My Collection 
    var showMyCollectionBoxDiv = $('#showMyCollectionBox');

    var emptycollectionBoxDiv = $('#emptycollectionBox');

    if (showMyCollectionBoxDiv.children().length == 0) {
        emptycollectionBoxDiv.show();
    }

    function bindEventsToMyCollectionItem(collectionBoxItem) {
        collectionBoxItem.find('.collectionBoxCancelBtn').on('click', function (event) {
            event.preventDefault();
            var currentCancelBtn = $(this);
            var userId = currentCancelBtn.data('userid');
            var parkingLotId = currentCancelBtn.data('parkinglotid');

            var requestConfig = {
                method: 'DELETE',
                url: '/myCollection/' + userId + '?parkingLotId=' + parkingLotId
            };

            $.ajax(requestConfig).then(function (responseMessage) {
                console.log(responseMessage);
                collectionBoxItem.remove();
                if (showMyCollectionBoxDiv.children().length == 0) {
                    emptycollectionBoxDiv.show();
                }
            });
        });
    }

    showMyCollectionBoxDiv.children().each(function (index, element) {
        bindEventsToMyCollectionItem($(element));
    });

    // My Comments 
    var showMyCommentsBoxDiv = $('#showMyCommentsBox');

    var emptyCommentBoxDiv = $('#emptyCommentBox');

    if (showMyCommentsBoxDiv.children().length == 0) {
        emptyCommentBoxDiv.show();
    }

    function bindEventsToMyCollectionItem(commentBoxItem) {
        commentBoxItem.find('.commentBoxCancelBtn').on('click', function (event) {
            event.preventDefault();
            var currentCancelBtn = $(this);
            var commentId = currentCancelBtn.data('commentid');

            var requestConfig = {
                method: 'DELETE',
                url: '/myComments/' + commentId
            };

            $.ajax(requestConfig).then(function (responseMessage) {
                console.log(responseMessage);
                commentBoxItem.remove();
                if (showMyCommentsBoxDiv.children().length == 0) {
                    emptyCommentBoxDiv.show();
                }
            });
        });
    }

    showMyCommentsBoxDiv.children().each(function (index, element) {
        bindEventsToMyCollectionItem($(element));
    });

    // My Area
    var newAreaInput = $('#newAreaInput');
    var addNewAreaBtn = $('#addNewAreaBtn');
    var addNewAreaConfrimBtn = $('#addNewAreaConfrimBtn');
    var showMyAreaBox = $('#showMyAreaBox');
    var modalInputError = $('#modalInputError');

    addNewAreaConfrimBtn.on('click', function (event) {
        event.preventDefault();
        var newArea = newAreaInput.val();
        if (!newArea || newArea.trim().length == 0) {
            modalInputError.text("Input should not be empty.");
            modalInputError.show();
            event.stopPropagation();
            newAreaInput.val('');
        } else {
            modalInputError.hide();

            var userId = addNewAreaBtn.data('userid');

            var requestConfig = {
                method: 'POST',
                url: '/user/area',
                data: {
                    userId: userId,
                    newArea: newArea
                }
            };

            $.ajax(requestConfig).then(function (responseMessage) {
                var newElement = $(responseMessage);
                showMyAreaBox.replaceWith(newElement);
                newAreaInput.val('');
                showMyAreaBox = newElement;
            });
        }

    });

    // My Cars
    var newCarInput = $('#newCarInput');
    var addNewCarBtn = $('#addNewCarBtn');
    var addNewCarConfrimBtn = $('#addNewCarConfrimBtn');
    var showMyCarsBox = $('#showMyCarsBox');
    var modalMyCarsInputError = $('#modalMyCarsInputError');

    addNewCarConfrimBtn.on('click', function (event) {
        event.preventDefault();
        var newCar = newCarInput.val();
        if (!newCar || newCar.trim().length == 0) {
            modalMyCarsInputError.text("Input should not be empty.");
            modalMyCarsInputError.show();
            event.stopPropagation();
            newCarInput.val('');
        } else {
            modalMyCarsInputError.hide();

            var userId = addNewCarBtn.data('userid');

            var requestConfig = {
                method: 'POST',
                url: '/myCar',
                data: {
                    userId: userId,
                    newCar: newCar
                }
            };

            $.ajax(requestConfig).then(function (responseMessage) {
                var newElement = $(responseMessage);
                showMyCarsBox.replaceWith(newElement);
                newCarInput.val('');
                showMyCarsBox = newElement;
            });
        }

    });


})(window.jQuery);