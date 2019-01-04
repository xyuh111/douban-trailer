const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed  // Mixed 可以存储任何类型的数据
const movieSchema = new Schema({
	doubanId: {
		unique: true,
		type:String
	},
	rate: Number,
	title: String,
	summary: String,
	video: String,
	poster: String,
	cover: String,
	videoKey: String,
	posterKey: String,
	coverKey: String,
	rawTitle: String, //原始标题
	movieTypes: [String],
	pubdata: Mixed,   //日期为任意类型
	yaer: Number,
	tags: Array,        //标签，恐怖片、动作片等。。。
	meta: {
		createdAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})

// pre方法 就是保存之前。
movieSchema.pre('save', next => {
	if (this.isNew) {
		this.createdAt = this.updateAt = Data.now()
	} else {
		this.updateAt = Data.now()
	}
	next()
})
mongoose.model("Movie", movieSchema)