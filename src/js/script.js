// ============================================================
// script.js — Actividad 3: JS/DOM + Validación de Formularios
// Bloque Zero — UCOM351 Desarrollo de Aplicaciones Web (UEES)
// ============================================================

// === CONFIGURACIÓN DE EMAILJS ===

const EMAILJS_SERVICE_ID = 'service_aun3ceo';
const EMAILJS_TEMPLATE_ID = 'template_qno27lr';
const EMAILJS_AUTOREPLY_ID = 'template_nlo39xp';
const EMAILJS_PUBLIC_KEY = 'w0Oz6i8ONcYhr8vpY';

emailjs.init(EMAILJS_PUBLIC_KEY);

// === SELECCIÓN DE ELEMENTOS ===

const formulario = document.querySelector('#contacto-form');
const campoNombre = document.querySelector('#nombre');
const campoEmail = document.querySelector('#email');
const campoTelefono = document.querySelector('#telefono');
const campoUrl = document.querySelector('#url-proyecto');
const btnEnviar = document.querySelector('#btn-enviar');
const btnLimpiar = document.querySelector('#btn-limpiar');

// Elementos de error
const errorNombre = document.querySelector('#nombre-error');
const errorEmail = document.querySelector('#email-error');
const errorTelefono = document.querySelector('#telefono-error');
const errorUrl = document.querySelector('#url-proyecto-error');

// Elementos de estados del DOM
const estadoInicial = document.querySelector('#estado-inicial');
const estadoBuscando = document.querySelector('#estado-buscando');
const estadoResultado = document.querySelector('#estado-resultado');
const buscandoTexto = document.querySelector('#buscando-texto');
const resultadoContenido = document.querySelector('#resultado-contenido');

// Objeto para rastrear el estado de validación de cada campo
const estadoValidacion = {
    nombre: false,
    email: false,
    telefono: false,
    url: true
};


// === FUNCIONES DE VALIDACIÓN ===

/**
 * Valida el campo de nombre/empresa.
 * Requisito: mínimo 3 caracteres alfabéticos.
 */
const validarNombre = (valor) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{3,}$/;
    if (valor.trim() === '') {
        return { valido: false, mensaje: 'El nombre es obligatorio.' };
    }
    if (!regex.test(valor.trim())) {
        return { valido: false, mensaje: 'Debe tener al menos 3 caracteres y solo letras.' };
    }
    return { valido: true, mensaje: '' };
};

/**
 * Valida el campo de correo electrónico.
 * Requisito: formato válido con regex (usuario@dominio.com).
 */
const validarEmail = (valor) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (valor.trim() === '') {
        return { valido: false, mensaje: 'El correo electrónico es obligatorio.' };
    }
    if (!regex.test(valor.trim())) {
        return { valido: false, mensaje: 'Ingresa un correo válido. Ej: usuario@dominio.com' };
    }
    return { valido: true, mensaje: '' };
};

/**
 * Valida el campo de teléfono.
 * Requisito: solo dígitos, entre 7 y 15 caracteres.
 */
const validarTelefono = (valor) => {
    const regex = /^\d{7,15}$/;
    if (valor.trim() === '') {
        return { valido: false, mensaje: 'El teléfono es obligatorio.' };
    }
    if (!regex.test(valor.trim())) {
        return { valido: false, mensaje: 'Solo dígitos, entre 7 y 15 números. Ej: 0990069857' };
    }
    return { valido: true, mensaje: '' };
};

/**
 * Valida el campo de URL del proyecto.
 * Requisito: formato de URL válido (https://...).
 */
const validarUrl = (valor) => {
    const regex = /^https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/;
    if (valor.trim() === '') {
        return { valido: true, mensaje: '' };
    }
    if (!regex.test(valor.trim())) {
        return { valido: false, mensaje: 'Ingresa una URL válida. Ej: https://mi-proyecto.com' };
    }
    return { valido: true, mensaje: '' };
};

/**
 * Aplica la validación a un campo y actualiza su estado visual.
 * Muestra u oculta el mensaje de error y agrega clases CSS.
 */
const aplicarValidacion = (campo, elementoError, funcionValidar, clave) => {
    const resultado = funcionValidar(campo.value);
    estadoValidacion[clave] = resultado.valido;

    if (resultado.valido) {
        elementoError.textContent = '';
        campo.classList.remove('input-error');
        if (campo.value.trim() !== '') {
            campo.classList.add('input-valido');
        } else {
            campo.classList.remove('input-valido');
        }
    } else {
        elementoError.textContent = resultado.mensaje;
        campo.classList.remove('input-valido');
        campo.classList.add('input-error');
    }

    actualizarBoton();
};

/**
 * Habilita o deshabilita el botón de envío según el estado de validación.
 */
const actualizarBoton = () => {
    const todosValidos = Object.values(estadoValidacion).every((v) => v === true);
    btnEnviar.disabled = !todosValidos;
};


// === FUNCIONES DE RENDERIZADO ===

/**
 * Muestra un estado específico y oculta los demás.
 * Usa classList.add() y classList.remove() según el requerimiento.
 */
const mostrarEstado = (estado) => {
    // Remover la clase 'activo' de todos los estados
    estadoInicial.classList.remove('activo');
    estadoBuscando.classList.remove('activo');
    estadoResultado.classList.remove('activo');

    // Agregar la clase 'activo' al estado solicitado
    if (estado === 'inicial') {
        estadoInicial.classList.add('activo');
    } else if (estado === 'buscando') {
        estadoBuscando.classList.add('activo');
    } else if (estado === 'resultado') {
        estadoResultado.classList.add('activo');
    }
};

/**
 * Genera el contenido HTML de la tarjeta de resultado con datos simulados.
 */
const renderizarResultado = (nombre, email, telefono, url) => {
    const urlHtml = url
        ? `<p><i class="fa-solid fa-link resultado-icono"></i> <strong>Proyecto:</strong> <a href="${url}" target="_blank">${url}</a></p>`
        : '';

    resultadoContenido.innerHTML = `
        <div class="resultado-detalle">
            <p><i class="fa-solid fa-user resultado-icono"></i> <strong>Cliente:</strong> ${nombre}</p>
            <p><i class="fa-solid fa-envelope resultado-icono"></i> <strong>Email:</strong> ${email}</p>
            <p><i class="fa-solid fa-phone resultado-icono"></i> <strong>Teléfono:</strong> ${telefono}</p>
            ${urlHtml}
        </div>
        <p class="resultado-mensaje">Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas para evaluar los requerimientos de tu proyecto.</p>
    `;
};

/**
 * Función de limpieza: resetea el formulario y regresa al estado inicial.
 */
const limpiarFormulario = () => {
    formulario.reset();

    // Resetear estados de validación
    estadoValidacion.nombre = false;
    estadoValidacion.email = false;
    estadoValidacion.telefono = false;
    estadoValidacion.url = true;

    // Limpiar clases y mensajes de error
    const campos = [campoNombre, campoEmail, campoTelefono, campoUrl];
    const errores = [errorNombre, errorEmail, errorTelefono, errorUrl];

    campos.forEach((campo) => {
        campo.classList.remove('input-error', 'input-valido');
    });

    errores.forEach((error) => {
        error.textContent = '';
    });

    actualizarBoton();
    mostrarEstado('inicial');
};

/**
 * Restaura el último nombre buscado desde localStorage al cargar la página.
 */
const restaurarUltimaBusqueda = () => {
    const ultimaBusqueda = localStorage.getItem('ultimaBusqueda');
    if (ultimaBusqueda) {
        campoNombre.value = ultimaBusqueda;
        aplicarValidacion(campoNombre, errorNombre, validarNombre, 'nombre');
    }
};


// === ESCUCHADORES DE EVENTOS ===

// Evento 'input' en cada campo para validación en tiempo real
campoNombre.addEventListener('input', () => {
    aplicarValidacion(campoNombre, errorNombre, validarNombre, 'nombre');
});

campoEmail.addEventListener('input', () => {
    aplicarValidacion(campoEmail, errorEmail, validarEmail, 'email');
});

campoTelefono.addEventListener('input', () => {
    aplicarValidacion(campoTelefono, errorTelefono, validarTelefono, 'telefono');
});

campoUrl.addEventListener('input', () => {
    aplicarValidacion(campoUrl, errorUrl, validarUrl, 'url');
});

// Evento 'submit' del formulario
formulario.addEventListener('submit', (event) => {
    // Prevenir la recarga de la página
    event.preventDefault();

    // Obtener valores con querySelector
    const nombre = document.querySelector('#nombre').value.trim();
    const email = document.querySelector('#email').value.trim();
    const telefono = document.querySelector('#telefono').value.trim();
    const url = document.querySelector('#url-proyecto').value.trim();

    // Guardar el último término buscado en localStorage
    localStorage.setItem('ultimaBusqueda', nombre);

    // Deshabilitar botón mientras se envía
    btnEnviar.disabled = true;
    btnEnviar.textContent = 'Enviando...';

    // Mostrar estado "buscando"
    buscandoTexto.textContent = `Enviando solicitud de ${nombre}...`;
    mostrarEstado('buscando');

    // Enviar email con EmailJS
    const templateParams = { nombre, email, telefono, url: url || 'No proporcionada' };

    Promise.all([
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams),
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_AUTOREPLY_ID, templateParams)
    ])
        .then(() => {
            renderizarResultado(nombre, email, telefono, url);
            mostrarEstado('resultado');
            btnEnviar.textContent = 'Solicitar Consultoría';
            actualizarBoton();
        })
        .catch((error) => {
            console.error('Error al enviar email:', error);
            buscandoTexto.textContent = 'Error al enviar. Intenta de nuevo.';
            btnEnviar.textContent = 'Solicitar Consultoría';
            actualizarBoton();
        });
});

// Evento 'click' en el botón de limpiar
btnLimpiar.addEventListener('click', () => {
    limpiarFormulario();
});

// Restaurar último término al cargar la página
restaurarUltimaBusqueda();
