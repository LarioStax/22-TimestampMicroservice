//initial config
const express = require("express");
const app = express();
const moment = require("moment");

// enable CORS so API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static("public"));

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/views/index.html");;
})

app.get("/api/hello", function(req, res) {
	res.json({greeting: "Hello API"});
})

app.get("/api/timestamp/:time", function(req, res) {
	console.log(req.params.time);
	res.json(req.params.time);
})

app.listen("8000", function() {
	console.log("Timestamp listening on 8000!");
})