var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
var Dashboard_Config = new Schema({"entity_type":{"type":"String"},"entity_display_name":{"type":"String"},"entity_config":{"type":"String"},"entity_order":{"type":"String"},"assigned_roles":{"type":"String"}},{collection:'dashboard_settings_config'});
Dashboard_Config.plugin(AutoIncrement,{inc_field: 'dashboard-config_id'});module.exports = mongoose.model('Dashboard_Config', Dashboard_Config)