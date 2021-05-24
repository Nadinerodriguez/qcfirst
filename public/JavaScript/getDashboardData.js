var userConfig = JSON.parse(localStorage.getItem('userConfig'));
console.log(userConfig);

getUserType();

async function getUserType() {
	var response = await fetch(`/accounts/email/${userConfig['email']}`);
	var data = await response.json();
	userConfig['id'] = data['user_id'];
	userConfig['type'] = data['user_type'];
	console.log(userConfig);
    getUserInformation();
}

async function getUserInformation() {
    var response, data;
    if (userConfig['type'] === "student") {
        response = await fetch(`/students/user/${userConfig['id']}`);
        data = await response.json();
        userConfig['sid'] = data['student_id'];
        console.log(data);
    } else {
        response = await fetch(`/faculty/user/${userConfig['id']}`);
        data = await response.json();
        userConfig['fid'] = data['faculty_id'];
        console.log(data.length);
    }
    localStorage.setItem("userConfig", JSON.stringify(userConfig));
    document.getElementById('user-name').innerHTML = `${data.student_first + " " + data.student_last}`;
    document.getElementById('user-name').innerHTML = `${data.faculty_first + " " + data.faculty_last}`;
    document.getElementById('user-email').innerHTML = `${data.user_email}`;
    document.getElementById('user-id').innerHTML = `${data.student_id}`;
    document.getElementById('user-id').innerHTML = `${data.faculty_id}`;

}

    
