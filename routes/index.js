var express = require('express');
var request = require('request');
var router = express.Router();

var {genRotateImage} = require("../utils/image");

var Config = require("../config");
require("../globals");

router.get('/image', function(req, res, next) {
	let pid =req.query.pid	
	global.redisClient.hget(pid, "target" ,function(err, target) {
		if(!err && target){
	  		res.sendFile(Config.image.distPath+target)
	  	}else{
		  	genRotateImage().then(result=>{
				global.redisClient.hmset(pid,result)
				global.redisClient.expire(pid, 60)
				console.log(pid)
				console.log(result)
				res.sendFile(Config.image.distPath+result.target)
			}).catch(err=>{
				console.log(err)
				res.fail(err.message)
			})
		}
	});
});

router.post('/validate', function(req, res, next) {
  let uid = req.body.uid;
  let pid = req.body.pid;
  let rotate = req.body.r;
  let params = req.body.params;
  let action = Config.actions[uid];

  if(!pid || !rotate || !uid || !action){
  	res.fail("参数错误")
  }else{
  	global.redisClient.hget(pid,'rotate', (pidErr, _rotate) =>{
	  console.log(_rotate)
	  console.log(rotate)
	  if(Math.abs(parseInt(_rotate)+parseInt(rotate)-360)<10){
	  	console.log("success")
	  	console.log(action)
		request[action.type]({
		  headers: {'content-type' : 'application/x-www-form-urlencoded'},
		  url:     action.url,
		  body:    params
		}, function(error, response, body){
			// res.success(body)
		  	console.log(body)
		  	console.log({"errNo":0})
		  	res.success(body)
		});
		
	  }else{
	  	res.fail("认证失败")
	  }
	})
  	
  }
  
});

module.exports = router;
