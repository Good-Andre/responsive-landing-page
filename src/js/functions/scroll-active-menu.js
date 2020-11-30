
window.addEventListener('scroll', () => {
	let scrollDistance = window.scrollY;

	if (window.innerWidth > 768) {
		document.querySelectorAll('.active-section').forEach((el, i) => {
			if (el.offsetTop - document.querySelector('.nav').clientHeight <= scrollDistance) {
				document.querySelectorAll('.nav a').forEach((el) => {
					if (el.classList.contains('_active-menu')) {
						el.classList.remove('_active-menu');
					}
				});

				document.querySelectorAll('.nav li')[i].querySelector('a').classList.add('_active-menu');
			}
		});
	}
});