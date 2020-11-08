const db = require("../models");
const DBRM = db.relationshipmanager;
const DBPerson = db.person;

// Create and Save a new shelter
exports.create = (req, res) => {
  // Validate request
  if (!req.body.personId || !req.body.organizationId) {
    res.status(400).send({
      message: "You must have both a person and organization id to create a relationship manager"
    });
    return;
  }

  // Create a relationship manager relationship
  const relationship_manager = {
    personId: req.body.personId,
    organizationId: req.body.organizationId
  };

  // Save relatioship manager in the database
  DBRM.create(relationship_manager)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the relationship manager."
      });
    });
};

// Retrieve all relationship managers from the database.
exports.findAll = (req, res) => {

  DBRM.findAll({
    include: [
      {
        model: DBPerson,
        include: ['phones', 'emails'],
      }
    ]
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving relationshiip managers."
      });
    });
};

// Retrieve all relationship managers from the database.
exports.findAllManagers = (req, res) => {

  DBRM.findAll({
    where :{
      organizationId: req.params.organizationId
    },
    include: [
      {
        model: DBPerson,
        include: ['phones', 'emails'],
      }
    ]
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving relationshiip managers."
      });
    });
};

// Find a single relationship manager with an id
exports.findOneOrganizationRelationshipManager = (req, res) => {
	DBRM.findAll({
    where: { 
      personId : req.params.personId,  
      organizationId: req.params.organizationId
    },
    include: [
      {
        model: DBPerson,
        include: ['phones', 'emails'],
      }
    ]
	})
	.then(data=>{
		res.send(data);
	})
	.catch(err=>{
      res.status(500).send({
        message: "Error retrieving relationship manager with id=" + id +" err: "+err		
	});
	});
}

// Update a relationship manager by the id in the request
exports.update = (req, res) => {
  data = {
    organizationId: req.body.organiationId,
    personId: req.body.personId
  }
  DBRM.update(req.body, {
    where: { 
      personId: req.params.personId,
      organizationId: req.params.organizationId
     }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Relationship manager was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update relationship manager with id=${id}. Maybe relationship_manager was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating shelter with id=" + id + " err: " + err
      });
    });
};

// Delete a relationship manager with the specified id in the request
exports.delete = (req, res) => {
  DBRM.destroy({
    where: { 
      personId: req.params.personId, 
      organizationId: req.params.organizationId
    }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Relationship manager was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete relationship manager with id=${id}. Maybe relationship manager was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete shelter with id=" + id + " err: " + err
      });
    });
};

// Delete all relationship managers from the database.
exports.deleteAll = (req, res) => {
  DBRM.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} relationship managers were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all relationship managers."
      });
    });
};

