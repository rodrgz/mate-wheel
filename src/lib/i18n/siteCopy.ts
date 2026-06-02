export type Locale = 'pt' | 'en' | 'es';

export const siteMeta = {
  siteUrl: 'https://rodrgz.github.io',
  basePath: '/mate-wheel',
  contactEmail: 'mate@rodgz.com',
  contributors: ['Erik Rodriguez'],
} as const;

export const siteCopy = {
  pt: {
    title: 'Mate em Roda',
    subtitle: 'um mapa sensorial colaborativo da erva-mate',
    description: 'Roda sensorial interativa da erva-mate com léxico de descritores, guia de análise sensorial e referencial de degustação. Ferramenta aberta e colaborativa para chimarrão, tereré e mate.',
    ogDescription: 'Roda sensorial interativa da erva-mate: descritores, análise sensorial e degustação de chimarrão, tereré e mate.',
    filterTitle: 'Filtro: Todos os Estilos',
    footer: 'Mate em Roda Beta - Ferramenta Exploratória de Análise Sensorial',
    codeLicensedUnder: 'Código licenciado sob',
    contentTaxonomyLicensedUnder: 'Conteúdo e Taxonomia licenciados sob',
    commercialUseNotice: 'O uso comercial da taxonomia e visualização requer autorização prévia.',
    contactLabel: 'Contato:',
    contributorsLabel: 'Colaboradores:',
    skipLinkLabel: 'Pular para o conteúdo principal',
    languageSwitcherLabel: 'Selecionar idioma',
    themeToggleLabel: 'Alternar tema de cores',
    toggleChart: 'Clique para alternar entre Roda e Árvore',
    resetChartRoot: 'Voltar à raiz',
    treeZoomHint: 'Zoom: Ctrl + scroll no desktop; pinça no touch'
  },
  en: {
    title: 'Mate em Roda',
    subtitle: 'an open sensory map for yerba mate',
    description: 'Interactive yerba mate sensory wheel with a descriptor lexicon, sensory analysis guide, and tasting reference. An open, collaborative tool for chimarrão, tereré, and mate.',
    ogDescription: 'Interactive yerba mate sensory wheel: descriptors, sensory analysis and tasting guide for chimarrão, tereré and mate.',
    filterTitle: 'Filter: All Styles',
    footer: 'Mate em Roda Beta - Exploratory Sensory Analysis Tool',
    codeLicensedUnder: 'Code licensed under',
    contentTaxonomyLicensedUnder: 'Content and Taxonomy licensed under',
    commercialUseNotice: 'Commercial use of the taxonomy and visualization requires prior authorization.',
    contactLabel: 'Contact:',
    contributorsLabel: 'Contributors:',
    skipLinkLabel: 'Skip to main content',
    languageSwitcherLabel: 'Select language',
    themeToggleLabel: 'Toggle color theme',
    toggleChart: 'Click to toggle between Wheel and Tree',
    resetChartRoot: 'Back to root',
    treeZoomHint: 'Zoom: Ctrl + scroll on desktop; pinch on touch'
  },
  es: {
    title: 'Mate em Roda',
    subtitle: 'un mapa sensorial abierto de la yerba mate',
    description: 'Rueda sensorial interactiva de la yerba mate con léxico de descriptores, guía de análisis sensorial y referencial de degustación. Herramienta abierta y colaborativa para chimarrão, tereré y mate.',
    ogDescription: 'Rueda sensorial interactiva de la yerba mate: descriptores, análisis sensorial y degustación de chimarrão, tereré y mate.',
    filterTitle: 'Filtro: Todos los Estilos',
    footer: 'Mate em Roda Beta - Herramienta Exploratoria de Análisis Sensorial',
    codeLicensedUnder: 'Código licenciado bajo',
    contentTaxonomyLicensedUnder: 'Contenido y Taxonomía licenciados bajo',
    commercialUseNotice: 'El uso comercial de la taxonomía y la visualización requiere autorización previa.',
    contactLabel: 'Contacto:',
    contributorsLabel: 'Colaboradores:',
    skipLinkLabel: 'Saltar al contenido principal',
    languageSwitcherLabel: 'Seleccionar idioma',
    themeToggleLabel: 'Alternar tema de color',
    toggleChart: 'Clique para alternar entre Rueda y Árbol',
    resetChartRoot: 'Volver a la raíz',
    treeZoomHint: 'Zoom: Ctrl + scroll en escritorio; pinza en touch'
  }
} as const;

export const panelCopy = {
  pt: {
    empty: 'Clique em uma família ou descritor na roda para ver os detalhes.',
    select: 'Selecione um item',
    alsoKnown: 'Também descrito como:',
    domainsLabel: 'Domínio perceptivo:',
    polarities: {
      positive: 'Positivo',
      contextual: 'Contextual',
      defect: 'Defeito'
    },
    domains: {
      aroma: 'Aroma',
      taste: 'Gosto',
      flavor: 'Sabor / retro-olfato',
      trigeminal: 'Trigeminal',
      structure: 'Estrutura',
      defect: 'Defeito'
    }
  },
  en: {
    empty: 'Click on a family or descriptor on the wheel to see details.',
    select: 'Select an item',
    alsoKnown: 'Also known as:',
    domainsLabel: 'Perceptual domain:',
    polarities: {
      positive: 'Positive',
      contextual: 'Contextual',
      defect: 'Defect'
    },
    domains: {
      aroma: 'Aroma',
      taste: 'Taste',
      flavor: 'Flavor / retronasal',
      trigeminal: 'Trigeminal',
      structure: 'Structure',
      defect: 'Defect'
    }
  },
  es: {
    empty: 'Haga clic en una familia o descriptor en la rueda para ver detalles.',
    select: 'Seleccione un artículo',
    alsoKnown: 'También conocido como:',
    domainsLabel: 'Dominio perceptivo:',
    polarities: {
      positive: 'Positivo',
      contextual: 'Contextual',
      defect: 'Defecto'
    },
    domains: {
      aroma: 'Aroma',
      taste: 'Gusto',
      flavor: 'Sabor / retronasal',
      trigeminal: 'Trigeminal',
      structure: 'Estructura',
      defect: 'Defecto'
    }
  }
} as const;
