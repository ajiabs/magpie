
const mailService = require('../packages/mailService');
const log4js = require('log4js');
log4js.configure({
  "appenders": {
    "access": {
      "type": "dateFile",
      "filename": "log/access.log",
      "pattern": "-yyyy-MM-dd",
      "category": "http"
    },
    "app": {
      "type": "file",
      "filename": "log/app.log",
      "maxLogSize": 10485760,
      "numBackups": 3
    },
    "errorFile": {
      "type": "file",
      "filename": "log/errors.log"

    },
    "errors": {
      "type": "logLevelFilter",
      "level": "ERROR",
      "appender": "errorFile"
    }
  },
  "categories": {
    "default": { "appenders": ["app", "errors"], "level": "DEBUG" },
    "http": { "appenders": ["access"], "level": "DEBUG" }
  }
});

var loggererror = log4js.getLogger('error');

exports.logerror = function (res, msg) {
  var params = [];
  var mailIds = [];
  loggererror.error(msg); // Saving error log to File 'error.log'

  const Settings = require('../system/nodex/models/general-settings');
  Settings.find().exec(function (err, result) {
    if (err)
      return res.json({ success: false, msg: err });
    else {
      if (msg.name == 'Error' || msg.name == 'TypeError'){
        var mailArray = JSON.parse(result[9].value); // System errors
        params['mail-subject'] = "System Error Report"
      }       
      else{
        var mailArray = JSON.parse(result[10].value); // Other errors
      }
   
      Object.keys(mailArray.selected_mails).forEach(i => {
        mailIds.push(mailArray.selected_mails[i])
      });
      params['log'] = msg.stack;
    
      mailService.sendMailSMTP(res, mailIds, 'error-report', params);
    }
  });
}
