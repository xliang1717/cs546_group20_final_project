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
      var userId = currentremove.context.dataset.userid;
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

})(window.jQuery);