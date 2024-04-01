import React from 'react';

function check_token() {
	if (typeof localStorage !== "undefined") {
		var jwt = require('jsonwebtoken');
		const token = localStorage.getItem('token');
		console.log("token: " + token);
		var decodedToken = null;
		try {
			decodedToken = jwt.decode(token);
		}
		catch {}
		console.log("decoded: " + JSON.stringify(decodedToken));
		if (token == null || decodedToken == null || decodedToken.exp == null || decodedToken.exp < Math.floor(Date.now() / 1000)) {
			window.location.replace("/login");
		}
		
	}
	else {
		console.log("on server");
	}
}

export default check_token();
