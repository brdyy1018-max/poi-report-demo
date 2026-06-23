import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconBack } from '../icons/PoiIcons';

interface PageHeaderProps {
  title: string;
  onBack?: () => void;
  right?: ReactNode;
  light?: boolean;
}

/** 表单 / 子页通用顶栏 */
export function PageHeader({ title, onBack, right, light }: PageHeaderProps) {
  const navigate = useNavigate();
  return (
    <header
      className={`sticky top-0 z-20 flex items-center gap-3 px-4 py-3 ${
        light ? 'bg-white text-neutral-900' : 'bg-white/95 backdrop-blur text-neutral-900'
      } border-b border-neutral-100`}
    >
      <button
        type="button"
        aria-label="Back"
        onClick={onBack ?? (() => navigate(-1))}
        className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-neutral-100"
      >
        <IconBack />
      </button>
      <h1 className="flex-1 truncate text-[17px] font-semibold">{title}</h1>
      <div className="min-w-[40px]">{right}</div>
    </header>
  );
}
