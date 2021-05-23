//Start of Courses Table
const coursesList = document.getElementById('cards');
let data = [];

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