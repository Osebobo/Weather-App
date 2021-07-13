const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

  const apiKey = "e84861b2b22b6e2429ce7cd12e9aa7ac";
  const city = req.body.cname;
  const units = req.body.units;

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid="+ apiKey +"&units=" + units;

  https.get(url, (response) => {
    console.log("statusCode:", response.statusCode);

    response.on('data', (data) => {

      const weather_data = JSON.parse(data); //convert the json to object

      const weather_decription = weather_data.weather[0].description;
      const weather_temp = weather_data.main.temp;
      const imageURL = "http://openweathermap.org/img/wn/" + weather_data.weather[0].icon + "@2x.png";

      res.write("<br> <p> The weather condition in " + city + " is currently " + weather_decription +" </p>");
      res.write("<h1> The Temperature in " + city + " is " + weather_temp + " degrees " + units + "</h1>");
      res.write("<img src="+ imageURL +">");
      res.write("<br> <p> Where metric stands for Celcius and imperial stands for Fahrenheit. </p>");
      res.send();

    });

  });
});






app.listen(3000, function() {
  console.log("Express app listening at http://localhost:3000");
});
