const db = require("../models");
const DBPhone = db.phone;

// Create and Save a new phone number
exports.create = (req, res) => {
  // Validate request
  if (!req.body.number) {
    res.status(400).send({
      message: "You must provide a phone numer"
    });
    return;
  }

  // Create a phone number
  const phone = {
    number: req.body.number,
    personId: req.body.personId,
    organizationId: req.body.organizationId,
    isPrimary: req.body.isPrimary,
  };

  // Save phone number in the database
  DBPhone.create(phone)
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

// Retrieve all phone numbers from the database.
exports.findAll = (req, res) => {

  DBPhone.findAll()
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

// Find a single phone number with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  DBPhone.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving phone number with id=" + id +" err: "+err
      });
    });
};

// Update a phone number by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  DBPhone.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "phone numbers was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update phone number with id=${id}. Maybe shelter was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating phone number with id=" + id + " err: " + err
      });
    });
};

// Delete a shelter with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  DBPhone.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "phone number was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete shelter with id=${id}. Maybe phone number was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete phone number with id=" + id + " err: " + err
      });
    });
};

// Delete all phone numbers from the database.
exports.deleteAll = (req, res) => {
  DBPhone.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} phone numbers were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all phone numbers."
      });
    });
};

