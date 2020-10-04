const db = require("../models");
const DBVolunteer = db.volunteer;
const Op = db.Sequelize.Op;

// Create and Save a new Volunteer
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!!"
    });
    return;
  }

  // Create a Volunteer
  const Volunteer = {
    name: req.body.name,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Volunteer in the database
  DBVolunteer.create(Volunteer)
    .then(data => {
      console.log("create called");
      console.log("create data: " + data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Volunteer."
      });
    });
};

// Retrieve all Volunteers from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  DBVolunteer.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Volunteers."
      });
    });
};

// Find a single Volunteer with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  DBVolunteer.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Volunteer with id=" + id +" err: "+err
      });
    });
};

// Update a Volunteer by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  DBVolunteer.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Volunteer was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Volunteer with id=${id}. Maybe Volunteer was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Volunteer with id=" + id + " err: " + err
      });
    });
};

// Delete a Volunteer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  DBVolunteer.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Volunteer was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Volunteer with id=${id}. Maybe Volunteer was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Volunteer with id=" + id + " err: " + err
      });
    });
};

// Delete all Volunteers from the database.
exports.deleteAll = (req, res) => {
  DBVolunteer.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Volunteers were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Volunteers."
      });
    });
};

// Find all published Volunteers
exports.findAllPublished = (req, res) => {
  DBVolunteer.findAll({ where: { published: true } })
    .then(data => {
      console.log("findAll called");
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Volunteers."
      });
    });
};
