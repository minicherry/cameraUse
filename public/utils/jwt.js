var jwt = require('jsonwebtoken');

const secret = "TU_ZI";

function createToken(payload) {
    payload.rtiem = new Date();
    payload.exp = 60 * 60 * 2 * 1000;
    return jwt.sign(payload, secret);
}

function checkToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, res) => {
            if (!err) {
                resolve(res)
            } else {
                reject("token验证失败,请重新登录");
            }
        })
    })
}
module.exports = {
    createToken,
    checkToken
}