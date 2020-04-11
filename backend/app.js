// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require("koa");
//路由
const router = require("koa-router")();
// const exec = require('child_process').exec;
// 创建一个Koa对象表示web app本身:
const http = require("http");
const qs = require("querystring");
const app = new Koa();
const fs = require("fs");
const path = require("path");
// const filename="E:/Download/social_network/Email-EuAll.txt/Email-EuAll.edgelist"
// const filename="./data/email-Eu-core.edgelist"
// 对于任何请求，app将调用该同步函数处理请求：
// 引入
const bodyParser = require("koa-bodyparser");
const port = 3000;
// 设置跨域
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  await next();
});
// 配置中间件
app.use(bodyParser());
// 调用路由中间件
app.use(router.routes());
//社团检测
const readFile = (filename, resultAttrName, result) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf-8", function (err, data) {
      if (err) {
        reject(filename + "文件读取失败");
      } else {
        result[resultAttrName] = JSON.parse(data);
        resolve(result);
      }
    });
  });
};

router.get("/", async (ctx, next) => {
  //最后输出的结果
  let result = {};
  //需要读的文件
  // GRAPH, MCC_MNC, l_label, l_data, r_label, r_data, ispc_coord_data, connect_data, country_coord_data
  const GRAPH = path.join(__dirname, "data/GRAPH.json");
  const MCC_MNC = path.join(__dirname, "data/MCC_MNC.json");
  const ispc_coord_data = path.join(__dirname, "data/ispc_coord.json");
  const connect_data = path.join(__dirname, "data/tisp_connect.json");
  const country_coord_data = path.join(__dirname, "data/country_coord.json");
  let maxV = 0;
  result.r_label = [
    { name: "食品", max: maxV },
    { name: "燃料", max: maxV },
    { name: "铁", max: maxV },
    { name: "化学制品", max: maxV },
    { name: "机械", max: maxV },
    { name: "服装", max: maxV },
    { name: "纺织品", max: maxV },
  ];
  result.l_label = ["4-121-0", "4-121-4", "4-128-7", "4-177-1", "4-178-3"]; //,'4-183-3','4-183-3']
  result.l_data = ["842.23", "1095.24", "1475.65", "3037.25", "4806.89"];
  result.r_data = [
    { value: [68998, 35389, 55756, 141230, 1085569, 157464, 109595], name: "" },
  ];
  //需要读取的文件
  const filenames = [
    GRAPH,
    MCC_MNC,
    ispc_coord_data,
    connect_data,
    country_coord_data,
  ];
  //设置输出接口格式
  const attrNames = [
    "GRAPH",
    "MCC_MNC",
    "ispc_coord_data",
    "connect_data",
    "country_coord_data",
  ];
  //遍历生成promises
  const promises = filenames.map((filename, index) => {
    return readFile(filename, attrNames[index], result);
  });
  //执行获得最后数据  
  await Promise.all([...promises]).then((data) => {
    ctx.response.body = data[promises.length - 1];
  });
});

// 在端口3000监听:
app.listen(port);
console.log("app started at port 3000...");
