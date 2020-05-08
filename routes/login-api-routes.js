// Set of routes for displaying and saving data to the database
// =============================================================

// Requiring models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  // Sign Up Route: If the user is created successfully, proceed to log the user in, otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email:    req.body.email,
      username: req.body.username,
      password: req.body.password
    })
      .then(function() {
        res.json({email: req.body.email, username: req.body.username});
      })
      .catch(function(err) {
        res.status(401).json(err);
        // res.redirect(404, "/error");
      });
  });

  // Sign In Route: If the user has valid login credentials, send them to the app page, otherwise send back an error
  app.post("/api/signin", function(req, res) {
    const user_email    = req.body.email;
    const user_password = req.body.password;

    if (user_email.search("@") < 0 && user_email.length > 0) {
      condition = {
        where: {
          username: user_email,
          password: user_password
        }
      }
    }
    else {
      condition = {
        where: {
          email:    user_email,
          password: user_password
        }
      }
    }

    db.User.findOne(condition)
      .then(function(dbUser) {
        // If there's no user with the given email
        if (!dbUser.validUserInfo(user_email, false)) {
          console.log("Incorrect email.");

          // Redirect to Error page
          res.status(404).json(err);
        }
        // If there is a user with the given email, but the password the user gives us is incorrect
        else if (!dbUser.validUserInfo(user_password, true)) {
          console.log("Incorrect password.");

          // Redirect to Error page
          res.status(404).json(err);
        }
        else
          res.json(dbUser);
      })
      .catch(function(err) {
        res.status(404).json(err);
      });
  });

  // Sign Out Route
  app.get("/signout", function(req, res) {
    // Redirect to Sign In page
    res.redirect("/signin");
  });
};