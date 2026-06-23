import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';

interface FieldLabelProps {
  label: string;
  required?: boolean;
  hint?: string;
}

export function FieldLabel({ label, required, hint }: FieldLabelProps) {
  return (
    <div className="mb-2">
      <label className="text-[14px] font-medium text-neutral-800">
        {label}
        {required && <span className="ml-0.5 text-tiktok">*</span>}
      </label>
      {hint && <p className="mt-0.5 text-[12px] text-neutral-500">{hint}</p>}
    </div>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-[15px] outline-none transition focus:border-google focus:ring-2 focus:ring-google/20 ${props.className ?? ''}`}
    />
  );
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full resize-none rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-[15px] outline-none transition focus:border-google focus:ring-2 focus:ring-google/20 ${props.className ?? ''}`}
    />
  );
}

/** 可点击整行选择器 */
export function SelectRow({
  label,
  value,
  placeholder,
  required,
  onClick,
}: {
  label: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="w-full text-left">
      <FieldLabel label={label} required={required} />
      <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3.5">
        <span className={value ? 'text-[15px] text-neutral-900' : 'text-[15px] text-neutral-400'}>
          {value || placeholder || 'Select'}
        </span>
        <span className="text-neutral-400">›</span>
      </div>
    </button>
  );
}

export function OrangeTipBar({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl bg-orange-50 px-4 py-3 text-[13px] font-medium text-hint">{children}</div>
  );
}

export function PrimaryButton({
  children,
  onClick,
  disabled,
  variant = 'tiktok',
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'tiktok' | 'google';
}) {
  const bg = variant === 'google' ? 'bg-google' : 'bg-tiktok';
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`w-full rounded-full ${bg} px-6 py-4 text-[16px] font-semibold text-white transition active:scale-[0.98] disabled:opacity-40`}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-full bg-card px-6 py-4 text-[16px] font-semibold text-neutral-900 transition active:scale-[0.98]"
    >
      {children}
    </button>
  );
}

/** POI 卡下方 — Suggest an edit 弱入口 */
export function SuggestEditBanner({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-[14px] font-medium text-neutral-500 transition active:bg-neutral-100"
    >
      <span aria-hidden="true">✏️</span>
      Suggest an edit
      <span className="text-neutral-400">›</span>
    </button>
  );
}

/** POI Entry — Google 风格蓝色文字链（流程图 Screen 3） */
export function SuggestEditLink({ onClick, className = '' }: { onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-[14px] font-medium text-google underline-offset-2 hover:underline active:opacity-80 ${className}`}
    >
      Suggest an edit
    </button>
  );
}
