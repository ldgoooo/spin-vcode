
module.exports = async (req, res, next) => {
  console.log(global.env)
  if (global.env.type == "develop") {
    res.header(
      "Access-Control-Allow-Origin",
      req.headers.origin || "http://localhost:9001"
      // req.headers.origin || "http://39.105.31.67:6914"
    );
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "x-requested-with,content-type");
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
};