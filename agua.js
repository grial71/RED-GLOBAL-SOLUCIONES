// ======================================================
// MÓDULO AGUA
// OPENSTREETMAP / OVERPASS + OPEN-METEO
// ======================================================

const botonPestanaAgua =
    document.querySelector(
        '[data-tab="agua"]'
    );

const panelAgua =
    document.getElementById(
        "tab-agua"
    );

const RADIO_AGUA =
    10000;

const SERVIDORES_OVERPASS_AGUA = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.private.coffee/api/interpreter"
];


// ======================================================
// UTILIDADES
// ======================================================

function escaparHTMLAgua(texto) {
    return String(texto ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

async function fetchAguaConTimeout(
    url,
    opciones = {},
    milisegundos = 30000
) {
    const controlador =
        new AbortController();

    const temporizador =
        setTimeout(
            () => controlador.abort(),
            milisegundos
        );

    try {
        return await fetch(
            url,
            {
                ...opciones,
                signal: controlador.signal
            }
        );
    } finally {
        clearTimeout(
            temporizador
        );
    }
}

function distanciaKmAgua(
    lat1,
    lon1,
    lat2,
    lon2
) {
    const radioTierra = 6371;

    const rad =
        grados =>
            grados *
            Math.PI /
            180;

    const dLat =
        rad(
            lat2 - lat1
        );

    const dLon =
        rad(
            lon2 - lon1
        );

    const a =
        Math.sin(
            dLat / 2
        ) ** 2
        +
        Math.cos(
            rad(lat1)
        )
        *
        Math.cos(
            rad(lat2)
        )
        *
        Math.sin(
            dLon / 2
        ) ** 2;

    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );

    return radioTierra * c;
}


// ======================================================
// OVERPASS
// ======================================================

async function consultarAguaOverpass(
    latitud,
    longitud
) {
    const consulta = `
        [out:json][timeout:25];
        (
            nwr["amenity"="drinking_water"]
                (around:${RADIO_AGUA},${latitud},${longitud});

            nwr["man_made"="water_well"]
                (around:${RADIO_AGUA},${latitud},${longitud});

            nwr["waterway"="river"]
                (around:${RADIO_AGUA},${latitud},${longitud});

            nwr["waterway"="stream"]
                (around:${RADIO_AGUA},${latitud},${longitud});

            nwr["natural"="water"]["water"="reservoir"]
                (around:${RADIO_AGUA},${latitud},${longitud});

            nwr["landuse"="reservoir"]
                (around:${RADIO_AGUA},${latitud},${longitud});
        );
        out center tags qt;
    `;

    for (
        const servidor
        of SERVIDORES_OVERPASS_AGUA
    ) {
        try {
            const cuerpo =
                new URLSearchParams();

            cuerpo.set(
                "data",
                consulta
            );

            const respuesta =
                await fetchAguaConTimeout(
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
                elements:
                    datos.elements
            };

        } catch (error) {
            console.warn(
                "Overpass agua:",
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
// OPEN-METEO
// ======================================================

async function consultarAguaMeteo(
    latitud,
    longitud
) {
    try {
        const url =
            "https://api.open-meteo.com/v1/forecast" +
            `?latitude=${latitud}` +
            `&longitude=${longitud}` +
            "&daily=" +
            [
                "precipitation_sum",
                "et0_fao_evapotranspiration"
            ].join(",") +
            "&timezone=auto" +
            "&forecast_days=7";

        const respuesta =
            await fetchAguaConTimeout(
                url,
                {},
                20000
            );

        if (!respuesta.ok) {
            throw new Error(
                "Open-Meteo no disponible"
            );
        }

        const datos =
            await respuesta.json();

        return {
            disponible: true,
            datos
        };

    } catch (error) {
        console.warn(
            "Open-Meteo agua:",
            error
        );

        return {
            disponible: false,
            datos: null
        };
    }
}


// ======================================================
// PROCESAR OSM
// ======================================================

function procesarDatosAgua(
    elementos,
    centroLat,
    centroLon
) {
    let aguaPotable = 0;
    let pozos = 0;
    let tramosCursosAgua = 0;

    const reservorios =
        new Set();

    const puntosCercanos = [];

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

            const esCursoAgua =
                tags.waterway ===
                    "river"
                ||
                tags.waterway ===
                    "stream";

            const esReservorio =
                (
                    tags.natural ===
                        "water"
                    &&
                    tags.water ===
                        "reservoir"
                )
                ||
                tags.landuse ===
                    "reservoir";

            if (esAguaPotable) {
                aguaPotable++;
            }

            if (esPozo) {
                pozos++;
            }

            if (esCursoAgua) {
                tramosCursosAgua++;
            }

            if (esReservorio) {
                reservorios.add(
                    `${elemento.type}-${elemento.id}`
                );
            }

            if (
                !esAguaPotable &&
                !esPozo
            ) {
                return;
            }

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

            let tipo =
                "Punto de agua potable";

            let icono =
                "💧";

            if (
                esPozo &&
                esAguaPotable
            ) {
                tipo =
                    "Pozo con agua potable";
                icono =
                    "💧";
            }
            else if (
                esPozo
            ) {
                tipo = "Pozo";
                icono = "🕳️";
            }

            puntosCercanos.push({
                tipo,
                icono,
                nombre:
                    tags.name ||
                    "Sin nombre registrado",
                distancia:
                    distanciaKmAgua(
                        centroLat,
                        centroLon,
                        lat,
                        lon
                    )
            });
        }
    );

    puntosCercanos.sort(
        (a, b) =>
            a.distancia -
            b.distancia
    );

    return {
        aguaPotable,
        pozos,
        tramosCursosAgua,
        reservorios:
            reservorios.size,
        puntosCercanos:
            puntosCercanos.slice(
                0,
                12
            )
    };
}

function sumarValoresAgua(valores) {
    if (!Array.isArray(valores)) {
        return null;
    }

    const numeros =
        valores.filter(
            valor =>
                typeof valor ===
                    "number"
                &&
                Number.isFinite(
                    valor
                )
        );

    if (!numeros.length) {
        return null;
    }

    return numeros.reduce(
        (
            total,
            valor
        ) =>
            total +
            valor,
        0
    );
}

function tarjetaAgua(
    icono,
    etiqueta,
    valor,
    detalle
) {
    return `
        <article class="water-card">
            <div class="water-card-icon">
                ${icono}
            </div>
            <span class="water-card-label">
                ${etiqueta}
            </span>
            <strong class="water-card-value">
                ${valor}
            </strong>
            <small>
                ${detalle}
            </small>
        </article>
    `;
}


// ======================================================
// CARGAR MÓDULO AGUA
// ======================================================

async function cargarModuloAguaInterno() {
    const latitud =
        window.appState?.latitud;

    const longitud =
        window.appState?.longitud;

    const territorio =
        window.appState
            ?.territorioAnalizado;

    if (
        latitud === null ||
        longitud === null ||
        latitud === undefined ||
        longitud === undefined
    ) {
        panelAgua.innerHTML = `
            <article class="panel">
                <div class="water-loading">
                    <span>💧</span>
                    <h3>
                        Primero analiza un territorio
                    </h3>
                    <p>
                        El módulo de agua necesita
                        coordenadas del territorio seleccionado.
                    </p>
                </div>
            </article>
        `;
        return;
    }

    panelAgua.innerHTML = `
        <article class="panel">
            <div class="water-loading">
                <span>💧</span>
                <h3>
                    Analizando recursos hídricos registrados
                </h3>
                <p>
                    Consultando OpenStreetMap,
                    Overpass y Open-Meteo para
                    ${
                        escaparHTMLAgua(
                            territorio ||
                            "el territorio"
                        )
                    }...
                </p>
            </div>
        </article>
    `;

    const [
        resultadoOSM,
        resultadoMeteo
    ] = await Promise.all([
        consultarAguaOverpass(
            latitud,
            longitud
        ),
        consultarAguaMeteo(
            latitud,
            longitud
        )
    ]);

    let datosAgua = {
        aguaPotable: null,
        pozos: null,
        tramosCursosAgua: null,
        reservorios: null,
        puntosCercanos: []
    };

    if (
        resultadoOSM.disponible
    ) {
        datosAgua =
            procesarDatosAgua(
                resultadoOSM.elements,
                latitud,
                longitud
            );
    }

    let precipitacion7d = null;
    let et0_7d = null;

    if (
        resultadoMeteo.disponible
    ) {
        precipitacion7d =
            sumarValoresAgua(
                resultadoMeteo
                    .datos
                    ?.daily
                    ?.precipitation_sum
            );

        et0_7d =
            sumarValoresAgua(
                resultadoMeteo
                    .datos
                    ?.daily
                    ?.et0_fao_evapotranspiration
            );
    }

    const textoPrecipitacion =
        precipitacion7d !== null
            ? `${precipitacion7d.toFixed(1)} mm`
            : "N/D";

    const textoET0 =
        et0_7d !== null
            ? `${et0_7d.toFixed(1)} mm`
            : "N/D";

    let listaPuntos = "";

    if (
        !resultadoOSM.disponible
    ) {
        listaPuntos = `
            <p class="empty-message">
                Overpass no ha respondido.
                No podemos confirmar los registros cercanos.
            </p>
        `;
    }
    else if (
        !datosAgua
            .puntosCercanos
            .length
    ) {
        listaPuntos = `
            <p class="empty-message">
                No aparecen puntos de agua potable
                ni pozos registrados en esta consulta.
                Esto no demuestra que no existan físicamente.
            </p>
        `;
    }
    else {
        datosAgua
            .puntosCercanos
            .forEach(
                punto => {
                    const distanciaTexto =
                        punto.distancia < 1
                            ?
                            `${Math.round(
                                punto.distancia *
                                1000
                            )} m`
                            :
                            `${punto.distancia.toFixed(1)} km`;

                    listaPuntos += `
                        <div class="water-list-item">
                            <div class="water-list-icon">
                                ${punto.icono}
                            </div>

                            <div class="water-list-main">
                                <strong>
                                    ${
                                        escaparHTMLAgua(
                                            punto.tipo
                                        )
                                    }
                                </strong>
                                <span>
                                    ${
                                        escaparHTMLAgua(
                                            punto.nombre
                                        )
                                    }
                                </span>
                            </div>

                            <div class="water-distance">
                                ${distanciaTexto}
                            </div>
                        </div>
                    `;
                }
            );
    }

    panelAgua.innerHTML = `
        <div class="water-layout">

            <article class="panel">
                <div class="panel-header">
                    <div>
                        <span class="panel-kicker">
                            AGUA · INVENTARIO LOCAL
                        </span>
                        <h3>
                            Recursos registrados
                        </h3>
                    </div>

                    <span class="source-badge">
                        OSM / Overpass
                    </span>
                </div>

                <div class="water-summary-grid">
                    ${
                        tarjetaAgua(
                            "💧",
                            "Agua potable",
                            resultadoOSM.disponible
                                ? datosAgua.aguaPotable
                                : "N/D",
                            `registros en ${RADIO_AGUA / 1000} km`
                        )
                    }

                    ${
                        tarjetaAgua(
                            "🕳️",
                            "Pozos",
                            resultadoOSM.disponible
                                ? datosAgua.pozos
                                : "N/D",
                            "estructuras registradas"
                        )
                    }

                    ${
                        tarjetaAgua(
                            "🌊",
                            "Ríos / arroyos",
                            resultadoOSM.disponible
                                ? datosAgua.tramosCursosAgua
                                : "N/D",
                            "tramos OSM, no ríos únicos"
                        )
                    }

                    ${
                        tarjetaAgua(
                            "🏞️",
                            "Embalses",
                            resultadoOSM.disponible
                                ? datosAgua.reservorios
                                : "N/D",
                            "elementos OSM registrados"
                        )
                    }
                </div>
            </article>

            <article class="panel">
                <div class="panel-header">
                    <div>
                        <span class="panel-kicker">
                            PREVISIÓN HÍDRICA
                        </span>
                        <h3>
                            Lluvia y demanda atmosférica
                        </h3>
                    </div>

                    <span class="source-badge">
                        Open-Meteo
                    </span>
                </div>

                <div class="water-meteo-grid">
                    <div class="water-indicator">
                        <span>
                            Precipitación prevista · 7 días
                        </span>
                        <strong>
                            ${textoPrecipitacion}
                        </strong>
                        <small>
                            suma del pronóstico diario
                        </small>
                    </div>

                    <div class="water-indicator">
                        <span>
                            ET₀ acumulada · 7 días
                        </span>
                        <strong>
                            ${textoET0}
                        </strong>
                        <small>
                            evapotranspiración de referencia
                        </small>
                    </div>
                </div>
            </article>

            <article class="panel">
                <div class="panel-header">
                    <div>
                        <span class="panel-kicker">
                            CERCA DEL PUNTO SELECCIONADO
                        </span>
                        <h3>
                            Agua potable y pozos más próximos
                        </h3>
                    </div>

                    <span class="source-badge">
                        hasta 12 registros
                    </span>
                </div>

                <div class="water-list">
                    ${listaPuntos}
                </div>
            </article>

            <article class="panel">
                <div class="panel-header">
                    <div>
                        <span class="panel-kicker">
                            CALIDAD DEL DATO
                        </span>
                        <h3>
                            Qué podemos afirmar
                        </h3>
                    </div>
                </div>

                <div class="water-quality-list">
                    <div class="water-quality-item">
                        <strong>
                            🟢 Agua potable registrada
                        </strong>
                        <span>
                            Son elementos cartografiados
                            como acceso a agua potable.
                        </span>
                    </div>

                    <div class="water-quality-item">
                        <strong>
                            🟢 Pozos registrados
                        </strong>
                        <span>
                            Son elementos cartografiados
                            como pozos. No implica que estén
                            operativos ni que su agua sea potable.
                        </span>
                    </div>

                    <div class="water-quality-item">
                        <strong>
                            🟡 Cursos de agua
                        </strong>
                        <span>
                            El número corresponde a elementos
                            o tramos de OSM, no necesariamente
                            al número real de ríos o arroyos.
                        </span>
                    </div>

                    <div class="water-quality-item">
                        <strong>
                            🔴 Acuíferos / nivel freático
                        </strong>
                        <span>
                            Todavía no disponemos de una
                            fuente hidrogeológica conectada.
                        </span>
                    </div>
                </div>
            </article>

            <div class="water-alert">
                <strong>
                    ⚠️ Importante
                </strong>
                <p>
                    Este módulo localiza registros existentes
                    y aporta contexto meteorológico.
                    No puede determinar todavía dónde perforar,
                    a qué profundidad aparece agua,
                    el caudal de un acuífero ni la calidad
                    sanitaria del agua subterránea.
                </p>
            </div>

        </div>
    `;
}


async function cargarModuloAgua() {
    try {
        await cargarModuloAguaInterno();
    }
    catch (error) {
        window.RGS
            ?.renderModuleError
            ?.(
                panelAgua,
                "Agua",
                error,
                cargarModuloAgua
            );
    }
}

window.cargarModuloAgua =
    cargarModuloAgua;

botonPestanaAgua
    ?.addEventListener(
        "click",
        cargarModuloAgua
    );
