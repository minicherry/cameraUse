var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('./public/utils/jwt');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');

var app = express();
//连接MongoDB数据库
mongoose.connect('mongodb://cyf:123456@127.0.0.1:27017/camera');

mongoose.connection.on("connected", function() {
    console.log("MongodB connected success.")
});

mongoose.connection.on("error", function() {
    console.log("MongodB connected fail.")
});

mongoose.connection.on("disconnected", function() {
    console.log("MongodB connected disconnected.")
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
// cookie设置插件
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 设置跨域访问和访问拦截
app.all('*', function(req, res, next) {
    // 跨域
    res.header("Access-Control-Allow-Origin", 'http://localhost:8080/'); //需要显示设置来源
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true); //带cookies7
    res.header("Content-Type", "application/json;charset=utf-8");
    /* res.header("Access-Control-Allow-Origin", *);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8"); */
    // 访问拦截
    if (req.url != '/api/user/login') {
        console.log(req.cookies);
        let token = req.cookies.token;
        // 如果获取到了cookie中的token，则可以返回数据，否则返回error
        if (!token || token === undefined) {
            res.send({
                status: 403,
                msg: '登录已过期,请重新登录'
            });
            return
        } else {
            next();
        }
    } else {
        next();
    }
});
app.use('/', indexRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;