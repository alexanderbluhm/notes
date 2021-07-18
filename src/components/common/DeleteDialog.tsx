import { Menu, Transition } from "@headlessui/react";
import React from "react";

interface Props {
    onDelete: () => void;
}

export const DeleteDialog: React.FC<Props> = (props) => {
  return (
    <Menu as="div" className="relative">
      <>
        {props.children}
        <Transition
          as={React.Fragment}
          enter="transition duration-125 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-100 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items
            className="absolute z-50 top-full right-0 w-48 mt-1 -mr-0.5 bg-gray-900 shadow-lg rounded-md py-1 text-base ring-1 ring-brand ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            as="ul"
          >
            <div className="px-4 py-2 space-y-2">
              <h3 className="text-sm">
                Do you really want to delete this note?
              </h3>
              <div className="flex items-center space-x-2">
                <Menu.Item onClick={props.onDelete} as="button" className="w-full">
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
