// ======================================================
// V5 · DIAGNÓSTICO INTELIGENTE DEL TERRITORIO
// Síntesis automática basada en datos conectados
// ======================================================

const botonPestanaDiagnostico =
    document.querySelector(
        '[data-tab="diagnostico"]'
    );

const panelDiagnosticoInteligente =
    document.getElementById(
        "tab-diagnostico"
    );


const PAISES_AFRICA_DIAGNOSTICO =
    new Set([
        "DZ", "AO", "BJ", "BW", "BF", "BI", "CV", "CM", "CF", "TD",
        "KM", "CD", "CG", "CI", "DJ", "EG", "GQ", "ER", "SZ", "ET",
        "GA", "GM", "GH", "GN", "GW", "KE", "LS", "LR", "LY", "MG",
        "MW", "ML", "MR", "MU", "MA", "MZ", "NA", "NE", "NG", "RW",
        "ST", "SN", "SC", "SL", "SO", "ZA", "SS", "SD", "TZ", "TG",
        "TN", "UG", "ZM", "ZW", "EH"
    ]);


// ======================================================
// UTILIDADES
// ======================================================

function escaparHTMLDiagnostico(texto) {
    return String(texto ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function normalizarDiagnostico(texto) {
    return String(texto || "")
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .toLowerCase();
}


function sumaNumericaDiagnostico(valores) {
    if (!Array.isArray(valores)) {
        return null;
    }

    const validos =
        valores.filter(
            valor =>
                typeof valor === "number"
                &&
                Number.isFinite(valor)
        );

    if (!validos.length) {
        return null;
    }

    return validos.reduce(
        (total, valor) =>
            total + valor,
        0
    );
}


function numeroDiagnostico(valor) {
    if (
        valor === null ||
        valor === undefined ||
        Number.isNaN(valor)
    ) {
        return "N/D";
    }

    return Number(valor)
        .toLocaleString("es-ES");
}


// ======================================================
// INTERPRETAR LA NECESIDAD
// ======================================================

function detectarObjetivoDiagnostico(necesidad) {
    const texto =
        normalizarDiagnostico(
            necesidad
        );

    const hidro = [
        "acuifero",
        "acuiferos",
        "agua subterranea",
        "nivel freatico",
        "hidrogeologia",
        "perforar",
        "perforacion",
        "sondeo",
        "borehole"
    ];

    const riego = [
        "riego",
        "regar",
        "cultivo",
        "cultivos",
        "agricultura",
        "agricola",
        "huerto",
        "granja"
    ];

    const potable = [
        "agua potable",
        "potable",
        "beber",
        "consumo humano",
        "abastecimiento",
        "fuente publica"
    ];

    const clima = [
        "clima",
        "meteorologia",
        "temperatura",
        "lluvia",
        "prevision",
        "pronostico"
    ];

    const agua = [
        "agua",
        "pozo",
        "pozos",
        "sequia",
        "hidrico",
        "hidrica"
    ];

    if (
        hidro.some(
            palabra =>
                texto.includes(palabra)
        )
    ) {
        return "hidrogeologia";
    }

    if (
        riego.some(
            palabra =>
                texto.includes(palabra)
        )
    ) {
        return "riego";
    }

    if (
        potable.some(
            palabra =>
                texto.includes(palabra)
        )
    ) {
        return "potable";
    }

    if (
        clima.some(
            palabra =>
                texto.includes(palabra)
        )
    ) {
        return "clima";
    }

    if (
        agua.some(
            palabra =>
                texto.includes(palabra)
        )
    ) {
        return "agua";
    }

    return "general";
}


// ======================================================
// METEOROLOGÍA PARA LA SÍNTESIS
// ======================================================

async function obtenerMeteoDiagnostico(
    latitud,
    longitud
) {
    const existente =
        window.appState
            ?.meteorologia;

    if (
        existente?.daily &&
        existente?.current
    ) {
        return existente;
    }

    try {
        const url =
            "https://api.open-meteo.com/v1/forecast" +
            `?latitude=${latitud}` +
            `&longitude=${longitud}` +
            "&current=" +
            [
                "temperature_2m",
                "relative_humidity_2m",
                "precipitation",
                "weather_code"
            ].join(",") +
            "&daily=" +
            [
                "precipitation_sum",
                "et0_fao_evapotranspiration",
                "temperature_2m_max",
                "temperature_2m_min"
            ].join(",") +
            "&timezone=auto" +
            "&forecast_days=7";

        const respuesta =
            await fetch(url);

        if (!respuesta.ok) {
            return null;
        }

        const datos =
            await respuesta.json();

        window.appState =
            window.appState
            ||
            {};

        window.appState.meteorologia =
            datos;

        return datos;

    } catch (error) {
        console.warn(
            "Diagnóstico · Open-Meteo:",
            error
        );

        return null;
    }
}


// ======================================================
// COMPONENTES VISUALES
// ======================================================

function tarjetaSenal(
    icono,
    etiqueta,
    valor,
    detalle
) {
    return `
        <article class="smart-signal-card">
            <div class="smart-signal-icon">
                ${icono}
            </div>

            <span class="smart-signal-label">
                ${etiqueta}
            </span>

            <strong class="smart-signal-value">
                ${valor}
            </strong>

            <small>
                ${detalle}
            </small>
        </article>
    `;
}


function filaConfianza(
    nivel,
    titulo,
    descripcion
) {
    const clase =
        nivel === "alta"
            ? "high"
            :
        nivel === "media"
            ? "medium"
            :
        nivel === "baja"
            ? "low"
            :
            "unknown";

    const etiqueta =
        nivel === "alta"
            ? "Alta"
            :
        nivel === "media"
            ? "Media"
            :
        nivel === "baja"
            ? "Baja"
            :
            "No disponible";

    return `
        <div class="smart-confidence-row">
            <span class="smart-confidence-dot ${clase}"></span>

            <div>
                <strong>
                    ${titulo}
                </strong>

                <span>
                    ${descripcion}
                </span>
            </div>

            <span class="smart-confidence-label ${clase}">
                ${etiqueta}
            </span>
        </div>
    `;
}


function itemAccion(
    numero,
    titulo,
    descripcion,
    tab = null
) {
    const boton =
        tab
            ?
            `
                <button
                    class="smart-action-link"
                    type="button"
                    data-smart-tab="${tab}"
                >
                    Abrir módulo →
                </button>
            `
            :
            "";

    return `
        <div class="smart-action-item">
            <span class="smart-action-number">
                ${numero}
            </span>

            <div class="smart-action-content">
                <strong>
                    ${titulo}
                </strong>

                <p>
                    ${descripcion}
                </p>

                ${boton}
            </div>
        </div>
    `;
}


// ======================================================
// CREAR LECTURA AUTOMÁTICA
// ======================================================

function construirLectura(
    objetivo,
    estado,
    meteo
) {
    const infra =
        estado.infraestructura;

    const aguaPotable =
        infra?.aguaPotable;

    const pozos =
        infra?.pozos;

    const precipitacion7d =
        sumaNumericaDiagnostico(
            meteo
                ?.daily
                ?.precipitation_sum
        );

    const et07d =
        sumaNumericaDiagnostico(
            meteo
                ?.daily
                ?.et0_fao_evapotranspiration
        );

    const esAfrica =
        PAISES_AFRICA_DIAGNOSTICO
            .has(
                estado.countryCode
            );

    const partes = [];

    partes.push(
        `El territorio <strong>${escaparHTMLDiagnostico(
            estado.territorioAnalizado || "seleccionado"
        )}</strong> está correctamente geolocalizado.`
    );

    if (infra) {
        partes.push(
            `En el inventario colaborativo de OpenStreetMap del radio analizado aparecen <strong>${numeroDiagnostico(
                aguaPotable
            )} puntos de agua potable</strong> y <strong>${numeroDiagnostico(
                pozos
            )} pozos registrados</strong>. Estos registros no equivalen a un inventario oficial completo.`
        );
    }
    else {
        partes.push(
            `La consulta de infraestructuras OpenStreetMap/Overpass no está disponible en este momento, por lo que no se puede interpretar la ausencia de registros como ausencia real de infraestructuras.`
        );
    }

    if (
        precipitacion7d !== null &&
        et07d !== null
    ) {
        partes.push(
            `Para los próximos 7 días, el modelo meteorológico estima aproximadamente <strong>${precipitacion7d.toFixed(
                1
            )} mm de precipitación</strong> y <strong>${et07d.toFixed(
                1
            )} mm de ET₀</strong>. Esta comparación es una señal meteorológica preliminar y no sustituye el balance hídrico de un cultivo o una parcela.`
        );
    }

    if (objetivo === "hidrogeologia") {
        partes.push(
            esAfrica
                ?
                `Para el contexto de aguas subterráneas existe además cobertura regional africana mediante BGS y capacidad de consulta cartográfica mundial mediante IGRAC GGIS. La información disponible sirve para orientar la investigación, pero no determina por sí sola la profundidad exacta, el caudal ni el punto óptimo de perforación.`
                :
                `Para el contexto de aguas subterráneas está disponible la capa mundial IGRAC GGIS. La información cartográfica puede orientar la investigación, pero no determina por sí sola la profundidad exacta, el caudal ni el punto óptimo de perforación.`
        );
    }

    else if (objetivo === "riego") {
        if (
            precipitacion7d !== null &&
            et07d !== null &&
            et07d > precipitacion7d
        ) {
            partes.push(
                `La ET₀ prevista supera a la precipitación prevista en este horizonte. Esto sugiere una <strong>demanda atmosférica superior al aporte de lluvia</strong>, pero para dimensionar riego todavía faltan cultivo, superficie, suelo, etapa de crecimiento y eficiencia del sistema.`
            );
        }
        else {
            partes.push(
                `La necesidad de riego no puede deducirse solo de la lluvia prevista: hay que incorporar cultivo, suelo, superficie, etapa de crecimiento y eficiencia del sistema.`
            );
        }
    }

    else if (objetivo === "potable") {
        partes.push(
            `Los puntos cartografiados como agua potable indican accesos registrados, mientras que un pozo registrado no implica automáticamente que esté operativo ni que su agua sea apta para consumo humano. La potabilidad requiere verificación sanitaria y, cuando corresponda, análisis de laboratorio.`
        );
    }

    else if (objetivo === "agua") {
        partes.push(
            `La plataforma puede localizar recursos hídricos registrados y relacionarlos con el contexto meteorológico. Todavía no puede garantizar disponibilidad subterránea, caudal, profundidad ni calidad del agua en una parcela concreta.`
        );
    }

    else if (objetivo === "clima") {
        partes.push(
            `La información meteorológica disponible permite describir condiciones actuales y previsión de corto plazo. No debe confundirse con una climatología histórica de largo plazo.`
        );
    }

    else {
        partes.push(
            `La síntesis actual sirve como exploración territorial preliminar. Para una decisión operativa hay que abrir los módulos especializados y verificar localmente los datos relevantes.`
        );
    }

    return partes.join(" ");
}


// ======================================================
// ACCIONES SEGÚN LA NECESIDAD
// ======================================================

function construirAcciones(
    objetivo,
    esAfrica
) {
    let acciones = "";

    if (
        objetivo === "hidrogeologia"
    ) {
        acciones +=
            itemAccion(
                1,
                "Revisar pozos y contexto hidrogeológico",
                "Activa IGRAC y comprueba si existen registros o capas útiles alrededor del territorio.",
                "hidrogeologia"
            );

        if (esAfrica) {
            acciones +=
                itemAccion(
                    2,
                    "Consultar BGS África",
                    "Usa el Africa Groundwater Atlas como contexto regional de acuíferos, productividad y profundidad estimada.",
                    "hidrogeologia"
                );
        }

        acciones +=
            itemAccion(
                esAfrica ? 3 : 2,
                "Recoger datos locales",
                "Busca profundidades, caudales y estado de pozos conocidos en la zona. Esos datos locales aumentan mucho la utilidad del análisis."
            );

        acciones +=
            itemAccion(
                esAfrica ? 4 : 3,
                "Estudio antes de perforar",
                "Antes de elegir un punto de perforación, utiliza un estudio hidrogeológico y, cuando proceda, geofísico. Para consumo humano, verifica también la calidad del agua."
            );
    }

    else if (
        objetivo === "riego"
    ) {
        acciones +=
            itemAccion(
                1,
                "Comparar lluvia y ET₀",
                "Utiliza la previsión como señal preliminar de demanda atmosférica y revisa la evolución de los próximos días.",
                "clima"
            );

        acciones +=
            itemAccion(
                2,
                "Localizar recursos de agua",
                "Revisa puntos de agua, pozos, cursos y embalses registrados alrededor del territorio.",
                "agua"
            );

        acciones +=
            itemAccion(
                3,
                "Definir el cultivo",
                "Para estimar riego hacen falta cultivo, superficie, tipo de suelo, etapa de crecimiento y método de riego."
            );
    }

    else if (
        objetivo === "potable"
    ) {
        acciones +=
            itemAccion(
                1,
                "Revisar accesos registrados",
                "Localiza los puntos de agua potable y pozos más próximos.",
                "agua"
            );

        acciones +=
            itemAccion(
                2,
                "Verificar sobre el terreno",
                "Confirma si los puntos están operativos, son accesibles y corresponden al uso esperado."
            );

        acciones +=
            itemAccion(
                3,
                "Control sanitario",
                "Un pozo o fuente no debe considerarse potable sin la verificación sanitaria o analítica correspondiente."
            );
    }

    else if (
        objetivo === "clima"
    ) {
        acciones +=
            itemAccion(
                1,
                "Abrir meteorología",
                "Revisa temperatura, humedad, lluvia, viento, ET₀ y previsión de 7 días.",
                "clima"
            );

        acciones +=
            itemAccion(
                2,
                "Separar tiempo y clima",
                "La previsión de corto plazo no sustituye una serie histórica para estudiar sequías, estaciones o tendencias."
            );
    }

    else {
        acciones +=
            itemAccion(
                1,
                "Revisar el módulo Agua",
                "Comprueba recursos hídricos registrados y contexto de lluvia y ET₀.",
                "agua"
            );

        acciones +=
            itemAccion(
                2,
                "Revisar Hidrogeología",
                "Comprueba fuentes de aguas subterráneas y las limitaciones de la información disponible.",
                "hidrogeologia"
            );

        acciones +=
            itemAccion(
                3,
                "Verificar localmente",
                "Contrasta los datos cartográficos con información de campo antes de tomar decisiones."
            );
    }

    return acciones;
}


// ======================================================
// CARGAR DIAGNÓSTICO
// ======================================================

async function cargarModuloDiagnosticoInterno() {
    const estado =
        window.appState || {};

    const latitud =
        estado.latitud;

    const longitud =
        estado.longitud;

    if (
        latitud === null ||
        longitud === null ||
        latitud === undefined ||
        longitud === undefined
    ) {
        panelDiagnosticoInteligente.innerHTML = `
            <article class="panel">
                <div class="smart-loading">
                    <span>🧭</span>
                    <h3>Primero analiza un territorio</h3>
                    <p>
                        El diagnóstico necesita una localización
                        y una necesidad declarada.
                    </p>
                </div>
            </article>
        `;

        return;
    }

    panelDiagnosticoInteligente.innerHTML = `
        <article class="panel">
            <div class="smart-loading">
                <span>🧠</span>
                <h3>Construyendo diagnóstico preliminar</h3>
                <p>
                    Relacionando cartografía, demografía,
                    meteorología y contexto hidrogeológico
                    sin completar datos ausentes.
                </p>
            </div>
        </article>
    `;

    const meteo =
        await obtenerMeteoDiagnostico(
            latitud,
            longitud
        );

    const objetivo =
        detectarObjetivoDiagnostico(
            estado.necesidad
        );

    const infra =
        estado.infraestructura;

    const precipitacion7d =
        sumaNumericaDiagnostico(
            meteo?.daily?.precipitation_sum
        );

    const et07d =
        sumaNumericaDiagnostico(
            meteo?.daily?.et0_fao_evapotranspiration
        );

    const temperaturaActual =
        meteo
            ?.current
            ?.temperature_2m;

    const esAfrica =
        PAISES_AFRICA_DIAGNOSTICO
            .has(
                estado.countryCode
            );

    const lectura =
        construirLectura(
            objetivo,
            estado,
            meteo
        );

    const moduloSugerido =
        objetivo === "hidrogeologia"
            ? "Hidrogeología"
            :
        objetivo === "riego"
            ? "Agua + Clima"
            :
        objetivo === "potable"
            ? "Agua"
            :
        objetivo === "clima"
            ? "Clima"
            :
        objetivo === "agua"
            ? "Agua"
            :
            "Resumen";

    const nombreObjetivo =
        objetivo === "hidrogeologia"
            ? "Aguas subterráneas / perforación"
            :
        objetivo === "riego"
            ? "Riego y agricultura"
            :
        objetivo === "potable"
            ? "Agua potable"
            :
        objetivo === "clima"
            ? "Meteorología"
            :
        objetivo === "agua"
            ? "Recursos hídricos"
            :
            "Exploración territorial";

    const poblacionTexto =
        estado.poblacion !== null &&
        estado.poblacion !== undefined
            ?
            numeroDiagnostico(
                estado.poblacion
            )
            :
            "N/D";

    const poblacionDetalle =
        estado.poblacionAnio
            ?
            `año ${estado.poblacionAnio}`
            :
            "sin fecha disponible";

    const fuentes = [
        "Nominatim",
        "OpenStreetMap"
    ];

    if (
        estado.overpassDisponible
    ) {
        fuentes.push(
            "Overpass"
        );
    }

    if (
        estado.wikidataDisponible
    ) {
        fuentes.push(
            "Wikidata"
        );
    }

    if (meteo) {
        fuentes.push(
            "Open-Meteo"
        );
    }

    if (
        objetivo === "hidrogeologia" ||
        objetivo === "agua" ||
        objetivo === "riego"
    ) {
        fuentes.push(
            "IGRAC GGIS"
        );

        if (esAfrica) {
            fuentes.push(
                "BGS África"
            );
        }
    }

    const fuentesHTML =
        fuentes
            .map(
                fuente =>
                    `<span class="smart-source-pill">${fuente}</span>`
            )
            .join("");

    panelDiagnosticoInteligente.innerHTML = `

        <div class="smart-layout">

            <article class="panel smart-hero-panel">

                <div class="panel-header">

                    <div>
                        <span class="panel-kicker">
                            DIAGNÓSTICO V5
                        </span>

                        <h3>
                            Síntesis preliminar orientada a la necesidad
                        </h3>
                    </div>

                    <span class="smart-objective-badge">
                        ${nombreObjetivo}
                    </span>

                </div>


                <p class="smart-summary">
                    ${lectura}
                </p>


                <div class="smart-context-strip">

                    <div>
                        <span>Territorio</span>
                        <strong>
                            ${
                                escaparHTMLDiagnostico(
                                    estado.territorioAnalizado ||
                                    "—"
                                )
                            }
                        </strong>
                    </div>

                    <div>
                        <span>Necesidad</span>
                        <strong>
                            ${
                                escaparHTMLDiagnostico(
                                    estado.necesidad ||
                                    "—"
                                )
                            }
                        </strong>
                    </div>

                    <div>
                        <span>Módulo técnico sugerido</span>
                        <strong>
                            ${moduloSugerido}
                        </strong>
                    </div>

                </div>

            </article>


            <div class="smart-signal-grid">

                ${
                    tarjetaSenal(
                        "💧",
                        "Agua potable",
                        infra
                            ?
                            numeroDiagnostico(
                                infra.aguaPotable
                            )
                            :
                            "N/D",
                        infra
                            ?
                            `registros OSM en ${infra.radioKm ?? 10} km`
                            :
                            "Overpass no disponible"
                    )
                }

                ${
                    tarjetaSenal(
                        "🕳️",
                        "Pozos",
                        infra
                            ?
                            numeroDiagnostico(
                                infra.pozos
                            )
                            :
                            "N/D",
                        infra
                            ?
                            "registros OSM"
                            :
                            "sin inventario disponible"
                    )
                }

                ${
                    tarjetaSenal(
                        "🌧️",
                        "Lluvia · 7 días",
                        precipitacion7d !== null
                            ?
                            `${precipitacion7d.toFixed(1)} mm`
                            :
                            "N/D",
                        "previsión meteorológica"
                    )
                }

                ${
                    tarjetaSenal(
                        "💨",
                        "ET₀ · 7 días",
                        et07d !== null
                            ?
                            `${et07d.toFixed(1)} mm`
                            :
                            "N/D",
                        "evapotranspiración de referencia"
                    )
                }

                ${
                    tarjetaSenal(
                        "🌡️",
                        "Temperatura actual",
                        temperaturaActual !== null &&
                        temperaturaActual !== undefined
                            ?
                            `${temperaturaActual} °C`
                            :
                            "N/D",
                        "Open-Meteo"
                    )
                }

                ${
                    tarjetaSenal(
                        "👥",
                        "Población",
                        poblacionTexto,
                        poblacionDetalle
                    )
                }

            </div>


            <div class="smart-two-column">

                <article class="panel">

                    <div class="panel-header">
                        <div>
                            <span class="panel-kicker">
                                CONFIANZA
                            </span>
                            <h3>
                                Nivel de solidez de la información
                            </h3>
                        </div>
                    </div>


                    <div class="smart-confidence-list">

                        ${
                            filaConfianza(
                                "alta",
                                "Localización",
                                "El territorio y sus coordenadas proceden de la búsqueda geográfica seleccionada."
                            )
                        }

                        ${
                            filaConfianza(
                                estado.overpassDisponible
                                    ?
                                    "media"
                                    :
                                    "desconocida",
                                "Infraestructuras OSM",
                                estado.overpassDisponible
                                    ?
                                    "Inventario colaborativo útil para exploración, pero no necesariamente completo."
                                    :
                                    "La consulta no respondió; no se puede interpretar como ausencia."
                            )
                        }

                        ${
                            filaConfianza(
                                meteo
                                    ?
                                    "media"
                                    :
                                    "desconocida",
                                "Meteorología",
                                meteo
                                    ?
                                    "Previsión de modelo útil para corto plazo; no es climatología histórica."
                                    :
                                    "No se pudo obtener la previsión."
                            )
                        }

                        ${
                            filaConfianza(
                                objetivo === "hidrogeologia"
                                    ?
                                    "media"
                                    :
                                    "desconocida",
                                "Contexto hidrogeológico",
                                objetivo === "hidrogeologia"
                                    ?
                                    (
                                        esAfrica
                                            ?
                                            "IGRAC y BGS permiten contextualizar la investigación a escala mundial y regional africana."
                                            :
                                            "IGRAC permite contextualizar la investigación a escala mundial."
                                    )
                                    :
                                    "No es el foco principal de la necesidad declarada."
                            )
                        }

                        ${
                            filaConfianza(
                                "desconocida",
                                "Profundidad, caudal y potabilidad local",
                                "No pueden deducirse de forma segura con los datos actuales."
                            )
                        }

                    </div>

                </article>


                <article class="panel">

                    <div class="panel-header">
                        <div>
                            <span class="panel-kicker">
                                DECISIÓN
                            </span>
                            <h3>
                                Qué permite hacer este diagnóstico
                            </h3>
                        </div>
                    </div>


                    <div class="smart-decision-box good">
                        <strong>
                            ✓ Adecuado ahora
                        </strong>
                        <p>
                            Orientar la investigación, localizar recursos
                            registrados, comparar fuentes y decidir qué
                            información falta recopilar.
                        </p>
                    </div>


                    <div class="smart-decision-box stop">
                        <strong>
                            ✕ No adecuado todavía
                        </strong>
                        <p>
                            Autorizar una perforación, prometer un caudal,
                            asegurar una profundidad exacta o declarar
                            potable un agua sin verificación.
                        </p>
                    </div>

                </article>

            </div>


            <article class="panel">

                <div class="panel-header">
                    <div>
                        <span class="panel-kicker">
                            SIGUIENTE PASO
                        </span>
                        <h3>
                            Acciones recomendadas
                        </h3>
                    </div>
                </div>

                <div class="smart-actions-list">
                    ${
                        construirAcciones(
                            objetivo,
                            esAfrica
                        )
                    }
                </div>

            </article>


            <article class="panel">

                <div class="panel-header">
                    <div>
                        <span class="panel-kicker">
                            TRAZABILIDAD
                        </span>
                        <h3>
                            Fuentes utilizadas en la síntesis
                        </h3>
                    </div>

                    <button
                        id="actualizarDiagnostico"
                        class="smart-refresh-button"
                        type="button"
                    >
                        ↻ Actualizar
                    </button>
                </div>

                <div class="smart-sources">
                    ${fuentesHTML}
                </div>

                <p class="smart-method-note">
                    La síntesis se genera mediante reglas transparentes
                    a partir de los datos disponibles. Si una fuente no
                    responde, el sistema marca el dato como no disponible
                    y no lo sustituye por una suposición.
                </p>

            </article>

        </div>
    `;


    panelDiagnosticoInteligente
        .querySelectorAll(
            "[data-smart-tab]"
        )
        .forEach(
            boton => {

                boton.addEventListener(
                    "click",
                    function () {

                        const tab =
                            this.dataset.smartTab;

                        window.seleccionarTab
                            ?.(tab);

                        if (
                            tab === "agua"
                        ) {
                            window.cargarModuloAgua
                                ?.();
                        }

                        else if (
                            tab === "hidrogeologia"
                        ) {
                            window.cargarModuloHidrogeologia
                                ?.();
                        }

                        else if (
                            tab === "clima"
                        ) {
                            window.cargarModuloClima
                                ?.();
                        }
                    }
                );
            }
        );


    document
        .getElementById(
            "actualizarDiagnostico"
        )
        ?.addEventListener(
            "click",
            function () {

                window.appState =
                    window.appState
                    ||
                    {};

                window.appState.meteorologia =
                    null;

                cargarModuloDiagnostico();
            }
        );
}



async function cargarModuloDiagnostico() {
    try {
        await cargarModuloDiagnosticoInterno();
    }
    catch (error) {
        window.RGS
            ?.renderModuleError
            ?.(
                panelDiagnosticoInteligente,
                "Diagnóstico",
                error,
                cargarModuloDiagnostico
            );
    }
}

window.cargarModuloDiagnostico =
    cargarModuloDiagnostico;


botonPestanaDiagnostico
    ?.addEventListener(
        "click",
        cargarModuloDiagnostico
    );
