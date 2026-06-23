import { useNavigate, useSearchParams } from 'react-router-dom';
import { useReport } from '../context/ReportContext';
import type { SubmissionRecord } from '../types';

const TYPE_TITLES: Record<string, string> = {
  'add-place': 'Place submitted!',
  'suggest-edit': 'Edit submitted!',
  feedback: 'Report submitted!',
  rate: 'Review submitted!',
};

function formatTime(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function SubmissionDetailCard({ record }: { record: SubmissionRecord }) {
  return (
    <article className="mt-5 rounded-xl border border-neutral-100 bg-neutral-50 px-4 py-4 text-left">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-[15px] font-semibold text-neutral-900">{record.title}</h2>
        <span className="shrink-0 rounded-md bg-sky-50 px-2 py-0.5 text-[11px] font-semibold text-sky-600">
          Processing
        </span>
      </div>
      <div className="mt-3 flex gap-3">
        <div className="h-[64px] w-[64px] shrink-0 overflow-hidden rounded-lg bg-neutral-200">
          {record.thumbnail ? (
            <img src={record.thumbnail} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xl">🏪</div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-semibold text-neutral-900">
            {record.poiName ?? record.summary}
          </p>
          <p className="mt-1 text-[13px] leading-snug text-neutral-500">{record.summary}</p>
          <time className="mt-2 block text-[12px] text-neutral-400">{formatTime(record.createdAt)}</time>
        </div>
      </div>
    </article>
  );
}

/** Submission completed — celebration + submission detail */
export function SubmitSuccessPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const type = params.get('type') || 'suggest-edit';
  const { helpedCount, submissions } = useReport();

  const title = TYPE_TITLES[type] ?? 'Place submitted!';
  const peopleHelped = helpedCount.toLocaleString();
  const latestSubmission = submissions[0];

  return (
    <div className="min-h-screen bg-neutral-100 pb-10">
      <header className="sticky top-0 z-10 flex items-center justify-end bg-neutral-100/90 px-4 py-3 backdrop-blur">
        <button
          type="button"
          onClick={() => navigate('/profile?tab=contributions')}
          className="text-[15px] font-semibold text-tiktok active:opacity-80"
        >
          My contribution
        </button>
      </header>

      <div className="relative mx-4 mb-4 overflow-hidden rounded-3xl bg-gradient-to-br from-rose-100 via-pink-50 to-orange-50 px-6 py-10">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <span className="absolute left-6 top-8 text-2xl">✦</span>
          <span className="absolute right-10 top-6 text-xl">📍</span>
          <span className="absolute left-1/4 top-16 text-lg">★</span>
          <span className="absolute right-6 top-20 text-2xl">📍</span>
          <span className="absolute bottom-8 left-10 text-sm">✦</span>
          <span className="absolute bottom-6 right-1/4 text-xl">★</span>
        </div>
        <div className="relative flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg ring-4 ring-white/80">
            <span className="text-5xl">👍</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 px-4">
        <section className="rounded-2xl bg-white px-5 py-6 text-center shadow-sm">
          <h1 className="text-[22px] font-extrabold tracking-tight text-neutral-900">
            {title} 🎉
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-neutral-500">
            Your report is being reviewed. This will help{' '}
            <span className="font-semibold text-neutral-700">{peopleHelped}</span> people find this
            place.
          </p>
          <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2">
            <span className="text-lg" aria-hidden="true">
              🏅
            </span>
            <span className="text-[14px] font-semibold text-rose-700">+20 contribution points earned</span>
          </div>

          {latestSubmission ? (
            <SubmissionDetailCard record={latestSubmission} />
          ) : (
            <p className="mt-5 text-[14px] text-neutral-500">Your submission is on its way.</p>
          )}
        </section>
      </div>
    </div>
  );
}
