var server=require("./server");
var router=require("./router");
var reqHandlers=require("./requestHandlers");
var conf=require('./config.json');

var port=conf.port || 3000;
var handle={}
handle["/"]=reqHandlers.start;
handle["/start"]=reqHandlers.start;
handle["/download"]=reqHandlers.download;
handle["/view"]=reqHandlers.view;
server.start(router.route,handle,port);