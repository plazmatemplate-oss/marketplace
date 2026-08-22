type ToastType = "success" | "error" | "info" | "warning";

export interface ToastMessage {
  id: string;
  type: ToastType;
  title?: string;
  description?: string;
  duration?: number;
}

type Listener = (toasts: ToastMessage[]) => void;

let toasts: ToastMessage[] = [];
const listeners: Set<Listener> = new Set();

function notify() {
  listeners.forEach((listener) => listener([...toasts]));
}

export const toast = {
  success: (message: string, options?: { description?: string; duration?: number }) => {
    const id = Math.random().toString(36).substring(2, 9);
    const item: ToastMessage = { id, type: "success", title: message, description: options?.description, duration: options?.duration || 4000 };
    toasts = [...toasts, item];
    notify();
    setTimeout(() => {
      toast.dismiss(id);
    }, item.duration);
    return id;
  },
  error: (message: string, options?: { description?: string; duration?: number }) => {
    const id = Math.random().toString(36).substring(2, 9);
    const item: ToastMessage = { id, type: "error", title: message, description: options?.description, duration: options?.duration || 5000 };
    toasts = [...toasts, item];
    notify();
    setTimeout(() => {
      toast.dismiss(id);
    }, item.duration);
    return id;
  },
  info: (message: string, options?: { description?: string; duration?: number }) => {
    const id = Math.random().toString(36).substring(2, 9);
    const item: ToastMessage = { id, type: "info", title: message, description: options?.description, duration: options?.duration || 4000 };
    toasts = [...toasts, item];
    notify();
    setTimeout(() => {
      toast.dismiss(id);
    }, item.duration);
    return id;
  },
  warning: (message: string, options?: { description?: string; duration?: number }) => {
    const id = Math.random().toString(36).substring(2, 9);
    const item: ToastMessage = { id, type: "warning", title: message, description: options?.description, duration: options?.duration || 4000 };
    toasts = [...toasts, item];
    notify();
    setTimeout(() => {
      toast.dismiss(id);
    }, item.duration);
    return id;
  },
  dismiss: (id: string) => {
    toasts = toasts.filter((t) => t.id !== id);
    notify();
  },
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
