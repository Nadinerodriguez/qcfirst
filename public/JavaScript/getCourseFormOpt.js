var userConfig = JSON.parse(localStorage.getItem('userConfig'));
console.log(userConfig);

let dept_id;
var newCourse = {
    course_id: '',
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

    console.log(selectSeason.value);
    console.log(selectYear.value);
    console.log(selectDepartment.value);
    console.log(selectName.value);
    console.log(isNaN(selectCap.value));

    console.log(checkMon.checked);
    console.log(checkTues.checked);
    console.log(checkWed.value);
    console.log(checkThurs.value);
    console.log(checkFri.value);
    console.log(checkSat.value);
    console.log(checkSun.value);

    console.log(timeStart.value);
    console.log(timeEnd.value);

    console.log(textDesc.value);
    newCourse['course_name'] = selectName.value;
    newCourse['course_credits'] = 3;
    //newCourse['course_section'] = getGeneratedSection(); //todo
    newCourse['course_season'] = selectSeason.value;
    newCourse['course_year'] = selectYear.value;
    //newCourse['course_room'] = getGeneratedRoom(); //todo
    newCourse['enroll_deadline'] = new Date(selectYear.value + enrollDeadlines[selectSeason.value]);
    
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
    
    
}