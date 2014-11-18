var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var url = require("url");
var results = [{
  roomname: 'lobby',
  text: 'hello',
  username: 'tester',
  objectId: 23
}];

exports.requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log("Serving request type " + request.method + " for url " + request.url);

  var statusCode = 404;
  var payload = {};
  var path = url.parse(request.url).path.slice(1).split("/");
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";
  if(request.method === "OPTIONS") {
    statusCode = 200;
    response.writeHead(statusCode,headers);
    response.end(JSON.stringify(payload));
  }
  if(path[0] === "classes") {
    if(path[1]) {
      // GET HANDLER
      if(request.method === 'GET') {
        headers['Content-Type'] = "text/plain";
        statusCode = 200;
        payload = {results:results};
        response.writeHead(statusCode, headers);
        response.end(JSON.stringify(payload));
      }
      // POST HANDLER
      else if (request.method === 'POST') {
        statusCode = 201;
        request.setEncoding('utf8');
        request.on('readable',function(resp){
          results.push(JSON.parse(request.read()));
          response.writeHead(statusCode, headers);
          payload = {results:results};
          response.end(JSON.stringify(payload));
        })
      }
    }

  };

  response.writeHead(statusCode,headers);
  response.end(JSON.stringify(payload));

};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

