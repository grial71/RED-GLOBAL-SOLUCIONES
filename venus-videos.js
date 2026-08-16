// ======================================================
// V6.10 · VIDEOTECA THE VENUS PROJECT
// YouTube embebido + cambio de idioma + integración música
// ======================================================

const VENUS_VIDEO_LIBRARY = {

    choice: {

        title:
            "The Choice is Ours (2016)",

        description:
            "Documental de The Venus Project sobre comportamiento, estructuras sociales, economía basada en recursos y una posible transición hacia otro modelo.",

        versions: {

            en: {
                videoId:
                    "Yb5ivvcTvRQ",

                source:
                    "The Venus Project · versión oficial en inglés",

                status:
                    "Fuente oficial",

                official:
                    true
            },


            es: {
                videoId:
                    "oGCGJkYSpv8",

                source:
                    "YouTube · versión en español / traducción comunitaria",

                status:
                    "Versión traducida · verificar autoría",

                official:
                    false
            },


            fr: {
                videoId:
                    "2TeGEXfiNss",

                source:
                    "The Venus Project France · versión con subtítulos franceses",

                status:
                    "Versión francesa",

                official:
                    false
            }

        }

    },


    paradise: {

        title:
            "Paradise or Oblivion",

        description:
            "Presentación documental sobre una economía basada en recursos, sostenibilidad, tecnología y alternativas a estructuras socioeconómicas actuales.",

        versions: {

            en: {
                videoId:
                    "KphWsnhZ4Ag",

                source:
                    "The Venus Project · versión oficial en inglés",

                status:
                    "Fuente oficial",

                official:
                    true
            },


            es: {
                videoId:
                    "aoeF4OWWPq0",

                source:
                    "YouTube · versión en español / subtitulada",

                status:
                    "Versión traducida · verificar autoría",

                official:
                    false
            },


            fr: {
                videoId:
                    "VL091t5xvHs",

                source:
                    "The Venus Project France · versión francesa",

                status:
                    "Versión francesa",

                official:
                    false
            }

        }

    }

};


let venusDocumentary =
    "choice";

let venusLanguage =
    "en";

let venusPlayer =
    null;

let youtubeApiReady =
    false;

let soundtrackWasPlaying =
    false;


function getVenusCurrentData() {
    const documentary =
        VENUS_VIDEO_LIBRARY[
            venusDocumentary
        ];

    const version =
        documentary
            .versions[
                venusLanguage
            ]
        ||
        documentary
            .versions.en;

    return {
        documentary,
        version
    };
}


function updateVenusMeta() {
    const {
        documentary,
        version
    } =
        getVenusCurrentData();


    const title =
        document.getElementById(
            "venusVideoTitle"
        );

    const source =
        document.getElementById(
            "venusVideoSource"
        );

    const status =
        document.getElementById(
            "venusVideoStatus"
        );

    const infoText =
        document.getElementById(
            "venusInfoText"
        );

    const youtubeLink =
        document.getElementById(
            "venusVideoOpenYoutube"
        );


    if (title) {
        title.textContent =
            documentary.title;
    }


    if (source) {
        source.textContent =
            version.source;
    }


    if (status) {
        status.textContent =
            version.status;

        status.classList.toggle(
            "official",
            Boolean(
                version.official
            )
        );

        status.classList.toggle(
            "translated",
            !version.official
        );
    }


    if (infoText) {
        infoText.textContent =
            documentary.description;
    }


    if (youtubeLink) {
        youtubeLink.href =
            `https://www.youtube.com/watch?v=${version.videoId}`;
    }


    document
        .querySelectorAll(
            "[data-venus-documentary]"
        )
        .forEach(
            button => {
                button.classList.toggle(
                    "active",
                    button.dataset
                        .venusDocumentary ===
                        venusDocumentary
                );
            }
        );


    document
        .querySelectorAll(
            "[data-venus-language]"
        )
        .forEach(
            button => {
                button.classList.toggle(
                    "active",
                    button.dataset
                        .venusLanguage ===
                        venusLanguage
                );
            }
        );
}


function loadVenusVideo() {
    const {
        version
    } =
        getVenusCurrentData();


    updateVenusMeta();


    if (
        !youtubeApiReady
        ||
        !window.YT
        ||
        !YT.Player
    ) {
        return;
    }


    if (!venusPlayer) {
        venusPlayer =
            new YT.Player(
                "venusYoutubePlayer",
                {
                    videoId:
                        version.videoId,

                    width:
                        "100%",

                    height:
                        "100%",

                    playerVars: {
                        rel:
                            0,

                        playsinline:
                            1,

                        modestbranding:
                            1,

                        cc_load_policy:
                            0
                    },

                    events: {

                        onStateChange:
                            onVenusPlayerStateChange,

                        onError:
                            onVenusPlayerError
                    }
                }
            );

        return;
    }


    if (
        typeof venusPlayer
            .loadVideoById ===
        "function"
    ) {
        venusPlayer.loadVideoById(
            version.videoId
        );

        /*
          No forzamos autoplay.
          El visitante decide cuándo empezar.
        */
        venusPlayer.pauseVideo();
    }
}


function onVenusPlayerStateChange(
    event
) {
    if (
        !window.YT
    ) {
        return;
    }


    if (
        event.data ===
        YT.PlayerState.PLAYING
    ) {
        if (
            window.RGSMedia
            &&
            window.RGSMedia
                .isPlaying
        ) {
            soundtrackWasPlaying =
                true;

            window.RGSMedia
                .stopSoundtrack();
        }
        else {
            soundtrackWasPlaying =
                false;
        }
    }


    if (
        event.data ===
            YT.PlayerState.ENDED
        ||
        event.data ===
            YT.PlayerState.PAUSED
    ) {
        if (
            soundtrackWasPlaying
            &&
            window.RGSMedia
        ) {
            setTimeout(
                () => {
                    window.RGSMedia
                        .startSoundtrack();
                },
                550
            );

            soundtrackWasPlaying =
                false;
        }
    }
}


function onVenusPlayerError() {
    const status =
        document.getElementById(
            "venusVideoStatus"
        );

    if (status) {
        status.textContent =
            "YouTube no permite reproducir esta versión aquí";

        status.classList
            .remove(
                "official"
            );

        status.classList
            .add(
                "translated"
            );
    }
}


// ======================================================
// API YOUTUBE
// ======================================================

const previousYouTubeReady =
    window.onYouTubeIframeAPIReady;


window.onYouTubeIframeAPIReady =
    function () {

        youtubeApiReady =
            true;


        if (
            typeof previousYouTubeReady ===
            "function"
        ) {
            previousYouTubeReady();
        }


        loadVenusVideo();
    };


// Por si la API ya estaba cargada.
if (
    window.YT
    &&
    YT.Player
) {
    youtubeApiReady =
        true;

    loadVenusVideo();
}


// ======================================================
// CONTROLES
// ======================================================

document
    .querySelectorAll(
        "[data-venus-documentary]"
    )
    .forEach(
        button => {
            button.addEventListener(
                "click",
                () => {
                    venusDocumentary =
                        button.dataset
                            .venusDocumentary;

                    loadVenusVideo();
                }
            );
        }
    );


document
    .querySelectorAll(
        "[data-venus-language]"
    )
    .forEach(
        button => {
            button.addEventListener(
                "click",
                () => {
                    venusLanguage =
                        button.dataset
                            .venusLanguage;

                    loadVenusVideo();
                }
            );
        }
    );


// ======================================================
// SINCRONIZACIÓN CON IDIOMA DE LA WEB
// ======================================================

document.addEventListener(
    "idioma:actualizado",
    event => {

        const idioma =
            event.detail
                ?.idioma;


        if (
            [
                "es",
                "fr",
                "en"
            ].includes(
                idioma
            )
        ) {
            venusLanguage =
                idioma;

            loadVenusVideo();
        }


        /*
          Para PT no forzamos una versión sin verificar.
          Se conserva el vídeo seleccionado actualmente.
        */
    }
);


// ======================================================
// MEDIATECA
// ======================================================

document.addEventListener(
    "vista:cambiada",
    event => {

        if (
            event.detail
                ?.nombre ===
            "mediateca"
        ) {
            updateVenusMeta();

            setTimeout(
                () => {
                    loadVenusVideo();
                },
                80
            );
        }
        else {
            /*
              Si el usuario abandona la Mediateca,
              pausamos el vídeo de YouTube.
            */
            if (
                venusPlayer
                &&
                typeof venusPlayer
                    .pauseVideo ===
                    "function"
            ) {
                venusPlayer.pauseVideo();
            }
        }
    }
);


updateVenusMeta();

