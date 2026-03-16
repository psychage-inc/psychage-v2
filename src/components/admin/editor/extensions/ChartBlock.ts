import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import ChartBlockView from '../node-views/ChartBlockView';

export interface ChartBlockData {
  chartType: 'bar' | 'pie' | 'line';
  title: string;
  data: Array<{ label: string; value: number; color?: string }>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    chartBlock: {
      insertChart: (chartType?: 'bar' | 'pie' | 'line') => ReturnType;
    };
  }
}

const DEFAULT_CHART_DATA: ChartBlockData = {
  chartType: 'bar',
  title: 'Chart Title',
  data: [
    { label: 'Category A', value: 40 },
    { label: 'Category B', value: 65 },
    { label: 'Category C', value: 30 },
  ],
};

export const ChartBlock = Node.create({
  name: 'chartBlock',
  group: 'block',
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      chartData: {
        default: JSON.stringify(DEFAULT_CHART_DATA),
        parseHTML: (element) => element.getAttribute('data-chart') || JSON.stringify(DEFAULT_CHART_DATA),
        renderHTML: (attributes) => ({
          'data-chart': attributes.chartData,
        }),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-chart-block]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-chart-block': '' })];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ChartBlockView);
  },

  addCommands() {
    return {
      insertChart:
        (chartType: 'bar' | 'pie' | 'line' = 'bar') =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              chartData: JSON.stringify({ ...DEFAULT_CHART_DATA, chartType }),
            },
          });
        },
    };
  },
});

export default ChartBlock;
