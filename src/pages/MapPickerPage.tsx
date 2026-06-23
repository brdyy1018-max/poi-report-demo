import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useReport } from '../context/ReportContext';

/** 地图选点 — 拖拽选点 + Confirm（参考 03 Edit Address） */
export function MapPickerPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const isEdit = params.get('mode') === 'edit';
  const { mapReturnPath, setSelectedAddress, updateAddPlaceDraft } = useReport();
  const [moved, setMoved] = useState(false);

  const confirm = () => {
    const addr = {
      label: isEdit
        ? 'Jl. Osaka Residence II No.1, Daan Mogot, Kec. Kalideres, West Jakarta City, Jakarta 11840, Indonesia'
        : 'Jl. Osaka Residence II No.1, Kalideres, Jakarta',
      lat: -6.1352,
      lng: 106.7051,
    };
    setSelectedAddress(addr);
    updateAddPlaceDraft({ address: addr });
    if (mapReturnPath === '/edit/select' || mapReturnPath === '/edit/address') {
      navigate(mapReturnPath, { state: { address: addr.label } });
      return;
    }
    navigate(mapReturnPath, moved && isEdit ? { state: { address: addr.label } } : undefined);
  };

  return (
    <div className="flex min-h-screen flex-col bg-neutral-100">
      <header className="flex items-center gap-2 bg-white px-3 py-2">
        <button type="button" onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center text-xl">
          ‹
        </button>
        <div className="flex flex-1 items-center gap-2 rounded-full bg-card px-4 py-2.5">
          <span className="text-neutral-400">🔍</span>
          <input placeholder="Search" className="flex-1 bg-transparent text-[15px] outline-none" />
          <span className="text-neutral-400">🎤</span>
        </div>
        <button type="button" onClick={confirm} className="shrink-0 rounded-full bg-tiktok px-4 py-2 text-[14px] font-semibold text-white">
          Confirm
        </button>
      </header>

      <div className="relative flex-1 bg-gradient-to-br from-emerald-50 via-teal-100 to-green-200">
        <button
          type="button"
          onClick={() => setMoved(true)}
          className="absolute inset-0"
          aria-label="Drag map"
        />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
          <span className="text-4xl drop-shadow">📍</span>
        </div>
        <div className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 rounded-xl bg-white px-4 py-2 text-[13px] font-medium shadow-lg">
          {moved ? 'The location has been updated, please confirm.' : 'Drag the map to select a location'}
        </div>
        <button type="button" className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow">
          ⊕
        </button>
      </div>
    </div>
  );
}
