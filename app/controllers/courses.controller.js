var Course = require('../models/courses.model.js');

// Create and Save a new Course
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Course
  const course = new Course({
    course_id: req.body.course_id,
    faculty_id: req.body.faculty_id,
    dept_id: req.body.dept_id,
    course_name: req.body.course_name,
    course_credits: req.body.course_credits,
    course_season: req.body.course_season,
    course_section: req.body.course_section,
    course_year: req.body.course_year,
    course_room: req.body.course_room,
    course_capacity: req.body.course_capacity,
    course_start_time: req.body.course_start_time,
    course_end_time: req.body.course_end_time,
    course_desc: req.body.course_desc,
    enroll_deadline: req.body.enroll_deadline,
    number_enrolled: req.body.number_enrolled
  });

  // Save Course in the database
  Course.create(course, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Course."
      });
    else res.send(data);
  });
};

// Retrieve all Courses from the database.
exports.findAll = (req, res) => {
    Course.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving courses."
          });
        else res.send(data);
    });
};

// Find a single Course with a course_id
exports.findOne = (req, res) => {
    Course.findById(req.params.course_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Course with id ${req.params.course_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Course with id " + req.params.course_id
          });
        }
      } else res.send(data);
    });
};

// Update a Course identified by the course_id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Course.updateById(
      req.params.course_id,
      new Course(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Course with id ${req.params.course_id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Course with id " + req.params.course_id
            });
          }
        } else res.send(data);
      }
    );
};

// Delete a Course with the specified course_id in the request
exports.delete = (req, res) => {
    Course.remove(req.params.course_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Course with id ${req.params.course_id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Course with id " + req.params.course_id
          });
        }
      } else res.send({ message: `Course was deleted successfully!` });
    });
};

// Delete all Courses from the database.
exports.deleteAll = (req, res) => {
    Course.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all courses."
        });
      else res.send({ message: `All Courses were deleted successfully!` });
    });
};