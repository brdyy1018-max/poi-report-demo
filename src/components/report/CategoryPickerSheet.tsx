import { useEffect, useMemo, useState } from 'react';
import {
  formatCategoryPath,
  FULL_CATEGORY_TREE,
  type CategoryPath,
} from '../../mock/categoryTreeData';

export function CategoryPickerSheet({
  open,
  onClose,
  onConfirm,
  initialPath,
  currentPath,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (path: CategoryPath) => void;
  initialPath: CategoryPath;
  currentPath: CategoryPath;
}) {
  const [l1, setL1] = useState(initialPath.l1);
  const [l2, setL2] = useState(initialPath.l2);
  const [l3, setL3] = useState(initialPath.l3);

  useEffect(() => {
    if (!open) return;
    setL1(initialPath.l1);
    setL2(initialPath.l2);
    setL3(initialPath.l3);
  }, [open, initialPath.l1, initialPath.l2, initialPath.l3]);

  const midOptions = useMemo(
    () => FULL_CATEGORY_TREE.find((r) => r.name === l1)?.children ?? [],
    [l1],
  );

  const leafOptions = useMemo(
    () => midOptions.find((m) => m.name === l2)?.children ?? [],
    [midOptions, l2],
  );

  const pickL1 = (name: string) => {
    setL1(name);
    const root = FULL_CATEGORY_TREE.find((r) => r.name === name);
    const firstMid = root?.children[0];
    setL2(firstMid?.name ?? '');
    setL3(firstMid?.children[0]?.name ?? '');
  };

  const pickL2 = (name: string) => {
    setL2(name);
    const mid = midOptions.find((m) => m.name === name);
    setL3(mid?.children[0]?.name ?? '');
  };

  const canConfirm = l1 && l2 && l3;
  const currentDisplay = formatCategoryPath(currentPath).replace(/ > /g, ' › ');

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" role="dialog" aria-modal="true">
      <button type="button" className="absolute inset-0 bg-black/45" aria-label="Close" onClick={onClose} />
      <div className="relative flex max-h-[88vh] w-full max-w-phone flex-col rounded-t-3xl bg-white safe-bottom">
        <header className="flex shrink-0 items-center justify-between border-b border-neutral-100 px-4 py-3">
          <button type="button" onClick={onClose} className="text-[16px] text-neutral-600 active:opacity-70">
            Cancel
          </button>
          <h2 className="flex items-center gap-1 text-[16px] font-bold text-neutral-900">
            Select category
            <span
              className="flex h-4 w-4 items-center justify-center rounded-full bg-neutral-200 text-[10px] font-bold text-neutral-600"
              title="Pick the most specific category"
            >
              ?
            </span>
          </h2>
          <button
            type="button"
            disabled={!canConfirm}
            onClick={() => onConfirm({ l1, l2, l3 })}
            className="text-[16px] font-semibold text-tiktok disabled:text-neutral-300"
          >
            Confirm
          </button>
        </header>

        <div className="shrink-0 border-b border-neutral-100 px-4 py-3">
          <p className="mb-1 text-[13px] font-medium text-neutral-500">Current category</p>
          <p className="text-[14px] font-semibold leading-snug text-neutral-900">{currentDisplay}</p>
        </div>

        <div className="grid min-h-[240px] flex-1 grid-cols-3 divide-x divide-neutral-100">
          <CategoryColumn
            items={FULL_CATEGORY_TREE.map((r) => r.name)}
            selected={l1}
            onSelect={pickL1}
            showBar
          />
          <CategoryColumn items={midOptions.map((m) => m.name)} selected={l2} onSelect={pickL2} />
          <CategoryColumn items={leafOptions.map((l) => l.name)} selected={l3} onSelect={setL3} showCheck />
        </div>
      </div>
    </div>
  );
}

function CategoryColumn({
  items,
  selected,
  onSelect,
  showBar,
  showCheck,
}: {
  items: string[];
  selected: string;
  onSelect: (name: string) => void;
  showBar?: boolean;
  showCheck?: boolean;
}) {
  return (
    <ul className="overflow-y-auto py-1">
      {items.map((name) => {
        const active = name === selected;
        return (
          <li key={name}>
            <button
              type="button"
              onClick={() => onSelect(name)}
              className={`relative flex w-full items-center justify-between px-3 py-3.5 text-left text-[14px] ${
                active ? 'font-semibold text-tiktok' : 'text-neutral-800'
              }`}
            >
              {showBar && active && (
                <span className="absolute bottom-2 left-0 top-2 w-0.5 rounded-full bg-tiktok" />
              )}
              <span className={showBar ? 'pl-1' : ''}>{name}</span>
              {showCheck && active && <span className="text-tiktok">✓</span>}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
