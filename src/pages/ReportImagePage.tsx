import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { FieldLabel } from '../components/ui/FormFields';
import { useReport } from '../context/ReportContext';
import { IMAGE_REPORT_REASONS, VIEWER_IMAGES } from '../mock/imageReportData';

/** Report image — select issue type */
export function ReportImagePage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { addSubmission } = useReport();
  const [reason, setReason] = useState<string | null>(null);
  const [evidence, setEvidence] = useState<string[]>([]);
  const [note, setNote] = useState('');

  const imgIndex = Number(params.get('index') || '0');
  const imageUrl = params.get('img') || VIEWER_IMAGES[imgIndex] || VIEWER_IMAGES[0];
  const canSubmit = !!reason;

  const submit = () => {
    if (!reason) return;
    const label = IMAGE_REPORT_REASONS.find((r) => r.id === reason)?.title ?? reason;
    addSubmission('edit-photos', 'Report image', `${label}${note ? `: ${note}` : ''}`);
    navigate('/success?type=feedback');
  };

  return (
    <div className="flex min-h-screen flex-col bg-white pb-28">
      <PageHeader title="Report image" onBack={() => navigate(-1)} />

      <div className="flex-1 px-4 py-4">
        <div className="mb-5 flex gap-3">
          <img src={imageUrl} alt="" className="h-16 w-16 shrink-0 rounded-lg object-cover" />
          <p className="text-[13px] leading-snug text-neutral-500">Reporting this image</p>
        </div>

        <div className="divide-y divide-neutral-100">
          {IMAGE_REPORT_REASONS.map((opt) => (
            <label key={opt.id} className="flex cursor-pointer gap-3 py-4">
              <input
                type="radio"
                name="image-reason"
                checked={reason === opt.id}
                onChange={() => setReason(opt.id)}
                className="mt-1 accent-tiktok"
              />
              <span>
                <span className="block text-[16px] font-semibold text-neutral-900">{opt.title}</span>
                <span className="mt-1 block text-[13px] leading-snug text-neutral-500">{opt.desc}</span>
              </span>
            </label>
          ))}
        </div>

        <section className="mt-6">
          <FieldLabel label="Supporting photos" />
          <div className="flex flex-wrap gap-3">
            {evidence.map((id, i) => (
              <div key={id} className="relative h-20 w-20 rounded-xl bg-neutral-200">
                <button
                  type="button"
                  onClick={() => setEvidence((arr) => arr.filter((_, j) => j !== i))}
                  className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-[10px] text-white"
                >
                  ×
                </button>
              </div>
            ))}
            {evidence.length < 5 && (
              <button
                type="button"
                onClick={() => setEvidence((arr) => [...arr, `ev-${arr.length}`])}
                className="flex h-20 w-20 flex-col items-center justify-center rounded-xl bg-neutral-100 text-neutral-500"
              >
                <span className="text-xl">📷</span>
                <span className="mt-1 text-[11px]">{evidence.length}/5</span>
              </button>
            )}
          </div>
        </section>

        <section className="mt-6">
          <FieldLabel label="Additional details" />
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add any details to help us review this report"
            rows={4}
            className="w-full resize-none rounded-xl bg-neutral-100 px-4 py-3.5 text-[15px] outline-none placeholder:text-neutral-400"
          />
        </section>
      </div>

      <footer className="fixed bottom-0 left-1/2 w-full max-w-phone -translate-x-1/2 border-t border-neutral-100 bg-white px-4 py-4 safe-bottom">
        <button
          type="button"
          disabled={!canSubmit}
          onClick={submit}
          className={`w-full rounded-full py-3.5 text-[16px] font-semibold text-white transition ${
            canSubmit ? 'bg-tiktok active:opacity-90' : 'bg-neutral-300'
          }`}
        >
          Submit
        </button>
      </footer>
    </div>
  );
}
