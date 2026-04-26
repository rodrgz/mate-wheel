export type ChartMode = 'sunburst' | 'treemap';

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
  const { buttonId = 'theme-toggle' } = options;
  const button = document.getElementById(buttonId);

  if (!(button instanceof HTMLButtonElement)) {
    return;
  }

  button.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    window.dispatchEvent(new CustomEvent('theme-changed', {
      detail: { theme: isDark ? 'dark' : 'light' }
    }));
  });
}

export function setupChartToggle(options: ChartToggleOptions = {}): void {
  const {
    buttonId = 'chart-toggle',
    resetButtonId = 'chart-reset-root',
    sunburstWrapperId = 'chart-sunburst-wrapper',
    treemapWrapperId = 'chart-treemap-wrapper',
    iconToTreeId = 'icon-to-tree',
    iconToWheelId = 'icon-to-wheel',
    zoomIndicatorId = 'tree-zoom-indicator',
    storageKey = 'mate-wheel-chart-type'
  } = options;

  const chartToggle = document.getElementById(buttonId);
  const rootResetButton = document.getElementById(resetButtonId);
  const sunburstWrapper = document.getElementById(sunburstWrapperId);
  const treemapWrapper = document.getElementById(treemapWrapperId);
  const iconToTree = document.getElementById(iconToTreeId);
  const iconToWheel = document.getElementById(iconToWheelId);
  const treeZoomIndicator = document.getElementById(zoomIndicatorId);

  if (!(chartToggle instanceof HTMLButtonElement) || !sunburstWrapper || !treemapWrapper) {
    return;
  }

  let currentType: ChartMode = localStorage.getItem(storageKey) === 'treemap' ? 'treemap' : 'sunburst';
  const atRootByType: Record<ChartMode, boolean> = {
    sunburst: true,
    treemap: true
  };

  const updateRootResetVisibility = () => {
    if (rootResetButton instanceof HTMLButtonElement) {
      rootResetButton.hidden = atRootByType[currentType];
    }
  };

  const updateVisibility = (type: ChartMode) => {
    const isTree = type === 'treemap';
    sunburstWrapper.style.display = isTree ? 'none' : 'block';
    treemapWrapper.style.display = isTree ? 'block' : 'none';

    if (iconToTree) iconToTree.style.display = isTree ? 'none' : 'block';
    if (iconToWheel) iconToWheel.style.display = isTree ? 'block' : 'none';
    if (treeZoomIndicator) {
      treeZoomIndicator.classList.toggle('visible', isTree);
    }

    updateRootResetVisibility();

    window.dispatchEvent(new CustomEvent('chart-type-changed', {
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
      window.dispatchEvent(new CustomEvent('chart-reset-to-root-requested', {
        detail: { type: currentType }
      }));
    });
  }

  window.addEventListener('chart-root-state-changed', ((event: CustomEvent<{ type: ChartMode; atRoot: boolean }>) => {
    atRootByType[event.detail.type] = event.detail.atRoot;
    updateRootResetVisibility();
  }) as EventListener);
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
      targetElement?.scrollIntoView({ behavior: 'smooth' });
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
