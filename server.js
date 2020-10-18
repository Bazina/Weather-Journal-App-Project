// Setup empty JS object to act as endpoint for all routes
projectData = {};

/* Require Express to run server and routes, Dependencies */
const express = require("express");
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server

// Port number
const port = 3000;

// listens when the server is running
app.listen(port, () => {
    console.log(`Server is running on localhost ${port}`)
});

// Get Route
app.get("/all", (req, res) => {
    res.send(projectData);
});

// Post Route
const data = [];
app.post("/addData", addData);

function addData(req, res) {
    projectData.date = req.body.date;
    projectData.temperature = req.body.main.temp;
    projectData.feelings = req.body.content;
    res.send(projectData);
    console.log(projectData);
}