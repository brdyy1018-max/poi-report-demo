import type { ReactNode } from 'react';

interface FormCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

/** 分组表单卡片 — TikTok 浅灰圆角 */
export function FormCard({ title, children, className = '' }: FormCardProps) {
  return (
    <section className={`rounded-2xl bg-card p-4 ${className}`}>
      {title && <h2 className="mb-3 text-[15px] font-semibold text-neutral-900">{title}</h2>}
      {children}
    </section>
  );
}
