export function TypingIndicator() {
  return (
    <div
      className="inline-flex items-center gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3 text-zinc-500 shadow-sm"
      aria-label="Assistant is preparing a reply"
    >
      <span className="sr-only">Assistant is preparing a reply</span>
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-700 [animation-delay:-0.2s] motion-reduce:animate-none" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-700 [animation-delay:-0.1s] motion-reduce:animate-none" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-700 motion-reduce:animate-none" />
    </div>
  );
}
