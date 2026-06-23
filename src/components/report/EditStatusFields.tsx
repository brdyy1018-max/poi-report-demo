import { useNavigate } from 'react-router-dom';
import { FieldLabel, TextInput } from '../ui/FormFields';

/** 选择 Open 后 — 营业时间模块 */
export function StatusBusinessHoursModule({
  hoursLines,
  returnPath = '/edit/status',
}: {
  hoursLines: string[];
  returnPath?: string;
}) {
  const navigate = useNavigate();
  const summary =
    hoursLines.length > 0
      ? hoursLines.slice(0, 2).join(' · ') + (hoursLines.length > 2 ? '…' : '')
      : undefined;

  return (
    <section className="space-y-3 rounded-2xl border border-neutral-100 bg-neutral-50 p-4">
      <div>
        <FieldLabel label="Business hours" required />
        <p className="mt-0.5 text-[13px] leading-snug text-neutral-500">
          Provide the correct opening hours now that this place is open
        </p>
      </div>
      {hoursLines.length > 0 && (
        <ul className="space-y-1.5 rounded-xl border border-neutral-200 bg-white px-3 py-2.5">
          {hoursLines.map((line) => (
            <li key={line} className="text-[14px] text-neutral-800">
              {line}
            </li>
          ))}
        </ul>
      )}
      <button
        type="button"
        onClick={() => navigate(`/edit/hours?return=${encodeURIComponent(returnPath)}`)}
        className="flex w-full items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-left active:bg-neutral-50"
      >
        <span className={summary ? 'text-[15px] text-neutral-900' : 'text-[15px] text-neutral-400'}>
          {summary || 'Add opening hours'}
        </span>
        <span className="text-neutral-400">›</span>
      </button>
    </section>
  );
}

/** 选择 Coming soon 后 — 开业时间模块 */
export function StatusOpeningDateModule({
  openingDate,
  onChange,
}: {
  openingDate: string;
  onChange: (value: string) => void;
}) {
  return (
    <section className="space-y-3 rounded-2xl border border-neutral-100 bg-neutral-50 p-4">
      <div>
        <FieldLabel label="Expected opening date" required />
        <p className="mt-0.5 text-[13px] leading-snug text-neutral-500">
          When is this place expected to start operating?
        </p>
      </div>
      <TextInput
        type="date"
        value={openingDate}
        onChange={(e) => onChange(e.target.value)}
        className="border border-neutral-200 bg-white"
      />
    </section>
  );
}
