$(".add-song").on("click", function() {
	var videoId = $(this).attr('alt');
	console.log(videoId);
	addToPlaylist(videoId);
});

function addToPlaylist(videoId) {
	$('.play-box').append(videoId);
};