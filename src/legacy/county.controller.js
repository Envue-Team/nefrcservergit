const db = require("../models");
const DBCounty = db.county;
// const Op = db.Sequelize.Op;

// Create and Save a new shelter
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name ) {
    res.status(400).send({
      message: "You must have a county name"
    });
    return;
  }

  // Create a shelter
  const county = {
  name: req.body.name,
  };

  // Save shelter in the database
  DBCounty.create(county)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the county."
      });
    });
};

// Retrieve all shelters from the database.
exports.findAll = (req, res) => {

  DBCounty.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving shelters."
      });
    });
};

// Find a single shelter with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  DBCounty.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving shelter with id=" + id +" err: "+err
      });
    });
};

// Update a shelter by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  DBCounty.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "County was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update county with id=${id}. Maybe county was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating shelter with id=" + id + " err: " + err
      });
    });
};

// Delete a county with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  DBCounty.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "county was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete county with id=${id}. Maybe county was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete county with id=" + id + " err: " + err
      });
    });
};

// Delete all counties from the database.
exports.deleteAll = (req, res) => {
  DBCounty.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} counties were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all shelters."
      });
    });
};

