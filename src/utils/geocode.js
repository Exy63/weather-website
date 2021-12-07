const axios = require("axios");

const geocode = (address, callback) => {
  const apikey =
    "pk.eyJ1IjoiZXh5NjMiLCJhIjoiY2t1dWM2djJ0MGN1czJ2cW81bmRuNXU0ZCJ9.WQXgiVBiXkaCActwOsZK4w";

  const url =
    `https://api.mapbox.com/geocoding/v5/mapbox.places/` +
    encodeURIComponent(address) +
    `.json?access_token=${apikey}&limit=1`;

  axios
    .get(url)
    .then(function ({ data }) {
      // handle success
      const {
        place_name: location,
        center: [longitude, latitude],
      } = data.features[0];

      callback({
        latitude,
        longitude,
        location,
      });
    })
    .catch(function (e) {
      // handle error
      callback({ error: e });
    });
};

module.exports = geocode;
