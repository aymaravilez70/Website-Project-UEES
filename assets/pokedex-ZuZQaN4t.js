import"./main-CsQvwPrl.js";var e=`https://pokeapi.co/api/v2/pokemon`,t=30,n=document.querySelector(`#pokemon-input`),r=document.querySelector(`#btn-buscar`),i=document.querySelector(`#btn-listar`),a=document.querySelector(`#btn-reintentar`),o=document.querySelector(`#pokemon-grid`),s=document.querySelector(`#mensaje-vacio`),c=document.querySelector(`#mensaje-error`),l=document.querySelector(`#estado-inicial`),u=document.querySelector(`#estado-cargando`),d=document.querySelector(`#estado-resultados`),f=document.querySelector(`#estado-vacio`),p=document.querySelector(`#estado-error`),m=document.querySelector(`#detalle-overlay`),h=document.querySelector(`#detalle-cerrar`),g=document.querySelector(`#detalle-contenido`),_=null,v=e=>{[l,u,d,f,p].forEach(e=>e.classList.remove(`activo`)),e===`inicial`?l.classList.add(`activo`):e===`cargando`?u.classList.add(`activo`):e===`resultados`?d.classList.add(`activo`):e===`vacio`?f.classList.add(`activo`):e===`error`&&p.classList.add(`activo`)},y=async t=>{let n=`${e}/${t.toLowerCase().trim()}`;try{let e=await fetch(n);if(!e.ok){if(e.status===404)return v(`vacio`),s.textContent=`No se encontró ningún Pokémon llamado "${t}".`,null;throw e.status>=500?Error(`Error del servidor (${e.status}). Intenta más tarde.`):Error(`Error HTTP: ${e.status}`)}return await e.json()}catch(e){return e.message.includes(`Failed to fetch`)||e.message.includes(`NetworkError`)||e.name===`TypeError`?c.textContent=`Sin conexión a internet. Verifica tu red e intenta de nuevo.`:e.message.includes(`Error del servidor`)?c.textContent=e.message:e.message.includes(`No se encontró`)||(c.textContent=`Error: ${e.message}`),e.message.includes(`No se encontró`)||v(`error`),null}},b=async()=>{let n=`${e}?limit=${t}&offset=0`;try{let e=await fetch(n);if(!e.ok)throw e.status>=500?Error(`Error del servidor (${e.status}). Intenta más tarde.`):Error(`Error HTTP: ${e.status}`);let t=await e.json();return(await Promise.all(t.results.map(async e=>{let t=await fetch(e.url);return t.ok?await t.json():null}))).filter(e=>e!==null)}catch(e){return e.message.includes(`Failed to fetch`)||e.name===`TypeError`?c.textContent=`Sin conexión a internet. Verifica tu red e intenta de nuevo.`:c.textContent=`Error: ${e.message}`,v(`error`),[]}},x=async t=>{try{let[n,r]=await Promise.all([fetch(`${e}/${t}`),fetch(`https://pokeapi.co/api/v2/pokemon-species/${t}`)]);if(!n.ok||!r.ok)throw Error(`No se pudo obtener el detalle.`);return{pokemon:await n.json(),especie:await r.json()}}catch(e){return console.error(`Error al obtener detalle:`,e),null}},S={fire:`#F08030`,water:`#6890F0`,grass:`#78C850`,electric:`#F8D030`,ice:`#98D8D8`,fighting:`#C03028`,poison:`#A040A0`,ground:`#E0C068`,flying:`#A890F0`,psychic:`#F85888`,bug:`#A8B820`,rock:`#B8A038`,ghost:`#705898`,dragon:`#7038F8`,dark:`#705848`,steel:`#B8B8D0`,fairy:`#EE99AC`,normal:`#A8A878`},C=e=>{if(o.innerHTML=``,e.length===0){v(`vacio`);return}let t=document.createDocumentFragment();e.forEach(e=>{let n=e.types.map(e=>e.type.name),r=S[n[0]]||`#A8A878`,i=document.createElement(`article`);i.classList.add(`pokemon-card`),i.dataset.id=e.id,i.style.borderColor=r,i.innerHTML=`
            <div class="pokemon-card-img" style="background-color: ${r}20">
                <img src="${e.sprites.other[`official-artwork`].front_default||e.sprites.front_default}" alt="${e.name}" loading="lazy">
            </div>
            <div class="pokemon-card-info">
                <span class="pokemon-numero">#${String(e.id).padStart(3,`0`)}</span>
                <h3 class="pokemon-nombre">${e.name}</h3>
                <div class="pokemon-tipos">
                    ${n.map(e=>`<span class="tipo-badge" style="background-color: ${S[e]||`#A8A878`}">${e}</span>`).join(``)}
                </div>
            </div>
        `,i.addEventListener(`click`,()=>{w(e.id)}),t.appendChild(i)}),o.appendChild(t),v(`resultados`)},w=async e=>{g.innerHTML=`<div class="spinner"></div><p style="text-align:center;color:var(--primary-color);">Cargando detalle...</p>`,m.classList.add(`activo`);let t=await x(e);if(!t){g.innerHTML=`<p style="text-align:center;color:#f85149;">Error al cargar el detalle.</p>`;return}let{pokemon:n,especie:r}=t,i=n.types.map(e=>e.type.name),a=S[i[0]]||`#A8A878`,o=r.flavor_text_entries.find(e=>e.language.name===`es`)||r.flavor_text_entries.find(e=>e.language.name===`en`),s=o?o.flavor_text.replace(/\f|\n/g,` `):`Sin descripción disponible.`,c=n.abilities.map(e=>e.ability.name).join(`, `),l=n.stats.map(e=>({nombre:e.stat.name,valor:e.base_stat})).map(e=>`
        <div class="stat-row">
            <span class="stat-nombre">${e.nombre}</span>
            <div class="stat-barra-bg">
                <div class="stat-barra" style="width: ${Math.min(e.valor,200)/2}%; background-color: ${a}"></div>
            </div>
            <span class="stat-valor">${e.valor}</span>
        </div>
    `).join(``);g.innerHTML=`
        <div class="detalle-header" style="background-color: ${a}20">
            <img src="${n.sprites.other[`official-artwork`].front_default||n.sprites.front_default}" alt="${n.name}">
            <div class="detalle-titulo">
                <span class="pokemon-numero">#${String(n.id).padStart(3,`0`)}</span>
                <h2>${n.name}</h2>
                <div class="pokemon-tipos">
                    ${i.map(e=>`<span class="tipo-badge" style="background-color: ${S[e]||`#A8A878`}">${e}</span>`).join(``)}
                </div>
            </div>
        </div>
        <div class="detalle-body">
            <p class="detalle-descripcion">${s}</p>
            <div class="detalle-info-grid">
                <div class="detalle-info-item">
                    <i class="fa-solid fa-ruler-vertical"></i>
                    <strong>Altura</strong>
                    <span>${(n.height/10).toFixed(1)} m</span>
                </div>
                <div class="detalle-info-item">
                    <i class="fa-solid fa-weight-hanging"></i>
                    <strong>Peso</strong>
                    <span>${(n.weight/10).toFixed(1)} kg</span>
                </div>
                <div class="detalle-info-item">
                    <i class="fa-solid fa-bolt"></i>
                    <strong>Exp. Base</strong>
                    <span>${n.base_experience||`N/A`}</span>
                </div>
                <div class="detalle-info-item">
                    <i class="fa-solid fa-star"></i>
                    <strong>Habilidades</strong>
                    <span>${c}</span>
                </div>
            </div>
            <h4>Estadísticas Base</h4>
            <div class="detalle-stats">
                ${l}
            </div>
        </div>
    `};r.addEventListener(`click`,async()=>{let e=n.value.trim();if(e===``)return;_={tipo:`buscar`,valor:e},v(`cargando`);let t=await y(e);t&&C([t])}),n.addEventListener(`keydown`,e=>{e.key===`Enter`&&r.click()}),i.addEventListener(`click`,async()=>{_={tipo:`listar`},v(`cargando`);let e=await b();e.length>0&&C(e)}),a.addEventListener(`click`,()=>{_&&(_.tipo===`buscar`?(n.value=_.valor,r.click()):_.tipo===`listar`&&i.click())}),h.addEventListener(`click`,()=>{m.classList.remove(`activo`)}),m.addEventListener(`click`,e=>{e.target===m&&m.classList.remove(`activo`)});