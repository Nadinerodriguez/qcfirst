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
  
    // Update a faculty with faculty_id
    app.put("/faculty/:faculty_id", faculty.update);
  
    // Delete a faculty with faculty_id
    app.delete("/faculty/:faculty_id", faculty.delete);
  
    // Delete all faculty
    app.delete("/faculty", faculty.deleteAll);
  };