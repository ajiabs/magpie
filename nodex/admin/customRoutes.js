
var express = require('express');
var app = express();
var passport = require('passport');
var customRoutes = express.Router();
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


customRoutes.route('/getProjects').post(function (req, res) {
  const Project = require('../../nodex/models/projects');
  var token = getToken(req.headers);
 
   if (token) {
       Project.find({},'project_name projects_id',function (err, result){
         if(err){
           console.log(err);
         }
         else {
             var temp =[];
             var i =0;
             result.forEach(function (rowItem) { 
               
                temp[i] = {'label':rowItem.project_name,'value':rowItem.projects_id};
                i++;
 
             });
           res.json(temp);
         }
       });
     } else {
     return res.status(403).send({success: false, msg: 'Unauthorized.'});
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




module.exports = customRoutes;