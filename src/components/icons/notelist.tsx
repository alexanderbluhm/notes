import React from "react";

export const NotelistIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg {...props} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="20" fill="url(#paint0_linear)" />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="9.5"
          y1="9"
          x2="37"
          y2="39.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#818CF8" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
      </defs>
    </svg>
  );
};
