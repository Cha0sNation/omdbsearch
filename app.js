var express = require("express");
var app 	= express();
var request = require("request");

app.set("view engine", "ejs");
app.use(express.static("public"));


app.get("/", function(req, res) {
	res.render("home");
});

app.get("/search", function(req, res){
	var query = req.query.name;
	var url = "http://www.omdbapi.com/?apikey=b31b7062&";
	var nameSearch = url + "s=" + query;
	var idSearchResults = [];
	var idSearch = url + "i=";
	/* jshint ignore:start */
	request(nameSearch, searchDB());
	async function searchDB(err, res, body){
		if(!err && res.statusCode == 200){
			let nameSearchResultsUprc = await JSON.parse(body);
			var nameSearchResults = nameSearchResultsUprc["Search"];
			nameSearchResults.forEach(async function(movie){
				await request(idSearch + nameSearchResults[x]["imdbID"], async function(err, res, body){
					if(!error && response.statusCode == 200){
						idSearchResults[x] =  await JSON.parse(body);
						nameSearchResults[x] = await idSearchResults[x];
					}
				}
				);
			}
			);
		}
	}
	res.render("home", {movie: nameSearchResults});
	/* jshint ignore:end */
});



app.get("*", function(req, res) {
	res.send("Sorry, page not found... What are you doing with your life?");
});
app.listen(3000, function(){
	console.log("Server Started");
});