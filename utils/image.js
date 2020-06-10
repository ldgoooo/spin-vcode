var fs = require('fs');
var randomstring = require("randomstring");
var utilsArray = require("./array");

var utilsNumber = require("./number");
var Config = require("../config");
const sharp = require('sharp');


function genRotateImage(){
    return new Promise((resolve,reject)=>{
        // const sourcePath = path.join(__dirname, '../public/images/sources/')
        // console.log(sourcePath)
        // const distPath = path.join(__dirname, '../public/images/dist/')
        fs.readdir(Config.image.sourcePath, function(err, files) {
            if(err){
                console.log(err)
                reject(err)
            }else{
                // console.log(files)
                const txtFiles = files.filter(el => /\.png$/.test(el))
                
                // console.log(txtFiles)
                sources=utilsArray.randoms(txtFiles,1);
                // console.log(sources)
                
                    let rotate=utilsNumber.random(2,178)
                    let target=randomstring.generate()+".png"
                    sharp(Config.image.sourcePath+sources[0])
                        .rotate(rotate,{background:"#ffffff"})
                          .flatten( { background: '#fff' } )
                           .resize({ width: 300,height:300 })
                           .trim()
                           .toFile(Config.image.distPath+target).then(()=>{
                                result={
                                        rotate:rotate,
                                        target:target
                                    }
                                
                                resolve(result)
                            }).catch((err)=>{
                                reject(err)
                            })

                   
            }
             
        })
    })
}

module.exports = {
  genRotateImage
};