// ======================================================
// V6.5 · MEDIATECA AUDIOVISUAL
// Narración larga + música generativa + banco visual
// ======================================================


// ======================================================
// GUIÓN
// ======================================================

const MEDIA_SCRIPTS = {

    intro: {
        title:
            "Bienvenidos a una realidad diferente",

        duration:
            "4–5 min",

        paragraphs: [

            "Mira la ciudad que conocemos. Miles de personas moviéndose al mismo tiempo, motores, prisas, edificios, anuncios y ruido. Hemos aprendido a llamar normal a una forma de vida que consume enormes cantidades de energía, materiales, tiempo y atención. Muchas de nuestras ciudades funcionan, pero no siempre están diseñadas para maximizar salud, cooperación, acceso, resiliencia o bienestar.",

            "Ahora imagina que atravesamos una barrera de árboles. No entramos en una fantasía perfecta. Entramos en una pregunta: ¿qué ocurriría si utilizáramos el conocimiento disponible para diseñar nuestras comunidades de otra manera? Espacios donde la naturaleza no sea una decoración secundaria, sino parte de la infraestructura; donde producir alimentos, ahorrar agua, compartir capacidades, moverse y aprender resulte más sencillo.",

            "Una realidad diferente no puede elegirse si nadie sabe que existe. Por eso hacen falta imágenes, proyectos, demostraciones y datos. No basta con decir que otro mundo es posible. Hay que enseñar qué soluciones existen, dónde se han probado, cuánto cuestan, qué recursos necesitan, qué problemas resuelven y qué todavía no sabemos.",

            "La tecnología puede ayudarnos, pero no es el objetivo final. Inteligencia artificial, automatización, sensores, mapas y sistemas de datos pueden reducir desperdicios y mejorar decisiones. Su valor depende de para qué se utilicen, quién pueda acceder a ellos y qué necesidades humanas y ecológicas pretendan resolver.",

            "También necesitamos comunidades capaces de reconocerse. Personas que sepan quién puede enseñar, reparar, cultivar, investigar, organizar, traducir, cuidar o diseñar. Una red donde el conocimiento no desaparezca cuando termina un proyecto, sino que vuelva al conjunto para que otro territorio pueda aprender.",

            "Esta plataforma intenta construir una pequeña parte de esa infraestructura: territorio, necesidad, datos, soluciones, organizaciones, formación, financiación, proyectos y resultados. No pretende demostrar que ya existe una sociedad ideal. Pretende ayudar a encontrar información, comparar posibilidades, hacer visibles experiencias y convertir una intención en un siguiente paso concreto.",

            "Bienvenidos a una realidad diferente. No porque ya esté terminada, sino porque empieza a ser visible. Una realidad donde conocimiento y recursos pueden utilizarse para comprender, crear y proteger la vida de la que todos dependemos. Un nuevo paradigma no aparece de un día para otro. Se construye cuando las alternativas pueden verse, comprobarse, mejorarse y compartirse."
        ]
    },


    venus: {
        title:
            "The Venus Project como referencia comparativa",

        duration:
            "3–4 min",

        paragraphs: [

            "Cuando hablamos de imaginar ciudades y sistemas sociales diferentes, The Venus Project es una referencia inevitable para muchas personas. Su propuesta de economía basada en recursos plantea que ciencia, tecnología y gestión de recursos pueden organizarse de forma distinta a los mecanismos económicos actuales.",

            "En su visión urbana aparecen ciudades planificadas de forma integral, con diseños circulares, zonas verdes, transporte eficiente, automatización y una relación más consciente entre infraestructura y entorno. Esa imaginación visual tiene una fuerza enorme: permite ver algo que todavía no forma parte de nuestra experiencia cotidiana.",

            "Nuestra plataforma puede compararse con esa dirección en algunos puntos: uso del conocimiento para resolver necesidades, interés por los recursos, tecnología al servicio de la calidad de vida, visión sistémica y necesidad de demostrar alternativas comprensibles.",

            "Pero no debemos confundir comparación con identidad. Red Global de Soluciones no se presenta como parte de The Venus Project ni como representante de su organización. Tampoco parte necesariamente de construir una ciudad totalmente nueva. Nuestro enfoque actual empieza por territorios existentes, problemas concretos, organizaciones reales y pequeños proyectos que puedan aprender unos de otros.",

            "La comparación puede ser útil precisamente por las diferencias. The Venus Project ayuda a visualizar una transformación sistémica a gran escala. Nuestra red puede investigar cómo avanzar desde la realidad presente: qué podemos hacer hoy, qué datos necesitamos, qué proyectos existen, qué soluciones pueden probarse y cómo compartimos los resultados.",

            "La pregunta no tiene por qué ser quién posee la visión correcta. La pregunta puede ser qué aprendemos de cada propuesta y qué podemos demostrar de manera responsable. Una transición seria necesita imaginación, pero también trazabilidad, pruebas, capacidad de corregirse y respeto por lo que todavía no conocemos."
        ]
    },


    projects: {
        title:
            "Proyectos conectados: aprender haciendo",

        duration:
            "3–4 min",

        paragraphs: [

            "Una red global no se vuelve útil porque tenga miles de miembros. Se vuelve útil cuando una experiencia en un lugar puede ayudar a alguien que está intentando resolver un problema parecido en otro.",

            "Un proyecto agrícola en Benín puede aportar datos sobre agua, riego, producción, demanda local, organización y costes. Una acción pública en Barcelona puede enseñar qué formatos consiguen que desconocidos se detengan, conversen y vuelvan. Un territorio insular puede obligarnos a pensar de otra manera sobre energía, logística, agua, alimentos y resiliencia.",

            "No todos los proyectos tienen que ser iguales. Tampoco necesitan pertenecer a una única organización. Lo importante es que puedan describirse con claridad: qué problema existe, qué se intenta hacer, quién participa, qué recursos hacen falta, qué resultados aparecen y qué errores se han cometido.",

            "Si esa información vuelve a la red, cada proyecto deja de ser solamente local. Se convierte en conocimiento compartido. Los éxitos pueden inspirar, pero los fracasos también pueden ahorrar tiempo y dinero a otros.",

            "Queremos pasar de una colección de enlaces a una infraestructura de aprendizaje. Una necesidad debería poder encontrar datos; los datos, soluciones; las soluciones, organizaciones; las organizaciones, formación y financiación; y los resultados deberían volver a alimentar el sistema.",

            "La transición se vuelve más concreta cuando puede verse en el territorio. Un jardín, una reparación compartida, un sistema de riego, una charla, un mapa de recursos, una instalación energética, un proyecto educativo o una nueva forma de cooperación pueden convertirse en pequeñas demostraciones de otra manera de organizar capacidades y recursos."
        ]
    }

};


let currentMediaScript =
    "intro";


const mediaScriptContent =
    document.getElementById(
        "mediaScriptContent"
    );


function renderMediaScript() {
    if (!mediaScriptContent) {
        return;
    }

    const script =
        MEDIA_SCRIPTS[
            currentMediaScript
        ];

    mediaScriptContent.innerHTML =
        `
            <div class="media-script-meta">
                <strong>${script.title}</strong>
                <span>${script.duration}</span>
            </div>

            ${script.paragraphs
                .map(
                    (
                        paragraph,
                        index
                    ) => `
                        <p>
                            <span>${String(index + 1).padStart(2, "0")}</span>
                            ${paragraph}
                        </p>
                    `
                )
                .join("")}
        `;
}


document
    .querySelectorAll(
        "[data-media-script]"
    )
    .forEach(
        button => {
            button.addEventListener(
                "click",
                () => {
                    currentMediaScript =
                        button.dataset
                            .mediaScript;

                    document
                        .querySelectorAll(
                            "[data-media-script]"
                        )
                        .forEach(
                            other => {
                                other.classList.toggle(
                                    "active",
                                    other === button
                                );
                            }
                        );

                    window.speechSynthesis
                        ?.cancel();

                    renderMediaScript();
                }
            );
        }
    );


// ======================================================
// NARRACIÓN · V7.2 MP3 FIJA
// ======================================================

const MAIN_NARRATION = {
    file:
        "audio/locucion-principal-george-es.mp3",

    label:
        "George · Warm, Captivating Storyteller",

    language:
        "es-ES"
};


const mainNarrationAudio =
    new Audio(
        MAIN_NARRATION.file
    );


mainNarrationAudio.preload =
    "metadata";

mainNarrationAudio.crossOrigin =
    "anonymous";

mainNarrationAudio.playsInline =
    true;


let mainNarrationPlaying =
    false;


function updateMainNarrationUI(
    customStatus = null
) {
    const speakButton =
        document.getElementById(
            "mediaSpeakCurrent"
        );

    const longButton =
        document.getElementById(
            "mediaNarrateLong"
        );

    const stopButton =
        document.getElementById(
            "mediaStopNarration"
        );


    if (speakButton) {
        speakButton.textContent =
            mainNarrationPlaying
                ?
                "⏸ Pausar locución"
                :
                "▶ Escuchar locución";
    }


    if (longButton) {
        longButton.textContent =
            mainNarrationPlaying
                ?
                "⏸ Pausar presentación"
                :
                "▶ Escuchar presentación";
    }


    if (stopButton) {
        stopButton.disabled =
            !mainNarrationPlaying
            &&
            mainNarrationAudio.currentTime ===
                0;
    }


    const status =
        document.getElementById(
            "mediaNarrationStatus"
        );


    if (status) {
        status.textContent =
            customStatus
            ||
            (
                mainNarrationPlaying
                    ?
                    "George · locución en reproducción"
                    :
                    "George · locución preparada"
            );
    }
}


function startMainNarration(
    restart = false
) {
    /*
      La reproducción se llama DIRECTAMENTE desde el clic del usuario.
      Así evitamos perder el gesto de usuario y los bloqueos de audio.
    */
    window.speechSynthesis
        ?.cancel();


    if (
        restart
        ||
        (
            Number.isFinite(
                mainNarrationAudio.duration
            )
            &&
            mainNarrationAudio.currentTime >=
                mainNarrationAudio.duration -
                .35
        )
    ) {
        mainNarrationAudio.currentTime =
            0;
    }


    /*
      Si la música está parada, la arrancamos desde el mismo clic.
      Si está activa, solo aplicamos duck.
    */
    if (
        !soundtrackPlaying
    ) {
        startSoundtrack();
    }


    duckSoundtrack(
        true
    );


    const playPromise =
        mainNarrationAudio.play();


    if (
        playPromise
        &&
        typeof playPromise.then ===
            "function"
    ) {
        playPromise
            .then(
                () => {
                    mainNarrationPlaying =
                        true;

                    updateMainNarrationUI();
                }
            )
            .catch(
                error => {
                    mainNarrationPlaying =
                        false;

                    duckSoundtrack(
                        false
                    );

                    console.warn(
                        "RGS · locución MP3:",
                        error
                    );

                    window.RGS
                        ?.showToast
                        ?.(
                            "El navegador bloqueó la locución. Pulsa de nuevo el botón.",
                            "warning",
                            4200
                        );

                    updateMainNarrationUI(
                        "Pulsa de nuevo para iniciar"
                    );
                }
            );
    }
}


function pauseMainNarration() {
    mainNarrationAudio.pause();

    mainNarrationPlaying =
        false;

    duckSoundtrack(
        false
    );

    updateMainNarrationUI();
}


function stopMainNarration() {
    mainNarrationAudio.pause();

    mainNarrationAudio.currentTime =
        0;

    mainNarrationPlaying =
        false;

    duckSoundtrack(
        false
    );

    updateMainNarrationUI(
        "George · locución detenida"
    );
}


function toggleMainNarration(
    restart = false
) {
    if (
        mainNarrationPlaying
        &&
        !restart
    ) {
        pauseMainNarration();
        return;
    }


    startMainNarration(
        restart
    );
}


mainNarrationAudio.addEventListener(
    "play",
    () => {
        mainNarrationPlaying =
            true;

        duckSoundtrack(
            true
        );

        updateMainNarrationUI();
    }
);


mainNarrationAudio.addEventListener(
    "pause",
    () => {
        if (
            mainNarrationAudio.ended
        ) {
            return;
        }

        mainNarrationPlaying =
            false;

        duckSoundtrack(
            false
        );

        updateMainNarrationUI();
    }
);


mainNarrationAudio.addEventListener(
    "ended",
    () => {
        mainNarrationPlaying =
            false;

        duckSoundtrack(
            false
        );

        updateMainNarrationUI(
            "Locución terminada"
        );
    }
);


mainNarrationAudio.addEventListener(
    "error",
    () => {
        mainNarrationPlaying =
            false;

        duckSoundtrack(
            false
        );

        window.RGS
            ?.showToast
            ?.(
                "No se pudo cargar la locución MP3.",
                "error",
                5000
            );

        updateMainNarrationUI(
            "Error al cargar la locución"
        );
    }
);


/*
  IMPORTANTE:
  cada botón tiene UN SOLO listener.
  En V7.1 podían quedar listeners duplicados o referencias rotas.
*/
document
    .getElementById(
        "mediaSpeakCurrent"
    )
    ?.addEventListener(
        "click",
        () => {
            toggleMainNarration(
                false
            );
        }
    );


document
    .getElementById(
        "mediaNarrateLong"
    )
    ?.addEventListener(
        "click",
        () => {
            currentMediaScript =
                "intro";

            document
                .querySelectorAll(
                    "[data-media-script]"
                )
                .forEach(
                    button => {
                        button.classList.toggle(
                            "active",
                            button.dataset
                                .mediaScript ===
                                "intro"
                        );
                    }
                );

            renderMediaScript();

            toggleMainNarration(
                false
            );
        }
    );


document
    .getElementById(
        "mediaStopNarration"
    )
    ?.addEventListener(
        "click",
        () => {
            stopMainNarration();
        }
    );


function speakCurrentMediaScript() {
    /*
      Alias de compatibilidad:
      todos los módulos antiguos que llamen esta función
      reproducen ahora el MP3 fijo.
    */
    toggleMainNarration(
        false
    );
}


updateMainNarrationUI();


// ======================================================
// V6.8 · MÚSICA REAL + AUTO-DUCK DE LOCUCIÓN
// ======================================================

const REAL_SOUNDTRACKS = {

    sutton: {
        id:
            "sutton",

        title:
            "Cinematic Dramatic Journey",

        shortTitle:
            "Cinematic Journey",

        artist:
            "Sutton",

        file:
            "audio/sutton-cinematic-journey.mp3",

        duration:
            "5:04"
    },


    tunetank: {
        id:
            "tunetank",

        title:
            "Inspiring Cinematic Music",

        shortTitle:
            "Inspiring Cinematic",

        artist:
            "TuneTank",

        file:
            "audio/tunetank-inspiring-cinematic.mp3",

        duration:
            "2:12"
    }

};


let soundtrackPreset =
    "sutton";

let soundtrackPlaying =
    false;

let soundtrackDucked =
    false;

let soundtrackFadeFrame =
    null;


const backgroundAudio =
    new Audio();


backgroundAudio.loop =
    true;

backgroundAudio.preload =
    "metadata";

backgroundAudio.crossOrigin =
    "anonymous";


function soundtrackNormalVolume() {
    return Number(
        document
            .getElementById(
                "soundtrackVolume"
            )
            ?.value
        ||
        .14
    );
}


function soundtrackDuckFactor() {
    return Number(
        document
            .getElementById(
                "soundtrackDuckLevel"
            )
            ?.value
        ||
        .30
    );
}


function soundtrackTargetVolume() {
    const normal =
        soundtrackNormalVolume();

    return soundtrackDucked
        ?
        normal *
        soundtrackDuckFactor()
        :
        normal;
}


function fadeBackgroundMusicTo(
    target,
    duration = 650
) {
    if (
        soundtrackFadeFrame
    ) {
        cancelAnimationFrame(
            soundtrackFadeFrame
        );
    }


    const from =
        Number(
            backgroundAudio.volume
            ||
            0
        );

    const safeTarget =
        Math.max(
            0,
            Math.min(
                1,
                Number(target)
            )
        );

    const started =
        performance.now();


    const step =
        now => {
            const progress =
                Math.min(
                    1,
                    (
                        now -
                        started
                    )
                    /
                    duration
                );

            const eased =
                progress <
                .5
                    ?
                    2 *
                    progress *
                    progress
                    :
                    1 -
                    Math.pow(
                        -2 *
                        progress +
                        2,
                        2
                    )
                    /
                    2;


            backgroundAudio.volume =
                from +
                (
                    safeTarget -
                    from
                )
                *
                eased;


            if (
                progress <
                1
            ) {
                soundtrackFadeFrame =
                    requestAnimationFrame(
                        step
                    );
            }
        };


    soundtrackFadeFrame =
        requestAnimationFrame(
            step
        );
}


function selectedTrack() {
    return REAL_SOUNDTRACKS[
        soundtrackPreset
    ];
}


function setTrackSource(
    preservePlaying = true
) {
    const track =
        selectedTrack();

    const wasPlaying =
        soundtrackPlaying;


    if (
        !backgroundAudio.src
            .endsWith(
                track.file
            )
    ) {
        backgroundAudio.src =
            track.file;

        backgroundAudio.load();
    }


    if (
        preservePlaying &&
        wasPlaying
    ) {
        backgroundAudio.volume =
            soundtrackTargetVolume();

        backgroundAudio.play()
            .catch(
                () => {
                    soundtrackPlaying =
                        false;

                    updateSoundtrackUI(
                        "Pulsa ▶ para iniciar"
                    );
                }
            );
    }


    updateSoundtrackUI();
}


function updateSoundtrackUI(
    customStatus = null
) {
    const button =
        document.getElementById(
            "soundtrackToggle"
        );

    const dockButton =
        document.getElementById(
            "musicDockToggle"
        );

    const status =
        document.getElementById(
            "soundtrackStatus"
        );

    const dockTitle =
        document.getElementById(
            "musicDockTitle"
        );

    const dockState =
        document.getElementById(
            "musicDockState"
        );


    const track =
        selectedTrack();


    if (button) {
        button.textContent =
            soundtrackPlaying
                ?
                "■ Música"
                :
                "▶ Música";
    }


    if (dockButton) {
        dockButton.textContent =
            soundtrackPlaying
                ?
                "■"
                :
                "▶";
    }


    if (status) {
        status.textContent =
            customStatus
            ||
            (
                soundtrackPlaying
                    ?
                    (
                        soundtrackDucked
                            ?
                            `Reproduciendo · voz prioritaria · ${track.artist}`
                            :
                            `Reproduciendo · ${track.artist}`
                    )
                    :
                    `Detenida · ${track.artist}`
            );
    }


    if (dockTitle) {
        dockTitle.textContent =
            track.shortTitle;
    }


    if (dockState) {
        dockState.textContent =
            soundtrackPlaying
                ?
                (
                    soundtrackDucked
                        ?
                        "Voz prioritaria · música reducida"
                        :
                        `${track.artist} · ${track.duration}`
                )
                :
                "Música de fondo";
    }


    document
        .querySelectorAll(
            "[data-real-track]"
        )
        .forEach(
            buttonTrack => {
                buttonTrack.classList
                    .toggle(
                        "active",
                        buttonTrack.dataset
                            .realTrack ===
                        soundtrackPreset
                    );
            }
        );
}


function startSoundtrack() {
    const track =
        selectedTrack();


    if (
        !backgroundAudio.src
            .endsWith(
                track.file
            )
    ) {
        backgroundAudio.src =
            track.file;

        backgroundAudio.load();
    }


    soundtrackPlaying =
        true;


    backgroundAudio.volume =
        0;


    backgroundAudio.play()
        .then(
            () => {
                fadeBackgroundMusicTo(
                    soundtrackTargetVolume(),
                    900
                );

                updateSoundtrackUI();
            }
        )
        .catch(
            () => {
                soundtrackPlaying =
                    false;

                updateSoundtrackUI(
                    "El navegador requiere pulsar ▶"
                );
            }
        );
}


function stopSoundtrack() {
    if (
        !soundtrackPlaying
    ) {
        return;
    }


    fadeBackgroundMusicTo(
        0,
        450
    );


    setTimeout(
        () => {
            backgroundAudio.pause();

            soundtrackPlaying =
                false;

            updateSoundtrackUI();
        },
        470
    );
}


function duckSoundtrack(
    enabled
) {
    soundtrackDucked =
        Boolean(
            enabled
        );


    if (
        soundtrackPlaying
    ) {
        fadeBackgroundMusicTo(
            soundtrackTargetVolume(),
            enabled
                ?
                520
                :
                920
        );
    }


    updateSoundtrackUI();
}


function selectRealTrack(
    trackId,
    options = {}
) {
    if (
        !REAL_SOUNDTRACKS[
            trackId
        ]
    ) {
        return;
    }


    const keepPlaying =
        soundtrackPlaying;


    soundtrackPreset =
        trackId;


    setTrackSource(
        false
    );


    if (
        keepPlaying
        &&
        options.play !==
            false
    ) {
        startSoundtrack();
    }
    else {
        updateSoundtrackUI();
    }


    localStorage.setItem(
        "rgs-background-track",
        soundtrackPreset
    );
}


document
    .querySelectorAll(
        "[data-real-track]"
    )
    .forEach(
        button => {
            button.addEventListener(
                "click",
                () => {
                    selectRealTrack(
                        button.dataset
                            .realTrack
                    );
                }
            );
        }
    );


document
    .getElementById(
        "soundtrackToggle"
    )
    ?.addEventListener(
        "click",
        () => {
            if (
                soundtrackPlaying
            ) {
                stopSoundtrack();
            }
            else {
                startSoundtrack();
            }
        }
    );


document
    .getElementById(
        "musicDockToggle"
    )
    ?.addEventListener(
        "click",
        () => {
            if (
                soundtrackPlaying
            ) {
                stopSoundtrack();
            }
            else {
                startSoundtrack();
            }
        }
    );


document
    .getElementById(
        "musicDockNext"
    )
    ?.addEventListener(
        "click",
        () => {
            const next =
                soundtrackPreset ===
                    "sutton"
                    ?
                    "tunetank"
                    :
                    "sutton";

            selectRealTrack(
                next
            );
        }
    );


document
    .getElementById(
        "soundtrackVolume"
    )
    ?.addEventListener(
        "input",
        () => {
            if (
                soundtrackPlaying
            ) {
                fadeBackgroundMusicTo(
                    soundtrackTargetVolume(),
                    180
                );
            }
        }
    );


document
    .getElementById(
        "soundtrackDuckLevel"
    )
    ?.addEventListener(
        "input",
        () => {
            if (
                soundtrackPlaying
                &&
                soundtrackDucked
            ) {
                fadeBackgroundMusicTo(
                    soundtrackTargetVolume(),
                    180
                );
            }
        }
    );


backgroundAudio.addEventListener(
    "error",
    () => {
        soundtrackPlaying =
            false;

        updateSoundtrackUI(
            "No se pudo cargar la pista"
        );
    }
);


const savedTrack =
    localStorage.getItem(
        "rgs-background-track"
    );


if (
    savedTrack
    &&
    REAL_SOUNDTRACKS[
        savedTrack
    ]
) {
    soundtrackPreset =
        savedTrack;
}


setTrackSource(
    false
);


updateSoundtrackUI();


// ======================================================
// BANCO VISUAL LIBRE / FUENTES
// ======================================================

const FREE_VIDEO_SOURCES = [

    {
        icono: "🏙️",
        title: "Ciudad, tráfico y densidad",
        purpose:
            "Apertura: estrés urbano, tráfico, movimiento y saturación.",
        source:
            "Pexels",
        license:
            "Pexels License",
        status:
            "Recurso libre según licencia de la plataforma",
        url:
            "https://www.pexels.com/search/videos/city%20traffic/"
    },

    {
        icono: "🚁",
        title: "Dron sobre ciudad",
        purpose:
            "Transición visual desde una ciudad existente hacia otro entorno.",
        source:
            "Pexels",
        license:
            "Pexels License",
        status:
            "Recurso libre según licencia de la plataforma",
        url:
            "https://www.pexels.com/search/videos/drone%20city/"
    },

    {
        icono: "🌿",
        title: "Jardines y naturaleza urbana",
        purpose:
            "Escenas de regeneración, parques, huertos y diseño verde.",
        source:
            "Pexels",
        license:
            "Pexels License",
        status:
            "Recurso libre según licencia de la plataforma",
        url:
            "https://www.pexels.com/search/videos/urban%20garden/"
    },

    {
        icono: "☀️",
        title: "Energía solar y renovables",
        purpose:
            "Tecnología y energía como infraestructura al servicio de necesidades.",
        source:
            "Pexels",
        license:
            "Pexels License",
        status:
            "Recurso libre según licencia de la plataforma",
        url:
            "https://www.pexels.com/search/videos/solar%20energy/"
    },

    {
        icono: "🤝",
        title: "Comunidad y cooperación",
        purpose:
            "Personas trabajando, compartiendo, aprendiendo y reconociéndose.",
        source:
            "Pexels",
        license:
            "Pexels License",
        status:
            "Recurso libre según licencia de la plataforma",
        url:
            "https://www.pexels.com/search/videos/community/"
    },

    {
        icono: "🌱",
        title: "Agricultura y producción local",
        purpose:
            "Proyectos prácticos: huertos, cultivos, sistemas de producción.",
        source:
            "Pexels",
        license:
            "Pexels License",
        status:
            "Recurso libre según licencia de la plataforma",
        url:
            "https://www.pexels.com/search/videos/sustainable%20agriculture/"
    },

    {
        icono: "🌍",
        title: "Banco alternativo: Pixabay Vídeos",
        purpose:
            "Buscar planos adicionales de naturaleza, ciudades, energía y tecnología.",
        source:
            "Pixabay",
        license:
            "Pixabay Content License",
        status:
            "Comprobar cada recurso y posibles derechos de terceros",
        url:
            "https://pixabay.com/videos/search/sustainable%20city/"
    },

    {
        icono: "◉",
        title: "The Venus Project · vídeo oficial",
        purpose:
            "Referencia para comprender su propia visión y lenguaje visual.",
        source:
            "The Venus Project",
        license:
            "Derechos de reutilización no asumidos",
        status:
            "Enlazar / consultar; no re-subir ni traducir sin permiso verificable",
        url:
            "https://www.thevenusproject.com/multimedia/welcome-to-the-future-clip/"
    }

];


function renderFreeVideos() {
    const grid =
        document.getElementById(
            "freeVideoGrid"
        );

    if (!grid) {
        return;
    }


    grid.innerHTML =
        FREE_VIDEO_SOURCES
            .map(
                item => `
                    <article class="free-video-card tilt-card reveal-on-scroll">

                        <div class="free-video-visual">
                            <span>${item.icono}</span>
                            <i>▶</i>
                        </div>

                        <span class="free-video-source">
                            ${item.source}
                        </span>

                        <h3>
                            ${item.title}
                        </h3>

                        <p>
                            ${item.purpose}
                        </p>

                        <div class="free-video-license">
                            <strong>${item.license}</strong>
                            <span>${item.status}</span>
                        </div>

                        <a
                            href="${item.url}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Explorar fuente ↗
                        </a>

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


// ======================================================
// INTEGRACIÓN CON INTRO CINEMATOGRÁFICO
// ======================================================

document
    .getElementById(
        "mediaOpenCinematic"
    )
    ?.addEventListener(
        "click",
        () => {
            document
                .getElementById(
                    "openCinematicIntro"
                )
                ?.click();
        }
    );


// ======================================================
// CAMBIO DE VISTA
// ======================================================

document.addEventListener(
    "vista:cambiada",
    event => {
        if (
            event.detail?.nombre ===
            "mediateca"
        ) {
            renderMediaScript();
            renderFreeVideos();
        }
    }
);


// ======================================================
// ARRANQUE
// ======================================================

renderMediaScript();
renderFreeVideos();

window.RGSMedia = {
    startSoundtrack,
    stopSoundtrack,
    duckSoundtrack,
    selectRealTrack,
    speakCurrentMediaScript,
    startMainNarration,
    pauseMainNarration,
    stopMainNarration,
    toggleMainNarration,

    get isPlaying() {
        return soundtrackPlaying;
    },

    get isNarrating() {
        return mainNarrationPlaying;
    }
};
