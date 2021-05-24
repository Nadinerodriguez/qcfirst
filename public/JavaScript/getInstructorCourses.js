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
                        <button class="status-btn" type="button" name="class-status-btn" value="Class Status" onclick="location.href='course-enrollment.html'">Open</button>
                        <label for="${course.course_id}">${course.course_name + " Section "+ course.course_section + " "+ course.course_days + " "+ course.course_start_time + "-"+ course.course_end_time}</label>
                        <input class="checkbox" type="checkbox" id="${course.course_id}" name="course_id" value="${course.course_id}" onclick="getRoster(\'${course.course_id}\')">
                        </div>
                            `
                    }).join('')}
                    `
                } else
                    document.getElementById('my-created-courses').innerHTML = `<div class="course-entry">
                        <button class="status-btn" type="button" name="class-status-btn" value="Class Status" onclick="location.href='course-enrollment.html'">Open</button>
                        <label for="${data[0].course_id}">${data[0].course_name + " Section "+ data[0].course_section + " "+ data[0].course_days + " "+ data[0].course_start_time + "-"+ data[0].course_end_time}</label>                    
                        <input class="checkbox" type="checkbox" id="${data[0].course_id}" name="course_id" value="${data[0].course_id}" onclick="getRoster(\'${data[0].course_id}\')">
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
            }
            else if (data.length) {
                if (data.length > 1) {
                    
                } else {

                }
                    
            }
        } catch (error) {
            console.log(error);
        }

        //inject here
        
    }
}