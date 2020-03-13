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

//return current time in unix and utc
app.get("/api/timestamp/", function(req, res) {
  let milliseconds = Date.now();
  //create a new date object from milliseconds and convert it to a string using the UTC timezone
  let utcString = new Date(milliseconds).toUTCString();
	let resObject = {"unix": milliseconds, "utc": utcString};
  res.json(resObject); 
});

app.get("/api/timestamp/:time", function(req, res) {
  let time = req.params.time;
  let resObject = {}; 
  //check wether :time parameter is a unix timestamp (only numbers)
  //regex check --> only numbers
  let regex = /^\d+$/;

  if (regex.test(time)) {
    //turn unix from params into number and assign it to a variable
    let unix = Number(time);
    //turn unix timestamp to milliseconds
    let milliseconds = unix * 1000;
    //create a new date object from milliseconds and convert it to a string using the UTC timezone
    let utcString = new Date(milliseconds).toUTCString();
    resObject.unix = unix; //test passed with unix (seconds) returned, instead of milliseconds (not sure why!)
    resObject.utc = utcString; 
  } 
  //check wether :time parameter is a valid date
  else if (isNaN(Date.parse(time))) {
 		resObject.error = "Invalid Date";
  } else {
    let milliseconds = Date.parse(time); 
    //create a new date object from milliseconds and convert it to a string using the UTC timezone
    let utcString = new Date(milliseconds).toUTCString();
    resObject.unix = milliseconds;
    resObject.utc = utcString;
  }
  res.json(resObject); //respond with the filled object
});

app.listen(process.env.PORT, function() {
	console.log("Timestamp listening on " + process.env.PORT + "!");
});