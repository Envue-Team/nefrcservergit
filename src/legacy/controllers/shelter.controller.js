const db = require("../models");
//TODO: Change to db.organization when organization is complete
const DBShelter = db.shelter;
const Op = db.Sequelize.Op;

// Create and Save a new shelter
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: req.body.name
    });
    return;
  }

  // Create a shelter
  const shelter = {
    name: req.body.name,
    street_name: req.body.street_name,
    street_number: req.body.strett_number,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip
  };

  // Save shelter in the database
  DBShelter.create(shelter)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the shelter."
      });
    });
};

// Retrieve all shelters from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  DBShelter.findAll({ where: condition })
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

  DBShelter.findByPk(id)
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

  DBShelter.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "shelter was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update shelter with id=${id}. Maybe shelter was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating shelter with id=" + id + " err: " + err
      });
    });
};

// Delete a shelter with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  DBShelter.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "shelter was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete shelter with id=${id}. Maybe shelter was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete shelter with id=" + id + " err: " + err
      });
    });
};

// Delete all shelters from the database.
exports.deleteAll = (req, res) => {
  DBShelter.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} shelters were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all shelters."
      });
    });
};

// Find all published shelters
exports.findAllPublished = (req, res) => {
  DBShelter.findAll({ where: { published: true } })
    .then(data => {
      console.log("findAll called");
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving shelters."
      });
    });
};
