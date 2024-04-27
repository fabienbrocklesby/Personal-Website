function setActiveClass() {
	let navLinks = document.querySelectorAll("nav ul li");
	let sections = document.querySelectorAll("header, section");

	sections.forEach((section, index) => {
		let rect = section.getBoundingClientRect();
		if (rect.top < window.innerHeight * 0.7 && rect.bottom > 0) {
			navLinks.forEach((nav) => nav.classList.remove("active"));
			navLinks[index].classList.add("active");
		}
	});
}

setActiveClass();

window.addEventListener("scroll", setActiveClass);
