var User = require('../models/user');
var jwt = require('../public/utils/jwt');
var formidable = require('formidable'); //上传功能的插件
var path = require('path');
var fs = require('fs');
module.exports.userLogin = function(req, res, next) {
  var postData = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  };
  User.findOne({
    userName: postData.userName,
    userPwd: postData.userPwd
  },
    function(err, data) {
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
          message: '账号或密码错误'
        });
      }
    }
  );
};
module.exports.userList = function(req, res, next) {
  res.clearCookie('isVisit');
  // res.render('/api/user/userList');

  // req.clearCookie('isVisit')

  var userList = User.find({}, function(err, data) {
    if (err) throw err;
    res.send(data);
  });
};
module.exports.upLoadImg = function(req, res, next) {
  var form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, '../static'); //文件保存的临时目录为static文件夹（文件夹不存在会报错，一会接受的file中的path就是这个）
  form.maxFieldsSize = 1 * 1024 * 1024; //用户头像大小限制为最大1M
  form.keepExtensions = true; //使用文件的原扩展名
  form.parse(req, function(err, fields, file) {

    var filePath = '';
    //如果提交文件的form中将上传文件的input名设置为tmpFile，就从tmpFile中取上传文件。否则取for in循环第一个上传的文件。
    if (file.tmpFile) {
      filePath = file.tmpFile.path;
    } else {
      for (var key in file) {
        if (file[key].path && filePath === '') {
          filePath = file[key].path;
          break;
        }
      }
    }
    //文件移动的目录文件夹，不存在时创建目标文件夹
    var targetDir = path.join(__dirname, '../static/uploads');
    if (!fs.existsSync(targetDir)) {
      fs.mkdir(targetDir);
    }
    var fileExt = filePath.substring(filePath.lastIndexOf('.'));
    //判断文件类型是否允许上传
    if ('.jpg.jpeg.png.gif'.indexOf(fileExt.toLowerCase()) === -1) {
      var err = new Error('此文件类型不允许上传');
      res.json({
        code: -1,
        message: '此文件类型不允许上传'
      });
    } else {
      //以当前时间戳对上传文件进行重命名
      var fileName = new Date().getTime() + fileExt;
      var targetFile = path.join(targetDir, fileName);
      //移动文件
      fs.rename(filePath, targetFile, function(err) {
        if (err) {
          console.info(err);
          res.json({
            code: -1,
            message: '操作失败'
          });
        } else {
          User.update({
            userName: "bbb"
          }, {
            $push: {
              picList: {
                id: fileName,
                url: '/static/upload/' + fileName,
                name: fileName,
                size: 20,
                createData: new Date()
              }
            }
          },
            (err2, doc2) => {
              //上传成功，返回文件的相对路径
              // var fileUrl = '/static/upload/' + fileName;
              res.json({
                code: 2000,
                fileUrl: fileName
              });
            }
          );
        }
      });
    }
  });
};