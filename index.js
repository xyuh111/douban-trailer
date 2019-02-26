const Koa = require('koa')
const mongoose = require('mongoose')
const {resolve} = require('path')
const {connect,initSchemas} = require('./database/init')
const router = require('./routes/index.js')
;(async ()=>{
	await connect()
	initSchemas()
	// const Movie = mongoose.model('Movie')
	// const movies = await Movie.find({})
	// console.log(movies)
	// require('./crawler/tasks/movie')
	require('./crawler/tasks/api')
})()
const app = new Koa();
//这是 koa-router 的固定用法
app.use(router.routes())
   .use(router.allowedMethods())

app.use(async (ctx, next)=>{
	ctx.body= '电影首页'
})
app.listen(4000)