var url = require("url");
var fs = require("fs");
var crypto = require("crypto");
var results = require("helpers.js").results;
var indexHtml = require("helpers.js").indexHtml;
var sendResponse = require("helpers.js").sendResponse;
var handleStatics = require("helpers.js").handleStatics;
var payload;

var actions = {
  GET: function(request, response, path) {
    if(path[0] === "") {
      return sendResponse(response, 200, "text/html", indexHtml);
    } else if(path[0] === "classes") {
      payload = JSON.stringify({results:results});
      return sendResponse(response, 200, "text/plain", payload);
    } else {
      return handleStatics(response, path)
    };
  },
  POST: function(request, response, path) {
    var id = crypto.randomBytes(20).toString('hex');
    return request.on('readable',function(resp){
      var message = request.read().toString();
      fs.appendFile("messages.txt",message + '\n');
      parsedMessage = JSON.parse(message);
      parsedMessage.objectId = id;
      results.push(parsedMessage);
      payload = JSON.stringify({results:results});
      return sendResponse(response, 201, "application/json", payload);
    })
  },
  OPTIONS: function(request, response) {
    return sendResponse(response, 200, "text/plain");
  }
};


exports.requestHandler = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  var path = url.parse(request.url).path.slice(1).split("/");
  console.log('url', url.parse(request.url).path);
  return actions[request.method](request, response, path);
};



