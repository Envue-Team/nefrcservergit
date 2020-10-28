const db = require("../models");
const DBNote = db.note;
// const Op = db.Sequelize.Op;

// Create and Save a new shelter
exports.create = (req, res) => {
  // Validate request
  if (!req.body.text ) {
    res.status(400).send({
      message: "You must have both a note and a type of note"
    });
    return;
  }

  if(!req.body.organizationId) {
	res.status(400).send({
		message: "Notes must be associated with an organization"
	});
	return;
	}

  // Create a note
  const note = {
  text: req.body.text,
  type: req.body.type,
  personId: req.body.personId,
	organizationId: req.body.organizationId
  };

  // Save shelter in the database
  DBNote.create(note)
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

  DBNote.findAll({
    include: 'person'
  })
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

// Retrieve all shelters from the database.
exports.findAllOrganizationNotes = (req, res) => {
  const organizationId = req.params.organizationId
  DBNote.findAllOrganizationNotes({
    where: {organizationId: organizationId},
    include: 'person'
  })
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

  DBNote.findByPk(id,{
    include: 'person'
  })
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

  DBNote.update(req.body, {
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

  DBNote.destroy({
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
  DBNote.destroy({
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

