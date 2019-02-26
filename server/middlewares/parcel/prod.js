const views = require('koa-views')
const serve = require('koa-static')

const { resolve } = require('path')

export const dev = async app => {
    app.use(serve(r('../../../dist')))
    app.use(views(r('../../../dist')),{
        extension:'html'
    })
    app.use(async (ctx) =>{
        await ctx.tender(index.html)
    })
}