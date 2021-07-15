import React from "react";

interface Props {}

export const Navbar = (props: Props) => {
  return (
    <nav role="main" className="py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 lg:px-6">
        <div className="hidden">
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M7.75 19.25H16.25C17.3546 19.25 18.25 18.3546 18.25 17.25V9L14 4.75H7.75C6.64543 4.75 5.75 5.64543 5.75 6.75V17.25C5.75 18.3546 6.64543 19.25 7.75 19.25Z"
            ></path>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M18 9.25H13.75V5"
            ></path>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M9.75 15.25H14.25"
            ></path>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M9.75 12.25H14.25"
            ></path>
          </svg>
        </div>
      </div>
    </nav>
  );
};
