const { sequelize } = require("../models");
const db = require("../models");
const DBPerson = db.person;
const DBPOC = db.pointofcontact;
const DBUser = db.user;
const DBRole = db.role;
const DBPhone = db.phone;
const Op = require('sequelize').Op;

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
    street_number: req.body.street_number,
    street_name: req.body.street_name,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    county: req.body.county,
    person_notes: req.body.person_notes,
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

//Point of Contact should only involve manipulating table relationships
// exports.createPOC = (req, res) => {
//   // Validate request
//   if (!req.body.first_name) {
//     res.status(400).send({
//       message: "A person must have a first name"
//     });
//     return;
//   }
//
//   // Create a person
//   const person = {
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     street_number: req.body.street_number,
//     street_name: req.body.street_name,
//     city: req.body.city,
//     state: req.body.state,
//     zip: req.body.zip,
//     county: req.body.county,
//     // organizationId: req.body.organizationId
//   };
//
//   // Save person in the database
//   DBPerson.create(person)
//     .then(data => {
//
//       const point_of_contact = {
//         organizationId: req.body.organizationId,
//         personId: data.dataValues.id
//       }
//
//       DBPOC.create(point_of_contact).then(data => {
//         res.send(data)
//       }).catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while creating the point of contact."
//         });
//       });
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the person."
//       });
//     });
// };

// Retrieve all persons from the database.
exports.findAll = (req, res) => {
  DBPerson.findAll({
    include: [
      {
        model: DBPhone,
        order: ['isPrimary', 'DESC']
      },
      'emails'
    ]
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

exports.contactFindAll = (req, res) => {
  DBPerson.findAll({
    include: [
      {
        model: DBUser,
      },
      {
        model: DBPhone,
        order: ['isPrimary', 'DESC']
      },
      'emails']
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

// Find a single person with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  DBPerson.findByPk(id,
      { include:
            [
              {
                model: DBPhone,
                order: ['isPrimary', 'DESC']
              },
              'emails'
            ]
      })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving person with id=" + id + " err: " + err
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
exports.contactDeleteAll = (req, res) => {
  DBPerson.destroy({
    include: [
      {
        model: DBUser,
        where: {id: {[Op.is]: null}}
      },
      'phones',
      'emails'],
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


//Create user
exports.createUser = (req, res) => {
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
    // street_number: req.body.street_number,
    // street_name: req.body.street_name,
    // city: req.body.city,
    // state: req.body.state,
    // zip: req.body.zip,
    // county: req.body.county,
    // organizationId: req.body.organizationId
  };

  // Save person in the database
  DBPerson.create(person)
    .then(data => {

      const user = {
        // organizationId: req.body.organizationId,
        personId: data.dataValues.id,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
      }
      console.log(user);
      let userResponseData = '';

      DBUser.create(user).then(dataUser => {
        console.log('USER DATA VALUES');
        let userID = dataUser.dataValues.id;
        let personId = dataUser.dataValues.personId;

        var sendData = {
          userId: userID,
          personId: personId
        }

        res.status(200);
        res.json(sendData);
      }).catch(err => {
        userResponseData = err.message || "Some error occurred while creating the user."
        // res.status(500).send({
        //   message:
        //   err.message || "Some error occurred while creating the user."
        // });
      });
      data.user = userResponseData;
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the person."
      });
    });
};

exports.updateUser = (req, res) => {
  // Create a person
  const id = req.params.id;

  const person = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  };

  const user = {
    email: req.body.email,
    password: req.body.password
  }

  let userResponseData = '';

  DBUser.update(req.body, {
    where: { personId: id }
  })
    .then(num => {
      if (num == 1) {
        userResponseData = "User was updated successfully";
      } else {
        userResponseData = `Cannot update user with id=${id}. Maybe person was not found or req.body is empty!`;

      }
    })
    .catch(err => {
        userResponseData = "Error updating user with id=" + id + " err: " + err;
    });

  res.user = userResponseData;
  DBPerson.update(person, {
    where: { id: id }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: "Person was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update person with id=${id}. Maybe person was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating user with id=" + id + " err: " + err
    });
  });
};

exports.userFindAll = (req, res) => {
  DBPerson.findAll({
    include: [
    {
      model: DBUser,
      include: ['roles'],
      where: {id: {[Op.not]: null}}
    },
    'phones',
    'emails']
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

exports.userFindOne = (req, res) => {
  const id = req.params.id;

  DBPerson.findByPk(id, 
    { 
      include: 
      [
        {
          model: DBUser,
          include: ['roles']
        },
        'phones', 
        'emails'
      ] 
    }, 
    
  ) //TODO: Take a look at this one, remove roles, findOne works just fine.
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving person with id=" + id + " err: " + err
      });
    });
};

exports.findByEmail = (req, res) =>{
  const email = req.params.email;
  DBPerson.findAll( {
      include: 
      [
        {
          model: DBUser,
          include: ['roles'],
            where: {
              email: email
            },
        },
        'phones', 
        'emails'
      ] 
    }, 
    
  ) 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving person with id=" + id + " err: " + err
      });
    });
}

exports.userDelete = (req, res) => {
  const id = req.params.id;

  let userResponseData = "";

  DBUser.destroy({
    where: { personId: id }
  }).then(num => {
    if (num == 1) {
        userResponseData = "person was deleted successfully!"
    } else {
        userResponseData = `Cannot delete person with id=${id}. Maybe person was not found!`
    }
  })
  .catch(err => {
    userResponseData =  "Could not delete person with id=" + id + " err: " + err
  });

  res.user = userResponseData;

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
