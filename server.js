      const express = require('express'),
      path = require('path'),
      passport = require('passport'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      session      = require('express-session'),
      flash    = require('connect-flash'),
      config = require('./config/DB'),
      LocalStrategy = require('passport-local').Strategy,
      RedisStore = require('connect-redis')(session),
      userRoutes = require('./expressRoutes/userRoutes');
      sectionRoutes = require('./expressRoutes/sectionRoutes');
      customRoutes = require('./expressRoutes/customRoutes');

      

      mongoose.Promise = global.Promise;
      mongoose.connect(config.DB).then(
          () => {console.log('Database is connected') },
          err => { console.log('Can not connect to the database'+ err)}
        );

      const app = express();
      app.use(bodyParser.urlencoded());
      app.use(bodyParser.json());
      app.use(cors());
      const port = process.env.PORT || 4000;




      app.use(passport.initialize());
      app.use(passport.session());

      app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, }));

   

      app.use(flash());

      app.use(function(req, res, next){
        res.locals.success_message = req.flash('success_message');
        res.locals.error_message = req.flash('error_message');
        res.locals.error = req.flash('error');
        next();
      });
            
  
       app.use('/admin/custom', customRoutes);
       app.use('/admin/users', userRoutes);
       app.use('/admin/:section', sectionRoutes);
       const server = app.listen(port, function(){
         console.log('Listening on port ' + port);
       });
