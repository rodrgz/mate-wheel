export type ChartMode = 'sunburst' | 'treemap';
export type ThemeMode = 'dark' | 'light';

export interface ThemeChangedDetail {
  theme: ThemeMode;
}

export interface StyleFilterChangedDetail {
  styleId?: string;
}

export interface ChartTypeChangedDetail {
  type: ChartMode;
}

export interface ChartRootStateChangedDetail extends ChartTypeChangedDetail {
  atRoot: boolean;
}

export interface WheelNodeSelectedDetail {
  id: string;
}

export interface TreeDeferredState {
  theme: ThemeMode;
  styleId?: string;
  shouldResetToRoot: boolean;
}

export const chartIds = {
  themeToggle: 'theme-toggle',
  chartToggle: 'chart-toggle',
  chartResetRoot: 'chart-reset-root',
  chartSunburstWrapper: 'chart-sunburst-wrapper',
  chartTreemapWrapper: 'chart-treemap-wrapper',
  chartSunburst: 'sunburst-chart',
  chartSunburstData: 'sunburst-data',
  chartTree: 'tree-chart',
  chartTreeData: 'tree-data',
  iconToTree: 'icon-to-tree',
  iconToWheel: 'icon-to-wheel',
  treeZoomIndicator: 'tree-zoom-indicator',
  descriptorPanel: 'descriptor-panel',
  panelTitle: 'panel-title',
  panelPolarity: 'panel-polarity',
  panelMeta: 'panel-meta'
} as const;

export const chartSelectors = {
  chartControls: '.chart-controls',
  panelEmptyState: '.panel-empty-state',
  panelContent: '.panel-content',
  panelTitle: `#${chartIds.panelTitle}`,
  panelPolarity: `#${chartIds.panelPolarity}`,
  panelMeta: `#${chartIds.panelMeta}`
} as const;

export const chartStorageKeys = {
  mode: 'mate-wheel-chart-type',
  theme: 'theme'
} as const;

export const chartEvents = {
  styleFilterChanged: 'style-filter-changed',
  themeChanged: 'theme-changed',
  chartTypeChanged: 'chart-type-changed',
  chartResetToRootRequested: 'chart-reset-to-root-requested',
  chartRootStateChanged: 'chart-root-state-changed',
  wheelNodeSelected: 'wheel-node-selected',
  wheelNodeCleared: 'wheel-node-cleared'
} as const;

export function getChartElementById(id: string): HTMLElement | null {
  return document.getElementById(id);
}

export function queryChartElement(root: ParentNode, selector: string): Element | null {
  return root.querySelector(selector);
}