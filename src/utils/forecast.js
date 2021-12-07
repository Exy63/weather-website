const axios = require("axios");

const forecast = (address, callback) => {
  const apikey = "206fd832bb61743b890f95f9ca6f9853";

  const url =
    `http://api.weatherstack.com/current?access_key=${apikey}&query=` +
    encodeURIComponent(address);

  axios
    .get(url)
    .then(function ({ data }) {
      // handle success
      const { temperature, feelslike, weather_descriptions } = data.current;

      callback(
        `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`
      );
    })
    .catch(function (e) {
      // handle error
      callback({error: e});;
    });
};

module.exports = forecast;
