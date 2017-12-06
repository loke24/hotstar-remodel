var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/newDetails',{ useMongoClient: true });

var Schema = mongoose.Schema;
 var newDetailSchema  = new Schema({
	traypanel:
	[{
		content:String,
		cardGroup:[{
				title:String,
				image:String,
				tag:String,
				   }]

	}]
	
	
});

var newDetails = mongoose.model('newDetails',newDetailSchema);

module.exports = newDetails;