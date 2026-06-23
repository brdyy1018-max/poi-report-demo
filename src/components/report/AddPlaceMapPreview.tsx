/** Add a place Step 2 — 地图预览 + Edit location */
export function AddPlaceMapPreview({
  address,
  onEditMap,
}: {
  address?: string;
  onEditMap: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-2xl bg-[#e8f0ea]">
        <div
          className="h-[140px] w-full"
          style={{
            backgroundImage: `
              linear-gradient(#d4e4d9 1px, transparent 1px),
              linear-gradient(90deg, #d4e4d9 1px, transparent 1px)
            `,
            backgroundSize: '28px 28px',
          }}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-tiktok text-white shadow-md">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
            </svg>
          </span>
        </div>
        <button
          type="button"
          onClick={onEditMap}
          className="absolute bottom-3 right-3 rounded-full border border-tiktok bg-white px-4 py-1.5 text-[13px] font-semibold text-tiktok shadow-sm active:bg-rose-50"
        >
          Edit location
        </button>
      </div>
      {address && (
        <p className="text-[14px] leading-snug text-neutral-800">{address}</p>
      )}
    </div>
  );
}
