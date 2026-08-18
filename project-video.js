// ======================================================
// V7.4 · PRESENTACIÓN OFICIAL RED GLOBAL · YOUTUBE
// Vídeo: https://www.youtube.com/watch?v=KLNSvJhX-m4
// ======================================================

const RGS_PROJECT_VIDEO_ID =
    "KLNSvJhX-m4";


let projectYoutubePlayer =
    null;

let projectYoutubeApiReady =
    false;

let projectSoundtrackWasPlaying =
    false;


function updateProjectVideoStatus(
    text,
    state = "ready"
) {
    const status =
        document.getElementById(
            "projectVideoStatus"
        );


    if (!status) {
        return;
    }


    if (text) {
        status.textContent =
            text;
    }


    status.dataset.state =
        state;
}


function pauseProjectVideo() {
    if (
        projectYoutubePlayer
        &&
        typeof projectYoutubePlayer
            .pauseVideo ===
            "function"
    ) {
        projectYoutubePlayer
            .pauseVideo();
    }
}


function stopOtherAudioForProjectVideo() {
    /*
      El vídeo ya contiene su propia presentación sonora.
      Evitamos solaparlo con la música ambiental o George.
    */
    if (
        window.RGSMedia
        &&
        window.RGSMedia
            .isPlaying
    ) {
        projectSoundtrackWasPlaying =
            true;

        window.RGSMedia
            .stopSoundtrack();
    }
    else {
        projectSoundtrackWasPlaying =
            false;
    }


    window.RGSMedia
        ?.pauseMainNarration
        ?.();


    window.RGSVenus
        ?.pause
        ?.();
}


function restoreSoundtrackAfterProjectVideo() {
    if (
        !projectSoundtrackWasPlaying
        ||
        !window.RGSMedia
    ) {
        return;
    }


    setTimeout(
        () => {
            const state =
                projectYoutubePlayer
                    ?.getPlayerState
                    ?.();


            if (
                !window.YT
                ||
                state !==
                    YT.PlayerState.PLAYING
            ) {
                window.RGSMedia
                    .startSoundtrack();
            }
        },
        520
    );


    projectSoundtrackWasPlaying =
        false;
}


function onProjectVideoStateChange(
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
        stopOtherAudioForProjectVideo();

        updateProjectVideoStatus(
            "▶ Presentación en reproducción",
            "playing"
        );
    }


    if (
        event.data ===
        YT.PlayerState.PAUSED
    ) {
        updateProjectVideoStatus(
            "⏸ Presentación en pausa",
            "paused"
        );

        restoreSoundtrackAfterProjectVideo();
    }


    if (
        event.data ===
        YT.PlayerState.ENDED
    ) {
        updateProjectVideoStatus(
            "✓ Presentación finalizada",
            "ended"
        );

        restoreSoundtrackAfterProjectVideo();
    }
}


function onProjectVideoError(
    event
) {
    console.warn(
        "RGS · YouTube · error en vídeo del proyecto:",
        event?.data
    );


    updateProjectVideoStatus(
        "Abrir en YouTube si el reproductor no está disponible",
        "error"
    );


    window.RGS
        ?.showToast
        ?.(
            "YouTube no ha podido reproducir el vídeo dentro de la página. Usa «Abrir en YouTube».",
            "warning",
            5200
        );
}


function createProjectYoutubePlayer() {
    if (
        projectYoutubePlayer
        ||
        !projectYoutubeApiReady
        ||
        !window.YT
        ||
        !YT.Player
        ||
        !document.getElementById(
            "projectYoutubePlayer"
        )
    ) {
        return;
    }


    projectYoutubePlayer =
        new YT.Player(
            "projectYoutubePlayer",
            {
                videoId:
                    RGS_PROJECT_VIDEO_ID,

                width:
                    "100%",

                height:
                    "100%",

                playerVars: {
                    playsinline:
                        1,

                    rel:
                        0
                },

                events: {
                    onStateChange:
                        onProjectVideoStateChange,

                    onError:
                        onProjectVideoError
                }
            }
        );
}


// ======================================================
// CADENA onYouTubeIframeAPIReady SIN ROMPER VENUS
// ======================================================

const previousProjectYouTubeReady =
    window.onYouTubeIframeAPIReady;


window.onYouTubeIframeAPIReady =
    function () {

        if (
            typeof previousProjectYouTubeReady ===
            "function"
        ) {
            previousProjectYouTubeReady();
        }


        projectYoutubeApiReady =
            true;


        createProjectYoutubePlayer();
    };


if (
    window.YT
    &&
    YT.Player
) {
    projectYoutubeApiReady =
        true;

    createProjectYoutubePlayer();
}


// ======================================================
// BOTÓN DE ACCESO RÁPIDO
// ======================================================

document
    .getElementById(
        "mediaOpenProjectVideo"
    )
    ?.addEventListener(
        "click",
        () => {

            const target =
                document.getElementById(
                    "projectPresentationVideo"
                );


            target
                ?.scrollIntoView(
                    {
                        behavior:
                            window.matchMedia(
                                "(prefers-reduced-motion: reduce)"
                            )
                            .matches
                                ?
                                "auto"
                                :
                                "smooth",

                        block:
                            "start"
                    }
                );


            setTimeout(
                () => {
                    createProjectYoutubePlayer();
                },
                120
            );
        }
    );


// ======================================================
// NAVEGACIÓN
// ======================================================

document.addEventListener(
    "vista:cambiada",
    event => {

        if (
            event.detail
                ?.nombre ===
            "mediateca"
        ) {
            setTimeout(
                createProjectYoutubePlayer,
                100
            );
        }
        else {
            pauseProjectVideo();
        }
    }
);


window.RGSProjectVideo = {
    pause:
        pauseProjectVideo,

    get isReady() {
        return Boolean(
            projectYoutubePlayer
        );
    }
};
