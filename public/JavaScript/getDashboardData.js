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
    getEnrolledCourses();
}

async function getEnrolledCourses() {
    if (userConfig['type'] === 'student') {
        var response = await fetch(`/students/courses/enrolled/${userConfig['sid']}`);
	    var data = await response.json();
	    console.log("data retrieved");
        console.log(data);

        //inject here

        if (data.length) {
            if (data.length > 1) {
                document.getElementById('my-enrolled-courses').innerHTML = `
                ${data.map(function(course) {
                    return `
                     <div class="course-entry">
                    <label for="${course.course_id}">${course.course_name + " Section "+ course.course_section + " "+ course.course_days + " "+ course.course_start_time + "-"+ course.course_end_time}</label>
                    </div>
                        `
                }).join('')}
                   `
            } else
                document.getElementById('my-enrolled-courses').innerHTML = `<div class="course-entry">
                    <label for="${data.course_id}">${data[0].course_name}</label>
                    <label for="${data.course_id}">${data[0].course_name + " Section "+ data[0].course_section + " "+ data[0].course_days + " "+ data[0].course_start_time + "-"+ data[0].course_end_time}</label>                    
                    </div>`;
        } else {
            document.getElementById('my-enrolled-courses').innerHTML = `
            <div class="course-entry">
                <p>Currently not enrolled to any course</p>
            </div>`;
        }
    }
}

    
