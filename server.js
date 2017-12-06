var express=require('express');
var app = express();
var bodyparser = require('body-parser');
var cors = require('cors');
var mongojs = require('mongojs');//similar to mongoose
var mongoose = require('mongoose');
var multer = require('multer');
var upload = multer({dest:'upload/'});
var fs = require('fs');
mongoose.connect('mongodb://localhost/newDetails',{ useMongoClient: true });
var mdb = mongoose.connection;
var Schema = mongoose.Schema;
var objectID = require('mongodb').objectID;
var db = mongojs('register',['register']);
app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname +'/public'));

//connection testing
// mdb.once('open',function(){
// 	console.log('connected ok');
// })

//adding schema


var newDetails = require('./schema');


var details = require('./router');
app.use('/details',details);

app.post('/newcontent',function(req,res){
// 	var news = new newDetails({
// 		traypanel:[{
// 			content:req.body.content
// 		}]
// 	})
// 	news.save(function(err,data){
// 		if(err)throw err;
// 		res.json(data);
// 	})
// })
	newDetails.findOneAndUpdate({_id:"5995ddf7cdf9b20e583e791a"},{
		$push:{
			"traypanel":{
				"content":req.body.content
			}}},{new:true},function(err,data){
				if(err)throw err;
				res.json(data);
				console.log(data);
			})
		
	})

app.post('/testing/:test',function(req,res){
	
	var te = req.params.test;
	res.send(req.params.test);
	console.log(te);
})

app.post('/contentEdit/:content',upload.any(),function(req,res){
		var content = req.params.content;
		console.log(req.params.content);
		console.log('sd'+content);
		if(req.files){
			req.files.forEach(function(file){
				fs.rename(file.path,'public/component/directive/newImg/'+file.originalname,function(err){
					if(err)throw err;
				newDetails.findOneAndUpdate({_id:"5995ddf7cdf9b20e583e791a","traypanel.content":req.params.content},
		{$push:{
			"traypanel.$.cardGroup":{
				"title":req.body.title,
				"tag":req.body.tag,
				"image":file.originalname}
			}},{new:true},
				function(err,data){
					if(err){
						throw err;
					}
						else{
							res.json(data);
							console.log("success");
						}
					
				}
			)
				})
			})
		} 


	
});
// app.post('/newcard',function(req,res){
// 	newDetails.findOneAndUpdate({_id:"59846b20d6c68f18d86e00b1","traypanel.content":"Trending Tamil Movies"},
// 		{$push:{
// 			"traypanel.$.cardGroup":{
// 				"title":req.body.title,
// 				"tag":req.body.tag}
// 			}},{new:true},
// 				function(err,data){
// 					if(err){
// 						throw err;
// 					}
// 						else{
// 							res.json(data);
// 						}
					
// 				}
// 			)
// })

// app.post('/newDetail',function(req,res){
// 	newDetails.findOneAndUpdate({_id:"597b1c3d4c9a9513743d052e" ,"traypanel.content":req.body.image},
// 	{$push:{
// 		"traypanel.$.cardGroup":{"title":req.body.content}
// 		}
// 	},{new:true},function(err,data){
// 		if(err){
// 			throw err;
// 		}else{
// 			console.log(data);
// 			res.json(data);
// 		}
// 	})
		
// });
//get all database data
app.get('/newDetailget',function(req,res){
	newDetails.find({},function(err,data){
		res.json(data);
		console.log(data);
	})
})



app.listen(8000);
console.log('listening to port 8000');