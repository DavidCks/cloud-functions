import express from "npm:express@4.18.2";
import axiod from "https://deno.land/x/axiod/mod.ts";
const app = express();


app.all('*', handleRouting);

function handleRouting(req, res) {
	if (req.method === 'POST' || "GET" && req.originalUrl === '/trigger_deploy') {
		const url = `${Deno.env.GITHUB_REPOSITORY_URL || "https://github.com/DavidCks/DavidCks.github.io.git"}`;
		const body = { event_type: 'trigger_deploy' };
		const options = {
			headers: {
				Accept: 'valueapplication/vnd.github.v3+json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Deno.env.GITHUB_TOKEN || "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"}`,
			},
		};
		axiod.post(url, body, options);
		res.send('Deployment triggered');
	} else {
		res.sendStatus(403);
	}
}

app.listen(Deno.env.PORT || 2345, () => console.log(`Server started on port ${Deno.env.PORT || 2345} `));