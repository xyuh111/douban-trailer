const Router = require('koa-router')
const mongoose = require('mongoose')
const router = new Router()

router.get('/movies/all', async(ctx,next) =>{
    const Movie = mongoose.model('Movie')
    const movies = await Movie.find({}).sort({    //时间 从最近到最远排序
        'mete.createdAt': -1
    })
    //body 直接返回
    ctx.body = {movies}
})
router.get('/movies/detail/:id', async(ctx,next) =>{
    const Movie = mongoose.model('Movie')
    const id = ctx.params.id;
    const movies = await Movie.findOne({_id:id})
    //body 直接返回
    ctx.body = {movies}
})

module.exports = router;