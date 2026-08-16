// ======================================================
// V7.0 · NOYAU GLOBAL RGS
// Toasts, erreurs de modules et utilitaires partagés
// ======================================================

window.RGS = window.RGS || {};


window.RGS.showToast =
    function (
        message,
        type = "info",
        duration = 4000
    ) {
        let container =
            document.querySelector(
                ".rgs-toast-container"
            );

        if (!container) {
            container =
                document.createElement(
                    "div"
                );

            container.className =
                "rgs-toast-container";

            container.setAttribute(
                "aria-live",
                "polite"
            );

            container.setAttribute(
                "aria-atomic",
                "false"
            );

            document.body.appendChild(
                container
            );
        }


        const toast =
            document.createElement(
                "div"
            );

        const safeType =
            [
                "info",
                "success",
                "error",
                "warning"
            ].includes(type)
                ?
                type
                :
                "info";


        toast.className =
            `rgs-toast ${safeType}`;

        toast.setAttribute(
            "role",
            safeType === "error"
                ?
                "alert"
                :
                "status"
        );


        const icon =
            document.createElement(
                "span"
            );

        icon.className =
            "toast-icon";

        icon.textContent =
            safeType === "error"
                ?
                "⚠️"
                :
            safeType === "warning"
                ?
                "ℹ️"
                :
                "✓";


        const text =
            document.createElement(
                "span"
            );

        /*
          textContent est volontairement utilisé ici.
          Aucun HTML arbitraire n'est injecté dans un toast.
        */
        text.textContent =
            String(
                message ?? ""
            );


        toast.append(
            icon,
            text
        );

        container.appendChild(
            toast
        );


        requestAnimationFrame(
            () => {
                toast.classList.add(
                    "show"
                );
            }
        );


        const lifetime =
            Number.isFinite(
                Number(duration)
            )
                ?
                Math.max(
                    1200,
                    Number(duration)
                )
                :
                4000;


        setTimeout(
            () => {
                toast.classList.remove(
                    "show"
                );

                setTimeout(
                    () => {
                        toast.remove();

                        if (
                            container &&
                            !container.children.length
                        ) {
                            container.remove();
                        }
                    },
                    420
                );
            },
            lifetime
        );
    };


window.RGS.getText =
    function (
        key,
        fallback
    ) {
        const translated =
            window.RGS
                ?.i18n
                ?.t
                ?.(key);

        if (
            translated &&
            translated !== key
        ) {
            return translated;
        }

        return fallback
            ||
            key;
    };


window.RGS.renderModuleError =
    function (
        panel,
        moduleName,
        error,
        retryFn
    ) {
        console.error(
            `[RGS:${moduleName}]`,
            error
        );

        if (!panel) {
            return;
        }


        const title =
            window.RGS.getText(
                "errors.moduleTitle",
                "No se pudo cargar el módulo"
            );

        const body =
            window.RGS.getText(
                "errors.moduleBody",
                "Puede tratarse de una interrupción temporal. Inténtalo de nuevo."
            );

        const retry =
            window.RGS.getText(
                "errors.retry",
                "Reintentar"
            );


        panel.replaceChildren();


        const article =
            document.createElement(
                "article"
            );

        article.className =
            "panel rgs-module-error";


        const icon =
            document.createElement(
                "span"
            );

        icon.className =
            "rgs-module-error-icon";

        icon.textContent =
            "⚠️";


        const heading =
            document.createElement(
                "h3"
            );

        heading.textContent =
            `${title} · ${moduleName}`;


        const paragraph =
            document.createElement(
                "p"
            );

        paragraph.textContent =
            body;


        article.append(
            icon,
            heading,
            paragraph
        );


        if (
            typeof retryFn ===
            "function"
        ) {
            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.className =
                "rgs-retry-button";

            button.textContent =
                `↻ ${retry}`;

            button.addEventListener(
                "click",
                retryFn,
                {
                    once:
                        true
                }
            );

            article.appendChild(
                button
            );
        }


        panel.appendChild(
            article
        );


        window.RGS.showToast(
            `${title}: ${moduleName}`,
            "error",
            5000
        );
    };




// ======================================================
// RED GLOBAL DE SOLUCIONES - NÚCLEO
// ======================================================

const botonBuscar = document.getElementById("buscarLugar");
const botonAnalizar = document.getElementById("analizar");
const campoTerritorio = document.getElementById("territorio");
const campoNecesidad = document.getElementById("necesidad");
const resultadosBusqueda = document.getElementById("resultadosBusqueda");
const lugarSeleccionadoCaja = document.getElementById("lugarSeleccionado");
const estadoProceso = document.getElementById("estadoProceso");
const dashboard = document.getElementById("dashboard");
const tituloTerritorio = document.getElementById("tituloTerritorio");
const subtituloTerritorio = document.getElementById("subtituloTerritorio");
const fechaConsulta = document.getElementById("fechaConsulta");
const datoAguaPotable = document.getElementById("datoAguaPotable");
const datoPozos = document.getElementById("datoPozos");
const datoHospitales = document.getElementById("datoHospitales");
const datoEscuelas = document.getElementById("datoEscuelas");
const datoMercados = document.getElementById("datoMercados");
const diagnostico = document.getElementById("diagnostico");
const datosGenerales = document.getElementById("datosGenerales");
const datosWikidata = document.getElementById("datosWikidata");
const necesidadMostrada = document.getElementById("necesidadMostrada");
const fuenteWikidata = document.getElementById("fuenteWikidata");

const RADIO_ANALISIS = 10000;

const SERVIDORES_OVERPASS = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.private.coffee/api/interpreter"
];

let mapa = null;
let marcadorPrincipal = null;
let capaInfraestructuras = null;
let circuloAnalisis = null;
let lugarSeleccionado = null;

window.appState = {
    lugarSeleccionado: null,
    latitud: null,
    longitud: null,
    territorioAnalizado: null,
    necesidad: null,
    countryCode: null,
    pais: null,

    overpassDisponible: false,
    infraestructura: null,

    wikidataDisponible: false,
    poblacion: null,
    poblacionAnio: null,
    hogares: null,

    meteorologia: null,

    moduloSugerido: "resumen",
    ultimaConsulta: null
};


// ======================================================
// UTILIDADES
// ======================================================

function escaparHTML(texto) {
    return String(texto ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function formatearNumero(numero) {
    if (
        numero === null ||
        numero === undefined ||
        Number.isNaN(numero)
    ) {
        return "No disponible";
    }

    return Number(numero).toLocaleString("es-ES");
}

function obtenerAnioWikidata(tiempo) {
    if (!tiempo) return null;

    const coincidencia =
        String(tiempo).match(/[+-](\d{4})-/);

    return coincidencia
        ? Number(coincidencia[1])
        : null;
}

function evaluarAntiguedad(anio) {
    if (!anio) {
        return {
            icono: "🟡",
            texto: "Fecha no indicada"
        };
    }

    const antiguedad =
        new Date().getFullYear() - anio;

    if (antiguedad <= 5) {
        return {
            icono: "🟢",
            texto: `Dato relativamente reciente (${anio})`
        };
    }

    if (antiguedad <= 10) {
        return {
            icono: "🟡",
            texto: `Dato que conviene actualizar (${anio})`
        };
    }

    return {
        icono: "🟠",
        texto: `Dato histórico (${anio})`
    };
}

function filaDato(etiqueta, valor) {
    return `
        <div class="data-row">
            <span class="data-label">${etiqueta}</span>
            <span class="data-value">${valor}</span>
        </div>
    `;
}

function itemDiagnostico(icono, titulo, descripcion) {
    return `
        <div class="diagnosis-item">
            <div class="diagnosis-icon">${icono}</div>
            <div>
                <strong>${titulo}</strong>
                <span>${descripcion}</span>
            </div>
        </div>
    `;
}

async function fetchConTimeout(
    url,
    opciones = {},
    milisegundos = 30000
) {
    const controlador = new AbortController();

    const temporizador = setTimeout(
        () => controlador.abort(),
        milisegundos
    );

    try {
        return await fetch(url, {
            ...opciones,
            signal: controlador.signal
        });
    } finally {
        clearTimeout(temporizador);
    }
}


// ======================================================
// WIKIDATA
// ======================================================

async function buscarEnWikidata(nombre) {
    const termino =
        nombre.split(",")[0].trim();

    const idiomas = ["es", "fr", "en"];

    for (const idioma of idiomas) {
        try {
            const urlBusqueda =
                "https://www.wikidata.org/w/api.php" +
                "?action=wbsearchentities" +
                "&format=json" +
                "&origin=*" +
                "&limit=1" +
                "&type=item" +
                `&language=${idioma}` +
                `&search=${encodeURIComponent(termino)}`;

            const respuesta =
                await fetchConTimeout(
                    urlBusqueda,
                    {},
                    20000
                );

            if (!respuesta.ok) continue;

            const datos =
                await respuesta.json();

            if (
                !datos.search ||
                !datos.search.length
            ) {
                continue;
            }

            const qid =
                datos.search[0].id;

            const urlEntidad =
                "https://www.wikidata.org/w/api.php" +
                "?action=wbgetentities" +
                "&format=json" +
                "&origin=*" +
                `&ids=${qid}` +
                "&props=labels|descriptions|claims" +
                "&languages=es|fr|en";

            const respuestaEntidad =
                await fetchConTimeout(
                    urlEntidad,
                    {},
                    20000
                );

            if (!respuestaEntidad.ok) continue;

            const datosEntidad =
                await respuestaEntidad.json();

            const entidad =
                datosEntidad.entities?.[qid];

            if (!entidad) continue;

            return {
                qid,
                entidad
            };

        } catch (error) {
            console.warn(
                "Wikidata:",
                error
            );
        }
    }

    return null;
}

function extraerCantidadConFecha(
    claims,
    propiedad
) {
    const declaraciones =
        claims?.[propiedad];

    if (
        !declaraciones ||
        !declaraciones.length
    ) {
        return {
            valor: null,
            anio: null
        };
    }

    const resultados = [];

    declaraciones.forEach(
        declaracion => {
            const cantidad =
                declaracion
                    ?.mainsnak
                    ?.datavalue
                    ?.value
                    ?.amount;

            if (
                cantidad === undefined
            ) {
                return;
            }

            const tiempo =
                declaracion
                    ?.qualifiers
                    ?.P585?.[0]
                    ?.datavalue
                    ?.value
                    ?.time;

            resultados.push({
                valor: Number(cantidad),
                anio:
                    obtenerAnioWikidata(
                        tiempo
                    )
            });
        }
    );

    resultados.sort(
        (a, b) => {
            if (a.anio && b.anio) {
                return b.anio - a.anio;
            }
            if (a.anio) return -1;
            if (b.anio) return 1;
            return 0;
        }
    );

    return resultados[0] || {
        valor: null,
        anio: null
    };
}


// ======================================================
// OVERPASS PRINCIPAL
// ======================================================

async function consultarOverpass(
    latitud,
    longitud
) {
    const consulta = `
        [out:json][timeout:20];
        (
            nwr["amenity"="drinking_water"]
                (around:${RADIO_ANALISIS},${latitud},${longitud});

            nwr["man_made"="water_well"]
                (around:${RADIO_ANALISIS},${latitud},${longitud});

            nwr["amenity"="hospital"]
                (around:${RADIO_ANALISIS},${latitud},${longitud});

            nwr["amenity"="school"]
                (around:${RADIO_ANALISIS},${latitud},${longitud});

            nwr["amenity"="marketplace"]
                (around:${RADIO_ANALISIS},${latitud},${longitud});
        );
        out center tags qt;
    `;

    for (
        const servidor
        of SERVIDORES_OVERPASS
    ) {
        try {
            const cuerpo =
                new URLSearchParams();

            cuerpo.set(
                "data",
                consulta
            );

            const respuesta =
                await fetchConTimeout(
                    servidor,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/x-www-form-urlencoded;charset=UTF-8"
                        },
                        body: cuerpo.toString()
                    },
                    30000
                );

            if (!respuesta.ok) {
                continue;
            }

            const datos =
                await respuesta.json();

            if (
                !datos ||
                !Array.isArray(
                    datos.elements
                )
            ) {
                continue;
            }

            return {
                disponible: true,
                servidor,
                elements: datos.elements
            };

        } catch (error) {
            console.warn(
                "Overpass:",
                servidor,
                error
            );
        }
    }

    return {
        disponible: false,
        servidor: null,
        elements: []
    };
}


// ======================================================
// BUSCADOR MUNDIAL
// ======================================================

async function buscarLugares() {
    const texto =
        campoTerritorio.value.trim();

    if (!texto) {
        estadoProceso.textContent =
            "⚠️ Escribe un lugar.";
        return;
    }

    botonBuscar.disabled = true;
    botonAnalizar.disabled = true;
    lugarSeleccionado = null;

    window.appState
        .lugarSeleccionado = null;

    window.appState.countryCode =
        null;

    window.appState.pais =
        null;

    window.appState.infraestructura =
        null;

    window.appState.overpassDisponible =
        false;

    window.appState.wikidataDisponible =
        false;

    window.appState.poblacion =
        null;

    window.appState.poblacionAnio =
        null;

    window.appState.hogares =
        null;

    window.appState.meteorologia =
        null;

    window.appState.moduloSugerido =
        "resumen";

    resultadosBusqueda
        .classList
        .add("hidden");

    lugarSeleccionadoCaja
        .classList
        .add("hidden");

    estadoProceso.textContent =
        "Buscando coincidencias…";

    try {
        const url =
            "https://nominatim.openstreetmap.org/search" +
            "?format=jsonv2" +
            `&q=${encodeURIComponent(texto)}` +
            "&limit=8" +
            "&addressdetails=1" +
            "&namedetails=1";

        const respuesta =
            await fetchConTimeout(
                url,
                {},
                20000
            );

        if (!respuesta.ok) {
            throw new Error(
                `Nominatim: ${respuesta.status}`
            );
        }

        const lugares =
            await respuesta.json();

        if (!lugares.length) {
            resultadosBusqueda.innerHTML = `
                <div class="place-empty">
                    No se encontraron coincidencias.
                </div>
            `;

            resultadosBusqueda
                .classList
                .remove("hidden");

            estadoProceso.textContent =
                "No se encontraron lugares.";

            return;
        }

        resultadosBusqueda.innerHTML = "";

        lugares.forEach(
            lugar => {
                const boton =
                    document.createElement(
                        "button"
                    );

                boton.type = "button";
                boton.className =
                    "place-result";

                const tipo =
                    lugar.type ||
                    lugar.category ||
                    "lugar";

                const pais =
                    lugar.address?.country ||
                    "";

                const codigoPais =
                    lugar.address
                        ?.country_code
                        ?.toUpperCase() ||
                    "";

                boton.innerHTML = `
                    <div>
                        <span class="place-main">
                            ${escaparHTML(
                                lugar.display_name
                            )}
                        </span>

                        <span class="place-detail">
                            ${escaparHTML(pais)}
                            ${
                                codigoPais
                                    ? ` · ${codigoPais}`
                                    : ""
                            }
                            · Lat. ${Number(lugar.lat).toFixed(4)}
                            · Lon. ${Number(lugar.lon).toFixed(4)}
                        </span>
                    </div>

                    <span class="place-type">
                        ${escaparHTML(tipo)}
                    </span>
                `;

                boton.addEventListener(
                    "click",
                    () => seleccionarLugar(
                        lugar
                    )
                );

                resultadosBusqueda
                    .appendChild(
                        boton
                    );
            }
        );

        resultadosBusqueda
            .classList
            .remove("hidden");

        estadoProceso.textContent =
            "Selecciona el lugar correcto.";

    } catch (error) {
        console.error(
            "Búsqueda:",
            error
        );

        estadoProceso.textContent =
            "❌ No se pudo realizar la búsqueda.";

    } finally {
        botonBuscar.disabled = false;
    }
}

function seleccionarLugar(lugar) {
    lugarSeleccionado = lugar;

    window.appState
        .lugarSeleccionado = lugar;

    window.appState
        .countryCode =
        lugar.address
            ?.country_code
            ?.toUpperCase()
        ||
        null;

    resultadosBusqueda
        .classList
        .add("hidden");

    lugarSeleccionadoCaja.innerHTML = `
        <strong>
            ✓ Territorio seleccionado
        </strong>
        <span>
            ${escaparHTML(
                lugar.display_name
            )}
        </span>
    `;

    lugarSeleccionadoCaja
        .classList
        .remove("hidden");

    botonAnalizar.disabled = false;

    estadoProceso.textContent =
        "Territorio preparado para el análisis.";
}

campoTerritorio.addEventListener(
    "keydown",
    evento => {
        if (evento.key === "Enter") {
            evento.preventDefault();
            buscarLugares();
        }
    }
);

botonBuscar.addEventListener(
    "click",
    buscarLugares
);


// ======================================================
// PESTAÑAS
// ======================================================

function seleccionarTab(nombre) {
    document
        .querySelectorAll(
            ".tab-button"
        )
        .forEach(
            boton => {
                boton.classList.toggle(
                    "active",
                    boton.dataset.tab ===
                    nombre
                );
            }
        );

    document
        .querySelectorAll(
            ".tab-panel"
        )
        .forEach(
            panel => {
                panel.classList.toggle(
                    "active",
                    panel.id ===
                    `tab-${nombre}`
                );
            }
        );
}

window.seleccionarTab =
    seleccionarTab;

window.refrescarMapa =
    function () {
        setTimeout(
            () => mapa?.invalidateSize(),
            120
        );
    };

document
    .querySelectorAll(
        ".tab-button"
    )
    .forEach(
        boton => {
            boton.addEventListener(
                "click",
                function () {
                    seleccionarTab(
                        this.dataset.tab
                    );
                }
            );
        }
    );


// ======================================================
// MAPA
// ======================================================

function asegurarCapaInfraestructuras() {
    if (
        capaInfraestructuras
        &&
        typeof capaInfraestructuras
            .clearLayers ===
            "function"
    ) {
        capaInfraestructuras
            .clearLayers();


        if (
            mapa
            &&
            typeof mapa.hasLayer ===
                "function"
            &&
            !mapa.hasLayer(
                capaInfraestructuras
            )
        ) {
            capaInfraestructuras
                .addTo(
                    mapa
                );
        }

        return;
    }


    if (
        capaInfraestructuras
        &&
        mapa
        &&
        typeof mapa.hasLayer ===
            "function"
        &&
        mapa.hasLayer(
            capaInfraestructuras
        )
    ) {
        mapa.removeLayer(
            capaInfraestructuras
        );
    }


    capaInfraestructuras =
        typeof L.markerClusterGroup ===
            "function"
            ?
            L.markerClusterGroup(
                {
                    showCoverageOnHover:
                        false,

                    spiderfyOnMaxZoom:
                        true,

                    removeOutsideVisibleBounds:
                        true,

                    maxClusterRadius:
                        45,

                    disableClusteringAtZoom:
                        16
                }
            )
            :
            L.layerGroup();


    capaInfraestructuras.addTo(
        mapa
    );
}


function retirarCapaMapa(
    capa
) {
    if (
        !capa
        ||
        !mapa
    ) {
        return;
    }


    try {
        if (
            typeof mapa.hasLayer ===
                "function"
            &&
            mapa.hasLayer(
                capa
            )
        ) {
            mapa.removeLayer(
                capa
            );
        }
        else if (
            typeof capa.remove ===
            "function"
        ) {
            capa.remove();
        }
    }
    catch (error) {
        console.warn(
            "RGS · limpieza de capa Leaflet:",
            error
        );
    }
}


function prepararMapa(
    latitud,
    longitud,
    nombre
) {
    if (!mapa) {
        mapa =
            L.map(
                "mapa",
                {
                    preferCanvas:
                        true
                }
            )
            .setView(
                [
                    latitud,
                    longitud
                ],
                11
            );


        L.tileLayer(
            "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                maxZoom:
                    19,

                attribution:
                    "&copy; OpenStreetMap contributors"
            }
        )
        .addTo(
            mapa
        );


        asegurarCapaInfraestructuras();
    }
    else {
        mapa.setView(
            [
                latitud,
                longitud
            ],
            11
        );


        asegurarCapaInfraestructuras();
    }


    retirarCapaMapa(
        marcadorPrincipal
    );

    retirarCapaMapa(
        circuloAnalisis
    );


    /*
      Références mises à null avant recréation:
      permet au garbage collector de libérer les anciennes couches
      lorsque Leaflet n'en a plus besoin.
    */
    marcadorPrincipal =
        null;

    circuloAnalisis =
        null;


    marcadorPrincipal =
        L.marker(
            [
                latitud,
                longitud
            ]
        )
        .addTo(
            mapa
        )
        .bindPopup(
            escaparHTML(
                nombre
            )
        );


    circuloAnalisis =
        L.circle(
            [
                latitud,
                longitud
            ],
            {
                radius:
                    RADIO_ANALISIS,

                fillOpacity:
                    0.025,

                opacity:
                    0.18
            }
        )
        .addTo(
            mapa
        );


    window.appMap =
        mapa;


    requestAnimationFrame(
        () => {
            setTimeout(
                () => {
                    mapa
                        ?.invalidateSize(
                            {
                                pan:
                                    false
                            }
                        );
                },
                120
            );
        }
    );
}


// ======================================================
// INFRAESTRUCTURAS
// ======================================================

function procesarInfraestructuras(
    elementos
) {
    let aguaPotable = 0;
    let pozos = 0;
    let hospitales = 0;
    let escuelas = 0;
    let mercados = 0;
    let marcadores = 0;

    elementos.forEach(
        elemento => {
            const tags =
                elemento.tags || {};

            const esAguaPotable =
                tags.amenity ===
                "drinking_water";

            const esPozo =
                tags.man_made ===
                "water_well";

            const esHospital =
                tags.amenity ===
                "hospital";

            const esEscuela =
                tags.amenity ===
                "school";

            const esMercado =
                tags.amenity ===
                "marketplace";

            if (esAguaPotable) aguaPotable++;
            if (esPozo) pozos++;
            if (esHospital) hospitales++;
            if (esEscuela) escuelas++;
            if (esMercado) mercados++;

            const lat =
                elemento.lat ??
                elemento.center?.lat;

            const lon =
                elemento.lon ??
                elemento.center?.lon;

            if (
                lat === undefined ||
                lon === undefined
            ) {
                return;
            }

            if (marcadores >= 150) {
                return;
            }

            let icono = "📍";
            let tipo = "Infraestructura";

            if (
                esAguaPotable &&
                esPozo
            ) {
                icono = "💧";
                tipo =
                    "Pozo con agua potable";
            }
            else if (
                esAguaPotable
            ) {
                icono = "💧";
                tipo =
                    "Punto de agua potable";
            }
            else if (
                esPozo
            ) {
                icono = "🕳️";
                tipo = "Pozo";
            }
            else if (
                esHospital
            ) {
                icono = "🏥";
                tipo = "Hospital";
            }
            else if (
                esEscuela
            ) {
                icono = "🏫";
                tipo = "Escuela";
            }
            else if (
                esMercado
            ) {
                icono = "🛒";
                tipo = "Mercado";
            }

            const nombre =
                tags.name ||
                "Sin nombre registrado";

            const iconoMapa =
                L.divIcon({
                    html:
                        `<div class="marcador-emoji">${icono}</div>`,
                    className: "",
                    iconSize: [32, 32],
                    iconAnchor: [16, 16]
                });

            L.marker(
                [lat, lon],
                {
                    icon: iconoMapa
                }
            )
            .addTo(
                capaInfraestructuras
            )
            .bindPopup(`
                <strong>
                    ${escaparHTML(tipo)}
                </strong>
                <br>
                ${escaparHTML(nombre)}
            `);

            marcadores++;
        }
    );

    return {
        aguaPotable,
        pozos,
        hospitales,
        escuelas,
        mercados
    };
}


// ======================================================
// INTERPRETAR NECESIDAD
// ======================================================

function normalizarTexto(texto) {
    return String(texto || "")
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .toLowerCase();
}

function detectarModulo(necesidad) {
    const texto =
        normalizarTexto(
            necesidad
        );

    const palabrasHidrogeologia = [
        "hidrogeologia",
        "hidrogeologico",
        "hidrogeologica",
        "acuifero",
        "acuiferos",
        "nivel freatico",
        "agua subterranea",
        "profundidad del agua",
        "groundwater"
    ];

    const palabrasAgua = [
        "agua",
        "pozo",
        "pozos",
        "riego",
        "hidrica",
        "hidrico",
        "sequia"
    ];

    const palabrasClima = [
        "clima",
        "temperatura",
        "lluvia",
        "meteorologia",
        "tiempo"
    ];

    if (
        palabrasHidrogeologia.some(
            palabra =>
                texto.includes(
                    palabra
                )
        )
    ) {
        return "hidrogeologia";
    }

    if (
        palabrasAgua.some(
            palabra =>
                texto.includes(
                    palabra
                )
        )
    ) {
        return "agua";
    }

    if (
        palabrasClima.some(
            palabra =>
                texto.includes(
                    palabra
                )
        )
    ) {
        return "clima";
    }

    return "resumen";
}


// ======================================================
// ANALIZAR TERRITORIO
// ======================================================

botonAnalizar.addEventListener(
    "click",
    async function () {
        const necesidad =
            campoNecesidad
                .value
                .trim();

        if (!lugarSeleccionado) {
            estadoProceso.textContent =
                "⚠️ Primero selecciona un territorio.";
            return;
        }

        if (!necesidad) {
            estadoProceso.textContent =
                "⚠️ Describe la necesidad que quieres estudiar.";
            return;
        }

        botonAnalizar.disabled = true;

        const lugar =
            lugarSeleccionado;

        const latitud =
            Number(lugar.lat);

        const longitud =
            Number(lugar.lon);

        window.appState.latitud =
            latitud;

        window.appState.longitud =
            longitud;

        window.appState.countryCode =
            lugar.address
                ?.country_code
                ?.toUpperCase()
            ||
            window.appState.countryCode
            ||
            null;

        window.appState.pais =
            lugar.address?.country
            ||
            null;

        window.appState.ultimaConsulta =
            new Date().toISOString();

        window.appState
            .territorioAnalizado =
            lugar.display_name;

        window.appState.necesidad =
            necesidad;

        dashboard
            .classList
            .remove("hidden");

        tituloTerritorio.textContent =
            lugar.display_name
                .split(",")[0];

        subtituloTerritorio.textContent =
            lugar.display_name;

        fechaConsulta.textContent =
            new Date()
                .toLocaleString(
                    "es-ES"
                );

        necesidadMostrada.textContent =
            necesidad;

        datoAguaPotable.textContent = "…";
        datoPozos.textContent = "…";
        datoHospitales.textContent = "…";
        datoEscuelas.textContent = "…";
        datoMercados.textContent = "…";

        diagnostico.innerHTML =
            itemDiagnostico(
                "🟢",
                "Territorio identificado",
                escaparHTML(
                    lugar.display_name
                )
            )
            +
            itemDiagnostico(
                "⏳",
                "Fuentes de datos",
                "Consultando Wikidata y OpenStreetMap."
            );

        try {
            prepararMapa(
                latitud,
                longitud,
                lugar.display_name
            );
        } catch (errorMapa) {
            console.error(
                "Mapa:",
                errorMapa
            );
        }

        datosGenerales.innerHTML =
            filaDato(
                "Localización",
                escaparHTML(
                    lugar.display_name
                )
            )
            +
            filaDato(
                "País",
                escaparHTML(
                    lugar.address?.country ||
                    "No indicado"
                )
            )
            +
            filaDato(
                "Tipo",
                escaparHTML(
                    lugar.type ||
                    lugar.category ||
                    "No indicado"
                )
            )
            +
            filaDato(
                "Latitud",
                latitud
            )
            +
            filaDato(
                "Longitud",
                longitud
            )
            +
            filaDato(
                "Área OSM",
                `${RADIO_ANALISIS / 1000} km de radio`
            );

        estadoProceso.textContent =
            "Consultando fuentes internacionales…";

        const resultados =
            await Promise.allSettled([
                buscarEnWikidata(
                    lugar.display_name
                ),
                consultarOverpass(
                    latitud,
                    longitud
                )
            ]);

        // WIKIDATA
        let wikidata = null;

        if (
            resultados[0].status ===
            "fulfilled"
        ) {
            wikidata =
                resultados[0].value;
        }

        let poblacion = {
            valor: null,
            anio: null
        };

        let hogares = {
            valor: null,
            anio: null
        };

        if (wikidata) {
            const entidad =
                wikidata.entidad;

            const nombreWikidata =
                entidad.labels?.es?.value
                ||
                entidad.labels?.fr?.value
                ||
                entidad.labels?.en?.value
                ||
                lugar.display_name
                    .split(",")[0];

            const descripcionWikidata =
                entidad.descriptions?.es?.value
                ||
                entidad.descriptions?.fr?.value
                ||
                entidad.descriptions?.en?.value
                ||
                "Sin descripción";

            poblacion =
                extraerCantidadConFecha(
                    entidad.claims,
                    "P1082"
                );

            hogares =
                extraerCantidadConFecha(
                    entidad.claims,
                    "P1538"
                );

            fuenteWikidata
                .classList
                .add("active");

            window.appState.wikidataDisponible =
                true;

            window.appState.poblacion =
                poblacion.valor;

            window.appState.poblacionAnio =
                poblacion.anio;

            window.appState.hogares =
                hogares.valor;

            tituloTerritorio.textContent =
                nombreWikidata;

            datosWikidata.innerHTML =
                filaDato(
                    "Entidad",
                    escaparHTML(
                        nombreWikidata
                    )
                )
                +
                filaDato(
                    "Descripción",
                    escaparHTML(
                        descripcionWikidata
                    )
                )
                +
                filaDato(
                    "Población",
                    formatearNumero(
                        poblacion.valor
                    )
                )
                +
                filaDato(
                    "Fecha población",
                    poblacion.anio ||
                    "No indicada"
                )
                +
                filaDato(
                    "Hogares",
                    formatearNumero(
                        hogares.valor
                    )
                )
                +
                filaDato(
                    "Identificador",
                    `<a
                        href="https://www.wikidata.org/wiki/${wikidata.qid}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        ${wikidata.qid}
                    </a>`
                );
        } else {
            fuenteWikidata
                .classList
                .remove("active");

            window.appState.wikidataDisponible =
                false;

            window.appState.poblacion =
                null;

            window.appState.poblacionAnio =
                null;

            window.appState.hogares =
                null;

            datosWikidata.innerHTML = `
                <p class="empty-message">
                    Wikidata no está disponible
                    o no se encontró una coincidencia clara.
                </p>
            `;
        }

        // OVERPASS
        let overpass = {
            disponible: false,
            servidor: null,
            elements: []
        };

        if (
            resultados[1].status ===
            "fulfilled"
        ) {
            overpass =
                resultados[1].value;
        }

        if (
            overpass.disponible
        ) {
            window.appState
                .overpassDisponible =
                true;

            const infra =
                procesarInfraestructuras(
                    overpass.elements
                );

            window.appState.infraestructura =
                {
                    ...infra,
                    radioKm:
                        RADIO_ANALISIS / 1000,
                    fuente:
                        "OpenStreetMap / Overpass"
                };

            datoAguaPotable.textContent =
                infra.aguaPotable;

            datoPozos.textContent =
                infra.pozos;

            datoHospitales.textContent =
                infra.hospitales;

            datoEscuelas.textContent =
                infra.escuelas;

            datoMercados.textContent =
                infra.mercados;
        } else {
            window.appState
                .overpassDisponible =
                false;

            window.appState.infraestructura =
                null;

            datoAguaPotable.textContent =
                "N/D";

            datoPozos.textContent =
                "N/D";

            datoHospitales.textContent =
                "N/D";

            datoEscuelas.textContent =
                "N/D";

            datoMercados.textContent =
                "N/D";
        }

        // DIAGNÓSTICO
        let diagnosticoHTML = "";

        diagnosticoHTML +=
            itemDiagnostico(
                "🟢",
                "Territorio identificado",
                escaparHTML(
                    lugar.display_name
                )
            );

        diagnosticoHTML +=
            overpass.disponible
                ?
                itemDiagnostico(
                    "🟢",
                    "Infraestructuras OSM",
                    `Consulta realizada correctamente en un radio local de ${RADIO_ANALISIS / 1000} km.`
                )
                :
                itemDiagnostico(
                    "🟠",
                    "Infraestructuras OSM",
                    "El servicio Overpass no ha respondido. Esto no demuestra ausencia de infraestructuras."
                );

        if (
            poblacion.valor !==
            null
        ) {
            const evaluacion =
                evaluarAntiguedad(
                    poblacion.anio
                );

            diagnosticoHTML +=
                itemDiagnostico(
                    evaluacion.icono,
                    "Población",
                    `${formatearNumero(poblacion.valor)} habitantes. ${evaluacion.texto}.`
                );
        } else {
            diagnosticoHTML +=
                itemDiagnostico(
                    "🟡",
                    "Población",
                    "No se ha obtenido un dato demográfico verificable."
                );
        }

        diagnosticoHTML +=
            itemDiagnostico(
                "🔵",
                "Necesidad declarada",
                escaparHTML(
                    necesidad
                )
            );

        diagnosticoHTML +=
            itemDiagnostico(
                "🟢",
                "Meteorología",
                "Disponible mediante Open-Meteo en la pestaña Clima."
            );

        diagnosticoHTML +=
            itemDiagnostico(
                "🟠",
                "Agua",
                "La pestaña Agua separa agua potable, pozos, cursos de agua y embalses registrados."
            );

        diagnosticoHTML +=
            itemDiagnostico(
                "🔴",
                "Hidrogeología",
                "Todavía no hay una base de acuíferos o nivel freático conectada."
            );

        diagnostico.innerHTML =
            diagnosticoHTML;

        estadoProceso.textContent =
            overpass.disponible
                ?
                "✓ Análisis completado"
                :
                "✓ Análisis parcial: Overpass temporalmente no disponible";

        setTimeout(
            () => mapa?.invalidateSize(),
            250
        );

        const modulo =
            detectarModulo(
                necesidad
            );

        window.appState.moduloSugerido =
            modulo;

        seleccionarTab(
            "diagnostico"
        );

        window.cargarModuloDiagnostico
            ?.();

        document.dispatchEvent(
            new CustomEvent(
                "territorio:actualizado",
                {
                    detail: {
                        ...window.appState
                    }
                }
            )
        );

        dashboard.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        botonAnalizar.disabled = false;
    }
);
