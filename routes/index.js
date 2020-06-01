var express = require('express');
var router = express.Router();

var config = require('../config'); // get our config file
var State  = require('../models/state'); // get our mongoose model of states
var globalHelper = require('../utils/global_helper');

/* GET home page */
router.get('/', function(req, res, next) {
  	res.render('../views/modules/home/home', {
		title: 'R&D App',
		headerData : {
			title: 'Home',
		},
		cssList : [
			'modules/home/home'
		],
		jsList : [
			'/js/modules/home/home.js'
		],
		layout:'../views/themes/r_nd_d_app.html'
	});
});

router.get('/aboutus', function(req, res, next) {
  	res.render('../views/modules/aboutus/aboutus', {
		title: 'R&D App',
		headerData : {
			title: 'aboutus',
		},
		cssList : [
			'modules/aboutus/aboutus'
		],
		jsList : [
			'/js/modules/aboutus/aboutus.js'
		],
		layout:'../views/themes/r_nd_d_app.html'
	});
});

router.get('/upload-data-state-nd-city/:stateCode', function(req, res, next) {
	//console.log(req.body);
	State.findOne({stateCode: req.params.stateCode},function(err, states){
		if(err){
			res.json({success: false, message: err});
		}else{
			//console.log(states[1]);
			res.render('../views/modules/upload-data-state-nd-city/upload-data-state-nd-city', {
				title: 'R&D App',
				headerData : {
					title: 'upload-data-state-nd-city',
				},
				pageData:globalHelper.makeSingleDayDataForUploadData(states),
				//pageData:{},
				mainData:JSON.stringify(states),
				cssList : [
					'modules/upload-data-state-nd-city/upload-data-state-nd-city'
				],
				jsList : [
					  	'/js/models/myUpData.js',
						'/js/modules/upload-data-state-nd-city/upload-data-state-nd-city.js'
				],
				layout:'../views/themes/r_nd_d_app.html'
				});
			//res.json({success: true, data: states});
		}
	});

	
});

router.get('/edit-data-state-nd-city/:stateCode/:date', function(req, res, next) {
	//console.log(req.body);
	State.findOne({stateCode: req.params.stateCode},function(err, states){
		if(err){
			res.json({success: false, message: err});
		}else{
			//console.log(states[1]);
			res.render('../views/modules/edit-data-state-nd-city/edit-data-state-nd-city', {
				title: 'R&D App',
				headerData : {
					title: 'edit-data-state-nd-city',
				},
				pageData:globalHelper.makeSingleDayDataForEditData(states, req.params.date),
				//pageData:{},
				//mainData:JSON.stringify(states),
				cssList : [
					'modules/edit-data-state-nd-city/edit-data-state-nd-city'
				],
				jsList : [
					  	'/js/models/myUpData.js',
						'/js/modules/edit-data-state-nd-city/edit-data-state-nd-city.js'
				],
				layout:'../views/themes/r_nd_d_app.html'
				});
			//res.json({success: true, data: states});
		}
	});

	
});

module.exports = router;
