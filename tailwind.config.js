/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js}"],
	theme: {
		extend: {
			colors: {
				background: "#0f172a",
			},
			screens: {
				betterhover: { raw: "(hover: hover)" },
			},
		},
	},
	plugins: [require("daisyui"), require("@tailwindcss/forms")],
};
