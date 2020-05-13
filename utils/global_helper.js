let global_helper = {};

global_helper.makeSingleDayDataForUploadData = function(data){
    var expectedData = {
        _id         : data._id, 
        stateName   : data.stateName,
        stateCode   : data.stateCode,
        datesS       : {},
        cities      : []
    }

    if(data.datesS.length > 0){
        expectedData.datesS = data.datesS[data.datesS.length - 1];
    }

    var cities = data.cities.map(function(cityInd){
        if(cityInd.datesC.length > 0){
            cityInd.datesC = cityInd.datesC[cityInd.datesC.length - 1];
        }

        console.log(cityInd);
        return cityInd
    });

    expectedData.cities = cities;
    //console.log(expectedData);
    return expectedData;
}

module.exports = global_helper;