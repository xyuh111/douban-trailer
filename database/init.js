const mongoose = require('mongoose')
const {resolve} = require('path')
const url = 'mongodb://192.168.174.137:27017/douban-trailer';
const db = mongoose.connection;
const glob = require('glob')  //用于匹配目录下的所有 js 文件 这是node 的一个模块，允许使用 * 号

mongoose.Promise = global.Promise

exports.initSchemas = () => {
	//同步的加载 全部schema下的js文件
	glob.sync(resolve(__dirname,'./../schema/','**/*.js')).forEach(require)
}
exports.connect = () => {
	let maxConnectTime = 0;
	return new Promise((resolve, reject) => {
		if (process.env.NODE_ENV !== 'production') {
			mongoose.set('debug', true)
		}
		mongoose.connect(url, {
			useCreateIndex: true,
			useNewUrlParser: true
		  })
		db.on('disconnected', () => {
			maxConnectTime ++;
			if (maxConnectTime < 5) {
				mongoose.connect(url,{
					useCreateIndex: true,
					useNewUrlParser: true
				  })
			} else {
				throw new Error('数据库挂了，快去修吧！')
			}
		})
		db.on('error', err => {
			maxConnectTime ++;
			if (maxConnectTime < 5) {
				mongoose.connect(url, {
					useCreateIndex: true,
					useNewUrlParser: true
				  })
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