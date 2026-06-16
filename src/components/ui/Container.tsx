import type { ReactNode } from "react";
import clsx from "clsx";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  width?: "default" | "wide" | "narrow";
};

const widthClass: Record<NonNullable<ContainerProps["width"]>, string> = {
  default: "max-w-6xl",
  wide: "max-w-7xl",
  narrow: "max-w-3xl",
};

export function Container({ children, className, width = "default" }: ContainerProps) {
  return (
    <div className={clsx("mx-auto w-full px-6 md:px-10", widthClass[width], className)}>
      {children}
    </div>
  );
}
