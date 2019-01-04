const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed // Mixed 可以存储任何类型的数据
const SALT_WORK_FACTOR = 10; //MD5   值大小
const MAC_LOGIN_ATTEMPTS = 5; //密码最多输错 5 次
const LOCK_TIME = 2 * 60 * 60 * 1000; //输错密码 5 次 锁定 2 个小时。
const userSchema = new Schema({
	username: { //用户名设置为排他性的，唯一的，不允许重复  unique: true,
		unique: true,
		required: true,  // 必须传，不能为空
		type: String,
	},
	email: {
		unique: true,
		required: true,  // 必须传，不能为空
		type: String,
	},
	password: {
		// unique: true,
		type: String,
	},
	loginAttempts: { //尝试登陆的次数
		type: Number,
		required: true,  // 必须传，不能为空

	},
	lockUntil: Number, //锁定时间
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

// mongose 提供的虚拟字段， 这个字段不会被真正的存到数据库里面，每一次都会经过get 方法判断
userSchema.virtual('isLocked').get(() => {
	// lockUntil 就是要被锁定到什么时候
	return !!(this.lockUntil && this.lockUntil > Date.now())
})

userSchema.pre('save', next => {
	if (this.isNew) {
		this.createdAt = this.updateAt = Date.now()
	} else {
		this.updateAt = Date.now()
	}
	next()
})

userSchema.pre('save', next => {
	//isModified 方法 是mongose 提供的。 查看 某个 字段有没有被更改。 没有就 return 并跳过后面的环节
	if (!this.isModified('password')) return next();
	//bcrypt 是一个加密库   SALT_WORK_FACTOR（盐值） 越大越耗电脑性能 salt 盐
	bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
		if (err) return next(err)
		//把拿到的密码做 hash 。
		bcrypt.hash(this.password, salt, (error, hash) => {
			if (error) return next(error)
			this.password = hash;
			next()
		})
	})
	next()
})

// methods 是实例方法，具备修改数据能力
userSchema.methods = {
	// _password 是网站提交过来的明文的密码。password 是数据库的密码
	comparePassword: (_password, password) => {
		return new Promise((resolve, reject) => {
			bcrypt.compare(_password, password, (err, isMatch) => {
				if (!err) resolve(isMatch)
				else reject(err)
			})
		})
	},
	incLoginAttepts: (user) => {
		return new Promise((resolve, reject) => {
			if (this.lockUntil && this.lockUntil < Date.now()) {
				this.update({
					$set: {
						loginAttempts: 1,
					},
					$unset: {
						lockUntil: 1
					}
				}, (err) => {
					if (!err) resolve(true)
					else reject(err)
				})
			} else {
				let updates = {
					$inc: {
						loginAttempts: 1,
					}
				}
				//登陆错误次数大于 最大登陆次数 ，同时 当前用户没有被锁定，
				if (this.loginAttempts + 1 >= MAC_LOGIN_ATTEMPTS && !this.isLocked) {
					updatas.$set = {
						lockUntil: Date.now() + LOCK_TIME,
					}
				}
				this.update(updates, err => {
					if (!err) resolve(true)
					else reject(err)
				})
			}
		})

	}
}
mongoose.model("User", userSchema)