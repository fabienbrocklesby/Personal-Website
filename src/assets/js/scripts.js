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
		duration: 2000,
		offset: 0,
		mirror: true,
	});

	if ("serviceWorker" in navigator) {
		window.addEventListener("load", function () {
			navigator.serviceWorker.register("/service-worker.js").then(
				function (registration) {
					console.log(
						"ServiceWorker registration successful with scope: ",
						registration.scope
					);
				},
				function (err) {
					console.log("ServiceWorker registration failed: ", err);
				}
			);
		});
	}

	document.getElementById("email-link").href =
		"mailto:contact@fabienbrocklesby.com";
	document.getElementById("phone-link").href = "tel:+642041908000";

	function setActiveClass() {
		let navLinks = document.querySelectorAll("nav ul li");
		let sections = document.querySelectorAll("header, section");

		sections.forEach((section, index) => {
			let rect = section.getBoundingClientRect();
			if (rect.top >= 0 && rect.top < window.innerHeight * 0.6) {
				navLinks.forEach((nav) => nav.classList.remove("active"));
				navLinks[index].classList.add("active");

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
			let href = this.getAttribute("href");

			if (href.startsWith("mailto:") || href.startsWith("tel:")) {
				return;
			}

			e.preventDefault();
			let target = document.querySelector(href);
			if (href === "#landing") {
				window.scrollTo({
					top: 0,
					behavior: "smooth",
				});
			} else if (href === "#about") {
				setTimeout(() => {
					window.scrollTo({
						top: target.offsetTop - 50,
						behavior: "smooth",
					});
				}, 0);
			} else {
				window.scrollTo({
					top:
						target.offsetTop - window.innerHeight / 2 + target.offsetHeight / 2,
					behavior: "smooth",
				});
			}
		});
	});
});
