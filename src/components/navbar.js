export const renderNavbar = () => {
  // Detectamos la ruta para marcar el enlace activo dinámicamente
  const path = window.location.pathname;

  return `
    <header class="header">
        <div class="logo">
            <h2>Bloque Zero</h2>
        </div>
        <nav class="navbar">
            <ul>
                <li><a href="./index.html" class="${path.includes("index.html") || path === "/" || path.endsWith("/Website-Project-UEES/") ? "active" : ""}">Inicio</a></li>
                <li><a href="./nosotros.html" class="${path.includes("nosotros.html") ? "active" : ""}">Nosotros</a></li>
                <li><a href="./contacto.html" class="${path.includes("contacto.html") ? "active" : ""}">Contacto</a></li>
            </ul>
        </nav>
    </header>
    `;
};
