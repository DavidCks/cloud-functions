require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();

app.all('*', handleRouting);

function handleRouting(req, res) {
	if (req.method === 'POST' || "GET" && req.originalUrl === '/trigger_deploy') {
		const url = `${process.env.GITHUB_REPOSITORY_URL || "https://github.com/DavidCks/DavidCks.github.io.git"}`;
		const body = { event_type: 'trigger_deploy' };
		const options = {
			headers: {
				Accept: 'valueapplication/vnd.github.v3+json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.GITHUB_TOKEN || "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"}`,
			},
		};
		axios.post(url, body, options);
		res.send('Deployment triggered');
	} else {
		res.sendStatus(403);
	}
}

app.listen(process.env.PORT || 2345, () => console.log(`Server started on port ${process.env.PORT || 2345} `));