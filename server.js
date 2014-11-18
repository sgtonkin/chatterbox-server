var http = require("http");
var requestHandler = require("./request-handler.js");

// SERVER SETTINGS
var port = 80;
var ip = "100.73.116.191";

// LOCAL SETTING
// var port = 3000;
// var ip = "localhost";

var server = http.createServer(requestHandler.requestHandler);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

