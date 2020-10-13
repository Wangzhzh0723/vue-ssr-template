const Vue = require("vue")
const VueServerRenderer = require("vue-server-renderer")
const Koa = require("koa")
const Router = require("koa-router")
const static = require("koa-static")
const fs = require("fs")
const path = require("path")

const resolve = dir => path.resolve(__dirname, dir)

// 创建koa实例
const app = new Koa()
// 创建router实例
const router = new Router()

// 读取js 和 模板
const serverBundle = require("./dist/vue-ssr-server-bundle.json")
const template = fs.readFileSync(resolve("dist/index.ssr.html"), "utf8")

const clientManifest = require("./dist/vue-ssr-client-manifest.json")

// 创建renderer
const renderer = VueServerRenderer.createBundleRenderer(serverBundle, {
  template,
  clientManifest // 通过后端注入前端的js脚本
})

router.get("/(.*)", async ctx => {
  // 客户端 = template + 编译结果 = 组成的html

  // 在渲染页面的时候 需要让服务器根据当前路径渲染对应的路由
  try {
    const body = await renderer.renderToString({
      url: ctx.url
    })
    ctx.body = body
  } catch (e) {
    console.log(e)
    if (e.code == 404) {
      ctx.body = "not found"
    }
  }
})

// 优先使用静态服务插件 加载静态资源
app.use(static(resolve("dist")))

// 路由插件
app.use(router.routes())

// 启动服务 监听端口
app.listen(3000)
