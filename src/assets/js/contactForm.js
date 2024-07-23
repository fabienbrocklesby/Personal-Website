document
	.getElementById("contact-form")
	.addEventListener("submit", async function (event) {
		event.preventDefault();

		const firstName = document.getElementById("first-name").value;
		const lastName = document.getElementById("last-name").value;
		const email = document.getElementById("email").value;
		const message = document.getElementById("message").value;

		const data = {
			firstName,
			lastName,
			email,
			message,
		};

		try {
			const response = await fetch(
				"https://contact.cloudflare-9f0.workers.dev/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				}
			);

			if (response.ok) {
				alert("Email sent successfully");
			} else {
				alert("Failed to send email");
			}
		} catch (error) {
			console.error("Error:", error);
			alert("An error occurred while sending the email");
		}
	});
