var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
var Roles = new Schema({"name":{"type":"String"},"permissions":{"type":"String"},"status":{"type":"String"}},{collection:'roles'});
Roles.plugin(AutoIncrement,{inc_field: 'roles_id'});module.exports = mongoose.model('Roles', Roles)