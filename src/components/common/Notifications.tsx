import { useNotification } from "@/lib/useNotification";
import { Transition } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { Notification as NotificationType } from "@/types/notification";

interface Props {}

export const Notifications = (props: Props) => {
  const { notifications } = useNotification((state) => state);

  return (
    <>
      {notifications.map((notification) => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </>
  );
};

type NotificationProps = {
  notification: NotificationType;
};

const styles = {
  info: "bg-gradient-to-br from-indigo-500 to-purple-600",
  error: "bg-gradient-to-br from-red-500 to-rose-600",
};

const Notification: React.FC<NotificationProps> = ({ notification }) => {
  const { removeNotification } = useNotification((state) => state);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpen(false);
    }, notification.duration || 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Transition
      afterLeave={() => removeNotification(notification.id)}
      appear={true}
      show={open}
      as={React.Fragment}
      enter="transition duration-300 ease-out"
      enterFrom="-translate-y-10 opacity-0"
      enterTo="translate-y-0 opacity-100"
      leave="transition duration-200 ease-out"
      leaveFrom="translate-y-0 opacity-100"
      leaveTo="-translate-y-8 opacity-0"
    >
      <div
        className={`fixed top-6 text-sm px-5 py-2.5 font-medium rounded-full text-center left-1/2 -translate-x-1/2 ${
          styles[notification.type]
        }`}
      >
        {notification.text}
      </div>
    </Transition>
  );
};
