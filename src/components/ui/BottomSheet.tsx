import type { ReactNode } from 'react';
import { IconChevronRight } from '../icons/PoiIcons';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

/** 底部弹出面板 — 提报快捷导航 */
export function BottomSheet({ open, onClose, title, children }: BottomSheetProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" role="dialog" aria-modal="true">
      <button type="button" className="absolute inset-0 bg-black/45" aria-label="Close" onClick={onClose} />
      <div className="relative w-full max-w-phone animate-slide-up rounded-t-3xl bg-white px-4 pb-8 pt-3 safe-bottom">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-neutral-200" />
        {title && <h2 className="mb-4 px-1 text-[18px] font-bold text-neutral-900">{title}</h2>}
        {children}
      </div>
    </div>
  );
}

export function SheetMenuItem({
  icon,
  label,
  description,
  onClick,
}: {
  icon: string;
  label: string;
  description?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-4 rounded-2xl px-3 py-4 text-left transition active:bg-neutral-50"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-card text-xl">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-[16px] font-semibold text-neutral-900">{label}</span>
        {description && <span className="mt-0.5 block text-[13px] text-neutral-500">{description}</span>}
      </span>
      <IconChevronRight className="shrink-0 text-neutral-400" />
    </button>
  );
}
