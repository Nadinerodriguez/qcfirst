const connection = require("./db.js");

// constructor
const Course = function(course) {
  this.course_id = course.course_id;
  this.faculty_id = course.faculty_id;
  this.dept_id = course.dept_id;
  this.course_name = course.course_name;
  this.course_credits = course.course_credits;
  this.course_section = course.course_section;
  this.course_season = course.course_season;
  this.course_year = course.course_year;
  this.course_room = course.course_room;
  this.course_capacity = course.course_capacity;
  this.course_start_time = course.course_start_time;
  this.course_end_time = course.course_end_time;
  this.course_desc = course.course_desc;
  this.enroll_deadline = course.enroll_deadline;
};

Course.create = (newCourse, result) => {
  connection.query("INSERT INTO courses SET ?", newCourse, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created course: ", { id: res.insertId, ...newCourse });
    result(null, { id: res.insertId, ...newCourse });
  });
};

Course.findById = (course_id, result) => {
  connection.query(`SELECT * FROM courses WHERE course_id = ${course_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found course: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Course with the id
    result({ kind: "not_found" }, null);
  });
};

Course.getAll = result => {
  connection.query("SELECT * FROM courses", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("courses: ", res);
    result(null, res);
  });
};

Course.updateById = (course_id, course, result) => {
  connection.query(
    "UPDATE courses SET faculty_id = ?, dept_id = ?, course_name = ?, course_credits = ?, course_section = ?, course_season = ?, course_year = ?, course_room = ?, course_capacity = ?, course_start_time = ?, course_end_time = ?, course_desc = ?, enroll_deadline = ? WHERE course_id = ?",
    [course.faculty_id, course.dept_id, course.course_name, 
      course.course_credits, course.course_section, course.course_season, 
      course.course_year, course.course_room, course.course_capacity, 
      course.course_start_time, course.course_end_time, course.course_desc, 
      course.enroll_deadline, course_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Course with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated course: ", { id: course_id, ...course });
      result(null, { id: course_id, ...course });
    }
  );
};

Course.remove = (course_id, result) => {
  connection.query("DELETE FROM courses WHERE course_id = ?", course_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Course with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted course with id: ", course_id);
    result(null, res);
  });
};

Course.removeAll = result => {
  connection.query("DELETE FROM courses", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} courses`);
    result(null, res);
  });
};

module.exports = Course;