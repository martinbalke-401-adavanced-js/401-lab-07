'use strict';
const express = require('express');
const router = express.Router();
let db = require('../db');
const middleware = require('../middleware');

/**
 * Get the people home page of people route
 * @returns - JSON of the the count of people and all of the people in the database
 */
router.get('/', (req, res, next) => {
  let count = db.people.length;
  let results = db.people;
  res.json({ count, results }); // res.send + convert the contents of send to json
});

/**
 * Get route to read a person based on ID
 * @returns - JSON of the person that was found
 */
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  let record = db.people.filter(record => record.id === parseInt(id));
  res.json(record[0]);
});

/**
 * Post route for inserting a person in to the database
 * Also assigns an ID 
 * @returns - JSON of the created person
 */
router.post('/', middleware.peoplePost, (req, res, next) => {
  let record = req.body;
  record.id = Math.random();
  db.people.push(record);
  res.json(record);
});

/**
 * Put route for updating a person based off of their ID
 * @returns - JSON 
 */
router.put('/:id', (req, res, next) => {
  let updated = 'Incorrect ID provided';
  let id = req.params.id;
  let record = req.body;
  let found = db.people.findIndex((person) => person.id === parseInt(id));
  if (found > -1) updated = db.people[found] = record;
  res.json(updated);
});
/**
 * Delete route for removing a person from the database
 * @returns - the removed information as JSON
 */
router.delete('/:id', (req, res, next) => {
  let deleted = 'Incorrect ID provided';
  let id = req.params.id;
  let found = db.people.findIndex((person) => person.id === parseInt(id));
  if (found > -1) deleted = db.people.splice(found, 1);
  res.json(deleted);

});

module.exports = router;