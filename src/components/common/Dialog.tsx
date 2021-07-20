import { Menu, Popover, Transition } from "@headlessui/react";
import React, { useState } from "react";
import { ClipboardIcon, LockIcon, LockOpenIcon } from "../icons";
import { Switch } from "@/components/ui";

interface DeleteDialogProps {
  onDelete: () => void;
}

export const DeleteDialog: React.FC<DeleteDialogProps> = (props) => {
  return (
    <Menu as="div" className="relative">
      <>
        {props.children}
        <Transition
          as={React.Fragment}
          enter="transition duration-125 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition origin-top-right duration-300 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-[0.15] opacity-0"
        >
          <Menu.Items
            className="absolute z-50 top-full right-0 w-52 mt-1 -mr-0.5 bg-gray-900 shadow-lg rounded-md py-1 text-base ring-1 ring-brand ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            as="ul"
          >
            <div className="px-4 py-2 space-y-2">
              <h3 className="text-sm">
                Do you really want to delete this note?
              </h3>
              <div className="flex items-center space-x-2">
                <Menu.Item
                  onClick={props.onDelete}
                  as="button"
                  className="w-full"
                >
                  {({ active }) => (
                    <span
                      className={`${
                        active ? "bg-red-700" : "bg-red-600"
                      } flex items-center transition-colors justify-center rounded-md w-full cursor-default select-none py-1.5 px-3`}
                    >
                      Delete
                    </span>
                  )}
                </Menu.Item>
                <Menu.Item as="button" className="w-full">
                  {({ active }) => (
                    <span
                      className={`${
                        active ? "bg-black" : "bg-gray-900"
                      } flex items-center justify-center transition-colors rounded-md w-full cursor-default select-none py-1.5 px-3`}
                    >
                      Cancel
                    </span>
                  )}
                </Menu.Item>
              </div>
            </div>
          </Menu.Items>
        </Transition>
      </>
    </Menu>
  );
};

type PublishedDialogProps = {
  onAccessableChanged: (value: boolean) => void;
  disabled?: boolean;
};

export const PublishedDialog: React.FC<PublishedDialogProps> = (props) => {
  const [published, setPublished] = useState(false);

  const handleAccessableChanged = (value: boolean) => {
    props.onAccessableChanged(value)
    setPublished(value);
  }

  return (
    <Popover as="div" className="relative">
      <Popover.Button
        className="inline-flex p-1.5 rounded-lg hover:bg-gray-800 transition-colors duration-200"
        as="button"
      >
        <span className="sr-only">Managae visibility</span>
        {!published && (
          <LockIcon
            aria-hidden="true"
            className="w-6 h-6 from-green-400 to-green-500"
            stroke={"url(#grad3)"}
          />
        )}

        {published && (
          <LockOpenIcon
            aria-hidden="true"
            className="w-6 h-6 from-green-400 to-green-500"
            stroke={"url(#grad4)"}
          />
        )}
      </Popover.Button>
      <Transition
        as={React.Fragment}
        enter="transition duration-125 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition origin-top-right duration-300 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-[0.15] opacity-0"
      >
        <Popover.Panel className="absolute z-50 divide-y divide-gray-800 top-full right-0 w-72 mt-1 -mr-0.5 bg-gray-900 overflow-auto shadow-lg rounded-md py-1 text-base ring-1 ring-brand ring-opacity-5 focus:outline-none sm:text-sm">
          <div className="px-4 pt-2 pb-3">
            <h3 className="sr-only">Manage access for this note</h3>
            <Switch
              disbaled={props.disabled}
              label="Publish note"
              description="All people you share this link with can read this note."
              enabled={published}
              setEnabled={handleAccessableChanged}
            />
          </div>
          {published && (
            <div className="flex items-center px-4 pt-3 pb-2 space-x-2 overflow-hidden text-sm">
              <span className="text-gray-400 truncate">
                http://localhost:3000/notes/3b54d9f7-28ab-4552-a6c3-135bbb474b4c
              </span>
              <button className="flex-shrink-0 inline-flex -m-1.5 p-1.5 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                <span className="sr-only">Copy note share link</span>
                <ClipboardIcon className="w-6 h-6 text-white" />
              </button>
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
