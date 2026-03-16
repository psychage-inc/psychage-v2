import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X, Video } from 'lucide-react';

interface VideoEmbedDialogProps {
  editor: Editor;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function isValidYoutubeUrl(url: string): boolean {
  return /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)[\w-]+/.test(url);
}

const VideoEmbedDialog: React.FC<VideoEmbedDialogProps> = ({ editor, open, onOpenChange }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleOpen = (isOpen: boolean) => {
    if (isOpen) {
      setUrl('');
      setError('');
    }
    onOpenChange(isOpen);
  };

  const handleEmbed = () => {
    if (!url.trim()) return;
    if (!isValidYoutubeUrl(url.trim())) {
      setError('Please enter a valid YouTube URL');
      return;
    }
    editor.chain().focus().setYoutubeVideo({ src: url.trim(), width: 640, height: 360 }).run();
    onOpenChange(false);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" />
        <DialogPrimitive.Content className="fixed inset-0 z-[101] flex items-center justify-center p-4">
          <div className="relative w-full max-w-sm bg-surface rounded-xl shadow-xl border border-border">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <DialogPrimitive.Title className="text-sm font-semibold text-text-primary flex items-center gap-2">
                <Video size={16} /> Embed Video
              </DialogPrimitive.Title>
              <DialogPrimitive.Close className="p-1 text-text-tertiary hover:text-text-primary rounded">
                <X size={16} />
              </DialogPrimitive.Close>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">
                  YouTube URL
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setError('');
                  }}
                  placeholder="https://www.youtube.com/watch?v=..."
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleEmbed()}
                  className="w-full px-3 py-2 text-sm border border-border-hover rounded-lg bg-surface text-text-primary placeholder:text-text-tertiary focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
                {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
              </div>
              <p className="text-xs text-text-tertiary">
                Supports youtube.com and youtu.be links
              </p>
            </div>

            <div className="flex justify-end gap-2 p-4 border-t border-border">
              <button
                onClick={() => onOpenChange(false)}
                className="px-3 py-1.5 text-xs font-medium text-text-secondary hover:bg-surface-hover rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleEmbed}
                disabled={!url.trim()}
                className="px-3 py-1.5 text-xs font-medium text-white bg-primary hover:bg-primary-hover rounded-lg disabled:opacity-50"
              >
                Embed
              </button>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default VideoEmbedDialog;
