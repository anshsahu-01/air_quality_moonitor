function Block({ className = "" }) {
  return <div className={`animate-pulse rounded-3xl bg-[var(--surface-soft)] ${className}`} />;
}

export default function DashboardSkeleton() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">
      <Block className="h-44" />
      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr_1fr]">
        <Block className="h-64" />
        <Block className="h-64" />
        <Block className="h-64" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Block className="h-36" />
        <Block className="h-36" />
        <Block className="h-36" />
        <Block className="h-36" />
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.25fr_0.95fr]">
        <Block className="h-[640px]" />
        <Block className="h-[640px]" />
      </div>
      <Block className="h-[460px]" />
    </main>
  );
}
