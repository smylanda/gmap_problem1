
var Cache = require("./GeoCache");

var cities, states, zips;

module.exports = function(app) {
	var map = require("../data/Data");
	
	cities = Cache(map.city, "city");
	states = Cache(map.state, "state");
	zips = Cache(map.zip, "zip");

	
	app.get("/city", search(cities));
	app.get("/state", search(states));
	app.get("/zip", search(zips));

}

function search(cache) {
	return function(req, res) {
		var q = req.query;
		
		var x1 = q.x1, y1 = q.y1, x2 = q.x2, y2 = q.y2;
		
		if(!x1 || !x2 || !y1 || !y2) {
			return sendErr(res, "Boundary values x1, y1, x2, y2 are required");
		}
		
		if(x1 > x2) {
			return sendErr(res, "Boundary values invalid x co ordinate x2 should be greater than x1");
		}
		
		if(y1 > y2) {
			return sendErr(res, "Boundary values invalid y co ordinate y2 should be greater than y1");
		}		
		
		var url = "/" + cache.name + "?x1=" + x1 + "&y1=" + y1 + "&x2="+ x2 + "&y2=" + y2;
		
		console.log("searching ... " + url);
		
		var arr = cache.search(x1, y1, x2, y2);
		
		res.send({
			status: 1,
			result: arr
		});
	};
}

function sendErr(res, err) {
	console.log("ERR: " + err);
	
	res.send({
		status: -1,
		err:err
	});
}