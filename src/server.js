const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//Port
const port = process.env.PORT || 3000;

//Express config for views
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Handlebars Engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Vikram Kumar',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: `A valid search term must be provided`,
    });
  }

  const address = req.query.search;
  geocode(address, (error, { latitude, longitude, area } = {}) => {
    if (error) {
      return res.send({ error });
    } else {
      forecast(latitude, longitude, (error, forecastData = {}) => {
        if (error) {
          return res.send({ error });
        } else {
          res.send({
            forecast: forecastData,
            location: area,
            address: req.query.address,
          });
        }
      });
    }
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Vikram Kumar',
    text: 'Node JS/Express/React Engineer',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Vikram Kumar',
    text: 'This is the help page',
  });
});

app.get('/help/*', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Vikram Kumar',
    text: 'The help article you are trying to find is not available',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Not Found',
    name: 'Vikram Kumar',
    text: 'The page you are trying to find is not available',
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
