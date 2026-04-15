import { renderNavbar } from './components/navbar.js';

document.addEventListener('DOMContentLoaded', () => {
    // Inyectar el navbar
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder) {
        navbarPlaceholder.innerHTML = renderNavbar();
    }

    // Lógica del botón hamburguesa
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navbar.classList.toggle('active');
        });
    }
});
