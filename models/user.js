var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    userId: String,
    userName: String,
    userPwd: String,
    picList: [{
        id: String,
        url: String,
        name: String,
        size: String,
        createData: String
    }]
});

module.exports = mongoose.model('users', UserSchema);