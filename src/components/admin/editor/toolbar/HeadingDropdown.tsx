import React from 'react';
import { Editor } from '@tiptap/react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';

interface HeadingDropdownProps {
  editor: Editor;
}

const HEADINGS = [
  { level: 1, label: 'Title', shortcut: 'H1', className: 'text-lg font-bold' },
  { level: 2, label: 'Heading', shortcut: 'H2', className: 'text-base font-bold' },
  { level: 3, label: 'Subheading', shortcut: 'H3', className: 'text-sm font-semibold' },
  { level: 4, label: 'Subtitle', shortcut: 'H4', className: 'text-sm font-medium text-text-secondary' },
] as const;

const HeadingDropdown: React.FC<HeadingDropdownProps> = ({ editor }) => {
  const activeHeading = HEADINGS.find((h) => editor.isActive('heading', { level: h.level }));
  const label = activeHeading ? activeHeading.shortcut : 'Text';

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium text-text-secondary hover:bg-surface-hover transition-colors min-w-[60px]"
        >
          {label}
          <ChevronDown size={12} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={4}
          className="z-50 min-w-[160px] bg-surface border border-border rounded-lg shadow-lg py-1"
        >
          <DropdownMenu.Item
            onSelect={() => editor.chain().focus().setParagraph().run()}
            className="flex items-center justify-between px-3 py-2 text-sm text-text-secondary hover:bg-surface-hover cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            <span>Normal text</span>
            {!activeHeading && <span className="text-primary text-xs">Active</span>}
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="h-px bg-border my-1" />

          {HEADINGS.map((h) => (
            <DropdownMenu.Item
              key={h.level}
              onSelect={() => editor.chain().focus().toggleHeading({ level: h.level }).run()}
              className="flex items-center justify-between px-3 py-2 hover:bg-surface-hover cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              <span className={h.className}>{h.label}</span>
              <span className="text-xs text-text-tertiary ml-4">
                {activeHeading?.level === h.level ? (
                  <span className="text-primary">Active</span>
                ) : (
                  h.shortcut
                )}
              </span>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default HeadingDropdown;
