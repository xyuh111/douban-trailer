const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {ObjectId,Mixed} = Schema.Types // Mixed 可以存储任何类型的数据
const categorySchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    movies: [{
        type: ObjectId,
        ref: 'Movie',
    }],
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
categorySchema.pre('save',function(next) {
    if (this.isNew) {
        this.createdAt = this.updateAt = Date.now()
    } else {
        this.updateAt = Date.now()
    }
    next()
})
mongoose.model("Category", categorySchema)