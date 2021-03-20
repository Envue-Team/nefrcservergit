module.exports = volapp => {
  const files = require("../controllers/file.controller.js");
  const multer = require("multer");

  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      let extArray = file.mimetype.split("/");
      let extension = extArray[extArray.length - 1];
      cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
    }
  })

  const upload = multer({ storage: storage });
  let router = require("express").Router();

  // Create a new file
  router.post("/", upload.single('file'), files.create);

  // Retrieve all files
  router.get("/", files.findAll);

  router.get("/:name", files.download);

  // Retrieve a single file with id
  router.get("/organization/:organizationId", files.findOrganizationAll);

  // Update a file with id
  router.put("/:id", upload.single(), files.update);

  // Delete a file with id
  router.delete("/:id", files.delete);

  // Delete all files
  router.delete("/", files.deleteAll);

  volapp.use('/files', router);
};