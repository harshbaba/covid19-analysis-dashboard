var express = require('express');
var api = express.Router();
var mockData     = require('../models/mockData/mockData');
var globalHelper = require('../utils/global_helper');
var _ = require('underscore');

var config = require('../config'); // get our config file
var State  = require('../models/state'); // get our mongoose model of states

//==========================R_ND_APP Routes Start==========================
api.get('/getCityList',function(req, res){
    var completeData = JSON.parse(mockData.appData);
    res.send({data: completeData.statesList});
});

api.post('/upload-state-nd-cities',function(req, res){
    var formData = JSON.parse(req.body.test);
    //console.log(formData);
    //formData.stateCode
    State.findOne({stateCode: formData.stateCode},function(err, states){
		if(err){
			res.send({success: false, message: err});
		}else{
            var savedStateData = states;
            //check is DateExist in State
            
            var formUploadDate = formData.date;
            var isDateExistInState = _.findIndex(savedStateData.datesS, {date:formUploadDate});
            if(isDateExistInState == -1){
                var citiesFormData = formData.citiesFormData;
                
                var savedCities = savedStateData.cities;

                //start loop of citiesFormData
                for(var i = 0; i< citiesFormData.length; i++){
                    var indCity = citiesFormData[i];

                    //find index of city in saved Data
                    var savedCityIndex = _.findIndex(savedCities, {cityCode: indCity.cityCode});
                    if(savedCityIndex != -1){
                        savedCities[savedCityIndex].datesC.push(indCity.data);
                    }
                }

                //add state data
                savedStateData.datesS.push(formData.stateData);
                savedStateData.cities = savedCities;

                //update in mongo
                var query = { stateCode: formData.stateCode };
                var options = { new: true };
                var updateStateObj = {
                    stateName       : savedStateData.stateName,
                    stateCode       : savedStateData.stateCode,
                    datesS         : savedStateData.datesS,
                    cities        : savedStateData.cities
                };
                State.findOneAndUpdate(query, {$set: updateStateObj}, options, function (err, doc) {
                    if (err) {
                        res.json({success: false, message:err});
                    } else {
                        res.json({success: true, message: "Data Saved Sucessfully", data: doc});
                    }
        
                });

            }else{
                res.send({success:false, message:"This Date is already present"});
            }
            
        }
    });
    
    
});




module.exports = api;