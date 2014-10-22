var ytplayer = false;
var playlist = [];
var index = 0;
var state = -10;

function updateProgressBar() {
	if (state == 1) {
		window.setInterval(function() {
			bar = $(".progress");	
			elapsed_time = (ytplayer.getCurrentTime() / 60).toPrecision(5).split('.').join(':');
			$('.time').html(elapsed_time);
			var progress = ytplayer.getCurrentTime() / ytplayer.getDuration() * 100;
			bar.val(progress);
		}, 1000);
	}
}

function seekProgressBar() {
	seek_val = ($(".progress").val() / 100)　* ytplayer.getDuration();
	ytplayer.seekTo(seek_val);
}

function addInfoToPlaylist(result) {
	var title = $(result).find('span:first').text();
	$(".playlist").append(
		"<li>" + title + "</li>"
	);
}

function addToPlaylist(result) {
	var videoId = $(result).find('.add-song').attr('alt')
	addInfoToPlaylist(result);
	playlist.push(videoId);

	// not initialized yet
	if (!ytplayer) { 
		initYTPlayer(videoId); 
	} else if (ytplayer.getPlayerState() == 0) {
	// stopped right now
		nextSong();
	} 

};

function onYouTubePlayerReady() {
	$(".spinner").remove();
	ytplayer = document.getElementById("myytplayer"); // doesn't work with jquery?
	ytplayer.addEventListener("onStateChange", "nextSong"); 
	state = ytplayer.getPlayerState();
	play();
}

function nextSong(new_state) {
	state = new_state;
	if (state == 0) {
		// if ended
		if (playlist.length == index) {
			console.log('No more songs.');
		} else {
			index += 1;
			console.log('Loading next song.')
			ytplayer.loadVideoById(playlist[index]);
		}
	} 

	updateProgressBar();
}

function play() {
	if (ytplayer) {
		ytplayer.playVideo();
	}
}

function pause() {
	if (ytplayer) {
		ytplayer.pauseVideo();
	}
}

function initYTPlayer(videoId) {
	var params = { allowScriptAccess: "always" };
    var atts = { id: "myytplayer" };
    var videourl = "http://www.youtube.com/v/" + videoId + "?enablejsapi=1&playerapiid=ytplayer&version=3"
    swfobject.embedSWF(videourl, "ytapiplayer", "425", "356", "8", null, null, params, atts);

    // start the spinner
    $(".controls").append(
    	"<div class=\"spinner\"> \
  		<div class=\"double-bounce1\"></div> \
  		<div class=\"double-bounce2\"></div> \
		</div>");
}

$(document).ready(function() {
	$(".add-song").on("click", function() {
		addToPlaylist(this.parentElement);		
	});


});