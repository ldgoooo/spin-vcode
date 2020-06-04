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
  actions: {
  	"nys": {
  		url:"http://www.nongyisheng.com/sms/code",
  		type:"post",
  		defaultParams:{}
  	}
  },
  image:{
  	sourcePath : path.join(__dirname, '../public/images/sources/'),
  	distPath : path.join(__dirname, '../public/images/dist/')
  }
}