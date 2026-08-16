// ======================================================
// V6 · EFECTOS PREMIUM
// Red animada + profundidad + tilt 3D + reveal
// ======================================================


// ======================================================
// CANVAS DE RED
// ======================================================

const canvasRed =
    document.getElementById(
        "networkCanvas"
    );

const contextoRed =
    canvasRed
        ?.getContext("2d");


let particulas =
    [];

let puntero = {
    x: null,
    y: null
};


function ajustarCanvasRed() {
    if (
        !canvasRed ||
        !contextoRed
    ) {
        return;
    }

    const rect =
        canvasRed
            .getBoundingClientRect();

    const ratio =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );

    canvasRed.width =
        Math.max(
            1,
            Math.floor(
                rect.width *
                ratio
            )
        );

    canvasRed.height =
        Math.max(
            1,
            Math.floor(
                rect.height *
                ratio
            )
        );

    contextoRed.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );

    const cantidad =
        Math.max(
            22,
            Math.min(
                70,
                Math.floor(
                    rect.width /
                    24
                )
            )
        );

    particulas =
        Array.from(
            {
                length:
                    cantidad
            },
            () => ({
                x:
                    Math.random() *
                    rect.width,

                y:
                    Math.random() *
                    rect.height,

                vx:
                    (
                        Math.random() -
                        0.5
                    ) *
                    0.18,

                vy:
                    (
                        Math.random() -
                        0.5
                    ) *
                    0.18,

                r:
                    0.8 +
                    Math.random() *
                    1.4
            })
        );
}


function animarCanvasRed() {
    if (
        !canvasRed ||
        !contextoRed
    ) {
        return;
    }

    const rect =
        canvasRed
            .getBoundingClientRect();

    contextoRed.clearRect(
        0,
        0,
        rect.width,
        rect.height
    );


    particulas.forEach(
        particula => {
            particula.x +=
                particula.vx;

            particula.y +=
                particula.vy;

            if (
                particula.x < 0 ||
                particula.x >
                    rect.width
            ) {
                particula.vx *=
                    -1;
            }

            if (
                particula.y < 0 ||
                particula.y >
                    rect.height
            ) {
                particula.vy *=
                    -1;
            }
        }
    );


    for (
        let i = 0;
        i < particulas.length;
        i++
    ) {
        const a =
            particulas[i];

        contextoRed.beginPath();
        contextoRed.arc(
            a.x,
            a.y,
            a.r,
            0,
            Math.PI * 2
        );
        contextoRed.fillStyle =
            "rgba(255,255,255,.42)";
        contextoRed.fill();


        for (
            let j = i + 1;
            j < particulas.length;
            j++
        ) {
            const b =
                particulas[j];

            const dx =
                a.x - b.x;

            const dy =
                a.y - b.y;

            const distancia =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            if (
                distancia <
                115
            ) {
                contextoRed.beginPath();
                contextoRed.moveTo(
                    a.x,
                    a.y
                );
                contextoRed.lineTo(
                    b.x,
                    b.y
                );
                contextoRed.strokeStyle =
                    `rgba(196,240,255,${
                        0.16 *
                        (
                            1 -
                            distancia /
                            115
                        )
                    })`;
                contextoRed.lineWidth =
                    0.6;
                contextoRed.stroke();
            }
        }


        if (
            puntero.x !== null
        ) {
            const dx =
                a.x -
                puntero.x;

            const dy =
                a.y -
                puntero.y;

            const distancia =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            if (
                distancia <
                150
            ) {
                contextoRed.beginPath();
                contextoRed.moveTo(
                    a.x,
                    a.y
                );
                contextoRed.lineTo(
                    puntero.x,
                    puntero.y
                );
                contextoRed.strokeStyle =
                    `rgba(128,231,219,${
                        0.22 *
                        (
                            1 -
                            distancia /
                            150
                        )
                    })`;
                contextoRed.lineWidth =
                    0.8;
                contextoRed.stroke();
            }
        }
    }


    requestAnimationFrame(
        animarCanvasRed
    );
}


canvasRed
    ?.addEventListener(
        "pointermove",
        evento => {
            const rect =
                canvasRed
                    .getBoundingClientRect();

            puntero.x =
                evento.clientX -
                rect.left;

            puntero.y =
                evento.clientY -
                rect.top;
        }
    );


canvasRed
    ?.addEventListener(
        "pointerleave",
        () => {
            puntero.x =
                null;

            puntero.y =
                null;
        }
    );


window.addEventListener(
    "resize",
    ajustarCanvasRed
);


ajustarCanvasRed();
animarCanvasRed();


// ======================================================
// ORBE 3D
// ======================================================

const premiumOrb =
    document.getElementById(
        "premiumOrb"
    );


document
    .querySelector(
        ".premium-orb-stage"
    )
    ?.addEventListener(
        "pointermove",
        evento => {
            const stage =
                evento.currentTarget;

            const rect =
                stage
                    .getBoundingClientRect();

            const x =
                (
                    evento.clientX -
                    rect.left
                )
                /
                rect.width
                -
                0.5;

            const y =
                (
                    evento.clientY -
                    rect.top
                )
                /
                rect.height
                -
                0.5;

            premiumOrb.style.transform =
                `rotateX(${-y * 13}deg) rotateY(${x * 18}deg) translateZ(8px)`;
        }
    );


document
    .querySelector(
        ".premium-orb-stage"
    )
    ?.addEventListener(
        "pointerleave",
        () => {
            premiumOrb.style.transform =
                "";
        }
    );


// ======================================================
// TILT 3D
// ======================================================

const tarjetasTilt =
    new WeakSet();


function activarTilt(
    elemento
) {
    if (
        tarjetasTilt.has(
            elemento
        )
    ) {
        return;
    }

    tarjetasTilt.add(
        elemento
    );


    elemento.addEventListener(
        "pointermove",
        evento => {
            if (
                window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches
            ) {
                return;
            }

            const rect =
                elemento
                    .getBoundingClientRect();

            const x =
                (
                    evento.clientX -
                    rect.left
                )
                /
                rect.width;

            const y =
                (
                    evento.clientY -
                    rect.top
                )
                /
                rect.height;

            const rotateY =
                (
                    x -
                    0.5
                ) *
                6;

            const rotateX =
                (
                    0.5 -
                    y
                ) *
                5;

            elemento.style.transform =
                `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
        }
    );


    elemento.addEventListener(
        "pointerleave",
        () => {
            elemento.style.transform =
                "";
        }
    );
}


// ======================================================
// REVEAL
// ======================================================

let observerReveal =
    null;


function prepararReveal() {
    observerReveal
        ?.disconnect();


    observerReveal =
        new IntersectionObserver(
            entradas => {
                entradas.forEach(
                    entrada => {
                        if (
                            entrada.isIntersecting
                        ) {
                            entrada.target
                                .classList
                                .add("is-visible");

                            observerReveal
                                .unobserve(
                                    entrada.target
                                );
                        }
                    }
                );
            },
            {
                threshold:
                    0.08
            }
        );


    document
        .querySelectorAll(
            ".reveal-on-scroll, .resource-result-card, .resource-roadmap-card"
        )
        .forEach(
            elemento => {
                observerReveal
                    .observe(
                        elemento
                    );
            }
        );
}


// ======================================================
// REFRESCAR EFECTOS DINÁMICOS
// ======================================================

function refrescarEfectos() {
    document
        .querySelectorAll(
            ".tilt-card"
        )
        .forEach(
            activarTilt
        );

    prepararReveal();
}


document.addEventListener(
    "efectos:refrescar",
    refrescarEfectos
);




// ======================================================
// NAVEGACIÓN INTERACTIVA DE TARJETAS 3D
// ======================================================

function abrirModuloTerritorio(
    tab
) {
    window.cambiarVista
        ?.("territorio");

    setTimeout(
        () => {
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

            setTimeout(
                () => {
                    document
                        .getElementById(
                            `tab-${tab}`
                        )
                        ?.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });
                },
                120
            );
        },
        100
    );
}


document
    .querySelectorAll(
        "[data-orb-action]"
    )
    .forEach(
        boton => {
            boton.addEventListener(
                "click",
                evento => {
                    evento.stopPropagation();

                    const accion =
                        boton.dataset
                            .orbAction;

                    if (
                        accion === "agua"
                    ) {
                        abrirModuloTerritorio(
                            "agua"
                        );
                    }

                    else if (
                        accion === "formacion"
                    ) {
                        window.abrirCentroRecursos
                            ?.(
                                "formacion",
                                {
                                    usarTerritorio:
                                        true
                                }
                            );
                    }

                    else if (
                        accion === "financiacion"
                    ) {
                        window.abrirCentroRecursos
                            ?.(
                                "financiacion",
                                {
                                    usarTerritorio:
                                        true
                                }
                            );
                    }
                }
            );
        }
    );


window.abrirModuloTerritorio =
    abrirModuloTerritorio;


refrescarEfectos();


// ======================================================
// V6.3 · RED AMBIENTAL GLOBAL DE FONDO
// Efecto muy ligero para toda la parte inferior
// ======================================================

const canvasAmbientalGlobal =
    document.getElementById(
        "pageAmbientCanvas"
    );

const ctxAmbientalGlobal =
    canvasAmbientalGlobal
        ?.getContext("2d");


let nodosAmbientales =
    [];

let anchoAmbiental =
    0;

let altoAmbiental =
    0;


function ajustarCanvasAmbientalGlobal() {
    if (
        !canvasAmbientalGlobal ||
        !ctxAmbientalGlobal
    ) {
        return;
    }

    anchoAmbiental =
        window.innerWidth;

    altoAmbiental =
        window.innerHeight;

    const ratio =
        Math.min(
            window.devicePixelRatio || 1,
            1.5
        );

    canvasAmbientalGlobal.width =
        Math.floor(
            anchoAmbiental *
            ratio
        );

    canvasAmbientalGlobal.height =
        Math.floor(
            altoAmbiental *
            ratio
        );

    canvasAmbientalGlobal.style.width =
        anchoAmbiental + "px";

    canvasAmbientalGlobal.style.height =
        altoAmbiental + "px";

    ctxAmbientalGlobal.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );

    const cantidad =
        Math.max(
            18,
            Math.min(
                42,
                Math.floor(
                    anchoAmbiental /
                    42
                )
            )
        );

    nodosAmbientales =
        Array.from(
            {
                length:
                    cantidad
            },
            () => ({
                x:
                    Math.random() *
                    anchoAmbiental,

                y:
                    Math.random() *
                    altoAmbiental,

                vx:
                    (
                        Math.random() -
                        0.5
                    ) *
                    0.07,

                vy:
                    (
                        Math.random() -
                        0.5
                    ) *
                    0.05,

                r:
                    0.55 +
                    Math.random() *
                    1.05
            })
        );
}


function animarCanvasAmbientalGlobal() {
    if (
        !canvasAmbientalGlobal ||
        !ctxAmbientalGlobal
    ) {
        return;
    }

    ctxAmbientalGlobal.clearRect(
        0,
        0,
        anchoAmbiental,
        altoAmbiental
    );


    nodosAmbientales.forEach(
        nodo => {
            nodo.x +=
                nodo.vx;

            nodo.y +=
                nodo.vy;

            if (
                nodo.x < -20
            ) {
                nodo.x =
                    anchoAmbiental + 20;
            }

            if (
                nodo.x >
                anchoAmbiental + 20
            ) {
                nodo.x =
                    -20;
            }

            if (
                nodo.y < -20
            ) {
                nodo.y =
                    altoAmbiental + 20;
            }

            if (
                nodo.y >
                altoAmbiental + 20
            ) {
                nodo.y =
                    -20;
            }
        }
    );


    for (
        let i = 0;
        i < nodosAmbientales.length;
        i++
    ) {
        const a =
            nodosAmbientales[i];

        ctxAmbientalGlobal.beginPath();
        ctxAmbientalGlobal.arc(
            a.x,
            a.y,
            a.r,
            0,
            Math.PI * 2
        );

        ctxAmbientalGlobal.fillStyle =
            "rgba(170, 234, 229, .18)";

        ctxAmbientalGlobal.fill();


        for (
            let j = i + 1;
            j < nodosAmbientales.length;
            j++
        ) {
            const b =
                nodosAmbientales[j];

            const dx =
                a.x -
                b.x;

            const dy =
                a.y -
                b.y;

            const distancia =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            if (
                distancia <
                135
            ) {
                const fuerza =
                    1 -
                    distancia /
                    135;

                ctxAmbientalGlobal.beginPath();

                ctxAmbientalGlobal.moveTo(
                    a.x,
                    a.y
                );

                ctxAmbientalGlobal.lineTo(
                    b.x,
                    b.y
                );

                ctxAmbientalGlobal.strokeStyle =
                    `rgba(
                        115,
                        178,
                        218,
                        ${0.055 * fuerza}
                    )`;

                ctxAmbientalGlobal.lineWidth =
                    0.55;

                ctxAmbientalGlobal.stroke();
            }
        }
    }


    requestAnimationFrame(
        animarCanvasAmbientalGlobal
    );
}


if (
    !window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches
) {
    ajustarCanvasAmbientalGlobal();
    animarCanvasAmbientalGlobal();
}
else {
    ajustarCanvasAmbientalGlobal();
}


window.addEventListener(
    "resize",
    ajustarCanvasAmbientalGlobal
);



// ======================================================
// V6.9 · VIDEO AMBIENTAL DE FONDO
// ======================================================

const globalBackgroundVideo =
    document.getElementById(
        "globalBackgroundVideo"
    );


function configurarVideoAmbiental() {
    if (!globalBackgroundVideo) {
        return;
    }

    /*
      El MP4 ya está físicamente sin audio.
      muted queda además activado como segunda protección.
    */
    globalBackgroundVideo.muted =
        true;

    globalBackgroundVideo.defaultMuted =
        true;

    globalBackgroundVideo.volume =
        0;


    /*
      Movimiento un poco más lento para que funcione como ambiente
      y no compita con la lectura.
    */
    globalBackgroundVideo.playbackRate =
        0.72;


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    const aplicarPreferenciaMovimiento =
        () => {
            if (
                reducedMotion.matches
            ) {
                globalBackgroundVideo.pause();
            }
            else {
                globalBackgroundVideo.play()
                    .catch(
                        () => {
                            /*
                              Si el navegador bloquea autoplay,
                              se conserva el poster como fondo.
                            */
                        }
                    );
            }
        };


    aplicarPreferenciaMovimiento();


    if (
        typeof reducedMotion
            .addEventListener ===
        "function"
    ) {
        reducedMotion.addEventListener(
            "change",
            aplicarPreferenciaMovimiento
        );
    }
}


configurarVideoAmbiental();

