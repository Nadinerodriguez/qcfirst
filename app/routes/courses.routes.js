module.exports = app => {
    var courses = require("../controllers/courses.controller.js");
  
    // Create a new Course
    app.post("/courses", courses.create);
  
    // Retrieve all Courses
    app.get("/courses", courses.findAll);
  
    // Retrieve a single Course with course_id
    app.get("/courses/:course_id", courses.findOne);
  
    // Update a Course with course_id
    app.put("/courses/:course_id", courses.update);
  
    // Delete a Course with course_id
    app.delete("/courses/:course_id", courses.delete);
  
    // Delete all Courses
    app.delete("/courses", courses.deleteAll);
  };