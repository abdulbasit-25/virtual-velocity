const QUICK_REPLIES = [
  "What services do you offer?",
  "Show me your work",
  "How does the Free Growth Audit work?",
  "Do you offer BPO services?",
  "Talk to a human",
];

export function QuickReplies({
  onSelect,
}: {
  onSelect: (message: string) => void;
}) {
  return (
    <div className="vv-msg pl-9">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
        Suggested
      </p>
      <div
        role="group"
        aria-label="Suggested questions"
        className="flex flex-wrap gap-2"
      >
        {QUICK_REPLIES.map((reply, index) => (
          <button
            key={reply}
            type="button"
            onClick={() => onSelect(reply)}
            style={{ animationDelay: `${index * 50}ms` }}
            className="vv-msg rounded-full border border-[#006766]/25 bg-white px-3.5 py-2 text-left text-xs font-semibold leading-snug text-[#006766] shadow-sm transition-all hover:-translate-y-px hover:border-[#006766] hover:bg-[#006766] hover:text-white hover:shadow-md active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006766] focus-visible:ring-offset-1 motion-reduce:transition-none"
          >
            {reply}
          </button>
        ))}
      </div>
    </div>
  );
}
