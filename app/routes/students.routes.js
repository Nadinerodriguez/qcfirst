module.exports = app => {
    var students = require("../controllers/students.controller.js");
  
    // Create a new student
    app.post("/students", students.create);
  
    // Retrieve all students
    app.get("/students", students.findAll);
  
    // Retrieve a single student with student_id
    app.get("/students/:student_id", students.findOneWithSid);

    // Retrieve a single student with user_id
    app.get("/students/user/:user_id", students.findOneWithUid);

    // Retrieve courses enrolled with student_id
    app.get("/students/courses/enrolled/:student_id", students.findEnrolled);

    // Retrieve courses planned with student_id
    app.get("/students/courses/planned/:student_id", students.findPlanned);
  
    // Update a student with student_id
    app.put("/students/:student_id", students.update);

    // CREATE a student's course with course_id as planned
    app.post("/students/courses/planner", students.updateToPlanner);

    // update a student's course with course_id as enrolled
    app.put("/students/courses/enrolled", students.updateToEnrolled);

    // delete a student's course with course_id labeled as planned
    app.delete("/students/courses/planner", students.deleteFromPlanner);

    // delete a student's course with course_id labeled as enrolled
    app.delete("/students/courses/enrolled", students.dropFromEnrolled);
  
    // Delete a student with student_id
    app.delete("/students/:student_id", students.delete);
  
    // Delete all students
    app.delete("/students", students.deleteAll);
  };