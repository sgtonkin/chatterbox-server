// DEFAULT VALUES
var fs = require("fs");
var indexHtml = "";
var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "text/plain",
};
var results = [];

// ENDS RESPONSE FOR;
// ALL TYPES OF REQUESTS
  var sendResponse = function (response, statusCode, contentType, payload) {
  var statusCode = statusCode || 200;
  var payload = payload || "{}";
  headers['Content-Type'] = contentType;
  response.writeHead(statusCode, headers);
  return response.end(payload);
};

// HANDLE STATIC FILE ROUTING
var handleStatics = function(response, path) {
  return fs.open("./client/" + path.join("/"), 'rs', function(err, fd) {
        if (err) {
          console.log('ERROR OPENING FILE', err);
          return sendResponse(response, 404);
        }
        console.log('PATH', path)
        var fileExtensions = path[1].split(".");
        payload = fs.readFileSync("./client/" + path.join("/"),"utf8");
        var contentType;

        if(fileExtensions[1] === "js") {
          contentType = "application/javascript";
        } else if(fileExtensions[1] === "css") {
          contentType = 'text/css';
        } else if(fileExtensions[1] === "ico") {
          contentType = 'image';
        }
        return sendResponse(response, 200, contentType, payload);
  })
};

// LOAD IN MESSAGES FROM FILE
results = fs.readFileSync("messages.txt","utf8").split('\n');
results.forEach(function(el,i){
  if(results[i].length > 1)
  results[i] = JSON.parse(results[i]);
});

// LOAD INDEX HTML TO PASSBACK LATER
indexHtml = fs.readFileSync("./client/index.html","utf8");

module.exports = {
  indexHtml: indexHtml,
  sendResponse: sendResponse,
  results: results,
  handleStatics: handleStatics
}

