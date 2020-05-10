$(document).ready( function() {
  const SONG   = 1;
  const ARTIST = 2;
  const ALBUM  = 3;
  let playlistInfo;

  // Getting which user is Signed In (from localStorage) and updating the HTML
  // =============================================================
  $("#user-name").append(`<span class="thumb-sm avatar pull-right m-t-n-sm m-b-n-sm m-l-sm"> 
                             <img src="images/p@icon2.jpg" alt="..."> 
                             <i class="on b-white"></i> 
                          </span>
                            ${localStorage.getItem("anonymus")}`);
  $("#user-signed-in").append(`<span class="pull-right">
                                 <i class="fab fa-teamspeak"></i>
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


  // Jquery Functions
  // =============================================================  
  $('#artists').keypress(function(event){
    playlistInfo  = ''; // Important!! Always clear the variable
    const keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      $('#btn-search').click();

      $.post("/api/searchartist", {
        artist: $('#artists').val().trim()
      })
        .then(function(data) {
          const $name  = `<div class="namer"><b>Artist: </b><span>${data.artists.items[0].name.toUpperCase()}</span></div>`;
          const $image = $("<img>").attr("src", data.artists.items[0].images[0].url).attr("style", "height: 250px; width: 250px");
          const $genre = `<div class="namer"><i>Genre: <span>${data.artists.items[0].genres[0].toUpperCase()}</span></i></div>`;
 
          // Global object that will hold the information of user's search
          playlistInfo = {
            type   : ARTIST,
            field1 : data.artists.items[0].name.toUpperCase(),
            field2 : data.artists.items[0].images[0].url,
            field3 : data.artists.items[0].genres[0].toUpperCase()
          }
          
          // Removes previous search
          clearSearch();

          // Appending the response from the API into the modal
          appendResponse($name, $image, $genre);

          $('#artists').val('');
        })
      }
  });

  $('#songs').keypress(function(event){
    playlistInfo  = ''; // Important!! Always clear the variable
    const keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      $('#btn-search').click();

      $.post("/api/searchsong", {
        song: $('#songs').val().trim()
      })
        .then(function(data) {
          const $name   = `<div class="namer"><b>Song: </b><span>${data.tracks.items[0].name.toUpperCase()}</span></div>`;
          const $image  = $("<img>").attr("src", data.tracks.items[0].album.images[0].url).attr("style", "height: 250px; width: 250px");
          const $artist = `<div class="namer"><b>Artist: </b><span>${data.tracks.items[0].album.artists[0].name.toUpperCase()}</span></div>`;

          // Global object that will hold the information of user's search
          playlistInfo = {
            type   : SONG,
            field1 : data.tracks.items[0].name.toUpperCase(),
            field2 : data.tracks.items[0].album.artists[0].name.toUpperCase(),
            field3 : data.tracks.items[0].album.images[0].url,
            field4 : data.tracks.items[0].uri
          }

          // Removes previous search
          clearSearch();

          // Appending the response from the API into the modal
          appendResponse($name, $image, $artist);

          $('#songs').val('');
        })
    }
  });

  $('#albums').keypress(function(event){
    playlistInfo  = ''; // Important!! Always clear the variable
    const keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      $('#btn-search').click();

      $.post("/api/searchalbum", {
        album: $('#albums').val().trim()
      })
        .then(function(data) {
          const $album = `<div class="namer"><b>Album: </b><span>${data.albums.items[0].name.toUpperCase()}</span></div>`;
          const $image = $("<img>").attr("src", data.albums.items[0].images[0].url).attr("style", "height: 250px; width: 250px");
          const $name  = `<div class="namer"><b>Artist: </b><span>${data.albums.items[0].artists[0].name.toUpperCase()}</span></div>`;

          // Global object that will hold the information of user's search
          playlistInfo = {
            type   : ALBUM,
            field1 : data.albums.items[0].name.toUpperCase(),
            field2 : data.albums.items[0].images[0].url,
            field3 : data.albums.items[0].artists[0].name.toUpperCase()
          }

          // Removes previous search
          clearSearch();

          // Appending the response from the API into the modal
          appendResponse($album, $image, $name);

          $('#albums').val('');
        })
    }
  });

  $('#add-playlist').on('click', function(e){
    // POST method to the add-playlist route. [Successful = Playlist page | Failed = 404 Page]
    $.post("/api/addplaylist", playlistInfo)
      .then(function() {
        $("#playlist_1").click(); // IDK why is not working?! - Please take a look at this!!

        // Informs if the information was added to the Playlist with success or Shows an error
        // $('#btn-modal-response').click();
      })
      .catch(handleAddPlaylistError);
  })

  // General Jquery Functions
  // ============================================================= 
  function clearSearch() {
    $("#name").empty(); 
    $('#img').empty();
    $("#tittle").empty();
  }

  function appendResponse(name, image, tittle){
    $("#name").append(name); 
    $('#img').append(image);
    $("#tittle").append(tittle);
  }

  function handleAddPlaylistError(err) {
    !err.responseJSON.name ? localStorage.setItem("skullwarning", (err.statusText).toUpperCase()) : localStorage.setItem("skullwarning", `${err.responseJSON.name}: ${err.responseJSON.errors[0].message}`);
    localStorage.setItem("skullstatus", err.status);
    window.location.replace("/error");
  }
  
  // Building Customized User Page Dynamically
  // =============================================================
  $("#playlist_1").on('click', function(e){
    event.preventDefault();
    $("#page-target").empty();
    $("#page-target").css("background-color", "#F3F4F8");
    $("#page-target").append(
      `<h2 class="font-thin m-b">Playlist </h2>
      <div class="row row-sm">
        <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2">
          <div class="item">
            <div class="pos-rlt">
              <div class="item-overlay opacity r r-2x bg-black">
                <i class="center text-center m-t-n far fa-question-circle i-5x"></i>
              </div>
              <a href="">
                <img src="images/p_empty.jpg" alt="..." class="r r-2x img-full">
              </a>
            </div>
            <div class="padder-v">
              <a href="" class="text-ellipsis">? Song</a>
              <a href="" class="text-ellipsis text-xs text-muted">? Artist</a>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-7">
          <h3 class="font-thin">Artists</h3>
          <div class="row row-sm">
            <div class="col-xs-6 col-sm-3">
              <div class="item">
                <div class="pos-rlt">
                  <div class="item-overlay opacity r r-2x bg-black">
                    <i class="center text-center m-t-n far fa-question-circle i-5x"></i>
                  </div>
                  <img src="images/p@icon_empty.jpg" alt="..." class="r r-2x img-full">
                </div>
                <div class="padder-v">
                  <a href="" class="text-ellipsis">? Artist</a>
                  <a href="" class="text-ellipsis text-xs text-muted">? Genre</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-5">
          <h3 class="font-thin">Albums</h3>
          <div class="list-group bg-white list-group-lg no-bg auto">
            <div class="list-group-item clearfix">
              <span class="pull-left thumb-sm avatar m-r">
                <img src="images/p@icon_empty.jpg" alt="...">
              </span>
              <span class="clear">
                <span>? Album</span>
                <small class="text-muted clear text-ellipsis">? Artist</small>
              </span>
            </div>
          </div>
        </div>
      </div>`
    )
  });
  
})
