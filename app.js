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
  let miliseconds = Date.now();
  // let unix = miliseconds / 1000;
  let dateObj = new Date(miliseconds);
  let utcString = dateObj.toUTCString();
	let resObject = {"unix": miliseconds, "utc": utcString};
  res.json(resObject); 
});

app.get("/api/timestamp/:time", function(req, res) {
  //check wether :time parameter is a unix timestamp (only numbers)
  // regex check for pure numbers
  let regex = /^\d+$/;
  let time = req.params.time;
  let resObject = {
  	"unix": Number,
  	"utc": String
  }
  if (regex.test(time)) {
    //turn unix from params into number and assign it
    let unix = Number(time);
    //turn unix timestamp to miliseconds and create a new date object
    // ************ using moment.js ************
    //let utcString = moment.unix(unix).toDate().toUTCString();
    // ************ without.moment.js ************
    let miliseconds = unix * 1000;
    let dateObj = new Date(miliseconds);
    let utcString = dateObj.toUTCString();
    resObject.unix = unix; //test passed with unix (seconds) returned, instead of miliseconds (not sure why!)
    resObject.utc = utcString; 
    res.json(resObject); 
  } 
  //check wether :time parameter is a valid date
  else if (isNaN(Date.parse(time))) {
 		resObject.error = "Invalid Date";
    console.log(resObject);
  	res.json(resObject);
  } else {
    let miliseconds = Date.parse(time); 
    let dateObj = new Date(miliseconds);
    let utcString = dateObj.toUTCString();
    resObject.unix = miliseconds;
    resObject.utc = utcString;
    res.json(resObject);
  }
});

app.listen("8000", function() {
	console.log("Timestamp listening on 8000!");
})