// Module dependencies
var application_root = __dirname,
	express = require('express'), // Web framework
	path = require('path'), // Utilities for dealing with file paths
	mongoose = require('mongoose'); // Mongodb integration

// Create server
var app = express();

// Configure server
app.configure(function() {
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(application_root, 'site')));
	app.use(express.errorHandler({dumpExceptions: true, showStack: true }));
});

// Start server
var port = 4711;
app.listen(port, function() {
	console.log("Express server listening on port %d in %s mode", port, app.settings.env);
});

// Connect to database
mongoose.connect('mongodb://user:nintendo@ds057847.mongolab.com:57847/backbone_library');

// Schemas
var Keywords = new mongoose.Schema({
	keyword: String
});

var Book = new mongoose.Schema({
	title: String,
	author: String,
	releaseDate: Date,
	keywords: [Keywords]
});

// Models
var BookModel = mongoose.model('Book', Book);

// Get a list of all books
app.get('/api/books', function(request, response) {
	return BookModel.find(function(err, books) {
		if(!err) {
			return response.send(books);
		} else {
			return console.log(err);
		}
	});
});

// Insert a new book
app.post('/api/books', function(request, response) {
	var book = new BookModel({
		title: request.body.title,
		author: request.body.author,
		releaseDate: request.body.releaseDate,
		keywords: request.body.keywords
	});
	book.save(function(err) {
		if(!err) {
			return console.log('created');
		} else {
			return console.log(err);
		}
	});
	return response.send(book);
});

// Get a single book by id
app.get('/api/books/:id', function(request, response) {
	return BookModel.findById(request.params.id, function(err, book) {
		if(!err) {
			return response(book);
		} else {
			return console.log(err);
		}
	});
});

// Update a book
app.put('/api/books/:id', function(request, response) {
	console.log('Updating book ' + request.body.title);
	return BookModel.findById(request.params.id, function(err, book) {
		book.title = request.body.title;
		book.author = request.book.author;
		book.releaseDate = request.body.releaseDate;
		book.keywords = request.body.keywords;

		return book.save(function(err) {
			if(!err) {
				console.log('book updated');
			} else {
				console.log(err);
			}
			return response.send(book);
		});
	});
});

// Delete a book
app.delete('/api/books/:id', function(request, response) {
	console.log('Deleting book with id: ' + request.params.id);
	return BookModel.findById(request.params.id, function(err, book) {
		return book.remove(function(err) {
			if(!err) {
				console.log('book removed');
				return response.send('');
			} else {
				console.log(err);
			}
		});
	});
});