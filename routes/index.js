var fs = require('fs');
var path = require('path');
var randomstring = require("randomstring");
var utilsArray = require("../utils/array");

var utilsNumber = require("../utils/number");
const sharp = require('sharp');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/vcodes', function(req, res, next) {
	genRotateImages().then(images=>{
		res.success(images);
	}).catch(err=>{
		res.fail(err)
	})
});

function genRotateImages(dir){
    return new Promise((resolve,reject)=>{
    	const sourcePath = path.join(__dirname, '../public/images/sources/')
		const distPath = path.join(__dirname, '../public/images/dist/')
        fs.readdir(sourcePath, function(err, files) {
        	if(err){
        		reject(err)
        	}else{
        		const txtFiles = files.filter(el => /\.png$/.test(el))
				sources=utilsArray.randoms(txtFiles,3);
				let results=[]
				sources.map(item=>{
					let rotate=utilsNumber.random(2,178)
					let target=randomstring.generate()+".png"
					sharp(sourcePath+item)
						.rotate(rotate,{background:"#ffffff"})
					  	.flatten( { background: '#fff' } )
					   	.resize({ width: 300,height:300 })
					   	.trim()
					   	.toFile(distPath+target)
					results.push({
						rotate:rotate,
						target:target
					})
				})
				resolve(results)
        	}
		 	
		})
    })
}



module.exports = router;
