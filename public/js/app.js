$(document).ready( function() {
  // Getting which user is Signed In (from localStorage) and updating the HTML
  // =============================================================
  $("#user-name").append(`<span class="thumb-sm avatar pull-right m-t-n-sm m-b-n-sm m-l-sm"> 
                              <img src="images/p@icon2.jpg" alt="..."> 
                              <i class="on b-white"></i> 
                            </span>
                            ${localStorage.getItem("anonymus")}`);

  // Making object dynamics
  // =============================================================
  // Function to collapse NavBar
  $(document).on('click','[data-toggle^="class"]', function(e){
    e && e.preventDefault();
    var $this = $(e.target), $class, $target, $tmp, $classes, $targets;
    !$this.data('toggle') && ($this = $this.closest('[data-toggle^="class"]'));
    $class = $this.data()['toggle'];
    $target = $this.data('target') || $this.attr('href');
    $class && ($tmp = $class.split(':')[1]) && ($classes = $tmp.split(','));
    $target && ($targets = $target.split(','));

    $classes && $classes.length && $.each($targets, function(index, value){
      if($classes[index].indexOf('*') !== -1){
        var patt = new RegExp('\\s' + $classes[index].replace(/\*/g,'[A-Za-z0-9-_]+').split(' ').join('\\s|\\s')+'\\s','g');
        $($this).each(function(i, it){
          var cn = ' ' + it.className + ' ';
          while(patt.test(cn)){
            cn = cn.replace(patt, ' ');
          }
          it.className = $.trim(cn);
        });
      }
      ($targets[index] != '#') && $($targets[index]).toggleClass($classes[index]) || $this.toggleClass($classes[index]);
    });
    $this.toggleClass('active');
  });

  // Function to Show Search Input
  $(document).on('click','[data-ride="collapse"] a', function(e){
    var $this = $(e.target), $active;
    $this.is('a') || ($this = $this.closest('a'));
    $active = $this.parent().siblings(".active");
    $active && $active.toggleClass('active').find('> ul:visible').slideUp(200);
    ($this.parent().hasClass('active') && $this.next().slideUp(200)) || $this.next().slideDown(200);
    $this.parent().toggleClass('active');
    $this.next().is('ul') && e.preventDefault();

    setTimeout(function(){
      $(document).trigger('updateNav');
    }, 300);
  });


  // API Routes
  // =============================================================
  
})

//leeroy

function artitsSearch(userInput) {
  var queryURL = baseURL + userInput;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response)
  })
}

$('#artists').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
       console.log($('#artists').val());
       artistSearch(userInput)
    }
});
$('#songs').keypress(function(event){
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if(keycode == '13'){
     console.log($('#songs').val());
  }
});
$('#albums').keypress(function(event){
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if(keycode == '13'){
     console.log($('#albums').val());
  }
});
