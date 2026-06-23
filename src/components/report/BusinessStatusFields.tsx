import { FieldLabel } from '../ui/FormFields';
import { StatusFollowUpFields } from './StatusFollowUpFields';
import { EDIT_STATUS_OPTIONS } from '../../mock/poiData';
import type { BusinessStatus } from '../../types';

interface BusinessStatusFieldsProps {
  status: BusinessStatus | '';
  openingDate: string;
  onStatusChange: (status: BusinessStatus) => void;
  onOpeningDateChange: (value: string) => void;
  name?: string;
  showHints?: boolean;
  followUp:
    | {
        variant: 'add-place';
        hoursSummary?: string;
        hoursPlaceholder?: string;
        onEditHours: () => void;
      }
    | {
        variant: 'edit';
        hoursLines: string[];
        returnPath?: string;
      };
}

/** Business status + conditional opening date / hours */
export function BusinessStatusFields({
  status,
  openingDate,
  onStatusChange,
  onOpeningDateChange,
  name = 'business-status',
  showHints = false,
  followUp,
}: BusinessStatusFieldsProps) {
  const selectedOption = EDIT_STATUS_OPTIONS.find((o) => o.value === status) ?? EDIT_STATUS_OPTIONS[0];

  return (
    <div className="space-y-5">
      {showHints && (
        <section className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-4">
          <p className="text-[13px] font-medium text-neutral-500">Business status</p>
          <p className="mt-1 text-[17px] font-bold text-neutral-900">{selectedOption.label}</p>
          <p className="mt-2 text-[13px] leading-relaxed text-neutral-600">{selectedOption.hint}</p>
        </section>
      )}

      <div>
        <FieldLabel label="Business status" required />
        <div className="mt-2 space-y-2">
          {EDIT_STATUS_OPTIONS.map((opt) => {
            const selected = status === opt.value;
            return (
              <label
                key={opt.value}
                className={`flex cursor-pointer gap-3 rounded-xl border px-4 py-3.5 transition ${
                  selected ? 'border-tiktok bg-rose-50/50' : 'border-neutral-200 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name={name}
                  checked={selected}
                  onChange={() => onStatusChange(opt.value)}
                  className={showHints ? 'mt-1 accent-tiktok' : 'accent-tiktok'}
                />
                {showHints ? (
                  <span>
                    <span
                      className={`block text-[15px] font-semibold ${selected ? 'text-tiktok' : 'text-neutral-900'}`}
                    >
                      {opt.label}
                    </span>
                    <span className="mt-0.5 block text-[13px] leading-snug text-neutral-500">{opt.hint}</span>
                  </span>
                ) : (
                  <span className={`text-[15px] font-medium ${selected ? 'text-tiktok' : 'text-neutral-900'}`}>
                    {opt.label}
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </div>

      <StatusFollowUpFields
        status={status}
        openingDate={openingDate}
        onOpeningDateChange={onOpeningDateChange}
        {...followUp}
      />
    </div>
  );
}
