var User = require('../models/user');
module.exports.userLogin = function (req, res, next) {
    var postData = {
        userName: req.body.userName,
        userPwd: req.body.userPwd
    };
    console.log(req.body);

    User.findOne({
        userName: postData.userName,
        userPwd: postData.userPwd
    }, function (err, data) {
        if (err) throw err;
        if (data) {

            res.send({
                status: 'success',
                message: 'true'
            });
        } else {
            res.send('账号或密码错误')
        }
    })
};
module.exports.userList = function (req, res, next) {
    var userList = User.find({}, function (err, data) {
        if (err) throw err;
        res.send(data)
    });
};