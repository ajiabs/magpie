var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;
var Projects = new Schema({
  project_name: {
    type: String
  },
  project_desc: {
   type: String
  },
},{
    collection: 'projects'
});
Projects.plugin(AutoIncrement,{inc_field: 'projects_id'});
module.exports = mongoose.model('Projects', Projects);