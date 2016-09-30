var http=require('http');
var fs=require('fs');
var url=require('url');
var path=require('path');

function start(route,handle,port){
    function onRequest(request,response){
        var pathname=url.parse(request.url).pathname;
        console.log("Request"+pathname+" received.");
        route(handle,pathname,response);
    }
    http.createServer(onRequest).listen(port);
    console.log("Server has started.");
}
exports.start=start;
