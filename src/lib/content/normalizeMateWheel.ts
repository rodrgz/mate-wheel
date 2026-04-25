import {
  normalizeMateWheel as normalizeMateWheelRuntime,
  toDescriptorIndex as toDescriptorIndexRuntime,
  toSunburstTree as toSunburstTreeRuntime
} from './normalizeMateWheel.js';

export type DescriptorDomain = 'aroma' | 'taste' | 'flavor' | 'trigeminal' | 'structure' | 'defect';
export type EvaluationAxisKind = 'structure' | 'judgment' | 'trigeminal';

export interface StyleDefinition {
  id: string;
  label: string;
  shortLabel?: string;
  description: string;
}

export interface CompositionCategory {
  id: string;
  label: string;
  description: string;
  howToRead?: string;
  risk?: string;
}

export interface EvaluationAxis {
  id: string;
  label: string;
  kind: EvaluationAxisKind;
  description: string;
  anchors?: string[];
  styles?: string[];
}

export interface DescriptorIndexItem {
  id: string;
  label: string;
  familyId: string;
  polarity?: 'positive' | 'contextual' | 'defect';
  styles: string[];
  domains?: DescriptorDomain[];
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
    domains?: DescriptorDomain[];
    tooltip?: string;
  };
}

export interface NormalizedMateWheel {
  sunburst: SunburstNode;
  descriptorIndex: Record<string, DescriptorIndexItem>;
  styles: StyleDefinition[];
  compositionCategories: CompositionCategory[];
  evaluationAxes: EvaluationAxis[];
}

export const normalizeMateWheel: (source: unknown) => NormalizedMateWheel = normalizeMateWheelRuntime;
export const toSunburstTree: (model: NormalizedMateWheel) => SunburstNode = toSunburstTreeRuntime;
export const toDescriptorIndex: (model: NormalizedMateWheel) => DescriptorIndexItem[] = toDescriptorIndexRuntime;
