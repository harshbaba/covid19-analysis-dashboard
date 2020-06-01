$(document).ready(function(){
    
    function getFormData(){

        var mainObj = {
            date:$('#upload-date-field').val(),
            stateCode:$( "#upload-state-dropdown option:selected" ).val(),
            citiesFormData: [],
            stateData:{}
        };

        if(mainObj.date == ""){
            alert("Please fill upload date field");
            return false;
        }
         

        $('.cities-list > li.content').each(function(){
            var cityIndEle = $(this).find('.city-ind');

            var cityObj = {
                cityCode:cityIndEle.attr('data-cityCode'),
                data:{}
            };

            cityIndEle.find('input[type="text"]').each(function(){
                var inputEle = $(this);
                var keyName = inputEle.attr('name');
                var value = inputEle.val();
                cityObj.data[keyName] = parseInt(value);
            });
            cityObj.data.date = mainObj.date;
            mainObj.citiesFormData.push(cityObj);
        });
        

        
        
        var stateIndEle = $('.state-ind.content');
        stateIndEle.find('input[type="text"]').each(function(){
            var inputEle = $(this);
            var keyName = inputEle.attr('name');
            var value = inputEle.val();
            mainObj.stateData[keyName] = parseInt(value);
        });
        

        mainObj.stateData.date = mainObj.date;

        console.log(mainObj);
        return mainObj;
    }

    function handleInputEntry(obj){
        //first calculate diff after updated value
        var diff = obj.value - obj.currValue;
        if(diff < 0) diff = 0;
        obj.ele.closest('.content').find('input[name="'+obj.targetInput+'"]').val(diff);
        
        var totalCase = obj.ele.closest('.content').find('input[name="total"]').val();
        var totalRecovered = obj.ele.closest('.content').find('input[name="totalRecovered"]').val();
        var totalDeaths = obj.ele.closest('.content').find('input[name="totalDeaths"]').val();        
        var activeCase = totalCase - totalRecovered - totalDeaths;

        obj.ele.closest('.content').find('input[name="totalActive"]').val(activeCase);
    }

   

    $('#upload-form').click(function(){
        var formData = getFormData();
        if(!formData) return false;

        $.ajax({
            type: "POST",
            url: "../api/upload-state-nd-cities",
            //url: "../api/edit-state-nd-cities",
            data:  {test:JSON.stringify(formData)},
            cache: false,
            dataType: "JSON",
            success: function(data){
               alert(data.message);
               window.location.reload();
            },
            error:function(err){
                console.log(err);
            }
        });

    });

    //restrict to enter only 0-9 in inputs
    /*$('input[name="total"], input[name="totalRecovered"], input[name="totalDeaths"]').keydown(function(event) {
        // Allow only backspace and delete
        if ( event.keyCode == 46 || event.keyCode == 8 ) {
            // let it happen, don't do anything
        }
        else {
            // Ensure that it is a number and stop the keypress
            if (event.keyCode < 48 || event.keyCode > 57 ) {
                event.preventDefault(); 
            }   
        }
    });
    */
    $('input[name="total"], input[name="totalRecovered"], input[name="totalDeaths"]').keyup(function(){
        //console.log($(this).val());
        var obj = {
            ele:            $(this),
            name:           $(this).attr('name'),
            value:          $(this).val(),
            targetInput:    $(this).attr('targetInput'),
            currValue:      $(this).attr('currValue') 
        }

        handleInputEntry(obj);
    });
    
    
});

/*
var fillDate = "2020-04-24";
var matchingDate = 424;

var notfoundCity = [];
$('.cities-list > li.content').each(function(){
    var elem = $(this);
    var cityName =  elem.find('.city-ind > .column:eq(0)').text().trim();
    var cityDataArr = myUpData[cityName];
    var notF = true;
    var isDateExist = _.findIndex(cityDataArr, {date:fillDate});
    if(isDateExist != -1){
        var cityData = cityDataArr[isDateExist]
        notF = false;
        elem.find('input[name="total"]').val(cityData.confirmed);
        elem.find('input[name="totalRecovered"]').val(cityData.recovered);
        elem.find('input[name="totalDeaths"]').val(cityData.deceased);
        elem.find('input[name="total"], input[name="totalRecovered"], input[name="totalDeaths"]').trigger('keyup');
    }
    if(notF){
        var dateArr = myUpData[cityName][0].date.split('-');
        var dateStr = dateArr[1]+dateArr[2];
        dateStr = parseInt(dateStr);
        if(dateStr <= matchingDate){
            notfoundCity.push(cityName+' '+myUpData[cityName][0].date)
        }
    }
});
console.log(notfoundCity);

*/