const koa = require('koa');
const path = require('path');
const Router = require('koa-router');
const staticFiles = require('koa-static');
const cacheControl = require('koa-cache-control');
const app = new koa();
app.use(staticFiles(path.resolve(__dirname,"../dist")))
app.use(cacheControl({
    maxAge: 500
}));
app.listen(3000,()=>{
    console.log('start server')
})
let staticRouter = new Router();
staticRouter.all(/(\.jpg|\.png|\.gif)$/i, staticFiles('../dist/image', {
    maxage: 60 * 60 * 1000
}))
staticRouter.all(/(\.css)$/i, staticFiles('./dist/css', {
    maxage: 60 * 60 * 1000
}))
staticRouter.all(/(\.html|\.htm|\.shtml)$/i, staticFiles('../dist/index.html', {
    maxage: 60 * 60 * 1000
}))

//*代表之外的文件
staticRouter.all(/(\.js)$/i, staticFiles('../dist/js', {
    maxage: 60 * 60 * 1000
}))

app.use(staticRouter.routes());

