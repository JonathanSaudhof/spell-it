export function MainWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="flex flex-col gap-8 min-h-svh p-8">{children}</main>;
}
