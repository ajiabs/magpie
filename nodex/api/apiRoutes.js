
var express = require('express');
var app = express();
var passport = require('passport');
var apiAdminRoutes = express.Router();
require('../../system/nodex/admin/passport')(passport);
var jwt = require('jsonwebtoken');
var config = require('../../config/DB');

//const Sections = require('../../system/nodex/admin/models/sections');
const User = require('../../system/nodex/models/users');
const multer  = require('multer');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads/');
  },
  filename: function (req, file, callback) {
    var filename = file.originalname.replace(/[\[\]']/g,'' );
    callback(null, filename + '-' + Date.now());
  }
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




module.exports = apiAdminRoutes;