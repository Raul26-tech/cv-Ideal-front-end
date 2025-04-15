import React, { HTMLAttributes } from "react";

interface layoutProps extends HTMLAttributes<HTMLDivElement> {
  children: React.JSX.Element;
}

export default function Layout({ children, className }: layoutProps) {
  return (
    <div
      className={`w-screen h-screen p-6 flex justify-center items-center ${className}`}
    >
      {children}
    </div>
  );
}
