import React from 'react';
import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  ListChecks,
  Quote,
  Code,
  LinkIcon,
  ImageIcon,
  Video,
  Undo,
  Redo,
} from 'lucide-react';
import ToolbarButton from './ToolbarButton';
import HeadingDropdown from './HeadingDropdown';
import InsertMenu from './InsertMenu';

interface EditorToolbarProps {
  editor: Editor;
  onLinkClick: () => void;
  onImageClick: () => void;
  onVideoClick: () => void;
}

const Divider = () => <div className="w-px h-5 bg-border mx-1" />;

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  editor,
  onLinkClick,
  onImageClick,
  onVideoClick,
}) => {
  return (
    <div className="flex items-center gap-0.5 flex-wrap px-2 py-1.5 border-b border-border bg-surface-hover">
      {/* Heading dropdown */}
      <HeadingDropdown editor={editor} />

      <Divider />

      {/* Text formatting */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive('bold')}
        title="Bold (Ctrl+B)"
      >
        <Bold size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive('italic')}
        title="Italic (Ctrl+I)"
      >
        <Italic size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        active={editor.isActive('underline')}
        title="Underline (Ctrl+U)"
      >
        <UnderlineIcon size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive('strike')}
        title="Strikethrough"
      >
        <Strikethrough size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        active={editor.isActive('highlight')}
        title="Highlight"
      >
        <Highlighter size={16} />
      </ToolbarButton>

      <Divider />

      {/* Alignment */}
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        active={editor.isActive({ textAlign: 'left' })}
        title="Align Left"
      >
        <AlignLeft size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        active={editor.isActive({ textAlign: 'center' })}
        title="Align Center"
      >
        <AlignCenter size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        active={editor.isActive({ textAlign: 'right' })}
        title="Align Right"
      >
        <AlignRight size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        active={editor.isActive({ textAlign: 'justify' })}
        title="Justify"
      >
        <AlignJustify size={16} />
      </ToolbarButton>

      <Divider />

      {/* Lists & blocks */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive('bulletList')}
        title="Bullet List"
      >
        <List size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive('orderedList')}
        title="Ordered List"
      >
        <ListOrdered size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        active={editor.isActive('taskList')}
        title="Task List"
      >
        <ListChecks size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive('blockquote')}
        title="Block Quote"
      >
        <Quote size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        active={editor.isActive('codeBlock')}
        title="Code Block"
      >
        <Code size={16} />
      </ToolbarButton>

      <Divider />

      {/* Media */}
      <ToolbarButton onClick={onLinkClick} active={editor.isActive('link')} title="Insert Link">
        <LinkIcon size={16} />
      </ToolbarButton>
      <ToolbarButton onClick={onImageClick} title="Insert Image">
        <ImageIcon size={16} />
      </ToolbarButton>
      <ToolbarButton onClick={onVideoClick} title="Embed Video">
        <Video size={16} />
      </ToolbarButton>

      <Divider />

      {/* Insert menu (table, divider, callout, chart) */}
      <InsertMenu editor={editor} />

      <Divider />

      {/* History */}
      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo (Ctrl+Z)"
      >
        <Undo size={16} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo (Ctrl+Shift+Z)"
      >
        <Redo size={16} />
      </ToolbarButton>
    </div>
  );
};

export default EditorToolbar;
