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

router.get('/upload-data', function(req, res, next) {
	//console.log(req.body);
	State.findOne({stateCode: "up"},function(err, states){
		if(err){
			res.json({success: false, message: err});
		}else{
			//console.log(states[1]);
			res.render('../views/modules/upload-data/upload-data', {
				title: 'R&D App',
				headerData : {
					title: 'upload-data',
				},
				pageData:globalHelper.makeSingleDayDataForUploadData(states),
				mainData:JSON.stringify({}),
				cssList : [
					'modules/upload-data/upload-data'
				],
				jsList : [
					  '/js/models/ui-model.js',
						'/js/modules/upload-data/upload-data.js'
				],
				layout:'../views/themes/r_nd_d_app.html'
				});
			//res.json({success: true, data: states});
		}
	});

	
});

module.exports = router;
