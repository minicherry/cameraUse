var User = require('../models/user');
var jwt = require('../public/utils/jwt');
var formidable = require('formidable'); //上传功能的插件
var path = require('path')
var fs = require("fs");
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
                maxAge: 1000 * 60 * 60
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
module.exports.upLoadImg = function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../../static/'); //文件保存的临时目录为static文件夹（文件夹不存在会报错，一会接受的file中的path就是这个）
    form.maxFieldsSize = 1 * 1024 * 1024; //用户头像大小限制为最大1M
    form.keepExtensions = true; //使用文件的原扩展名
}