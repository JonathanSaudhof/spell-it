"use client";
import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export function Button({
  children,
  className,
  disabled,
  onClick,
}: Readonly<
  PropsWithChildren<{
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
  }>
>) {
  return (
    <button
      className={twMerge(
        "px-4 py-2 text-gray-900 border border-gray-900 rounded-lg",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
