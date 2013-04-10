var app = app || {};

app.LibraryView = Backbone.View.extend({
	el: '.container-fluid',
	events: {
		'click #add':'addBook'
	},
	initialize: function() {
		this.collection = new app.Library();
		this.collection.fetch({reset: true});
		this.render();

		// Listen
		this.collection.on('add', this.renderBook, this);
		this.collection.on('reset', this.render, this);
	},
	render: function() {
		this.collection.each(function(book) {
			this.renderBook(book)
		}, this);
	},
	renderBook: function(book) {
		var bookView = new app.BookView({
			model: book
		});
		this.$el.append(bookView.render().el);
	},
	addBook: function(e) {
		e.preventDefault();
		
		var formData = {};

		$('#addBook').find( 'input' ).each(function(i, el) {
        if($( el ).val() != '')
        {
            if( el.id === 'keywords' ) {
                formData[ el.id ] = [];
                _.each( $( el ).val().split( ' ' ), function( keyword ) {
                    formData[ el.id ].push({ 'keyword': keyword });
                });
            } else if( el.id === 'releaseDate' ) {
                formData[ el.id ] = $( '#releaseDate' ).datepicker( 'getDate' ).getTime();
            } else {
                formData[ el.id ] = $( el ).val();
            }
        }
    });

		this.collection.create(formData);
	}
});