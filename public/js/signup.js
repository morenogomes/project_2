$(document).ready(function() {
  // Getting references to form and input
  var signUpForm    = $("form.signup");
  var emailInput    = $("input#email-input");
  var usernameInput = $("input#username-input");
  var passwordInput = $("input#password-input");


  // SIGNUP button is clicked!!
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    
    var userData = {
      email:    emailInput.val().trim(),
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim()
    };

    console.log(`Email: ${userData.email}  |  Username: ${userData.username}  |  Password: ${userData.password}`)
    // Validate the email and password are NOT blank
    if (!userData.email || !userData.password) {
      return;
    }

    signUpUser(userData.email, userData.username, userData.password);

    // Clear inputs
    emailInput.val("");
    usernameInput.val("");
    passwordInput.val("");
  });

  // POST method to the signup route. [Successful = Members page | Failed = 404 Page]
  function signUpUser(email, username, password) {
    console.log("Now it's time to INSERT info into the database")
    $.post("/api/signup", {
      email: email,
      username: username,
      password: password
    })
      .then(function(data) {
        window.location.replace("/app");
      })
      .catch(handleLoginError);
  }

  function handleLoginError(err) {
    console.log(err);
    console.log(err.responseJSON);
    window.location.replace("/error");
  }
});