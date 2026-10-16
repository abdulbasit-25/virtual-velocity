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
    <div className="mt-3 flex flex-wrap gap-2" aria-label="Suggested questions">
      {QUICK_REPLIES.map((reply) => (
        <button
          key={reply}
          type="button"
          onClick={() => onSelect(reply)}
          className="rounded-full border border-emerald-800/20 bg-white px-3 py-2 text-left text-xs font-semibold text-emerald-900 transition-colors hover:border-emerald-800 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800"
        >
          {reply}
        </button>
      ))}
    </div>
  );
}
