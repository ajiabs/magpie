
var express = require('express');
var app = express();
var passport = require('passport');
var customRoutes = express.Router();
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');
var config = require('../config/DB');



customRoutes.route('/getMainMenus').get(function (req, res) {
  var Section = require('../models/menus');
  var token = getToken(req.headers);
 
   if (token) {
        Section.find({'parent_id':0},'name menus_id',function (err, result){
         if(err){
           console.log(err);
         }
         else {
             var temp =[];
             temp[0] = {'label':'Root','value':0};
             var i =1;
             result.forEach(function (rowItem) { 
               
                temp[i] = {'label':rowItem.name,'value':rowItem.menus_id};
                i++;
 
             });
           res.json(temp);
         }
       });
     } else {
     return res.status(403).send({success: false, msg: 'Unauthorized.'});
   }
 
 
     
  });





  customRoutes.route('/getRoles').get(function (req, res) {
    var Section = require('../models/roles');
    var token = getToken(req.headers);
   
     if (token) {
          Section.find({},'name roles_id',function (err, result){
           if(err){
             console.log(err);
           }
           else {
               var temp =[];
               var i =0;
               result.forEach(function (rowItem) { 
                 
                  temp[i] = {'label':rowItem.name,'value':rowItem.roles_id};
                  i++;
   
               });
             res.json(temp);
           }
         });
       } else {
       return res.status(403).send({success: false, msg: 'Unauthorized.'});
     }
   
   
       
    });



customRoutes.route('/getProjects').get(function (req, res) {
 var Section = require('../models/projects');
 var token = getToken(req.headers);

  if (token) {
       Section.find({},'project_name projects_id',function (err, result){
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