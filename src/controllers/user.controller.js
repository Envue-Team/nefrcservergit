const db = require("../models");
const DBUser = db.user;
const DBPerson = db.person;

// Create and Save a new person
exports.create = (req, res) => {
    // Validate request
    if (!req.body.first_name) {
        res.status(400).send({
            message: "A person must have a first name"
        });
        return;
    }

    // Save user in the database
    //   DBUser.create(user)
    //     .then(data => {
    //       res.send(data);
    //     })
    //     .catch(err => {
    //       res.status(500).send({
    //         message:
    //           err.message || "Some error occurred while creating the user."
    //       });
    //     });
    // };



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
            console.log("success");

            //   const user = {
            //     personId: data.dataValues.id,
            //     email: req.body.email
            //   }
                // Create a user
    const user = {
        // first_name: req.body.first_name,
        // last_name: req.body.last_name,
        personId: data.dataValues.id,
        email: req.body.email,
        password: req.body.password
    };


            DBUser.create(user).then(data => {
                console.log("success");
                res.send(data)
            }).catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the user."
                });
                // return res.status(500);
            });
            return res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while user."
            });
        });
};

// Retrieve all persons from the database.
exports.findAll = (req, res) => {
    DBUser.findAll({
        include: [
            {
                model: person,
                include: ['emails, phones']
            }
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving user."
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

    DBUser.findAll({
        where: {
            personId: id
        },
        include: [
            {
                model: person,
                include: ['emails, phones']
            }
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


// DBPerson.create(user)
// .then(data => {

//     //   const user = {
//     //     personId: data.dataValues.id,
//     //     email: req.body.email
//     //   }

//     DBUser.create(user).then(data => {
//         res.send(data)
//     }).catch(err => {
//         res.status(500).send({
//             message:
//                 err.message || "Some error occurred while creating the user."
//         });
//     });
//     res.send(data);
// })
// .catch(err => {
//     res.status(500).send({
//         message:
//             err.message || "Some error occurred while user."
//     });
// });


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

    DBUser.update(req.body, {
        where: { personId: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "user was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating user with id=" + id + " err: " + err
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

    DBUser.destroy({
        where: { personId: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "user was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot user person with id=${id}. Maybe user was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not user person with id=" + id + " err: " + err
            });
        });
};

// Delete all persons from the database.
// exports.deleteAll = (req, res) => {
//     DBPerson.destroy({
//         where: {},
//         truncate: false
//     })
//         .then(nums => {
//             res.send({ message: `${nums} persons were deleted successfully!` });
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while removing all persons."
//             });
//         });
// };

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