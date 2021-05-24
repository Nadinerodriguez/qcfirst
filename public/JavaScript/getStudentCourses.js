var userConfig = JSON.parse(localStorage.getItem('userConfig'));
console.log(userConfig);

getEnrolledCourses();
async function getEnrolledCourses() {
    if (userConfig['type'] === 'student') {
        var response = await fetch(`/students/courses/enrolled/${userConfig['sid']}`);
	    var data = await response.json();
        console.log(data);

        //inject here
    }
}

getPlannedCourses();
async function getPlannedCourses() {
    if (userConfig['type'] === 'student') {
        var response = await fetch(`/students/courses/planned/${userConfig['sid']}`);
	    var data = await response.json();
        console.log(data);

        //inject here
    }
}