const db = require("../models");
const DBUserRole = db.user_roles;

exports.create = (req, res) => {

  const data = {
    userId: req.body.userId,
    roleId: req.body.roleId,
  }
  console.log(data);

  DBUserRole.create(data)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while creating user role."
        });
      });
}

exports.findRole = (req, res) => {


  const id = req.body.userId;

  DBUserRole.findByPk(id)
      .then(data => {
        console.log(data.roleId);
        res.send(data.roleId);
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while finding user role."
        });
      });
}

exports.update = (req, res) => {
  const id = req.params.userId;

  const data = {
    userId: id,
    roleId: req.body.roleId,
  }


  DBUserRole.update(roleId, {
    where: { userId: id }
  })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "role was updated successfully."
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
