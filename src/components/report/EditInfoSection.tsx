import type { ReactNode } from 'react';

/** Edit information 分组区块 — 灰底圆角 + 字段标签 */
export function EditInfoSection({
  label,
  children,
  onClick,
}: {
  label: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const inner = (
    <>
      <div className="mb-2 text-[13px] font-medium text-neutral-500">{label}</div>
      {children}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="mb-3 w-full rounded-2xl bg-card p-4 text-left active:opacity-90"
      >
        {inner}
      </button>
    );
  }

  return <section className="mb-3 rounded-2xl bg-card p-4">{inner}</section>;
}
