import { useNavigate } from 'react-router-dom';
import { useReport } from '../../context/ReportContext';
import { BottomSheet, SheetMenuItem } from '../ui/BottomSheet';

/** POI Entry · Step 2 — Bottom Sheet（详情页无 Add photo） */
export function PoiActionSheet() {
  const { quickMenuOpen, closeQuickMenu } = useReport();
  const navigate = useNavigate();

  const go = (path: string) => {
    closeQuickMenu();
    navigate(path);
  };

  return (
    <BottomSheet open={quickMenuOpen} onClose={closeQuickMenu}>
      <nav className="divide-y divide-neutral-100">
        <SheetMenuItem
          icon="✏️"
          label="Suggest an edit"
          description="Fix name, address, hours, and more"
          onClick={() => go('/report')}
        />
        <SheetMenuItem
          icon="🚩"
          label="Report"
          description="Something wrong with this place"
          onClick={() => go('/feedback')}
        />
        <SheetMenuItem
          icon="💬"
          label="Leave feedback"
          description="Share your experience at this place"
          onClick={() => go('/feedback')}
        />
      </nav>
    </BottomSheet>
  );
}
