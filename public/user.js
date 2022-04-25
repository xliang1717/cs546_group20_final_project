(function ($) {

    var showMyCollectionBoxDiv = $('#showMyCollectionBox');
    
    var emptycollectionBoxDiv = $('#emptycollectionBox');

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
                if (!showMyCollectionBoxDiv.hasClass( "collectionBox" )) {
                    emptycollectionBoxDiv.show();
                }
            });
        });
    }

    showMyCollectionBoxDiv.children().each(function (index, element) {
        bindEventsToMyCollectionItem($(element));
    });

})(window.jQuery);