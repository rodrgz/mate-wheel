import {
  chartEvents,
  chartIds,
  chartSelectors,
  chartStorageKeys,
  getChartElementById,
  type ChartMode,
  type ChartRootStateChangedDetail,
  type StyleFilterChangedDetail,
  type ThemeChangedDetail,
  type ThemeMode
} from './chartContract';

export type { ChartMode } from './chartContract';

interface ThemeToggleOptions {
  buttonId?: string;
}

interface ChartToggleOptions {
  buttonId?: string;
  resetButtonId?: string;
  sunburstWrapperId?: string;
  treemapWrapperId?: string;
  iconToTreeId?: string;
  iconToWheelId?: string;
  zoomIndicatorId?: string;
  storageKey?: string;
}

export function setupThemeToggle(options: ThemeToggleOptions = {}): void {
  const { buttonId = chartIds.themeToggle } = options;
  const button = getChartElementById(buttonId);

  if (!(button instanceof HTMLButtonElement)) {
    return;
  }

  const updatePressedState = (isDark: boolean) => {
    button.setAttribute('aria-pressed', String(isDark));
  };

  updatePressedState(document.documentElement.classList.contains('dark'));

  button.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    const theme: ThemeMode = isDark ? 'dark' : 'light';
    localStorage.setItem(chartStorageKeys.theme, theme);
    updatePressedState(isDark);

    window.dispatchEvent(new CustomEvent(chartEvents.themeChanged, {
      detail: { theme }
    }));
  });
}

export function setupChartToggle(options: ChartToggleOptions = {}): void {
  const {
    buttonId = chartIds.chartToggle,
    resetButtonId = chartIds.chartResetRoot,
    sunburstWrapperId = chartIds.chartSunburstWrapper,
    treemapWrapperId = chartIds.chartTreemapWrapper,
    iconToTreeId = chartIds.iconToTree,
    iconToWheelId = chartIds.iconToWheel,
    zoomIndicatorId = chartIds.treeZoomIndicator,
    storageKey = chartStorageKeys.mode
  } = options;

  const chartToggle = getChartElementById(buttonId);
  const rootResetButton = getChartElementById(resetButtonId);
  const sunburstWrapper = getChartElementById(sunburstWrapperId);
  const treemapWrapper = getChartElementById(treemapWrapperId);
  const iconToTree = getChartElementById(iconToTreeId);
  const iconToWheel = getChartElementById(iconToWheelId);
  const treeZoomIndicator = getChartElementById(zoomIndicatorId);

  if (!(chartToggle instanceof HTMLButtonElement) || !sunburstWrapper || !treemapWrapper) {
    return;
  }

  const deferredTreeState = {
    theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
    shouldResetToRoot: false
  } as {
    theme: ThemeMode;
    styleId?: string;
    shouldResetToRoot: boolean;
  };
  let currentType: ChartMode = localStorage.getItem(storageKey) === 'treemap' ? 'treemap' : 'sunburst';
  let treeChartMounted = false;
  let treeChartModulePromise: Promise<typeof import('../charts/treeChartClient')> | undefined;
  const atRootByType: Record<ChartMode, boolean> = {
    sunburst: true,
    treemap: true
  };

  const ensureTreeChartReady = async (): Promise<void> => {
    treeChartModulePromise ??= import('../charts/treeChartClient');
    const { mountTreeChart } = await treeChartModulePromise;
    await mountTreeChart({ ...deferredTreeState });
    deferredTreeState.shouldResetToRoot = false;
    treeChartMounted = true;
  };

  const updateRootResetVisibility = () => {
    if (rootResetButton instanceof HTMLButtonElement) {
      rootResetButton.hidden = atRootByType[currentType];
    }
  };

  const updateVisibility = (type: ChartMode) => {
    const isTree = type === 'treemap';
    sunburstWrapper.hidden = isTree;
    treemapWrapper.hidden = !isTree;
    chartToggle.setAttribute('aria-pressed', String(isTree));

    if (isTree) {
      void ensureTreeChartReady();
    }

    if (iconToTree) iconToTree.hidden = isTree;
    if (iconToWheel) iconToWheel.hidden = !isTree;
    if (treeZoomIndicator) {
      treeZoomIndicator.classList.toggle('visible', isTree);
    }

    updateRootResetVisibility();

    window.dispatchEvent(new CustomEvent(chartEvents.chartTypeChanged, {
      detail: { type }
    }));
  };

  updateVisibility(currentType === 'treemap' ? 'treemap' : 'sunburst');

  chartToggle.addEventListener('click', () => {
    currentType = currentType === 'sunburst' ? 'treemap' : 'sunburst';
    localStorage.setItem(storageKey, currentType);
    updateVisibility(currentType);
  });

  if (rootResetButton instanceof HTMLButtonElement) {
    rootResetButton.addEventListener('click', () => {
      if (currentType === 'treemap' && !treeChartMounted) {
        deferredTreeState.shouldResetToRoot = true;
        void ensureTreeChartReady();
      }

      window.dispatchEvent(new CustomEvent(chartEvents.chartResetToRootRequested, {
        detail: { type: currentType }
      }));
    });
  }

  window.addEventListener(chartEvents.chartRootStateChanged, ((event: CustomEvent<ChartRootStateChangedDetail>) => {
    atRootByType[event.detail.type] = event.detail.atRoot;
    updateRootResetVisibility();
  }) as EventListener);

  window.addEventListener(chartEvents.themeChanged, ((event: CustomEvent<ThemeChangedDetail>) => {
    deferredTreeState.theme = event.detail.theme;
  }) as EventListener);

  window.addEventListener(chartEvents.styleFilterChanged, ((event: CustomEvent<StyleFilterChangedDetail>) => {
    deferredTreeState.styleId = event.detail.styleId;
  }) as EventListener);
}

export function setupChartControlsHintPeek(selector = chartSelectors.chartControls, duration = 2600): void {
  const chartControls = document.querySelector(selector);

  if (!(chartControls instanceof HTMLElement)) {
    return;
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  chartControls.classList.add('hint-peek');
  window.setTimeout(() => {
    chartControls.classList.remove('hint-peek');
  }, duration);
}

export function setupInternalLinkScroll(selector = 'a[href^="#"]'): void {
  document.querySelectorAll(selector).forEach((anchor) => {
    anchor.addEventListener('click', function (this: HTMLAnchorElement, event: Event) {
      event.preventDefault();
      const targetId = this.getAttribute('href')?.slice(1);
      if (!targetId) {
        return;
      }

      const targetElement = document.getElementById(targetId);
      const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
      targetElement?.scrollIntoView({ behavior });
    });
  });
}

export function setupScrollableReferenceTables(selector = '.reference-content table'): void {
  document.querySelectorAll(selector).forEach((table) => {
    if (!(table instanceof HTMLTableElement) || table.parentElement?.classList.contains('reference-table-scroll')) {
      return;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'reference-table-scroll';
    table.parentNode?.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });
}
