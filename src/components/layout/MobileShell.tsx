import type { ReactNode } from 'react';

/** 移动端 Demo 外框 — 居中手机视口 */
export function MobileShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-phone flex-col bg-white shadow-xl">
      {children}
    </div>
  );
}
