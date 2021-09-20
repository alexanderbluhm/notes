import React from "react";

interface Props {
  text: string;
  as?: string;
  [prop: string]: any;
}

export const Alert = ({ text, as = "button", ...props }: Props) => {
  let Component: any = as;

  return (
    <Component
      {...props}
      className="inline-flex font-light justify-between items-center rounded-md w-full p-5 border border-brand text-brand"
    >
      {text}
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M13.75 6.75L19.25 12L13.75 17.25"
        ></path>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M19 12H4.75"
        ></path>
      </svg>
    </Component>
  );
};
