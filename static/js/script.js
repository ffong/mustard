var ytplayer;

function addInfoToPlaylist(result) {
	var title = $(result).find('span:first').text();
	// $(".playlist").append(
	// 	title
	// );
}

function addToPlaylist(result) {
	addInfoToPlaylist(result);
	var videoId = $(result).find('.add-song').attr('alt')
	initYTPlayer(videoId);
};

function onYouTubePlayerReady() {
	$(".spinner").remove();
	ytplayer = $("#myytplayer");
	ytplayer.playVideo();
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