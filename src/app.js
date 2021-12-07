const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Ilya Prikazchikov",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Ilya Prikazchikov",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text",
    name: "Ilya Prikazchikov",
    title: "Help",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      errorMessage: "You must provide an address",
    });
  }

  geocode(req.query.address, ({ latitude, longitude, location, error }) => {
    if (error) {
      res.send({
        forecast: "",
        location: "Unable to find location. Try another search",
      });
    } else {
      forecast(location, (currentForecast) => {
        res.send({
          forecast: currentForecast,
          location,
          address: req.query.address,
        });
      });
    }
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    throw new Error("You must provide a search term");
  }

  console.log(req.query);
  res.send({
    products: [],
    query: req.query,
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    errorMessage: "Help Article Not Found",
    name: "Ilya Prikazchikov",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    errorMessage: "Page Not Found",
    name: "Ilya Prikazchikov",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
