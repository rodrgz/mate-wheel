import { init, use } from 'echarts/core';
import { SunburstChart, TreeChart } from 'echarts/charts';
import { AriaComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

use([SunburstChart, TreeChart, TooltipComponent, AriaComponent, CanvasRenderer]);

export const initEcharts = init;
