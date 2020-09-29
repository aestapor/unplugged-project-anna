// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 3000;

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(connectLivereload());
app.use(express.static(path.join(__dirname, 'public')));
// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================
app.get("/", function(req,res){
    res.sendFile(path.join(__dirname, "./app/public/index.html"));
});
app.get("/faq", function(req,res){
    res.sendFile(path.join(__dirname, "./app/public/faq.html"));
});
app.get("/about", function(req,res){
    res.sendFile(path.join(__dirname, "./app/public/about.html"));
});
app.get("/images/unpluggedlogo.png", function(req,res){
    res.sendFile(path.join(__dirname, "./app/public/images/unpluggedlogo.png"));
})
app.get("/images/bridge.jpg", function(req,res){
    res.sendFile(path.join(__dirname, "./app/public/images/bridge.jpg"));
})
app.get("/images/group.jpg", function(req,res){
    res.sendFile(path.join(__dirname, "./app/public/images/group.jpg"));
})
app.get("/images/black-overlay.jpg", function(req,res){
    res.sendFile(path.join(__dirname, "./app/public/images/black-overlay.jpg"));
})

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

