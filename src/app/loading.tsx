// Route loading state — shows while page data is being fetched

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        {/* Spinning ring */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-muted" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
        </div>

        {/* Loading text */}
        <p className="text-sm text-muted-foreground tracking-widest uppercase animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
