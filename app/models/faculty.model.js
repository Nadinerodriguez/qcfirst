const pool = require("./db.js");

// constructor
const Faculty = function(faculty) {
  this.faculty_id = faculty.course_id;
  this.user_id = faculty.user_id;
  this.faculty_first = faculty.faculty_first;
  this.faculty_last = faculty.faculty_last;
};

Faculty.create = (newFaculty, result) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("INSERT INTO faculty SET ?", newFaculty, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created faculty: ", { id: res.insertId, ...newFaculty });
      result(null, { id: res.insertId, ...newFaculty });
  
      //release connnection
      connection.release();
    });
  });
};

Faculty.findById = (faculty_id, result) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(`SELECT * FROM faculty WHERE faculty_id = ${faculty_id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found faculty: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found faculty with the id
      result({ kind: "not_found" }, null);
  
      //release connnection
      connection.release();
    });
  });
};

Faculty.findByUid = (acc_id, result) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(`SELECT faculty.faculty_id, faculty.faculty_first, faculty.faculty_last, accounts.user_email, accounts.user_id, accounts.user_type FROM faculty INNER JOIN accounts ON faculty.acc_id = accounts.user_id WHERE faculty.acc_id = ${acc_id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found faculty: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found faculty with the user id
      result({ kind: "not_found" }, null);
  
      //release connnection
      connection.release();
    });
  });
};

Faculty.findCourses = (faculty_id, result) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(`SELECT * FROM courses 
    INNER JOIN faculty_courses ON courses.course_id = faculty_courses.c_id 
    WHERE faculty_id = ${faculty_id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found courses: ", res);
        result(null, res);
        return;
      }
  
      // not found course with the id
      result({ kind: "not_found" }, null);
  
      //release connnection
      connection.release();
    });
  });
};

Faculty.findCourseRoster = (course_id, result) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(`SELECT * FROM courses
    INNER JOIN student_courses ON courses.course_id = student_courses.co_id 
    INNER JOIN students ON student_courses.stu_id = students.student_id WHERE student_courses.enroll_status = 'enrolled' and courses.course_id = ${course_id};`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found course roster: ", res);
        result(null, res);
        return;
      }
  
      // not found roster with the id
      result({ kind: "not_found" }, null);
  
      //release connnection
      connection.release();
    });
  });
};

Faculty.getAll = result => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("calling getAll()");
    connection.query("SELECT * FROM faculty ORDER BY faculty_first ASC, faculty_last ASC", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("faculty: ", res);
      result(null, res);
  
      //release connnection
      connection.release();
    });
  });
};

Faculty.getAllDep = result => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("calling getAll()");
    connection.query("SELECT * FROM departments ORDER BY dept_name ASC", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("departments: ", res);
      result(null, res);
  
      //release connnection
      connection.release();
    });
  });
};

Faculty.findAllDepCourses = (department_name, result) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(`SELECT * FROM departments 
    INNER JOIN department_courses ON departments.dept_id = department_courses.dep_id 
    WHERE dept_name = ?`, department_name, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found courses: ", res);
        result(null, res);
        return;
      }
  
      // not found course with the id
      result({ kind: "not_found" }, null);
  
      //release connnection
      connection.release();
    });
  });
};

Faculty.updateById = (faculty_id, faculty, result) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "UPDATE faculty SET faculty_first = ?, faculty_last = ? WHERE faculty_id = ?",
      [faculty.faculty_first, faculty.faculty_last, faculty_id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found faculty with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated faculty: ", { id: faculty_id, ...faculty });
        result(null, { id: faculty_id, ...faculty });
  
        //release connnection
        connection.release();
    });
  });
};

Faculty.remove = (faculty_id, result) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("DELETE FROM faculty WHERE faculty_id = ?", faculty_id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found faculty with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted faculty with id: ", faculty_id);
      result(null, res);
  
      //release connnection
      connection.release();
    });
  });
};

Faculty.removeAll = result => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("DELETE FROM faculty", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} faculty`);
      result(null, res);
  
      //release connnection
      connection.release();
    });
  });
};

module.exports = Faculty;