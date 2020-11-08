const db = require("../models");
const DBFile = db.file;
const fs = require('fs');

// Save a new file to the database
exports.create = (req, res) => {
  //Validate request
  if (!req.file.originalname) {
    res.status(400).send({
      message: "A file must have a name"
    });
    return;
  }

  // console.log(req.file);
  console.log(req.body);
  // Create a file
  console.log(req);
  const file = {
    organizationId: req.body.organizationId,
    personId: req.body.personId,
    filePath: "uploads/"+req.file.filename,
    fileName: req.file.originalname
  }
  console.log(file);

  // Save filePath in the database
  DBFile.create(file)
    .then(data => {
      // console.log(data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while uploading the file."
      });
    });
};

// Retrieve all files from the database.
exports.findAll = (req, res) => {
  DBFile.findAll(
    {include: 'person'}
  )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving files."
      });
    });
};

// Retrieve all files from the database.
exports.findOrganizationAll = (req, res) => {
  const organizationId  = req.params.organizationId;
  DBFile.findAll({
    where: {organizationId: organizationId},
    include: 'person'
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving files."
      });
    });
};

exports.download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = "./uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};
// Find a single file with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  DBFile.findByPk(id,
      {include: 'person'}
    )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving file with id=" + id +" err: "+err
      });
    });
};



// Update a person by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  DBFile.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "File was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update file with id=${id}. Maybe file was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating file with id=" + id + " err: " + err
      });
    });
};

// Delete a file with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  const path = req.body.filePath;

    try {
      fs.unlinkSync(path);
      res.send({
        message: "File was removed from directory"
      });
      //file removed
    } catch(err) {
      console.error(err)
    }

  DBFile.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "File was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete file with id=${id}. Maybe file was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete file with id=" + id + " err: " + err
      });
    });
};

// Delete all files from the database.
exports.deleteAll = (req, res) => {
  DBFile.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} files were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all files."
      });
    });
};