var path = require("path");
const redis = require('redis')

let config = require("./config");

global.env = config.env;
global.envConfig = config.env[config.env.type];
global.appRoot = path.resolve(__dirname);
global.redisClient = redis.createClient({
    host: global.envConfig.redisIp,
    port: global.envConfig.redisPort,
    pass: global.envConfig.redisPWD,
})

