var userConfig = {
	id: 'unmarked',
	sid: 'unmarked',
	fid: 'unmarked',
	email: 'unmarked',
	type: 'unmarked'
}

function setEmailConfig() {
    var emailVal = document.getElementById("user-email").value;
    userConfig['email'] = emailVal;
    localStorage.setItem("userConfig", JSON.stringify(userConfig));
}