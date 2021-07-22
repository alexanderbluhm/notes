import React, { useState } from "react";
import { Switch as HeadlessSwitch } from "@headlessui/react";

interface Props {
  label: string;
  enabled: boolean;
  description?: string;
  disabled?: boolean;
  setEnabled: (value: boolean) => void;
}

export const Switch = (props: Props) => {
  return (
    <HeadlessSwitch.Group
      as="div"
      className="flex items-center justify-between"
    >
      <span className="flex flex-col flex-grow">
        <HeadlessSwitch.Label as="span" className="text-sm font-medium" passive>
          {props.label}
        </HeadlessSwitch.Label>
        {props.description && (
          <HeadlessSwitch.Description
            as="span"
            className="mt-0.5 text-sm text-gray-400"
          >
            {props.description}
          </HeadlessSwitch.Description>
        )}
      </span>
      <HeadlessSwitch
        disabled={props.disabled}
        checked={props.enabled}
        onChange={props.setEnabled}
        className={`${
          props.enabled
            ? "bg-gradient-to-br from-indigo-400 to-purple-500"
            : "bg-gray-700"
        } relative inline-flex items-center flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand`}
      >
        <span
          className={`${
            props.enabled ? "translate-x-5" : "translate-x-0"
          } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
        />
      </HeadlessSwitch>
    </HeadlessSwitch.Group>
  );
};
