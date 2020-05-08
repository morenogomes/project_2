// *** Set of Routes for sending users to the HTML pages
// =============================================================

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {
  // index route loads signup.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  // signin route loads signin.html
  app.get("/signin", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signin.html"));
  });

  // app route loads app.html
  app.get("/error", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/error.html"));
  });

  // app route loads app.html
  app.get("/app", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/app.html"));
  });
};
