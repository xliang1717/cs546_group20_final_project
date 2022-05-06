(function ($) {
    let conditionParkFee = $('.Condition-list-PF');
    let conditionCarType = $('.Condition-list-CT');
    let conditionDisabledFacilities = $('.Condition-list-DF');
    let searchButton = $('.searchButton');
    let valArr = [];
    let valPF = null;
    let valCT = null;
    let valDF = null;

    conditionParkFee.on('click', 'li', function (event) {
        event.preventDefault();
        if (this.className == 'Subcondition Subcondition--active') {
            $(this).removeClass('Subcondition--active');
            valPF = null;
        } else if (this.className == 'Subcondition') {
            $('.Condition-list-PF .Subcondition').removeClass('Subcondition--active');
            $(this).addClass('Subcondition--active');
            valPF = this.innerHTML;
        }
    });

    conditionCarType.on('click', 'li', function (event) {
        event.preventDefault();
        if (this.className == 'Subcondition Subcondition--active') {
            $(this).removeClass('Subcondition--active');
            valCT = null;
        } else if (this.className == 'Subcondition') {
            $('.Condition-list-CT .Subcondition').removeClass('Subcondition--active');
            $(this).addClass('Subcondition--active');
            valCT = this.innerHTML;
        }
    });

    conditionDisabledFacilities.on('click', 'li', function (event) {
        event.preventDefault();
        if (this.className == 'Subcondition Subcondition--active') {
            $(this).removeClass('Subcondition--active');
            valDF = null;
        } else if (this.className == 'Subcondition') {
            $('.Condition-list-DF .Subcondition').removeClass('Subcondition--active');
            $(this).addClass('Subcondition--active');
            valDF = this.innerHTML;
        }
    });

    searchButton.on('click', function (event) {
        event.preventDefault();
        valArr = [];
        let locOption = $('#locationSelect option:selected');
        let locVal = locOption.val() ? locOption.val() : null;
        let zipOption = $('#zipCodeSelect option:selected');
        let zipVal = zipOption.val() ? zipOption.text() : null;
        valArr.push(valPF);
        valArr.push(valCT);
        valArr.push(valDF);
        valArr.push(locVal);
        valArr.push(zipVal);
        let requestConfig = {
            method: 'post',
            url: '/filter',
            data: {
                valPF: valPF,
                valCT: valCT,
                valDF: valDF,
                locVal: locVal,
                zipVal: zipVal,
                // filter: valArr,
            },
        };

        $.ajax(requestConfig).done(function (data) {
            location.replace('/filter');
        });
    });
})(window.jQuery);
