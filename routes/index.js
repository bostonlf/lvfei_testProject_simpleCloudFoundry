var express = require('express');
var router = express.Router();
//var user = require('../database/db').user;
// var controller=require("../controller/controller.js");
// var models=require("../models/model.js")
//var cookieParser = require('cookie-parser');
//db.js里设置了用那个数据库（lvfei） ， 这里定义用lvfei里的哪张表
//这时 user是一个 Model ，它是在db.js里定义的
// var cat = require('../database/cat').cat;
var bodyParser = require('body-parser');
var formidable = require('formidable');//node.js表单——formidable
var app = express();


//edit user
router.get('/createUser', function (req, res) {
	res.render('createUser', {
		createUserTitle : "lvfei_crateUser"
	});
});



/**将页面值写入DB**/
router.get('/submit_creater', function (req, res) {
	// 输出 JSON 格式
				/*
	name: String,
	password: String,
	Ugroup: String,
	Company: String,
	CompanyPhone: String,
	Email: String
				*/
	response = {
		name : req.query.name,
		Ugroup : req.query.group,
	};
	console.log(response);
	// res.end(JSON.stringify(response));

	//save to DB
	var MongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/lvfei';
	var insertData = function (db, targetData, callback) {
		//连接到表
		var collection = db.collection('users');
		//插入数据
		//  var data = [{"name":'boston',"age":21},{"name":'wilson002',"age":22}];
		//var data = response;
		collection.insert(targetData, function (err, result) {
			if (err) {
				console.log('Error:' + err);
				return;
			}
			callback(result);
		});
	}

	MongoClient.connect(DB_CONN_STR, function (err, db) {
		console.log("conect succefully!");
		insertData(db, response, function (result) {
			console.log(result);
			db.close();
		});
	});
	/*end*/
	// res.end(JSON.stringify(response));
	res.send("new user created");
})


/**some test end**/
module.exports = router;