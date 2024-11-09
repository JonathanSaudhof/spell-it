"use client";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export function Button({
  children,
  className,
  ...props
}: Readonly<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className={twMerge(
        "px-4 py-2 text-gray-900 drop-shadow-md rounded-2xl hover:bg-slate-300 bg-teal-300",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function TileButton({
  onClick,
  text,
  icon,
  className,
}: PropsWithChildren<{
  onClick: () => void;
  text: string;
  icon?: string;
  className?: string;
}>) {
  return (
    <Button
      className={twMerge("text-6xl h-[100px]", className)}
      onClick={onClick}
    >
      {icon ? (
        <span className="text-6xl">{icon}</span>
      ) : (
        <span className="text-2xl text-wrap leading-snug break-words align-top text-center flex justify-center">
          {text}
        </span>
      )}
    </Button>
  );
}

export function LinkButton({
  href,
  children,
  className,
}: PropsWithChildren<{ href: string; className?: string }>) {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.push(href);
      }}
      onMouseEnter={() => {
        router.prefetch(href);
      }}
      className={twMerge(
        "flex justify-center items-center gap-4 p-4 py-2 bg-gray-400 text-2xl md:text-4xl lg:text-6xl uppercase rounded-xl",
        className
      )}
    >
      {children}
    </Button>
  );
}
