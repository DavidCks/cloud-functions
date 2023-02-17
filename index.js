require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();

app.all('*', handleRouting);

function handleRouting(req, res) {
	if (req.method === 'POST' || 'GET' && req.originalUrl === '/trigger_deploy') {
		const url = "https://api.github.com/repos/DavidCks/DavidCks.github.io/dispatches";
		const body = {event_type:'deploy',client_payload:{unit:false,integration:true}};
		const options = {
			headers: {
				Accept: 'application/vnd.github+json',
				'X-GitHub-Api-Version': "2022-11-28",
				Authorization: 'Bearer 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',
			},
		};
		axios.post(url, body, options);
		res.send('Deployment triggered');
	} else {
		res.sendStatus(403);
	}
}

app.listen(process.env.PORT || 2345, () => console.log(`Server started on port ${process.env.PORT || 2345} `));