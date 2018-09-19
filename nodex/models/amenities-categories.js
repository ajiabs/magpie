var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
var Amenities_Categories = new Schema({"project_name":{"type":"String"},"project_desc":{"type":"String"}},{collection:'amenities_categories'});
Amenities_Categories.plugin(AutoIncrement,{inc_field: 'amenities-categories_id'});module.exports = mongoose.model('Amenities_Categories', Amenities_Categories)