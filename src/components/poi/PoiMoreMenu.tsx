import { useEffect, useRef, useState } from 'react';
import { IconMore } from '../icons/PoiIcons';

export interface PoiMenuItem {
  label: string;
  onClick: () => void;
}

/** 详情页右上角 ··· 下拉菜单 */
export function PoiMoreMenuButton({
  items,
  variant = 'dark',
}: {
  items: PoiMenuItem[];
  variant?: 'dark' | 'light';
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [open]);

  const btn =
    variant === 'dark'
      ? 'bg-neutral-900/45 text-white backdrop-blur-md'
      : 'bg-transparent text-neutral-900';

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="More"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex h-9 w-9 items-center justify-center rounded-full ${btn}`}
      >
        <IconMore className="h-[18px] w-[18px]" />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 min-w-[200px] overflow-hidden rounded-xl border border-neutral-100 bg-white py-1 shadow-lg">
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                setOpen(false);
                item.onClick();
              }}
              className="block w-full px-4 py-3 text-left text-[15px] text-neutral-900 active:bg-neutral-50"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
