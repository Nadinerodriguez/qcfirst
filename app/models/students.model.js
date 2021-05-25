const pool = require("./db.js");

// constructor
const Student = function(student) {
  this.student_id = student.student_id;
  this.user_id = student.user_id;
  this.student_first = student.student_first;
  this.student_last = student.student_last;
};

Student.create = (newStudent, result) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("INSERT INTO students SET ?", newStudent, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created student: ", { id: res.insertId, ...newStudent });
      result(null, { id: res.insertId, ...newStudent });
  
      //release connnection
      connection.release();
    });
  });
};

Student.findById = (student_id, result) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(`SELECT * FROM students WHERE student_id = ${student_id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found student: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found student with the id
      result({ kind: "not_found" }, null);
  
      //release connnection
      connection.release();
    });
  });
};

Student.findByUid = (user_id, result) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(`SELECT students.student_id, students.student_first, students.student_last, accounts.user_email, accounts.user_id, accounts.user_type FROM students INNER JOIN accounts ON students.user_id = accounts.user_id WHERE students.user_id = ${user_id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found student: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found student with the user id
      result({ kind: "not_found" }, null);
  
      //release connnection
      connection.release();
    });
  });
};

Student.findEnrolled = (student_id, result) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(`SELECT * FROM courses INNER JOIN student_courses ON courses.course_id = student_courses.co_id WHERE student_courses.stu_id = ${student_id} and student_courses.enroll_status = 'enrolled'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("enrolled courses: ", res);
      result(null, res);
  
      //release connnection
      connection.release();
    });
  });
};

Student.findPlanned = (student_id, result) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(`SELECT * FROM courses INNER JOIN student_courses ON courses.course_id = student_courses.co_id WHERE student_courses.stu_id = ${student_id} and student_courses.enroll_status = 'planned'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("planned courses: ", res);
      result(null, res);
  
      //release connnection
      connection.release();
    });
  });
};

Student.getAll = result => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("calling getAll()");
    connection.query("SELECT * FROM students ORDER BY student_first ASC, student_last ASC", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("students: ", res);
      result(null, res);
  
      //release connnection
      connection.release();
    });
  });
};

Student.updateById = (student_id, student, result) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "UPDATE students SET student_first = ?, student_last = ? WHERE student_id = ?",
      [student.student_first, student.student_last, student_id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found student with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated student: ", { id: student_id, ...student });
        result(null, { id: student_id, ...student });
  
        //release connnection
        connection.release();
    });
  });
};

Student.updateToPlanner = (student_course, result) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "INSERT INTO student_courses (stu_id, co_id) VALUES (?,?)", [student_course.stu_id, student_course.co_id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        console.log("inserted student: ", { id: res.insertId, ...student_course });
        result(null, { id: res.insertId, ...student_course });
  
        //release connnection
        connection.release();
    });
  });
};

Student.updateToEnrolled = (student_course, result) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "UPDATE student_courses SET enroll_status = 'enrolled' WHERE stu_id = ? and co_id = ?", [student_course.stu_id, student_course.co_id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        connection.query(
          "UPDATE courses SET number_enrolled = number_enrolled + 1 WHERE course_id = ?", student_course.co_id,
          (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }
      
            console.log("updated course: ", { student_course });
            result(null, { student_course });
        });
  
        //release connnection
        connection.release();
    });
  });
};

Student.deleteFromPlanner = (student_course, result) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "DELETE FROM student_courses where stu_id = ? and co_id = ?", [student_course.stu_id, student_course.co_id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        console.log("deleted student course: ", { student_course });
        result(null, { student_course });
  
        //release connnection
        connection.release();
    });
  });
};

Student.dropFromEnrolled = (student_course, result) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "DELETE FROM student_courses WHERE stu_id = ? AND co_id = ?", [student_course.stu_id, student_course.co_id],
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
        
        connection.query(
          "UPDATE courses SET number_enrolled = number_enrolled - 1 WHERE course_id = ?", student_course.co_id,
          (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }
      
            console.log("updated course: ", { student_course });
            result(null, { student_course });
        });
  
        //release connnection
        connection.release();
    });
  });
};

Student.remove = (student_id, result) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("DELETE FROM students WHERE student_id = ?", student_id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found student with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted student with id: ", student_id);
      result(null, res);
  
      //release connnection
      connection.release();
    });
  });
};

Student.removeAll = result => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("DELETE FROM students", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} students`);
      result(null, res);
  
      //release connnection
      connection.release();
    });
  });
};

module.exports = Student;
