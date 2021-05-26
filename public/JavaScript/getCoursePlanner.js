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
                    <label for="${course.course_id}">${course.course_name + " Section "+ course.course_section + " "+ course.course_days + " "+ course.course_start_time + "-"+ course.course_end_time}</label>
                    <button class="status-btn" type="button" name="${course.course_id}" id="${course.course_id}"  value="${course.course_id}">Enrolled</button>
                    </div>
                        `
                }).join('')}
                   `
            } else
                document.getElementById('my-enrolled-courses').innerHTML = `<div class="course-entry">
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
                    <p>${course.course_name + " Section "+ course.course_section + " "+ course.course_days + " "+ course.course_start_time + "-"+ course.course_end_time}</p>
                    <button class="status-btn" type="button" name="class-status-btn" value="${course.course_id}" onclick="removeFromPlanner(\'${course.course_id}\')">Delete</button>
                    </div>
                        `
                }).join('')}
                   `
            } else
                document.getElementById('my-planned-courses').innerHTML = `<div class="course-entry">
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