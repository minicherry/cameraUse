var User = require('../models/user');
var jwt = require('../public/utils/jwt');

module.exports.userLogin = function(req, res, next) {
    var postData = {
        userName: req.body.userName,
        userPwd: req.body.userPwd
    };
    User.findOne({
        userName: postData.userName,
        userPwd: postData.userPwd
    }, function(err, data) {
        if (err) throw err;
        if (data) {
            let token = jwt.createToken({
                username: req.body.userName
            });
            // 登录成功添加cookie
            res.cookie('token', token, {
                maxAge: 10000
            });
            res.json({
                status: '20000',
                message: '登录成功',
                token
            });
        } else {
            res.json({
                status: '50000',
                message: '账号或密码错误',
            })
        }
    })
};
module.exports.userList = function(req, res, next) {
    res.clearCookie('isVisit')
        // res.render('/api/user/userList');

    // req.clearCookie('isVisit')

    var userList = User.find({}, function(err, data) {
        if (err) throw err;
        res.send(data)
    });
};