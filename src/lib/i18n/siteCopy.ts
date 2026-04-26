export type Locale = 'pt' | 'en' | 'es';

export const siteCopy = {
  pt: {
    title: 'Mate em Roda',
    subtitle: 'um mapa sensorial aberto da erva-mate',
    refTitle: 'Guia Sensorial',
    filterTitle: 'Filtro: Todos os Estilos',
    footer: 'Mate em Roda V1 - Ferramenta Exploratória de Análise Sensorial',
    toggleChart: 'Clique para alternar entre Roda e Árvore',
    treeZoomHint: 'Use o scroll do mouse para Zoom In/Out',
    aboutTitle: 'Sobre o Projeto',
    aboutP1:
      'Este projeto colaborativo nasceu com o objetivo simples de reunir e organizar os achados empíricos de minhas explorações sensoriais diárias com a erva-mate (Erik), aproveitando analogias e métodos comuns da degustação de cafés e cervejas.',
    aboutP2: 'Hoje, o projeto se divide em duas partes de consulta:',
    aboutWheel:
      '<strong>A Roda Sensorial (acima):</strong> Um mapa visual para explorar as famílias e descrições aromáticas.',
    aboutGuide:
      '<strong>O Guia Sensorial (abaixo):</strong> Um vocabulário de apoio textual aprofundado, cobrindo métodos, processos e texturas.',
    aboutP3:
      "Nada aqui busca substituir a experiência de um sommelier ou especialista, mas sim valorizar seu trabalho de forma aberta construindo conhecimento coletivo. Você pode sugerir novas notas ou correções abrindo uma <a href='https://github.com/rodrgz/mate-wheel/issues' target='_blank'>issue no GitHub</a> ou por e-mail."
  },
  en: {
    title: 'Mate em Roda',
    subtitle: 'an open sensory map for yerba mate',
    refTitle: 'Sensory Guide',
    filterTitle: 'Filter: All Styles',
    footer: 'Mate em Roda V1 - Exploratory Sensory Analysis Tool',
    toggleChart: 'Click to toggle between Wheel and Tree',
    treeZoomHint: 'Use mouse scroll for Zoom In/Out',
    aboutTitle: 'About the Project',
    aboutP1:
      'This collaborative project started with a simple goal: to gather and organize my empirical findings from daily sensory explorations with yerba mate (Erik), drawing analogies from coffee and beer tasting methods.',
    aboutP2: 'Today, the project is divided into two main reference tools:',
    aboutWheel:
      '<strong>The Sensory Wheel (above):</strong> A visual map to explore aromatic families and descriptors.',
    aboutGuide:
      '<strong>The Sensory Guide (below):</strong> An in-depth textual supporting vocabulary covering methods, processes, and textures.',
    aboutP3:
      "Nothing here replaces the experience of a sommelier or specialist; instead, the aim is to build open, collective knowledge. You can suggest new notes or corrections by opening a <a href='https://github.com/rodrgz/mate-wheel/issues' target='_blank'>GitHub issue</a> or via email."
  },
  es: {
    title: 'Mate em Roda',
    subtitle: 'un mapa sensorial abierto de la yerba mate',
    refTitle: 'Guía Sensorial',
    filterTitle: 'Filtro: Todos los Estilos',
    footer: 'Mate em Roda V1 - Herramienta Exploratoria de Análisis Sensorial',
    toggleChart: 'Clique para alternar entre Rueda y Árbol',
    treeZoomHint: 'Use el scroll del ratón para Zoom In/Out',
    aboutTitle: 'Sobre el Proyecto',
    aboutP1:
      'Este proyecto colaborativo nació con el objetivo de reunir y organizar mis hallazgos empíricos de exploraciones sensoriales diarias con la yerba mate (Erik), aprovechando analogías y métodos de la cata de café y cerveza.',
    aboutP2: 'Hoy, el proyecto se divide en dos herramientas de consulta:',
    aboutWheel:
      '<strong>La Rueda Sensorial (arriba):</strong> Un mapa visual para explorar familias y descripciones aromáticas.',
    aboutGuide:
      '<strong>La Guía Sensorial (abajo):</strong> Un vocabulario textual de apoyo detallado que cubre métodos, procesos y texturas.',
    aboutP3:
      "Nada aquí busca sustituir la experiencia de un sommelier o especialista, sino construir conocimiento colectivo y abierto. Puedes sugerir nuevas notas o correcciones abriendo un <a href='https://github.com/rodrgz/mate-wheel/issues' target='_blank'>issue en GitHub</a> o por correo electrónico."
  }
} as const;

export const panelCopy = {
  pt: {
    empty: 'Clique em uma família ou descritor na roda para ver os detalhes.',
    select: 'Selecione um item',
    typicalCode: 'Mais típico em:',
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
    typicalCode: 'Most typical in:',
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
    typicalCode: 'Más típico en:',
    alsoKnown: 'También conocido como:',
    polarities: {
      positive: 'Positivo',
      contextual: 'Contextual',
      defect: 'Defecto'
    }
  }
} as const;
