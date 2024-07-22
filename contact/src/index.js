addEventListener('fetch', (event) => {
	event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
	if (request.method === 'OPTIONS') {
		return handleOptions(request);
	}

	if (request.method !== 'POST') {
		return new Response('Method Not Allowed', { status: 405, headers: { 'Access-Control-Allow-Origin': '*' } });
	}

	const contentType = request.headers.get('content-type');
	if (!contentType || !contentType.includes('application/json')) {
		return new Response('Bad Request', { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } });
	}

	const { email, firstName, lastName, message } = await request.json();

	if (!email || !firstName || !lastName || !message) {
		return new Response('Bad Request', { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } });
	}

	try {
		await sendEmail(email, firstName, lastName, message);
		return new Response('Email sent successfully', { status: 200, headers: { 'Access-Control-Allow-Origin': '*' } });
	} catch (error) {
		console.error(error);
		return new Response('Internal Server Error', { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } });
	}
}

async function sendEmail(email, firstName, lastName, message) {
	const sendGridApiKey = SENDGRID_API_KEY;

	const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${sendGridApiKey}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			personalizations: [
				{
					to: [{ email: 'contact@fabienbrocklesby.com' }],
					subject: 'Contact Form Message',
				},
			],
			from: {
				email: 'sendgrid@fabienbrocklesby.com',
				name: 'Contact Form',
			},
			content: [
				{
					type: 'text/html',
					value: `
                        <div>
                            <h3>New Contact Form Submission</h3>
                            <p><strong>From:</strong> ${firstName} ${lastName} &lt;${email}&gt;</p>
                            <p><strong>Message:</strong></p>
                            <p>${message}</p>
                        </div>
                    `,
				},
			],
		}),
	});

	if (!response.ok) {
		throw new Error('Failed to send email');
	}
}

function handleOptions(request) {
	return new Response(null, {
		status: 204,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		},
	});
}
