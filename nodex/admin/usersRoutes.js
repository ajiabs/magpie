
var express = require('express');
var app = express();
var passport = require('passport');
var usersAdminRoutes = express.Router();
require('../../system/nodex/admin/passport')(passport);
var jwt = require('jsonwebtoken');
var config = require('../../config/web-config');
const log = require('../../log/errorLogService');

//const Sections = require('../../system/nodex/admin/models/sections');

const multer = require('multer');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads/');
  },
  filename: function (req, file, callback) {
    var filename = file.originalname.replace(/[\[\]']/g, '');
    callback(null, filename + '-' + Date.now());
  }
});

usersAdminRoutes.route('/getDashboardUsers').get(passport.authenticate('jwt', { session: false }), function (req, res) {
  try {
    var token = usersGetToken(req.headers);
    if (token)
      return getDashboardUsers(req, res);
    else
      return res.json({ success: false, msg: 'Unauthorized' });
  } catch (err) {
    log.logerror(res, err);
  }

});

getDashboardUsers = (req, res) => {
    var token = usersGetToken(req.headers);
    var decode = jwt.verify(token, config.db.secret);
    const User = require('../../system/nodex/models/users');
    
    User.aggregate([{"$match": {$and: [{ "created_user_id":decode.users_id.toString()}]}},{ "$project": { "Email": "$email", "Name": "$name" } }]).limit(5).exec(function (err, result) {
      if (err) {
        return res.json({ success: false, msg: err });
      }
      else {
        return res.json(result);
      }
    });

};


usersAdminRoutes.route('/getUsersCount').get(passport.authenticate('jwt', { session: false }), function (req, res) {
  try {
    var token = usersGetToken(req.headers);
    if (token)
      return getUsersCount(req, res);
    else
      return res.json({ success: false, msg: 'Unauthorized' });
  } catch (err) {
    log.logerror(res, err);
  }

});

getUsersCount = (req, res) => {
  var token = usersGetToken(req.headers);
  var decode = jwt.verify(token, config.db.secret);

  const User = require('../../system/nodex/models/users');
  User.count({"created_user_id":decode.users_id.toString()}).exec(function (err, count) {
    if (err) {
      return res.json({ success: false, msg: err });
    }
    else {
      return res.json(count);
    }
  });

};





usersGetToken = (headers) => {


  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};






module.exports = usersAdminRoutes;