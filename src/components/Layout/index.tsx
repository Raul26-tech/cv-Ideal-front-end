import React, { HTMLAttributes } from "react";
import Header from "../Header";
import { useAuth } from "../../hooks/useAuth";

interface layoutProps extends HTMLAttributes<HTMLDivElement> {
  children: React.JSX.Element;
}

export default function Layout({ children, className }: layoutProps) {
  const { user } = useAuth();

  console.log(user);

  return (
    <>
      {user && <Header />}
      <div
        className={`w-screen h-screen p-6 flex justify-center items-center ${className}`}
      >
        {children}
      </div>
    </>
  );
}
