const env = process.env.NODE_ENV === 'production'?'prod':'dev' //判断是否为开发环境
module.exports = require(`./${env}.js`)