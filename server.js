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

router.get("/", async ctx => {
  // 客户端 = template + 编译结果 = 组成的html
  const body = await renderer.renderToString()
  ctx.body = body
})

// 路由插件
app.use(router.routes())
// 静态服务插件
app.use(static(resolve("dist")))

// 启动服务 监听端口
app.listen(3000)
