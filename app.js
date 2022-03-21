
const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
    })



    app.post("/", function(req, res) {
        const apiKey = "04365f2ca1de6e59e806c94b06579814"
        const query = req.body.cityName
        const units = "imperial"
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units
        https.get(url, function(response) {
            console.log(response.statusCode);

            response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The weather is currently " + description + "<p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Fahrenheit.</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send()
            })
        })
    })

    //res.send("Server is up and running.")






app.listen(3000, function() {
    console.log("Server is running on port 3000.");
})
