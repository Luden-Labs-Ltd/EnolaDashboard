import React, { SVGProps } from "react";

export default function BurgerIcon(props: SVGProps<any>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 33 44"
      {...props}
    >
      <path
        d="M6.02246 15H26.0225"
        stroke="#313A56"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6.02246 22H26.0225"
        stroke="#313A56"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6.02246 29H26.0225"
        stroke="#313A56"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
