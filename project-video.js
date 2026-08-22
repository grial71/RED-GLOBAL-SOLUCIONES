// ======================================================
// V7.4 · PRESENTACIÓN OFICIAL RED GLOBAL · YOUTUBE
// Vídeo: https://www.youtube.com/watch?v=KLNSvJhX-m4
// ======================================================

const RGS_PROJECT_VIDEO_ID = "KLNSvJhX-m4";
let projectYoutubePlayer = null;
let projectYoutubeApiReady = false;
let projectSoundtrackWasPlaying = false;

function updateProjectVideoStatus(text, state = "ready") {
    const status = document.getElementById("projectVideoStatus");
    if (!status) return;
    if (text) status.textContent = text;
    status.dataset.state = state;
}

function pauseProjectVideo() {
    if (projectYoutubePlayer && typeof projectYoutubePlayer.pauseVideo === "function") {
        projectYoutubePlayer.pauseVideo();
    }
}

function stopOtherAudioForProjectVideo() {
    if (window.RGSMedia && window.RGSMedia.isPlaying) {
        projectSoundtrackWasPlaying = true;
        window.RGSMedia.stopSoundtrack();
    } else {
        projectSoundtrackWasPlaying = false;
    }
    window.RGSMedia?.pauseMainNarration?.();
    window.RGSVenus?.pause?.();
}

function restoreSoundtrackAfterProjectVideo() {
    if (!projectSoundtrackWasPlaying || !window.RGSMedia) return;
    setTimeout(() => {
        const state = projectYoutubePlayer?.getPlayerState?.();
        if (!window.YT || state !== YT.PlayerState.PLAYING) {
            window.RGSMedia.startSoundtrack();
        }
    }, 520);
    projectSoundtrackWasPlaying = false;
}

function onProjectVideoStateChange(event) {
    if (!window.YT) return;
    if (event.data === YT.PlayerState.PLAYING) {
        stopOtherAudioForProjectVideo();
        updateProjectVideoStatus("▶ Presentación en reproducción", "playing");
    }
    if (event.data === YT.PlayerState.PAUSED) {
        updateProjectVideoStatus("⏸ Presentación en pausa", "paused");
        restoreSoundtrackAfterProjectVideo();
    }
    if (event.data === YT.PlayerState.ENDED) {
        updateProjectVideoStatus("✓ Presentación finalizada", "ended");
        restoreSoundtrackAfterProjectVideo();
    }
}

function onProjectVideoError(event) {
    console.warn("RGS · YouTube · error en vídeo del proyecto:", event?.data);
    updateProjectVideoStatus("Abrir en YouTube si el reproductor no está disponible", "error");
    window.RGS?.showToast?.("YouTube no ha podido reproducir el vídeo dentro de la página. Usa «Abrir en YouTube».", "warning", 5200);
}

function createProjectYoutubePlayer() {
    if (projectYoutubePlayer || !projectYoutubeApiReady || !window.YT || !YT.Player || !document.getElementById("projectYoutubePlayer")) return;
    projectYoutubePlayer = new YT.Player("projectYoutubePlayer", {
        videoId: RGS_PROJECT_VIDEO_ID,
        width: "100%",
        height: "100%",
        playerVars: { playsinline: 1, rel: 0 },
        events: { onStateChange: onProjectVideoStateChange, onError: onProjectVideoError }
    });
}

const previousProjectYouTubeReady = window.onYouTubeIframeAPIReady;
window.onYouTubeIframeAPIReady = function () {
    if (typeof previousProjectYouTubeReady === "function") previousProjectYouTubeReady();
    projectYoutubeApiReady = true;
    createProjectYoutubePlayer();
};

if (window.YT && YT.Player) {
    projectYoutubeApiReady = true;
    createProjectYoutubePlayer();
}

document.getElementById("mediaOpenProjectVideo")?.addEventListener("click", () => {
    const target = document.getElementById("projectPresentationVideo");
    target?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start"
    });
    setTimeout(() => createProjectYoutubePlayer(), 120);
});

document.addEventListener("vista:cambiada", event => {
    if (event.detail?.nombre === "mediateca") setTimeout(createProjectYoutubePlayer, 100);
    else pauseProjectVideo();
});

window.RGSProjectVideo = {
    pause: pauseProjectVideo,
    get isReady() { return Boolean(projectYoutubePlayer); }
};

// ======================================================
// V7.6 · SERVICIOS DIGITALES + PORTFOLIO DE MICHEL
// ======================================================
function createMichelPortfolioFeature() {
    if (document.getElementById("michelPortfolioFeature")) return;
    const reference = document.getElementById("projectPresentationVideo");
    if (!reference) return;

    if (!document.getElementById("michelPortfolioFeatureStyles")) {
        const style = document.createElement("style");
        style.id = "michelPortfolioFeatureStyles";
        style.textContent = `
        .michel-portfolio-feature{margin:34px 0;padding:clamp(24px,4vw,42px);border:1px solid rgba(255,255,255,.12);border-radius:28px;background:radial-gradient(circle at top right,rgba(66,153,225,.17),transparent 38%),linear-gradient(135deg,rgba(10,20,38,.94),rgba(13,32,51,.90));box-shadow:0 22px 60px rgba(0,0,0,.22);display:grid;grid-template-columns:minmax(0,1.35fr) minmax(260px,.65fr);gap:28px;align-items:center;position:relative;overflow:hidden}
        .michel-portfolio-kicker{display:inline-flex;gap:8px;font-size:.78rem;letter-spacing:.13em;text-transform:uppercase;color:#8bd8ff;font-weight:800;margin-bottom:12px}
        .michel-portfolio-feature h2{margin:0 0 14px;font-size:clamp(1.65rem,3vw,2.5rem);line-height:1.08;color:#fff}
        .michel-portfolio-feature p{margin:0;color:rgba(255,255,255,.78);line-height:1.72;max-width:760px}
        .michel-portfolio-tags{display:flex;flex-wrap:wrap;gap:9px;margin-top:20px}
        .michel-portfolio-tags span{padding:8px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.055);color:rgba(255,255,255,.88);font-size:.86rem}
        .michel-portfolio-card{padding:22px;border-radius:22px;border:1px solid rgba(125,211,252,.24);background:rgba(8,18,31,.62);backdrop-filter:blur(12px)}
        .michel-portfolio-card strong{display:block;color:#fff;font-size:1.08rem;margin-bottom:8px}
        .michel-portfolio-card small{display:block;color:rgba(255,255,255,.62);line-height:1.5;margin-bottom:18px}
        .michel-portfolio-button{display:inline-flex;align-items:center;justify-content:center;width:100%;box-sizing:border-box;padding:13px 16px;border-radius:14px;background:linear-gradient(135deg,#38bdf8,#2563eb);color:#fff!important;text-decoration:none;font-weight:800;box-shadow:0 12px 28px rgba(37,99,235,.28);transition:.18s ease}
        .michel-portfolio-button:hover{transform:translateY(-2px);box-shadow:0 16px 34px rgba(37,99,235,.36)}
        @media(max-width:820px){.michel-portfolio-feature{grid-template-columns:1fr}}
        `;
        document.head.appendChild(style);
    }

    const section = document.createElement("section");
    section.id = "michelPortfolioFeature";
    section.className = "michel-portfolio-feature rgs-reveal";
    section.setAttribute("aria-label", "Servicios digitales y portfolio de Michel Quinones");
    section.innerHTML = `
        <div>
            <span class="michel-portfolio-kicker">✦ SERVICIOS DIGITALES · COLABORACIÓN</span>
            <h2>Soluciones digitales y acompañamiento personalizado</h2>
            <p>Michel Quinones acompaña a personas, asociaciones, pequeños proyectos e iniciativas que necesitan transformar una idea en una solución digital clara y útil: páginas web, apoyo administrativo y digital, documentos, materiales visuales, iniciación a la inteligencia artificial y acompañamiento de proyectos.</p>
            <div class="michel-portfolio-tags">
                <span>🌐 Páginas web</span><span>🤖 IA y herramientas digitales</span><span>📄 Documentos y CV</span><span>🎨 Material visual</span><span>🧭 Apoyo a proyectos</span><span>💻 Iniciación informática</span>
            </div>
        </div>
        <aside class="michel-portfolio-card">
            <strong>Conoce trabajos, servicios y proyectos</strong>
            <small>Accede al portfolio para ver ejemplos, capacidades y formas de colaboración.</small>
            <a class="michel-portfolio-button" href="https://grial71.github.io/11_Michel-Portfolio/" target="_blank" rel="noopener noreferrer">Ver mi portfolio y mis servicios ↗</a>
        </aside>`;
    reference.insertAdjacentElement("afterend", section);
}

createMichelPortfolioFeature();
