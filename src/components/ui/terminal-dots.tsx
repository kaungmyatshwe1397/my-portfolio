// Terminal window dots header — shared across terminal-style components

export function TerminalDots({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3 border-b border-white/[0.15]">
      <div className="flex gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
      </div>
      <p className="text-xs font-medium text-muted-foreground/60 tracking-wide">{label}</p>
    </div>
  );
}
