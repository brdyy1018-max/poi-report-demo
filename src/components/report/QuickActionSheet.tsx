import { useNavigate } from 'react-router-dom';
import { useReport } from '../../context/ReportContext';
import { QUICK_MENU_ITEMS } from '../../mock/poiData';
import { BottomSheet, SheetMenuItem } from '../ui/BottomSheet';

/** 全局提报快捷导航 — 挂载在 App 层 */
export function QuickActionSheet() {
  const { quickMenuOpen, closeQuickMenu } = useReport();
  const navigate = useNavigate();

  const handleSelect = (item: (typeof QUICK_MENU_ITEMS)[number]) => {
    closeQuickMenu();
    navigate(item.route);
  };

  return (
    <BottomSheet open={quickMenuOpen} onClose={closeQuickMenu} title="Suggest an edit">
      <nav className="divide-y divide-neutral-100">
        {QUICK_MENU_ITEMS.map((item) => (
          <SheetMenuItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            description={item.description}
            onClick={() => handleSelect(item)}
          />
        ))}
      </nav>
    </BottomSheet>
  );
}
