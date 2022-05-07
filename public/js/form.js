(function ($) {
  var carlistDiv = $('#carlistDiv');
  var eachcar = $('.eachcar');
  var carlist = $('#carlist');
  var emptyDiv = $('#emptyDiv');
  emptyDiv.hide();
  if (carlistDiv.children().length == 0) {
    emptyDiv.show();
  }

  function bindEventsToMyCarItem(carlistItem) {

    carlistItem.find('.removecarBtn').on('click', function (event) {
      event.preventDefault();
      var currentremove = $(this);
      var userId = currentremove.data('userid');
      var carname = currentremove.data('carname');

      var requestConfig = {
        method: 'DELETE',
        url: '/myCar/' + userId,
        contentType: 'application/json',
        data: JSON.stringify({
          myCar: carname,
          userId: userId
        })
      };

      $.ajax(requestConfig).then(function (responseMessage) {

        console.log(responseMessage);
        carlistItem.remove();
        if (carlistDiv.children().length == 0) {
          emptyDiv.show();
        }

      });
    });
  }

  carlistDiv.children().each(function (index, element) {
    bindEventsToMyCarItem($(element));
  });

  //delete comment
  var commentul = $('#commentul');
  function bindEventsToMycommentItem(comlistItem) {

    comlistItem.find('.removecommentBtn').on('click', function (event) {
      event.preventDefault();
      var currentremovecom = $(this);
      //var commentId = currentremovecom.data('commentid');

      var requestConfig = {
        method: 'DELETE',
        url: '/comment/usercomment',
        //contentType: 'application/json',
        // data: JSON.stringify({
        //   myCar: carname,
        //   userId: userId
        // })
      };

      $.ajax(requestConfig).then(function (responseMessage) {

        console.log(responseMessage);
        comlistItem.remove();
        alert("aaa")
       

      });
    });
  }

  commentul.children().each(function (index, element) {
    bindEventsToMycommentItem($(element));
  });

})(window.jQuery);