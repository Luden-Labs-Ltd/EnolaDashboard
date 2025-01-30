import React, { SVGProps } from "react";

export default function Family(props: SVGProps<any>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 21 20"
      {...props}
    >
      <path
        d="M4 6.5C4 6.5 1.4285 7.5 1 11M18 6.5C18 6.5 20.5715 7.5 21 11M8 6.5C8 6.5 10.4 7.0835 11 10C11.6 7.0835 14 6.5 14 6.5M9 14C9 14 6.9 14.375 6 17M13 14C13 14 15.1 14.375 16 17"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M11 15C12.3807 15 13.5 13.8807 13.5 12.5C13.5 11.1193 12.3807 10 11 10C9.61929 10 8.5 11.1193 8.5 12.5C8.5 13.8807 9.61929 15 11 15Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="transparent"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 7C17.6569 7 19 5.65685 19 4C19 2.34315 17.6569 1 16 1C14.3431 1 13 2.34315 13 4C13 5.65685 14.3431 7 16 7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="transparent"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 7C7.65685 7 9 5.65685 9 4C9 2.34315 7.65685 1 6 1C4.34315 1 3 2.34315 3 4C3 5.65685 4.34315 7 6 7Z"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
