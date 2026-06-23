import { FieldLabel, TextArea } from '../ui/FormFields';

/** Modify 表单 — 补充信息（照片 + 说明） */
export function SupplementaryFields({
  note,
  onNoteChange,
  photos,
  onAddPhoto,
  onRemovePhoto,
}: {
  note: string;
  onNoteChange: (v: string) => void;
  photos: string[];
  onAddPhoto: () => void;
  onRemovePhoto: (index: number) => void;
}) {
  const maxLen = 300;

  return (
    <section className="space-y-4">
      <div>
        <div className="mb-1 flex items-center gap-1.5">
          <h3 className="text-[14px] font-semibold text-neutral-900">
            Supplementary Information
            <span className="ml-0.5 text-tiktok">*</span>
          </h3>
          <span
            className="flex h-4 w-4 items-center justify-center rounded-full bg-neutral-200 text-[10px] font-bold text-neutral-600"
            aria-label="More info"
            title="Photos help us verify your edit faster"
          >
            i
          </span>
        </div>
        <p className="text-[13px] text-neutral-500">Upload photos of the location to help us verify</p>
      </div>

      <div className="flex flex-wrap gap-3">
        {photos.map((_, i) => (
          <div key={i} className="relative h-[88px] w-[88px] overflow-hidden rounded-xl bg-neutral-200">
            <div className="flex h-full w-full items-center justify-center text-2xl">🏢</div>
            <button
              type="button"
              aria-label="Remove photo"
              onClick={() => onRemovePhoto(i)}
              className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-[10px] text-white"
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={onAddPhoto}
          className="flex h-[88px] w-[88px] items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50 text-3xl font-light text-neutral-400 active:bg-neutral-100"
        >
          +
        </button>
      </div>

      <div>
        <div className="relative">
          <TextArea
            rows={4}
            maxLength={maxLen}
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
            placeholder="Add any additional details (optional)"
            className="border border-neutral-200 bg-white pb-8"
          />
          <span className="pointer-events-none absolute bottom-3 right-3 text-[12px] text-neutral-400">
            {note.length}/{maxLen}
          </span>
        </div>
      </div>
    </section>
  );
}

/** 只读字段 — Current name 等 */
export function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <FieldLabel label={label} />
      <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3.5 text-[15px] text-neutral-900">
        {value}
      </div>
    </div>
  );
}
