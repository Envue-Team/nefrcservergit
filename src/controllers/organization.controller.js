/* eslint-disable no-mixed-spaces-and-tabs */
const db = require("../models");
const DBOrganization = db.organization;
const DBPOC = db.pointofcontact;
const DBRM = db.relationshipmanager;
const DBPerson = db.person;
const DBPartner = db.partner;
const DBRelationship = db.relationship;
const DBNote = db.note;
// const DBCounty = db.county;
const Op = db.Sequelize.Op;

// Create and Save a new organization
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "You must provide a name when creating an organization"
    });
    return;
  }

  // Create an organization
  const organization = {
    name: req.body.name,
    street_number: req.body.street_number,
    street_name: req.body.street_name,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    website: req.body.website,
    county: req.body.county,
    public_safety: req.body.public_safety,
    gendata: req.body.gendata,
    mou: req.body.mou,
    contact_protocol: req.body.contact_protocol,
    last_contact: req.body.last_contact,
    service: req.body.service,
    notes: req.body.notes,
    action: req.body.action
  };

  // Save new organization in the database
  DBOrganization.create(organization)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the organization."
      });
    });
};

// Create and Save a new Partner
exports.createPartner = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "You must provide a name when creating a partner"
    });
    return;
  }

  // Create an organization
  const organization = {
    name: req.body.name,
    street_number: req.body.street_number,
    street_name: req.body.street_name,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    website: req.body.website,
    county: req.body.county,
    public_safety: req.body.public_safety,
    gendata: req.body.gendata,
    mou: req.body.mou,
    contact_protocol: req.body.contact_protocol,
    last_contact: req.body.last_contact,
    service: req.body.service,
    notes: req.body.notes,
    action: req.body.action
  };

  // Save new organization in the database
  DBOrganization.create(organization)
    .then(data => {
		const partner = {
			services: req.body.services,
			critical_relationship_information: req.body.critical_relationship_information,
			organizationId: data.dataValues.id
		}
		DBPartner.create(partner).then(data =>{
			res.send(data)
		}).catch(err=>{
			res.status(500).send({
				message:
				err.message || "Some error occurred while creating the partner."
			});
		});
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the partner organization."
      });
    });
};

// Create and Save a new Partner
exports.createRelationship = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "You must provide a name when creating a relationship"
    });
    return;
  }

  // Create an organization
  const organization = {
    name: req.body.name,
    street_number: req.body.street_number,
    street_name: req.body.street_name,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    website: req.body.website,
    county: req.body.county,
    public_safety: req.body.public_safety,
    gendata: req.body.gendata,
    mou: req.body.mou,
    contact_protocol: req.body.contact_protocol,
    last_contact: req.body.last_contact,
    service: req.body.service,
    notes: req.body.notes,
    action: req.body.action
  };

  // Save new organization in the database
  DBOrganization.create(organization)
    .then(data => {
		const relationship = {
			status: req.body.status,
			organizationId: data.dataValues.id
    }
    
		DBRelationship.create(relationship).then(data =>{
			res.send(data)
		}).catch(err=>{
			res.status(500).send({
				message:
				err.message || "Some error occurred while creating the partner."
			});
		});
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the partner organization."
      });
    });
}

// Retrieve all organizations from the database.
exports.findAll = (req, res) => {
  DBOrganization.findAll({ 
    include :[
      'partner',
      'relationship',
      'phones',
      'emails',
      'counties',
      'line_of_businesses',
      'arc_relationships',
      'agency_types',
      {
        model: DBPerson,
        include: ['phones', 'emails']
      },
      // {
      //   model: DBNote,
      //   include: 'person',
      // },
      {
        model: DBRM,
        include: [{
          model: DBPerson,
          include: ['phones', 'emails'],
        }]
      }
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving organizations."
      });
    });
};

// Retrieve all partners from the database.
exports.findAllPartners = (req, res) => {
  DBOrganization.findAll({ 
    include :[
      'phones',
      'emails',
      'counties',
      'line_of_businesses',
      'arc_relationships',
      'agency_types',
      // {
      //   model: DBNote,
      //   include:'person',
      // },
    {
      model: DBPartner,
      where: { services : {[Op.ne]: null} }
    },
    {
      model: DBRM,
      include: [{
        model: DBPerson, 
        include: ['phones', 'email']
      }]
    }
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving partners."
      });
    });
};

// Retrieve all partners from the database.
exports.findAllRelationships = (req, res) => {
  DBOrganization.findAll({ 
    include :[
      'phones',
      'emails',
      'counties',
      'line_of_businesses',
      'arc_relationships',
      'agency_types',
        'point_of_contact',
      // {
      //   model: DBNote,
      //   include: 'person'
      //
      // },
    {
      model: DBRelationship,
      where: { status : {[Op.ne]: null} }
    },
    {
      model: DBRM,
      include: [{
        model: DBPerson, 
        include: ['phones', 'emails']
      }]
    }
    ],
    // order: [models.Note, 'createdAt', 'DESC'],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving organizations."
      });
    });
};

// Find a single organization by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  DBOrganization.findByPk(id, { 
    include :[
      'emails',
      'phones',
      'partner',
      'counties',
      'line_of_businesses',
      'arc_relationships',
      'agency_types',
      // {
      //   model: DBNote,
      //   include: 'person',
      // },
    {
      model: DBRM,
      include: [{
        model: DBPerson, 
        include: ['phones', 'emails']
      }]
    }
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving organization with id=" + id +" err: "+err
      });
    });
};

// Find a single partner by id
exports.findOnePartner = (req, res) => {
  const id = req.params.id;

  DBOrganization.findByPk(id,{ 
    include :[
      'emails',
      'phones',
      'partner',
      'counties',
      'line_of_businesses',
      'arc_relationships',
      'agency_types',
      // {
      //   model: DBNote,
      //   include: 'person',
      // },
    {
      model: DBRM,
      include: [{
        model: DBPerson, 
        include: ['phones', 'emails']
      }]
    }
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving person with id=" + id +" err: "+err
      });
    });
};

// Find a single relationship by id
exports.findOneRelationship = (req, res) => {
  const id = req.params.id;

  DBOrganization.findByPk(id,{ 
    include :[
      'phones',
      'emails',
      'relationship',
      'counties',
      'line_of_businesses',
      'arc_relationships',
      'agency_types',
      // {
      //   model: DBNote,
      //   include: 'person'
      // },
    {
      model: DBPerson,
      include: ['phones', 'emails']
    },
    {
      model: DBRM,
      include: [{
        model: DBPerson, 
        include: ['phones', 'emails']
      }]
    }
    ],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving person with id=" + id +" err: "+err
      });
    });
};

// Update a organization by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  DBOrganization.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "organization was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update organization with id=${id}. Maybe organization was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating organization with id=" + id + " err: " + err
      });
    });
};

// Update a organization by the id in the request
exports.updatePartner = (req, res) => {
  const id = req.params.id;
  const partner = {
    services: req.body.services,
    critical_relationship_information: req.body.critical_relationship_information 
  };
  DBPartner.update(partner, {
    where: {organizationId: id}
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "partner was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update partner with organizationId=${id}. Maybe organization was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating partner with organizationId=" + id + " err: " + err
      });
    });

  DBOrganization.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "organization was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update organization with id=${id}. Maybe organization was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating organization with id=" + id + " err: " + err
      });
    });
};

// Update a organization by the id in the request
exports.updateRelationship = (req, res) => {
  const id = req.params.id;
// console.log(req);
  DBRelationship.update(req.body, {
    where: {organizationId: id}
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Relationship was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update relationship with organizationId=${id}. Maybe organization was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating relationship with organizationId=" + id + " err: " + err
      });
    });

  DBOrganization.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "organization was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update organization with id=${id}. Maybe organization was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating organization with id=" + id + " err: " + err
      });
    });
};

// Delete an organization with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  DBOrganization.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "organization was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete organization with id=${id}. Maybe organization was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete organization with id=" + id + " err: " + err
      });
    });
};

// Delete all organizations from the database.
exports.deleteAll = (req, res) => {
  DBOrganization.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} organizations were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all organizations."
      });
    });
};

// Find organization by contact id
exports.findByContact = (req, res) => {
  const id = req.params.id;

  console.log("called by findbycontact");
  DBOrganization.findAll({
    include :[
      'emails',
      'phones',
      'partner',
      'counties',
      'line_of_businesses',
      'arc_relationships',
      'agency_types',
      {
        model: DBPerson,
        where: { id : {[Op.eq]: id} }
      },
      {
        model: DBRM,
        include: [{
          model: DBPerson,
          include: ['phones', 'emails']
        }]
      }
    ]
  })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving organization with id=" + id +" err: "+err
        });
      });
};
