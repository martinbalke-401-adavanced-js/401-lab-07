'use strict';
const express = require('express');
const router = express.Router();
let db = require('../db');

/**
 * Get the teams home page of teams route
 * @returns - JSON of the the count of teams and all of the teams in the database
 */
router.get('/', (req, res, next) => {
  let count = db.teams.length;
  let results = db.teams;
  res.json({ count, results }); // res.send + convert the contents of send to json
});

/**
 * Get route to read a team based on ID
 * @returns - JSON of the team that was found
 */
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  let record = db.teams.filter(record => record.id === parseInt(id));
  res.json(record[0]);
});

/**
 * Post route for inserting a team in to the database
 * Also assigns an ID 
 * @returns - JSON of the created team
 */
router.post('/', (req, res, next) => {
  let record = req.body;
  record.id = Math.random();
  db.teams.push(record);
  res.json(record);
});

/**
 * Put route for updating a team based off of their ID
 * @returns - JSON 
 */
router.put('/:id', (req, res, next) => {
  let updated = 'Incorrect ID provided';
  let id = req.params.id;
  console.log(id);
  let record = req.body;
  let found = db.teams.findIndex((team) => team.id === parseInt(id));
  console.log(found);
  if (found > -1) updated = db.teams[found] = record;
  res.json(updated);
});

/**
 * Delete route for removing a team from the database
 * @returns - the removed information as JSON
 */
router.delete('/:id', (req, res, next) => {
  let deleted = 'Incorrect ID provided';
  let id = req.params.id;
  let found = db.teams.findIndex((team) => team.id === parseInt(id));
  if (found > -1) deleted = db.teams.splice(found, 1);
  res.json(deleted);

});

module.exports = router;