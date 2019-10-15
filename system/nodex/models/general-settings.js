var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
var General_settings = new Schema({"label":{"type":"String"},"slug":{"type":"String"},"field_type":{"type":"String"},"value":{"type":"String"}},{collection:'settings'});
General_settings.plugin(AutoIncrement,{inc_field: 'settings_id'});module.exports = mongoose.model('General_settings', General_settings)