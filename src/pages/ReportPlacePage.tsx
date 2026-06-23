import { useNavigate } from 'react-router-dom';
import { BusinessClaimCard } from '../components/report/BusinessClaimCard';
import { IconBack } from '../components/icons/PoiIcons';
import { useReport } from '../context/ReportContext';
import { EDIT_FIELDS } from '../mock/poiData';

const HUB_FIELDS = EDIT_FIELDS.filter((f) =>
  ['name', 'status', 'address', 'category', 'phone', 'hours'].includes(f.id),
);

function EditFieldRow({
  label,
  value,
  multiline,
  onClick,
}: {
  label: string;
  value: string;
  multiline?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-start gap-3 border-b border-neutral-100 px-4 py-4 text-left last:border-b-0 active:bg-neutral-50"
    >
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-semibold text-neutral-900">{label}</p>
        <p
          className={`mt-0.5 text-[14px] leading-snug text-neutral-500 ${
            multiline ? 'whitespace-pre-line' : ''
          }`}
        >
          {value}
        </p>
      </div>
      <span className="shrink-0 pt-0.5 text-[18px] text-neutral-300">›</span>
    </button>
  );
}

/** Suggest an edit — field list hub */
export function ReportPlacePage() {
  const navigate = useNavigate();
  const { submissions } = useReport();

  const unreadContributions = submissions.filter((s) => s.status === 'pending').length;

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 pb-8">
      <header className="sticky top-0 z-20 flex items-center border-b border-neutral-100 bg-white px-2 py-3">
        <button
          type="button"
          aria-label="Back"
          onClick={() => navigate('/')}
          className="flex h-10 w-10 items-center justify-center rounded-full active:bg-neutral-100"
        >
          <IconBack />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-bold text-neutral-900">Suggest an edit</h1>
        <button
          type="button"
          onClick={() => navigate('/profile?tab=contributions')}
          className="relative px-2 py-1 text-[14px] font-semibold text-tiktok active:opacity-80"
        >
          Contributions
          {unreadContributions > 0 && (
            <span
              className="absolute -right-0.5 top-0.5 h-2 w-2 rounded-full bg-tiktok ring-2 ring-white"
              aria-label={`${unreadContributions} unread`}
            />
          )}
        </button>
      </header>

      <div className="px-4 py-4">
        <section className="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm">
          {HUB_FIELDS.map((field) => (
            <EditFieldRow
              key={field.id}
              label={field.label}
              value={field.getValue()}
              multiline={field.id === 'hours'}
              onClick={() => navigate(field.route)}
            />
          ))}
        </section>

        <div className="mt-6 space-y-3">
          <BusinessClaimCard />
          <button
            type="button"
            onClick={() => navigate('/add-place?step=1')}
            className="w-full py-3 text-center text-[15px] font-semibold text-tiktok active:opacity-80"
          >
            Add a new place ›
          </button>
        </div>
      </div>
    </div>
  );
}
