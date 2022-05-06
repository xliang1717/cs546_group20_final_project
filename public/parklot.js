
(function($){
    var ParkLotName = $('#ParkLotName'),
        HHOH = $('#half-hour-one-hour'),
        OHOAHH = $('#one-hour-one-and-half-hour'),
        OAHHTH = $('#one-and-half-hour-two-hour'),
        ATH = $('#above-two-hour'),
        Longitude = $('#Longitude'),
        Latitude = $('#Latitude'),
        ZipCode = $('#ParkingLotLocationZipCode'),
        DisabilityFriendly = $('#DisabilityFrendly'),
        Morning = $('#m'),
        Afternoon = $('#a'),
        Evening = $('#e'),
        Night = $('#n'),
        capacitya = $('#ParkingLotCapacity');
        addNewParkLot = $('#addNewParkLot');
        error = $('#error');
        result = $('#result');
        form = $('#form');
        suitableVehicleSizea = $('#suitableVehicleSize');
        


    
    
    addNewParkLot.submit((event) =>{
        event.preventDefault();

        let e = false;
        
        let ParkLotNamea = ParkLotName.val().trim();
        if(!ParkLotNamea) {
            alert('You must have ParkLotName');
            e = true;
        }

        let HHOHa = HHOH.val();
        if(!HHOHa) {
            alert('You must give the price of half hour ~ 1 hour');
            e = true;
        }

        let OHOAHHa = OHOAHH.val();
        if(!OHOAHHa) {
            alert('You must give the price of 1 hour ~ 1 and half hour');
            e = true;
        }

        let OAHHTHa = OAHHTH.val();
        if(!OAHHTHa) {
            alert('You must give the price of 1 and half hour ~ 2 hour');
            e = true;
        }

        let ATHa = ATH.val();
        if(!ATHa) {
            alert('You must give the price of above 2 hours');
            e = true;
        }

        let Longitudea = Longitude.val();
        if(!Longitudea) {
            alert('You must give the Longitude');
            e = true;
        }


        let Latitudea = Latitude.val();
        if(!Latitudea) {
            alert('You must give the Latitude');
            e = true;
        }

        let zip = ZipCode.val();
        if(!zip) {
            alert ('You must input a ZipCode');
            e = true;
        }

        let df = DisabilityFriendly.val();
        if(!df) {
            alert ('You must choose the DisabilityFriendly');
            e = true;
        }

        let m = Morning.val();
        if(!m){
            alert('You need choose the traffic in 8:00~15:00');
            e = true;
        }

        let a = Afternoon.val();
        if(!a){
            alert('You need choose the traffic in 15:00~17:00');
            e = true;
        }

        let ev = Evening.val();
        if(!ev){
            alert('You need choose the traffic in 17:00~24:00 ');
            e = true;
        }

        let n = Night.val();
        if(!n){
            alert('You need choose the traffic in 24:00~8:00 ');
            e = true;
        }

        let cap = capacitya .val();
        if(!cap){
            alert('You need input the capacity ');
            e = true;
        }


        let parkingChargeStandarda = {
            'half hour ~ 1 hour' : HHOHa,
            '1 hour ~ 1 and half hour': OHOAHHa,
            '1 and half hour ~ 2 hour' : OAHHTHa,
            'above 2 hour' : ATHa
        }

        let parkingLotCoordinatesa = {
            Longitude : Longitudea,
            latitude : Latitudea
        }

        let TrafficConditionsa = {
            Morn : m,
            Afte : a,
            Even : ev,
            Nigh : n
        }


        suitableVehicleSize = suitableVehicleSizea.val();
        if(suitableVehicleSize.length === 0){
            alert('You need choose the suitable vehicle');
            e = true;
        }


        let body = {
            ParkLotName : ParkLotNamea,
            parkingChargeStandard : parkingChargeStandarda,
            parkingLotCoordinates : parkingLotCoordinatesa,
            ParkingLotLocationZipCode :zip,
            TrafficConditions :  TrafficConditionsa,
            DisabilityFriendly :df,
            suitableVehicleSize :suitableVehicleSize,
            capacity : cap,

        };



        var requestConfig = {
            url : 'http://localhost:3000/parklot/',
            method : 'POST',
            dataType : 'json',
            contentType : 'application/json',
            data : JSON.stringify(body)

        };

        if(!e){
            $.ajax(requestConfig).then(function(responseMessage){
                if(!responseMessage.success) {
                    form.show();
                    result.hide();
                    addNewParkLot.trigger('reset');
                    error.html(responseMessage.error);
                    error.show();

                }else{
                    error.hide();
                    form.hide();
                    addNewParkLot.trigger('reset');
                    result.html('You have successfully add the parkLot!');
                    result.show();
                }
            });
        };

    });

})(window.jQuery);