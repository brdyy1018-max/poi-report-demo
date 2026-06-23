import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { SupplementaryFields } from '../components/report/SupplementaryFields';
import { FieldLabel } from '../components/ui/FormFields';
import { IDENTITY_OPTIONS } from '../mock/poiData';

/** 身份模块 — 进入 Suggest an edit 前的通用步骤（参考 Google Edit information） */
export function EditIdentityIntroPage() {
  const navigate = useNavigate();
  const [identity, setIdentity] = useState('customer');
  const [note, setNote] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);

  const canContinue = identity && note.trim().length > 0;

  return (
    <div className="min-h-screen bg-white pb-28">
      <PageHeader
        title="Edit information"
        right={
          <button
            type="button"
            disabled={!canContinue}
            onClick={() => navigate('/report')}
            className={`text-[16px] font-semibold ${canContinue ? 'text-tiktok' : 'text-neutral-300'}`}
          >
            Next
          </button>
        }
      />
      <div className="space-y-4 px-4 py-4">
        <p className="text-[14px] text-neutral-600">Help us verify your edit by telling us who you are.</p>

        <div className="rounded-2xl bg-card px-4 py-2">
          <FieldLabel label="Your relationship to this place" required />
          {IDENTITY_OPTIONS.map((opt) => (
            <label key={opt.id} className="flex cursor-pointer items-center gap-3 border-b border-neutral-200/80 py-3.5 last:border-0">
              <input
                type="radio"
                name="identity"
                checked={identity === opt.id}
                onChange={() => setIdentity(opt.id)}
                className="accent-tiktok"
              />
              <span className="text-[15px]">{opt.label}</span>
            </label>
          ))}
        </div>

        <SupplementaryFields
          note={note}
          onNoteChange={setNote}
          photos={photos}
          onAddPhoto={() => setPhotos((p) => [...p, `id-${p.length}`])}
          onRemovePhoto={(i) => setPhotos((p) => p.filter((_, j) => j !== i))}
        />
      </div>
    </div>
  );
}
