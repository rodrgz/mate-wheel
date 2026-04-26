import type { EChartsType } from 'echarts/core';
import {
  chartEvents,
  type ChartMode
} from '../ui/chartContract';

export type RootResettableChart = ChartMode;

export interface ChartNode {
  id: string;
  name?: string;
  value?: number;
  itemStyle?: {
    color?: string;
    opacity?: number;
  };
  children?: ChartNode[];
  meta?: {
    styles?: string[];
  };
}

export function getInitialTheme(): 'dark' | 'light' {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export function buildPalette(children: Array<{ itemStyle?: { color?: string } }>): string[] {
  return children.map((child) => child.itemStyle?.color || '#333');
}

export function stripItemStyles<T extends ChartNode>(nodes: T[]): T[] {
  return nodes.map((node) => {
    const { itemStyle, ...rest } = node;
    const nextNode = { ...rest } as T;
    if (node.children) {
      nextNode.children = stripItemStyles(node.children) as T['children'];
    }
    return nextNode;
  });
}

export function bindNodeSelection(chart: EChartsType, clearDelay = 100): void {
  let clearTimer: number | undefined;

  const emitSelection = (params: { data?: { id?: string } }) => {
    if (!params.data?.id) {
      return;
    }

    clearTimeout(clearTimer);
    window.dispatchEvent(new CustomEvent(chartEvents.wheelNodeSelected, {
      detail: { id: params.data.id }
    }));
  };

  chart.on('click', emitSelection as any);
  chart.on('mouseover', emitSelection as any);
  chart.on('mouseout', () => {
    clearTimer = window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent(chartEvents.wheelNodeCleared));
    }, clearDelay);
  });
}

export function bindResize(getChart: () => EChartsType, container: HTMLElement): ResizeObserver {
  const resizeObserver = new ResizeObserver(() => {
    getChart().resize();
  });
  resizeObserver.observe(container);
  return resizeObserver;
}

export function emitChartRootState(type: RootResettableChart, atRoot: boolean): void {
  window.dispatchEvent(new CustomEvent(chartEvents.chartRootStateChanged, {
    detail: { type, atRoot }
  }));
}

export function buildStyleFilteredTree(
  nodes: ChartNode[],
  styleId: string | undefined,
  dimOpacity: number
): ChartNode[] {
  const matchesStyle = (node: ChartNode): boolean => {
    if (!node.children || node.children.length === 0) {
      return Boolean(node.meta?.styles?.includes(styleId || ''));
    }

    return node.children.some(matchesStyle);
  };

  const updateNode = (node: ChartNode): ChartNode => {
    const nextNode: ChartNode = {
      ...node,
      itemStyle: node.itemStyle ? { ...node.itemStyle } : {}
    };

    if (!styleId) {
      delete nextNode.itemStyle?.opacity;
    } else if (!node.children || node.children.length === 0) {
      const hasStyle = node.meta?.styles?.includes(styleId);
      nextNode.itemStyle!.opacity = hasStyle ? 1 : dimOpacity;
    } else {
      nextNode.itemStyle!.opacity = matchesStyle(node) ? 1 : dimOpacity;
    }

    if (node.children) {
      nextNode.children = node.children.map(updateNode);
    }

    return nextNode;
  };

  return nodes.map(updateNode);
}
