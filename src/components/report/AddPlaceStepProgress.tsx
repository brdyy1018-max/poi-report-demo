const STEP_HINTS = [
  'Start with a photo and name — you’re on your way!',
  'Great! Now pin the exact location.',
  'Almost done — just a few final details.',
] as const;

/** Add a place 向导 — 进度条 + 正反馈文案 */
export function AddPlaceStepProgress({
  step,
  total = 3,
  sectionLabel,
}: {
  step: number;
  total?: number;
  sectionLabel?: string;
}) {
  const pct = Math.min(100, Math.round((step / total) * 100));

  return (
    <div className="border-b border-neutral-100 bg-white px-4 pb-4 pt-1">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        {sectionLabel ? (
          <span className="text-[13px] font-medium text-neutral-800">{sectionLabel}</span>
        ) : (
          <span className="text-[13px] text-neutral-400">{STEP_HINTS[step - 1]}</span>
        )}
        <span className="shrink-0 text-[13px] font-semibold text-neutral-500">
          Step {step} of {total}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-neutral-100">
        <div
          className="h-full rounded-full bg-tiktok transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2.5 text-[12px] leading-snug text-neutral-500">{STEP_HINTS[step - 1]}</p>
    </div>
  );
}
