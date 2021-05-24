var Faculty = require('../models/faculty.model.js');

// Create and Save a new faculty
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a faculty
  const faculty = new Faculty({
    faculty_id: req.body.faculty_id,
    user_id: req.body.user_id,
    faculty_first: req.body.faculty_first,
    faculty_last: req.body.faculty_last
  });

  // Save faculty in the database
  Faculty.create(faculty, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the faculty."
      });
    else res.send(data);
  });
};

// Create and Save a new faculty course
exports.createCourse = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save faculty in the database
  Faculty.createCourse(req.body, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the faculty course."
      });
    else res.send(data);
  });
};

// Retrieve all faculty from the database.
exports.findAll = (req, res) => {
    Faculty.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving faculty."
          });
        else res.send(data);
    });
};

// Retrieve all department from the database.
exports.findAllDep = (req, res) => {
  Faculty.getAllDep((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving departments."
        });
      else res.send(data);
  });
};

// Find department courses with a department_name
exports.findAllDepCourses = (req, res) => {
  Faculty.findAllDepCourses(req.params.department_name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found department courses with department name ${req.params.department_name}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving department courses with department name " + req.params.department_name
        });
      }
    } else res.send(data);
  });
};

// Find a single faculty with a faculty_id
exports.findCourseTitle = (req, res) => {
  Faculty.findCourseTitle(req.params.course_name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found course title with name ${req.params.course_name}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving course title with name " + req.params.course_name
        });
      }
    } else res.send(data);
  });
};

// Find a single faculty with a faculty_id
exports.findOneWithFid = (req, res) => {
    Faculty.findById(req.params.faculty_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found faculty with id ${req.params.faculty_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving faculty with id " + req.params.faculty_id
          });
        }
      } else res.send(data);
    });
};

// Find a single faculty with a user_id
exports.findOneWithUid = (req, res) => {
  Faculty.findByUid(req.params.acc_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found faculty with user id ${req.params.acc_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving faculty with user id " + req.params.acc_id
        });
      }
    } else res.send(data);
  });
};

// Find courses with a faculty_id
exports.findCourses = (req, res) => {
  Faculty.findCourses(req.params.faculty_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found courses with faculty id ${req.params.faculty_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving courses with faculty id " + req.params.faculty_id
        });
      }
    } else res.send(data);
  });
};

// Find course roster with a course_id
exports.findCourseRoster = (req, res) => {
  Faculty.findCourseRoster(req.params.course_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found course roster with course id ${req.params.course_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving course roster with course id " + req.params.course_id
        });
      }
    } else res.send(data);
  });
};

// Update a faculty identified by the faculty_id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Faculty.updateById(
      req.params.faculty_id,
      new faculty(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found faculty with id ${req.params.faculty_id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating faculty with id " + req.params.faculty_id
            });
          }
        } else res.send(data);
      }
    );
};

// Delete a faculty with the specified faculty_id in the request
exports.delete = (req, res) => {
    Faculty.remove(req.params.faculty_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found faculty with id ${req.params.faculty_id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete faculty with id " + req.params.faculty_id
          });
        }
      } else res.send({ message: `faculty was deleted successfully!` });
    });
};

// Delete all faculty from the database.
exports.deleteAll = (req, res) => {
    Faculty.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all faculty."
        });
      else res.send({ message: `All faculty were deleted successfully!` });
    });
};