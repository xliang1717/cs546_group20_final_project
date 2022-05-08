
(function ($) {
    var result = $('#result'),
        error = $('#error'),
        addNewPetrol = $('#addNewPetrol'),
        PetrolName = $('#PetrolName'),
        PetrolLocation = $('#PetrolLocation'),
        PetrolLongitude = $('#Longitude'),
        PetrolLatitude = $('#Latitude'),
        Petroltype = $('#type');
    form = $('#form')




    addNewPetrol.submit((event) => {
        event.preventDefault();
        result.hide();

        let e = false;


        let name = PetrolName.val();
        if (!name) {
            alert('You need to input the PetrolName ');
            e = true;
        }

        let Location = PetrolLocation.val();
        if (!Location) {
            alert('You need to input the PetrolLocation ');
            e = true;

        }

        let coordinate = {
            Longitude: PetrolLongitude.val(),
            Latitude: PetrolLatitude.val()
        }

        let type = Petroltype.val();
        if (type.length === 0) {
            alert('You need to choose the type');
            e = true;
        }


        let body = {
            name: name,
            location: Location,
            coordinate: coordinate,
            type: type

        };



        var requestConfig = {
            url: 'http://localhost:3000/petrolStation/addnewpetrol',
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(body)

        };

        if (!e) {
            $.ajax(requestConfig).then(function (responseMessage) {
                if (!responseMessage.success) {
                    form.show();
                    result.html(responseMessage.exe)
                    result.show();
                    addNewPetrol.trigger('reset');
                    error.html(responseMessage.error);
                    error.show();

                } else {
                    error.hide();
                    form.hide();
                    addNewPetrol.trigger('reset');
                    result.html('You have successfully add the petrolStation!');
                    result.show();
                }
            });
        };

    });

})(window.jQuery);