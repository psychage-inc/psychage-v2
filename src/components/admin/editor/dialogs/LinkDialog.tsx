import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X, Link as LinkIcon, Unlink } from 'lucide-react';

interface LinkDialogProps {
  editor: Editor;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LinkDialog: React.FC<LinkDialogProps> = ({ editor, open, onOpenChange }) => {
  const existingHref = editor.getAttributes('link').href || '';
  const [url, setUrl] = useState(existingHref);
  const [openInNewTab, setOpenInNewTab] = useState(true);

  const handleOpen = (isOpen: boolean) => {
    if (isOpen) {
      setUrl(editor.getAttributes('link').href || '');
    }
    onOpenChange(isOpen);
  };

  const handleApply = () => {
    if (!url.trim()) return;
    editor
      .chain()
      .focus()
      .setLink({ href: url.trim(), target: openInNewTab ? '_blank' : null })
      .run();
    onOpenChange(false);
  };

  const handleRemove = () => {
    editor.chain().focus().unsetLink().run();
    onOpenChange(false);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" />
        <DialogPrimitive.Content className="fixed inset-0 z-[101] flex items-center justify-center p-4">
          <div className="relative w-full max-w-sm bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
              <DialogPrimitive.Title className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <LinkIcon size={16} /> Insert Link
              </DialogPrimitive.Title>
              <DialogPrimitive.Close className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-slate-300 rounded">
                <X size={16} />
              </DialogPrimitive.Close>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-slate-400 mb-1">URL</label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleApply()}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={openInNewTab}
                  onChange={(e) => setOpenInNewTab(e.target.checked)}
                  className="rounded border-gray-300 dark:border-slate-600 text-teal-600 focus:ring-teal-500"
                />
                Open in new tab
              </label>
            </div>

            <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-slate-700">
              {existingHref ? (
                <button
                  onClick={handleRemove}
                  className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600"
                >
                  <Unlink size={12} /> Remove Link
                </button>
              ) : (
                <div />
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => onOpenChange(false)}
                  className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApply}
                  disabled={!url.trim()}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg disabled:opacity-50"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default LinkDialog;
