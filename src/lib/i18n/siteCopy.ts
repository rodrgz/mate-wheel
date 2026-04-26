export type Locale = 'pt' | 'en' | 'es';

export const siteCopy = {
  pt: {
    title: 'Mate em Roda',
    subtitle: 'um mapa sensorial aberto da erva-mate',
    refTitle: 'Guia Sensorial',
    filterTitle: 'Filtro: Todos os Estilos',
    footer: 'Mate em Roda V1 - Ferramenta Exploratória de Análise Sensorial',
    skipLinkLabel: 'Pular para o conteúdo principal',
    languageSwitcherLabel: 'Selecionar idioma',
    themeToggleLabel: 'Alternar tema de cores',
    githubRepoLabel: 'Repositório no GitHub',
    toggleChart: 'Clique para alternar entre Roda e Árvore',
    resetChartRoot: 'Voltar à raiz',
    treeZoomHint: 'Zoom: Ctrl + scroll no desktop; pinça no touch',
    aboutTitle: 'Sobre o Projeto',
    aboutP1:
      'Este projeto colaborativo nasceu com o objetivo simples de reunir e organizar os achados empíricos de minhas explorações sensoriais diárias com a erva-mate (Erik), aproveitando analogias e métodos comuns da degustação de cafés e cervejas.',
    aboutP2: 'Hoje, o projeto se divide em duas partes de consulta:',
    aboutWheelLabel: 'A Roda Sensorial (acima):',
    aboutWheelText: 'Um mapa visual para explorar as famílias e descrições aromáticas.',
    aboutGuideLabel: 'O Guia Sensorial (abaixo):',
    aboutGuideText: 'Um vocabulário de apoio textual aprofundado, cobrindo métodos, processos e texturas.',
    aboutClosingBeforeLink:
      'Nada aqui busca substituir a experiência de um sommelier ou especialista, mas sim valorizar seu trabalho de forma aberta construindo conhecimento coletivo. Você pode sugerir novas notas ou correções abrindo uma',
    aboutIssueLinkLabel: 'issue no GitHub',
    aboutClosingAfterLink: 'ou por e-mail.'
  },
  en: {
    title: 'Mate em Roda',
    subtitle: 'an open sensory map for yerba mate',
    refTitle: 'Sensory Guide',
    filterTitle: 'Filter: All Styles',
    footer: 'Mate em Roda V1 - Exploratory Sensory Analysis Tool',
    skipLinkLabel: 'Skip to main content',
    languageSwitcherLabel: 'Select language',
    themeToggleLabel: 'Toggle color theme',
    githubRepoLabel: 'GitHub repository',
    toggleChart: 'Click to toggle between Wheel and Tree',
    resetChartRoot: 'Back to root',
    treeZoomHint: 'Zoom: Ctrl + scroll on desktop; pinch on touch',
    aboutTitle: 'About the Project',
    aboutP1:
      'This collaborative project started with a simple goal: to gather and organize my empirical findings from daily sensory explorations with yerba mate (Erik), drawing analogies from coffee and beer tasting methods.',
    aboutP2: 'Today, the project is divided into two main reference tools:',
    aboutWheelLabel: 'The Sensory Wheel (above):',
    aboutWheelText: 'A visual map to explore aromatic families and descriptors.',
    aboutGuideLabel: 'The Sensory Guide (below):',
    aboutGuideText: 'An in-depth textual supporting vocabulary covering methods, processes, and textures.',
    aboutClosingBeforeLink:
      'Nothing here replaces the experience of a sommelier or specialist; instead, the aim is to build open, collective knowledge. You can suggest new notes or corrections by opening a',
    aboutIssueLinkLabel: 'GitHub issue',
    aboutClosingAfterLink: 'or via email.'
  },
  es: {
    title: 'Mate em Roda',
    subtitle: 'un mapa sensorial abierto de la yerba mate',
    refTitle: 'Guía Sensorial',
    filterTitle: 'Filtro: Todos los Estilos',
    footer: 'Mate em Roda V1 - Herramienta Exploratoria de Análisis Sensorial',
    skipLinkLabel: 'Saltar al contenido principal',
    languageSwitcherLabel: 'Seleccionar idioma',
    themeToggleLabel: 'Alternar tema de color',
    githubRepoLabel: 'Repositorio en GitHub',
    toggleChart: 'Clique para alternar entre Rueda y Árbol',
    resetChartRoot: 'Volver a la raíz',
    treeZoomHint: 'Zoom: Ctrl + scroll en escritorio; pinza en touch',
    aboutTitle: 'Sobre el Proyecto',
    aboutP1:
      'Este proyecto colaborativo nació con el objetivo de reunir y organizar mis hallazgos empíricos de exploraciones sensoriales diarias con la yerba mate (Erik), aprovechando analogías y métodos de la cata de café y cerveza.',
    aboutP2: 'Hoy, el proyecto se divide en dos herramientas de consulta:',
    aboutWheelLabel: 'La Rueda Sensorial (arriba):',
    aboutWheelText: 'Un mapa visual para explorar familias y descripciones aromáticas.',
    aboutGuideLabel: 'La Guía Sensorial (abajo):',
    aboutGuideText: 'Un vocabulario textual de apoyo detallado que cubre métodos, procesos y texturas.',
    aboutClosingBeforeLink:
      'Nada aquí busca sustituir la experiencia de un sommelier o especialista, sino construir conocimiento colectivo y abierto. Puedes sugerir nuevas notas o correcciones abriendo un',
    aboutIssueLinkLabel: 'issue en GitHub',
    aboutClosingAfterLink: 'o por correo electrónico.'
  }
} as const;

export const panelCopy = {
  pt: {
    empty: 'Clique em uma família ou descritor na roda para ver os detalhes.',
    select: 'Selecione um item',
    alsoKnown: 'Também descrito como:',
    polarities: {
      positive: 'Positivo',
      contextual: 'Contextual',
      defect: 'Defeito'
    }
  },
  en: {
    empty: 'Click on a family or descriptor on the wheel to see details.',
    select: 'Select an item',
    alsoKnown: 'Also known as:',
    polarities: {
      positive: 'Positive',
      contextual: 'Contextual',
      defect: 'Defect'
    }
  },
  es: {
    empty: 'Haga clic en una familia o descriptor en la rueda para ver detalles.',
    select: 'Seleccione un artículo',
    alsoKnown: 'También conocido como:',
    polarities: {
      positive: 'Positivo',
      contextual: 'Contextual',
      defect: 'Defecto'
    }
  }
} as const;
