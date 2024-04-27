document.addEventListener("DOMContentLoaded", function () {
	if (window.location.hash) {
		let target = document.querySelector(window.location.hash);
		window.scrollTo({
			top: target.offsetTop - window.innerHeight / 2 + target.offsetHeight / 2,
			behavior: "smooth",
		});
	} else {
		window.scrollTo(0, 0);
	}

	AOS.init({
		startEvent: "DOMContentLoaded",
		duration: 1500,
	});

	function setActiveClass() {
		let navLinks = document.querySelectorAll("nav ul li");
		let sections = document.querySelectorAll("header, section");

		sections.forEach((section, index) => {
			let rect = section.getBoundingClientRect();
			if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
				navLinks.forEach((nav) => nav.classList.remove("active"));
				navLinks[index].classList.add("active");

				// Update the URL
				let id = section.getAttribute("id");
				history.pushState(null, null, "#" + id);
			}
		});
	}

	setActiveClass();

	window.addEventListener("scroll", setActiveClass);

	document.getElementById("map").addEventListener("load", function () {
		document.getElementById("gradient-border").style.display = "block";
	});

	document.querySelectorAll("a").forEach((a) => {
		a.addEventListener("click", function (e) {
			e.preventDefault();
			let target = document.querySelector(this.getAttribute("href"));
			window.scrollTo({
				top:
					target.offsetTop - window.innerHeight / 2 + target.offsetHeight / 2,
				behavior: "smooth",
			});
		});
	});
});
