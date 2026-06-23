import { BottomSheet } from '../ui/BottomSheet';
import { PrimaryButton } from '../ui/FormFields';

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const MINUTES = ['00', '15', '30', '45'];

interface TimePickerSheetProps {
  open: boolean;
  value: string;
  onClose: () => void;
  onSave: (time: string) => void;
}

/** 06 Edit Hours — Select time 底部滚轮 */
export function TimePickerSheet({ open, value, onClose, onSave }: TimePickerSheetProps) {
  const [h, m] = value.split(':');

  const pick = (hour: string, minute: string) => {
    onSave(`${hour}:${minute}`);
    onClose();
  };

  return (
    <BottomSheet open={open} onClose={onClose} title="Select time">
      <div className="flex justify-center gap-4 py-2">
        <div className="h-40 overflow-y-auto scroll-smooth">
          {HOURS.map((hour) => (
            <button
              key={hour}
              type="button"
              onClick={() => pick(hour, m || '00')}
              className={`block w-16 py-2 text-center text-[20px] ${hour === h ? 'font-bold text-tiktok' : 'text-neutral-400'}`}
            >
              {hour}
            </button>
          ))}
        </div>
        <span className="self-center text-2xl font-light text-neutral-300">:</span>
        <div className="h-40 overflow-y-auto">
          {MINUTES.map((minute) => (
            <button
              key={minute}
              type="button"
              onClick={() => pick(h || '10', minute)}
              className={`block w-16 py-2 text-center text-[20px] ${minute === m ? 'font-bold text-tiktok' : 'text-neutral-400'}`}
            >
              {minute}
            </button>
          ))}
        </div>
      </div>
      <PrimaryButton onClick={onClose}>Save</PrimaryButton>
    </BottomSheet>
  );
}
