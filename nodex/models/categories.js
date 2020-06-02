var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// const AutoIncrement = require('mongoose-sequence')(mongoose);
function toObjectId (id) {
    return mongoose.Types.ObjectId(id);
}

var EventCategory = new Schema(
    {
    "name":{"type":"String"}
     },{collection:'event_categories'}
    );
// Pages.plugin(AutoIncrement,
//     {inc_field: 'pages_id'});
module.exports = mongoose.model('EventCategory', EventCategory)
