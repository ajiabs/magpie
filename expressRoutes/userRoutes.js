
var express = require('express');
var app = express();
var passport = require('passport');
var userRoutes = express.Router();
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');
var config = require('../config/DB');

// Require Item model in our routes module
var User = require('../models/users');



// Defined Login route
userRoutes.route('/checkLogin').post(function (req, res) {
 User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token,result:user});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });

 });




getToken = (headers) => {


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




module.exports = userRoutes;