export function TypingIndicator() {
  return (
    <div className="vv-msg flex items-end gap-2" role="status">
      <span
        aria-hidden="true"
        className="mb-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#007c7a] to-[#004f4e] text-[9px] font-black tracking-wider text-white shadow-sm"
      >
        VV
      </span>
      <div className="inline-flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-zinc-200/70 bg-white px-4 py-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <span className="sr-only">Assistant is preparing a reply</span>
        <span
          aria-hidden="true"
          className="vv-dot h-1.5 w-1.5 rounded-full bg-[#006766]"
        />
        <span
          aria-hidden="true"
          className="vv-dot h-1.5 w-1.5 rounded-full bg-[#006766] [animation-delay:150ms]"
        />
        <span
          aria-hidden="true"
          className="vv-dot h-1.5 w-1.5 rounded-full bg-[#006766] [animation-delay:300ms]"
        />
      </div>
    </div>
  );
}
