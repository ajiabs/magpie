var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
var Package_installer = new Schema({"package_name":{"type":"String"},"package_config":{"type":"String"}},{collection:'package_installer'});
Package_installer.plugin(AutoIncrement,{inc_field: 'package_installer_id'});module.exports = mongoose.model('Package_installer', Package_installer)