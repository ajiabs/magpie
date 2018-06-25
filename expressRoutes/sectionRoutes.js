const express = require('express');
const app = express();
const passport = require('passport');
const sectionRoutes = express.Router();
const jwt = require('jsonwebtoken');
require('../config/passport')(passport);
const config = require('../config/DB');
const Sections = require('../models/sections');
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



sectionRoutes.route('/getRolePermissionMenus').post(passport.authenticate('jwt', { session: false}),function (req, res) {
  var token = getToken(req.headers);
  if (token) 
      return getRolePermissionMenus(req,res);
  else 
      return res.status(403).send({success: false, msg: 'Unauthorized.'});

});


sectionRoutes.route('/getCurrentRolePermissionMenus/:id').get(passport.authenticate('jwt', { session: false}),function (req, res) {
  var token = getToken(req.headers);
  if (token) 
      return getCurrentRolePermissionMenus(req,res);
  else 
      return res.status(403).send({success: false, msg: 'Unauthorized.'});

});





sectionRoutes.route('/getAllMenus').get(passport.authenticate('jwt', { session: false}),function (req, res) {
  var token = getToken(req.headers);
  if (token) 
      return getAllMenus(req,res);
  else 
      return res.status(403).send({success: false, msg: 'Unauthorized.'});

});



sectionRoutes.route('/getConfig').get(passport.authenticate('jwt', { session: false}),function (req, res) {

  var token = getToken(req.headers);
  if (token) 
      return getConfig(req,res);
  else 
      return res.status(403).send({success: false, msg: 'Unauthorized.'});

});



sectionRoutes.route('/').post(passport.authenticate('jwt', { session: false}),function (req, res) {


 var token = getToken(req.headers);
  if (token) 
      return getList(req,res);
  else 
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
});


sectionRoutes.route('/search').post(passport.authenticate('jwt', { session: false}),function (req, res) {
    var token = getToken(req.headers);
    if (token) 
        return search(req,res);
    else 
        return res.status(403).send({success: false, msg: 'Unauthorized.'});

});



sectionRoutes.route('/add').post(passport.authenticate('jwt', { session: false}),function (req, res) {
   
    var token = getToken(req.headers);
    if (token) 
       {
            var upload = multer({ storage : storage}).any();
            upload(req,res,function(err) {
                if(err) 
                    return res.status(403).send({success: false, msg: 'Error uploading file..'});
                else
                    return add(req,res);
             });

       }
    else 
        return res.status(403).send({success: false, msg: 'Unauthorized.'});

});


sectionRoutes.route('/edit/:id').get(passport.authenticate('jwt', { session: false}),function (req, res) {

 var token = getToken(req.headers);
 if (token) 
      return fetchDataById(req,res);
 else 
      return res.status(403).send({success: false, msg: 'Unauthorized.'});


});

sectionRoutes.route('/getImage/:id').get(passport.authenticate('jwt', { session: false}),function (req, res) {
  var token = getToken(req.headers);
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
      return res.status(403).send({success: false, msg: 'Unauthorized.'});



});

//  Defined update route
sectionRoutes.route('/update/:id').post(passport.authenticate('jwt', { session: false}),function (req, res) {
    var token = getToken(req.headers);
    if (token) 
       {
            var upload = multer({ storage : storage}).any();
            upload(req,res,function(err) {
                if(err) 
                    return res.status(403).send({success: false, msg: 'Error uploading file..'});
                else
                    return update(req,res);
             });

       }
    else 
        return res.status(403).send({success: false, msg: 'Unauthorized.'});


    
});

// Defined delete | remove | destroy route
sectionRoutes.route('/delete/:id').get(passport.authenticate('jwt', { session: false}),function (req, res) {
     var token = getToken(req.headers);
     if (token) 
        return deleteRow(req,res);
     else 
       return res.status(403).send({success: false, msg: 'Unauthorized.'});
  
});

sectionRoutes.route('/deleteFile/:id').post(passport.authenticate('jwt', { session: false}),function (req, res) {
     var token = getToken(req.headers);
     if (token) 
        return deleteFile(req,res);
     else 
       return res.status(403).send({success: false, msg: 'Unauthorized.'});
  
});





getToken = function (headers) {


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



getConfig = (req,res) =>  {

     Sections.find({'section_alias':req.originalUrl.split('/')[2]},function (err, result){
        if(err){
          return res.status(403).send({success: false, msg: err});
        }
        else {
          return res.json(result);
        }
      });

};

getRolePermissionMenus = (req,res) =>  {
   
    var where = {'parent_id':{$ne: 0}};
    if(req.body.role_id != "1")
      where = {'parent_id':{$ne: 0},"menus_id":{$nin: [3,5]}};

      var Section = require('../models/'+req.originalUrl.split('/')[2]);
      Section.find(where,function (err, result){
        if(err){
          return res.status(403).send({success: false, msg: err});
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
          return res.status(403).send({success: false, msg: err});
        }
        else {
          return res.json(result);
        }
      });

}


getAllMenus = (req,res) =>  {
  var Section = require('../models/'+req.originalUrl.split('/')[2]);
  Section.find({'status':'active'},function (err, result){
    if(err){
      return res.status(403).send({success: false, msg: err});
    }
    else {
      return res.json(result);
    }
  });

};




getList = (req,res) =>  {

      var current_section = req.originalUrl.split('/')[2];
      var where = {};
  
      if((current_section == 'users' || current_section == 'roles') && req.body.role_id != "1")
      {
        if(current_section == 'users')
         where = {"roles_id":{$ne: "1"}};
        if(current_section == 'roles')
         where = {"roles_id":{$ne: 1}};
      }

   

      var Section = require('../models/'+req.originalUrl.split('/')[2]);
      var orderField =  req.body.sort_orderBy;
      var order = {};
      order[orderField] = 1;
      Section.find(where)
          .collation({ locale: 'en', strength: 2 })
          .limit(req.body.per_page)
          .skip((req.body.per_page * req.body.current_page) - req.body.per_page)
          .sort(order)
          .exec(function(err, result) {
             if(err) 
                return res.status(403).send({success: false, msg: err});
             else
               return setPagination(req,res,result);
          });

};

setPagination = (req,res,result) =>  {

  var current_section = req.originalUrl.split('/')[2];
  var where = {};
  if((current_section == 'users' || current_section == 'roles') && req.body.role_id != "1")
  {
    if(current_section == 'users')
     where = {"roles_id":{$ne: "1"}};
    if(current_section == 'roles')
     where = {"roles_id":{$ne: 1}};
  }
 
    var Section = require('../models/'+req.originalUrl.split('/')[2]);
    Section.count(where).exec(function(err, count) {
        if(err)  return res.status(403).send({success: false, msg: err});
        else {

          
            var pg   = Math.ceil(count / req.body.per_page);
            var tot  = count;
            var to   = ((req.body.per_page * req.body.current_page) - req.body.per_page) +Object.keys(result).length;
            var from = (req.body.per_page * req.body.current_page) - req.body.per_page+1;
            return res.json({'data':result,'current':req.body.current_page,'pages':pg,'tot':tot,'to':to,'from':from});
          }
    })
};

deleteRow = (req,res) => {
       var Section = require('../models/'+req.originalUrl.split('/')[2]);
       Section.findByIdAndRemove({_id: req.params.id}, function(err, result){
            if(err) 
              return res.status(403).send({success: false, msg: err});
            else
              return  res.json('Successfully removed');
        });

};
search = (req,res) =>{


     var Section = require('../models/'+req.originalUrl.split('/')[2]);
     var token = getToken(req.headers);
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
             return res.status(403).send({success: false, msg: err});
           else
             return searchPagination(req,res,column_config,column_total_config,result);
     });

};


searchPagination =  (req,res,column_config,column_total_config,result) =>{

var Section = require('../models/'+req.originalUrl.split('/')[2]);
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

add = (req,res) =>{
   var total_files =  Object.keys(req.files).length;
   var i =1;
   var file_column_array =[];
   if(Object.keys(req.files).length>0){
       Object.keys(req.files).forEach(k => {
           var FilesModel = require('../models/files');
           FilesModel.create({ files_path: req.files[k]['path'], mime_type: req.files[k]['mimetype'],module:req.originalUrl.split('/')[2]},function (err1, req1, res1) {
        
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

    var Section = require('../models/'+req.originalUrl.split('/')[2]);
    var section = new Section(result);
    section.save().then(item => {
      res.status(200).json('added successfully');
      })
      .catch(err => {
        return res.status(403).send({success: false, msg: err});
       
      });
      
    

};

fetchDataById = (req,res) =>{
      var Section = require('../models/'+req.originalUrl.split('/')[2]);
      var id = req.params.id;
      Section.findById(id, function (err, result){
         if(err) 
             return res.status(403).send({success: false, msg: err});
          else
             return res.json(result);
      });
};

update = (req,res) =>{

     var total_files =  Object.keys(req.files).length;
     var i =1;
     var file_column_array =[];
     if(Object.keys(req.files).length>0){

          Object.keys(req.files).forEach(k => {
          var FilesModel = require('../models/files');
           FilesModel.create({ files_path: req.files[k]['path'], mime_type: req.files[k]['mimetype'],module:req.originalUrl.split('/')[2]},function (err1, req1, res1) {
        
              if((file_column_array[req.files[k]['fieldname']] === undefined )){
                  file_column_array[req.files[k]['fieldname']] = [];
                } if((file_column_array[req.files[k]['fieldname']] !== undefined )){
                    file_column_array[req.files[k]['fieldname']].push(req1.files_id.toString());
              }
             
              if(i == total_files){
              
                  var Section = require('../models/'+req.originalUrl.split('/')[2]);
                
                      var result = {};
                      Object.keys(req.body).forEach(l=>{
                       if(l != 'file_fields')
                         result[l] = req.body[l];
                      
                      });

                       Section.findById(req.params.id, function(err, rows) {


                         for(var m of req.body['file_fields'].split(',')) {


                              if( rows[m] != ''){
                                  if(file_column_array[m] !== undefined){
                                     var obj = JSON.parse(rows[m]);
                                     var column_val = Object.keys(obj).map(function(k) { return obj[k] })[0];
                                     var new_column_val = column_val.concat(file_column_array[m]);
                                     result[m] = JSON.stringify({'selected_values':new_column_val});
                                  }
                               }else{

                                 if(file_column_array[m] !== undefined)
                                  result[m] =  JSON.stringify({'selected_values':file_column_array[m]});
                                       
                                }

                                 
                          }
                       return updateData(req,res,result);
                   

                     });

                 
              }
              i++;
           
           });
 
        });

     }else{

         var Section = require('../models/'+req.originalUrl.split('/')[2]);
         Section.findById(req.params.id, function(err, result) {
              if (!result)
                return next(new Error('Could not load Document'));
              else {

              for (var p in req.body) {

                   if(req.body.file_fields.indexOf(p) == -1)
                    result[p] = req.body[p];
              }
             
                return updateData(req,res,result);
              }
            });

     }
     



};


updateData = (req,res,result) => {

     var Section = require('../models/'+req.originalUrl.split('/')[2]);
     Section.findOneAndUpdate({'_id':req.params.id},result).exec(function(err, updated) {
         if(err) 
             return res.status(403).send({success: false, msg: err});
         else
             return res.status(200).json('Updated successfully');

     });



};

deleteFile = (req,res) =>{
      var Section = require('../models/'+req.originalUrl.split('/')[2]);

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







module.exports = sectionRoutes;