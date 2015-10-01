var evhtp = require('./');

var myhost = "0.0.0.0",
    myport = 8080,
    mybacklog = 1024;

var evserver = evhtp.newEventServer();
var httpServer = evserver.newHTTPServer();
//httpServer.staticPath("/test", 200, "Content from /test path\n");
httpServer.staticCBPath("/test", 200, "Content from /test path\n", function(r) {
  console.log('cb path function called');
  r.tt();
  r.tres();
  console.log('cb path function finished');
});

httpServer.staticPath("/", 200, "Content from root path\n");
httpServer.bindSocket(myhost, myport, mybacklog);

console.log("HTTP server listening to port: " + myport)
evserver.loop();
