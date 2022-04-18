const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoidmlrY2FuYWRhOTAiLCJhIjoiY2wxdnI0ajM2MTFwZTNicXY1anMwMmR1dyJ9.DCD2VotdQIKQiDdvRmmUjQ&limit=1`;
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback(`Unable to connect to the Geo-Location service`);
    } else {
      if (body.query.length === 0 || body.features.length === 0) {
        callback('The city name is invalid! ');
      } else {
        const location = body.features;
        callback(undefined, {
          longitude: location[0].center[0],
          latitude: location[0].center[1],
          area: location[0].place_name,
        });
      }
    }
  });
};

module.exports = geocode;
