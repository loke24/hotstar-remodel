var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('details',['details']);
var ddb = mongojs('newDetails',['newDetails'])

router.get('/',function(req,res){
	db.details.find(function(err,docs){
		res.json(docs);
		console.log(docs);
	})
});

router.post('/newDetails',function(req,res){
	ddb.newDetails.insert(req.body,function(err,docs){
		res.json(docs);
		console.log(docs);
	})
})



module.exports = router;