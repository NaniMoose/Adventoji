var express = require("express");
var port = 8808;

// Set up web server
var app = express();
app.use(function(req, res, next) {
    // Log each request
    console.log(`${req.method}: ${req.url}`);
    next();
});

// Serve flat files from ./client
app.use(express.static("client"));

// Start server
app.listen(port);
console.log(`Server ready, listening on port ${port}.`);