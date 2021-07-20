import React from "react";

export const BookmarkIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg {...props} viewBox="0 0 24 24">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--tw-gradient-from)" />
          <stop offset="100%" stopColor="var(--tw-gradient-to)" />
        </linearGradient>
      </defs>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        d="M6.75 6.75C6.75 5.64543 7.64543 4.75 8.75 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V19.25L12 14.75L6.75 19.25V6.75Z"
      ></path>
    </svg>
  );
};
