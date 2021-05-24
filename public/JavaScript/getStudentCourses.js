var userConfig = JSON.parse(localStorage.getItem('userConfig'));
console.log(userConfig);

getStudentCourses();

async function getUserType() {
	var response = await fetch(`/students/courses/${userConfig['email']}`);
	var data = await response.json();
	userConfig['id'] = data['user_id'];
	userConfig['type'] = data['user_type'];
	console.log(userConfig);
    getUserInformation();
}