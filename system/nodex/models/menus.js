var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
var Menu = new Schema({"name":{"type":"String"},"display_name":{"type":"String"},"menu_order":{"type":"Number"},"url":{"type":"String"},"url_type":{"type":"String", "default":"internal"},"icon":{"type":"String"},"parent_id":{"type":"String"},"status":{"type":"String"},"actions":{"type":"String"}},{collection:'menus'});
Menu.plugin(AutoIncrement,{inc_field: 'menus_id'});module.exports = mongoose.model('Menu', Menu)
