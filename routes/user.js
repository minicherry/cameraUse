/* var express = require('express');
var router = express.Router(); */

/* GET users listing. */
/* router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router; */
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var UserApi = require("../api/user");
router.get("/", function(req, res, next) {
    res.send("hello")
    User.find({}, function(err, doc) {
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