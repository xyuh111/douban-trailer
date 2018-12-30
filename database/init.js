const mongoose = require('mongoose')
const url = 'mongodb://192.168.174.136:27017/douban-trailer';
const db = mongoose.connection;
mongoose.Promise = global.Promise
exports.connect = () => {
	let maxConnectTime = 0;
	return new Promise((resolve, reject) => {
		if (process.env.NODE_ENV !== 'production') {
			mongoose.set('debug', true)
		}
		mongoose.connect(url, {useNewUrlParser: true})
		db.on('disconnected', () => {
			maxConnectTime ++;
			if (maxConnectTime < 5) {
				mongoose.connect(url, {useNewUrlParser: true})
			} else {
				throw new Error('数据库挂了，快去修吧！')
			}
		})
		db.on('error', err => {
			maxConnectTime ++;
			if (maxConnectTime < 5) {
				mongoose.connect(url, {useNewUrlParser: true})
			} else {
				reject(err)
			}
		})
		db.once('open', () => {
			resolve('0')
			console.log("MongoDB Connected successflly!" + " 数据库连接成功")
		})
	})

}