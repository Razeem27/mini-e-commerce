import { ReactElement } from "react";

type Props={
    children:ReactElement,
    className?:string,
}


export default function Container({ children, className = "" }:Props) {
  return (
    <div
      className={`w-full mx-auto px-9 sm:px-12 lg:px-15 ${className}`}
    >
      {children}
    </div>
  );
}
