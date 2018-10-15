
var express = require('express');
var app = express();
var passport = require('passport');
var sectionAdminRoutes = express.Router();
var http = require("http");
require('./passport')(passport);
var jwt = require('jsonwebtoken');
var config = require('../../../config/DB');

const Sections = require('../models/sections');
const User = require('../models/users');
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



// Defined Login route
sectionAdminRoutes.route('/checkLogin').post(function (req, res) {
 User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
     return  res.json({success: false,  msg: 'Authentication failed. Wrong password.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), config.secret);
          // return the information including token as JSON
         return  res.json({success: true, token: 'JWT ' + token,result:user});
        } else {
         return  res.json({success: false,  msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });

 });

 sectionAdminRoutes.route('/getConfig').get(passport.authenticate('jwt', { session: false}),function (req, res) {

  var token = sectionGetToken(req.headers);
  var decode = jwt.verify(token, config.secret);
 // console.log(decode.users_id);
  if (token) 
      return sectionGetConfig(req,res);
  else 
      return  res.json({success: false,  msg: 'Unauthorized'});
   

});

 sectionAdminRoutes.route('/getAllMenus').get(passport.authenticate('jwt', { session: false}),function (req, res) {
  var token = sectionGetToken(req.headers);
  if (token) 
      return sectionGetAllMenus(req,res);
  else 
     return  res.json({success: false,  msg: 'Unauthorized'});

});

sectionAdminRoutes.route('/getRolePermissionMenus').post(passport.authenticate('jwt', { session: false}),function (req, res) {
  var token = sectionGetToken(req.headers);
  if (token) 
      return sectionGetRolePermissionMenus(req,res);
  else 
      return res.status(403).send({success: false, msg: 'Unauthorized.'});

});



sectionAdminRoutes.route('/getCurrentRolePermissionMenus/:id').get(passport.authenticate('jwt', { session: false}),function (req, res) {
  var token = sectionGetToken(req.headers);
  if (token) 
      return getCurrentRolePermissionMenus(req,res);
  else 
     return  res.json({success: false,  msg: 'Unauthorized'});

});


sectionAdminRoutes.route('/').post(passport.authenticate('jwt', { session: false}),function (req, res) {


  var token = sectionGetToken(req.headers);
   if (token) 
       return sectionGetList(req,res);
   else 
       return  res.json({success: false,  msg: 'Unauthorized'});
 });


 sectionAdminRoutes.route('/search').post(passport.authenticate('jwt', { session: false}),function (req, res) {
  var token = sectionGetToken(req.headers);
  if (token) 
      return sectionSearch(req,res);
  else 
      return  res.json({success: false,  msg: 'Unauthorized'});

});

sectionAdminRoutes.route('/export').post(passport.authenticate('jwt', { session: false}),function (req, res) {
  var token = sectionGetToken(req.headers);
  if (token) 
      return sectionExport(req,res);
  else 
      return  res.json({success: false,  msg: 'Unauthorized'});

});






sectionAdminRoutes.route('/add').post(passport.authenticate('jwt', { session: false}),function (req, res) {
   
  var token = sectionGetToken(req.headers);
  if (token) 
     {
          var upload = multer({ storage : storage}).any();
          upload(req,res,function(err) {
              if(err) 
                  return  res.json({success: false,  msg: 'Error uploading file..'});
              else
                  return sectionAdd(req,res);
           });

     }
  else 
      return  res.json({success: false,  msg: 'Unauthorized'});

});

sectionAdminRoutes.route('/changePassword').post(passport.authenticate('jwt', { session: false}),function (req, res) {
   
  var token = sectionGetToken(req.headers);
  if (token) 
    {
      var Users = require('../models/users');
      var result = jwt.verify(token,config.secret);
      Users.findById( result._id, function(err, users) {
        if (err) return false;
        users.password = req.body.new_password;
        users.save().then(item => {
          res.status(200).json('password changed successfully');
          })
          .catch(err => {
           return  res.json({success: false,  msg: err});
           
          });
      });


    }
  else 
      return  res.json({success: false,  msg: 'Unauthorized'});

});


sectionAdminRoutes.route('/checkEmailExist/:email/:users_id').get(passport.authenticate('jwt', { session: false}),function (req, res) {
   
  var token = sectionGetToken(req.headers);
  if (token) 
    {
      var Users = require('../models/users');
      if(req.params.users_id != 0)
        var where = {email:req.params.email,users_id:{ $ne: req.params.users_id }};
      else
      var where = {email:req.params.email};
      Users.find(where, function (err, result){
        if(err) 
          return res.status(403).send({success: false, msg: err});
        else
          return res.json(result);
      });
     

    }
  else 
      return  res.json({success: false,  msg: 'Unauthorized'});

});








sectionAdminRoutes.route('/edit/:id').get(passport.authenticate('jwt', { session: false}),function (req, res) {

  var token = sectionGetToken(req.headers);
  if (token) 
       return sectionFetchDataById(req,res);
  else 
       return  res.json({success: false,  msg: 'Unauthorized'});
 
 
 });

 sectionAdminRoutes.route('/profile-edit/:users_id').get(passport.authenticate('jwt', { session: false}),function (req, res) {

  var token = sectionGetToken(req.headers);
  if (token) 
       return profileFetchDataById(req,res);
  else 
       return  res.json({success: false,  msg: 'Unauthorized'});
 
 
 });



 sectionAdminRoutes.route('/getUserRole/:roles_id').get(passport.authenticate('jwt', { session: false}),function (req, res) {

  var token = sectionGetToken(req.headers);
  if (token) 
       return getUserRoleById(req,res);
  else 
       return  res.json({success: false,  msg: 'Unauthorized'});
 
 
 });


 sectionAdminRoutes.route('/view/:id').get(passport.authenticate('jwt', { session: false}),function (req, res) {

  var token = sectionGetToken(req.headers);
  if (token) 
       return sectionFetchDataById(req,res);
  else 
       return  res.json({success: false,  msg: 'Unauthorized'});
 
 
 });

 sectionAdminRoutes.route('/getImage/:id').get(passport.authenticate('jwt', { session: false}),function (req, res) {
  var token = sectionGetToken(req.headers);
 if (token) {
      var Files = require('../models/files');
      var id = req.params.id;
      Files.find({files_id:id}, function (err, result){
            if(err) 
              return res.status(403).send({success: false, msg: err});
            else
              return res.json(result);

      });
    }
 else 
   return  res.json({success: false,  msg: 'Unauthorized'});



});



sectionAdminRoutes.route('/update/:id').post(passport.authenticate('jwt', { session: false}),function (req, res) {
  var token = sectionGetToken(req.headers);
  if (token) 
     {

          var upload = multer({ storage : storage}).any();
          upload(req,res,function(err) {
              if(err) 
                  return res.status(403).send({success: false, msg: 'Error uploading file..'});
              else
                  return sectionUpdate(req,res);
           });

     }
  else 
      return  res.json({success: false,  msg: 'Unauthorized'});


  
});


sectionAdminRoutes.route('/delete/:id').get(passport.authenticate('jwt', { session: false}),function (req, res) {
  var token = sectionGetToken(req.headers);
  if (token) 
     return sectionDeleteRow(req,res);
  else 
     return  res.json({success: false,  msg: 'Unauthorized'});

});


sectionAdminRoutes.route('/changeStatus/:id').post(passport.authenticate('jwt', { session: false}),function (req, res) {
  var token = sectionGetToken(req.headers);
  if (token) 
     return sectionChangeStatus(req,res);
  else 
     return  res.json({success: false,  msg: 'Unauthorized'});


  
});



sectionAdminRoutes.route('/deleteFile/:id').post(passport.authenticate('jwt', { session: false}),function (req, res) {
  var token = sectionGetToken(req.headers);
  if (token) 
     return sectionDeleteFile(req,res);
  else 
    return res.status(403).send({success: false, msg: 'Unauthorized.'});

});

sectionAdminRoutes.route('/getSettings').get(function (req, res) {
  var token = sectionGetToken(req.headers);
  if (token) 
     return getSettings(req,res);
  else 
    return res.status(403).send({success: false, msg: 'Unauthorized.'});

});

sectionAdminRoutes.route('/getThemeColorSettings').post(function (req, res) {
   req.body.slug = "admin_theme_color";
   return getRowSettings(req,res);


});
sectionAdminRoutes.route('/getWebsiteNameSettings').post(function (req, res) {
  req.body.slug = "site_name";
  return getRowSettings(req,res);


});




sectionAdminRoutes.route('/getRowSettings').post(function (req, res) {
  var token = sectionGetToken(req.headers);
  if (token) 
     return getRowSettings(req,res);
  else 
    return res.status(403).send({success: false, msg: 'Unauthorized.'});

});

sectionAdminRoutes.route('/updateSettings').post(passport.authenticate('jwt', { session: false}),function (req, res) {


  var token = sectionGetToken(req.headers);
  if (token) 
     {
          var upload = multer({ storage : storage}).any();
          upload(req,res,function(err) {
              if(err) 
                  return res.status(403).send({success: false, msg: 'Error uploading file..'});
              else
                  return sectionUpdateSettings(req,res);
           });

     }
  else 
      return  res.json({success: false,  msg: 'Unauthorized'});


  
});



sectionAdminRoutes.route('/getPackagesInstaller').post(passport.authenticate('jwt', { session: false}),function (req, res) {
  var token = sectionGetToken(req.headers);
  if (token) 
      {

    
        http.get('http://52.91.195.127/packages/package.php?action=get_all', (response) => {
        
          let result = '';

          response.on('data', (chunk) => {
            result += chunk;
          });
        
          response.on('end', () => {
            return  res.json(JSON.parse(result).data);
  
          });
        

         });
      


      }
  else 
      return  res.json({success: false,  msg: 'Unauthorized'});

});



sectionAdminRoutes.route('/searchPackagesInstaller').post(passport.authenticate('jwt', { session: false}),function (req, res) {
  var token = sectionGetToken(req.headers);
  if (token) {
      http.get('http://52.91.195.127/packages/package.php?action=search&package_name='+req.body.search_key, (response) => {
            
        let result = '';

        response.on('data', (chunk) => {
          result += chunk;
        });
      
        response.on('end', () => {
          return  res.json(JSON.parse(result).data);

        });
      

      });



    }
  else 
  return  res.json({success: false,  msg: 'Unauthorized'});

});

sectionAdminRoutes.route('/getOnePackagesInstaller').post(passport.authenticate('jwt', { session: false}),function (req, res) {
  var token = sectionGetToken(req.headers);
  if (token) 
      {
        http.get('http://52.91.195.127/packages/package.php?action=get_one&package_name='+req.body.package_name, (response) => {
            
          let result = '';
  
          response.on('data', (chunk) => {
            result += chunk;
          });
        
          response.on('end', () => {
            return  res.json(JSON.parse(result).data);
  
          });
        
  
        });
      }
  else 
      return  res.json({success: false,  msg: 'Unauthorized'});

});
  sectionAdminRoutes.route('/installedPackages').post(passport.authenticate('jwt', { session: false}),function (req, res) {
    var token = sectionGetToken(req.headers);
    if (token) 
    {

      var PackageInstaller = require('../models/package-installer');
      PackageInstaller.findOne({},function (err, result){
        if(err){
          return  res.json({success: false,  msg: err});
        }
        else {
          return res.json(result);
        }
      });

    
    }
    else 
        return  res.json({success: false,  msg: 'Unauthorized'});
  
  });

sectionAdminRoutes.route('/installPackage').post(passport.authenticate('jwt', { session: false}),function (req, res) {
  var token = sectionGetToken(req.headers);
  if (token) 
      {

        var npm = require('npm');
        npm.load(function(err) {
          // handle errors

          // install module ffi
          npm.commands.install([req.body.command_line_code], (er, data)=> {
            return  res.json({success:true,msg:"successfully installed"});
            // log errors or data
          });

          // npm.on('log', function(message) {
          //   // log installation progress
          //   console.log(message);
          // });
        });

        setTimeout(function(){

           
            var i = 0;
            var conf = {}; 
            var data_conf = JSON.parse(req.body['configuration_keys']);

            
            Object.values(data_conf).forEach(v=>{
                conf[String(v)] = "";

                if(parseInt(i)+parseInt(1) ==  Object.keys(data_conf).length)
                {

                  var PackageInstaller = require('../models/package-installer');
                  var package_installer = new PackageInstaller({"package_name":req.body.package_name,"package_config":JSON.stringify(conf)});
                  package_installer.save().then(item => {
                    return  res.status(200).json({success:true,msg:"successfully installed"});
                    })
                    .catch(err => {
                    return  res.json({success: false,  msg: err});
                    
                    });
                  
                }
                i++;


            });


        },10000)


    
       
      }
  else 
      return  res.json({success: false,  msg: 'Unauthorized'});

});

  sectionAdminRoutes.route('/updatePackageConfiguration').post(passport.authenticate('jwt', { session: false}),function (req, res) {
        var token = sectionGetToken(req.headers);
        var result={};
        if (token) 
        {
        var PackageInstaller = require('../models/package-installer');
        result = req.body;
        PackageInstaller.findOneAndUpdate({'_id':req.body._id},result).exec(function(err, updated) {
        if(err) 
           return res.json({success: false, msg: err});
        else
           return res.status(200).json('Updated successfully');
        });
        }
        else 
           return res.json({success: false, msg: 'Unauthorized'});
    
    });
    
    sectionAdminRoutes.route('/getPackageData').post(passport.authenticate('jwt', { session: false}),function (req, res) {
        var token = sectionGetToken(req.headers);
        if (token) 
            return sectiongetPackageData(req,res);
        else 
            return res.json({success: false, msg: 'Unauthorized'});
        
        });
        sectiongetPackageData= (req,res) => {
        var Section = require('../models/package-installer');
        Section.findOne({'package_name':req.body.package_name},function (err, result){
        if(err){
            return res.json({success: false, msg: err});
        }
        else {
            return res.json(result);
        }
        });
    };
    sectionAdminRoutes.route('/updatePackageConfiguration').post(passport.authenticate('jwt', { session: false}),function (req, res) {
    var token = sectionGetToken(req.headers);
    var result={};
    if (token) 
    {
    var PackageInstaller = require('../models/package-installer');
    result = req.body;
    PackageInstaller.findOneAndUpdate({'_id':req.body._id},result).exec(function(err, updated) {
    if(err) 
    return res.json({success: false, msg: err});
    else
    return res.status(200).json('Updated successfully');
    });
    }
    else 
    return res.json({success: false, msg: 'Unauthorized'});
  
  });





 
 sectionAdminRoutes.route('/getMenuNameFromUrl').post(passport.authenticate('jwt', { session: false}),function (req, res) {
  var token = sectionGetToken(req.headers);
  if (token) 
      return sectiongetMenuNameFromUrl(req,res);
  else 
     return  res.json({success: false,  msg: 'Unauthorized'});
 
 });




 sectiongetMenuNameFromUrl= (req,res) =>  {
 
  var Section = require('../models/'+req.originalUrl.split('/')[2]);
  Section.findOne({'url':req.body.url,'status':'active'},function (err, result){
    if(err){
      return  res.json({success: false,  msg: err});
    }
    else {
      return res.json(result);
    }
  });
 
 };




getSettings=(req,res)=>{

  var Settings = require('../models/'+req.originalUrl.split('/')[2]);
  var token = getToken(req.headers);
  Settings.find({},function (err, result){
    if(err){
      return  res.json({success: false,  msg: err});
    }
    else {
      return res.json(result);
    }
  });
};


getRowSettings=(req,res)=>{

  var Settings = require('../models/'+req.originalUrl.split('/')[2]);
  var token = getToken(req.headers);
  Settings.find({'slug':req.body.slug},function (err, result){
    if(err){
      return  res.json({success: false,  msg: err});
    }
    else {
      return res.json(result);
    }
  });
};
 
 

sectionGetAllMenus = (req,res) =>  {
  var Section = require('../models/'+req.originalUrl.split('/')[2]);
  Section.find({'status':'active'},function (err, result){
    if(err){
      return  res.json({success: false,  msg: err});
    }
    else {
      return res.json(result);
    }
  });

};

getCurrentRolePermissionMenus = (req,res) => {

  var Section = require('../models/'+req.originalUrl.split('/')[2]);
  Section.find({'roles_id':req.params.id},function (err, result){
    if(err){
      return  res.json({success: false,  msg: err});
    }
    else {
      return res.json(result);
    }
  });

}


sectionGetRolePermissionMenus = (req,res) =>  {
   
  var where = {'parent_id':{$ne: 0}};
  if(req.body.role_id != "1")
    where = {'parent_id':{$ne: 0},"menus_id":{$nin: [3,5]}};

    var Section = require('../models/'+req.originalUrl.split('/')[2]);
    Section.find(where,function (err, result){
      if(err){
        return  res.json({success: false,  msg: err});
      }
      else {
        return res.json(result);
      }
    });

};

sectionGetConfig = (req,res) =>  {

  Sections.find({'section_alias':req.originalUrl.split('/')[2]},function (err, result){
     if(err){
      return  res.json({success: false,  msg: err});
     }
     else {
       return res.json(result);
     }
   });

};



sectionGetList = (req,res) =>  {

  var current_section = req.originalUrl.split('/')[2];
  var where = {};

  if((current_section == 'users' || current_section == 'roles') && req.body.role_id != "1")
  {
    if(current_section == 'users')
     where = {"roles_id":{$ne: "1"}};
    if(current_section == 'roles')
     where = {"roles_id":{$ne: 1}};
  }


  if(req.originalUrl.split('/')[2] == 'users' || req.originalUrl.split('/')[2] == 'roles' || req.originalUrl.split('/')[2] == 'sections' ||  req.originalUrl.split('/')[2] == 'menus')
    var Section = require('../models/'+req.originalUrl.split('/')[2]);
  else
    var Section = require('../../../nodex/models/'+req.originalUrl.split('/')[2]);

  var orderField =  req.body.sort_orderBy;
  var sortBy = req.body.sort_order;
  var order = {};
  order[orderField] = sortBy;
 
  Section.find(where)
      .collation({ locale: 'en', strength: 2 })
      .limit(req.body.per_page)
      .skip((req.body.per_page * req.body.current_page) - req.body.per_page)
      .sort(order)
      .exec(function(err, result) {
         if(err) 
            return  res.json({success: false,  msg: err});
         else
           return sectionSetPagination(req,res,result);
      });

};

sectionSetPagination = (req,res,result) =>  {

    var current_section = req.originalUrl.split('/')[2];
    var where = {};
    if((current_section == 'users' || current_section == 'roles') && req.body.role_id != "1")
    {
    if(current_section == 'users')
    where = {"roles_id":{$ne: "1"}};
    if(current_section == 'roles')
    where = {"roles_id":{$ne: 1}};
    }

    if(req.originalUrl.split('/')[2] == 'users' || req.originalUrl.split('/')[2] == 'roles' || req.originalUrl.split('/')[2] == 'sections' ||  req.originalUrl.split('/')[2] == 'menus')
    var Section = require('../models/'+req.originalUrl.split('/')[2]);
    else
    var Section = require('../../../nodex/models/'+req.originalUrl.split('/')[2]);


    Section.count(where).exec(function(err, count) {
        if(err)   return  res.json({success: false,  msg: err});
        else {

          
            var pg   = Math.ceil(count / req.body.per_page);
            var tot  = count;
            var to   = ((req.body.per_page * req.body.current_page) - req.body.per_page) +Object.keys(result).length;
            var from = (req.body.per_page * req.body.current_page) - req.body.per_page+1;
            return res.json({'data':result,'current':req.body.current_page,'pages':pg,'tot':tot,'to':to,'from':from});
          }
    })
};



sectionExport  = (req,res) =>{

  if(req.originalUrl.split('/')[2] == 'users' || req.originalUrl.split('/')[2] == 'roles' || req.originalUrl.split('/')[2] == 'sections' ||  req.originalUrl.split('/')[2] == 'menus')
  var Section = require('../models/'+req.originalUrl.split('/')[2]);
  else
  var Section = require('../../../nodex/models/'+req.originalUrl.split('/')[2]);

  var token = sectionGetToken(req.headers);
  var searchable = [];
  var sort = req.body.sort_order == 'asc'?1:-1;
  var sortBy = req.body.sort_orderBy;
  var sortable = {};

  var relation = [];
  var relation_columns = [];
  var columns = [];


  var current_section = req.originalUrl.split('/')[2];
  var where = {};
  var fields = {};
  fields['_id'] = 0;
  req.body.columns.forEach(col=>{
    columns.push(col.label);
      fields[col.field]  = 1;
   

  });
  if((current_section == 'users' || current_section == 'roles') && req.body.role_id != "1")
  {
  
    if(current_section == 'users')
     where = {"roles_id":{$ne: "1"}};
    if(current_section == 'roles')
     where = {"roles_id":{$ne: 1}};
  }

  /*if(JSON.parse(req.body.relation).length >0){

      JSON.parse(req.body.relation).forEach(function(element) {
         var relation_rules = {};
         relation_rules["$lookup"] = element.$lookup;
         relation.push(relation_rules);
         relation_columns.push(element.$lookup.localField);
         if( JSON.parse(req.body.searchable).indexOf(element.$lookup.localField) !== -1){
           var searchable_rules = {};
           searchable_rules[element.searchForeignField] = { '$regex' : req.body.search, '$options' : 'i' };
           searchable.push(searchable_rules);
         }
         if(element.$lookup.localField == sortBy){
            sortable[element.searchForeignField] =sort;
         }
      });
    }*/
  if(JSON.parse(req.body.searchable).length >0){
    JSON.parse(req.body.searchable).forEach(function(element) {
     if(relation_columns.length ==0 || relation_columns.indexOf(element) == -1){
        var searchable_rules = {};
        searchable_rules[element] = { '$regex' : req.body.search, '$options' : 'i' };
        searchable.push(searchable_rules);
      }
    
     });
  }
  if(searchable.length==0){
       var searchable_rules = {};
       searchable.push(searchable_rules);
  }

  if(Object.keys(sortable).length==0){
     sortable[sortBy] =sort;
  }

  sortable[sortBy] =sort;
  var column_config = [];
  var column_total_config = [];
  if(relation.length>0){
    column_config.push(relation[0]);
  }
 column_config.push({ "$sort":  sortable});

 if(searchable.length>0){
  column_config.push( 
            { "$match": { 
               $and: [  
                   {
                       $or:searchable 
                   },where]
               }
             },
             { "$project" : fields });

}





Section.aggregate(column_config).collation({ locale: 'en', strength: 2 }).exec(function(err, result){
      
        if(err) 
            return  res.json({success: false,  msg: err});
        else
            return  res.json({success: true, data:result ,columns:columns,msg: err});
  });


}


sectionDeleteRow = (req,res) => {
  if(req.originalUrl.split('/')[2] == 'users' || req.originalUrl.split('/')[2] == 'roles' || req.originalUrl.split('/')[2] == 'sections' ||  req.originalUrl.split('/')[2] == 'menus')
  var Section = require('../models/'+req.originalUrl.split('/')[2]);
  else
  var Section = require('../../../nodex/models/'+req.originalUrl.split('/')[2]);

  Section.findByIdAndRemove({_id: req.params.id}, function(err, result){
       if(err) 
         return res.status(403).send({success: false, msg: err});
       else
         return  res.json('Successfully removed');
   });

};

sectionSearch = (req,res) =>{


  if(req.originalUrl.split('/')[2] == 'users' || req.originalUrl.split('/')[2] == 'roles' || req.originalUrl.split('/')[2] == 'sections' ||  req.originalUrl.split('/')[2] == 'menus')
  var Section = require('../models/'+req.originalUrl.split('/')[2]);
  else
  var Section = require('../../../nodex/models/'+req.originalUrl.split('/')[2]);

  var token = sectionGetToken(req.headers);
  var searchable = [];
  var sort = req.body.sort_order == 'asc'?1:-1;
  var sortBy = req.body.sort_orderBy;
  var sortable = {};

  var relation = [];
  var relation_columns = [];


  var current_section = req.originalUrl.split('/')[2];
  var where = {};
  if((current_section == 'users' || current_section == 'roles') && req.body.role_id != "1")
  {
  
    if(current_section == 'users')
     where = {"roles_id":{$ne: "1"}};
    if(current_section == 'roles')
     where = {"roles_id":{$ne: 1}};
  }

  /*if(JSON.parse(req.body.relation).length >0){

      JSON.parse(req.body.relation).forEach(function(element) {
         var relation_rules = {};
         relation_rules["$lookup"] = element.$lookup;
         relation.push(relation_rules);
         relation_columns.push(element.$lookup.localField);
         if( JSON.parse(req.body.searchable).indexOf(element.$lookup.localField) !== -1){
           var searchable_rules = {};
           searchable_rules[element.searchForeignField] = { '$regex' : req.body.search, '$options' : 'i' };
           searchable.push(searchable_rules);
         }
         if(element.$lookup.localField == sortBy){
            sortable[element.searchForeignField] =sort;
         }
      });
    }*/
  if(JSON.parse(req.body.searchable).length >0){
    JSON.parse(req.body.searchable).forEach(function(element) {
     if(relation_columns.length ==0 || relation_columns.indexOf(element) == -1){
        var searchable_rules = {};
        searchable_rules[element] = { '$regex' : req.body.search, '$options' : 'i' };
        searchable.push(searchable_rules);
      }
    
     });
  }
  if(searchable.length==0){
       var searchable_rules = {};
       searchable.push(searchable_rules);
  }

  if(Object.keys(sortable).length==0){
     sortable[sortBy] =sort;
  }

  sortable[sortBy] =sort;
  var column_config = [];
  var column_total_config = [];
  if(relation.length>0){
    column_config.push(relation[0]);
    column_total_config.push(relation[0]);
  }
 column_config.push({ "$sort":  sortable});
 column_total_config.push({ "$sort":  sortable});
 if(searchable.length>0){
  column_config.push( 
            { "$match": { 
               $and: [  
                   {
                       $or:searchable 
                   },where]
               }
             });
  column_total_config.push( 
            { "$match": { 
               $and: [  
                   {
                       $or:searchable 
                   },where]
               }
             });
}


column_config.push( { "$skip" :(req.body.per_page * req.body.current_page) - req.body.per_page });
column_config.push( { "$limit" : req.body.per_page });
Section.aggregate(column_config).collation({ locale: 'en', strength: 2 }).exec(function(err, result){
      
        if(err) 
            return  res.json({success: false,  msg: err});
        else
          return sectionSearchPagination(req,res,column_config,column_total_config,result);
  });

};


sectionSearchPagination =  (req,res,column_config,column_total_config,result) =>{

  if(req.originalUrl.split('/')[2] == 'users' || req.originalUrl.split('/')[2] == 'roles' || req.originalUrl.split('/')[2] == 'sections' ||  req.originalUrl.split('/')[2] == 'menus')
  var Section = require('../models/'+req.originalUrl.split('/')[2]);
  else
  var Section = require('../../../nodex/models/'+req.originalUrl.split('/')[2]);
  
    Section.aggregate(column_total_config).collation({ locale: 'en', strength: 2 }).exec(function(err, result_total) {
        if(err) 
          return res.status(403).send({success: false, msg: err});
        else{

            var pg   = Math.ceil(Object.keys(result_total).length / req.body.per_page);
            var tot  = Object.keys(result_total).length;
            var to   = ((req.body.per_page * req.body.current_page) - req.body.per_page) +Object.keys(result).length;
            var from = (req.body.per_page * req.body.current_page) - req.body.per_page+1;
            return res.json({'data':result,'current':req.body.current_page,'pages':pg,'tot':tot,'to':to,'from':from});
        }
    })


};




sectionAdd = (req,res) =>{
  var total_files =  Object.keys(req.files).length;
  var i =1;
  var file_column_array =[];
  if(Object.keys(req.files).length>0){
      Object.keys(req.files).forEach(k => {
          var FilesModel = require('../models/files');
          FilesModel.create({files_name: req.files[k]['filename'], files_path: req.files[k]['path'], mime_type: req.files[k]['mimetype'],module:req.originalUrl.split('/')[2]},function (err1, req1, res1) {
       
             if((file_column_array[req.files[k]['fieldname']] === undefined )){
                 file_column_array[req.files[k]['fieldname']] = [];
               } if((file_column_array[req.files[k]['fieldname']] !== undefined )){
                   file_column_array[req.files[k]['fieldname']].push(req1.files_id.toString());
             }
            
             if(i == total_files){
             
               
               
                     var result = {};
                     Object.keys(req.body).forEach(l=>{
                      if(l != 'file_fields')
                        result[l] = req.body[l];
                     
                     });
                        for(var m of req.body['file_fields'].split(',')) {

                        
                          if(file_column_array[m] !== undefined){

                          
                            result[m] = JSON.stringify({'selected_values':file_column_array[m]});
                           }
                          else
                            result[m] = "";
                         }
                         return insertData(req,res,result); 

                
             }
             i++;
          
          });
      });

  }else{

   return insertData(req,res,req.body); 
  }

};

insertData = (req,res,result) =>{

  if(req.originalUrl.split('/')[2] == 'users' || req.originalUrl.split('/')[2] == 'roles' || req.originalUrl.split('/')[2] == 'sections' ||  req.originalUrl.split('/')[2] == 'menus')
  var Section = require('../models/'+req.originalUrl.split('/')[2]);
  else
  var Section = require('../../../nodex/models/'+req.originalUrl.split('/')[2]);
   var section = new Section(result);
   section.save().then(item => {
     res.status(200).json('added successfully');
     })
     .catch(err => {
      return  res.json({success: false,  msg: err});
      
     });

};


sectionFetchDataById = (req,res) =>{
  if(req.originalUrl.split('/')[2] == 'users' || req.originalUrl.split('/')[2] == 'roles' || req.originalUrl.split('/')[2] == 'sections' ||  req.originalUrl.split('/')[2] == 'menus')
  var Section = require('../models/'+req.originalUrl.split('/')[2]);
  else
  var Section = require('../../../nodex/models/'+req.originalUrl.split('/')[2]);
  var id = req.params.id;
  Section.findById(id, function (err, result){
     if(err) 
        return  res.json({success: false,  msg: err});
      else
        return res.json(result);
  });
};


getUserRoleById = (req,res) =>{
  var Roles = require('../models/roles');
  var id = req.params.roles_id;
  Roles.findOne({'roles_id':id}, function (err, result){
     if(err) 
        return  res.json({success: false,  msg: err});
      else
        return res.json(result);
  });
};





profileFetchDataById = (req,res)=>{
  var Users = require('../models/users');
  var id = req.params.users_id;
  Users.findOne({'users_id':id}, function (err, result){
     if(err) 
        return  res.json({success: false,  msg: err});
      else
        return res.json(result);
  });

}



sectionUpdate = (req,res) =>{

  var total_files =  Object.keys(req.files).length;
  var i =1;
  var file_column_array =[];
  if(Object.keys(req.files).length>0){

       Object.keys(req.files).forEach(k => {
       var FilesModel = require('../models/files');
        FilesModel.create({ files_name: req.files[k]['filename'],files_path: req.files[k]['path'], mime_type: req.files[k]['mimetype'],module:req.originalUrl.split('/')[2]},function (err1, req1, res1) {
        
           if((file_column_array[req.files[k]['fieldname']] === undefined )){
               file_column_array[req.files[k]['fieldname']] = [];
             } if((file_column_array[req.files[k]['fieldname']] !== undefined )){
                 file_column_array[req.files[k]['fieldname']].push(req1.files_id.toString());
           }
          
           if(i == total_files){
           
                  if(req.originalUrl.split('/')[2] == 'users' || req.originalUrl.split('/')[2] == 'roles' || req.originalUrl.split('/')[2] == 'sections' ||  req.originalUrl.split('/')[2] == 'menus')
                  var Section = require('../models/'+req.originalUrl.split('/')[2]);
                  else
                  var Section = require('../../../nodex/models/'+req.originalUrl.split('/')[2]);
             
                   var result = {};
                   Object.keys(req.body).forEach(l=>{
                    if(l != 'file_fields')
                      result[l] = req.body[l];
                   
                   });

                    Section.findById(req.params.id, function(err, rows) {
                      var SectionModel = require('../models/sections');
                      SectionModel.find({'section_alias':req.originalUrl.split('/')[2]},function (err, section_rows){
                     
                      

                   
                        for(var m of req.body['file_fields'].split(',')) {

                          var item = JSON.parse(section_rows[0].section_config).column;
                          var field_config = item.filter(function (item) {
                            return item['field'] == m;
                          });
                          if( rows[m] != ''){
                              if(file_column_array[m] !== undefined){
                                 var obj = JSON.parse(rows[m]);
                                 var column_val = Object.keys(obj).map(function(k) { return obj[k] })[0];
                                 var new_column_val = column_val.concat(file_column_array[m]);
                                 if( field_config[0].multiple == 'true')
                                  result[m] = JSON.stringify({'selected_values':new_column_val});
                                 else
                                  result[m] =  JSON.stringify({'selected_values':file_column_array[m]});

                              }
                           }else{

                             if(file_column_array[m] !== undefined)
                              result[m] =  JSON.stringify({'selected_values':file_column_array[m]});
                                   
                            }

                             
                        }
                       return sectionUpdateData(req,res,result);



                      });

                  });

              
           }
           i++;
        
        });

     });

  }else{

    if(req.originalUrl.split('/')[2] == 'users' || req.originalUrl.split('/')[2] == 'roles' || req.originalUrl.split('/')[2] == 'sections' ||  req.originalUrl.split('/')[2] == 'menus')
      var Section = require('../models/'+req.originalUrl.split('/')[2]);
    else
      var Section = require('../../../nodex/models/'+req.originalUrl.split('/')[2]);
      Section.findById(req.params.id, function(err, result) {
           if (!result)
             return next(new Error('Could not load Document'));
           else {

           for (var p in req.body) {

                if(req.body.file_fields.indexOf(p) == -1)
                 result[p] = req.body[p];
           }
          
             return sectionUpdateData(req,res,result);
           }
         });

  }
  



};

sectionChangeStatus =(req,res)=>{


  if(req.originalUrl.split('/')[2] == 'users' || req.originalUrl.split('/')[2] == 'roles' || req.originalUrl.split('/')[2] == 'sections' ||  req.originalUrl.split('/')[2] == 'menus')
    var Section = require('../models/'+req.originalUrl.split('/')[2]);
  else
    var Section = require('../../../nodex/models/'+req.originalUrl.split('/')[2]);
   var column  = req.body.field;
   var obj = {};
   obj[column] = req.body.status;
  Section.findOneAndUpdate({'_id':req.params.id},obj).exec(function(err, updated) {
      if(err) 
          return  res.json({success: false,  msg: err});
      else
          return res.status(200).json('Updated successfully');

  });

}


sectionUpdateData = (req,res,result) => {

  if(req.originalUrl.split('/')[2] == 'users' || req.originalUrl.split('/')[2] == 'roles' || req.originalUrl.split('/')[2] == 'sections' ||  req.originalUrl.split('/')[2] == 'menus')
    var Section = require('../models/'+req.originalUrl.split('/')[2]);
  else
    var Section = require('../../../nodex/models/'+req.originalUrl.split('/')[2]);
  Section.findOneAndUpdate({'_id':req.params.id},result).exec(function(err, updated) {
      if(err) 
          return  res.json({success: false,  msg: err});
      else
          return res.status(200).json('Updated successfully');

  });



};


sectionDeleteFile = (req,res) =>{
  if(req.originalUrl.split('/')[2] == 'users' || req.originalUrl.split('/')[2] == 'roles' || req.originalUrl.split('/')[2] == 'sections' ||  req.originalUrl.split('/')[2] == 'menus')
   var Section = require('../models/'+req.originalUrl.split('/')[2]);
  else
    var Section = require('../../../nodex/models/'+req.originalUrl.split('/')[2]);
  Section.findById(req.params.id, function (err, result){
     if(err) 
         return res.status(403).send({success: false, msg: err});
      else{
         var updated_column = req.body.column;
         var obj = JSON.parse(result[updated_column]);
         var column_val = Object.keys(obj).map(function(k) { return obj[k] })[0];

         const index = column_val.indexOf(req.body.file_id);
         column_val.splice(index, 1);
          var data = {};
         if(column_val.length>0)
           data[updated_column] =JSON.stringify({'selected_values':column_val});
         else
           data[updated_column] = "";

         Section.findOneAndUpdate({'_id':req.params.id},{ "$set": data}).exec(function(err, updated) {
             if(err) 
                 return res.status(403).send({success: false, msg: err});
            

         });


         return res.status(200).json('Updated successfully');


      }
         
  });

}



sectionUpdateSettings= (req,res) =>{
  var Settings = require('../models/'+req.originalUrl.split('/')[2]);
  var total_files =  Object.keys(req.files).length;
  var i =1;
  var file_column_array =[];
  if(Object.keys(req.files).length>0){
    Object.keys(req.files).forEach(k => {
      var FilesModel = require('../models/files');
      FilesModel.create({ files_name: req.files[k]['filename'],files_path: req.files[k]['path'], mime_type: req.files[k]['mimetype'],module:req.originalUrl.split('/')[2]},function (err1, req1, res1) {
      
         if((file_column_array[req.files[k]['fieldname']] === undefined )){
             file_column_array[req.files[k]['fieldname']] = [];
           } if((file_column_array[req.files[k]['fieldname']] !== undefined )){
               file_column_array[req.files[k]['fieldname']].push(req1.files_id.toString());
         }
         if(i == total_files){
         
          var result = {};
          Object.keys(req.body).forEach(l=>{
           if(l != 'file_fields')
             result[l] = req.body[l];
          
          });
          for(var m of req.body['file_fields'].split(',')) {
            if(file_column_array[m] !== undefined){
              result[m] =  JSON.stringify({'selected_values':file_column_array[m]});
            }
          }
          return sectionUpdateSettingsData(req,res,result);
         }
         i++;
        });
    });
  }else{
    var token = getToken(req.headers);
    var userDetails = jwt.verify(token,config.secret);
    user_id = userDetails.users_id;
    Settings.find({user_id:user_id},function (err, result){
      if (!result)
        return next(new Error('Could not load Document'));
      else {
     
      for (var p in req.body) {

           if(req.body.file_fields.indexOf(p) == -1)
            result[p] = req.body[p];
      }
       //console.log(result);
        return sectionUpdateSettingsData(req,res,result);
      }
    });
  }

  
}
sectionUpdateSettingsData = (req,res,result) => {

  
  var Settings = require('../models/'+req.originalUrl.split('/')[2]);

  var token = getToken(req.headers);
  var userDetails = jwt.verify(token,config.secret);
  user_id = userDetails.users_id;
  
  var settingLengthArr = result.length;
  var l =1;
  console.log(settingLengthArr);
  settingsFlag = 0;
  Object.keys(result).forEach(index=>{

    Settings.update({ slug: index },{ $set: { "value": result[index] } }).exec(function(err, updated){
     
    });
    if(l==settingLengthArr){
      settingsFlag =1;
      console.log(settingsFlag);
      //return settingsFlag;
    }
  
    l++;

    
  });
  return res.status(200).json('Updated successfully');
};




sectionGetToken = (headers) => {
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




module.exports = sectionAdminRoutes;