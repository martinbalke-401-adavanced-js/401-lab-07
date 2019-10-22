'use strict';
module.exports = exports = {};


/**
 * Request time middleware
 * Puts a current timestamp on the request object in a property
 * called requestTime
 */
exports.requestTime = (req, res, next) => {
  req.requestTime =  Date.now();
  next();
};


/**
 * Logging middleware
 * Console log the path, method, and requestTime as well the message
 * @param {string} - A message you would like to attach to the request
 */
exports.logger =  (req, res, next) => {
  req.message = 'Yo';
  console.log(`
  Path: ${req.path}
  Method: ${req.method}
  Time: ${req.requestTime}
  Message: ${req.message}
  `);
  next();
};

/**
 * People post middleware
 * route randomly generates boolean on req.valid
 * if req.valid -> create new record. Otherwise force a 500 error
 */
exports.peoplePost = (req, res, next) => {
  let boolean = [true, false];
  req.valid = boolean[Math.floor(Math.random * 2)];
  if(!req.valid) {
    next('Request is not valid');
  }
  next();
};


/**
 * Error Handler
 */
exports.error = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Your request was not valid');
};