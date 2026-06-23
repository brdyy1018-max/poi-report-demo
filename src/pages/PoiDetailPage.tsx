import { useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { OverlayNav } from '../components/poi/OverlayNav';
import { PoiBottomBar } from '../components/poi/PoiBottomBar';
import { SuggestEditLink } from '../components/ui/FormFields';
import { useReport } from '../context/ReportContext';
import { POI } from '../mock/poiData';

/** POI 详情页 — 提报进 ··· 菜单；点图进入全屏看图 */
export function PoiDetailPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { openQuickMenu } = useReport();

  const menuItems = useMemo(
    () => [
      { label: 'Suggest an edit', onClick: () => navigate('/report') },
      { label: 'Report a place', onClick: () => navigate('/report') },
      { label: 'Leave feedback', onClick: () => navigate('/feedback') },
      { label: 'My contribution', onClick: () => navigate('/profile') },
    ],
    [navigate],
  );

  useEffect(() => {
    if (params.get('sheet') === '1') openQuickMenu();
  }, [params, openQuickMenu]);

  return (
    <div className="flex min-h-screen flex-col bg-white pb-24">
      <div className="relative h-[300px] shrink-0">
        <button
          type="button"
          onClick={() => navigate('/poi/gallery/view?index=1&from=detail')}
          className="block h-full w-full"
        >
          <img src={POI.heroImage} alt="" className="h-full w-full object-cover" />
        </button>
        <OverlayNav onBack={() => navigate('/post')} menuItems={menuItems} />
        <span className="absolute bottom-3 left-4 rounded-md bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white">
          Thor
        </span>
        <span className="pointer-events-none absolute bottom-3 right-4 rounded-full bg-black/55 px-2.5 py-1 text-xs text-white">
          2/6
        </span>
      </div>

      <div className="px-4 pt-4">
        <h1 className="text-[20px] font-extrabold tracking-tight">
          {POI.name}
          <span className="ml-2 text-[13px] font-normal text-neutral-500">3-star hotel</span>
        </h1>
        <span className="mt-2 inline-block rounded-md bg-neutral-100 px-2.5 py-1 text-xs text-neutral-600">{POI.favorites}</span>
        <p className="mt-3 flex items-center gap-1 text-[14px]">
          <span>✨</span>
          {POI.highlight}…
          <span className="text-neutral-400">›</span>
        </p>
        <div className="mt-2.5 flex flex-wrap gap-3 text-[12px] text-neutral-600">
          {POI.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <div className="rounded-xl bg-card p-3.5">
            <div className="text-[16px] font-bold">
              {POI.rating} ({POI.reviewCount}) <span className="text-neutral-400">›</span>
            </div>
            <div className="mt-1 text-amber-400">★★★★½</div>
          </div>
          <div className="relative rounded-xl bg-card p-3.5 text-[13px] leading-snug">
            {POI.distance}
            <button
              type="button"
              aria-label="Open map"
              className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-sm"
            >
              ↗
            </button>
          </div>
        </div>

        <div className="mt-3 rounded-xl bg-card p-3.5">
          <p className="text-[14px] leading-snug text-neutral-800">{POI.addressShort}</p>
          <SuggestEditLink onClick={() => navigate('/report')} className="mt-2.5" />
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-neutral-100 py-3.5 text-[15px] font-medium">
          {POI.dates}
          <span className="text-neutral-400">›</span>
        </div>

        <div className="rounded-lg bg-cyan-500 px-3.5 py-2 text-[13px] font-semibold text-white">Agoda · Save up to 60% on travel</div>

        <div className="relative mt-3 rounded-2xl border border-neutral-200 p-3">
          <div className="flex gap-3">
            <div className="h-[88px] w-[72px] shrink-0 rounded-lg bg-gradient-to-br from-neutral-300 to-neutral-400" />
            <div>
              <h3 className="text-[15px] font-bold">
                {POI.roomName}{' '}
                <span className="rounded bg-rose-50 px-1.5 py-0.5 text-[11px] font-medium text-tiktok">Family-friendly</span>
              </h3>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {POI.roomTags.map((t) => (
                  <span key={t} className="rounded bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-600">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-2 text-[18px] font-extrabold">
                {POI.price} <span className="text-[12px] font-semibold text-tiktok">{POI.discount}</span>
              </div>
            </div>
          </div>
          <button type="button" className="absolute bottom-3 right-3 rounded-lg bg-tiktok px-5 py-2 text-[14px] font-semibold text-white">
            Book
          </button>
        </div>

        <div className="mt-4 flex gap-2">
          <button type="button" onClick={() => navigate('/about')} className="flex-1 rounded-xl bg-card py-3.5 text-[14px] font-semibold">
            About ›
          </button>
          <button
            type="button"
            onClick={() => navigate('/about?tab=Highlights')}
            className="flex-1 rounded-xl bg-card py-3.5 text-[14px] font-semibold"
          >
            Highlights ›
          </button>
          <button type="button" onClick={() => navigate('/rooms')} className="flex-1 rounded-xl bg-card py-3.5 text-[14px] font-semibold">
            Rooms ›
          </button>
        </div>
      </div>

      <PoiBottomBar showAddPhoto={false} />
    </div>
  );
}
