var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;
var hello = new Schema({"hello_name":{"type":"String"},"hello_name1":{"type":"String"},"hello_name2":{"type":"String"},"hello_name3":{"type":"String"}},{collection:'hello'});
hello.plugin(AutoIncrement,{inc_field: 'hello_id'});
module.exports = mongoose.model('hello', hello);