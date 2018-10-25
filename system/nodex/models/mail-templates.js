var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
var Mail_Templates = new Schema({"template_name":{"type":"String"},"template_subject":{"type":"String"},"template_body":{"type":"String"},"status":{"type":"String"}},{collection:'mail_templates'});
Mail_Templates.plugin(AutoIncrement,{inc_field: 'mail-templates_id'});module.exports = mongoose.model('Mail_Templates', Mail_Templates)