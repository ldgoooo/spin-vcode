module.exports = async (req, res, next) => {
  res.success = function(data) {
    res.send({
      code: 200,
      data
    });
  };
  res.fail = function(message, code) {
    res.send({
      code: code | 1000,
      data: {},
      message: message
    });
  };
  next();
};
