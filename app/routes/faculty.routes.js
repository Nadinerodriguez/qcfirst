module.exports = app => {
    var faculty = require("../controllers/faculty.controller.js");
  
    // Create a new faculty
    app.post("/faculty", faculty.create);
  
    // Retrieve all faculty
    app.get("/faculty", faculty.findAll);
  
    // Retrieve a single faculty with faculty_id
    app.get("/faculty/:faculty_id", faculty.findOneWithFid);

    // Retrieve a single faculty with user_id
    app.get("/faculty/user/:acc_id", faculty.findOneWithUid);

    // Retrieve instructor courses with faculty_id
    app.get("/faculty/courses/:faculty_id", faculty.findCourses);

    // Retrieve departments
    app.get("/faculty/departments/all", faculty.findAllDep);

    // Retrieve department courses
    app.get("/faculty/departments/courses/:department_name", faculty.findAllDepCourses);

    // Retrieve the course title of the course name
    app.get("/faculty/departments/courses/title/:course_name", faculty.findCourseTitle);

    // Retrieve instructor course roster with course_id
    app.get("/faculty/courses/roster/:course_id", faculty.findCourseRoster);

    // Update a faculty courses with faculty_id
    app.post("/faculty/courses/new", faculty.createCourse);

    // delete a faculty courses with faculty_id
    app.delete("/faculty/courses/drop", faculty.dropCourse);
  
    // Update a faculty with faculty_id
    app.put("/faculty/:faculty_id", faculty.update);
  
    // Delete a faculty with faculty_id
    app.delete("/faculty/:faculty_id", faculty.delete);
  
    // Delete all faculty
    app.delete("/faculty", faculty.deleteAll);
  };