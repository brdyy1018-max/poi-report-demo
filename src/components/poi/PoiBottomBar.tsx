import { useNavigate } from 'react-router-dom';
import { IconCamera } from '../icons/PoiIcons';

/** POI 详情 / Gallery 底部 — Add photo（可选）+ Favorite */
export function PoiBottomBar({
  onAddPhoto,
  onPrimary,
  primaryLabel = 'Favorite',
  showAddPhoto = true,
}: {
  onAddPhoto?: () => void;
  onPrimary?: () => void;
  primaryLabel?: string;
  showAddPhoto?: boolean;
}) {
  const navigate = useNavigate();
  const addPhoto = onAddPhoto ?? (() => navigate('/edit/photos'));

  return (
    <footer className="fixed bottom-0 left-1/2 flex w-full max-w-phone -translate-x-1/2 gap-2.5 border-t border-neutral-100 bg-white px-4 py-3 safe-bottom">
      {showAddPhoto && (
        <button
          type="button"
          onClick={addPhoto}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-neutral-100 py-3.5 text-[15px] font-semibold text-neutral-900 active:bg-neutral-200"
        >
          <IconCamera className="h-[18px] w-[18px]" />
          Add photo
        </button>
      )}
      <button
        type="button"
        onClick={onPrimary}
        className={`flex items-center justify-center gap-2 rounded-full bg-tiktok py-3.5 text-[15px] font-semibold text-white active:opacity-90 ${
          showAddPhoto ? 'flex-1' : 'w-full'
        }`}
      >
        🔖 {primaryLabel}
      </button>
    </footer>
  );
}
