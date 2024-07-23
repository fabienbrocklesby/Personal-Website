const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

module.exports = function (eleventyConfig) {
	function registerPartials(partialsDir) {
		fs.readdirSync(partialsDir).forEach(function (file) {
			const fullPath = path.join(partialsDir, file);
			const stats = fs.statSync(fullPath);
			if (stats.isFile() && path.extname(file) === ".html") {
				const partialName = path.basename(file, ".html");
				const partialContent = fs.readFileSync(fullPath, "utf8");
				handlebars.registerPartial(partialName, partialContent);
			}
		});
	}

	registerPartials("./src/_includes");

	eleventyConfig.addWatchTarget("./src/_includes");

	eleventyConfig.addPassthroughCopy("src/assets");

	return {
		dir: {
			input: "src",
			includes: "_includes",
			output: "dist",
		},
		templateFormats: ["html"],
		htmlTemplateEngine: "hbs",
		markdownTemplateEngine: "hbs",
		dataTemplateEngine: "hbs",
	};
};
