const VueSSRClientPlugin = require('vue-server-renderer/client-plugin'); // 在客户端打包时增加插件
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin'); // 在服务端打包时增加插件


const Koa = require("koa");
const Router = require("koa-router");
const static = require("koa-static");
const path = require("path");
const app = new Koa();
const router = new Router();
const VueServerRenderer = require("vue-server-renderer");
const fs = require("fs");
// 服务端打包的结果
// const serverBundle = fs.readFileSync("./dist/server.bundle.js", "utf8");
const template = fs.readFileSync("./dist/index.ssr.html", "utf8");
const serverBundle = require("./dist/vue-ssr-server-bundle.json");
const clientManifest = require("./dist/vue-ssr-client-manifest.json");
const render = VueServerRenderer.createBundleRenderer(serverBundle, {
  template,
  clientManifest // 自动注入客户端打包后的文件
});

router.get("/", async ctx => {
  ctx.body = await new Promise((resolve, reject) => {
    render.renderToString((err, html) => {
      // 必须写成回调函数的方式否则样式不生效
      resolve(html);
    });
  });
});
app.use(router.routes());
app.use(static(path.resolve(__dirname, "dist")));
app.listen(3000);