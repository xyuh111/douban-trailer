const Koa = require('koa')
const mongoose = require('mongoose')
const {resolve} = require('path')
const {connect,initSchemas} = require('./database/init')
const R = require('ramda')
const MIDDLEWARES = ['router']

const useMiddlewares = (app) => {
	R.map(
		R.compose(
			R.forEachObjIndexed(
				initWith => initWith(app)
			),
			require,
			name => resolve(__dirname,`./middlewares/${name}`)
		)
	)(MIDDLEWARES)
}

;(async ()=>{
	await connect()
	initSchemas()


	// const Movie = mongoose.model('Movie')
	// const movies = await Movie.find({})
	// console.log(movies)
	// require('./crawler/tasks/movie')
	// require('./crawler/tasks/api')
	const app = new Koa();
	await useMiddlewares(app)
    app.listen(4000)
})()
