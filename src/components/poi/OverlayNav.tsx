import { IconBack, IconEdit, IconReportLocation } from '../icons/PoiIcons';
import { PoiMoreMenuButton, type PoiMenuItem } from './PoiMoreMenu';

interface OverlayNavProps {
  variant?: 'dark' | 'light';
  onBack?: () => void;
  onReport?: () => void;
  onEdit?: () => void;
  /** 三点菜单项（详情页提报入口） */
  menuItems?: PoiMenuItem[];
  center?: React.ReactNode;
}

/** 详情页悬浮导航 — 提报进 ··· 菜单 */
export function OverlayNav({
  variant = 'dark',
  onBack,
  onReport,
  onEdit,
  menuItems,
  center,
}: OverlayNavProps) {
  const btn =
    variant === 'dark'
      ? 'bg-neutral-900/45 text-white backdrop-blur-md'
      : 'bg-transparent text-neutral-900';

  return (
    <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between px-4 pb-2 pt-[52px]">
      <button type="button" aria-label="Back" onClick={onBack} className={`flex h-9 w-9 items-center justify-center rounded-full ${btn}`}>
        <IconBack className="h-[18px] w-[18px]" />
      </button>
      {center && <div className="flex-1 px-2">{center}</div>}
      <div className="flex items-center gap-2">
        {onReport && (
          <button type="button" aria-label="Report" onClick={onReport} className={`flex h-9 w-9 items-center justify-center rounded-full ${btn}`}>
            <IconReportLocation className="h-[19px] w-[19px]" />
          </button>
        )}
        {onEdit && (
          <button type="button" aria-label="Edit" onClick={onEdit} className={`flex h-9 w-9 items-center justify-center rounded-full ${btn}`}>
            <IconEdit className="h-[18px] w-[18px]" />
          </button>
        )}
        {menuItems && menuItems.length > 0 && <PoiMoreMenuButton items={menuItems} variant={variant} />}
      </div>
    </div>
  );
}

export function SegmentedTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}) {
  return (
    <div className="flex rounded-full bg-neutral-100 p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={`rounded-full px-4 py-1.5 text-[14px] font-semibold transition ${
            active === tab ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
