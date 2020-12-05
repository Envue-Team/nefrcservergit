const db = require("../models");
const DBEmail = db.email;

// Create and Save a new email number
exports.create = (req, res) => {
  // Validate request
  if (!req.body.address) {
    res.status(400).send({
      message: "You must provide a email address"
    });
    return;
  }

  // Create a email number
  const email = {
    address: req.body.address,
    personId: req.body.personId,
    organisationId: req.body.organisationId,
    isPrimary: req.body.isPrimary
  };

  // Save email number in the database
  DBEmail.create(email)
    .then(data => {
      // console.log(data+" 1");
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the email"
      });
    });
};

// Retrieve all email numbers from the database.
exports.findAll = (req, res) => {

  DBEmail.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving emails."
      });
    });
};

// Find a single email number with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  DBEmail.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving email with id=" + id +" err: "+err
      });
    });
};

// Update a email number by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  DBEmail.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Email was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update email with id=${id}. Maybe email was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating email with id=" + id + " err: " + err
      });
    });
};

// Delete a shelter with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  DBEmail.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Email was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete email with id=${id}. Maybe email was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete email with id=" + id + " err: " + err
      });
    });
};

// Delete all email numbers from the database.
exports.deleteAll = (req, res) => {
  DBEmail.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} emails were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all emails."
      });
    });
};

