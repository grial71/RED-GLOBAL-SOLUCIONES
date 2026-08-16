// ======================================================
// MÓDULO HIDROGEOLOGÍA
// IGRAC GGIS + REFERENCIA BGS PARA ÁFRICA
// ======================================================

const botonPestanaHidrogeologia =
    document.querySelector(
        '[data-tab="hidrogeologia"]'
    );

const panelHidrogeologia =
    document.getElementById(
        "tab-hidrogeologia"
    );

const fuenteIGRAC =
    document.getElementById(
        "fuenteIGRAC"
    );


let capaIGRACPozos =
    null;

let capaIGRACActiva =
    false;


function actualizarLeyendaIGRAC(estado) {

    const elemento =
        document.getElementById(
            "leyendaIGRAC"
        );

    if (!elemento) {
        return;
    }

    elemento.classList.remove(
        "is-inactive",
        "is-active",
        "is-error"
    );

    if (estado === "active") {
        elemento.classList.add(
            "is-active"
        );
    }
    else if (estado === "error") {
        elemento.classList.add(
            "is-error"
        );
    }
    else {
        elemento.classList.add(
            "is-inactive"
        );
    }
}


const PAISES_AFRICA =
    new Set([
        "DZ", "AO", "BJ", "BW", "BF", "BI", "CV", "CM", "CF", "TD",
        "KM", "CD", "CG", "CI", "DJ", "EG", "GQ", "ER", "SZ", "ET",
        "GA", "GM", "GH", "GN", "GW", "KE", "LS", "LR", "LY", "MG",
        "MW", "ML", "MR", "MU", "MA", "MZ", "NA", "NE", "NG", "RW",
        "ST", "SN", "SC", "SL", "SO", "ZA", "SS", "SD", "TZ", "TG",
        "TN", "UG", "ZM", "ZW", "EH"
    ]);


// ======================================================
// ACTIVAR / DESACTIVAR WMS IGRAC
// ======================================================

function alternarCapaIGRAC() {

    const mapaActual =
        window.appMap;


    if (!mapaActual) {
        return;
    }


    const boton =
        document.getElementById(
            "toggleIGRAC"
        );


    const estado =
        document.getElementById(
            "estadoIGRAC"
        );


    if (
        capaIGRACActiva &&
        capaIGRACPozos
    ) {

        mapaActual.removeLayer(
            capaIGRACPozos
        );

        capaIGRACActiva =
            false;

        fuenteIGRAC
            ?.classList
            .remove("active");

        if (boton) {
            boton.textContent =
                "Mostrar capa de pozos IGRAC";
        }

        if (estado) {
            estado.textContent =
                "Capa IGRAC desactivada.";
        }

        actualizarLeyendaIGRAC(
            "inactive"
        );

        return;
    }


    if (!capaIGRACPozos) {

        capaIGRACPozos =
            L.tileLayer.wms(
                "https://ggis.un-igrac.org/geoserver/ows",
                {
                    layers:
                        "groundwater:Groundwater_Well",

                    format:
                        "image/png",

                    transparent:
                        true,

                    version:
                        "1.1.1",

                    opacity:
                        0.85,

                    attribution:
                        "IGRAC GGIS"
                }
            );


        capaIGRACPozos.on(
            "tileerror",
            function () {

                if (estado) {
                    estado.textContent =
                        "La capa IGRAC no ha respondido correctamente. Puede ser una interrupción temporal.";
                }

                actualizarLeyendaIGRAC(
                    "error"
                );
            }
        );
    }


    capaIGRACPozos.addTo(
        mapaActual
    );


    capaIGRACActiva =
        true;


    fuenteIGRAC
        ?.classList
        .add("active");


    if (boton) {
        boton.textContent =
            "Ocultar capa IGRAC";
    }


    if (estado) {
        estado.textContent =
            "Capa IGRAC activa. Si no aparecen símbolos visibles, no significa que no exista agua subterránea ni que no haya datos en otras fuentes.";
    }

    actualizarLeyendaIGRAC(
        "active"
    );
}


// ======================================================
// CARGAR MÓDULO
// ======================================================

function cargarModuloHidrogeologiaInterno() {

    actualizarLeyendaIGRAC(
        capaIGRACActiva
            ? "active"
            : "inactive"
    );

    const latitud =
        window.appState
            ?.latitud;


    const longitud =
        window.appState
            ?.longitud;


    const codigoPais =
        window.appState
            ?.countryCode;


    if (
        latitud === null ||
        longitud === null ||
        latitud === undefined ||
        longitud === undefined
    ) {

        panelHidrogeologia.innerHTML = `
            <article class="panel">
                <div class="hydro-loading">
                    <span>🪨</span>
                    <h3>Primero analiza un territorio</h3>
                    <p>
                        La hidrogeología necesita
                        las coordenadas del lugar seleccionado.
                    </p>
                </div>
            </article>
        `;

        return;
    }


    const esAfrica =
        PAISES_AFRICA.has(
            codigoPais
        );


    const bloqueAfrica =
        esAfrica
        ? `
            <article class="panel">

                <div class="panel-header">
                    <div>
                        <span class="panel-kicker">
                            ÁFRICA · BGS
                        </span>

                        <h3>
                            Mapas cuantitativos de aguas subterráneas
                        </h3>
                    </div>

                    <span class="source-badge">
                        Escala regional
                    </span>
                </div>


                <div class="hydro-grid">

                    <div class="hydro-card">
                        <div class="hydro-card-icon">📏</div>
                        <h4>Profundidad del agua subterránea</h4>
                        <p>
                            BGS dispone de una cuadrícula continental
                            de profundidad estimada al agua subterránea.
                        </p>
                        <span class="hydro-status regional">
                            Resolución aproximada 5 km
                        </span>
                    </div>


                    <div class="hydro-card">
                        <div class="hydro-card-icon">🚰</div>
                        <h4>Productividad del acuífero</h4>
                        <p>
                            Estimación regional del potencial de
                            rendimiento de perforaciones correctamente situadas.
                        </p>
                        <span class="hydro-status regional">
                            Dato regional, no parcela
                        </span>
                    </div>


                    <div class="hydro-card">
                        <div class="hydro-card-icon">🫙</div>
                        <h4>Almacenamiento subterráneo</h4>
                        <p>
                            Mapa continental de almacenamiento estimado
                            de agua subterránea.
                        </p>
                        <span class="hydro-status regional">
                            Disponible como dataset BGS
                        </span>
                    </div>


                    <div class="hydro-card">
                        <div class="hydro-card-icon">🗺️</div>
                        <h4>Atlas hidrogeológico por país</h4>
                        <p>
                            El Africa Groundwater Atlas resume acuíferos,
                            geología, productividad y gestión del agua
                            subterránea por país.
                        </p>
                        <span class="hydro-status available">
                            Fuente de referencia disponible
                        </span>
                    </div>

                </div>


                <div class="hydro-actions">
                    <a
                        class="hydro-link"
                        href="https://www.bgs.ac.uk/geology-projects/africa-groundwater-atlas/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Abrir Africa Groundwater Atlas
                    </a>
                </div>

            </article>
        `
        : `
            <article class="panel">
                <div class="panel-header">
                    <div>
                        <span class="panel-kicker">
                            COBERTURA REGIONAL
                        </span>
                        <h3>BGS Africa Groundwater Atlas</h3>
                    </div>
                </div>

                <p class="empty-message">
                    Los mapas cuantitativos BGS que hemos identificado
                    para profundidad, productividad y almacenamiento
                    cubren África. Este territorio está fuera de esa cobertura.
                </p>
            </article>
        `;


    panelHidrogeologia.innerHTML = `

        <div class="hydro-layout">

            <article class="panel">

                <div class="panel-header">
                    <div>
                        <span class="panel-kicker">
                            IGRAC · GGIS
                        </span>

                        <h3>
                            Pozos y monitorización de aguas subterráneas
                        </h3>
                    </div>

                    <span class="source-badge">
                        Cobertura mundial
                    </span>
                </div>


                <div class="hydro-grid">

                    <div class="hydro-card">
                        <div class="hydro-card-icon">📍</div>

                        <h4>Capa mundial de pozos</h4>

                        <p>
                            Podemos superponer en el mapa la capa pública
                            de pozos del Global Groundwater Information System.
                            La presencia o ausencia de puntos depende de los
                            datos aportados al portal.
                        </p>

                        <span class="hydro-status available">
                            WMS público disponible
                        </span>

                        <div class="hydro-actions">
                            <button
                                id="toggleIGRAC"
                                class="hydro-button primary"
                                type="button"
                            >
                                ${
                                    capaIGRACActiva
                                    ? "Ocultar capa IGRAC"
                                    : "Mostrar capa de pozos IGRAC"
                                }
                            </button>
                        </div>

                        <p
                            id="estadoIGRAC"
                            style="margin-top:8px;"
                        >
                            ${
                                capaIGRACActiva
                                ? "Capa IGRAC activa. Si no aparecen símbolos visibles, no significa ausencia de agua subterránea."
                                : "Capa IGRAC todavía no activada."
                            }
                        </p>
                    </div>


                    <div class="hydro-card">
                        <div class="hydro-card-icon">📈</div>

                        <h4>Mediciones de nivel del agua</h4>

                        <p>
                            GGIS dispone de un servicio SOS para datos de
                            monitorización. No lo conectamos automáticamente
                            porque las consultas detalladas requieren una clave
                            proporcionada por IGRAC a instituciones colaboradoras.
                        </p>

                        <span class="hydro-status regional">
                            Acceso detallado pendiente
                        </span>
                    </div>

                </div>


                <div class="hydro-actions">
                    <a
                        class="hydro-link"
                        href="https://ggis.un-igrac.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Abrir GGIS oficial
                    </a>
                </div>

            </article>


            ${bloqueAfrica}


            <article class="panel">

                <div class="panel-header">
                    <div>
                        <span class="panel-kicker">
                            CALIDAD DEL DATO
                        </span>
                        <h3>Qué significa esta información</h3>
                    </div>
                </div>


                <div class="hydro-source-list">

                    <div class="hydro-source-item">
                        <strong>🟢 IGRAC WMS</strong>
                        <span>
                            Sirve para visualizar capas georreferenciadas
                            y consultar información básica de entidades.
                        </span>
                    </div>


                    <div class="hydro-source-item">
                        <strong>🟡 BGS África</strong>
                        <span>
                            Sus mapas cuantitativos son adecuados para
                            contexto continental o regional, no para decidir
                            una perforación en una parcela concreta.
                        </span>
                    </div>


                    <div class="hydro-source-item">
                        <strong>🔴 Profundidad local exacta</strong>
                        <span>
                            No puede inferirse de forma segura a partir
                            de estos datos regionales y cartográficos.
                        </span>
                    </div>

                </div>

            </article>


            <div class="hydro-note">
                <strong>⚠️ Límite técnico importante</strong>
                <p>
                    Esta capa ayuda a investigar el contexto hidrogeológico
                    y a localizar información existente. No autoriza a concluir
                    dónde perforar, a qué profundidad exacta aparecerá agua,
                    qué caudal se obtendrá ni si el agua será potable.
                </p>
            </div>

        </div>
    `;


    document
        .getElementById(
            "toggleIGRAC"
        )
        ?.addEventListener(
            "click",
            alternarCapaIGRAC
        );
}



function cargarModuloHidrogeologia() {
    try {
        cargarModuloHidrogeologiaInterno();
    }
    catch (error) {
        window.RGS
            ?.renderModuleError
            ?.(
                panelHidrogeologia,
                "Hidrogeología",
                error,
                cargarModuloHidrogeologia
            );
    }
}

window.cargarModuloHidrogeologia =
    cargarModuloHidrogeologia;


botonPestanaHidrogeologia
    ?.addEventListener(
        "click",
        cargarModuloHidrogeologia
    );
