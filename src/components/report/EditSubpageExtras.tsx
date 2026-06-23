import { useReport } from '../../context/ReportContext';
import type { EditIdentityRole } from '../../types';

const IDENTITY_OPTIONS: { id: EditIdentityRole; label: string }[] = [
  { id: 'merchant', label: 'Merchant' },
  { id: 'user', label: 'User' },
];

/** 英文身份选择 — Merchant / User（参考「您的身份是」） */
export function EditIdentityModule() {
  const { editInfoDraft, updateEditInfoDraft } = useReport();

  return (
    <section className="rounded-2xl border border-neutral-100 bg-white px-4 py-3.5">
      <h3 className="mb-3 text-[14px] font-semibold text-neutral-900">Your identity</h3>
      <div className="flex gap-2">
        {IDENTITY_OPTIONS.map((opt) => {
          const active = editInfoDraft.identity === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => updateEditInfoDraft({ identity: opt.id })}
              className={`flex-1 rounded-xl px-3 py-2.5 text-[14px] font-medium transition ${
                active
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-600 active:bg-neutral-200'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}

/** Edit 子页共用底部区块 — 身份选择 */
export function EditSubpageExtras() {
  return (
    <div className="space-y-3 pt-2">
      <EditIdentityModule />
    </div>
  );
}
