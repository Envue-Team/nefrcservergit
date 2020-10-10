const db = require("../models");
const DBperson = db.person;
const Op = db.Sequelize.Op;

// Create and Save a new person
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!!"
    });
    return;
  }

  // Create a person
  const person = {
    name: req.body.name,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save person in the database
  DBperson.create(person)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the person."
      });
    });
};

// Retrieve all persons from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  DBperson.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving persons."
      });
    });
};

// Find a single person with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  DBperson.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving person with id=" + id +" err: "+err
      });
    });
};

// Update a person by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  DBperson.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "person was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update person with id=${id}. Maybe person was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating person with id=" + id + " err: " + err
      });
    });
};

// Delete a person with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  DBperson.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "person was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete person with id=${id}. Maybe person was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete person with id=" + id + " err: " + err
      });
    });
};

// Delete all persons from the database.
exports.deleteAll = (req, res) => {
  DBperson.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} persons were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all persons."
      });
    });
};

// Find all published persons
exports.findAllPublished = (req, res) => {
  DBperson.findAll({ where: { published: true } })
    .then(data => {
      console.log("findAll called");
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving persons."
      });
    });
};
