import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PoiBottomBar } from '../components/poi/PoiBottomBar';
import { IconBack, IconImageReport } from '../components/icons/PoiIcons';
import { VIEWER_IMAGES } from '../mock/imageReportData';

const GALLERY_TABS = ['Exterior', 'Rooms', 'Dining', 'Leisure and recreation'] as const;

const GALLERY_SECTIONS = [
  {
    title: 'Exterior',
    images: [VIEWER_IMAGES[1]],
  },
  {
    title: 'Rooms',
    images: [VIEWER_IMAGES[2], VIEWER_IMAGES[0], VIEWER_IMAGES[2]],
  },
];

/** Gallery — 相册列表（无图片报错入口） */
export function PoiGalleryPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('Exterior');

  return (
    <div className="flex min-h-screen flex-col bg-white pb-24">
      <header className="sticky top-0 z-20 flex items-center border-b border-neutral-100 bg-white px-2 py-3">
        <button type="button" onClick={() => navigate('/')} className="flex h-10 w-10 items-center justify-center rounded-full active:bg-neutral-100">
          <IconBack />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-bold">Gallery (20)</h1>
        <div className="w-10" />
      </header>

      <div className="flex gap-2 overflow-x-auto px-4 py-3">
        {GALLERY_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold ${
              activeTab === tab ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-6 px-4 pb-4">
        {GALLERY_SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="mb-2 text-[16px] font-bold">{section.title}</h2>
            <button
              type="button"
              onClick={() => navigate('/poi/gallery/view?index=0')}
              className="mb-2 block w-full overflow-hidden rounded-2xl"
            >
              <img src={section.images[0]} alt="" className="aspect-[4/3] w-full object-cover" />
            </button>
            {section.images.length > 1 && (
              <div className="flex gap-2">
                {section.images.slice(1).map((src, i) => (
                  <button
                    key={`${src}-${i}`}
                    type="button"
                    onClick={() => navigate(`/poi/gallery/view?index=${i + 1}`)}
                    className="flex-1 overflow-hidden rounded-xl"
                  >
                    <img src={src} alt="" className="aspect-square w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      <PoiBottomBar />
    </div>
  );
}

/** 全屏看图 — 图片报错在此页 */
export function PoiPhotoViewerPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [showGoodToKnow, setShowGoodToKnow] = useState(false);
  const imgIndex = Number(params.get('index') || '0');
  const imageUrl = VIEWER_IMAGES[imgIndex] ?? VIEWER_IMAGES[0];
  const pageNum = imgIndex + 1;

  const goImageReport = () => {
    navigate(`/report/image?index=${imgIndex}&img=${encodeURIComponent(imageUrl)}`);
  };

  const goBack = () => {
    if (params.get('from') === 'detail') navigate('/');
    else navigate(-1);
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-black">
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 pb-2 pt-[52px] text-white">
        <button type="button" aria-label="Close" onClick={goBack} className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-xl">
          ×
        </button>
        <span className="text-[15px] font-medium">{pageNum}/3</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Good to know"
            onClick={() => setShowGoodToKnow(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-lg font-medium"
          >
            ?
          </button>
          <button
            type="button"
            aria-label="Report image"
            onClick={goImageReport}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40"
          >
            <IconImageReport className="h-[19px] w-[19px]" />
          </button>
        </div>
      </header>

      <img src={imageUrl} alt="" className="min-h-[70vh] w-full flex-1 object-cover" />

      <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/80 px-4 py-3 safe-bottom">
        <button
          type="button"
          onClick={() => navigate('/edit/photos')}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-white/15 py-3.5 text-[15px] font-semibold text-white active:bg-white/25"
        >
          📷 Add photo
        </button>
      </div>

      {showGoodToKnow && (
        <div className="absolute inset-0 z-30 flex items-end bg-black/50">
          <div className="relative w-full rounded-t-3xl bg-white px-5 pb-8 pt-6">
            <button
              type="button"
              aria-label="Close"
              onClick={() => setShowGoodToKnow(false)}
              className="absolute right-4 top-4 text-xl text-neutral-400"
            >
              ×
            </button>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-2xl font-bold">?</div>
            <h2 className="text-[20px] font-bold">Good to know</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-neutral-600">
              Some images are provided by third-party partners, and are subject to third-party terms and policies for
              which TikTok takes no responsibility. However, if you believe that any of the content violates our
              Community Guidelines, please{' '}
              <button type="button" onClick={goImageReport} className="font-medium text-google underline">
                report it
              </button>
              .
            </p>
            <button
              type="button"
              onClick={() => setShowGoodToKnow(false)}
              className="mt-6 w-full rounded-full bg-tiktok py-3.5 text-[16px] font-semibold text-white"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
