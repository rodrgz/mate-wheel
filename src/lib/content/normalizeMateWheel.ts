import {
  normalizeMateWheel as normalizeMateWheelRuntime,
  toDescriptorIndex as toDescriptorIndexRuntime,
  toSunburstTree as toSunburstTreeRuntime
} from './normalizeMateWheel.js';

export interface StyleDefinition {
  id: string;
  label: string;
  shortLabel?: string;
  description: string;
}

export interface DescriptorIndexItem {
  id: string;
  label: string;
  familyId: string;
  polarity?: 'positive' | 'contextual' | 'defect';
  styles: string[];
  aliases?: string[];
  tooltip?: string;
  notes?: string;
  isFamily?: boolean;
}

export interface SunburstNode {
  id: string;
  name: string;
  value?: number;
  itemStyle?: { color: string };
  children?: SunburstNode[];
  meta?: {
    polarity?: 'positive' | 'contextual' | 'defect';
    styles?: string[];
    intensityRange?: [number, number];
    tooltip?: string;
  };
}

export interface NormalizedMateWheel {
  sunburst: SunburstNode;
  descriptorIndex: Record<string, DescriptorIndexItem>;
  styles: StyleDefinition[];
}

export const normalizeMateWheel: (source: unknown) => NormalizedMateWheel = normalizeMateWheelRuntime;
export const toSunburstTree: (model: NormalizedMateWheel) => SunburstNode = toSunburstTreeRuntime;
export const toDescriptorIndex: (model: NormalizedMateWheel) => DescriptorIndexItem[] = toDescriptorIndexRuntime;
