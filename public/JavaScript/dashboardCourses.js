var userConfig = JSON.parse(localStorage.getItem('userConfig'));
console.log(userConfig);

getEnrolledCourses();
async function getEnrolledCourses() {
    if (userConfig['type'] === 'student') {
        var response = await fetch(`/students/courses/enrolled/${userConfig['sid']}`);
	    var data = await response.json();
	    console.log("data retrieved");
        console.log(data);

        //inject here
        if (data.length)
            document.getElementById('my-courses').innerHTML = `<p>Currently not enrolled to any course</p>`;
        else if (data.length > 1) {
            document.getElementById('my-courses').innerHTML = `
         ${data.map(function(course) {
                return `
        <p>${course.course_name}</p>
        `
            }).join('')}
    `
        } else {
            document.getElementById('my-courses').innerHTML = `${data.student_id}`;
        }
    }
}