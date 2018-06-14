var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;
var files = new Schema({"files_path":{"type":"String"},"mime_type":{"type":"String"},"module":{"type":"String"}},{collection:'files'});
files.plugin(AutoIncrement,{inc_field: 'files_id'});
module.exports = mongoose.model('files', files);