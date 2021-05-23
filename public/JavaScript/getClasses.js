
const coursesList = document.getElementById('cards');
const searchBar = document.getElementById('searchBar');
let data = [];
console.log(searchBar);

searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredCourses = data.filter((result) => {
    return (
        result.course_name.toLowerCase().includes(searchString) ||
        result.course_room.toLowerCase().includes(searchString) ||
        result.course_section.toLowerCase().includes(searchString) ||
        result.course_season.toLowerCase().includes(searchString) ||
        result.course_year.toLowerCase().includes(searchString) ||
        result.course_title.toLowerCase().includes(searchString)
    );
  });
  displayCourses(filteredCourses);
});

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
<h3>${course.course_name}</h3>
<h4>Days & Times:</h4>
<p>Mon 1:40pm (still hard coded)</p>
<h4>Instructor:</h4>
<p>Mark (still hard coded)</p>
<h4>Section:</h4>
<p>${course.course_section}</p>
<h4>Room:</h4>
<p>${course.course_room}</p>
<h4>Semester:</h4>
<p>${course.course_season[0].toUpperCase() + course.course_season.slice(1) + " " +course.course_year}</p>
<h4>Enrolled:</h4>
<p>${course.number_enrolled + "/" + course.course_capacity}</p>
<h4>Course Title:</h4>
<p>${course.course_title}</p>
<button class="status-btn">Open</button>
<button class="add-btn">Add to planner</button>
<button class="enroll-btn">Enroll</button>
</div>  
    `;
  }).join('');
  coursesList.innerHTML = htmlString;
}

loadCourses();
