var userConfig = JSON.parse(localStorage.getItem('userConfig'));
console.log(userConfig);

getEnrolledCourses();
async function getEnrolledCourses() {
    if (userConfig['type'] === 'student') {
        var response = await fetch(`/students/courses/enrolled/${userConfig['sid']}`);
	    var data = await response.json();
        console.log(data);

        //inject here
        if (data.length) {
            if (data.length > 1) {
                document.getElementById('my-enrolled-courses').innerHTML = `
                ${data.map(function(course) {
                    return `
                     <div class="course-entry">
                     <button class="status-btn" type="button" name="${course.course_id}" id="${course.course_id}" value="${course.course_name}" onclick="dropFromEnrolled(\'${course.course_id}\')">Drop</button>
                    <label for="${course.course_id}">${course.course_name + " Section "+ course.course_section + " "+ course.course_days + " "+ course.course_start_time + "-"+ course.course_end_time}</label>
                    <button class="status-btn" type="button" name="${course.course_id}" id="${course.course_id}"  value="${course.course_id}">Enrolled</button>
                    </div>
                        `
                }).join('')}
                   `
            } else
                document.getElementById('my-enrolled-courses').innerHTML = `<div class="course-entry">
                <button class="status-btn" type="button" name="${data[0].course_id}" id="${data[0].course_id}" value="${data[0].course_name}" onclick="dropFromEnrolled(\'${data[0].course_id}\')">Drop</button>
                    <label for="${data.course_id}">${data[0].course_name + " Section "+ data[0].course_section + " "+ data[0].course_days + " "+ data[0].course_start_time + "-"+ data[0].course_end_time}</label>                    
                    <button class="status-btn" type="button" name="${data.course_id}" id="${data.course_id}"  value="${data.course_id}">Enrolled</button>
                    </div>`;
        } else {
            document.getElementById('my-enrolled-courses').innerHTML = `<p>Currently not enrolled to any course</p>`;
        }
    }
}

getPlannedCourses();
async function getPlannedCourses() {
    if (userConfig['type'] === 'student') {
        var response = await fetch(`/students/courses/planned/${userConfig['sid']}`);
	    var data = await response.json();
        console.log(data.length);

        //inject here
        if (data.length) {
            if (data.length > 1) {
                document.getElementById('my-planned-courses').innerHTML = `
                ${data.map(function(course) {
                    return `
                     <div class="course-entry">
                     <button class="status-btn" type="button" id="${course.course_id}" name="${course.course_id}" value="${course.course_name}" onclick="enrollCourse(\'${course.course_id}\')">Enroll</button>
                    <p>${course.course_name + " Section "+ course.course_section + " "+ course.course_days + " "+ course.course_start_time + "-"+ course.course_end_time}</p>
                    <button class="status-btn" type="button" name="class-status-btn" value="${course.course_id}" onclick="removeFromPlanner(\'${course.course_id}\')">Delete</button>
                   </div>
                        `
                }).join('')}
                   `
            } else
                document.getElementById('my-planned-courses').innerHTML = `<div class="course-entry">
                    <button class="status-btn" type="button" id="${data[0].course_id}" name="${data[0].course_id}" value="${data[0].course_name}" onclick="enrollCourse(\'${data[0].course_id}\')">Enroll</button>
                    <p>${data[0].course_name + " Section "+ data[0].course_section + " "+ data[0].course_days + " "+ data[0].course_start_time + "-"+ data[0].course_end_time}</p>                    
                    <button class="status-btn" type="button" name="class-status-btn" value="${data[0].course_id}" onclick="removeFromPlanner(\'${data[0].course_id}\')">Delete</button>
                    </div>`;
        } else {
            document.getElementById('my-planned-courses').innerHTML = `<p>No Planned Courses</p>`;
        }
    }
}

function removeFromPlanner(id) {
    console.log(id);
    if (userConfig['type'] === 'student') {
        fetch('/students/courses/planner', {
            method: 'DELETE',
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
            console.log("DELETE student courses data retrieved");
            console.log(data);
            location.reload();
        })
        .catch(err => {
            console.log(err);
        });
    }
}

function enrollCourse(courseId) {
    $('#warning').remove();
    //capacity is not full
    //student is not already in conflict with another time

    //only one course_name
    var courseName = document.getElementById(courseId);
    console.log(courseName.value);
    if (userConfig['type'] === 'student') {
        fetch(`/students/courses/enrolled/${userConfig['sid']}`)
        .then( res => {
            return res.json();
        })
        .then( data => {

            //check if student is already taking such a course name
            var result = data.filter(x => x.course_name === courseName.value);
            if(result.length === 0) {
                fetch(`/courses/${courseId}`)
                .then( res => {
                    return res.json();
                })
                .then( course => {
                    //check if number enrolled is < capacity and
                    //deadline not passed
                    let today = new Date().toISOString().slice(0, 19).replace('T', ' ');
                    let deadline = new Date(course.enroll_deadline).toISOString().slice(0, 19).replace('T', ' ');
                    if (course.number_enrolled < course.course_capacity) {
                        if (today < deadline) {
                            fetch('/students/courses/enrolled', {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    stu_id: userConfig['sid'],
                                    co_id: courseId
                                })
                            })
                            .then(res => {
                                return res.json();
                            })
                            .then(data => {
                                console.log("PUT student courses data retrieved");
                                console.log(data);
                                location.reload();
                            })
                            .catch(err => {
                                console.log(err);
                            });
                        }
                        else {
                            $('#my-planned-courses').prepend('<p id="warning" style="color:red;">Course is past enrollment deadline!</p>');
                        }
                        
                    }
                    else {
                        $('#my-planned-courses').prepend('<p id="warning" style="color:red;">Maximum Capacity has been reached!</p>');
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            }
            else {
                $('#my-planned-courses').prepend('<p id="warning" style="color:red;">Student already taking a similar course!</p>');
            }
        })
        .catch( err => {
            console.log(err);
        });
    }
}

function dropFromEnrolled(courseId) {
    console.log(courseId);
    if (userConfig['type'] === 'student') {
        fetch('/students/courses/enrolled', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                stu_id: userConfig['sid'],
                co_id: courseId
            })
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log("DELETE student courses data retrieved");
            console.log(data);
            location.reload();
        })
        .catch(err => {
            console.log(err);
        });
    }
}