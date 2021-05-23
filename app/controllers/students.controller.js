var Student = require('../models/students.model.js');

// Create and Save a new student
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a student
  const student = new Student({
    student_id: req.body.student_id,
    user_id: req.body.user_id,
    student_first: req.body.student_first,
    student_last: req.body.student_last
  });

  // Save student in the database
  Student.create(student, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the student."
      });
    else res.send(data);
  });
};

// Retrieve all students from the database.
exports.findAll = (req, res) => {
    Student.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving students."
          });
        else res.send(data);
    });
};

// Find a single student with a student_id
exports.findOneWithSid = (req, res) => {
    Student.findById(req.params.student_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found student with id ${req.params.student_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving student with id " + req.params.student_id
          });
        }
      } else res.send(data);
    });
};

// Find a single student with a user_id
exports.findOneWithUid = (req, res) => {
  Student.findByUid(req.params.user_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found student with user id ${req.params.user_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving student with user id " + req.params.user_id
        });
      }
    } else res.send(data);
  });
};

// Update a student identified by the student_id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Student.updateById(
      req.params.student_id,
      new Student(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found student with id ${req.params.student_id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating student with id " + req.params.student_id
            });
          }
        } else res.send(data);
      }
    );
};

// Delete a student with the specified student_id in the request
exports.delete = (req, res) => {
    Student.remove(req.params.student_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found student with id ${req.params.student_id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete student with id " + req.params.student_id
          });
        }
      } else res.send({ message: `Student was deleted successfully!` });
    });
};

// Delete all students from the database.
exports.deleteAll = (req, res) => {
    Student.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all students."
        });
      else res.send({ message: `All Students were deleted successfully!` });
    });
};