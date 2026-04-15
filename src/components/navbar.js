export const renderNavbar = () => {
  const path = window.location.pathname;

  return `
    <header class="header">
        <div class="logo">
            <i class="fa-solid fa-cube"></i>
            <h2>Bloque Zero</h2>
        </div>
        <button class="menu-toggle" aria-label="Abrir menú">
            <span class="hamburger"></span>
        </button>
        <nav class="navbar">
            <ul>
                <li><a href="./index.html" class="${path.includes("index.html") || path === "/" || path.endsWith("/Website-Project-UEES/") ? "active" : ""}"><i class="fa-solid fa-house"></i> Inicio</a></li>
                <li><a href="./nosotros.html" class="${path.includes("nosotros.html") ? "active" : ""}"><i class="fa-solid fa-users"></i> Nosotros</a></li>
                <li><a href="./portafolio.html" class="${path.includes("portafolio.html") ? "active" : ""}"><i class="fa-solid fa-briefcase"></i> Portafolio</a></li>
                <li><a href="./contacto.html" class="${path.includes("contacto.html") ? "active" : ""}"><i class="fa-solid fa-envelope"></i> Contacto</a></li>
            </ul>
        </nav>
    </header>
    `;
};
