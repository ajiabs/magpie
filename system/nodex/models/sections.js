var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;
var fs = require('fs');
var config = require('../../../config/web-config');

var Sections = new Schema({
  section_name: {
    type: String
  },
  section_alias: {
    type: String
  },
  section_table_name:{
    type: String
  },
  section_config: {
    type: String
  }
},{
    collection: 'sections'
});

Sections.pre('save', function (next) {
    var sections = this;
    var cont = "var mongoose = require('mongoose');\n";
    cont += "var Schema = mongoose.Schema;\n";
    cont += "const AutoIncrement = require('mongoose-sequence')(mongoose);\n";
    var sche =  {};
    var full_col = JSON.parse(sections.section_config).column;
    for (var p in full_col) {
      sche[full_col[p].field] = {type:'String'};
      //required:full_col[p].validations[0].required
    
    }
    sche['created_user_id'] =  {"type": "Number","default":0}
  

    cont += "var "+sections.section_name.split(' ').join('_')+" = new Schema("+JSON.stringify(sche)+",{collection:'"+sections.section_table_name+"'});\n";
    cont += sections.section_name.split(' ').join('_')+".plugin(AutoIncrement,{inc_field: '"+sections.section_alias+"_id'});"
    cont += "module.exports = mongoose.model('"+sections.section_name.split(' ').join('_')+"', "+sections.section_name.split(' ').join('_')+")";
   
    next();
    mongoose.connect(config.db.DB_PATH, function(err, db) {
        db.createCollection(sections.section_table_name, function(err, collection){});
        var writeStream = fs.createWriteStream("nodex/models/"+sections.section_alias+".js");
        writeStream.write(cont);
        writeStream.end();
    
    });
  
});



Sections.plugin(AutoIncrement,{inc_field: 'sections_id'});
module.exports = mongoose.model('Sections', Sections);