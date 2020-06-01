let global_helper = {};
var _ = require('underscore');

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
        //expectedData.datesS = data.datesS[22];
    }

    var cities = data.cities.map(function(cityInd){
        if(cityInd.datesC.length > 0){
            cityInd.datesC = cityInd.datesC[cityInd.datesC.length - 1];
            cityInd.totalNo = cityInd.datesC.total;
            //cityInd.datesC = cityInd.datesC[22];
        }
        return cityInd
    });

    // cities = _.sortBy(cities, 'totalNo');
    // cities = cities.reverse();
    expectedData.cities = cities;
    //console.log(expectedData);
    return expectedData;
}

global_helper.makeSingleDayDataForEditData = function(data,date){
    var expectedData = {
        _id         : data._id, 
        stateName   : data.stateName,
        stateCode   : data.stateCode,
        datesS       : {},
        cities      : []
    }

    var isDateExistInState = _.findIndex(data.datesS, {date:date});
    if(isDateExistInState != -1){
        expectedData.datesS = data.datesS[isDateExistInState];
    }

    var cities = data.cities.map(function(cityInd){
        var isDateExistInCity = _.findIndex(cityInd.datesC, {date:date});
        if(isDateExistInCity != 1){
            cityInd.datesC = cityInd.datesC[isDateExistInCity];
            cityInd.totalNo = cityInd.datesC.total;
        }
        return cityInd
    });

    // cities = _.sortBy(cities, 'totalNo');
    // cities = cities.reverse();
    expectedData.cities = cities;
    //console.log(expectedData);
    return expectedData;
}

module.exports = global_helper;

/*
for(var i = 20200326; i > 20200303; i--){
    var obj = {
        "total": 0,
        "totalRecovered": 0,
        "totalDeaths": 0,
        "totalActive": 0,
        "newCaseCount": 0,
        "newRecoveredCount": 0,
        "newDeathsCount": 0,
        "date": ""
    }

    obj.date = ''+i+'';

    t.datesS.unshift(obj);
}*/
/*
for(var k = 0; k < t.cities.length; k++){
    for(var i = 20200326; i > 20200303; i--){
        var obj = {
            "total": 0,
            "totalRecovered": 0,
            "totalDeaths": 0,
            "totalActive": 0,
            "newCaseCount": 0,
            "newRecoveredCount": 0,
            "newDeathsCount": 0,
            "date": ""
        }
    
        obj.date = ''+i+'';
    
        t.cities[k].datesC.unshift(obj);
    }
}*/
/*
var result = {
    matched:[],
    notMatched: []
}
for(var i = 0; i < db.cities.length; i++){
    var cityName = db.cities[i].cityName;
    if(myUpData.hasOwnProperty(cityName)){
        result.matched.push(cityName);
    }else{
        result.notMatched.push(cityName);
    }
}

*/

 //add cities
/*
for(var i = 0; i < cityArr.length; i++){
    var cityName = cityArr[i];
    var index =  _.findIndex(db.cities, {cityName:cityName});
    if(index == - 1){
        //add city
        var obj = {
            "datesC":fillDefaultDatesOfCity(),
            "cityCode": createCityCode(cityName),
            "cityName": cityName
        }

        db.cities.push(obj);
    }
}

function createCityCode(cityName){
    var cityNameArr = cityName.split(" ");
    if(cityNameArr.length == 1){
        return cityNameArr[0].toLocaleLowerCase();
    }

    if(cityNameArr.length == 2){
        return cityNameArr[0].toLocaleLowerCase() + cityNameArr[1];
    }

    if(cityNameArr.length == 3){
        return cityNameArr[0].toLocaleLowerCase() + cityNameArr[1] + cityNameArr[2];
    }
}

function fillDefaultDatesOfCity(){
    var arr = [];
    for(var i = 20200417; i > 20200303; i--){
        var obj = {
            "total": 0,
            "totalRecovered": 0,
            "totalDeaths": 0,
            "totalActive": 0,
            "newCaseCount": 0,
            "newRecoveredCount": 0,
            "newDeathsCount": 0,
            "date": ""
        }
    
        obj.date = ''+i+'';
    
        arr.unshift(obj);

        if(i == 20200401){
            i = 20200332;
        }
    }

    return arr;
}
*/
