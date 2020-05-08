// Set of routes for displaying and saving data to the database
// =============================================================

// Requiring models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  // Sign Up Route: If the user is created successfully, proceed to log the user in, otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(JSON.stringify(req.body))

    db.User.create({
      email:    req.body.email,
      username: req.body.username,
      password: req.body.password
    })
      .then(function() {
        res.redirect(301, "/app"); 
      })
      .catch(function(err) {
        res.redirect(404, "/error");
      });
  });

  // Sign In Route: If the user has valid login credentials, send them to the app page, otherwise send back an error
  app.post("/api/signin", function(req, res) {
    const user_email    = (!req.body.email ? req.body.username : req.body.email);
    const user_password = req.body.password;

    db.User.findOne({
      where: {
        email:    user_email,
        password: user_password
      }
    })
      .then(function(dbUser) {
        // If there's no user with the given email
        if (!dbUser.validUserInfo(user_email, false)) {
          console.log("When a user tries to sign in: Incorrect email.");

          // Redirect to Error page
          res.redirect(404, "/error");
        }
        // If there is a user with the given email, but the password the user gives us is incorrect
        else if (!dbUser.validUserInfo(user_password, true)) {
          console.log("When a user tries to sign in: Incorrect password.");

          // Redirect to Error page
          res.redirect(404, "/error");
        }
        else
          res.json(dbUser);
      })
      .catch(function(err) {
        res.redirect(404, "/error");
      });
  });

  // Sign Out Route
  app.get("/signout", function(req, res) {
    // Redirect to Sign In page
    res.redirect("/signin");
  });
};