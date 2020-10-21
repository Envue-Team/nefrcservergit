const db = require("../models");
const DBPerson = db.person;
const DBPOC = db.pointofcontact;

// Create and Save a new person
exports.create = (req, res) => {
  // Validate request
  if (!req.body.first_name) {
    res.status(400).send({
      message: "A person must have a first name"
    });
    return;
  }

  // Create a person
  const person = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    // organizationId: req.body.organizationId
  };

  // Save person in the database
  DBPerson.create(person)
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

exports.createPOC = (req, res) => {
  // Validate request
  if (!req.body.first_name) {
    res.status(400).send({
      message: "A person must have a first name"
    });
    return;
  }

  // Create a person
  const person = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    // organizationId: req.body.organizationId
  };

  // Save person in the database
  DBPerson.create(person)
    .then(data => {
      
      const point_of_contact = {
        organizationId: req.body.organizationId,
        personId: data.dataValues.id
      }

      DBPOC.create(point_of_contact).then(data =>{
        res.send(data)
      }).catch(err=>{
        res.status(500).send({
          message:
          err.message || "Some error occurred while creating the point of contact."
        });
      });
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
  DBPerson.findAll({
    include :'phones'
  })
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

// // Retrieve all persons from the database.
// exports.findAllPOCS = (req, res) => {
//   DBPerson.findAll({
//     include :'phones'
//   })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving persons."
//       });
//     });
// };

// Find a single person with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  DBPerson.findByPk(id, {include: 'phone'})
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

  DBPerson.update(req.body, {
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

  DBPerson.destroy({
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
  DBPerson.destroy({
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

// Delete all persons from the database.
// exports.deleteAll = (req, res) => {
//   DBPerson.destroy({
//     where: {},
//     truncate: false
//   })
//     .then(nums => {
//       res.send({ message: `${nums} persons were deleted successfully!` });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all persons."
//       });
//     });
// };