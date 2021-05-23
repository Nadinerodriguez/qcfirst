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
    }
    else {
        response = await fetch(`/faculty/user/${userConfig['id']}`);
        data = await response.json();
        userConfig['fid'] = data['faculty_id'];
        console.log(data);
    }
    localStorage.setItem("userConfig", JSON.stringify(userConfig));
}

// fetch(`/accounts/email/${userConfig['email']}`)
//     .then(res => {
//         if (res.ok) {
//             return res.json();
//         } else if (res.status === 404) {
//             return Promise.reject('error 404');
//         } else {
//             return Promise.reject('Other error: ' + res.status)
//         }
//     })
//     .then(data => {
//         userConfig['id'] = data['user_id'];
//     	userConfig['type'] = data['user_type'];
//         console.log(data);

//         return fetch(`/faculty/user/${data['user_id']}`)
//     })
//     .then(res => {
//         return res.json();
//     })
//     .then(data => {
//         console.log(userConfig);
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// $(document).ready(() => {
//     $.ajax(`/accounts/email/${userConfig['email']}`, 
//     {
//         dataType: 'json', // type of response data
//         timeout: 500,     // timeout milliseconds
//         success: function (data,status,xhr) {   // success callback function
//             console.log(data);
//             userConfig['id'] = data['user_id'];
//     	    userConfig['type'] = data['user_type'];
//             console.log(userConfig);
//             localStorage.setItem("userConfig", JSON.stringify(userConfig));
//         },
//         error: function (jqXhr, textStatus, errorMessage) { // error callback 
//             console.log(errorMessage);
//         }
//     });
//     userConfig = JSON.parse(localStorage.getItem('userConfig'));
//     $.ajax(`/faculty/user/${userConfig['id']}`, 
//     {
//         dataType: 'json', // type of response data
//         timeout: 500,     // timeout milliseconds
//         success: function (data,status,xhr) {   // success callback function
//             console.log(data);
//             // userConfig['id'] = data['user_id'];
//     	    // userConfig['type'] = data['user_type'];
//             // console.log(userConfig);
//         },
//         error: function (jqXhr, textStatus, errorMessage) { // error callback 
//             console.log(errorMessage);
//         }
//     });
// });


    
