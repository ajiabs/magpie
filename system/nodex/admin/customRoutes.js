
var express = require('express');
var app = express();
var passport = require('passport');
var customAdminRoutes = express.Router();
require('./passport')(passport);
var jwt = require('jsonwebtoken');
var config = require('../../../config/DB');
const log = require('../../../log/errorLogService');



customAdminRoutes.route('/getMainMenus').post(function (req, res) {
  try {
    var Section = require('../models/menus');
    var token = customGetToken(req.headers);

    if (token) {
      Section.find({ 'parent_id': 0 }, 'name menus_id', function (err, result) {
        if (err) {
          console.log(err);
        }
        else {
          var temp = [];
          temp[0] = { 'label': 'Root', 'value': 0 };
          var i = 1;
          result.forEach(function (rowItem) {

            temp[i] = { 'label': rowItem.name, 'value': rowItem.menus_id };
            i++;

          });
          res.json(temp);
        }
      });
    } else {
      return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
  }
  catch (err) {
    log.logerror(res, err)
  }
});





customAdminRoutes.route('/getRoles').post(function (req, res) {
  try {
    var Section = require('../models/roles');
    var token = customGetToken(req.headers);


    var where = {};
    if (req.body.role_id != "1")
      where = { "roles_id": { $ne: 1 } };


    if (token) {
      Section.find(where, 'name roles_id', function (err, result) {
        if (err) {
          console.log(err);
        }
        else {
          var temp = [];
          var i = 0;
          result.forEach(function (rowItem) {

            temp[i] = { 'label': rowItem.name, 'value': rowItem.roles_id };
            i++;

          });
          res.json(temp);
        }
      });
    } else {
      return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
  }
  catch (err) {
    log.logerror(res, err)
  }
});






customGetToken = (headers) => {


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




module.exports = customAdminRoutes;