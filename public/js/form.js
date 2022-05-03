(function ($) {

  // $(document).on('click', '.removecarBtn', function(event){
  //   event.preventDefault();
  //   const id = $(this).attr('id');
  //   $(`#${id}`).hide();
  //   $(`#${id.slice(0,id.length-3)}`).hide();
  // });
  var carlistDiv = $('#carlistDiv');
  var eachcar =$('.eachcar');
  //var userId = carlistDiv.data('userId');
  //console.log(userId);
  //console.log(carlistDiv.data('userId'))
  var carlist = $('#carlist');
  console.log(1);
  function bindEventsToMyCarItem(carlistItem) {
    console.log(2);
    carlistItem.find('.removecarBtn').on('click', function (event) {
          event.preventDefault();
          var currentremove= $(this);
          console.log(3);
          //var carlistDiv = $('#carlistDiv');
          var userId = currentremove.context.dataset.userid;
          console.log(userId)
          var carname = currentremove.data('carname');
          console.log(carname);

          var requestConfig = {
              method: 'DELETE',
              url: '/myCar/'+userId,
              contentType: 'application/json',
              data: JSON.stringify({
                myCar:carname,
                userId:userId
              })
          };

          $.ajax(requestConfig).then(function (responseMessage) {
            // newElement = $(responseMessage);
            // bindEventsToMyCarItem(newElement)
              console.log(responseMessage);
               carlistItem.remove();
             
          });
           console.log(4);
          // $('eachCar').hide();
      });
  }

  carlistDiv.children().each(function (index, element) {
    bindEventsToMyCarItem($(element));
  });
  // carlistDiv.children().each(function (index, element) {
  //   bindEventsToMyCarItem($(element));
  // });

})(window.jQuery);