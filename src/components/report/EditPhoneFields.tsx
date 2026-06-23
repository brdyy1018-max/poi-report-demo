import type { PhoneEntry } from '../../types';

const LANDLINE_MAX = 8;
const MOBILE_MAX = 11;

/** 电话列表 — 支持新增 / 删除 */
export function EditPhoneList({
  phones,
  onChange,
}: {
  phones: PhoneEntry[];
  onChange: (phones: PhoneEntry[]) => void;
}) {
  const update = (id: string, patch: Partial<PhoneEntry>) => {
    onChange(phones.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };

  const remove = (id: string) => {
    if (phones.length <= 1) return;
    onChange(phones.filter((p) => p.id !== id));
  };

  const add = () => {
    onChange([...phones, { id: `p-${Date.now()}`, areaCode: '', number: '' }]);
  };

  return (
    <section className="space-y-3">
      <h3 className="text-[14px] font-semibold text-neutral-900">
        Please provide the correct business phone number
        <span className="ml-0.5 text-tiktok">*</span>
      </h3>

      {phones.map((entry) => {
        const showAreaCode = entry.areaCode.length > 0;
        const limit = showAreaCode ? LANDLINE_MAX : MOBILE_MAX;
        return (
          <div key={entry.id} className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Remove phone number"
              onClick={() => remove(entry.id)}
              disabled={phones.length <= 1}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-tiktok disabled:opacity-30"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-tiktok text-[16px] leading-none">
                −
              </span>
            </button>

            {showAreaCode ? (
              <>
                <input
                  value={entry.areaCode}
                  onChange={(e) => update(entry.id, { areaCode: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                  placeholder="021"
                  inputMode="numeric"
                  className="w-[52px] shrink-0 rounded-lg border border-neutral-200 bg-white px-2 py-3 text-center text-[15px] outline-none focus:border-neutral-400"
                />
                <div className="relative min-w-0 flex-1">
                  <input
                    value={entry.number}
                    onChange={(e) =>
                      update(entry.id, { number: e.target.value.replace(/\D/g, '').slice(0, limit) })
                    }
                    placeholder="Phone number"
                    inputMode="numeric"
                    className="w-full rounded-lg border border-neutral-200 bg-white py-3 pl-3 pr-12 text-[15px] outline-none focus:border-neutral-400"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-neutral-400">
                    {entry.number.length}/{limit}
                  </span>
                </div>
              </>
            ) : (
              <div className="relative min-w-0 flex-1">
                <input
                  value={entry.number}
                  onChange={(e) =>
                    update(entry.id, { number: e.target.value.replace(/\D/g, '').slice(0, MOBILE_MAX) })
                  }
                  placeholder="Phone number"
                  inputMode="numeric"
                  className="w-full rounded-lg border border-neutral-200 bg-white py-3 pl-3 pr-12 text-[15px] outline-none focus:border-neutral-400"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-neutral-400">
                  {entry.number.length}/{MOBILE_MAX}
                </span>
              </div>
            )}
          </div>
        );
      })}

      <div className="flex flex-wrap gap-4 pt-1">
        <button
          type="button"
          onClick={add}
          className="flex items-center gap-2 text-[15px] font-medium text-tiktok active:opacity-80"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-tiktok text-[16px] leading-none">
            +
          </span>
          Add phone number
        </button>
        <button
          type="button"
          onClick={() =>
            onChange([...phones, { id: `p-${Date.now()}`, areaCode: '021', number: '' }])
          }
          className="text-[13px] font-medium text-neutral-500 active:text-neutral-700"
        >
          Add landline
        </button>
      </div>
    </section>
  );
}

/** 举证照片 — 最多 10 张 */
export function EditPhoneEvidence({
  photos,
  onAddPhoto,
  onRemovePhoto,
}: {
  photos: string[];
  onAddPhoto: () => void;
  onRemovePhoto: (index: number) => void;
}) {
  const maxPhotos = 10;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-[14px] font-semibold text-neutral-900">Please upload relevant information</h3>
        <button type="button" className="text-[13px] font-medium text-google">
          View examples
        </button>
      </div>
      <p className="text-[13px] leading-snug text-neutral-500">
        <span className="text-tiktok">*</span>
        Provide photos containing phone number information or actual store photos to speed up verification
      </p>

      <div className="flex flex-wrap gap-3">
        {photos.map((_, i) => (
          <div key={i} className="relative h-[88px] w-[88px] overflow-hidden rounded-xl bg-neutral-200">
            <div className="flex h-full w-full items-center justify-center text-2xl">📷</div>
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
        {photos.length < maxPhotos && (
          <button
            type="button"
            onClick={onAddPhoto}
            className="flex h-[88px] w-[88px] flex-col items-center justify-center rounded-xl bg-neutral-100 text-neutral-400 active:bg-neutral-200"
          >
            <span className="text-2xl">📷</span>
            <span className="mt-1 text-[11px]">
              {photos.length}/{maxPhotos}
            </span>
          </button>
        )}
      </div>
    </section>
  );
}

export function hasValidPhones(phones: PhoneEntry[]) {
  return phones.some((p) => p.number.trim().length >= 6);
}
