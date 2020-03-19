var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    userId: String,
    userName: String,
    userPwd: String
});

module.exports = mongoose.model('users', UserSchema);