$(document).ready( function() {
  // Getting which user is Signed In (from localStorage) and updating the HTML
  // =============================================================
  $('#code-status').append(localStorage.getItem('skullstatus'));
  $('#error-skull').append(localStorage.getItem('skullwarning'));
})