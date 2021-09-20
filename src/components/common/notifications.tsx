import { useNotification } from "@/lib/useNotification";
import React, { useEffect } from "react";
import { Notification as NotificationType } from "@/types/notification";
import { AnimatePresence, motion, Variants, Variant } from "framer-motion";

interface Props {}

export const Notifications = (props: Props) => {
  const { notifications } = useNotification((state) => state);

  return (
    <AnimatePresence>
      {notifications.map((notification, index) => (
        <Notification
          index={index}
          key={notification.id}
          notification={notification}
        />
      ))}
    </AnimatePresence>
  );
};

type NotificationProps = {
  notification: NotificationType;
  index: number;
};

const styles = {
  info: "bg-gradient-to-br from-indigo-500 to-purple-600",
  error: "bg-gradient-to-br from-red-500 to-rose-600",
};

const variants: Variants = Array(4)
  .fill("")
  .reduce<Record<string, Variant>>((prev, curr, i) => {
    prev[i.toString()] = {
      opacity: 1 - 0.25 * i,
      zIndex: 40 - 10 * i,
      scale: 1 - 0.05 * i,
      y: `${8 * i}px`,
    };
    return prev;
  }, {} as Record<string, Variant>);

const Notification: React.FC<NotificationProps> = ({ index, notification }) => {
  const { removeNotification } = useNotification((state) => state);

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeNotification(notification.id);
    }, notification.duration || 2500);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20 }}
      animate={index.toString()}
      variants={variants}
      exit={{ y: "-30px", opacity: 0, scale: 0.8, zIndex: 50 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className={`fixed w-52 top-6 left-[calc(50%-7.5rem)] text-white text-sm py-2.5 shadow font-medium text-center ${
        styles[notification.type]
      } ${index === 0 ? "rounded-full" : "rounded-2xl text-opacity-0"}`}
    >
      {notification.text}
    </motion.div>
  );
};
