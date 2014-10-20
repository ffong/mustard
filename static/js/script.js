var ytplayer;

function addToPlaylist(videoId) {
	$('.play-box').append(videoId);
	// embed player 
	initYTPlayer(videoId);
};

function onYouTubePlayerReady() {
	ytplayer = document.getElementById("myytplayer");
	ytplayer.playVideo();
}

function play() {
	if (ytplayer) {
		events.push('playVideo();');
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
}

$(document).ready(function() {
	$(".add-song").on("click", function() {
		var videoId = $(this).attr('alt');
		addToPlaylist(videoId);		
	});

	
});