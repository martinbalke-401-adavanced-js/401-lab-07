'use strict';

const express = require('express');
const app = express();
const people = require('./routes/people-routes');
const teams = require('./routes/teams-routes');
const middleware = require('./middleware');

//MIDDLEWARE
app.use(express.json());
// Adds a timestamp to requests
app.use(middleware.requestTime);
// //Console logs information about requests
app.use(middleware.logger);
// //Error Handler
// app.use(middleware.error);

// Default Route
app.get('/', (req, res, next) => {
  res.requestTime =res.req.requestTime;
  res.send('Homepage');
});

//Teams and People routes
app.use('/people', people);
app.use('/teams', teams);

//404 route
app.get('*',  (req, res) => {
  res.status(404).send('404 page not found');
});

const start = port => {
  let PORT = port || process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
};

module.exports = {
  server: app,
  start: start,
};
