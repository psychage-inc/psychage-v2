import React, { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { notificationService } from '@/lib/notifications/notificationService';

const DISMISSED_KEY = 'psychage_notification_prompt_dismissed';

const NotificationPrompt: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!notificationService.isSupported()) return;
    if (notificationService.getPermission() !== 'default') return;
    if (localStorage.getItem(DISMISSED_KEY)) return;
    setVisible(true);
  }, []);

  const handleEnable = async () => {
    const result = await notificationService.requestPermission();
    if (result === 'granted') {
      await notificationService.registerServiceWorker();
    }
    localStorage.setItem(DISMISSED_KEY, 'true');
    setVisible(false);
  };

  const handleDismiss = () => {
    localStorage.setItem(DISMISSED_KEY, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="rounded-xl border border-border bg-surface p-6 flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-primary/10">
        <Bell size={18} className="text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-text-primary mb-1">
          Stay on track with reminders
        </p>
        <p className="text-xs text-text-secondary leading-relaxed">
          Get gentle reminders for journaling, mood check-ins, and sleep tracking.
          You can turn this off any time.
        </p>
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={handleEnable}
            className="text-sm font-semibold text-primary hover:underline transition-colors"
          >
            Enable notifications
          </button>
          <button
            onClick={handleDismiss}
            className="text-xs text-text-tertiary hover:text-text-secondary transition-colors"
          >
            Not now
          </button>
        </div>
      </div>
      <button
        onClick={handleDismiss}
        className="p-1.5 rounded-full hover:bg-surface-hover transition-colors text-text-tertiary"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default NotificationPrompt;
