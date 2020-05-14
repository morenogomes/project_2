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
      .then(function(signup_data) {
        // It's important to signin to get the User ID from the database
        $.post("/api/signin", {
          email:    email,
          password: password
        })
          .then(function(signin_data) {
            localStorage.setItem("anonymus", !signin_data.username ? signin_data.email : signin_data.username);
            localStorage.setItem("uid", signin_data.id);
            window.location.replace("/app");
          })
          .catch(handleLoginError);
      })
      .catch(handleLoginError);
  }

  function handleLoginError(err) {
    localStorage.setItem("skullwarning", `${err.responseJSON.name}: ${err.responseJSON.errors[0].message}`);
    localStorage.setItem("skullstatus", err.status);
    window.location.replace("/error");
  }
});