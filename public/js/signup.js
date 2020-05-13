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
    $.post("/api/signup", {
      email:    email,
      username: username,
      password: password
    })
      .then(function(data) {
        localStorage.setItem("anonymus", !data.username ? data.email : data.username);
        localStorage.setItem("uid", data.id);
        window.location.replace("/app");
      })
      .catch(handleLoginError);
  }

  function handleLoginError(err) {
    localStorage.setItem("skullwarning", `${err.responseJSON.name}: ${err.responseJSON.errors[0].message}`);
    localStorage.setItem("skullstatus", err.status);
    window.location.replace("/error");
  }
});