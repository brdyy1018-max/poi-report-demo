import { useMemo, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { IconBack, IconMore } from '../components/icons/PoiIcons';
import { useReport } from '../context/ReportContext';
import type { SubmissionRecord } from '../types';

const STATUS_LABEL: Record<SubmissionRecord['status'], string> = {
  pending: 'Processing',
  approved: 'Approved',
  rejected: 'Rejected',
};

const STATUS_STYLE: Record<SubmissionRecord['status'], string> = {
  pending: 'bg-sky-50 text-sky-600',
  approved: 'bg-emerald-50 text-emerald-600',
  rejected: 'bg-neutral-100 text-neutral-500',
};

const TYPE_ICON: Partial<Record<SubmissionRecord['type'], string>> = {
  'edit-phone': '📞',
  'edit-name': '📝',
  'edit-address': '📍',
  'edit-status': '🕐',
  'edit-category': '🏷',
  'edit-hours': '🕐',
  'edit-photos': '📷',
  'add-place': '🏪',
  'suggest-edit': '✏️',
  feedback: '💬',
  rate: '⭐',
};

function formatTime(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function ContributionCard({ record }: { record: SubmissionRecord }) {
  return (
    <article className="rounded-2xl border border-neutral-100 bg-white px-4 py-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="text-lg" aria-hidden="true">
            {TYPE_ICON[record.type] ?? '📋'}
          </span>
          <h3 className="truncate text-[15px] font-semibold text-neutral-900">{record.title}</h3>
        </div>
        <span
          className={`shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold ${STATUS_STYLE[record.status]}`}
        >
          {STATUS_LABEL[record.status]}
        </span>
      </div>
      <div className="mt-3 flex gap-3">
        <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl bg-neutral-100">
          {record.thumbnail ? (
            <img src={record.thumbnail} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-2xl">🏪</div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold text-neutral-900">
            {record.poiName ?? record.title}
          </p>
          <p className="mt-1 text-[13px] leading-snug text-neutral-500">{record.summary}</p>
          <time className="mt-2 block text-[12px] text-neutral-400">{formatTime(record.createdAt)}</time>
        </div>
      </div>
    </article>
  );
}

/** Legacy /history → profile contributions tab */
export function HistoryPage() {
  return <Navigate to="/profile?tab=contributions" replace />;
}

type ProfileTab = 'to-review' | 'your-reviews' | 'contributions';

const LEVEL_LINKS = [
  { label: 'Points', emoji: '🅿️' },
  { label: 'Events', emoji: '🛡️' },
  { label: 'Community', emoji: '👥' },
] as const;

const TABS: { id: ProfileTab; label: string }[] = [
  { id: 'to-review', label: 'To review' },
  { id: 'your-reviews', label: 'Your reviews' },
  { id: 'contributions', label: 'Contributions' },
];

function parseTab(value: string | null): ProfileTab {
  if (value === 'your-reviews' || value === 'contributions') return value;
  return 'to-review';
}

/** Personal profile — Local Explorer + reviews + contributions */
export function ProfilePage() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const { submissions } = useReport();
  const [tab, setTab] = useState<ProfileTab>(() => parseTab(params.get('tab')));

  const reviews = useMemo(() => submissions.filter((s) => s.type === 'rate'), [submissions]);
  const reviewCount = reviews.length || 3;
  const viewCount = 3;
  const helpfulCount = 0;
  const levelProgress = Math.min(reviewCount, 20);

  const selectTab = (next: ProfileTab) => {
    setTab(next);
    if (next === 'to-review') setParams({}, { replace: true });
    else setParams({ tab: next }, { replace: true });
  };

  return (
    <div className="min-h-screen bg-white pb-10">
      <header className="sticky top-0 z-20 flex items-center justify-between bg-white px-2 py-3">
        <button
          type="button"
          aria-label="Back"
          onClick={() => navigate('/')}
          className="flex h-10 w-10 items-center justify-center rounded-full active:bg-neutral-100"
        >
          <IconBack />
        </button>
        <button
          type="button"
          aria-label="More"
          onClick={() => selectTab('contributions')}
          className="flex h-10 w-10 items-center justify-center rounded-full active:bg-neutral-100"
        >
          <IconMore />
        </button>
      </header>

      <div className="px-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1 pt-1">
            <h1 className="text-[22px] font-extrabold tracking-tight text-neutral-900">zz.zytid016</h1>
            <div className="mt-4 flex gap-6">
              <ProfileStat value={reviewCount} label="Reviews" />
              <ProfileStat value={viewCount} label="Views" />
              <ProfileStat value={helpfulCount} label="Helpful votes" />
            </div>
          </div>
          <div className="h-[88px] w-[88px] shrink-0 rounded-full bg-neutral-200" />
        </div>

        <section className="mt-5 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
          <button type="button" className="flex w-full items-center gap-2 text-left active:opacity-80">
            <span className="text-lg" aria-hidden="true">
              💎
            </span>
            <span className="flex-1 text-[16px] font-bold text-neutral-900">Local Explorer Lv.0</span>
            <span className="text-neutral-400">›</span>
          </button>

          <div className="mt-3 border-t border-neutral-100 pt-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[13px] text-neutral-600">Write your first review and unlock perks!</p>
              <span className="shrink-0 text-[13px] font-semibold text-neutral-500">
                {levelProgress}/20
              </span>
            </div>
          </div>

          <div className="mt-4 flex justify-around border-t border-neutral-100 pt-3">
            {LEVEL_LINKS.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => {
                  if (link.label === 'Points') selectTab('contributions');
                }}
                className="flex flex-col items-center gap-1 px-3 py-1 active:opacity-70"
              >
                <span className="text-lg">{link.emoji}</span>
                <span className="text-[12px] font-medium text-neutral-700">{link.label}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="mt-6 flex border-b border-neutral-200">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => selectTab(item.id)}
              className={`relative flex-1 pb-3 text-[14px] font-semibold transition ${
                tab === item.id ? 'text-neutral-900' : 'text-neutral-400'
              }`}
            >
              {item.label}
              {tab === item.id && (
                <span className="absolute bottom-0 left-[18%] right-[18%] h-0.5 rounded-full bg-neutral-900" />
              )}
            </button>
          ))}
        </div>

        {tab === 'to-review' && (
          <div className="pt-4">
            <button
              type="button"
              className="mb-6 flex w-full items-center gap-3 rounded-xl bg-amber-50 px-4 py-3.5 text-left active:bg-amber-100/80"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-400 text-sm font-bold text-white">
                P
              </span>
              <p className="flex-1 text-[14px] leading-snug text-neutral-800">
                Write reviews for places that need them and get{' '}
                <span className="font-bold">4,000 points</span>
              </p>
              <span className="shrink-0 text-neutral-400">›</span>
            </button>

            <div className="flex flex-col items-center px-6 py-10 text-center">
              <div className="mb-6 text-[72px] leading-none opacity-80" aria-hidden="true">
                🖼️
              </div>
              <h2 className="text-[17px] font-bold text-neutral-900">No reviews to write yet</h2>
              <p className="mt-2 max-w-[280px] text-[14px] leading-relaxed text-neutral-500">
                Locations you added to your posts or interacted with will appear here.
              </p>
              <button type="button" className="mt-5 text-[14px] font-semibold text-sky-600 active:opacity-80">
                About location reviews
              </button>
            </div>
          </div>
        )}

        {tab === 'your-reviews' && (
          <div className="space-y-3 py-4">
            {reviews.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-[15px] font-semibold text-neutral-900">No reviews yet</p>
                <p className="mt-2 text-[14px] text-neutral-500">
                  Rate a place from the report page to see it here.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/report')}
                  className="mt-4 text-[14px] font-semibold text-tiktok active:opacity-80"
                >
                  Report a place ›
                </button>
              </div>
            ) : (
              reviews.map((s) => <ContributionCard key={s.id} record={s} />)
            )}
          </div>
        )}

        {tab === 'contributions' && (
          <div className="space-y-3 py-4">
            {submissions.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-[15px] font-semibold text-neutral-900">No submissions yet</p>
                <p className="mt-2 text-[14px] text-neutral-500">
                  Edits and reports you submit will show up here.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/report')}
                  className="mt-4 text-[14px] font-semibold text-tiktok active:opacity-80"
                >
                  Report a place ›
                </button>
              </div>
            ) : (
              submissions.map((s) => <ContributionCard key={s.id} record={s} />)
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileStat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <p className="text-[18px] font-bold text-neutral-900">{value}</p>
      <p className="mt-0.5 text-[12px] text-neutral-500">{label}</p>
    </div>
  );
}
