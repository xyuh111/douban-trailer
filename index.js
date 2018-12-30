const Koa = require('koa')
const app = new Koa();
const {connect} = require('./database/init')
;(async ()=>{
	await connect()
})()
app.use(async (ctx, next)=>{
	ctx.body= '电影首页'
})
app.listen(3000)