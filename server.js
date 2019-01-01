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
RedisStore = require('connect-redis')(session);
const http = require('http');
var https = require('https');
//const forceSsl = require('force-ssl-heroku');
var compression = require('compression');
var expressStaticGzip = require('express-static-gzip');
//naked_redirect = require('express-naked-redirect');
const fs = require('fs');


magpieAdminRoutes  = require('./system/nodex/admin/sectionRoutes');
magpieCustomRoutes = require('./system/nodex/admin/customRoutes');
magpieApiRoutes  = require('./system/nodex/api/apiRoutes');
adminCustomRoutes  = require('./nodex/admin/customRoutes');
apiCustomRoutes  = require('./nodex/api/apiRoutes');

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

//app.use(forceSsl);
app.use(compression());
// app.use(express.static(path.join(__dirname, 'dist')));
app.use('/', expressStaticGzip(__dirname+'/dist', {
  enableBrotli: true, 
  orderPreference: ['br','gzip','deflate']
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, }));


app.use(flash());

// app.use(function(req, res, next){
//   res.locals.success_message = req.flash('success_message');
//   res.locals.error_message = req.flash('error_message');
//   res.locals.error = req.flash('error');
//   next();
// });

// app.use(naked_redirect({
//   subDomain: 'www',
//   https: true
// }))


app.use('/uploads', express.static('uploads'))

const adminFolder = './nodex/admin/';
const admin_routes = require('fs');
admin_routes.readdirSync(adminFolder).forEach(file => {

  var route_path = file.split("Routes.js")[0];
  var route_file = file.split(".js")[0];
  route = require('./nodex/admin/'+route_file);
  app.use('/admin/'+route_path, route);
})

app.use('/admin/admin_custom', adminCustomRoutes);
app.use('/admin/magpie_custom', magpieCustomRoutes);
app.use('/admin/:section', magpieAdminRoutes);

app.use('/api/:section', apiCustomRoutes);
app.use('/api/:section', magpieApiRoutes);





app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/magpie.iscriptsdemo.com/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/magpie.iscriptsdemo.com/fullchain.pem")
};


const httpServer = http.createServer(app);
httpServer.listen(port, function(){
    console.log('Listening on port ' + port);
  });

const httpsServer = https.createServer(options, app);
httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});
