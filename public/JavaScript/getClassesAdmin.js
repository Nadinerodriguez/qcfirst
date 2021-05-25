let data = [];
// // Students_courses Table
// const studentsCoursesList = document.getElementById('cards-students-courses');
//
// const loadStudentsCourses = async () => {
//     try {
//         const response = await fetch('/students_courses');
//         data = await response.json();
//         displayStudentsCourses(data);
//     } catch (err) {
//         console.error(err);
//     }
// };
//
// const displayStudentsCourses = (x) => {
//     document.getElementById('students-courses-header').innerHTML = `Number of entries in Students_courses Table: ${data.length}`;
//     const htmlString = x.map(function(student) {
//         return `
//     <div class="card">
// <h4>student_id:</h4>
// <p>${student.student_id}</p>
// <h4>co_id</h4>
// <p>${student.co_id}</p>
// <h4>enroll_status</h4>
// <p>${student.enroll_status}</p>
// </div>
//     `;
//     }).join('');
//     studentsCoursesList.innerHTML = htmlString;
// }
// loadStudentsCourses();
// // End of students_courses table
//
// // Faculty_courses Table
// const facultyCoursesList = document.getElementById('cards-faculty-courses');
//
// const loadFacultyCourses = async () => {
//     try {
//         const response = await fetch('/faculty_courses');
//         data = await response.json();
//         displayStudentsCourses(data);
//     } catch (err) {
//         console.error(err);
//     }
// };
//
// const displayStudentsCourses = (x) => {
//     document.getElementById('faculty-courses-header').innerHTML = `Number of entries in Faculty_courses Table: ${data.length}`;
//     const htmlString = x.map(function(faculty) {
//         return `
//     <div class="card">
// <h4>fac_id:</h4>
// <p>${faculty.fac_id}</p>
// <h4>c_id</h4>
// <p>${faculty.c_id}</p>
// </div>
//     `;
//     }).join('');
//     facultyCoursesList.innerHTML = htmlString;
// }
// loadFacultyCourses();
// // End of faculty_courses table

//Start of Courses Table
const coursesList = document.getElementById('cards');

const loadCourses = async () => {
    try {
        const response = await fetch('/courses');
        data = await response.json();
        displayCourses(data);
    } catch (err) {
        console.error(err);
    }
};

const displayCourses = (x) => {
    document.getElementById('courses-header').innerHTML = `Number of entries in Courses Table: ${data.length}`;
    const htmlString = x.map(function(course) {
        return `
    <div class="card">
<h4>course_id</h4>
<p>${course.course_id}</p>
<h4>faculty_id</h4>
<p>12345678</p>
<h4>dept_id</h4>
<p>125</p>
<h4>course_name</h4>
<p>${course.course_name}</p>
<h4>course_credits</h4>
<p>${course.course_credits}</p>                    
<h4>course_section</h4>
<p>${course.course_section}</p>
<h4>course_season</h4>
<p>${course.course_season}</p>
<h4>course_year</h4>
<p>${course.course_year}</p>
<h4>course_room</h4>
<p>${course.course_room}</p>
<h4>course_deadline</h4>
<p>${course.course_deadline}</p>
<h4>course_capacity</h4>
<p>${course.course_capacity}</p>
<h4>course_start_time</h4>
<p>${course.course_start_time}</p>
<h4>course_end_time</h4>
<p>${course.course_end_time}</p>
</div>  
    `;
    }).join('');
    coursesList.innerHTML = htmlString;
}
loadCourses();
//End of Courses Table

// Students Table
const studentsList = document.getElementById('cards-students');

const loadStudents = async () => {
    try {
        const response = await fetch('/students');
        data = await response.json();
        displayStudents(data);
    } catch (err) {
        console.error(err);
    }
};

const displayStudents = (x) => {
    document.getElementById('students-header').innerHTML = `Number of entries in Students Table: ${data.length}`;
    const htmlString = x.map(function(student) {
        return `
    <div class="card">
<h4>student_id:</h4>
<p>${student.student_id}</p>
<h4>user_id</h4>
<p>${student.user_id}</p>
<h4>first_name</h4>
<p>${student.student_first}</p>
<h4>last_name</h4>
<p>${student.student_last}</p>
</div>  
    `;
    }).join('');
    studentsList.innerHTML = htmlString;
}
loadStudents();
// End of students table

// Faculty Table
const facultyList = document.getElementById('cards-faculty');

const loadFaculty = async () => {
    try {
        const response = await fetch('/faculty');
        data = await response.json();
        displayFaculty(data);
    } catch (err) {
        console.error(err);
    }
};

const displayFaculty = (x) => {
    document.getElementById('faculty-header').innerHTML = `Number of entries in Faculty Table: ${data.length}`;

    const htmlString = x.map(function(faculty) {
        return `
    <div class="card">
<h4>faculty_id:</h4>
                    <p>${faculty.faculty_id}</p>
                    <h4>acc_id</h4>
                    <p>${faculty.acc_id}</p>
                    <h4>faculty_first</h4>
                    <p>${faculty.faculty_first}</p>
                    <h4>faculty_last</h4>
                    <p>${faculty.faculty_last}</p>
</div>  
    `;
    }).join('');
    facultyList.innerHTML = htmlString;
}
loadFaculty();
// End of faculty table

// Accounts Table
const accountsList = document.getElementById('cards-accounts');

const loadAccounts = async () => {
    try {
        const response = await fetch('/accounts');
        data = await response.json();
        displayAccounts(data);
    } catch (err) {
        console.error(err);
    }
};

const displayAccounts = (x) => {
    document.getElementById('accounts-header').innerHTML = `Number of entries in Accounts Table: ${data.length}`;
    const htmlString = x.map(function(account) {
        return `
    <div class="card">
<h4>user_id:</h4>
                    <p>${account.user_id}</p>
                    <h4>user_email</h4>
                    <p>${account.user_email}</p>
                    <h4>user_password</h4>
                    <p>${account.user_password}</p>
                    <h4>user_type</h4>
                    <p>${account.user_type}</p>
</div>  
    `;
    }).join('');
    accountsList.innerHTML = htmlString;
}
loadAccounts();
// End of accounts table


// Departments Table
// End of departments table

// Courses_days Table
// End of courses_days table