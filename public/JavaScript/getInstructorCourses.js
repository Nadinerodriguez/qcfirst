var userConfig = JSON.parse(localStorage.getItem('userConfig'));
console.log(userConfig);

getEnrolledCourses();
async function getEnrolledCourses() {
    if (userConfig['type'] === 'faculty') {
        try {
            var response = await fetch(`/faculty/courses/${userConfig['fid']}`);
            var data = await response.json();
            console.log(data);

            //inject here
            if (data.length) {
                if (data.length > 1) {
                    document.getElementById('my-created-courses').innerHTML = `
                    ${data.map(function(course) {
                        return `
                        <div class="course-entry">
                        <button class="status-btn" type="button" name="class-status-btn" value="Class Status">${course.number_enrolled < course.course_capacity? 'Open' : 'Close'}</button>
                        <label for="${course.course_id}">${course.course_name + " Section "+ course.course_section + " "+ course.course_days + " "+ course.course_start_time + "-"+ course.course_end_time}</label>
                        <button class="status-btn" type="button" id="${course.course_id}" name="course_id" value="${course.course_id}" onclick="dropFromCourses(\'${course.course_id}\')">Drop</button>

                        </div>
                            `
                    }).join('')}
                    `
                } else
                    document.getElementById('my-created-courses').innerHTML = `<div class="course-entry"> 
                        <button class="status-btn" type="button" name="class-status-btn" value="Class Status">${data[0].number_enrolled < data[0].course_capacity? 'Open' : 'Close'}</button>
                        <label for="${data[0].course_id}">${data[0].course_name + " Section "+ data[0].course_section + " "+ data[0].course_days + " "+ data[0].course_start_time + "-"+ data[0].course_end_time}</label>                    
                       <button class="status-btn" type="button" id="${data[0].course_id}" name="course_id" value="${data[0].course_id}" onclick="dropFromCourses(\'${data[0].course_id}\')">Drop</button>
                        </div>`;
            } else {
                document.getElementById('my-created-courses').innerHTML = `<p>Currently not teaching any course</p>`;
            }
        } catch (error) {
            console.log(error);
        }
        
    }
}

async function getRoster(id) {
    if (userConfig['type'] === 'faculty') {
        try {
            var response = await fetch(`/faculty/courses/roster/${id}`);
            var data = await response.json();
            console.log(data);
            if (data.message) {
                document.getElementById('roster-header').innerHTML = `<h3>No Roster Found.</h3>`;
                document.getElementById('cards-roster').innerHTML = ``;
            }
            else if (data.length) {
                if (data.length > 1) {
                    document.getElementById('roster-header').innerHTML = `<h3>Roster of students</h3>`;
                    document.getElementById('cards-roster').innerHTML = `
                    ${data.map(function(student) {
                        return `
                        <div class="card">
                        <h4>student_id:</h4>
                        <p>${student.student_id}</p>
                        <h4>user_id</h4>
                        <p>${student.user_id}</p>
                        <h4>first_name</h4>
                        <p>${student.student_first}</p>
                        <h4>last_name</h4>
                        <p>${student.student_last}</p>
                        </div>
                            `
                    }).join('')}
                    `
                } else {
                    document.getElementById('cards-roster').innerHTML = `
                    <div class="card">
                        <h4>student_id:</h4>
                        <p>${student[0].student_id}</p>
                        <h4>user_id</h4>
                        <p>${student[0].user_id}</p>
                        <h4>first_name</h4>
                        <p>${student[0].student_first}</p>
                        <h4>last_name</h4>
                        <p>${student[0].student_last}</p>
                        </div>
                    `
                }

            }
        } catch (error) {
            console.log(error);
        }

        //inject here
        
    }
}

function dropFromCourses(courseId) {
    console.log(courseId);
    if (userConfig['type'] === 'faculty') {
        fetch('/faculty/courses/drop', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fac_id: userConfig['fid'],
                c_id: courseId
            })
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log("DELETE courses data retrieved");
            console.log(data);
            location.reload();
        })
        .catch(err => {
            console.log(err);
        });
    }
}