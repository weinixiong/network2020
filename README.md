# trade
选择框需要数据：MCC_MNC
运营商视图1需要图数据：GRAPH

# ownership使用说明

运营商以及非运营商之间的所有权关系图

采用了 Echarts 的模板，参考链接：https://www.echartsjs.com/examples/en/editor.html?c=graph-webkit-dep



## 运行方法

进入 OwnershipGraph 文件夹，起一个服务器，比如采用

```shell
python -m http.server
```

浏览器中打开ownership_graph_vis.html 即可



可视化只利用了 json 文件中的一小部分信息，可以利用一下其他键值信息丰富一下展现形式，也可以对样式进行调整美化



## 其他

如有什么疑问，欢迎联系周杰辉和任一方:-D