import { useMemo, useState } from 'react';
import { ADDRESS_SUGGESTIONS } from '../../mock/poiData';

/** 地址输入 + mock 自动补全 */
export function AddressAutocomplete({
  value,
  onChange,
  placeholder = 'Enter address',
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const suggestions = useMemo(
    () => (value.length < 2 ? [] : ADDRESS_SUGGESTIONS.filter((s) => s.toLowerCase().includes(value.toLowerCase()))),
    [value],
  );

  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-[15px] outline-none focus:border-google focus:ring-2 focus:ring-google/20"
      />
      {open && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-10 mt-1 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg">
          {suggestions.map((s) => (
            <li key={s}>
              <button
                type="button"
                className="w-full px-4 py-3 text-left text-[14px] active:bg-neutral-50"
                onClick={() => {
                  onChange(s);
                  setOpen(false);
                }}
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
