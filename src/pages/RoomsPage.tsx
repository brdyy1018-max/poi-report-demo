import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { POI } from '../mock/poiData';

/** Rooms 子页 — 详情页 Rooms 入口 */
export function RoomsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white pb-24">
      <PageHeader title="Rooms" onBack={() => navigate('/')} />
      <div className="px-4 py-4">
        <div className="mb-4 flex items-center justify-between rounded-xl bg-card px-4 py-3.5 text-[15px] font-medium">
          {POI.dates}
          <span className="text-neutral-400">›</span>
        </div>
        <div className="rounded-lg bg-cyan-500 px-3.5 py-2 text-[13px] font-semibold text-white">Agoda · Save up to 60% on travel</div>
        <div className="relative mt-3 rounded-2xl border border-neutral-200 p-3">
          <div className="flex gap-3">
            <div className="h-[88px] w-[72px] shrink-0 rounded-lg bg-gradient-to-br from-neutral-300 to-neutral-400" />
            <div>
              <h3 className="text-[15px] font-bold">{POI.roomName}</h3>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {POI.roomTags.map((t) => (
                  <span key={t} className="rounded bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-600">{t}</span>
                ))}
              </div>
              <ul className="mt-2 space-y-0.5 text-[12px] text-neutral-600">
                <li className="text-google">✓ Breakfast included</li>
                <li className="text-google">✓ Non-refundable</li>
                <li className="text-google">✓ Best for couples</li>
              </ul>
              <div className="mt-2 text-[18px] font-extrabold">
                {POI.price} <span className="text-[12px] font-semibold text-tiktok">{POI.discount}</span>
              </div>
            </div>
          </div>
          <button type="button" className="absolute bottom-3 right-3 rounded-lg bg-tiktok px-5 py-2 text-[14px] font-semibold text-white">
            Book
          </button>
        </div>
      </div>
    </div>
  );
}
