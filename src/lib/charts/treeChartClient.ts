import type { EChartsType } from 'echarts/core';
import {
  chartEvents,
  chartIds,
  type ChartTypeChangedDetail,
  type StyleFilterChangedDetail,
  type ThemeChangedDetail,
  type ThemeMode,
  type TreeDeferredState
} from '../ui/chartContract';
import {
  bindNodeSelection,
  bindResize,
  buildStyleFilteredTree,
  emitChartRootState,
  getInitialTheme,
  stripItemStyles,
  type ChartNode
} from './mateWheelChart';

type TreeRuntimeModule = typeof import('./echartsRuntimeTree');

let activeStyleId: string | undefined;
const collapsedNodeIds = new Set<string>();
let activeTheme: ThemeMode = getInitialTheme();
let chart: EChartsType | undefined;
let resizeObserver: ResizeObserver | undefined;
let runtimePromise: Promise<TreeRuntimeModule> | undefined;
let listenersBound = false;
let container: HTMLDivElement | undefined;
let cleanData: { name: string; children: ChartNode[] } | undefined;
const colorMap: Record<string, string> = {};

const isMobileViewport = () => window.matchMedia('(max-width: 900px)').matches;

const getChartWrapper = (): HTMLElement | null => document.getElementById(chartIds.chartTreemapWrapper);

const getDataElement = (): HTMLElement | null => document.getElementById(chartIds.chartTreeData);

const createTreeHost = (wrapper: HTMLElement): HTMLDivElement => {
  const existingContainer = wrapper.querySelector(`#${chartIds.chartTree}`);
  if (existingContainer instanceof HTMLDivElement) {
    return existingContainer;
  }

  const nextContainer = document.createElement('div');
  nextContainer.id = chartIds.chartTree;
  nextContainer.className = 'chart-container chart-shell';
  wrapper.appendChild(nextContainer);
  return nextContainer;
};

const ensureContainer = (): HTMLDivElement | undefined => {
  const wrapper = getChartWrapper();

  if (!(wrapper instanceof HTMLElement)) {
    return;
  }

  container = createTreeHost(wrapper);
  return container;
};

const buildColorMap = (node: any, inheritedColor?: string) => {
  const color = node.itemStyle?.color || inheritedColor;
  if (color) {
    colorMap[node.id] = color;
  }
  if (node.children) {
    node.children.forEach((child: any) => buildColorMap(child, color));
  }
};

const ensureDataLoaded = (): boolean => {
  if (cleanData) {
    return true;
  }

  const dataElement = getDataElement();
  if (!dataElement) {
    return false;
  }

  const rawData = dataElement instanceof HTMLTemplateElement
    ? dataElement.content.textContent
    : dataElement.textContent;
  const chartData = JSON.parse(rawData || '{}');

  chartData.children ??= [];
  chartData.children.forEach((child: any) => buildColorMap(child));

  cleanData = {
    name: 'Mate',
    children: stripItemStyles(chartData.children || []) as ChartNode[]
  };

  return true;
};

const applyCollapsedState = (nodes: any[]): any[] =>
  nodes.map((node) => {
    const nextNode = {
      ...node
    };

    if (node.children) {
      nextNode.children = applyCollapsedState(node.children);
      nextNode.collapsed = collapsedNodeIds.has(node.id);
    }

    return nextNode;
  });

const getDisplayedTreeData = () => {
  const styledChildren = buildStyleFilteredTree(cleanData?.children || [], activeStyleId, 0.15);
  return {
    name: cleanData?.name || 'Mate',
    children: applyCollapsedState(styledChildren)
  };
};

const emitRootState = () => {
  emitChartRootState('treemap', collapsedNodeIds.size === 0);
};

const loadRuntime = async () => {
  runtimePromise ??= import('./echartsRuntimeTree');
  return runtimePromise;
};

const getOption = (theme: ThemeMode) => ({
  backgroundColor: 'transparent',
  aria: {
    show: true,
    enabled: true,
    decal: {
      show: false
    }
  },
  tooltip: {
    trigger: 'item',
    renderMode: 'richText',
    confine: true,
    formatter: '{b}'
  },
  series: {
    type: 'tree',
    data: [getDisplayedTreeData()],
    layout: 'orthogonal',
    orient: 'LR',
    symbol: 'circle',
    symbolSize: 8,
    initialTreeDepth: -1,
    left: '10%',
    right: '18%',
    top: '5%',
    bottom: '5%',
    animationDurationUpdate: 750,
    emphasis: {
      focus: 'ancestor'
    },
    label: {
      position: 'left',
      verticalAlign: 'middle',
      align: 'right',
      fontSize: 10,
      color: theme === 'dark' ? '#cbd5e1' : '#334155'
    },
    leaves: {
      label: {
        position: 'right',
        verticalAlign: 'middle',
        align: 'left',
        fontSize: 10,
        color: theme === 'dark' ? '#94a3b8' : '#64748b'
      }
    },
    itemStyle: {
      color: (params: any) => colorMap[params.data?.id] || '#999',
      borderWidth: 0
    },
    lineStyle: {
      width: 1.5,
      curveness: 0.5,
      color: theme === 'dark' ? '#475569' : '#cbd5e1'
    },
    expandAndCollapse: true,
    roam: isMobileViewport() ? 'scale' : true,
    zoomOnMouseWheel: 'ctrl',
    moveOnMouseWheel: false
  }
});

const bindRootTracking = () => {
  chart?.on('click', (params: any) => {
    if (params?.seriesType !== 'tree' || !params.data?.id || !params.data.children?.length) {
      return;
    }

    if (collapsedNodeIds.has(params.data.id)) {
      collapsedNodeIds.delete(params.data.id);
    } else {
      collapsedNodeIds.add(params.data.id);
    }

    emitRootState();
  });
};

const ensureChart = async (): Promise<EChartsType | undefined> => {
  const target = ensureContainer();
  if (!target || !ensureDataLoaded()) {
    return;
  }

  if (chart) {
    return chart;
  }

  const { initEcharts } = await loadRuntime();
  chart = initEcharts(target, activeTheme === 'dark' ? 'dark' : undefined);
  chart.setOption(getOption(activeTheme));
  bindNodeSelection(chart);
  bindRootTracking();
  resizeObserver ??= bindResize(() => chart as EChartsType, target);
  emitRootState();
  return chart;
};

const renderChart = async (theme: ThemeMode) => {
  activeTheme = theme;

  if (chart) {
    chart.dispose();
    chart = undefined;
  }

  await ensureChart();
};

const isChartVisible = () => {
  const wrapper = getChartWrapper();

  if (!(wrapper instanceof HTMLElement)) {
    return false;
  }

  return !wrapper.hidden;
};

const registerEventListeners = () => {
  if (listenersBound) {
    return;
  }

  window.addEventListener(chartEvents.styleFilterChanged, ((event: CustomEvent<StyleFilterChangedDetail>) => {
    activeStyleId = event.detail.styleId;

    chart?.setOption({
      series: {
        data: [getDisplayedTreeData()]
      }
    });
  }) as EventListener);

  window.addEventListener(chartEvents.chartResetToRootRequested, ((event: CustomEvent<ChartTypeChangedDetail>) => {
    if (event.detail.type !== 'treemap') {
      return;
    }

    collapsedNodeIds.clear();

    if (chart) {
      void renderChart(activeTheme);
      return;
    }

    emitRootState();
  }) as EventListener);

  window.addEventListener(chartEvents.themeChanged, ((event: CustomEvent<ThemeChangedDetail>) => {
    activeTheme = event.detail.theme;

    if (chart) {
      void renderChart(activeTheme);
    }
  }) as EventListener);

  window.addEventListener(chartEvents.chartTypeChanged, ((event: CustomEvent<ChartTypeChangedDetail>) => {
    if (event.detail.type !== 'treemap') {
      return;
    }

    void ensureChart().then(() => {
      if (chart && isChartVisible()) {
        window.setTimeout(() => chart?.resize(), 50);
      }
    });
  }) as EventListener);

  listenersBound = true;
};

export async function mountTreeChart(state: TreeDeferredState): Promise<void> {
  activeTheme = state.theme;
  activeStyleId = state.styleId;

  if (state.shouldResetToRoot) {
    collapsedNodeIds.clear();
  }

  registerEventListeners();
  await ensureChart();

  if (chart && isChartVisible()) {
    chart.resize();
  }
}