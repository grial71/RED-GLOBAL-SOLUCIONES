// ======================================================
// V6 · IDIOMAS
// Traducción interna de la nueva interfaz + acceso Google
// ======================================================

const languageToggle =
    document.getElementById(
        "languageToggle"
    );

const languageMenu =
    document.getElementById(
        "languageMenu"
    );

const languageCurrent =
    document.getElementById(
        "languageCurrent"
    );

const googleTranslateMore =
    document.getElementById(
        "googleTranslateMore"
    );


const DICCIONARIO_UI = {

    es: {
        brandName: "Red Global de Soluciones",
        brandTag: "Inteligencia territorial y recursos para organizaciones",
        navTerritory: "Territorio",
        navResources: "Recursos",
        navKnowledge: "Conocimiento",
        navProjects: "Proyectos",
        navAction: "Acción",
        heroVision: "Ver visión",
        navMedia: "Mediateca",
        projectVideoButton: "🎬 Ver presentación del proyecto",
        projectVideoKicker: "PRESENTACIÓN AUDIOVISUAL",
        projectVideoTitle: "Conoce Red Global de Soluciones en vídeo",
        projectVideoBadge: "▶ YouTube · vídeo del proyecto",
        projectVideoDescription: "Una presentación audiovisual de la visión, los objetivos y el enfoque de Red Global de Soluciones.",
        projectVideoOpenYoutube: "Abrir en YouTube ↗",
        projectVideoFooterTitle: "Presentación de Red Global de Soluciones",
        projectVideoFooterText: "El vídeo se reproduce desde YouTube sin duplicarlo en la web.",
        connectedInitiativeKicker: "IMPULSORES E INICIATIVAS CONECTADAS",
        connectedInitiativeTitle: "Aprende, Comparte, Crea y Cuida",
        connectedInitiativeBadge: "▶ Canal YouTube",
        connectedInitiativeLead: "Un espacio que impulsa la idea de conectar personas, compartir conocimiento y promover acciones concretas para hacer visibles otras formas de construir el futuro.",
        connectedInitiativeLearn: "📚 Aprender",
        connectedInitiativeShare: "🤝 Compartir",
        connectedInitiativeCreate: "✦ Crear",
        connectedInitiativeCare: "🌱 Cuidar",
        connectedInitiativeDescription: "Desde esta iniciativa se promueve una visión basada en cooperación, aprendizaje compartido y acción local: encuentros, divulgación, cuidado del entorno, intercambio de herramientas y conocimientos, y conexión entre personas y colectivos que buscan experimentar alternativas en sus propios territorios.",
        connectedInitiativeRelationTitle: "Conexión con Red Global de Soluciones",
        connectedInitiativeRelationText: "Su enfoque encaja con una lógica de red: aprender → compartir → conectar → experimentar → actuar → evaluar → volver a compartir.",
        connectedInitiativeOpenChannel: "▶ Conocer Aprende, Comparte, Crea y Cuida",
        connectedInitiativeNote: "Iniciativa presentada como referencia vinculada a la difusión, cooperación y acción; no implica una relación jurídica u organizativa formal.",
        languageTitle: "Idioma",
        languageHelp: "Interfaz + Google Translate",
        googleLanguages: "Más idiomas internacionales",
        googleTranslateFull: "Abrir Google Translate",
        heroKicker: "RED GLOBAL · INTELIGENCIA COLECTIVA",
        heroTitle: "Del territorio a la solución.",
        heroDescription:
            "Analiza necesidades, conecta organizaciones, descubre formación, proyectos, conocimiento y vías de financiación en un mismo lugar.",
        heroExploreResources: "Explorar recursos",
        heroAnalyzeTerritory: "Analizar territorio",
        trustSources: "Fuentes trazables",
        trustGlobal: "Enfoque mundial",
        trustNoGuess: "Sin inventar datos",
        resourceKicker: "CENTRO GLOBAL DE RECURSOS",
        resourceTitle: "¿Qué necesita tu organización?",
        resourceSubtitle:
            "Busca organizaciones, formación, financiación, proyectos y soluciones sin perder el contexto territorial.",
        resourceContext: "Contexto territorial",
        resourcePlaceholder:
            "Ej.: financiación agrícola, formación solar, organizaciones de agua...",
        resourceSearchButton: "Buscar recursos",
        actorLabel: "Tipo de organización",
        actorAll: "Todos",
        actorAssociation: "Asociación / ONG",
        actorCooperative: "Cooperativa",
        actorCommunity: "Comunidad",
        actorEnterprise: "Empresa social",
        actorPublic: "Entidad pública",
        actorProject: "Proyecto en creación",
        scopeLabel: "Ámbito",
        scopeAll: "Mundial + territorio",
        scopeGlobal: "Global",
        scopeAfrica: "África",
        scopeEurope: "Europa",
        scopeLocal: "Priorizar territorio",
        useCurrentTerritory: "Usar territorio actual",
        categoryAll: "Todo",
        categoryAllDesc: "Visión global",
        categoryOrganizations: "Organizaciones",
        categoryOrganizationsDesc: "Redes y aliados",
        categoryTraining: "Formación",
        categoryTrainingDesc: "Cursos y aprendizaje",
        categoryFunding: "Financiación",
        categoryFundingDesc: "Fondos y convocatorias",
        categoryProjects: "Proyectos y soluciones",
        categoryProjectsDesc: "Casos y modelos",
        resourceEngine: "Motor de recursos activo",
        resultsKicker: "RESULTADOS",
        resultsTitle: "Recursos recomendados",
        resultsFound: "resultados",
        noResultsTitle: "No encontramos coincidencias en el catálogo inicial.",
        noResultsText: "Prueba con términos más amplios o cambia los filtros.",
        roadmapSearch: "Próximo nivel: búsqueda viva",
        roadmapSearchText:
            "Conectaremos fuentes y buscadores externos para encontrar oportunidades actuales, no solo portales de referencia.",
        roadmapAI: "Relación necesidad → solución",
        roadmapAIText:
            "El motor podrá comparar necesidades con proyectos, organizaciones, formación y financiación pertinente.",
        roadmapNetwork: "Red de actores y recursos",
        roadmapNetworkText:
            "Después añadiremos visualización de conexiones, contribuciones, capacidades y colaboración."
    },


    fr: {
        brandName: "Réseau mondial de solutions",
        brandTag: "Intelligence territoriale et ressources pour les organisations",
        navTerritory: "Territoire",
        navResources: "Ressources",
        navKnowledge: "Connaissance",
        navProjects: "Projets",
        navAction: "Action",
        heroVision: "Voir la vision",
        navMedia: "Médiathèque",
        projectVideoButton: "🎬 Voir la présentation du projet",
        projectVideoKicker: "PRÉSENTATION AUDIOVISUELLE",
        projectVideoTitle: "Découvrez le Réseau mondial de solutions en vidéo",
        projectVideoBadge: "▶ YouTube · vidéo du projet",
        projectVideoDescription: "Une présentation audiovisuelle de la vision, des objectifs et de l’approche du Réseau mondial de solutions.",
        projectVideoOpenYoutube: "Ouvrir sur YouTube ↗",
        projectVideoFooterTitle: "Présentation du Réseau mondial de solutions",
        projectVideoFooterText: "La vidéo est lue depuis YouTube sans être dupliquée sur le site.",
        connectedInitiativeKicker: "PORTEURS ET INITIATIVES CONNECTÉES",
        connectedInitiativeTitle: "Apprends, Partage, Crée et Prends soin",
        connectedInitiativeBadge: "▶ Chaîne YouTube",
        connectedInitiativeLead: "Un espace qui encourage la connexion entre les personnes, le partage des connaissances et la promotion d’actions concrètes pour rendre visibles d’autres façons de construire l’avenir.",
        connectedInitiativeLearn: "📚 Apprendre",
        connectedInitiativeShare: "🤝 Partager",
        connectedInitiativeCreate: "✦ Créer",
        connectedInitiativeCare: "🌱 Prendre soin",
        connectedInitiativeDescription: "Cette initiative défend une vision fondée sur la coopération, l’apprentissage partagé et l’action locale : rencontres, diffusion, soin de l’environnement, échange d’outils et de connaissances, et mise en relation de personnes et de collectifs qui souhaitent expérimenter des alternatives sur leurs territoires.",
        connectedInitiativeRelationTitle: "Lien avec le Réseau mondial de solutions",
        connectedInitiativeRelationText: "Son approche s’inscrit dans une logique de réseau : apprendre → partager → connecter → expérimenter → agir → évaluer → partager à nouveau.",
        connectedInitiativeOpenChannel: "▶ Découvrir Aprende, Comparte, Crea y Cuida",
        connectedInitiativeNote: "Initiative présentée comme référence liée à la diffusion, à la coopération et à l’action ; cela n’implique pas de relation juridique ou organisationnelle formelle.",
        languageTitle: "Langue",
        languageHelp: "Interface + Google Translate",
        googleLanguages: "Plus de langues internationales",
        googleTranslateFull: "Ouvrir Google Translate",
        heroKicker: "RÉSEAU MONDIAL · INTELLIGENCE COLLECTIVE",
        heroTitle: "Du territoire à la solution.",
        heroDescription:
            "Analysez les besoins, connectez les organisations et trouvez formations, projets, connaissances et pistes de financement.",
        heroExploreResources: "Explorer les ressources",
        heroAnalyzeTerritory: "Analyser le territoire",
        trustSources: "Sources traçables",
        trustGlobal: "Approche mondiale",
        trustNoGuess: "Sans inventer de données",
        resourceKicker: "CENTRE MONDIAL DE RESSOURCES",
        resourceTitle: "De quoi votre organisation a-t-elle besoin ?",
        resourceSubtitle:
            "Recherchez organisations, formations, financements, projets et solutions en conservant le contexte territorial.",
        resourceContext: "Contexte territorial",
        resourcePlaceholder:
            "Ex. financement agricole, formation solaire, organisations de l'eau...",
        resourceSearchButton: "Rechercher",
        actorLabel: "Type d'organisation",
        actorAll: "Tous",
        actorAssociation: "Association / ONG",
        actorCooperative: "Coopérative",
        actorCommunity: "Communauté",
        actorEnterprise: "Entreprise sociale",
        actorPublic: "Entité publique",
        actorProject: "Projet en création",
        scopeLabel: "Portée",
        scopeAll: "Monde + territoire",
        scopeGlobal: "Mondial",
        scopeAfrica: "Afrique",
        scopeEurope: "Europe",
        scopeLocal: "Prioriser le territoire",
        useCurrentTerritory: "Utiliser le territoire actuel",
        categoryAll: "Tout",
        categoryAllDesc: "Vue globale",
        categoryOrganizations: "Organisations",
        categoryOrganizationsDesc: "Réseaux et partenaires",
        categoryTraining: "Formation",
        categoryTrainingDesc: "Cours et apprentissage",
        categoryFunding: "Financement",
        categoryFundingDesc: "Fonds et appels",
        categoryProjects: "Projets et solutions",
        categoryProjectsDesc: "Cas et modèles",
        resourceEngine: "Moteur de ressources actif",
        resultsKicker: "RÉSULTATS",
        resultsTitle: "Ressources recommandées",
        resultsFound: "résultats",
        noResultsTitle: "Aucune correspondance dans le catalogue initial.",
        noResultsText: "Essayez des termes plus larges ou modifiez les filtres.",
        roadmapSearch: "Étape suivante : recherche dynamique",
        roadmapSearchText:
            "Nous connecterons des sources externes pour trouver des opportunités actuelles.",
        roadmapAI: "Lien besoin → solution",
        roadmapAIText:
            "Le moteur comparera besoins, projets, organisations, formations et financements pertinents.",
        roadmapNetwork: "Réseau d'acteurs et de ressources",
        roadmapNetworkText:
            "Nous ajouterons ensuite les connexions, contributions, capacités et collaborations."
    },


    en: {
        brandName: "Global Solutions Network",
        brandTag: "Territorial intelligence and resources for organizations",
        navTerritory: "Territory",
        navResources: "Resources",
        navKnowledge: "Knowledge",
        navProjects: "Projects",
        navAction: "Action",
        heroVision: "View vision",
        navMedia: "Media",
        projectVideoButton: "🎬 Watch project presentation",
        projectVideoKicker: "AUDIOVISUAL PRESENTATION",
        projectVideoTitle: "Discover the Global Solutions Network in video",
        projectVideoBadge: "▶ YouTube · project video",
        projectVideoDescription: "An audiovisual presentation of the vision, goals and approach of the Global Solutions Network.",
        projectVideoOpenYoutube: "Open on YouTube ↗",
        projectVideoFooterTitle: "Global Solutions Network presentation",
        projectVideoFooterText: "The video plays from YouTube without being duplicated on the website.",
        connectedInitiativeKicker: "CONNECTED DRIVERS AND INITIATIVES",
        connectedInitiativeTitle: "Learn, Share, Create and Care",
        connectedInitiativeBadge: "▶ YouTube channel",
        connectedInitiativeLead: "A space that promotes connecting people, sharing knowledge and encouraging concrete actions to make other ways of building the future visible.",
        connectedInitiativeLearn: "📚 Learn",
        connectedInitiativeShare: "🤝 Share",
        connectedInitiativeCreate: "✦ Create",
        connectedInitiativeCare: "🌱 Care",
        connectedInitiativeDescription: "This initiative promotes a vision based on cooperation, shared learning and local action: gatherings, outreach, care for the environment, exchange of tools and knowledge, and connections between people and groups seeking to test alternatives in their own territories.",
        connectedInitiativeRelationTitle: "Connection with the Global Solutions Network",
        connectedInitiativeRelationText: "Its approach fits a network logic: learn → share → connect → experiment → act → evaluate → share again.",
        connectedInitiativeOpenChannel: "▶ Discover Aprende, Comparte, Crea y Cuida",
        connectedInitiativeNote: "Presented as a reference initiative linked to outreach, cooperation and action; this does not imply a formal legal or organizational relationship.",
        languageTitle: "Language",
        languageHelp: "Interface + Google Translate",
        googleLanguages: "More international languages",
        googleTranslateFull: "Open Google Translate",
        heroKicker: "GLOBAL NETWORK · COLLECTIVE INTELLIGENCE",
        heroTitle: "From territory to solution.",
        heroDescription:
            "Analyze needs, connect organizations, and discover training, projects, knowledge and funding pathways in one place.",
        heroExploreResources: "Explore resources",
        heroAnalyzeTerritory: "Analyze territory",
        trustSources: "Traceable sources",
        trustGlobal: "Global approach",
        trustNoGuess: "No invented data",
        resourceKicker: "GLOBAL RESOURCE CENTER",
        resourceTitle: "What does your organization need?",
        resourceSubtitle:
            "Search organizations, training, funding, projects and solutions while preserving territorial context.",
        resourceContext: "Territorial context",
        resourcePlaceholder:
            "E.g. agricultural funding, solar training, water organizations...",
        resourceSearchButton: "Search resources",
        actorLabel: "Organization type",
        actorAll: "All",
        actorAssociation: "Association / NGO",
        actorCooperative: "Cooperative",
        actorCommunity: "Community",
        actorEnterprise: "Social enterprise",
        actorPublic: "Public body",
        actorProject: "Project in development",
        scopeLabel: "Scope",
        scopeAll: "Global + territory",
        scopeGlobal: "Global",
        scopeAfrica: "Africa",
        scopeEurope: "Europe",
        scopeLocal: "Prioritize territory",
        useCurrentTerritory: "Use current territory",
        categoryAll: "All",
        categoryAllDesc: "Global view",
        categoryOrganizations: "Organizations",
        categoryOrganizationsDesc: "Networks and allies",
        categoryTraining: "Training",
        categoryTrainingDesc: "Courses and learning",
        categoryFunding: "Funding",
        categoryFundingDesc: "Funds and calls",
        categoryProjects: "Projects and solutions",
        categoryProjectsDesc: "Cases and models",
        resourceEngine: "Resource engine active",
        resultsKicker: "RESULTS",
        resultsTitle: "Recommended resources",
        resultsFound: "results",
        noResultsTitle: "No matches found in the starter catalog.",
        noResultsText: "Try broader terms or change the filters.",
        roadmapSearch: "Next level: live search",
        roadmapSearchText:
            "We will connect external sources and search engines to find current opportunities.",
        roadmapAI: "Need → solution matching",
        roadmapAIText:
            "The engine will compare needs with projects, organizations, training and relevant funding.",
        roadmapNetwork: "Network of actors and resources",
        roadmapNetworkText:
            "Next we will add visual connections, contributions, capabilities and collaboration."
    },


    pt: {
        brandName: "Rede Global de Soluções",
        brandTag: "Inteligência territorial e recursos para organizações",
        navTerritory: "Território",
        navResources: "Recursos",
        navKnowledge: "Conhecimento",
        navProjects: "Projetos",
        navAction: "Ação",
        heroVision: "Ver visão",
        navMedia: "Mediateca",
        projectVideoButton: "🎬 Ver apresentação do projeto",
        projectVideoKicker: "APRESENTAÇÃO AUDIOVISUAL",
        projectVideoTitle: "Conheça a Rede Global de Soluções em vídeo",
        projectVideoBadge: "▶ YouTube · vídeo do projeto",
        projectVideoDescription: "Uma apresentação audiovisual da visão, dos objetivos e da abordagem da Rede Global de Soluções.",
        projectVideoOpenYoutube: "Abrir no YouTube ↗",
        projectVideoFooterTitle: "Apresentação da Rede Global de Soluções",
        projectVideoFooterText: "O vídeo é reproduzido pelo YouTube sem ser duplicado no site.",
        connectedInitiativeKicker: "IMPULSORES E INICIATIVAS CONECTADAS",
        connectedInitiativeTitle: "Aprende, Compartilha, Cria e Cuida",
        connectedInitiativeBadge: "▶ Canal do YouTube",
        connectedInitiativeLead: "Um espaço que promove a ligação entre pessoas, a partilha de conhecimento e ações concretas para tornar visíveis outras formas de construir o futuro.",
        connectedInitiativeLearn: "📚 Aprender",
        connectedInitiativeShare: "🤝 Compartilhar",
        connectedInitiativeCreate: "✦ Criar",
        connectedInitiativeCare: "🌱 Cuidar",
        connectedInitiativeDescription: "A iniciativa promove uma visão baseada em cooperação, aprendizagem partilhada e ação local: encontros, divulgação, cuidado do ambiente, troca de ferramentas e conhecimentos e ligação entre pessoas e coletivos que procuram experimentar alternativas nos seus próprios territórios.",
        connectedInitiativeRelationTitle: "Ligação com a Rede Global de Soluções",
        connectedInitiativeRelationText: "A sua abordagem encaixa numa lógica de rede: aprender → compartilhar → conectar → experimentar → agir → avaliar → compartilhar novamente.",
        connectedInitiativeOpenChannel: "▶ Conhecer Aprende, Comparte, Crea y Cuida",
        connectedInitiativeNote: "Iniciativa apresentada como referência ligada à divulgação, cooperação e ação; não implica uma relação jurídica ou organizacional formal.",
        languageTitle: "Idioma",
        languageHelp: "Interface + Google Translate",
        googleLanguages: "Mais idiomas internacionais",
        googleTranslateFull: "Abrir Google Translate",
        heroKicker: "REDE GLOBAL · INTELIGÊNCIA COLETIVA",
        heroTitle: "Do território à solução.",
        heroDescription:
            "Analise necessidades, conecte organizações e encontre formação, projetos, conhecimento e caminhos de financiamento.",
        heroExploreResources: "Explorar recursos",
        heroAnalyzeTerritory: "Analisar território",
        trustSources: "Fontes rastreáveis",
        trustGlobal: "Abordagem mundial",
        trustNoGuess: "Sem inventar dados",
        resourceKicker: "CENTRO GLOBAL DE RECURSOS",
        resourceTitle: "Do que sua organização precisa?",
        resourceSubtitle:
            "Pesquise organizações, formação, financiamento, projetos e soluções mantendo o contexto territorial.",
        resourceContext: "Contexto territorial",
        resourcePlaceholder:
            "Ex.: financiamento agrícola, formação solar, organizações de água...",
        resourceSearchButton: "Buscar recursos",
        actorLabel: "Tipo de organização",
        actorAll: "Todos",
        actorAssociation: "Associação / ONG",
        actorCooperative: "Cooperativa",
        actorCommunity: "Comunidade",
        actorEnterprise: "Empresa social",
        actorPublic: "Entidade pública",
        actorProject: "Projeto em criação",
        scopeLabel: "Âmbito",
        scopeAll: "Mundial + território",
        scopeGlobal: "Global",
        scopeAfrica: "África",
        scopeEurope: "Europa",
        scopeLocal: "Priorizar território",
        useCurrentTerritory: "Usar território atual",
        categoryAll: "Tudo",
        categoryAllDesc: "Visão global",
        categoryOrganizations: "Organizações",
        categoryOrganizationsDesc: "Redes e aliados",
        categoryTraining: "Formação",
        categoryTrainingDesc: "Cursos e aprendizagem",
        categoryFunding: "Financiamento",
        categoryFundingDesc: "Fundos e chamadas",
        categoryProjects: "Projetos e soluções",
        categoryProjectsDesc: "Casos e modelos",
        resourceEngine: "Motor de recursos ativo",
        resultsKicker: "RESULTADOS",
        resultsTitle: "Recursos recomendados",
        resultsFound: "resultados",
        noResultsTitle: "Nenhuma correspondência no catálogo inicial.",
        noResultsText: "Tente termos mais amplos ou altere os filtros.",
        roadmapSearch: "Próximo nível: busca ao vivo",
        roadmapSearchText:
            "Conectaremos fontes externas para encontrar oportunidades atuais.",
        roadmapAI: "Relação necessidade → solução",
        roadmapAIText:
            "O motor comparará necessidades com projetos, organizações, formação e financiamento relevante.",
        roadmapNetwork: "Rede de atores e recursos",
        roadmapNetworkText:
            "Depois adicionaremos conexões, contribuições, capacidades e colaboração."
    }
};


// ======================================================
// V7.0 · SYSTÈME DE TRADUCTION ROBUSTE
// Centralisé, compatible V6, extensible et dynamique
// ======================================================

const RGS_LANGUAGE_STORAGE_KEY =
    "rgs-ui-lang-v3";

const RGS_PREVIOUS_LANGUAGE_KEYS =
    [
        "rgs-ui-lang-v2",
        "rgs-ui-lang"
    ];

const RGS_VALID_UI_LANGUAGES =
    new Set(
        [
            "es",
            "fr",
            "en",
            "pt"
        ]
    );


const DICCIONARIO_V7 = {

    es: {
        errors: {
            moduleTitle:
                "No se pudo cargar el módulo",

            moduleBody:
                "Puede tratarse de una interrupción temporal. Inténtalo de nuevo.",

            retry:
                "Reintentar"
        },

        toast: {
            languageChanged:
                "Idioma cambiado a Español."
        }
    },


    fr: {
        errors: {
            moduleTitle:
                "Impossible de charger le module",

            moduleBody:
                "Il peut s'agir d'une interruption temporaire. Veuillez réessayer.",

            retry:
                "Réessayer"
        },

        toast: {
            languageChanged:
                "Langue changée en Français."
        }
    },


    en: {
        errors: {
            moduleTitle:
                "The module could not be loaded",

            moduleBody:
                "This may be a temporary interruption. Please try again.",

            retry:
                "Retry"
        },

        toast: {
            languageChanged:
                "Language changed to English."
        }
    },


    pt: {
        errors: {
            moduleTitle:
                "Não foi possível carregar o módulo",

            moduleBody:
                "Pode ser uma interrupção temporária. Tente novamente.",

            retry:
                "Tentar novamente"
        },

        toast: {
            languageChanged:
                "Idioma alterado para Português."
        }
    }

};


function normalizarIdiomaUI(
    codigo
) {
    const limpio =
        String(
            codigo ||
            ""
        )
        .trim()
        .toLowerCase()
        .split("-")[0];


    return RGS_VALID_UI_LANGUAGES
        .has(
            limpio
        )
        ?
        limpio
        :
        "es";
}


function resolverRuta(
    object,
    path
) {
    if (
        !object
        ||
        !path
    ) {
        return undefined;
    }


    /*
      Compatibilité avec le dictionnaire V6 plat.
      Exemple: t("navTerritory")
    */
    if (
        Object.prototype
            .hasOwnProperty
            .call(
                object,
                path
            )
    ) {
        return object[
            path
        ];
    }


    /*
      Support V7 imbriqué.
      Exemple: t("errors.retry")
    */
    return String(path)
        .split(".")
        .reduce(
            (
                value,
                key
            ) => {
                if (
                    value
                    &&
                    typeof value ===
                        "object"
                    &&
                    Object.prototype
                        .hasOwnProperty
                        .call(
                            value,
                            key
                        )
                ) {
                    return value[
                        key
                    ];
                }

                return undefined;
            },
            object
        );
}


function obtenerIdiomaInicial() {
    const params =
        new URLSearchParams(
            location.search
        );

    const desdeUrl =
        params.get(
            "lang"
        );


    if (
        desdeUrl
        &&
        RGS_VALID_UI_LANGUAGES
            .has(
                normalizarIdiomaUI(
                    desdeUrl
                )
            )
    ) {
        return normalizarIdiomaUI(
            desdeUrl
        );
    }


    const guardadoActual =
        localStorage.getItem(
            RGS_LANGUAGE_STORAGE_KEY
        );


    if (
        guardadoActual
        &&
        RGS_VALID_UI_LANGUAGES
            .has(
                normalizarIdiomaUI(
                    guardadoActual
                )
            )
    ) {
        return normalizarIdiomaUI(
            guardadoActual
        );
    }


    /*
      Migration douce depuis V6.7:
      on conserve le dernier choix au lieu de réinitialiser brutalement.
    */
    for (
        const legacyKey
        of
        RGS_PREVIOUS_LANGUAGE_KEYS
    ) {
        const legacyValue =
            localStorage.getItem(
                legacyKey
            );

        if (
            legacyValue
            &&
            RGS_VALID_UI_LANGUAGES
                .has(
                    normalizarIdiomaUI(
                        legacyValue
                    )
                )
        ) {
            return normalizarIdiomaUI(
                legacyValue
            );
        }
    }


    return "es";
}


function actualizarUrlIdioma(
    idioma
) {
    try {
        const url =
            new URL(
                location.href
            );

        url.searchParams.set(
            "lang",
            idioma
        );

        history.replaceState(
            null,
            "",
            url
        );
    }
    catch (error) {
        console.debug(
            "RGS i18n · URL non modifiée:",
            error
        );
    }
}


function actualizarEstadoBotonesIdioma(
    idioma
) {
    document
        .querySelectorAll(
            "[data-ui-lang]"
        )
        .forEach(
            boton => {
                const activo =
                    boton.dataset
                        .uiLang ===
                    idioma;

                boton.classList.toggle(
                    "active",
                    activo
                );

                boton.setAttribute(
                    "aria-pressed",
                    String(
                        activo
                    )
                );
            }
        );


    if (
        languageCurrent
    ) {
        languageCurrent.textContent =
            idioma.toUpperCase();
    }
}


window.RGS =
    window.RGS
    ||
    {};


window.RGS.i18n = {

    currentLang:
        "es",

    dictionary:
        DICCIONARIO_UI,

    extraDictionary:
        DICCIONARIO_V7,

    initialized:
        false,

    observer:
        null,


    t(
        key,
        fallback = null
    ) {
        const idioma =
            this.currentLang;

        const fromExtra =
            resolverRuta(
                this.extraDictionary[
                    idioma
                ],
                key
            );

        if (
            fromExtra !==
            undefined
            &&
            fromExtra !==
            null
            &&
            fromExtra !==
            ""
        ) {
            return fromExtra;
        }


        const fromMain =
            resolverRuta(
                this.dictionary[
                    idioma
                ],
                key
            );


        if (
            fromMain !==
            undefined
            &&
            fromMain !==
            null
            &&
            fromMain !==
            ""
        ) {
            return fromMain;
        }


        /*
          Fallback espagnol:
          utile si une clé existe mais qu'une future langue
          n'a pas encore sa traduction.
        */
        const fallbackExtra =
            resolverRuta(
                this.extraDictionary.es,
                key
            );

        if (
            fallbackExtra !==
            undefined
            &&
            fallbackExtra !==
            null
            &&
            fallbackExtra !==
            ""
        ) {
            return fallbackExtra;
        }


        const fallbackMain =
            resolverRuta(
                this.dictionary.es,
                key
            );


        if (
            fallbackMain !==
            undefined
            &&
            fallbackMain !==
            null
            &&
            fallbackMain !==
            ""
        ) {
            return fallbackMain;
        }


        return fallback
            ??
            key;
    },


    translateElement(
        elemento
    ) {
        if (
            !elemento
            ||
            elemento.nodeType !==
                Node.ELEMENT_NODE
        ) {
            return;
        }


        if (
            elemento.matches(
                "[data-i18n]"
            )
        ) {
            const key =
                elemento.dataset
                    .i18n;

            const translation =
                this.t(
                    key,
                    null
                );

            if (
                translation !==
                null
                &&
                translation !==
                key
            ) {
                elemento.textContent =
                    translation;
            }
        }


        if (
            elemento.matches(
                "[data-i18n-placeholder]"
            )
        ) {
            const key =
                elemento.dataset
                    .i18nPlaceholder;

            const translation =
                this.t(
                    key,
                    null
                );

            if (
                translation !==
                null
                &&
                translation !==
                key
            ) {
                elemento.placeholder =
                    translation;
            }
        }


        if (
            elemento.matches(
                "[data-i18n-title]"
            )
        ) {
            const key =
                elemento.dataset
                    .i18nTitle;

            elemento.title =
                this.t(
                    key,
                    elemento.title
                );
        }


        if (
            elemento.matches(
                "[data-i18n-aria-label]"
            )
        ) {
            const key =
                elemento.dataset
                    .i18nAriaLabel;

            elemento.setAttribute(
                "aria-label",
                this.t(
                    key,
                    elemento.getAttribute(
                        "aria-label"
                    )
                    ||
                    key
                )
            );
        }
    },


    translateTree(
        root = document
    ) {
        if (!root) {
            return;
        }


        if (
            root.nodeType ===
            Node.ELEMENT_NODE
        ) {
            this.translateElement(
                root
            );
        }


        root
            .querySelectorAll
            ?.(
                [
                    "[data-i18n]",
                    "[data-i18n-placeholder]",
                    "[data-i18n-title]",
                    "[data-i18n-aria-label]"
                ].join(",")
            )
            .forEach(
                element => {
                    this.translateElement(
                        element
                    );
                }
            );
    },


    setLanguage(
        codigo,
        options = {}
    ) {
        const idioma =
            normalizarIdiomaUI(
                codigo
            );


        if (
            !RGS_VALID_UI_LANGUAGES
                .has(
                    idioma
                )
        ) {
            return false;
        }


        this.currentLang =
            idioma;


        document.documentElement.lang =
            idioma;

        document.documentElement
            .dataset
            .rgsLanguage =
            idioma;


        this.translateTree(
            document
        );


        actualizarEstadoBotonesIdioma(
            idioma
        );


        if (
            options.persist !==
            false
        ) {
            localStorage.setItem(
                RGS_LANGUAGE_STORAGE_KEY,
                idioma
            );


            RGS_PREVIOUS_LANGUAGE_KEYS
                .forEach(
                    key => {
                        localStorage.removeItem(
                            key
                        );
                    }
                );


            actualizarUrlIdioma(
                idioma
            );
        }


        /*
          Nouvel événement V7.
        */
        document.dispatchEvent(
            new CustomEvent(
                "rgs:languageChanged",
                {
                    detail: {
                        lang:
                            idioma
                    }
                }
            )
        );


        /*
          Compatibilité V6.10:
          venus-videos.js et d'autres modules peuvent encore l'écouter.
        */
        document.dispatchEvent(
            new CustomEvent(
                "idioma:actualizado",
                {
                    detail: {
                        idioma
                    }
                }
            )
        );


        if (
            options.toast !==
            false
        ) {
            window.RGS
                ?.showToast
                ?.(
                    this.t(
                        "toast.languageChanged"
                    ),
                    "success",
                    2600
                );
        }


        return true;
    },


    installObserver() {
        if (
            this.observer
            ||
            !document.body
        ) {
            return;
        }


        this.observer =
            new MutationObserver(
                mutations => {
                    for (
                        const mutation
                        of
                        mutations
                    ) {
                        mutation.addedNodes
                            .forEach(
                                node => {
                                    if (
                                        node.nodeType ===
                                        Node.ELEMENT_NODE
                                    ) {
                                        this.translateTree(
                                            node
                                        );
                                    }
                                }
                            );
                    }
                }
            );


        this.observer.observe(
            document.body,
            {
                childList:
                    true,

                subtree:
                    true
            }
        );
    },


    audit() {
        const missing =
            [];


        document
            .querySelectorAll(
                "[data-i18n]"
            )
            .forEach(
                element => {
                    const key =
                        element.dataset
                            .i18n;

                    const value =
                        resolverRuta(
                            this.dictionary[
                                this.currentLang
                            ],
                            key
                        )
                        ??
                        resolverRuta(
                            this.extraDictionary[
                                this.currentLang
                            ],
                            key
                        );


                    if (
                        value ===
                        undefined
                    ) {
                        missing.push(
                            key
                        );
                    }
                }
            );


        if (
            missing.length
        ) {
            console.warn(
                "RGS i18n · clés manquantes:",
                [
                    ...new Set(
                        missing
                    )
                ]
            );
        }


        return [
            ...new Set(
                missing
            )
        ];
    },


    init() {
        if (
            this.initialized
        ) {
            return;
        }


        this.initialized =
            true;


        const initial =
            obtenerIdiomaInicial();


        this.setLanguage(
            initial,
            {
                persist:
                    true,

                toast:
                    false
            }
        );


        this.installObserver();


        setTimeout(
            () => {
                this.audit();
            },
            0
        );
    }

};


// Compatibilité avec le code déjà présent.
window.aplicarIdiomaUI =
    function (
        lang
    ) {
        return window.RGS
            .i18n
            .setLanguage(
                lang
            );
    };


// ======================================================
// MENU LANGUES
// ======================================================

languageToggle
    ?.addEventListener(
        "click",
        event => {
            event.stopPropagation();


            const isHidden =
                languageMenu
                    ?.classList
                    .contains(
                        "hidden"
                    );


            languageMenu
                ?.classList
                .toggle(
                    "hidden",
                    !isHidden
                );


            languageToggle.setAttribute(
                "aria-expanded",
                String(
                    Boolean(
                        isHidden
                    )
                )
            );
        }
    );


document.addEventListener(
    "click",
    event => {

        const uiButton =
            event.target
                .closest(
                    "[data-ui-lang]"
                );


        if (uiButton) {
            event.preventDefault();
            event.stopPropagation();


            window.RGS
                .i18n
                .setLanguage(
                    uiButton.dataset
                        .uiLang
                );


            languageMenu
                ?.classList
                .add(
                    "hidden"
                );


            languageToggle
                ?.setAttribute(
                    "aria-expanded",
                    "false"
                );


            return;
        }


        const googleButton =
            event.target
                .closest(
                    "[data-google-lang]"
                );


        if (googleButton) {
            event.preventDefault();
            event.stopPropagation();


            abrirGoogleTranslate(
                googleButton.dataset
                    .googleLang
            );


            languageMenu
                ?.classList
                .add(
                    "hidden"
                );


            languageToggle
                ?.setAttribute(
                    "aria-expanded",
                    "false"
                );


            return;
        }


        if (
            !event.target
                .closest(
                    ".language-control"
                )
        ) {
            languageMenu
                ?.classList
                .add(
                    "hidden"
                );


            languageToggle
                ?.setAttribute(
                    "aria-expanded",
                    "false"
                );
        }
    }
);


// ======================================================
// GOOGLE TRANSLATE EXTERNE
// ======================================================

function abrirGoogleTranslate(
    targetLanguage =
        "auto"
) {
    const local =
        location.hostname ===
            "127.0.0.1"
        ||
        location.hostname ===
            "localhost"
        ||
        location.protocol ===
            "file:";


    const url =
        local
            ?
            `https://translate.google.com/?sl=auto&tl=${encodeURIComponent(
                targetLanguage
            )}&op=websites`
            :
            `https://translate.google.com/translate?sl=auto&tl=${encodeURIComponent(
                targetLanguage
            )}&u=${encodeURIComponent(
                location.href
            )}`;


    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );


    window.RGS
        ?.showToast
        ?.(
            local
                ?
                "Google Translate se abre aparte. Una dirección localhost no puede traducirse automáticamente desde Internet."
                :
                "Google Translate se ha abierto en otra pestaña.",
            "info",
            3900
        );
}


googleTranslateMore
    ?.addEventListener(
        "click",
        event => {
            event.preventDefault();
            event.stopPropagation();


            abrirGoogleTranslate(
                "auto"
            );


            languageMenu
                ?.classList
                .add(
                    "hidden"
                );
        }
    );


// ======================================================
// SYNCHRONISATION ENTRE ONGLETS
// ======================================================

window.addEventListener(
    "storage",
    event => {
        if (
            event.key ===
                RGS_LANGUAGE_STORAGE_KEY
            &&
            event.newValue
        ) {
            window.RGS
                .i18n
                .setLanguage(
                    event.newValue,
                    {
                        persist:
                            false,

                        toast:
                            false
                    }
                );
        }
    }
);


// ======================================================
// INITIALISATION
// ======================================================

if (
    document.readyState ===
    "loading"
) {
    document.addEventListener(
        "DOMContentLoaded",
        () => {
            window.RGS
                .i18n
                .init();
        },
        {
            once:
                true
        }
    );
}
else {
    window.RGS
        .i18n
        .init();
}

