// Dependencies
let express = require("express");
let path = require("path");

// Setting up Express App
let app = express();
let PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Data
let tables = [];
let waitList = [];

//GETs and POSTs
//===============================================
//GET -- Home
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "home.html"));
})

//GET -- Tables API
app.get("/api/tables", (req, res) => {
    return res.json(tables);
})

//GET -- Waiting list API
app.get("/api/waitlist", (req, res) => {
    return res.json(waitList);
})

//GET -- Tables screen
app.get("/tables", (req, res) => {
    res.sendFile(path.join(__dirname, "tables.html"));
})

//GET -- Reserve table screen
app.get("/reserve", (req, res) => {
    res.sendFile(path.join(__dirname, "reserve.html"));
})

//POST -- Add to tables or wait list
app.post("/reserve", (req, res) => {
    //Reservation info
    let reservation = req.body;
    console.log(reservation);
    if(tables.length < 5) {
        tables.push(reservation);
        return res.json(true);
    } else {
        waitList.push(reservation);
        return res.json(false);
    }
})

//DELETE -- Delete all reservations
app.delete("/tables", (req, res) => {
    tables = [];
    waitList = [];
})
//===============================================

// Starts the server to begin listening
app.listen(PORT, () => {
    console.log("App listening on port " + PORT);
})