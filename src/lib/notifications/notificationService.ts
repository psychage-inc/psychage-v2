const SW_PATH = '/sw.js';

export const notificationService = {
  isSupported(): boolean {
    return 'Notification' in window && 'serviceWorker' in navigator;
  },

  async requestPermission(): Promise<NotificationPermission> {
    if (!this.isSupported()) return 'denied';
    return Notification.requestPermission();
  },

  getPermission(): NotificationPermission {
    if (!this.isSupported()) return 'denied';
    return Notification.permission;
  },

  async registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
    if (!('serviceWorker' in navigator)) return null;
    try {
      return await navigator.serviceWorker.register(SW_PATH);
    } catch (err) {
      console.warn('Service worker registration failed:', err);
      return null;
    }
  },

  async showLocal(title: string, body: string, url?: string): Promise<void> {
    if (!this.isSupported() || Notification.permission !== 'granted') return;

    const reg = await navigator.serviceWorker.getRegistration();
    if (reg) {
      reg.showNotification(title, {
        body,
        icon: '/favicon.svg',
        data: { url: url || '/' },
      });
    } else {
      new Notification(title, { body, icon: '/favicon.svg' });
    }
  },

  scheduleReminder(
    key: string,
    delayMs: number,
    title: string,
    body: string,
    url?: string
  ): void {
    // Clear any existing timer for this key
    const existingTimerId = sessionStorage.getItem(`psychage_reminder_${key}`);
    if (existingTimerId) {
      clearTimeout(Number(existingTimerId));
    }
    const timerId = setTimeout(() => {
      this.showLocal(title, body, url);
      sessionStorage.removeItem(`psychage_reminder_${key}`);
    }, delayMs);
    sessionStorage.setItem(`psychage_reminder_${key}`, String(timerId));
  },

  cancelReminder(key: string): void {
    const timerId = sessionStorage.getItem(`psychage_reminder_${key}`);
    if (timerId) {
      clearTimeout(Number(timerId));
      sessionStorage.removeItem(`psychage_reminder_${key}`);
    }
  },
};
