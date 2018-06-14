var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;

var Products = new Schema({
  product_name: {
    type: String
  }
},{
    collection: 'products'
});


Products.plugin(AutoIncrement,{inc_field: 'products_id'});
module.exports = mongoose.model('Products', Products);