// ======================================================
// MÓDULO CLIMA - OPEN-METEO
// ======================================================

const botonPestanaClima =
    document.querySelector(
        '[data-tab="clima"]'
    );

const panelClima =
    document.getElementById(
        "tab-clima"
    );

function interpretarCodigoMeteo(codigo) {
    if (codigo === 0) return "☀️ Cielo despejado";
    if ([1, 2, 3].includes(codigo)) return "⛅ Parcialmente nublado";
    if ([45, 48].includes(codigo)) return "🌫️ Niebla";
    if ([51, 53, 55].includes(codigo)) return "🌦️ Llovizna";
    if ([56, 57].includes(codigo)) return "🌧️ Llovizna helada";
    if ([61, 63, 65].includes(codigo)) return "🌧️ Lluvia";
    if ([66, 67].includes(codigo)) return "🌧️ Lluvia helada";
    if ([71, 73, 75, 77].includes(codigo)) return "❄️ Nieve";
    if ([80, 81, 82].includes(codigo)) return "🌦️ Chubascos";
    if ([85, 86].includes(codigo)) return "🌨️ Chubascos de nieve";
    if ([95, 96, 99].includes(codigo)) return "⛈️ Tormenta";
    return "🌍 Condición meteorológica";
}

function formatearDiaClima(fechaISO) {
    const fecha =
        new Date(
            fechaISO +
            "T12:00:00"
        );

    return fecha.toLocaleDateString(
        "es-ES",
        {
            weekday: "short",
            day: "2-digit",
            month: "2-digit"
        }
    );
}

function tarjetaClima(
    icono,
    etiqueta,
    valor,
    detalle = ""
) {
    return `
        <article class="climate-card">
            <div class="climate-card-icon">
                ${icono}
            </div>
            <div>
                <span class="climate-card-label">
                    ${etiqueta}
                </span>
                <strong class="climate-card-value">
                    ${valor}
                </strong>
                ${
                    detalle
                        ? `<small>${detalle}</small>`
                        : ""
                }
            </div>
        </article>
    `;
}

async function cargarModuloClima() {
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
        panelClima.innerHTML = `
            <article class="panel">
                <div class="climate-message">
                    <span>🌍</span>
                    <h3>
                        Primero analiza un territorio
                    </h3>
                    <p>
                        Selecciona un lugar y realiza
                        el análisis territorial antes
                        de consultar el clima.
                    </p>
                </div>
            </article>
        `;
        return;
    }

    panelClima.innerHTML = `
        <article class="panel">
            <div class="climate-message">
                <span>🌦️</span>
                <h3>
                    Consultando información meteorológica
                </h3>
                <p>
                    Conectando con Open-Meteo para
                    ${
                        territorio ||
                        "el territorio seleccionado"
                    }...
                </p>
            </div>
        </article>
    `;

    try {
        const url =
            "https://api.open-meteo.com/v1/forecast" +
            `?latitude=${latitud}` +
            `&longitude=${longitud}` +
            "&current=" +
            [
                "temperature_2m",
                "relative_humidity_2m",
                "apparent_temperature",
                "precipitation",
                "weather_code",
                "wind_speed_10m"
            ].join(",") +
            "&daily=" +
            [
                "temperature_2m_max",
                "temperature_2m_min",
                "precipitation_sum",
                "precipitation_probability_max",
                "et0_fao_evapotranspiration",
                "shortwave_radiation_sum",
                "weather_code"
            ].join(",") +
            "&timezone=auto" +
            "&forecast_days=7";

        const respuesta =
            await fetch(url);

        if (!respuesta.ok) {
            throw new Error(
                "Open-Meteo no respondió correctamente"
            );
        }

        const datos =
            await respuesta.json();

        const actual =
            datos.current;

        const diario =
            datos.daily;

        window.appState.meteorologia =
            datos;

        const condicionesActuales = `
            <div class="climate-current-grid">
                ${tarjetaClima(
                    "🌡️",
                    "Temperatura",
                    `${actual.temperature_2m} °C`,
                    "actual"
                )}
                ${tarjetaClima(
                    "💧",
                    "Humedad",
                    `${actual.relative_humidity_2m} %`,
                    "actual"
                )}
                ${tarjetaClima(
                    "🌡️",
                    "Sensación",
                    `${actual.apparent_temperature} °C`,
                    "temperatura percibida"
                )}
                ${tarjetaClima(
                    "🌧️",
                    "Precipitación",
                    `${actual.precipitation} mm`,
                    "periodo actual"
                )}
                ${tarjetaClima(
                    "💨",
                    "Viento",
                    `${actual.wind_speed_10m} km/h`,
                    "a 10 metros"
                )}
                ${tarjetaClima(
                    "🌤️",
                    "Estado",
                    interpretarCodigoMeteo(
                        actual.weather_code
                    )
                )}
            </div>
        `;

        let filasPronostico = "";

        diario.time.forEach(
            (
                fecha,
                indice
            ) => {
                filasPronostico += `
                    <div class="forecast-row">
                        <div class="forecast-day">
                            <strong>
                                ${
                                    formatearDiaClima(
                                        fecha
                                    )
                                }
                            </strong>
                            <span>
                                ${
                                    interpretarCodigoMeteo(
                                        diario
                                            .weather_code[
                                                indice
                                            ]
                                    )
                                }
                            </span>
                        </div>

                        <div class="forecast-value">
                            <span>Temperatura</span>
                            <strong>
                                ${
                                    diario
                                        .temperature_2m_min[
                                            indice
                                        ]
                                }°
                                /
                                ${
                                    diario
                                        .temperature_2m_max[
                                            indice
                                        ]
                                }°
                            </strong>
                        </div>

                        <div class="forecast-value">
                            <span>Precipitación</span>
                            <strong>
                                ${
                                    diario
                                        .precipitation_sum[
                                            indice
                                        ]
                                } mm
                            </strong>
                        </div>

                        <div class="forecast-value">
                            <span>Prob. lluvia</span>
                            <strong>
                                ${
                                    diario
                                        .precipitation_probability_max[
                                            indice
                                        ]
                                    ?? 0
                                } %
                            </strong>
                        </div>

                        <div class="forecast-value">
                            <span>ET₀</span>
                            <strong>
                                ${
                                    diario
                                        .et0_fao_evapotranspiration[
                                            indice
                                        ]
                                } mm
                            </strong>
                        </div>

                        <div class="forecast-value">
                            <span>Radiación</span>
                            <strong>
                                ${
                                    diario
                                        .shortwave_radiation_sum[
                                            indice
                                        ]
                                } MJ/m²
                            </strong>
                        </div>
                    </div>
                `;
            }
        );

        panelClima.innerHTML = `
            <div class="climate-layout">

                <article class="panel">
                    <div class="panel-header">
                        <div>
                            <span class="panel-kicker">
                                METEOROLOGÍA
                            </span>
                            <h3>
                                Condiciones actuales
                            </h3>
                        </div>
                        <span class="source-badge">
                            Open-Meteo
                        </span>
                    </div>

                    ${condicionesActuales}
                </article>

                <article class="panel">
                    <div class="panel-header">
                        <div>
                            <span class="panel-kicker">
                                7 DÍAS
                            </span>
                            <h3>
                                Previsión territorial
                            </h3>
                        </div>
                        <span class="source-badge">
                            ${
                                datos.timezone
                                ?? "Zona local"
                            }
                        </span>
                    </div>

                    <div class="forecast-table">
                        ${filasPronostico}
                    </div>
                </article>

                <article class="panel climate-note">
                    <strong>
                        ℹ️ Interpretación
                    </strong>

                    <p>
                        Estos datos corresponden a
                        meteorología actual y previsión,
                        no a climatología histórica
                        de largo plazo.
                    </p>

                    <p>
                        ET₀ es una referencia de
                        evapotranspiración utilizada
                        para estimar necesidades de riego.
                        No sustituye un estudio agronómico local.
                    </p>

                    <p>
                        <strong>Fuente:</strong>
                        Open-Meteo
                    </p>
                </article>

            </div>
        `;

    } catch (error) {
        console.error(
            "Clima:",
            error
        );

        panelClima.innerHTML = `
            <article class="panel">
                <div class="climate-message">
                    <span>❌</span>
                    <h3>
                        No se pudieron obtener
                        los datos meteorológicos
                    </h3>
                    <p>
                        Puede tratarse de una
                        interrupción temporal
                        del servicio.
                    </p>
                </div>
            </article>
        `;

        window.RGS
            ?.showToast
            ?.(
                window.RGS
                    ?.i18n
                    ?.t(
                        "errors.moduleTitle",
                        "No se pudo cargar el módulo"
                    )
                +
                ": Clima",
                "error",
                5000
            );
    }
}

window.cargarModuloClima =
    cargarModuloClima;

botonPestanaClima
    ?.addEventListener(
        "click",
        cargarModuloClima
    );
