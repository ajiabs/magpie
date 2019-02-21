var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
  name: {
        type: String
    },
  email: {
        type: String,
        unique: true
    },
  roles_id: {
        type: String
    },
  created_user_id: {
        type: String,
        default:0
    },
  password: {
        type: String
    },
  image: {
        type: String
    },
   is_logged_in:{
       type: Number,
       default:0
   }
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};
UserSchema.plugin(AutoIncrement,{inc_field: 'users_id'});
module.exports = mongoose.model('User', UserSchema);