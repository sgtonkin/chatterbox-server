/* Import node's http module: */
var http = require("http");
var requestHandler = require("./request-handler.js");


// SERVER SETTINGS
var port = 80;
var ip = "100.73.116.191";

// LOCAL SETTING
// var port = 3000;
// var ip = "localhost";




// We use node's http module to create a server.
//
// The function we pass to http.createServer will be used to handle all
// incoming requests.
//
// After creating the server, we will tell it to listen on the given port and IP. */
var server = http.createServer(requestHandler.requestHandler);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);



// To start this server, run:
//
//   node basic-server.js
//
// on the command line.
//
// To connect to the server, load http://127.0.0.1:3000 in your web
// browser.
//
// server.listen() will continue running as long as there is the
// possibility of serving more requests. To stop your server, hit
// Ctrl-C on the command line.

