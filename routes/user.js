/* var express = require('express');
var router = express.Router(); */

/* GET users listing. */
/* router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router; */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var UserApi = require("../api/user");


//连接MongoDB数据库
mongoose.connect('mongodb://cyf:123456@127.0.0.1:27017/camera');

mongoose.connection.on("connected", function () {
  console.log("MongodB connected success.")
});

mongoose.connection.on("error", function () {
  console.log("MongodB connected fail.")
});

mongoose.connection.on("disconnected", function () {
  console.log("MongodB connected disconnected.")
});

router.get("/", function (req, res, next) {
  res.send("hello")
  User.find({}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      });
    } else {
      /* 
            res.json({
              status: '0',
              msg: '',
              result: {
                count: doc.length,
                list: doc
              }
            }); */
      console.log(doc)

    }
  })
});
router.post('/login', UserApi.userLogin);
router.get('/userList', UserApi.userList);
module.exports = router;