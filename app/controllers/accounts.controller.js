var Account = require('../models/accounts.model.js');

// Create and Save a new account
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a account
  const account = new Account({
    user_id: req.body.user_id,
    user_email: req.body.user_email,
    user_password: req.body.user_password,
    user_type: req.body.user_type
  });

  // Save account in the database
  Account.create(account, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the account."
      });
    else res.send(data);
  });
};

// Retrieve all accounts from the database.
exports.findAll = (req, res) => {
    Account.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving accounts."
          });
        else res.send(data);
    });
};

// Find a single account with a user_id
exports.findOne = (req, res) => {
    Account.findById(req.params.user_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found account with id ${req.params.user_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving account with id " + req.params.user_id
          });
        }
      } else res.send(data);
    });
};

// Find a single account with a user_email
exports.findOneEmail = (req, res) => {
  Account.findByEmail(req.params.user_email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found account with email ${req.params.user_email}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving account with email " + req.params.user_email
        });
      }
    } else res.send(data);
  });
};

// Update an account identified by the user_id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Account.updateById(
      req.params.user_id,
      new Account(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found account with id ${req.params.user_id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating account with id " + req.params.user_id
            });
          }
        } else res.send(data);
      }
    );
};

// Delete a account with the specified user_id in the request
exports.delete = (req, res) => {
    Account.remove(req.params.user_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found account with id ${req.params.user_id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete account with id " + req.params.user_id
          });
        }
      } else res.send({ message: `account was deleted successfully!` });
    });
};

// Delete all accounts from the database.
exports.deleteAll = (req, res) => {
    Account.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all accounts."
        });
      else res.send({ message: `All accounts were deleted successfully!` });
    });
};