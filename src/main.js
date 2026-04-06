// Importamos los estilos globales (Vite los inyecta automáticamente)
import "./css/style.css";

// Importamos nuestros componentes ("bloques")
import { renderNavbar } from "./components/navbar.js";
import { renderFooter } from "./components/footer.js";

// Ejecutamos la inyección en el DOM
document.querySelector("#navbar-placeholder").innerHTML = renderNavbar();
document.querySelector("#footer-placeholder").innerHTML = renderFooter();
