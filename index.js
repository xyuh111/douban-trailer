const Koa = require('koa')
const mongoose = require('mongoose')
const {resolve} = require('path')
const app = new Koa();
const {connect,initSchemas} = require('./database/init')
;(async ()=>{
	await connect()
	initSchemas()
	const Movie = mongoose.model('Movie')
	const movies = await Movie.find({})
	// console.log(movies)
})()
app.use(async (ctx, next)=>{
	ctx.body= '电影首页'
})
app.listen(3000)