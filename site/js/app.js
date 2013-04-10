var app = app || {};

$(document).ready(function() {

	// Datepicker
	$( '#releaseDate' ).datepicker();

	// Initialize
    new app.LibraryView();


});