import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import ImageExt from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import { TextStyle } from '@tiptap/extension-text-style';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Youtube from '@tiptap/extension-youtube';

import { CalloutBlock } from './extensions/CalloutBlock';
import { ChartBlock } from './extensions/ChartBlock';
import EditorToolbar from './toolbar/EditorToolbar';
import LinkDialog from './dialogs/LinkDialog';
import ImageUploadDialog from './dialogs/ImageUploadDialog';
import VideoEmbedDialog from './dialogs/VideoEmbedDialog';

import './tiptap-styles.css';

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  articleId?: string;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({
  content,
  onChange,
  placeholder = 'Start writing your content...',
  articleId,
}) => {
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showVideoDialog, setShowVideoDialog] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
        horizontalRule: {},
        strike: {},
      }),
      Underline,
      Highlight.configure({ multicolor: false }),
      TextStyle,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-primary underline' },
      }),
      ImageExt.configure({ inline: false, allowBase64: false }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      TaskList,
      TaskItem.configure({ nested: true }),
      Youtube.configure({ inline: false, width: 640, height: 360 }),
      Placeholder.configure({ placeholder }),
      CalloutBlock,
      ChartBlock,
    ],
    content,
    onUpdate: ({ editor: e }) => onChange(e.getHTML()),
    editorProps: {
      attributes: {
        class:
          'prose prose-sm dark:prose-invert max-w-none min-h-[400px] outline-none px-4 py-3 ' +
          'prose-h1:text-3xl prose-h1:font-bold prose-h1:mt-8 prose-h1:mb-4 ' +
          'prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-6 prose-h2:mb-3 ' +
          'prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-5 prose-h3:mb-2 ' +
          'prose-h4:text-lg prose-h4:font-medium prose-h4:mt-4 prose-h4:mb-2 prose-h4:text-text-secondary',
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-surface">
      {/* Toolbar */}
      <EditorToolbar
        editor={editor}
        onLinkClick={() => setShowLinkDialog(true)}
        onImageClick={() => setShowImageDialog(true)}
        onVideoClick={() => setShowVideoDialog(true)}
      />

      {/* Editor */}
      <EditorContent editor={editor} />

      {/* Dialogs */}
      <LinkDialog editor={editor} open={showLinkDialog} onOpenChange={setShowLinkDialog} />
      <ImageUploadDialog
        editor={editor}
        open={showImageDialog}
        onOpenChange={setShowImageDialog}
        articleId={articleId}
      />
      <VideoEmbedDialog editor={editor} open={showVideoDialog} onOpenChange={setShowVideoDialog} />
    </div>
  );
};

export default TiptapEditor;
