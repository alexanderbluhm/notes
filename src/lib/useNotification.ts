import create from "zustand";
import { Notification } from "@/types/notification";

type NotificationState = {
  notifications: Array<Notification>;
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
};

/**
 * Used to store the current notifications
 */
export const useNotification = create<NotificationState>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...notification, id: Math.random().toString(36) },
      ],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id
      ),
    })),
}));
