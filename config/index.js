var path = require('path');

module.exports = {
  env:{
    type: "develop",
    develop: {
      redisIp: "127.0.0.1",
      redisPort: "6379",
      redisPWD: "",
    }
  },
  users: {
  	"nys": {
  		actions:{
  			"sms":{
  				url:"",
  				type:"post",
  				defaultParams:{}
  			}
  		}
  	}
  },
  image:{
  	sourcePath : path.join(__dirname, '../public/images/sources/'),
  	distPath : path.join(__dirname, '../public/images/dist/')
  }
}