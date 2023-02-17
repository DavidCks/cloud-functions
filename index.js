const express = require("express");
const app = express();
const https = require("https");

const PORT = process.env.PORT || 3000;

// endpoint that triggers the HTTP request
app.get("/deploy", (rq, res) => {
// define the request options
	const options = {
		hostname: "api.github.com",
		port: 443,
		path: "/repos/DavidCks/DavidCks.github.io/dispatches",
		method: "POST",
		headers: {
			Accept: "application/vnd.github+json",
			Authorization: "Bearer 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",
			"X-GitHub-Api-Version": "2022-11-28",
		},
	};

	const data = JSON.stringify({
		event_type: "deploy",
		client_payload: {
			unit: false,
			integration: true,
		},
	});

	// send the request
	let req = https.request(options, (response) => {
		console.log(`statusCode: ${response.statusCode}`);
		res.status(200).send(json(response));
	});

	req.on("error", (error) => {
		console.error(error);
		res.status(500).send("Internal Server Error");
	});

	req.write(data);
	req.end();
});

// start the server
app.listen(PORT, () => {
console.log(`Server listening on port ${PORT}`);
});
