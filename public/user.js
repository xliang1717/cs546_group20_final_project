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

    // My Area
    var newAreaInput = $('#newAreaInput');
    var addNewAreaBtn = $('#addNewAreaBtn');
    var addNewAreaConfrimBtn = $('#addNewAreaConfrimBtn');
    var showMyAreaBox = $('#showMyAreaBox');
    var myAreaModal = $('#myAreaModal');

    addNewAreaConfrimBtn.on('click', function (event) {
        event.preventDefault();
        var newArea = newAreaInput.val();
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
        });

        // myAreaModal.modal('hide');
        // $('body').removeClass('modal-open');
        // $('.modal-backdrop').remove();

      });



})(window.jQuery);