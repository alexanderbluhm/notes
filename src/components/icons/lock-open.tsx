import React from "react";

export const LockOpenIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--tw-gradient-from)" />
          <stop offset="100%" stopColor="var(--tw-gradient-to)" />
        </linearGradient>
      </defs>
      <path
        d="M5.75 11.75C5.75 11.1977 6.19772 10.75 6.75 10.75H17.25C17.8023 10.75 18.25 11.1977 18.25 11.75V17.25C18.25 18.3546 17.3546 19.25 16.25 19.25H7.75C6.64543 19.25 5.75 18.3546 5.75 17.25V11.75Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.75 10.5V9.84343C7.75 8.61493 7.70093 7.29883 8.42416 6.30578C8.99862 5.51699 10.0568 4.75 12 4.75C14 4.75 15.25 6.25 15.25 6.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
