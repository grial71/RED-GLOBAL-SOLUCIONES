// ======================================================
// V6 · CENTRO GLOBAL DE RECURSOS
// Catálogo inicial + búsqueda contextual
// ======================================================

const vistaTerritorio =
    document.getElementById("vistaTerritorio");

const vistaRecursos =
    document.getElementById("vistaRecursos");

const botonesVista =
    document.querySelectorAll(
        "[data-view-target]"
    );

const resourceTerritoryName =
    document.getElementById(
        "resourceTerritoryName"
    );

const resourceTerritoryDetail =
    document.getElementById(
        "resourceTerritoryDetail"
    );

const resourceQuery =
    document.getElementById(
        "resourceQuery"
    );

const resourceSearchButton =
    document.getElementById(
        "resourceSearchButton"
    );

const resourceActor =
    document.getElementById(
        "resourceActor"
    );

const resourceScope =
    document.getElementById(
        "resourceScope"
    );

const resourceUseTerritory =
    document.getElementById(
        "resourceUseTerritory"
    );

const resourceCategoryButtons =
    document.querySelectorAll(
        "[data-resource-category]"
    );

const resourceResults =
    document.getElementById(
        "resourceResults"
    );

const resourceEmpty =
    document.getElementById(
        "resourceEmpty"
    );

const resourceResultCount =
    document.getElementById(
        "resourceResultCount"
    );

const resourceResultsSummary =
    document.getElementById(
        "resourceResultsSummary"
    );


let categoriaRecursosActiva =
    "all";

let priorizarTerritorio =
    true;


// ======================================================
// CATÁLOGO INICIAL
// ======================================================

const CATALOGO_RECURSOS = [

    {
        id: "fao-elearning",
        categoria: "formacion",
        icono: "🎓",
        titulo: "FAO elearning Academy",
        entidad: "Food and Agriculture Organization of the United Nations",
        descripcion:
            "Portal internacional de aprendizaje sobre agricultura, alimentación, desarrollo rural, recursos naturales y sostenibilidad.",
        ambitos: ["global", "africa", "europe"],
        actores: ["all", "association", "cooperative", "community", "public", "project"],
        temas: [
            "agricultura", "riego", "agua", "alimentación", "desarrollo rural",
            "recursos naturales", "formación", "sostenibilidad", "clima"
        ],
        idiomas: ["es", "fr", "en", "pt", "ar", "zh", "ru", "it"],
        fiabilidad: "oficial",
        estado: "Portal oficial",
        nota:
            "Útil para capacitación técnica. Verifica en cada curso idioma, certificación y requisitos.",
        url: "https://elearning.fao.org/"
    },

    {
        id: "reliefweb-training",
        categoria: "formacion",
        icono: "🎓",
        titulo: "ReliefWeb Training",
        entidad: "OCHA / ReliefWeb",
        descripcion:
            "Buscador internacional de formación humanitaria, cursos, talleres y oportunidades de aprendizaje.",
        ambitos: ["global", "africa", "europe"],
        actores: ["all", "association", "community", "public", "project"],
        temas: [
            "humanitario", "formación", "crisis", "gestión de proyectos",
            "agua", "salud", "seguridad", "desarrollo"
        ],
        idiomas: ["en", "fr", "es"],
        fiabilidad: "oficial",
        estado: "Buscador oficial",
        nota:
            "Las ofertas cambian. La ficha de cada curso debe verificarse antes de presentarla como gratuita o abierta.",
        url: "https://reliefweb.int/training"
    },

    {
        id: "transition-network",
        categoria: "organizaciones",
        icono: "🏢",
        titulo: "Transition Network",
        entidad: "Transition Network International",
        descripcion:
            "Red internacional de grupos, hubs y prácticas de transición comunitaria, resiliencia y acción local.",
        ambitos: ["global", "africa", "europe"],
        actores: ["all", "association", "cooperative", "community", "public", "project"],
        temas: [
            "transición", "comunidades", "resiliencia", "economía local",
            "clima", "organizaciones", "proyectos comunitarios", "formación"
        ],
        idiomas: ["en", "es", "fr", "pt"],
        fiabilidad: "oficial",
        estado: "Red internacional",
        nota:
            "Puede servir para localizar grupos, hubs, entrenadores y experiencias comparables.",
        url: "https://transitionnetwork.org/"
    },

    {
        id: "unv-online",
        categoria: "organizaciones",
        icono: "🤝",
        titulo: "UN Volunteers · Online Volunteering",
        entidad: "United Nations Volunteers",
        descripcion:
            "Canal para que organizaciones elegibles conecten con personas voluntarias y capacidades profesionales en línea.",
        ambitos: ["global", "africa", "europe"],
        actores: ["association", "community", "public"],
        temas: [
            "voluntariado", "expertos", "capacidades", "datos", "formación",
            "gestión de proyectos", "comunicación", "tecnología"
        ],
        idiomas: ["en", "fr", "es"],
        fiabilidad: "oficial",
        estado: "Servicio oficial",
        nota:
            "La elegibilidad de la organización y las condiciones se verifican en la plataforma UNV.",
        url: "https://www.unv.org/engage-online-volunteers"
    },

    {
        id: "eu-funding",
        categoria: "financiacion",
        icono: "💶",
        titulo: "EU Funding & Tenders Portal",
        entidad: "European Commission",
        descripcion:
            "Punto de entrada para programas de financiación y convocatorias gestionadas por la Comisión Europea y otras instituciones de la UE.",
        ambitos: ["europe", "global"],
        actores: ["association", "cooperative", "social-enterprise", "public", "project"],
        temas: [
            "financiación", "subvenciones", "innovación", "investigación",
            "cooperación", "formación", "medio ambiente", "energía"
        ],
        idiomas: ["en", "fr", "es", "de", "it", "pt"],
        fiabilidad: "oficial",
        estado: "Portal de convocatorias",
        nota:
            "No toda convocatoria admite a todos los países o actores. Debe comprobarse la elegibilidad concreta.",
        url: "https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/calls-for-proposals"
    },

    {
        id: "ifad-grants",
        categoria: "financiacion",
        icono: "🌾",
        titulo: "IFAD Grants",
        entidad: "International Fund for Agricultural Development",
        descripcion:
            "Información sobre subvenciones relacionadas con transformación rural, agricultura, organizaciones de productores y capacidades.",
        ambitos: ["global", "africa"],
        actores: ["association", "cooperative", "public", "social-enterprise", "project"],
        temas: [
            "agricultura", "desarrollo rural", "financiación", "productores",
            "cooperativas", "innovación agrícola", "alimentación"
        ],
        idiomas: ["en", "fr", "es"],
        fiabilidad: "oficial",
        estado: "Portal oficial",
        nota:
            "El portal describe programas y convocatorias. Cada oportunidad requiere verificación de elegibilidad y plazo.",
        url: "https://www.ifad.org/en/grants"
    },

    {
        id: "gef-sgp",
        categoria: "financiacion",
        icono: "🌍",
        titulo: "GEF Small Grants Programme",
        entidad: "Global Environment Facility",
        descripcion:
            "Programa orientado a iniciativas comunitarias y ambientales, con mecanismos y condiciones que dependen de país y programa.",
        ambitos: ["global", "africa"],
        actores: ["association", "community", "cooperative", "project"],
        temas: [
            "medio ambiente", "biodiversidad", "clima", "agua",
            "comunidades", "financiación", "sostenibilidad"
        ],
        idiomas: ["en", "fr", "es"],
        fiabilidad: "oficial",
        estado: "Programa internacional",
        nota:
            "La disponibilidad y modalidad de financiación deben comprobarse en el país correspondiente.",
        url: "https://www.thegef.org/what-we-do/topics/gef-small-grants-program"
    },

    {
        id: "gif",
        categoria: "financiacion",
        icono: "💡",
        titulo: "Global Innovation Fund",
        entidad: "Global Innovation Fund",
        descripcion:
            "Fondo de innovación de impacto para soluciones con potencial de mejorar vidas y escalar.",
        ambitos: ["global", "africa"],
        actores: ["association", "social-enterprise", "public", "project"],
        temas: [
            "innovación", "impacto", "financiación", "tecnología",
            "desarrollo", "emprendimiento social"
        ],
        idiomas: ["en"],
        fiabilidad: "oficial",
        estado: "Verificar próxima convocatoria",
        nota:
            "No debe presentarse como convocatoria abierta sin una verificación actual del portal.",
        url: "https://www.globalinnovation.fund/apply-for-funding"
    },

    {
        id: "world-bank-projects",
        categoria: "proyectos",
        icono: "🌐",
        titulo: "World Bank Projects & Operations",
        entidad: "World Bank",
        descripcion:
            "Base para explorar proyectos y operaciones por país, sector y temática, útil para identificar experiencias y actores.",
        ambitos: ["global", "africa", "europe"],
        actores: ["all", "association", "public", "project", "social-enterprise"],
        temas: [
            "proyectos", "agricultura", "agua", "infraestructuras",
            "salud", "educación", "energía", "medio ambiente"
        ],
        idiomas: ["en", "fr", "es"],
        fiabilidad: "oficial",
        estado: "Base oficial de proyectos",
        nota:
            "Sirve para estudiar proyectos existentes y comparables; no implica financiación directa disponible para el usuario.",
        url: "https://projects.worldbank.org/en/projects-operations/projects-home"
    },

    {
        id: "hdx",
        categoria: "proyectos",
        icono: "📊",
        titulo: "Humanitarian Data Exchange · HDX",
        entidad: "OCHA Centre for Humanitarian Data",
        descripcion:
            "Plataforma de datos humanitarios por países, crisis, temas y organizaciones.",
        ambitos: ["global", "africa"],
        actores: ["all", "association", "community", "public", "project"],
        temas: [
            "datos", "humanitario", "población", "salud", "agua",
            "crisis", "seguridad alimentaria", "territorio"
        ],
        idiomas: ["en"],
        fiabilidad: "oficial",
        estado: "Plataforma de datos",
        nota:
            "La fiabilidad final depende de la fuente de cada conjunto de datos; HDX muestra procedencia y metadatos.",
        url: "https://data.humdata.org/"
    },

    {
        id: "igrac",
        categoria: "proyectos",
        icono: "💧",
        titulo: "IGRAC · Global Groundwater Information System",
        entidad: "International Groundwater Resources Assessment Centre",
        descripcion:
            "Sistema mundial de información sobre aguas subterráneas, capas y recursos hidrogeológicos.",
        ambitos: ["global", "africa", "europe"],
        actores: ["all", "association", "community", "public", "project"],
        temas: [
            "agua", "aguas subterráneas", "pozos", "acuíferos",
            "hidrogeología", "datos", "mapas"
        ],
        idiomas: ["en"],
        fiabilidad: "oficial",
        estado: "Fuente técnica",
        nota:
            "Útil para contexto hidrogeológico. No sustituye un estudio local de perforación.",
        url: "https://ggis.un-igrac.org/"
    },

    {
        id: "bgs-africa",
        categoria: "proyectos",
        icono: "🪨",
        titulo: "Africa Groundwater Atlas",
        entidad: "British Geological Survey",
        descripcion:
            "Atlas y recursos hidrogeológicos para países africanos, útil como contexto regional de acuíferos y aguas subterráneas.",
        ambitos: ["africa"],
        actores: ["all", "association", "community", "public", "project"],
        temas: [
            "africa", "agua", "acuíferos", "hidrogeología",
            "pozos", "profundidad", "productividad"
        ],
        idiomas: ["en"],
        fiabilidad: "oficial",
        estado: "Fuente técnica regional",
        nota:
            "Información regional: no determina por sí sola profundidad exacta o caudal en una parcela.",
        url: "https://www.bgs.ac.uk/geology-projects/africa-groundwater-atlas/"
    },

    {
        id: "gaia-ecohabitats",
        categoria: "proyectos",
        icono: "🌱",
        titulo: "Gaia Union · Red de EcoHabitats y Bio-Regiones",
        entidad: "Marco conceptual aportado al grupo",
        descripcion:
            "Modelo conceptual de red regenerativa que conecta territorios, BioHabitats, BioHubs, gobernanza, conocimiento y economía.",
        ambitos: ["global"],
        actores: ["association", "cooperative", "community", "social-enterprise", "public", "project"],
        temas: [
            "gaia", "ecohabitats", "biohabitats", "biohubs",
            "regeneración", "gobernanza", "comunidades", "economía regenerativa"
        ],
        idiomas: ["es"],
        fiabilidad: "conceptual",
        estado: "Marco conceptual",
        nota:
            "Describe una arquitectura y una visión. No debe confundirse con financiación disponible o con una red ya desplegada en cada territorio.",
        url: null
    },

    {
        id: "core-tokenomics",
        categoria: "proyectos",
        icono: "♻️",
        titulo: "CoRe · Tokenomics y contribuciones",
        entidad: "Marco conceptual aportado al grupo",
        descripcion:
            "Propuesta conceptual para registrar contribuciones, conocimiento, mentoría, reputación e intercambio en una economía regenerativa.",
        ambitos: ["global"],
        actores: ["association", "cooperative", "community", "social-enterprise", "project"],
        temas: [
            "core", "tokenomics", "contribuciones", "reputación",
            "economía regenerativa", "intercambio", "mentorías"
        ],
        idiomas: ["es"],
        fiabilidad: "conceptual",
        estado: "Marco conceptual",
        nota:
            "Es una arquitectura conceptual; no equivale a un token desplegado o a un mecanismo financiero operativo.",
        url: null
    }

];


// ======================================================
// UTILIDADES
// ======================================================

function normalizarRecurso(texto) {
    return String(texto || "")
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .toLowerCase()
        .trim();
}


function escaparRecurso(texto) {
    return String(texto ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function obtenerContextoTerritorio() {
    const estado =
        window.appState || {};

    return {
        nombre:
            estado.territorioAnalizado ||
            estado.lugarSeleccionado?.display_name ||
            null,

        pais:
            estado.pais ||
            estado.lugarSeleccionado?.address?.country ||
            null,

        codigo:
            estado.countryCode ||
            estado.lugarSeleccionado?.address?.country_code?.toUpperCase() ||
            null,

        necesidad:
            estado.necesidad ||
            null
    };
}


function scopeAutomaticoTerritorio() {
    const codigo =
        obtenerContextoTerritorio()
            .codigo;

    const africa = new Set([
        "DZ","AO","BJ","BW","BF","BI","CV","CM","CF","TD","KM","CD","CG",
        "CI","DJ","EG","GQ","ER","SZ","ET","GA","GM","GH","GN","GW","KE",
        "LS","LR","LY","MG","MW","ML","MR","MU","MA","MZ","NA","NE","NG",
        "RW","ST","SN","SC","SL","SO","ZA","SS","SD","TZ","TG","TN","UG",
        "ZM","ZW","EH"
    ]);

    const europa = new Set([
        "AL","AD","AT","BE","BA","BG","HR","CY","CZ","DK","EE","FI","FR",
        "DE","GR","HU","IS","IE","IT","LV","LI","LT","LU","MT","MD","MC",
        "ME","NL","MK","NO","PL","PT","RO","SM","RS","SK","SI","ES","SE",
        "CH","UA","GB","VA"
    ]);

    if (africa.has(codigo)) {
        return "africa";
    }

    if (europa.has(codigo)) {
        return "europe";
    }

    return "global";
}


// ======================================================
// VISTAS PRINCIPALES
// ======================================================


function activarCategoriaRecursos(
    categoria = "all"
) {
    const categoriasValidas =
        new Set([
            "all",
            "organizaciones",
            "formacion",
            "financiacion",
            "proyectos"
        ]);

    categoriaRecursosActiva =
        categoriasValidas.has(
            categoria
        )
            ?
            categoria
            :
            "all";

    resourceCategoryButtons
        .forEach(
            boton => {
                boton.classList.toggle(
                    "active",
                    boton.dataset.resourceCategory ===
                    categoriaRecursosActiva
                );
            }
        );
}


function abrirCentroRecursos(
    categoria = "all",
    opciones = {}
) {
    const {
        usarTerritorio = true,
        consulta = null
    } = opciones;

    activarCategoriaRecursos(
        categoria
    );

    if (
        consulta !== null &&
        resourceQuery
    ) {
        resourceQuery.value =
            consulta;
    }

    const contexto =
        obtenerContextoTerritorio();

    priorizarTerritorio =
        Boolean(
            usarTerritorio &&
            contexto.nombre
        );

    resourceUseTerritory
        ?.classList
        .toggle(
            "active",
            priorizarTerritorio
        );

    if (
        resourceScope
    ) {
        resourceScope.value =
            priorizarTerritorio
                ?
                "local"
                :
                "all";
    }

    cambiarVista(
        "recursos"
    );

    setTimeout(
        () => {
            renderRecursos();

            document
                .querySelector(
                    ".resource-command-panel"
                )
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
        },
        80
    );
}


window.activarCategoriaRecursos =
    activarCategoriaRecursos;

window.abrirCentroRecursos =
    abrirCentroRecursos;


function cambiarVista(nombre) {
    const mapaVistas = {
        territorio:
            "vistaTerritorio",

        recursos:
            "vistaRecursos",

        conocimiento:
            "vistaConocimiento",

        proyectos:
            "vistaProyectos",

        accion:
            "vistaAccion",

        mediateca:
            "vistaMediateca"
    };

    const idObjetivo =
        mapaVistas[nombre]
        ||
        mapaVistas.territorio;

    document
        .querySelectorAll(
            ".app-view"
        )
        .forEach(
            vista => {
                vista.classList.toggle(
                    "hidden",
                    vista.id !==
                    idObjetivo
                );
            }
        );

    botonesVista.forEach(
        boton => {
            boton.classList.toggle(
                "active",
                boton.dataset.viewTarget ===
                nombre
            );
        }
    );

    if (
        nombre ===
        "territorio"
    ) {
        window.refrescarMapa
            ?.();
    }

    else if (
        nombre ===
        "recursos"
    ) {
        actualizarContextoRecursos();
        renderRecursos();
    }

    document.dispatchEvent(
        new CustomEvent(
            "vista:cambiada",
            {
                detail: {
                    nombre
                }
            }
        )
    );

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


window.cambiarVista =
    cambiarVista;


botonesVista.forEach(
    boton => {
        boton.addEventListener(
            "click",
            () => {
                cambiarVista(
                    boton.dataset.viewTarget
                );
            }
        );
    }
);


// ======================================================
// CONTEXTO TERRITORIAL
// ======================================================

function actualizarContextoRecursos() {
    const contexto =
        obtenerContextoTerritorio();

    if (contexto.nombre) {
        resourceTerritoryName.textContent =
            contexto.nombre;

        const partes = [];

        if (contexto.pais) {
            partes.push(
                contexto.pais
            );
        }

        if (contexto.necesidad) {
            partes.push(
                `Necesidad: ${contexto.necesidad}`
            );
        }

        resourceTerritoryDetail.textContent =
            partes.join(" · ")
            ||
            "Contexto territorial disponible.";

        resourceUseTerritory.classList
            .add("is-ready");
    }
    else {
        resourceTerritoryName.textContent =
            "Sin territorio seleccionado";

        resourceTerritoryDetail.textContent =
            "Puedes buscar globalmente o volver a Territorio.";

        resourceUseTerritory.classList
            .remove("is-ready");
    }
}


document.addEventListener(
    "territorio:actualizado",
    () => {
        actualizarContextoRecursos();
    }
);


// ======================================================
// PUNTUACIÓN DE RELEVANCIA
// ======================================================

function puntuarRecurso(
    recurso,
    consulta,
    actor,
    scope
) {
    const consultaNorm =
        normalizarRecurso(
            consulta
        );

    const tokens =
        consultaNorm
            .split(/\s+/)
            .filter(
                token =>
                    token.length > 2
            );

    const contexto =
        obtenerContextoTerritorio();

    const necesidadNorm =
        normalizarRecurso(
            contexto.necesidad
        );

    const corpus =
        normalizarRecurso(
            [
                recurso.titulo,
                recurso.entidad,
                recurso.descripcion,
                recurso.estado,
                recurso.nota,
                ...recurso.temas
            ].join(" ")
        );

    let score =
        0;


    if (
        categoriaRecursosActiva !==
        "all"
    ) {
        if (
            recurso.categoria !==
            categoriaRecursosActiva
        ) {
            return -1;
        }

        score += 25;
    }


    if (
        actor !== "all"
    ) {
        if (
            !recurso.actores.includes(actor)
            &&
            !recurso.actores.includes("all")
        ) {
            return -1;
        }

        score += 8;
    }


    if (
        scope !== "all"
    ) {
        if (
            scope === "local"
        ) {
            const automatico =
                scopeAutomaticoTerritorio();

            if (
                recurso.ambitos.includes(
                    automatico
                )
                ||
                recurso.ambitos.includes(
                    "global"
                )
            ) {
                score += 12;
            }
            else {
                score -= 5;
            }
        }
        else if (
            !recurso.ambitos.includes(scope)
            &&
            !recurso.ambitos.includes("global")
        ) {
            return -1;
        }
        else {
            score += 8;
        }
    }


    if (
        priorizarTerritorio
        &&
        contexto.nombre
    ) {
        const automatico =
            scopeAutomaticoTerritorio();

        if (
            recurso.ambitos.includes(
                automatico
            )
        ) {
            score += 10;
        }

        if (
            recurso.ambitos.includes(
                "global"
            )
        ) {
            score += 3;
        }
    }


    tokens.forEach(
        token => {
            if (
                corpus.includes(
                    token
                )
            ) {
                score += 10;
            }
        }
    );


    if (
        necesidadNorm
    ) {
        recurso.temas.forEach(
            tema => {
                const temaNorm =
                    normalizarRecurso(
                        tema
                    );

                if (
                    necesidadNorm.includes(
                        temaNorm
                    )
                    ||
                    temaNorm
                        .split(/\s+/)
                        .some(
                            palabra =>
                                palabra.length > 3
                                &&
                                necesidadNorm.includes(
                                    palabra
                                )
                        )
                ) {
                    score += 4;
                }
            }
        );
    }


    if (
        recurso.fiabilidad ===
        "oficial"
    ) {
        score += 4;
    }


    if (
        consultaNorm &&
        score === 0
    ) {
        return -1;
    }


    return score;
}


// ======================================================
// BADGES
// ======================================================

function badgeFiabilidad(recurso) {
    if (
        recurso.fiabilidad ===
        "oficial"
    ) {
        return `
            <span class="resource-badge verified">
                ✓ Fuente oficial
            </span>
        `;
    }

    return `
        <span class="resource-badge conceptual">
            ◇ Marco conceptual
        </span>
    `;
}


function badgeEstado(recurso) {
    const alerta =
        normalizarRecurso(
            recurso.estado
        )
        .includes(
            "verificar"
        );

    return `
        <span class="resource-badge ${alerta ? "review" : "neutral"}">
            ${escaparRecurso(recurso.estado)}
        </span>
    `;
}


// ======================================================
// TARJETAS
// ======================================================

function renderTarjetaRecurso(
    recurso,
    score
) {
    const scoreVisible =
        Math.max(
            1,
            Math.min(
                99,
                Math.round(
                    55 + score
                )
            )
        );

    const temas =
        recurso.temas
            .slice(0, 4)
            .map(
                tema =>
                    `<span>${escaparRecurso(tema)}</span>`
            )
            .join("");


    const accion =
        recurso.url
            ?
            `
                <a
                    class="resource-card-action"
                    href="${recurso.url}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Abrir fuente
                    <span>↗</span>
                </a>
            `
            :
            `
                <span class="resource-card-action disabled">
                    Documento conceptual
                    <span>◇</span>
                </span>
            `;


    return `
        <article
            class="resource-result-card tilt-card reveal-on-scroll"
            data-resource-id="${recurso.id}"
        >

            <div class="resource-card-top">

                <div class="resource-card-icon">
                    ${recurso.icono}
                </div>

                <div class="resource-match">
                    <strong>${scoreVisible}%</strong>
                    <span>pertinencia</span>
                </div>

            </div>


            <div class="resource-card-badges">
                ${badgeFiabilidad(recurso)}
                ${badgeEstado(recurso)}
            </div>


            <div class="resource-card-copy">

                <span class="resource-card-category">
                    ${recurso.categoria}
                </span>

                <h3>
                    ${escaparRecurso(recurso.titulo)}
                </h3>

                <strong class="resource-card-entity">
                    ${escaparRecurso(recurso.entidad)}
                </strong>

                <p>
                    ${escaparRecurso(recurso.descripcion)}
                </p>

            </div>


            <div class="resource-topic-tags">
                ${temas}
            </div>


            <div class="resource-card-note">
                <span>ℹ</span>
                <p>
                    ${escaparRecurso(recurso.nota)}
                </p>
            </div>


            <div class="resource-card-footer">

                ${accion}

                <button
                    type="button"
                    class="resource-save-button"
                    aria-label="Guardar recurso"
                    title="Guardar recurso"
                >
                    ☆
                </button>

            </div>

        </article>
    `;
}


// ======================================================
// RENDER
// ======================================================

function renderRecursos() {
    const consulta =
        resourceQuery
            ?.value
            ?.trim()
        ||
        "";

    const actor =
        resourceActor
            ?.value
        ||
        "all";

    const scope =
        resourceScope
            ?.value
        ||
        "all";


    const resultados =
        CATALOGO_RECURSOS
            .map(
                recurso => ({
                    recurso,
                    score:
                        puntuarRecurso(
                            recurso,
                            consulta,
                            actor,
                            scope
                        )
                })
            )
            .filter(
                item =>
                    item.score >= 0
            )
            .sort(
                (a, b) =>
                    b.score -
                    a.score
            );


    resourceResultCount.textContent =
        resultados.length;


    const contexto =
        obtenerContextoTerritorio();


    if (
        consulta
        ||
        contexto.necesidad
    ) {
        const partes = [];

        if (consulta) {
            partes.push(
                `Búsqueda: “${consulta}”`
            );
        }

        if (
            priorizarTerritorio
            &&
            contexto.nombre
        ) {
            partes.push(
                `Territorio: ${contexto.nombre}`
            );
        }

        if (
            contexto.necesidad
        ) {
            partes.push(
                `Contexto: ${contexto.necesidad}`
            );
        }

        resourceResultsSummary.textContent =
            partes.join(" · ");
    }
    else {
        resourceResultsSummary.textContent =
            "Catálogo inicial de fuentes y marcos útiles para organizaciones.";
    }


    if (
        !resultados.length
    ) {
        resourceResults.innerHTML =
            "";

        resourceEmpty
            .classList
            .remove("hidden");
    }
    else {
        resourceEmpty
            .classList
            .add("hidden");

        resourceResults.innerHTML =
            resultados
                .map(
                    item =>
                        renderTarjetaRecurso(
                            item.recurso,
                            item.score
                        )
                )
                .join("");
    }


    actualizarContadoresCategorias();


    document.dispatchEvent(
        new CustomEvent(
            "efectos:refrescar"
        )
    );
}


// ======================================================
// CONTADORES
// ======================================================

function actualizarContadoresCategorias() {
    const conteos = {
        all:
            CATALOGO_RECURSOS.length,

        organizaciones:
            CATALOGO_RECURSOS.filter(
                r =>
                    r.categoria ===
                    "organizaciones"
            ).length,

        formacion:
            CATALOGO_RECURSOS.filter(
                r =>
                    r.categoria ===
                    "formacion"
            ).length,

        financiacion:
            CATALOGO_RECURSOS.filter(
                r =>
                    r.categoria ===
                    "financiacion"
            ).length,

        proyectos:
            CATALOGO_RECURSOS.filter(
                r =>
                    r.categoria ===
                    "proyectos"
            ).length
    };


    document
        .querySelectorAll(
            "[data-resource-count]"
        )
        .forEach(
            elemento => {
                const clave =
                    elemento.dataset
                        .resourceCount;

                elemento.textContent =
                    conteos[clave] ??
                    0;
            }
        );
}


// ======================================================
// EVENTOS
// ======================================================

resourceSearchButton
    ?.addEventListener(
        "click",
        renderRecursos
    );


resourceQuery
    ?.addEventListener(
        "keydown",
        evento => {
            if (
                evento.key ===
                "Enter"
            ) {
                evento.preventDefault();
                renderRecursos();
            }
        }
    );


resourceActor
    ?.addEventListener(
        "change",
        renderRecursos
    );


resourceScope
    ?.addEventListener(
        "change",
        renderRecursos
    );


resourceCategoryButtons.forEach(
    boton => {
        boton.addEventListener(
            "click",
            () => {
                activarCategoriaRecursos(
                    boton.dataset
                        .resourceCategory
                );

                renderRecursos();
            }
        );
    }
);


resourceUseTerritory
    ?.addEventListener(
        "click",
        () => {
            priorizarTerritorio =
                !priorizarTerritorio;

            resourceUseTerritory
                .classList
                .toggle(
                    "active",
                    priorizarTerritorio
                );

            if (
                priorizarTerritorio
            ) {
                resourceScope.value =
                    "local";
            }
            else {
                resourceScope.value =
                    "all";
            }

            renderRecursos();
        }
    );


resourceResults
    ?.addEventListener(
        "click",
        evento => {
            const boton =
                evento.target
                    .closest(
                        ".resource-save-button"
                    );

            if (!boton) {
                return;
            }

            boton.classList
                .toggle(
                    "saved"
                );

            boton.textContent =
                boton.classList
                    .contains("saved")
                    ?
                    "★"
                    :
                    "☆";
        }
    );


// ======================================================
// ARRANQUE
// ======================================================

actualizarContextoRecursos();
actualizarContadoresCategorias();
renderRecursos();
