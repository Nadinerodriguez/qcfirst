var userConfig = JSON.parse(localStorage.getItem('userConfig'));
console.log(userConfig);

const coursesList = document.getElementById('cards');
const searchBar = document.getElementById('searchBar');
let data = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredCourses = data.filter((result) => {
        return (
            result.course_name.toLowerCase().includes(searchString) ||
            result.course_title.toLowerCase().includes(searchString) ||
            result.faculty_first.toLowerCase().includes(searchString) ||
            result.faculty_last.toLowerCase().includes(searchString) ||
            result.course_days.toLowerCase().includes(searchString) ||
            result.course_start_time.toLowerCase().includes(searchString) ||
            result.course_end_time.toLowerCase().includes(searchString) ||
            result.course_section.toLowerCase().includes(searchString) ||
            result.course_room.toLowerCase().includes(searchString) ||
            result.course_season.toLowerCase().includes(searchString) ||
            result.course_year.toLowerCase().includes(searchString) ||
            result.dept_name.toLowerCase().includes(searchString)
        );
    });
    displayCourses(filteredCourses);
});

const loadCourses = async () => {
    try {
        const response = await fetch('/courses');
        data = await response.json();
        console.log(data);
        displayCourses(data);
    } catch (err) {
        console.error(err);
    }
};

const displayCourses = (x) => {
    const htmlString = x.map(function(course) {
        return `
    <div class="card">
<h3>${course.course_name}</h3>
<h4>Course Title:</h4>
<p>${course.course_title}</p>
<h4>Instructor:</h4>
<p>${course.faculty_first + ' ' + course.faculty_last}</p>
<h4>Days & Times:</h4>
<p>${course.course_days + " " + course.course_start_time + " - " + course.course_end_time}</p>
<h4>Section:</h4>
<p>${course.course_section}</p>
<h4>Room:</h4>
<p>${course.course_room}</p>
<h4>Semester:</h4>
<p>${course.course_season[0].toUpperCase() + course.course_season.slice(1) + " " +course.course_year}</p>
<h4>Enrolled:</h4>
<p>${course.number_enrolled + "/" + course.course_capacity}</p>
<h4>Department:</h4>
<p>${course.dept_name}</p>
<button class="status-btn">${course.number_enrolled <course.course_capacity ? 'Open' : 'Closed'}</button>
<button class="add-btn" id="${course.course_id}"onclick="addToPlanner(\'${course.course_id}\')">Add to planner</button>
</div>  
    `;
    }).join('');
    coursesList.innerHTML = htmlString;

}

function addToPlanner(id) {
    console.log(id);
    if (userConfig['type'] === 'student') {
        fetch('/students/courses/planner', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                stu_id: userConfig['sid'],
                co_id: id
            })
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log("insert student courses data retrieved");
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    }
    hideButton(id);
}

function hideButton(id) {
    var btn = document.getElementById(id);
    btn.style.display = "none";
}

loadCourses();
