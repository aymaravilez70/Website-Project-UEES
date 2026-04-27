(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=()=>{let e=window.location.pathname;return`
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
                <li><a href="./index.html" class="${e.includes(`index.html`)||e===`/`||e.endsWith(`/Website-Project-UEES/`)?`active`:``}"><i class="fa-solid fa-house"></i> Inicio</a></li>
                <li><a href="./nosotros.html" class="${e.includes(`nosotros.html`)?`active`:``}"><i class="fa-solid fa-users"></i> Nosotros</a></li>
                <li><a href="./portafolio.html" class="${e.includes(`portafolio.html`)?`active`:``}"><i class="fa-solid fa-briefcase"></i> Portafolio</a></li>
                <li><a href="./contacto.html" class="${e.includes(`contacto.html`)?`active`:``}"><i class="fa-solid fa-envelope"></i> Contacto</a></li>
            </ul>
        </nav>
    </header>
    `},t=()=>`
    <footer class="footer">
        <p>&copy; 2026 Bloque Zero. Innovación desde el código.</p>
    </footer>
    `,n=`modulepreload`,r=function(e){return`/Website-Project-UEES/`+e},i={},a=function(e,t,a){let o=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),s=document.querySelector(`meta[property=csp-nonce]`),c=s?.nonce||s?.getAttribute(`nonce`);function l(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}o=l(t.map(t=>{if(t=r(t,a),t in i)return;i[t]=!0;let o=t.endsWith(`.css`),s=o?`[rel="stylesheet"]`:``;if(a)for(let n=e.length-1;n>=0;n--){let r=e[n];if(r.href===t&&(!o||r.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${s}`))return;let l=document.createElement(`link`);if(l.rel=o?`stylesheet`:n,o||(l.as=`script`),l.crossOrigin=``,l.href=t,c&&l.setAttribute(`nonce`,c),document.head.appendChild(l),o)return new Promise((e,n)=>{l.addEventListener(`load`,e),l.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function s(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return o.then(t=>{for(let e of t||[])e.status===`rejected`&&s(e.reason);return e().catch(s)})};document.addEventListener(`DOMContentLoaded`,()=>{let n=document.getElementById(`navbar-placeholder`);n&&(n.innerHTML=e());let r=document.getElementById(`footer-placeholder`);r&&(r.innerHTML=t());let i=document.querySelector(`.menu-toggle`),o=document.querySelector(`.navbar`);i&&o&&i.addEventListener(`click`,()=>{i.classList.toggle(`active`),o.classList.toggle(`active`)}),document.querySelector(`#contacto-form`)&&a(()=>import(`./script-BgRRw9by.js`),[])});