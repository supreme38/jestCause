var db = require('./config.js');
var jwt = require('jwt-simple');

module.exports = {
  check: function (req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No Token!!!!!!'));
    } else {
      var user = jwt.decode(token, 'secret');
      console.log('heres the current jwt: ', user)
      next();
    }
  },
}