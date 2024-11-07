export function MainWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="flex flex-col gap-6 min-h-svh p-8">{children}</main>;
}

export function Grid({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="grid gap-8 grid-cols-3 lg:grid-cols-4">{children}</div>
  );
}
