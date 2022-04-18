const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=ae89679348dcba7e9bf333864ba08493&query=${latitude},${longitude}`;
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to weather service');
    } else {
      if (body.error) {
        callback(`Invalid Query : A valid query is required`);
      } else {
        const current = body.current;
        callback(undefined, {
          temperature: `It is currently ${current.temperature} degrees out but feels like ${current.feelslike}`,
          precipitation: `There is a ${current.precip}% chance of rain today`,
          weather_icon: current.weather_icons,
          desc: current.weather_descriptions[0],
        });
      }
    }
  });
};

module.exports = forecast;
