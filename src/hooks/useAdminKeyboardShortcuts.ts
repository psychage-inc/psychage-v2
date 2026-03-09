import { useEffect, useCallback } from 'react';

interface ShortcutHandlers {
  onCommandPalette?: () => void;
  onSave?: () => void;
  onPublish?: () => void;
}

/**
 * Admin keyboard shortcuts:
 * - Cmd/Ctrl+K → Command palette
 * - Cmd/Ctrl+S → Save (when handler provided)
 * - Cmd/Ctrl+Shift+P → Publish (when handler provided)
 * - Esc → Close (handled by individual components)
 */
export function useAdminKeyboardShortcuts(handlers: ShortcutHandlers) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;

      // Cmd/Ctrl+K → Command palette
      if (mod && e.key === 'k') {
        e.preventDefault();
        handlers.onCommandPalette?.();
        return;
      }

      // Cmd/Ctrl+S → Save
      if (mod && e.key === 's' && !e.shiftKey) {
        e.preventDefault();
        handlers.onSave?.();
        return;
      }

      // Cmd/Ctrl+Shift+P → Publish
      if (mod && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        handlers.onPublish?.();
        return;
      }
    },
    [handlers]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
