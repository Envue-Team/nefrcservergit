const { sequelize } = require("../models");
const db = require("../models");
const DBLog = db.activity_log; 
const Op = require('sequelize').Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.entry) {
    res.status(400).send({
      message: "there must be an entry"
    });
    return;
  }

  // Create a record
  const record = {
    entry: req.body.entry,
  };

  // Save record in the database
  DBLog.create(record)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while creating the entry."
    });
  });
};

//get all activity log entries
exports.findAll = (req, res) => {

  DBLog.findAll()
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message:
                  err.message || "Some error occurred while retrieving relationships."
          });
      });
};
  //todo: get activity log entries by keyword
