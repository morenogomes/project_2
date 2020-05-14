$(document).ready(function() {
  // Getting references to form and input
  var signInForm    = $("form.signin");
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
      email:    email,
      password: password
    })
      .then(function(data) {
        localStorage.setItem("anonymus", !data.username ? data.email : data.username);
        localStorage.setItem("uid", data.id);
        window.location.replace("/login");
      })
      .catch(handleLoginError);
  }

  function handleLoginError(err) {
    !err.responseJSON.name ? localStorage.setItem("skullwarning", (err.statusText).toUpperCase()) : localStorage.setItem("skullwarning", `${err.responseJSON.name}: ${err.responseJSON.errors[0].message}`);
    localStorage.setItem("skullstatus", err.status);
    window.location.replace("/error");
  }
});