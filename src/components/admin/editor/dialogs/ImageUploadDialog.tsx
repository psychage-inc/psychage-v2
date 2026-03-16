import React, { useState, useCallback } from 'react';
import { Editor } from '@tiptap/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X, Upload, ImageIcon, Link as LinkIcon } from 'lucide-react';
import { uploadArticleImage } from '@/services/articleAdminService';
import { toast } from 'sonner';

interface ImageUploadDialogProps {
  editor: Editor;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  articleId?: string;
}

type TabMode = 'upload' | 'url';

const ImageUploadDialog: React.FC<ImageUploadDialogProps> = ({ editor, open, onOpenChange, articleId }) => {
  const [tab, setTab] = useState<TabMode>('upload');
  const [url, setUrl] = useState('');
  const [altText, setAltText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleOpen = (isOpen: boolean) => {
    if (isOpen) {
      setUrl('');
      setAltText('');
      setTab(articleId ? 'upload' : 'url');
    }
    onOpenChange(isOpen);
  };

  const insertImage = (src: string) => {
    editor.chain().focus().setImage({ src, alt: altText || undefined }).run();
    onOpenChange(false);
  };

  const handleFileUpload = useCallback(
    async (file: File) => {
      if (!articleId) {
        toast.error('Save the article first to enable image upload');
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast.error('Only image files are allowed');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image must be under 10MB');
        return;
      }

      setIsUploading(true);
      try {
        const record = await uploadArticleImage(articleId, file, 'inline', altText || undefined);
        insertImage(record.public_url);
        toast.success('Image uploaded');
      } catch (err) {
        toast.error(`Upload failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setIsUploading(false);
      }
    },
    [articleId, altText, editor, onOpenChange],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = Array.from(e.dataTransfer.files).find((f) => f.type.startsWith('image/'));
      if (file) handleFileUpload(file);
    },
    [handleFileUpload],
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
    e.target.value = '';
  };

  const handleUrlInsert = () => {
    if (!url.trim()) return;
    insertImage(url.trim());
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" />
        <DialogPrimitive.Content className="fixed inset-0 z-[101] flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-surface rounded-xl shadow-xl border border-border">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <DialogPrimitive.Title className="text-sm font-semibold text-text-primary flex items-center gap-2">
                <ImageIcon size={16} /> Insert Image
              </DialogPrimitive.Title>
              <DialogPrimitive.Close className="p-1 text-text-tertiary hover:text-text-primary rounded">
                <X size={16} />
              </DialogPrimitive.Close>
            </div>

            {/* Tab switcher */}
            <div className="flex border-b border-border">
              <button
                onClick={() => setTab('upload')}
                disabled={!articleId}
                className={`flex-1 px-4 py-2 text-xs font-medium transition-colors ${
                  tab === 'upload'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-text-secondary hover:text-text-primary'
                } ${!articleId ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                <Upload size={12} className="inline mr-1" /> Upload File
              </button>
              <button
                onClick={() => setTab('url')}
                className={`flex-1 px-4 py-2 text-xs font-medium transition-colors ${
                  tab === 'url'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <LinkIcon size={12} className="inline mr-1" /> URL
              </button>
            </div>

            <div className="p-4 space-y-3">
              {tab === 'upload' ? (
                articleId ? (
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      isDragging
                        ? 'border-primary bg-primary/10'
                        : 'border-border-hover hover:border-gray-400'
                    }`}
                  >
                    {isUploading ? (
                      <div className="space-y-2">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                        <p className="text-sm text-primary">Uploading...</p>
                      </div>
                    ) : (
                      <>
                        <Upload size={24} className="mx-auto mb-2 text-text-tertiary" />
                        <p className="text-sm text-text-secondary">
                          Drag & drop or{' '}
                          <label className="text-primary hover:text-primary cursor-pointer font-medium">
                            browse
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileSelect}
                              className="hidden"
                            />
                          </label>
                        </p>
                        <p className="text-xs text-text-tertiary mt-1">PNG, JPG, WEBP up to 10MB</p>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-4 text-text-secondary text-sm">
                    Save the article first to enable image upload
                  </div>
                )
              ) : (
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/image.png"
                    autoFocus
                    onKeyDown={(e) => e.key === 'Enter' && handleUrlInsert()}
                    className="w-full px-3 py-2 text-sm border border-border-hover rounded-lg bg-surface text-text-primary placeholder:text-text-tertiary focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
              )}

              {/* Alt text (shared) */}
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">
                  Alt Text <span className="text-text-tertiary">(optional)</span>
                </label>
                <input
                  type="text"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="Describe the image..."
                  className="w-full px-3 py-2 text-sm border border-border-hover rounded-lg bg-surface text-text-primary placeholder:text-text-tertiary focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>
            </div>

            {tab === 'url' && (
              <div className="flex justify-end gap-2 p-4 border-t border-border">
                <button
                  onClick={() => onOpenChange(false)}
                  className="px-3 py-1.5 text-xs font-medium text-text-secondary hover:bg-surface-hover rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUrlInsert}
                  disabled={!url.trim()}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-primary hover:bg-primary-hover rounded-lg disabled:opacity-50"
                >
                  Insert
                </button>
              </div>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default ImageUploadDialog;
