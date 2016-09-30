var fs=require('fs');
var http=require('http');
var conf=require('./config.json');
function start(response){
    console.log('start');
    fs.readFile(conf.html,function(err,text){
        if(!err){
        response.setHeader("Content-Length",text.length);
        response.statusCode=200;
        response.end(text);
        } else{
            response.writeHead(500);
            response.end();
        }
    });
}

function download(response){
    console.log('download');
    response.setHeader('Content-Disposition','attachment; filename=test.txt');
    response.setHeader('Content-Type','text/plain');
    response.statusCode=200;
    fs.createReadStream(conf.txt).pipe(response);
}

function view(response){
    const buf = new Buffer(1000);
    console.log('view');
   fs.stat(conf.txt,(err,st)=>{
      if(!err){
        response.statusCode=200;
        var stream=new fs.ReadStream(conf.txt);
        stream.on('data', (buf)=>{
                console.log(buf.length);
                response.write(buf.toString());
        });
        stream.on('end', ()=>{
            console.log("end");
            response.end("end");
        })
         } else{
            response.writeHead(500);
            response.end();
         }
      });
}

   
exports.start=start;
exports.download=download;
exports.view=view;
