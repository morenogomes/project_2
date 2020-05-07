$(document).ready(function() {
  // Getting references to form and input
  var signInForm    = $("form#signin");
  var emailInput    = $("input#email-input");
  var passwordInput = $("input#password-input");


  // SIGNIN button is clicked!!
  signInForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email:    emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    // Validate the email and password are NOT blank
    if (!userData.email || !userData.password) {
      return;
    }

    signInUser(userData.email, userData.password);

    // Clear inputs
    emailInput.val("");
    passwordInput.val("");
  });

  // POST method to the signin route. [Successful = Members page | Failed = 404 Page]
  function signInUser(email, password) {
    $.post("/api/signin", {
      email: email,
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