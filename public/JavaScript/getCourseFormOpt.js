var userConfig = JSON.parse(localStorage.getItem('userConfig'));
console.log(userConfig);

let dept_id;
var newCourse = {
    faculty_id: userConfig['fid'],
    dept_id: '',
    course_name: '',
    course_credits: '',
    course_season: '',
    course_section: '',
    course_year: '',
    course_room: '',
    course_capacity: '',
    course_start_time: '',
    course_end_time: '',
    course_desc: '',
    enroll_deadline: '',
    number_enrolled: '',
    course_title: '',
    course_days: ''
}

var enrollDeadlines = {
    fall: '-08-26',
    winter: '-01-01',
    spring: '-01-28',
    summer: '-06-06'
}

getCourseFormOptions();
async function getCourseFormOptions() {
    if (userConfig['type'] === 'faculty') {
        try {
            var response = await fetch(`/faculty/departments/all`);
            var data = await response.json();
            console.log("attempting to retrieve course form options");
            console.log(data);

            //inject here
            if (data.length) {
                if (data.length > 1) {
                    document.getElementById('department').innerHTML = `
                    ${data.map(function(dept) {
                        return `
                            <option value="${dept.dept_name}">${dept.dept_name}</option>
                            `;
                    }).join('')}
                    `
                } else
                    document.getElementById('department').innerHTML = `<option value="${data[0].dept_name}">${data[0].dept_name}</option>`;
            }
            setSelectListeners();
        } catch (error) {
            console.log(error);
        }
        
    }
}

function setSelectListeners() {
    const selectDepartment = document.getElementById('department');

    selectDepartment.addEventListener('change', (event) => {
        getCourseNames(event.target.value);
    });
}

async function getCourseNames(department) {
    if (userConfig['type'] === 'faculty') {
        try {
            var response = await fetch(`/faculty/departments/courses/${department}`);
            var data = await response.json();
            console.log("attempting to retrieve course form options");
            console.log(data);

            //inject here
            if (data.length) {
                if (data.length > 1) {
                    document.getElementById('course-name').innerHTML = `
                    ${data.map(function(course) {
                        return `
                            <option value="${course.course_name}">${course.course_name}</option>
                            `;
                    }).join('')}
                    `
                } else
                    document.getElementById('department').innerHTML = `<option value="${data[0].dept_name}">${data[0].dept_name}</option>`;
            }
        } catch (error) {
            console.log(error);
        }
        
    }
}

async function getCourseTitle(courseName) {
    if (userConfig['type'] === 'faculty') {
        try {
            var response = await fetch(`/faculty/departments/courses/title/${courseName}`);
            var data = await response.json();
            console.log("attempting to retrieve course title");
            console.log(data);
            newCourse['course_title'] = data['course_title'];
            newCourse['dept_id'] = data['dep_id'];
            insertIntoCourses(newCourse);
        } catch (error) {
            console.log(error);
        }
        
    }
}

function validateInput() {
    const selectSeason = document.getElementById('season');
    const selectYear = document.getElementById('year');
    const selectDepartment = document.getElementById('department');
    const selectName = document.getElementById('course-name');
    const selectCap = document.getElementById('course-cap');

    const checkMon = document.getElementById('mon');
    const checkTues = document.getElementById('tues');
    const checkWed = document.getElementById('wed');
    const checkThurs = document.getElementById('thurs');
    const checkFri = document.getElementById('fri');
    const checkSat = document.getElementById('sat');
    const checkSun = document.getElementById('sun');

    const timeStart = document.getElementById('start-time-text');
    const timeEnd = document.getElementById('end-time-text');

    const textDesc = document.getElementById('course-desc');

    newCourse['course_name'] = selectName.value;
    newCourse['course_credits'] = 3;
    newCourse['course_section'] = Math.floor(Math.random() * 100);
    newCourse['course_season'] = selectSeason.value;
    newCourse['course_year'] = selectYear.value;
    newCourse['course_room'] = getGeneratedRoom();
    newCourse['enroll_deadline'] = new Date(selectYear.value + enrollDeadlines[selectSeason.value]).toISOString().slice(0, 19).replace('T', ' ');
    
    //set course capacity
    if (selectCap.value.length > 0 && !isNaN(selectCap.value)) {
        newCourse['course_capacity'] = selectCap.value;
    }
    else {
        newCourse['course_capacity'] = 35;
    }

    //set course start time
    if (timeStart.value.length > 0 ) {
        newCourse['course_start_time'] = timeStart.value;
    }
    else {
        newCourse['course_start_time'] = '19:00';
    }

    //set course end time
    if (timeEnd.value.length > 0 ) {
        newCourse['course_end_time'] = timeEnd.value;
    }
    else {
        newCourse['course_end_time'] = '21:00';
    }

    newCourse['course_desc'] = textDesc.value;
    newCourse['number_enrolled'] = 0;

    //get course days
    var courseDays = [];
    console.log('course days length ' + courseDays.length);
    if (checkMon.checked) {
        if (courseDays.length>0) {
            courseDays.push('/' + checkMon.value);
        }
        else {
            courseDays.push(checkMon.value);
        }
    }
    if (checkTues.checked) {
        if (courseDays.length>0) {
            courseDays.push('/' + checkTues.value);
        }
        else {
            courseDays.push(checkTues.value);
        }
    }
    if (checkWed.checked) {
        if (courseDays.length>0) {
            courseDays.push('/' + checkWed.value);
        }
        else {
            courseDays.push(checkWed.value);
        }
    }
    if (checkThurs.checked) {
        if (courseDays.length>0) {
            courseDays.push('/' + checkThurs.value);
        }
        else {
            courseDays.push(checkThurs.value);
        }
    }
    if (checkFri.checked) {
        if (courseDays.length>0) {
            courseDays.push('/' + checkFri.value);
        }
        else {
            courseDays.push(checkFri.value);
        }
    }
    if (checkSat.checked) {
        if (courseDays.length>0) {
            courseDays.push('/' + checkSat.value);
        }
        else {
            courseDays.push(checkSat.value);
        }
    }
    if (checkSun.checked) {
        if (courseDays.length>0) {
            courseDays.push('/' + checkSun.value);
        }
        else {
            courseDays.push(checkSun.value);
        }
    }
    newCourse['course_days'] = courseDays.join('');
    getCourseTitle(selectName.value);
}

function getGeneratedRoom() {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    var length = 2;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
   return result.join('') + '-' + Math.floor(Math.random() * 1000);
}

async function insertIntoCourses(newCourse) {
    if (userConfig['type'] === 'faculty') {
        fetch('/courses/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCourse)
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log("put courses data retrieved");
            console.log(data);
            location.reload();
        })
        .catch(err => {
            console.log(err);
        });
    }
}

// async function insertIntoFacultyCourses(fid, cid) {
//     if (userConfig['type'] === 'faculty') {
//         fetch('/faculty/courses', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 fac_id: fid,
//                 c_id: cid
//             })
//         })
//         .then(res => {
//             return res.json();
//         })
//         .then(data => {
//             console.log("put into faculty courses data retrieved");
//             console.log(data);
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     }
// }

console.log(newCourse);