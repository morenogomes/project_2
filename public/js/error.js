$(document).ready( function() {
  // Getting error messages (from localStorage) and updating the HTML
  // =============================================================
  $('#code-status').append(localStorage.getItem('skullstatus'));
  $('#error-skull').append(localStorage.getItem('skullwarning'));
})