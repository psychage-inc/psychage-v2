import React from 'react';
import { Editor } from '@tiptap/react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  Plus,
  Table,
  Minus,
  Info,
  AlertTriangle,
  Lightbulb,
  StickyNote,
  BarChart3,
  PieChart,
  TrendingUp,
  ChevronRight,
} from 'lucide-react';

interface InsertMenuProps {
  editor: Editor;
}

const InsertMenu: React.FC<InsertMenuProps> = ({ editor }) => {
  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  const insertDivider = () => {
    editor.chain().focus().setHorizontalRule().run();
  };

  const insertCallout = (variant: string) => {
    editor
      .chain()
      .focus()
      .insertContent({
        type: 'calloutBlock',
        attrs: { variant },
        content: [{ type: 'paragraph' }],
      })
      .run();
  };

  const insertChart = (chartType: string) => {
    editor
      .chain()
      .focus()
      .insertContent({
        type: 'chartBlock',
        attrs: {
          chartData: JSON.stringify({
            chartType,
            title: 'Chart Title',
            data: [
              { label: 'Category A', value: 40 },
              { label: 'Category B', value: 65 },
              { label: 'Category C', value: 30 },
            ],
          }),
        },
      })
      .run();
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          title="Insert block"
          className="flex items-center gap-1 p-1.5 rounded text-text-secondary hover:bg-surface-hover transition-colors"
        >
          <Plus size={16} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={4}
          className="z-50 min-w-[200px] bg-surface border border-border rounded-lg shadow-lg py-1"
        >
          {/* Table */}
          <DropdownMenu.Item
            onSelect={insertTable}
            className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:bg-surface-hover cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            <Table size={14} className="text-text-tertiary" />
            Table (3x3)
          </DropdownMenu.Item>

          {/* Divider */}
          <DropdownMenu.Item
            onSelect={insertDivider}
            className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:bg-surface-hover cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            <Minus size={14} className="text-text-tertiary" />
            Horizontal Divider
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="h-px bg-border my-1" />

          {/* Callout submenu */}
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className="flex items-center justify-between px-3 py-2 text-sm text-text-secondary hover:bg-surface-hover cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
              <span className="flex items-center gap-2">
                <Info size={14} className="text-blue-500" />
                Callout Block
              </span>
              <ChevronRight size={12} className="text-text-tertiary" />
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                sideOffset={4}
                className="z-50 min-w-[160px] bg-surface border border-border rounded-lg shadow-lg py-1"
              >
                <DropdownMenu.Item
                  onSelect={() => insertCallout('info')}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:bg-surface-hover cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  <Info size={14} className="text-blue-500" /> Info
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onSelect={() => insertCallout('warning')}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:bg-surface-hover cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  <AlertTriangle size={14} className="text-amber-500" /> Warning
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onSelect={() => insertCallout('tip')}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:bg-surface-hover cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  <Lightbulb size={14} className="text-emerald-500" /> Tip
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onSelect={() => insertCallout('note')}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:bg-surface-hover cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  <StickyNote size={14} className="text-gray-500" /> Note
                </DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>

          {/* Chart submenu */}
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className="flex items-center justify-between px-3 py-2 text-sm text-text-secondary hover:bg-surface-hover cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
              <span className="flex items-center gap-2">
                <BarChart3 size={14} className="text-indigo-500" />
                Chart
              </span>
              <ChevronRight size={12} className="text-text-tertiary" />
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                sideOffset={4}
                className="z-50 min-w-[160px] bg-surface border border-border rounded-lg shadow-lg py-1"
              >
                <DropdownMenu.Item
                  onSelect={() => insertChart('bar')}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:bg-surface-hover cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  <BarChart3 size={14} className="text-indigo-500" /> Bar Chart
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onSelect={() => insertChart('pie')}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:bg-surface-hover cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  <PieChart size={14} className="text-indigo-500" /> Pie Chart
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onSelect={() => insertChart('line')}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:bg-surface-hover cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  <TrendingUp size={14} className="text-indigo-500" /> Line Chart
                </DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default InsertMenu;
