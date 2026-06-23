/** 定位针 + 感叹号 — POI 报错/提报入口 icon */
export function IconReportLocation({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M10.8 20.2S6.6 16.4 6.6 11.4a4.2 4.2 0 1 1 8.4 0c0 5-4.2 8.8-4.2 8.8z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <circle cx="10.8" cy="11.35" r="1.15" fill="currentColor" />
      <circle cx="16.1" cy="16.1" r="2.75" stroke="currentColor" strokeWidth="1.9" />
      <path d="M16.1 14.55V16.35" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="16.1" cy="17.45" r="0.52" fill="currentColor" />
    </svg>
  );
}

export function IconEdit({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconChevronRight({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconBack({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconMore({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="5" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="12" cy="19" r="1.6" />
    </svg>
  );
}

/** 图片 + 感叹号 — 图片报错入口（替换原 Share 位） */
export function IconImageReport({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.85" />
      <path d="M8 14l2.5-3 2 2.5L14 11l2 3" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="9.5" r="1" fill="currentColor" />
      <circle cx="17.5" cy="17.5" r="2.65" stroke="currentColor" strokeWidth="1.85" />
      <path d="M17.5 16.2v1.35" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" />
      <circle cx="17.5" cy="18.65" r="0.45" fill="currentColor" />
    </svg>
  );
}

export function IconCamera({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 8h3l1.5-2h7L17 8h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="13" r="3.25" stroke="currentColor" strokeWidth="1.85" />
    </svg>
  );
}
