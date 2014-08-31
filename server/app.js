
var express = require("express");

module.exports = function() {
	
	var app = express();

	app.use(express.compress({
		filter: function (req, res) {
			return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
		},
		level: 9
	}));

	app.use(express.favicon());
	app.use(express.static('./public'));

	app.use(app.router);
	
	addRoutes(app)
	
	app.listen(2001);
	
	console.log("Server started listening on port 2001");
};

function addRoutes(app) {
	app.get("/", function(req, res) {
		res.redirect("/index.html");
	});
	
	require(__dirname + "/GeoMgr")(app);
}
