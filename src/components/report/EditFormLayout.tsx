import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditSubpageExtras } from './EditSubpageExtras';
import { ReadOnlyField } from './SupplementaryFields';
import { PageHeader } from '../layout/PageHeader';
import { EDIT_POI } from '../../mock/poiData';

/** 修改信息子页 — 右上角 Submit */
export function HeaderSubmitButton({
  disabled,
  onClick,
  label = 'Submit',
}: {
  disabled?: boolean;
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`text-[16px] font-semibold transition ${
        disabled ? 'text-neutral-300' : 'text-google'
      }`}
    >
      {label}
    </button>
  );
}

interface EditFormLayoutProps {
  title: string;
  canSubmit: boolean;
  onSubmit: () => void;
  children: ReactNode;
  /** 返回路径，默认 /report */
  backTo?: string;
  submitLabel?: string;
  /** 是否展示身份模块 */
  showExtras?: boolean;
  /** 顶部 Current name，默认展示 */
  showCurrentName?: boolean;
}

/** Modify * 子页布局 — 字段级编辑，Submit 后回到 Report a place */
export function EditFormLayout({
  title,
  canSubmit,
  onSubmit,
  children,
  backTo = '/report',
  submitLabel = 'Submit',
  showExtras = true,
  showCurrentName = true,
}: EditFormLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white pb-8">
      <PageHeader
        title={title}
        onBack={() => navigate(backTo)}
        right={<HeaderSubmitButton disabled={!canSubmit} onClick={onSubmit} label={submitLabel} />}
      />
      <div className="space-y-4 px-4 py-4">
        {showCurrentName && <ReadOnlyField label="Current name" value={EDIT_POI.name} />}
        {children}
        {showExtras && <EditSubpageExtras />}
      </div>
    </div>
  );
}
