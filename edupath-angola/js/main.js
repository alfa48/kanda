document.addEventListener('DOMContentLoaded', () => {
	console.log('Edupath Angola — main.js loaded');
	// inicializações globais...

	// Menu móvel toggle
	const mobileMenuToggle = document.getElementById('mobileMenuToggle');
	const navMenu = document.getElementById('navMenu');
	const navActions = document.querySelector('.nav-actions');

	if (mobileMenuToggle) {
		mobileMenuToggle.addEventListener('click', function () {
			this.classList.toggle('active');
			navMenu.classList.toggle('active');
			navActions.classList.toggle('active');
		});
	}

	// Fechar menu ao clicar em um link
	const navLinks = document.querySelectorAll('.nav-link');
	navLinks.forEach(link => {
		link.addEventListener('click', function () {
			mobileMenuToggle.classList.remove('active');
			navMenu.classList.remove('active');
			navActions.classList.remove('active');
		});
	});

	// Ativar link com a página atual
	const currentLocation = location.pathname;
	const menuItems = document.querySelectorAll('.nav-link');
	
	menuItems.forEach(item => {
		const itemPath = new URL(item.href).pathname;
		if (itemPath === currentLocation || 
			(currentLocation === '/' && itemPath === '/index.html') ||
			(currentLocation.endsWith('/') && itemPath === currentLocation + 'index.html')) {
			item.classList.add('active');
		} else {
			item.classList.remove('active');
		}
	});

	// Navbar scroll effect
	const navbar = document.querySelector('.navbar');
	window.addEventListener('scroll', function () {
		if (window.scrollY > 50) {
			navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
		} else {
			navbar.style.boxShadow = '0 5px 15px rgba(0,0,0,0.25)';
		}
	});

	// Smooth scroll
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));
			if (target) {
				target.scrollIntoView({ behavior: 'smooth' });
			}
		});
	});
});
