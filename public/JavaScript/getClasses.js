getData();
async function getData() {
  const response = await fetch('/courses');
  const data = await response.json();
  console.log(data);
  document.getElementById("cards").innerHTML = `
    ${data.map(function(course) {
  return `
  <div class="card">
  <h3>${course.course_name}</h3>
  <h4>Days & Times:</h4>
<p>test</p>
<h4>Instructor:</h4>
<p>test</p>
<h4>Section:</h4>
<p>${course.course_section}</p>
<h4>Room:</h4>
<p>${course.course_room}</p>
<h4>Enrolled:</h4>
<p>${course.number_occupied}</p>
<button class="status-btn">Open</button>
<button class="add-btn">Add to planner</button>
<button class="enroll-btn">Enroll</button>
</div>  
  `
  }).join('')}
`



}