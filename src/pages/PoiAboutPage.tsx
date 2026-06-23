import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IconEdit, IconReportLocation } from '../components/icons/PoiIcons';
import { SegmentedTabs } from '../components/poi/OverlayNav';
import { SuggestEditBanner } from '../components/ui/FormFields';
import { useReport } from '../context/ReportContext';
import { POI } from '../mock/poiData';

const FEATURES = [
  ['🏠', 'Family-friendly'],
  ['🏛', 'Cool view'],
  ['🏊', 'Stunning pool'],
  ['📍', 'Near attractions'],
  ['P', 'Free parking'],
  ['♨️', 'Sauna'],
  ['🍹', 'Free welcome drink'],
  ['👔', 'Laundry service'],
];

const HIGHLIGHTS = [
  { tag: 'Must-see', title: 'Photogenic Japanese lobby', body: 'Wood panels, ikebana, and warm lighting — popular for content creators.' },
  { tag: 'Tip', title: 'Best time to visit', body: 'Weekday mornings are quiet; pool area opens at 7:00 AM.' },
  { tag: 'Nearby', title: '1 km to Taman Doa', body: 'Easy walk or 5-min drive to the shrine park.' },
];

/** 详细信息页 — PIbs / L9oj 参考图 */
export function PoiAboutPage() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const { openQuickMenu } = useReport();
  const [tab, setTab] = useState(params.get('tab') || 'About');

  useEffect(() => {
    const t = params.get('tab');
    if (t === 'Highlights' || t === 'About') setTab(t);
  }, [params]);

  const switchTab = (t: string) => {
    setTab(t);
    setParams(t === 'About' ? {} : { tab: t });
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-white pb-24">
      <header className="sticky top-0 z-20 flex items-center gap-2 bg-white px-3 pb-3 pt-12">
        <button type="button" aria-label="Back" onClick={() => navigate('/')} className="flex h-10 w-10 items-center justify-center rounded-full text-xl">
          ‹
        </button>
        <div className="flex flex-1 justify-center">
          <SegmentedTabs tabs={['About', 'Highlights']} active={tab} onChange={switchTab} />
        </div>
        <div className="flex items-center gap-1">
          <button type="button" aria-label="Report" onClick={openQuickMenu} className="flex h-9 w-9 items-center justify-center rounded-full">
            <IconReportLocation />
          </button>
          <button type="button" aria-label="Edit" onClick={() => navigate('/edit/identity-intro')} className="flex h-9 w-9 items-center justify-center rounded-full">
            <IconEdit />
          </button>
        </div>
      </header>

      <div className="px-4">
        <h1 className="text-[20px] font-extrabold">
          {POI.name}
          <span className="ml-2 text-[13px] font-normal text-neutral-500">{POI.stars}-star hotel</span>
        </h1>
        <p className="mt-1.5 text-[13px] text-neutral-500">{POI.meta}</p>

        {tab === 'About' ? (
          <>
            <div className="relative mt-3 pr-12 text-[13px] leading-relaxed text-neutral-700">{POI.addressFull}</div>
            <button type="button" className="absolute right-4 top-[108px] flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm">
              ↗
            </button>
            <h2 className="mt-6 text-[17px] font-bold">Feature</h2>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {FEATURES.map(([icon, label]) => (
                <div key={label} className="flex items-center gap-2.5 text-[13px]">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-card text-sm">{icon}</span>
                  {label}
                </div>
              ))}
            </div>
            <h2 className="mt-6 text-[17px] font-bold">Amenities</h2>
            <div className="mt-2 space-y-1 text-[14px] text-neutral-800">
              <div><span className="text-teal-500">✓</span> Access</div>
              <div>Check-in <span className="text-teal-500">24 hours</span></div>
              <div>Non-smoking rooms</div>
              <div>Elevator</div>
              <div>Front desk 24 hours</div>
              <div>Exterior corridor</div>
              <div>Electronic key</div>
            </div>
          </>
        ) : (
          <div className="mt-4 space-y-3">
            {HIGHLIGHTS.map((h) => (
              <article key={h.title} className="rounded-2xl bg-card p-4">
                <span className="rounded-md bg-white px-2 py-0.5 text-[11px] font-semibold text-tiktok">{h.tag}</span>
                <h3 className="mt-2 text-[16px] font-bold">{h.title}</h3>
                <p className="mt-1 text-[14px] leading-relaxed text-neutral-600">{h.body}</p>
              </article>
            ))}
          </div>
        )}

        <div className="mt-6">
          <SuggestEditBanner onClick={openQuickMenu} />
        </div>
      </div>

      <footer className="fixed bottom-0 left-1/2 flex w-full max-w-phone -translate-x-1/2 gap-2.5 border-t border-neutral-100 bg-white px-4 py-3 safe-bottom">
        <button type="button" onClick={() => navigate('/rooms')} className="flex-1 rounded-full bg-card py-3.5 text-[15px] font-semibold">
          Rooms
        </button>
        <button type="button" className="flex-1 rounded-full bg-tiktok py-3.5 text-[15px] font-semibold text-white">
          🔖 Favorite
        </button>
      </footer>
    </div>
  );
}
