
var express = require('express');
var app = express();
var passport = require('passport');
var ApiAdminRoutes = express.Router();
require('./../admin/passport')(passport);
var jwt = require('jsonwebtoken');
var config = require('../../../config/DB');
const log = require('../../../log/errorLogService');


const Sections = require('../models/sections');
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



// Defined Login route
ApiAdminRoutes.route('/checkLogin').post(function (req, res) {

  // var io = req.app.get('socketio');
  // io.to(1).emit('new message', {});

  try {
    const User = require('../models/users');
    User.findOne({
      email: req.body.email
    }, function (err, user) {
      if (err) throw err;

      if (!user) {
        return res.json({ success: false, msg: 'Authentication failed. Wrong password.' });
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.sign(user.toJSON(), config.secret);
            // return the information including token as JSON
            return res.json({ success: true, token: 'JWT ' + token, result: user });
          } else {
            return res.json({ success: false, msg: 'Authentication failed. Wrong password.' });
          }
        });
      }
    });
  }
  catch (err) {
    log.logerror(res, err);
  }
});






ApiAdminRoutes.route('/').post(passport.authenticate('jwt', { session: false }), function (req, res) {

  try {
    var token = apiGetToken(req.headers);
    if (token)
      return apiGetList(req, res);
    else
      return res.json({ success: false, msg: 'Unauthorized' });
  }
  catch (err) {
    log.logerror(res, err);
  }
});




ApiAdminRoutes.route('/add').post(passport.authenticate('jwt', { session: false }), function (req, res) {
  try {
    var token = apiGetToken(req.headers);
    if (token) {

      var upload = multer({ storage: storage }).any();

      upload(req, res, function (err) {
        if (err)
          return res.json({ success: false, msg: 'Error uploading file..' });
        else {

        }
        return apiAdd(req, res);
      });

    }
    else
      return res.json({ success: false, msg: 'Unauthorized' });

  }
  catch (err) {
    log.logerror(res, err);
  }

});

ApiAdminRoutes.route('/edit/:id').get(passport.authenticate('jwt', { session: false }), function (req, res) {
  try {
    var token = apiGetToken(req.headers);
    if (token)
      return apiFetchDataById(req, res);
    else
      return res.json({ success: false, msg: 'Unauthorized' });
  }
  catch (err) {
    log.logerror(res, err);
  }

});

ApiAdminRoutes.route('/view/:id').get(passport.authenticate('jwt', { session: false }), function (req, res) {
  try {
    var token = apiGetToken(req.headers);
    if (token)
      return apiFetchDataById(req, res);
    else
      return res.json({ success: false, msg: 'Unauthorized' });
  }
  catch (err) {
    log.logerror(res, err);
  }

});





ApiAdminRoutes.route('/update/:id').post(passport.authenticate('jwt', { session: false }), function (req, res) {
  try {
    var token = apiGetToken(req.headers);
    if (token) {
      var upload = multer({ storage: storage }).any();
      upload(req, res, function (err) {
        if (err)
          return res.status(403).send({ success: false, msg: 'Error uploading file..' });
        else
          return apiUpdate(req, res);
      });

    }
    else
      return res.json({ success: false, msg: 'Unauthorized' });
  }
  catch (err) {
    log.logerror(res, err);
  }

});


ApiAdminRoutes.route('/delete/:id').get(passport.authenticate('jwt', { session: false }), function (req, res) {
  try {
    var token = apiGetToken(req.headers);
    if (token)
      return apiDeleteRow(req, res);
    else
      return res.json({ success: false, msg: 'Unauthorized' });
  }
  catch (err) {
    log.logerror(res, err);
  }

});








apiGetList = (req, res) => {

  var current_section = req.originalUrl.split('/')[2];
  var where = {};

  if ((current_section == 'users' || current_section == 'roles') && req.body.role_id != "1") {
    if (current_section == 'users')
      where = { "roles_id": { $ne: "1" } };
    if (current_section == 'roles')
      where = { "roles_id": { $ne: 1 } };
  }


  if (req.originalUrl.split('/')[2] == 'users' || req.originalUrl.split('/')[2] == 'roles' || req.originalUrl.split('/')[2] == 'sections' || req.originalUrl.split('/')[2] == 'menus' || req.originalUrl.split('/')[2] == 'mail-templates')
    var Section = require('../models/' + req.originalUrl.split('/')[2]);
  else
    var Section = require('../../../nodex/models/' + req.originalUrl.split('/')[2]);

  var orderField = req.body.sort_orderBy;
  var order = {};
  order[orderField] = 1;
  Section.find(where)
    .collation({ locale: 'en', strength: 2 })
    .sort(order)
    .exec(function (err, result) {
      if (err)
        return res.json({ success: false, msg: err });
      else
        return res.json({ success: true, data: result });
    });

};




apiDeleteRow = (req, res) => {
  if (req.originalUrl.split('/')[2] == 'users' || req.originalUrl.split('/')[2] == 'roles' || req.originalUrl.split('/')[2] == 'sections' || req.originalUrl.split('/')[2] == 'menus' || req.originalUrl.split('/')[2] == 'mail-templates')
    var Section = require('../models/' + req.originalUrl.split('/')[2]);
  else
    var Section = require('../../../nodex/models/' + req.originalUrl.split('/')[2]);

  Section.findByIdAndRemove({ _id: req.params.id }, function (err, result) {
    if (err)
      return res.status(403).send({ success: false, msg: err });
    else
      return res.json('Successfully removed');
  });

};





apiAdd = (req, res) => {


  var total_files = Object.keys(req.files).length;
  var i = 1;
  var file_column_array = [];
  if (Object.keys(req.files).length > 0) {
    Object.keys(req.files).forEach(k => {
      var FilesModel = require('../models/files');
      FilesModel.create({ files_name: req.files[k]['filename'], files_path: req.files[k]['path'], mime_type: req.files[k]['mimetype'], module: req.originalUrl.split('/')[2] }, function (err1, req1, res1) {

        if ((file_column_array[req.files[k]['fieldname']] === undefined)) {
          file_column_array[req.files[k]['fieldname']] = [];
        } if ((file_column_array[req.files[k]['fieldname']] !== undefined)) {
          file_column_array[req.files[k]['fieldname']].push(req1.files_id.toString());
        }

        if (i == total_files) {



          var result = {};
          Object.keys(req.body).forEach(l => {
            if (l != 'file_fields')
              result[l] = req.body[l];

          });
          for (var m of req.body['file_fields'].split(',')) {


            if (file_column_array[m] !== undefined) {


              result[m] = JSON.stringify({ 'selected_values': file_column_array[m] });
            }
            else
              result[m] = "";
          }
          return apiInsertData(req, res, result);


        }
        i++;

      });
    });

  } else {

    var result = {};
    Object.keys(req.body).forEach(l => {
      if (l != 'file_fields')
        result[l] = req.body[l];

    });

    for (var m of req.body['file_fields'].split(',')) {
      result[m] = "";
    }

    return apiInsertData(req, res, result);
  }

};

apiInsertData = (req, res, result) => {

  if (req.originalUrl.split('/')[2] == 'users' || req.originalUrl.split('/')[2] == 'roles' || req.originalUrl.split('/')[2] == 'sections' || req.originalUrl.split('/')[2] == 'menus' || req.originalUrl.split('/')[2] == 'mail-templates')
    var Section = require('../models/' + req.originalUrl.split('/')[2]);
  else
    var Section = require('../../../nodex/models/' + req.originalUrl.split('/')[2]);
  var section = new Section(result);
  section.save().then(item => {
    res.status(200).json('added successfully');
  })
    .catch(err => {
      return res.json({ success: false, msg: err });

    });

};


apiFetchDataById = (req, res) => {
  if (req.originalUrl.split('/')[2] == 'users' || req.originalUrl.split('/')[2] == 'roles' || req.originalUrl.split('/')[2] == 'sections' || req.originalUrl.split('/')[2] == 'menus' || req.originalUrl.split('/')[2] == 'mail-templates')
    var Section = require('../models/' + req.originalUrl.split('/')[2]);
  else
    var Section = require('../../../nodex/models/' + req.originalUrl.split('/')[2]);
  var id = req.params.id;
  Section.findById(id, function (err, result) {
    if (err)
      return res.json({ success: false, msg: err });
    else
      return res.json(result);
  });
};



apiUpdate = (req, res) => {

  var total_files = Object.keys(req.files).length;
  var i = 1;
  var file_column_array = [];
  if (Object.keys(req.files).length > 0) {

    Object.keys(req.files).forEach(k => {
      var FilesModel = require('../models/files');
      FilesModel.create({ files_name: req.files[k]['filename'], files_path: req.files[k]['path'], mime_type: req.files[k]['mimetype'], module: req.originalUrl.split('/')[2] }, function (err1, req1, res1) {

        if ((file_column_array[req.files[k]['fieldname']] === undefined)) {
          file_column_array[req.files[k]['fieldname']] = [];
        } if ((file_column_array[req.files[k]['fieldname']] !== undefined)) {
          file_column_array[req.files[k]['fieldname']].push(req1.files_id.toString());
        }

        if (i == total_files) {

          if (req.originalUrl.split('/')[2] == 'users' || req.originalUrl.split('/')[2] == 'roles' || req.originalUrl.split('/')[2] == 'sections' || req.originalUrl.split('/')[2] == 'menus')
            var Section = require('../models/' + req.originalUrl.split('/')[2]);
          else
            var Section = require('../../../nodex/models/' + req.originalUrl.split('/')[2]);

          var result = {};
          Object.keys(req.body).forEach(l => {
            if (l != 'file_fields')
              result[l] = req.body[l];

          });

          Section.findById(req.params.id, function (err, rows) {


            for (var m of req.body['file_fields'].split(',')) {


              if (rows[m] != '') {
                if (file_column_array[m] !== undefined) {
                  var obj = JSON.parse(rows[m]);
                  var column_val = Object.keys(obj).map(function (k) { return obj[k] })[0];
                  var new_column_val = column_val.concat(file_column_array[m]);
                  result[m] = JSON.stringify({ 'selected_values': new_column_val });
                }
              } else {

                if (file_column_array[m] !== undefined)
                  result[m] = JSON.stringify({ 'selected_values': file_column_array[m] });

              }


            }
            return apiUpdateData(req, res, result);


          });


        }
        i++;

      });

    });

  } else {

    if (req.originalUrl.split('/')[2] == 'users' || req.originalUrl.split('/')[2] == 'roles' || req.originalUrl.split('/')[2] == 'sections' || req.originalUrl.split('/')[2] == 'menus' || req.originalUrl.split('/')[2] == 'mail-templates')
      var Section = require('../models/' + req.originalUrl.split('/')[2]);
    else
      var Section = require('../../../nodex/models/' + req.originalUrl.split('/')[2]);
    Section.findById(req.params.id, function (err, result) {
      if (!result)
        return next(new Error('Could not load Document'));
      else {

        for (var p in req.body) {

          if (req.body.file_fields.indexOf(p) == -1)
            result[p] = req.body[p];
        }

        return apiUpdateData(req, res, result);
      }
    });

  }




};


apiUpdateData = (req, res, result) => {

  if (req.originalUrl.split('/')[2] == 'users' || req.originalUrl.split('/')[2] == 'roles' || req.originalUrl.split('/')[2] == 'sections' || req.originalUrl.split('/')[2] == 'menus' || req.originalUrl.split('/')[2] == 'mail-templates')
    var Section = require('../models/' + req.originalUrl.split('/')[2]);
  else
    var Section = require('../../../nodex/models/' + req.originalUrl.split('/')[2]);
  Section.findOneAndUpdate({ '_id': req.params.id }, result).exec(function (err, updated) {
    if (err)
      return res.json({ success: false, msg: err });
    else
      return res.status(200).json('Updated successfully');

  });



};




apiGetToken = (headers) => {


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




module.exports = ApiAdminRoutes;