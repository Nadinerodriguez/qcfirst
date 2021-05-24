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
    document.getElementById('user-email').innerHTML = `${data.user_email}`;


    if(data.user_type === 'student'){
        document.getElementById('user-name').innerHTML = `${data.student_first + " " + data.student_last}`;
    } else {
        document.getElementById('user-name').innerHTML = `${data.faculty_first + " " + data.faculty_last}` ;
    }

    if(data.user_type === 'student'){
        document.getElementById('user-id').innerHTML = `${data.student_id}`
    } else {
        document.getElementById('user-id').innerHTML = `${data.faculty_id}`
    }
}

    
