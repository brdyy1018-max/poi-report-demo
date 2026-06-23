import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { POST_DEFAULT_SEARCH, POST_SEARCH_PLACES } from '../mock/postFlowData';
import { POI } from '../mock/poiData';
import { useReport } from '../context/ReportContext';

const DEMO_POI_NAME = POI.name;

/** Publish · Add location 搜索 — 搜不到时出现 Add this place 横幅 */
export function PostAddLocationPage() {
  const navigate = useNavigate();
  const { updateAddPlaceDraft, setPostLocation } = useReport();
  const [query, setQuery] = useState(POST_DEFAULT_SEARCH);

  const trimmed = query.trim();
  const results = useMemo(() => {
    if (!trimmed) return POST_SEARCH_PLACES;
    const q = trimmed.toLowerCase();
    return POST_SEARCH_PLACES.filter(
      (p) => p.name.toLowerCase().includes(q) || p.address.toLowerCase().includes(q),
    );
  }, [trimmed]);

  const exactMatch = results.some((p) => p.name.toLowerCase() === trimmed.toLowerCase());
  const showAddBanner = trimmed.length >= 2 && !exactMatch;

  const goCreate = () => {
    updateAddPlaceDraft({ name: trimmed });
    navigate(`/post/create-location?name=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white pb-24">
      <header className="sticky top-0 z-20 flex items-center border-b border-neutral-100 bg-white px-2 py-3">
        <button
          type="button"
          aria-label="Close"
          onClick={() => navigate('/post')}
          className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-neutral-700 active:bg-neutral-100"
        >
          ×
        </button>
        <h1 className="flex-1 text-center text-[17px] font-bold text-neutral-900">Add location</h1>
        <div className="w-10" />
      </header>

      <div className="px-4 py-3">
        <div className="flex items-center gap-2 rounded-xl bg-neutral-100 px-4 py-3">
          <span className="text-neutral-400">🔍</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a location"
            className="flex-1 bg-transparent text-[16px] outline-none"
            autoFocus
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setQuery('')}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-300 text-[12px] text-white"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {showAddBanner && (
        <div className="mx-4 mb-3 flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3.5 shadow-sm">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center text-tiktok">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-[15px] font-bold text-neutral-900">Add this place to TikTok</div>
            <div className="mt-0.5 truncate text-[13px] text-neutral-500">{trimmed} is not on TikTok yet</div>
          </div>
          <button
            type="button"
            onClick={goCreate}
            className="shrink-0 rounded-full bg-tiktok px-4 py-2 text-[14px] font-semibold text-white active:opacity-90"
          >
            + Add
          </button>
        </div>
      )}

      <nav className="flex-1 divide-y divide-neutral-100">
        {results.map((place) => (
          <button
            key={place.name}
            type="button"
            onClick={() => {
              setPostLocation({
                name: place.name,
                isNew: false,
                linkedPoi: place.name === DEMO_POI_NAME,
              });
              navigate('/post');
            }}
            className="w-full px-4 py-4 text-left active:bg-neutral-50"
          >
            <div className="text-[16px] font-semibold text-neutral-900">{place.name}</div>
            <div className="mt-0.5 text-[14px] text-neutral-500">{place.address}</div>
          </button>
        ))}
        {trimmed.length >= 2 && results.length === 0 && (
          <p className="px-4 py-8 text-center text-[14px] text-neutral-500">No places found</p>
        )}
      </nav>

      {trimmed.length >= 2 && (
        <div className="fixed bottom-0 left-1/2 w-full max-w-phone -translate-x-1/2 border-t border-neutral-100 bg-white px-4 py-3 safe-bottom">
          <button
            type="button"
            onClick={goCreate}
            className="flex w-full items-center justify-center gap-2 py-2 text-[15px] font-semibold text-tiktok active:opacity-80"
          >
            <span className="text-lg leading-none">+</span>
            Create location: {trimmed}
          </button>
        </div>
      )}
    </div>
  );
}

/** Publish · Post 发布页 — 从详情页返回进入；Add location 为发帖提报入口 */
export function PostCreatePage() {
  const navigate = useNavigate();
  const { postLocation, addSubmission } = useReport();

  const POST_OPTIONS = [
    'Who can watch this video',
    'Allow comments',
    'Allow Duet',
    'Allow Stitch',
    'Save to device',
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex items-center border-b border-neutral-100 px-2 py-3">
        <button
          type="button"
          aria-label="Back to POI detail"
          onClick={() => navigate('/')}
          className="flex h-10 w-10 items-center justify-center rounded-full active:bg-neutral-100"
        >
          ‹
        </button>
        <h1 className="flex-1 text-center text-[17px] font-bold">Post</h1>
        <div className="w-10" />
      </header>

      <div className="border-b border-neutral-100 bg-neutral-50 px-4 py-2.5 text-center text-[12px] text-neutral-600">
        Publish Entry · 发帖新增地点提报（与详情页 ⋯ 提报为两条入口）
      </div>

      <div className="flex-1 px-4 py-4">
        <div className="flex gap-3">
          <textarea
            placeholder="Add description..."
            className="min-h-[100px] flex-1 resize-none rounded-xl bg-card p-3 text-[15px] outline-none"
          />
          <div className="h-24 w-20 shrink-0 rounded-xl bg-gradient-to-br from-amber-200 to-orange-300" />
        </div>

        <nav className="mt-4 divide-y divide-neutral-100 rounded-2xl bg-card">
          <button
            type="button"
            onClick={() => navigate('/post/add-location')}
            className="flex w-full items-center gap-3 px-4 py-4 text-left active:bg-neutral-50"
          >
            <span className="text-xl">📍</span>
            <span className="flex-1 text-[15px] font-medium">Location</span>
            {postLocation ? (
              <span
                className={`max-w-[45%] truncate text-[13px] font-semibold ${
                  postLocation.isNew ? 'text-neutral-700' : 'text-tiktok'
                }`}
              >
                {postLocation.name}
                {postLocation.isNew && (
                  <span className="ml-1 font-normal text-neutral-400">· New</span>
                )}
              </span>
            ) : (
              <span className="text-[13px] text-neutral-400">Add location</span>
            )}
            <span className="text-neutral-400">›</span>
          </button>
          {POST_OPTIONS.map((label) => (
            <div key={label} className="flex items-center justify-between px-4 py-3.5 text-[15px]">
              <span>{label}</span>
              <span className="text-[13px] text-neutral-400">Everyone ›</span>
            </div>
          ))}
        </nav>
      </div>

      <footer className="flex gap-3 border-t border-neutral-100 px-4 py-4 safe-bottom">
        <button type="button" className="flex-1 rounded-full bg-card py-3.5 text-[15px] font-semibold">
          Drafts
        </button>
        <button
          type="button"
          onClick={() => {
            if (postLocation?.isNew) {
              addSubmission(
                'add-place',
                'New location (publish)',
                `${postLocation.name} — submitted with video publish`,
              );
            }
            navigate('/');
          }}
          className="flex-1 rounded-full bg-tiktok py-3.5 text-[15px] font-semibold text-white"
        >
          Post
        </button>
      </footer>
    </div>
  );
}
