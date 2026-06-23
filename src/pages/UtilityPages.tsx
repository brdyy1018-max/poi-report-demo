import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { FormCard } from '../components/ui/FormCard';
import { CATEGORIES, CATEGORY_TREE, DEFAULT_HOURS } from '../mock/poiData';
import { PrimaryButton } from '../components/ui/FormFields';
import { useReport } from '../context/ReportContext';

/** 营业时间编辑（Add place 用） */
export function OpeningHoursPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const returnTo = params.get('return') || '/add-place';
  const { addPlaceDraft, updateAddPlaceDraft } = useReport();
  const [hours, setHours] = useState(addPlaceDraft.hours.length ? addPlaceDraft.hours : DEFAULT_HOURS);

  const save = () => {
    updateAddPlaceDraft({ hours });
    navigate(returnTo);
  };

  return (
    <div className="min-h-screen bg-white pb-28">
      <PageHeader title="Opening hours" />
      <div className="space-y-2 px-4 py-4">
        {hours.map((day, i) => (
          <FormCard key={day.day} className="!p-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-10 text-[14px] font-semibold">{day.day}</span>
              <label className="flex items-center gap-2 text-[13px]">
                <input
                  type="checkbox"
                  checked={day.closed}
                  onChange={(e) => {
                    const next = [...hours];
                    next[i] = { ...day, closed: e.target.checked };
                    setHours(next);
                  }}
                />
                Closed
              </label>
              {!day.closed && (
                <>
                  <input
                    type="time"
                    value={day.open}
                    className="rounded-lg border px-2 py-1 text-[13px]"
                    onChange={(e) => {
                      const next = [...hours];
                      next[i] = { ...day, open: e.target.value };
                      setHours(next);
                    }}
                  />
                  <span>–</span>
                  <input
                    type="time"
                    value={day.close}
                    className="rounded-lg border px-2 py-1 text-[13px]"
                    onChange={(e) => {
                      const next = [...hours];
                      next[i] = { ...day, close: e.target.value };
                      setHours(next);
                    }}
                  />
                </>
              )}
            </div>
          </FormCard>
        ))}
      </div>
      <div className="fixed bottom-0 left-1/2 w-full max-w-phone -translate-x-1/2 px-4 py-4 safe-bottom">
        <PrimaryButton onClick={save}>Save hours</PrimaryButton>
      </div>
    </div>
  );
}

/** 品类选择 — 搜索 + 单选 + Confirm（参考 04 Edit Category） */
export function CategoryPickerPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const returnTo = params.get('return') || '/add-place';
  const { updateAddPlaceDraft, updateEditInfoDraft } = useReport();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('Travel');
  const flat = [...CATEGORIES, ...CATEGORY_TREE.flatMap((c) => c.children)];
  const filtered = flat.filter((c) => c.toLowerCase().includes(query.toLowerCase()));

  const confirm = () => {
    updateAddPlaceDraft({ category: selected });
    if (returnTo === '/edit/select' || returnTo === '/edit/category') {
      updateEditInfoDraft({ category: selected });
    }
    navigate(returnTo, { state: { category: selected } });
  };

  return (
    <div className="flex min-h-screen flex-col bg-white pb-28">
      <PageHeader title="Select Category" light />
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 rounded-xl bg-card px-4 py-3">
          <span className="text-neutral-400">🔍</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="flex-1 bg-transparent text-[15px] outline-none"
          />
        </div>
      </div>
      <nav className="flex-1 divide-y divide-neutral-100">
        {filtered.map((c) => (
          <label key={c} className="flex cursor-pointer items-center justify-between px-4 py-4">
            <span className="text-[16px]">{c}</span>
            <input
              type="radio"
              name="cat"
              checked={selected === c}
              onChange={() => setSelected(c)}
              className="h-5 w-5 accent-tiktok"
            />
          </label>
        ))}
      </nav>
      <div className="fixed bottom-0 left-1/2 w-full max-w-phone -translate-x-1/2 px-4 py-4 safe-bottom">
        <PrimaryButton onClick={confirm}>Confirm</PrimaryButton>
      </div>
    </div>
  );
}

/** 品类多级 — 有子类时继续下钻 */
export function CategoryTreePage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const parent = params.get('parent') || '';
  const returnTo = params.get('return') || '/edit/category';
  const node = CATEGORY_TREE.find((c) => c.name === parent);

  if (node?.children.length) {
    return (
      <div className="min-h-screen bg-white">
        <PageHeader title="Category" />
        <nav className="divide-y divide-neutral-100">
          {node.children.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => navigate(returnTo, { state: { category: c } })}
              className="flex w-full items-center justify-between px-4 py-4 text-left text-[16px]"
            >
              {c}
              <span className="text-neutral-400">○</span>
            </button>
          ))}
        </nav>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <PageHeader title="Category" />
      <nav className="divide-y divide-neutral-100">
        {CATEGORY_TREE.map((c) => (
          <button
            key={c.name}
            type="button"
            onClick={() =>
              c.children.length
                ? navigate(`/category-tree?parent=${encodeURIComponent(c.name)}&return=${encodeURIComponent(returnTo)}`)
                : navigate(returnTo, { state: { category: c.name } })
            }
            className="flex w-full items-center justify-between px-4 py-4 text-left text-[16px]"
          >
            {c.name}
            <span className="text-neutral-400">{c.children.length ? '›' : '○'}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
