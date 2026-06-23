import { useNavigate } from 'react-router-dom';

function StorefrontIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10 shrink-0" aria-hidden="true">
      <rect x="8" y="18" width="32" height="22" rx="2" fill="#14B8A6" />
      <path d="M8 18 L24 8 L40 18" fill="none" stroke="#14B8A6" strokeWidth="3" strokeLinejoin="round" />
      <rect x="20" y="28" width="8" height="12" rx="1" fill="white" fillOpacity="0.9" />
      <circle cx="36" cy="14" r="7" fill="#14B8A6" />
      <path d="M33.5 14 H38.5 M36 11.5 V16.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/** Business claim entry — bottom of Report a place hub */
export function BusinessClaimCard() {
  const navigate = useNavigate();

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-4">
      <div className="flex items-start gap-3">
        <StorefrontIcon />
        <div className="min-w-0 pt-0.5">
          <p className="text-[15px] font-medium leading-snug text-neutral-900">
            Claim this business for free
          </p>
          <button
            type="button"
            onClick={() => navigate('/edit/identity-intro')}
            className="mt-1 text-[15px] font-semibold text-teal-600 active:opacity-80"
          >
            Is this your business?
          </button>
        </div>
      </div>
    </section>
  );
}
