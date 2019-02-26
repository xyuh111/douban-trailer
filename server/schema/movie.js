const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {ObjectId,Mixed} = Schema.Types // Mixed 可以存储任何类型的数据
const movieSchema = new Schema({
	doubanId: {
		unique: true,
		type:String,
	},
	category: [{
        type: ObjectId,
        ref: 'Category',
    }],
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
	pubdate: Mixed,   //日期为任意类型
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
movieSchema.pre('save',function (next){
	if (this.isNew) {
		this.createdAt = this.updateAt = Date.now()
	} else {
		this.updateAt = Date.now()
	}
	next()
})
mongoose.model("Movie", movieSchema)