var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
var Menu = new Schema({"name":{"type":"String"},"url":{"type":"String"},"icon":{"type":"String"},"parent_id":{"type":"String"},"status":{"type":"String"}},{collection:'menus'});
Menu.plugin(AutoIncrement,{inc_field: 'menus_id'});module.exports = mongoose.model('Menu', Menu)