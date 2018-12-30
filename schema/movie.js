const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed  // Mixed 可以存储任何类型的数据
const movieSchema = new Schema({
	doubanId: String,
	rate: Number,
	title: string,
	summary: string,
	video: string,
	poster: string,
	cover: string,
	videoKey: string,
	posterKey: string,
	coverKey: string,
	rawTitle: string, //原始标题
	movieTypes: [String],
	pubdata: Mixed,   //日期为任意类型
	yaer: Number,
	tags: Array,        //标签，恐怖片、动作片等。。。
	meta: {
		createdAt: {
			type: Date,
			default: Data.now()
		}
		updateAt: {
			type: Date,
			default: Data.now()
		}
	}
})
mongoose.model("Movie",movieSchema)