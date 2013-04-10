var app = app || {};

$(document).ready(function() {

	// Datepicker
	$( '#releaseDate' ).datepicker();

	// Initialize
    new app.LibraryView();

	// Upload button
	$('#uploadBtn').on('click', function() {
		$('#coverImage').trigger('click');
	});
});