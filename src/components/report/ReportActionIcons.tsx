import type { ReactNode } from 'react';

const iconClass = 'h-[22px] w-[22px]';

function EditNameIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass} stroke="currentColor" strokeWidth="1.8">
      <path d="M4 20h4l10-10-4-4L4 16v4z" strokeLinejoin="round" />
      <path d="M13.5 6.5l4 4" />
    </svg>
  );
}

function EditAddressIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass} stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z" />
      <circle cx="12" cy="11" r="2" />
      <path d="M15 8l2-2" strokeLinecap="round" />
    </svg>
  );
}

function EditPhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass} stroke="currentColor" strokeWidth="1.8">
      <path d="M6.5 4h3l1.5 5-2 1.5a11 11 0 0 0 5 5L13.5 14 19 15.5v3A2.5 2.5 0 0 1 16.5 21C9.5 21 3 14.5 3 7.5A2.5 2.5 0 0 1 6.5 4z" />
    </svg>
  );
}

function EditHoursIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass} stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8v4l3 2" strokeLinecap="round" />
    </svg>
  );
}

function EditCategoryIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass} stroke="currentColor" strokeWidth="1.8">
      <path d="M4 7l8-3 8 3-8 3-8-3z" strokeLinejoin="round" />
      <path d="M4 12l8 3 8-3M4 17l8 3 8-3" strokeLinejoin="round" />
    </svg>
  );
}

function EditStatusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass} stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="8" width="18" height="8" rx="4" />
      <circle cx="16" cy="12" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function DuplicateIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass} stroke="currentColor" strokeWidth="1.8">
      <path d="M7 9H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2" />
      <rect x="9" y="3" width="10" height="10" rx="2" />
      <path d="M9 7h6M9 11h4" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass} stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9 9l6 6M15 9l-6 6" strokeLinecap="round" />
    </svg>
  );
}

const ICONS: Record<string, () => ReactNode> = {
  'edit-name': EditNameIcon,
  'edit-address': EditAddressIcon,
  'edit-phone': EditPhoneIcon,
  'edit-hours': EditHoursIcon,
  'edit-category': EditCategoryIcon,
  'edit-status': EditStatusIcon,
  duplicate: DuplicateIcon,
  close: CloseIcon,
};

export function ReportActionIcon({ name }: { name: string }) {
  const Icon = ICONS[name];
  return Icon ? <Icon /> : null;
}
