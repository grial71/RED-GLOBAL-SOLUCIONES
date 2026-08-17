// ======================================================
// V6.4 · ECOSISTEMA DE CONOCIMIENTO, PROYECTOS Y ACCIÓN
// ======================================================


// ======================================================
// BIBLIOTECA DE CONOCIMIENTO
// ======================================================

const KNOWLEDGE_ITEMS = [

    {
        id: "gaia-ecohabitats",
        tipo: "documento",
        icono: "🌍",
        titulo: "Red de EcoHabitats & Bio-Regiones del Mundo",
        autor: "Gaia Union · documento aportado al grupo",
        idioma: "es",
        temas: ["transicion", "territorio", "gobernanza", "economia"],
        descripcion:
            "Marco conceptual sobre BioHabitats, BioHubs, gobernanza, fondos, comunidades en transición y articulación territorial.",
        nivel: "conceptual",
        estado: "Documento de referencia",
        nota:
            "Describe una visión y una arquitectura. No demuestra por sí mismo que exista financiación disponible ni que todos los componentes estén operativos.",
        enlace: null
    },

    {
        id: "gaia-architecture",
        tipo: "documento",
        icono: "🧬",
        titulo: "Arquitectura de un Ecosistema Vivo Regenerativo",
        autor: "Gaia Union · documento aportado al grupo",
        idioma: "es",
        temas: ["transicion", "gobernanza", "tecnologia", "territorio"],
        descripcion:
            "Relaciona Constitución, Hub/OS, Fund, DAO, Market, School, Impact Hub, BioLabs, BioHabitats y BioHubs como partes de un sistema.",
        nivel: "conceptual",
        estado: "Documento de referencia",
        nota:
            "Útil para entender la arquitectura conceptual del ecosistema y convertirla en módulos de plataforma.",
        enlace: null
    },

    {
        id: "core-tokenomics",
        tipo: "documento",
        icono: "♻️",
        titulo: "Tokenomics de CoRe",
        autor: "CoRe · documento aportado al grupo",
        idioma: "es",
        temas: ["economia", "gobernanza", "tecnologia", "transicion"],
        descripcion:
            "Propuesta de economía regenerativa por capas, registro de contribuciones, reputación, tokens y desarrollo progresivo.",
        nivel: "conceptual",
        estado: "Documento de referencia",
        nota:
            "Debe diferenciarse entre diseño económico conceptual y mecanismos realmente desplegados o auditados.",
        enlace: null
    },

    {
        id: "best-money-cant-buy",
        tipo: "libro",
        icono: "📘",
        titulo: "The Best That Money Can't Buy",
        autor: "Jacque Fresco",
        idioma: "en",
        temas: ["transicion", "economia", "tecnologia", "territorio"],
        descripcion:
            "Referencia asociada a la visión de una sociedad donde ciencia, diseño y recursos se orientan a resolver necesidades humanas.",
        nivel: "referencia",
        estado: "Libro recomendado",
        nota:
            "La plataforma registra la referencia; el acceso al contenido debe respetar derechos de autor y canales legales.",
        enlace: null
    },

    {
        id: "designing-future",
        tipo: "libro",
        icono: "📗",
        titulo: "Designing the Future",
        autor: "Jacque Fresco",
        idioma: "en",
        temas: ["transicion", "tecnologia", "territorio"],
        descripcion:
            "Texto introductorio asociado al diseño de sistemas sociales y tecnológicos orientados a necesidades y sostenibilidad.",
        nivel: "referencia",
        estado: "Libro recomendado",
        nota:
            "Referencia bibliográfica; más adelante se añadirá enlace oficial o legalmente disponible.",
        enlace: null
    },

    {
        id: "doughnut-economics",
        tipo: "libro",
        icono: "📙",
        titulo: "Doughnut Economics",
        autor: "Kate Raworth",
        idioma: "en",
        temas: ["economia", "ecologia", "transicion"],
        descripcion:
            "Marco para pensar la actividad económica entre necesidades sociales y límites ecológicos.",
        nivel: "referencia",
        estado: "Libro complementario",
        nota:
            "Se incluye como marco complementario, no como documento de Gaia Union.",
        enlace: null
    },

    {
        id: "permaculture-design",
        tipo: "libro",
        icono: "📕",
        titulo: "Permaculture: A Designer's Manual",
        autor: "Bill Mollison",
        idioma: "en",
        temas: ["ecologia", "territorio", "transicion"],
        descripcion:
            "Referencia clásica de diseño permacultural para sistemas humanos y territoriales.",
        nivel: "referencia",
        estado: "Libro complementario",
        nota:
            "La ficha es bibliográfica; no se distribuye el contenido protegido.",
        enlace: null
    },

    {
        id: "video-paradigm",
        tipo: "video",
        icono: "🎬",
        titulo: "Introducción al nuevo paradigma",
        autor: "Producción propia · pendiente",
        idioma: "es",
        temas: ["transicion", "territorio", "tecnologia", "ecologia"],
        descripcion:
            "Vídeo de apertura planteado para mostrar el paso de una ciudad caótica a un entorno regenerativo y cooperativo.",
        nivel: "produccion",
        estado: "Guion / concepto",
        nota:
            "La V6.4 incorpora una experiencia visual interactiva provisional mientras se produce el vídeo definitivo.",
        enlace: null
    },

    {
        id: "video-public-action",
        tipo: "video",
        icono: "🎥",
        titulo: "Cómo llevar la transición al espacio público",
        autor: "Producción colaborativa · propuesta",
        idioma: "es",
        temas: ["transicion", "territorio", "gobernanza"],
        descripcion:
            "Formato corto para explicar cómo organizar charlas, demostraciones y acciones locales replicables.",
        nivel: "produccion",
        estado: "Propuesta",
        nota:
            "Pendiente de producción y validación por el grupo.",
        enlace: null
    },

    {
        id: "video-projects",
        tipo: "video",
        icono: "📹",
        titulo: "Proyectos conectados: del ejemplo local al aprendizaje global",
        autor: "Producción colaborativa · propuesta",
        idioma: "es",
        temas: ["transicion", "territorio", "tecnologia"],
        descripcion:
            "Formato documental para enseñar acciones en distintos lugares y qué aprendizajes pueden transferirse.",
        nivel: "produccion",
        estado: "Propuesta",
        nota:
            "Pensado para integrar subtítulos y versiones por idioma.",
        enlace: null
    }
];


let knowledgeTopic =
    "all";


const knowledgeSearch =
    document.getElementById(
        "knowledgeSearch"
    );

const knowledgeType =
    document.getElementById(
        "knowledgeType"
    );

const knowledgeLanguage =
    document.getElementById(
        "knowledgeLanguage"
    );

const knowledgeGrid =
    document.getElementById(
        "knowledgeGrid"
    );

const knowledgeEmpty =
    document.getElementById(
        "knowledgeEmpty"
    );


function normalizeEco(texto) {
    return String(texto || "")
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .toLowerCase()
        .trim();
}


function escapeEco(texto) {
    return String(texto ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function badgeKnowledgeNivel(item) {
    if (
        item.nivel ===
        "conceptual"
    ) {
        return `
            <span class="knowledge-badge conceptual">
                ◇ Marco conceptual
            </span>
        `;
    }

    if (
        item.nivel ===
        "produccion"
    ) {
        return `
            <span class="knowledge-badge production">
                ● En producción
            </span>
        `;
    }

    return `
        <span class="knowledge-badge reference">
            ✓ Referencia
        </span>
    `;
}


function renderKnowledge() {
    if (!knowledgeGrid) {
        return;
    }

    const query =
        normalizeEco(
            knowledgeSearch?.value
        );

    const type =
        knowledgeType?.value
        ||
        "all";

    const language =
        knowledgeLanguage?.value
        ||
        "all";


    const results =
        KNOWLEDGE_ITEMS.filter(
            item => {
                if (
                    type !== "all"
                    &&
                    item.tipo !== type
                ) {
                    return false;
                }

                if (
                    language !== "all"
                    &&
                    item.idioma !== language
                ) {
                    return false;
                }

                if (
                    knowledgeTopic !== "all"
                    &&
                    !item.temas.includes(
                        knowledgeTopic
                    )
                ) {
                    return false;
                }

                if (query) {
                    const corpus =
                        normalizeEco(
                            [
                                item.titulo,
                                item.autor,
                                item.descripcion,
                                item.estado,
                                ...item.temas
                            ].join(" ")
                        );

                    const tokens =
                        query
                            .split(/\s+/)
                            .filter(
                                token =>
                                    token.length > 2
                            );

                    if (
                        !tokens.every(
                            token =>
                                corpus.includes(
                                    token
                                )
                        )
                    ) {
                        return false;
                    }
                }

                return true;
            }
        );


    document
        .getElementById(
            "knowledgeCount"
        )
        ?.replaceChildren(
            document.createTextNode(
                String(
                    results.length
                )
            )
        );

    document
        .getElementById(
            "knowledgeDocsCount"
        )
        ?.replaceChildren(
            document.createTextNode(
                String(
                    KNOWLEDGE_ITEMS.filter(
                        item =>
                            item.tipo ===
                            "documento"
                    ).length
                )
            )
        );

    document
        .getElementById(
            "knowledgeVideoCount"
        )
        ?.replaceChildren(
            document.createTextNode(
                String(
                    KNOWLEDGE_ITEMS.filter(
                        item =>
                            item.tipo ===
                            "video"
                    ).length
                )
            )
        );


    if (
        !results.length
    ) {
        knowledgeGrid.innerHTML =
            "";

        knowledgeEmpty
            ?.classList
            .remove(
                "hidden"
            );

        return;
    }


    knowledgeEmpty
        ?.classList
        .add(
            "hidden"
        );


    knowledgeGrid.innerHTML =
        results
            .map(
                item => {
                    const temas =
                        item.temas
                            .slice(
                                0,
                                4
                            )
                            .map(
                                tema =>
                                    `<span>${escapeEco(tema)}</span>`
                            )
                            .join("");

                    return `
                        <article class="knowledge-card tilt-card reveal-on-scroll">

                            <div class="knowledge-card-top">
                                <span class="knowledge-icon">
                                    ${item.icono}
                                </span>

                                <span class="knowledge-format">
                                    ${escapeEco(item.tipo)}
                                </span>
                            </div>

                            <div class="knowledge-card-badges">
                                ${badgeKnowledgeNivel(item)}

                                <span class="knowledge-badge status">
                                    ${escapeEco(item.estado)}
                                </span>
                            </div>

                            <h3>
                                ${escapeEco(item.titulo)}
                            </h3>

                            <strong class="knowledge-author">
                                ${escapeEco(item.autor)}
                            </strong>

                            <p class="knowledge-description">
                                ${escapeEco(item.descripcion)}
                            </p>

                            <div class="knowledge-topics">
                                ${temas}
                            </div>

                            <div class="knowledge-caution">
                                <span>ℹ</span>
                                <p>
                                    ${escapeEco(item.nota)}
                                </p>
                            </div>

                            <div class="knowledge-card-footer">

                                <span class="knowledge-lang">
                                    🌐 ${item.idioma.toUpperCase()}
                                </span>

                                ${
                                    item.enlace
                                    ?
                                    `
                                        <a
                                            href="${item.enlace}"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Abrir ↗
                                        </a>
                                    `
                                    :
                                    `
                                        <span class="knowledge-pending-link">
                                            Enlace por validar
                                        </span>
                                    `
                                }

                            </div>

                        </article>
                    `;
                }
            )
            .join("");


    document.dispatchEvent(
        new CustomEvent(
            "efectos:refrescar"
        )
    );
}


knowledgeSearch
    ?.addEventListener(
        "input",
        renderKnowledge
    );


knowledgeType
    ?.addEventListener(
        "change",
        renderKnowledge
    );


knowledgeLanguage
    ?.addEventListener(
        "change",
        renderKnowledge
    );


document
    .querySelectorAll(
        "[data-knowledge-topic]"
    )
    .forEach(
        button => {
            button.addEventListener(
                "click",
                () => {
                    knowledgeTopic =
                        button.dataset
                            .knowledgeTopic;

                    document
                        .querySelectorAll(
                            "[data-knowledge-topic]"
                        )
                        .forEach(
                            other => {
                                other.classList.toggle(
                                    "active",
                                    other === button
                                );
                            }
                        );

                    renderKnowledge();
                }
            );
        }
    );


// ======================================================
// RED DE PROYECTOS
// ======================================================

const PROJECTS = [

    {
        id: "hevie",
        nombre: "Hêvié · Agricultura y agua",
        pais: "Benín",
        ciudad: "Hêvié",
        lat: 6.53,
        lon: 2.32,
        status: "pilot",
        statusLabel: "Piloto",
        icono: "🌱",
        problema:
            "Producción agrícola, agua, riego, instalaciones y crecimiento progresivo de actividades rurales.",
        accion:
            "Diagnóstico territorial, búsqueda de agua, mejora de producción, formación y búsqueda futura de aliados.",
        aprendizaje:
            "Puede convertirse en un laboratorio para relacionar necesidades locales, datos, soluciones y recursos.",
        precision:
            "Ubicación aproximada del territorio."
    },

    {
        id: "barcelona",
        nombre: "Barcelona · Charlas y acción pública",
        pais: "España",
        ciudad: "Barcelona",
        lat: 41.3874,
        lon: 2.1686,
        status: "idea",
        statusLabel: "Propuesta",
        icono: "🗣️",
        problema:
            "Cómo hacer visibles ideas de transición fuera de internet y generar conversación local.",
        accion:
            "Charlas públicas periódicas, demostraciones, biodiversidad urbana y conexión entre barrios.",
        aprendizaje:
            "Probar qué formatos atraen atención, generan diálogo y consiguen continuidad.",
        precision:
            "Punto de ciudad; no representa una sede concreta."
    },

    {
        id: "annobon",
        nombre: "Annobón · Resiliencia territorial",
        pais: "Guinea Ecuatorial",
        ciudad: "Annobón",
        lat: -1.44,
        lon: 5.63,
        status: "future",
        statusLabel: "Caso futuro",
        icono: "🏝️",
        problema:
            "Aislamiento, logística, agua, energía, alimentación, salud y autonomía territorial.",
        accion:
            "Estudiar un modelo progresivo de resiliencia local, autosuficiencia y transparencia comunitaria.",
        aprendizaje:
            "Caso complejo para estudiar cómo adaptar soluciones a territorios insulares y aislados.",
        precision:
            "Punto insular aproximado; no indica un proyecto Gaia existente."
    },

    {
        id: "distributed-network",
        nombre: "Nodos distribuidos · Red internacional",
        pais: "Multipaís",
        ciudad: "Red distribuida",
        lat: 20.0,
        lon: -20.0,
        status: "idea",
        statusLabel: "Arquitectura",
        icono: "🕸️",
        problema:
            "Evitar una organización excesivamente centralizada y permitir que grupos locales compartan aprendizajes.",
        accion:
            "Nodos autónomos conectados por datos, documentación, proyectos, materiales y resultados.",
        aprendizaje:
            "La red debe facilitar cooperación sin borrar la autonomía local.",
        precision:
            "Marcador simbólico, no una ubicación física."
    }

];


let projectStatus =
    "all";

let projectsMap =
    null;

let projectsLayer =
    null;


function statusClass(status) {
    return [
        "pilot",
        "idea",
        "future"
    ].includes(status)
        ?
        status
        :
        "idea";
}


function renderProjects() {
    const grid =
        document.getElementById(
            "projectsGrid"
        );

    if (!grid) {
        return;
    }

    const results =
        PROJECTS.filter(
            project =>
                projectStatus === "all"
                ||
                project.status ===
                projectStatus
        );

    grid.innerHTML =
        results
            .map(
                project => `
                    <article class="project-card tilt-card reveal-on-scroll">

                        <div class="project-card-head">
                            <span class="project-card-icon">
                                ${project.icono}
                            </span>

                            <span class="project-status ${statusClass(project.status)}">
                                ${escapeEco(project.statusLabel)}
                            </span>
                        </div>

                        <span class="project-location">
                            ${escapeEco(project.ciudad)} · ${escapeEco(project.pais)}
                        </span>

                        <h3>
                            ${escapeEco(project.nombre)}
                        </h3>

                        <div class="project-field">
                            <strong>Problema</strong>
                            <p>${escapeEco(project.problema)}</p>
                        </div>

                        <div class="project-field">
                            <strong>Acción</strong>
                            <p>${escapeEco(project.accion)}</p>
                        </div>

                        <div class="project-field learning">
                            <strong>Qué puede aportar a la red</strong>
                            <p>${escapeEco(project.aprendizaje)}</p>
                        </div>

                        <small class="project-precision">
                            ℹ ${escapeEco(project.precision)}
                        </small>

                    </article>
                `
            )
            .join("");


    document.dispatchEvent(
        new CustomEvent(
            "efectos:refrescar"
        )
    );
}


document
    .querySelectorAll(
        "[data-project-status]"
    )
    .forEach(
        button => {
            button.addEventListener(
                "click",
                () => {
                    projectStatus =
                        button.dataset
                            .projectStatus;

                    document
                        .querySelectorAll(
                            "[data-project-status]"
                        )
                        .forEach(
                            other => {
                                other.classList.toggle(
                                    "active",
                                    other === button
                                );
                            }
                        );

                    renderProjects();
                }
            );
        }
    );


function initProjectsMap() {
    const mapElement =
        document.getElementById(
            "projectsMap"
        );

    if (
        !mapElement ||
        !window.L
    ) {
        return;
    }

    if (!projectsMap) {
        projectsMap =
            L.map(
                "projectsMap",
                {
                    zoomControl:
                        true,

                    scrollWheelZoom:
                        false
                }
            )
            .setView(
                [18, 5],
                2
            );


        L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                maxZoom:
                    18,

                attribution:
                    "&copy; OpenStreetMap contributors"
            }
        )
        .addTo(
            projectsMap
        );


        projectsLayer =
            L.layerGroup()
                .addTo(
                    projectsMap
                );


        PROJECTS.forEach(
            project => {
                const color =
                    project.status === "pilot"
                        ?
                        "#169b72"
                        :
                    project.status === "future"
                        ?
                        "#6477a6"
                        :
                        "#d29631";


                L.circleMarker(
                    [
                        project.lat,
                        project.lon
                    ],
                    {
                        radius:
                            8,

                        color:
                            "#ffffff",

                        weight:
                            2,

                        fillColor:
                            color,

                        fillOpacity:
                            .9
                    }
                )
                .bindPopup(
                    `
                        <strong>${escapeEco(project.nombre)}</strong><br>
                        ${escapeEco(project.statusLabel)}<br>
                        <small>${escapeEco(project.precision)}</small>
                    `
                )
                .addTo(
                    projectsLayer
                );
            }
        );
    }


    setTimeout(
        () => {
            projectsMap
                ?.invalidateSize();
        },
        160
    );
}


// ======================================================
// PROPONER PROYECTO · BORRADOR LOCAL
// ======================================================

const projectProposalModal =
    document.getElementById(
        "projectProposalModal"
    );


function openProjectProposal() {
    projectProposalModal
        ?.classList
        .remove(
            "hidden"
        );
}


function closeProjectProposal() {
    projectProposalModal
        ?.classList
        .add(
            "hidden"
        );
}


document
    .getElementById(
        "openProjectProposal"
    )
    ?.addEventListener(
        "click",
        openProjectProposal
    );


document
    .getElementById(
        "closeProjectProposal"
    )
    ?.addEventListener(
        "click",
        closeProjectProposal
    );


projectProposalModal
    ?.addEventListener(
        "click",
        event => {
            if (
                event.target ===
                projectProposalModal
            ) {
                closeProjectProposal();
            }
        }
    );


document
    .getElementById(
        "projectProposalForm"
    )
    ?.addEventListener(
        "submit",
        event => {
            event.preventDefault();

            const draft = {
                name:
                    document
                        .getElementById(
                            "proposalName"
                        )
                        ?.value
                        ?.trim()
                    ||
                    "",

                place:
                    document
                        .getElementById(
                            "proposalPlace"
                        )
                        ?.value
                        ?.trim()
                    ||
                    "",

                problem:
                    document
                        .getElementById(
                            "proposalProblem"
                        )
                        ?.value
                        ?.trim()
                    ||
                    "",

                solution:
                    document
                        .getElementById(
                            "proposalSolution"
                        )
                        ?.value
                        ?.trim()
                    ||
                    "",

                savedAt:
                    new Date()
                        .toISOString()
            };


            localStorage.setItem(
                "rgs-project-draft",
                JSON.stringify(
                    draft
                )
            );


            window.RGS
                ?.showToast
                ?.(
                    "Borrador de proyecto guardado en este navegador.",
                    "success",
                    3200
                );


            document
                .getElementById(
                    "proposalSaved"
                )
                ?.classList
                .remove(
                    "hidden"
                );


            setTimeout(
                () => {
                    document
                        .getElementById(
                            "proposalSaved"
                        )
                        ?.classList
                        .add(
                            "hidden"
                        );
                },
                3500
            );
        }
    );


// ======================================================
// LABORATORIO DE ACCIÓN
// ======================================================

const ACTION_IDEAS = [

    {
        icono: "🗣️",
        titulo: "Charla abierta en una plaza",
        tipo: "concienciar",
        descripcion:
            "Una conversación breve y recurrente con una pregunta central, panel visual y espacio para que la gente participe.",
        materiales:
            "Cartel, dos paneles, altavoz opcional, QR a recursos, hojas para contactos."
    },

    {
        icono: "🌳",
        titulo: "Demostración de biodiversidad urbana",
        tipo: "territorio",
        descripcion:
            "Mostrar públicamente cómo un espacio mineral puede ganar sombra, vegetación, alimento o biodiversidad.",
        materiales:
            "Plano del lugar, especies adecuadas, permisos cuando sean necesarios, material gráfico."
    },

    {
        icono: "🛠️",
        titulo: "Mesa de reparación y herramientas compartidas",
        tipo: "demostrar",
        descripcion:
            "Un pequeño punto de reparación, intercambio y aprendizaje para enseñar cooperación material en la práctica.",
        materiales:
            "Mesa, herramientas, inventario, normas de uso, personas con habilidades concretas."
    },

    {
        icono: "🎬",
        titulo: "Proyección + debate",
        tipo: "concienciar",
        descripcion:
            "Un vídeo corto o documental seguido de preguntas y propuestas locales, evitando una charla puramente teórica.",
        materiales:
            "Proyector, pantalla, sonido, vídeo legalmente disponible, preguntas preparadas."
    },

    {
        icono: "🗺️",
        titulo: "Mapa de recursos del barrio",
        tipo: "conectar",
        descripcion:
            "Vecinos identifican espacios, capacidades, asociaciones, huertos, talleres, problemas y recursos ya existentes.",
        materiales:
            "Mapa impreso o digital, pegatinas, formulario, teléfono/tableta y moderación."
    },

    {
        icono: "🌱",
        titulo: "Microproyecto visible de 30 días",
        tipo: "demostrar",
        descripcion:
            "Elegir una mejora pequeña que pueda verse, documentarse y evaluarse en un mes.",
        materiales:
            "Objetivo medible, responsables, pequeño presupuesto, fotos antes/después y registro de resultados."
    }

];


function renderActionIdeas() {
    const grid =
        document.getElementById(
            "actionIdeasGrid"
        );

    if (!grid) {
        return;
    }

    grid.innerHTML =
        ACTION_IDEAS
            .map(
                idea => `
                    <article class="action-idea-card tilt-card reveal-on-scroll">

                        <span class="action-idea-icon">
                            ${idea.icono}
                        </span>

                        <span class="action-idea-type">
                            ${escapeEco(idea.tipo)}
                        </span>

                        <h3>
                            ${escapeEco(idea.titulo)}
                        </h3>

                        <p>
                            ${escapeEco(idea.descripcion)}
                        </p>

                        <div class="action-materials">
                            <strong>Material básico</strong>
                            <span>
                                ${escapeEco(idea.materiales)}
                            </span>
                        </div>

                    </article>
                `
            )
            .join("");


    document.dispatchEvent(
        new CustomEvent(
            "efectos:refrescar"
        )
    );
}


function actionRecommendation(
    objective,
    group,
    place
) {
    const candidates =
        ACTION_IDEAS.filter(
            idea =>
                idea.tipo ===
                objective
        );

    const idea =
        candidates[0]
        ||
        ACTION_IDEAS[0];


    const groupText = {
        small:
            "Con 2–5 personas, mantener una acción simple y repetirla varias veces suele ser más realista que organizar un gran evento.",

        medium:
            "Con 6–20 personas ya puedes repartir roles: bienvenida, explicación, demostración, documentación y seguimiento.",

        large:
            "Con más de 20 personas conviene definir coordinación, seguridad, permisos y un sistema claro de tareas."
    }[group];


    const placeText = {
        street:
            "En espacio público: comprobar normativa local y evitar bloquear el paso.",

        indoor:
            "En sala: cuidar sonido, duración y un momento final para organizar siguientes pasos.",

        nature:
            "En parque o naturaleza: priorizar impacto mínimo, permisos y adaptación ecológica.",

        online:
            "Formato híbrido: documentar la acción presencial y ofrecer materiales reutilizables online."
    }[place];


    return {
        ...idea,
        groupText,
        placeText
    };
}


document
    .getElementById(
        "generateAction"
    )
    ?.addEventListener(
        "click",
        () => {
            const objective =
                document
                    .getElementById(
                        "actionObjective"
                    )
                    ?.value
                ||
                "concienciar";

            const group =
                document
                    .getElementById(
                        "actionGroup"
                    )
                    ?.value
                ||
                "small";

            const place =
                document
                    .getElementById(
                        "actionPlace"
                    )
                    ?.value
                ||
                "street";


            const recommendation =
                actionRecommendation(
                    objective,
                    group,
                    place
                );


            const panel =
                document
                    .getElementById(
                        "actionRecommendation"
                    );


            if (panel) {
                panel.innerHTML = `
                    <span class="eyebrow">PROPUESTA</span>

                    <div class="action-generated-icon">
                        ${recommendation.icono}
                    </div>

                    <h3>
                        ${escapeEco(recommendation.titulo)}
                    </h3>

                    <p class="action-generated-description">
                        ${escapeEco(recommendation.descripcion)}
                    </p>

                    <div class="action-generated-step">
                        <strong>Grupo</strong>
                        <p>${escapeEco(recommendation.groupText)}</p>
                    </div>

                    <div class="action-generated-step">
                        <strong>Entorno</strong>
                        <p>${escapeEco(recommendation.placeText)}</p>
                    </div>

                    <div class="action-generated-step material">
                        <strong>Material básico</strong>
                        <p>${escapeEco(recommendation.materiales)}</p>
                    </div>

                    <button
                        class="ecosystem-outline-button"
                        type="button"
                        data-view-target="conocimiento"
                    >
                        Buscar materiales relacionados →
                    </button>
                `;


                panel
                    .querySelector(
                        "[data-view-target]"
                    )
                    ?.addEventListener(
                        "click",
                        event => {
                            window.cambiarVista
                                ?.(
                                    event.currentTarget
                                        .dataset
                                        .viewTarget
                                );
                        }
                    );
            }
        }
    );


// ======================================================
// INTRO CINEMATOGRÁFICO
// ======================================================

const CINEMATIC_SCENES = [

    {
        className:
            "scene-chaos",

        kicker:
            "ESCENA 01 · UNA REALIDAD CONOCIDA",

        title:
            "Una ciudad que funciona, pero desgasta",

        text:
            "Ruido, tráfico, estrés, aislamiento y sistemas diseñados para consumir recursos sin preguntarnos siempre qué necesitamos realmente.",

        narration:
            "Bienvenidos. Antes de imaginar una realidad diferente, tenemos que observar la que ya conocemos: ciudades saturadas, recursos desperdiciados y personas cada vez más desconectadas."
    },

    {
        className:
            "scene-threshold",

        kicker:
            "ESCENA 02 · EL UMBRAL",

        title:
            "Nadie puede elegir una alternativa que no conoce",

        text:
            "La transición empieza cuando podemos ver otras posibilidades y convertir el conocimiento en algo comprensible y demostrable.",

        narration:
            "Nadie puede elegir una alternativa si ni siquiera sabe que existe. Cruzar el límite significa aprender, comparar, experimentar y hacer visibles nuevas posibilidades."
    },

    {
        className:
            "scene-regenerative",

        kicker:
            "ESCENA 03 · DISEÑAR PARA LA VIDA",

        title:
            "Conocimiento, recursos y tecnología al servicio de la vida",

        text:
            "Espacios verdes, movilidad humana, cooperación, salud, educación, tecnología útil y comunidades capaces de reconocerse y actuar juntas.",

        narration:
            "Imaginemos una humanidad que utiliza conocimiento, tecnología y recursos para comprender, crear y proteger la vida de la que todos dependemos."
    },

    {
        className:
            "scene-paradigm",

        kicker:
            "ESCENA 04 · UN NUEVO PARADIGMA",

        title:
            "Del espectador a la red de soluciones",

        text:
            "No se trata de esperar una ciudad perfecta. Se trata de conectar proyectos, aprender de la práctica y construir alternativas visibles, territorio por territorio.",

        narration:
            "Bienvenidos a un nuevo paradigma. No una promesa cerrada, sino una red de personas, conocimientos y proyectos que aprenden haciendo y comparten lo que funciona."
    }

];


const cinematicIntro =
    document.getElementById(
        "cinematicIntro"
    );

const cinematicScene =
    document.getElementById(
        "cinematicScene"
    );

let currentScene =
    0;

let cinematicTimer =
    null;


function renderCinematicScene(
    index
) {
    currentScene =
        (
            index +
            CINEMATIC_SCENES.length
        )
        %
        CINEMATIC_SCENES.length;


    const scene =
        CINEMATIC_SCENES[
            currentScene
        ];


    cinematicScene.className =
        `cinematic-scene ${scene.className}`;


    document
        .getElementById(
            "cinematicKicker"
        )
        .textContent =
        scene.kicker;


    document
        .getElementById(
            "cinematicTitle"
        )
        .textContent =
        scene.title;


    document
        .getElementById(
            "cinematicText"
        )
        .textContent =
        scene.text;


    document
        .querySelectorAll(
            ".cinematic-dot"
        )
        .forEach(
            (
                dot,
                dotIndex
            ) => {
                dot.classList.toggle(
                    "active",
                    dotIndex ===
                    currentScene
                );
            }
        );
}


function openCinematic() {
    cinematicIntro
        ?.classList
        .remove(
            "hidden"
        );

    document.body.classList
        .add(
            "cinematic-open"
        );

    renderCinematicScene(
        currentScene
    );
}


function stopCinematicAuto() {
    if (
        cinematicTimer
    ) {
        clearInterval(
            cinematicTimer
        );

        cinematicTimer =
            null;
    }

    const autoButton =
        document.getElementById(
            "cinematicAuto"
        );

    if (autoButton) {
        autoButton.textContent =
            "▶ Reproducir";
    }
}


function closeCinematic() {
    stopCinematicAuto();

    window.speechSynthesis
        ?.cancel();

    window.RGSMedia
        ?.stopMainNarration
        ?.();

    window.RGSMedia
        ?.duckSoundtrack(
            false
        );

    cinematicIntro
        ?.classList
        .add(
            "hidden"
        );

    document.body.classList
        .remove(
            "cinematic-open"
        );
}


document
    .getElementById(
        "openCinematicIntro"
    )
    ?.addEventListener(
        "click",
        openCinematic
    );


document
    .getElementById(
        "knowledgePlayIntro"
    )
    ?.addEventListener(
        "click",
        openCinematic
    );


document
    .getElementById(
        "closeCinematicIntro"
    )
    ?.addEventListener(
        "click",
        closeCinematic
    );


cinematicIntro
    ?.addEventListener(
        "click",
        event => {
            if (
                event.target ===
                cinematicIntro
            ) {
                closeCinematic();
            }
        }
    );


document
    .getElementById(
        "cinematicPrev"
    )
    ?.addEventListener(
        "click",
        () => {
            stopCinematicAuto();

            renderCinematicScene(
                currentScene -
                1
            );
        }
    );


document
    .getElementById(
        "cinematicNext"
    )
    ?.addEventListener(
        "click",
        () => {
            stopCinematicAuto();

            renderCinematicScene(
                currentScene +
                1
            );
        }
    );


document
    .querySelectorAll(
        "[data-scene-index]"
    )
    .forEach(
        dot => {
            dot.addEventListener(
                "click",
                () => {
                    stopCinematicAuto();

                    renderCinematicScene(
                        Number(
                            dot.dataset
                                .sceneIndex
                        )
                    );
                }
            );
        }
    );


document
    .getElementById(
        "cinematicAuto"
    )
    ?.addEventListener(
        "click",
        event => {
            if (
                cinematicTimer
            ) {
                stopCinematicAuto();
                return;
            }

            event.currentTarget
                .textContent =
                "■ Pausar";


            cinematicTimer =
                setInterval(
                    () => {
                        renderCinematicScene(
                            currentScene +
                            1
                        );
                    },
                    4800
                );
        }
    );


document
    .getElementById(
        "cinematicNarrate"
    )
    ?.addEventListener(
        "click",
        () => {
            /*
              V7.2:
              misma locución MP3 en ordenador y móvil.
              Ya no usamos la voz TTS del sistema.
            */
            window.RGSMedia
                ?.toggleMainNarration
                ?.(
                    false
                );
        }
    );


document.addEventListener(
    "keydown",
    event => {
        if (
            event.key ===
            "Escape"
        ) {
            closeCinematic();
            closeProjectProposal();
        }
    }
);


// ======================================================
// CAMBIO DE VISTA
// ======================================================

document.addEventListener(
    "vista:cambiada",
    event => {
        const nombre =
            event.detail?.nombre;

        if (
            nombre ===
            "conocimiento"
        ) {
            renderKnowledge();
        }

        else if (
            nombre ===
            "proyectos"
        ) {
            renderProjects();
            initProjectsMap();
        }

        else if (
            nombre ===
            "accion"
        ) {
            renderActionIdeas();
        }
    }
);


// ======================================================
// ARRANQUE
// ======================================================

renderKnowledge();
renderProjects();
renderActionIdeas();
