import { useState } from 'react';
import { TimePickerSheet } from './TimePickerSheet';
import type { HoursTimeSlot } from '../../types';

export function formatTimeSlot(slot: HoursTimeSlot) {
  if (slot.overnight) return `${slot.open}–${slot.close} (next day)`;
  return `${slot.open}–${slot.close}`;
}

export function createTimeSlot(partial?: Partial<HoursTimeSlot>): HoursTimeSlot {
  return {
    id: `slot-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    open: '09:00',
    close: '21:00',
    overnight: false,
    ...partial,
  };
}

function MinusButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      aria-label="Remove"
      disabled={disabled}
      onClick={onClick}
      className="flex h-8 w-8 shrink-0 items-center justify-center disabled:opacity-30"
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-tiktok text-[15px] font-bold leading-none text-white">
        −
      </span>
    </button>
  );
}

function TimeSlotRows({
  slots,
  onChange,
  onPick,
  minSlots = 1,
}: {
  slots: HoursTimeSlot[];
  onChange: (slots: HoursTimeSlot[]) => void;
  onPick: (slotId: string, field: 'open' | 'close') => void;
  minSlots?: number;
}) {
  return (
    <div className="space-y-3">
      {slots.map((slot) => (
        <div key={slot.id} className="flex items-center gap-2">
          <MinusButton
            disabled={slots.length <= minSlots}
            onClick={() => onChange(slots.filter((s) => s.id !== slot.id))}
          />
          <button
            type="button"
            onClick={() => onPick(slot.id, 'open')}
            className="flex min-w-0 flex-1 items-center justify-between rounded-lg border border-neutral-200 bg-white px-3 py-3 text-[15px] text-neutral-900 active:bg-neutral-50"
          >
            <span>{formatTimeSlot(slot)}</span>
            <span className="text-neutral-400">▾</span>
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...slots, createTimeSlot()])}
        className="flex items-center gap-1 py-1 text-[15px] font-semibold text-tiktok active:opacity-80"
      >
        <span className="text-lg leading-none">+</span>
        Add business hours
      </button>
    </div>
  );
}

export function BusinessHoursEditor({
  regularSlots,
  onRegularChange,
}: {
  regularSlots: HoursTimeSlot[];
  onRegularChange: (slots: HoursTimeSlot[]) => void;
}) {
  const [picker, setPicker] = useState<{ slotId: string; field: 'open' | 'close' } | null>(null);

  const pickerValue = picker
    ? (regularSlots.find((s) => s.id === picker.slotId)?.[picker.field] ?? '09:00')
    : '09:00';

  const applyTime = (time: string) => {
    if (!picker) return;
    onRegularChange(
      regularSlots.map((s) => {
        if (s.id !== picker.slotId) return s;
        const next = { ...s, [picker.field]: time };
        if (picker.field === 'close' && next.open > time) next.overnight = true;
        if (picker.field === 'open' && next.close < time) next.overnight = false;
        return next;
      }),
    );
    setPicker(null);
  };

  return (
    <>
      <section className="space-y-3">
        <h2 className="text-[16px] font-bold text-neutral-900">Business hours</h2>
        <TimeSlotRows
          slots={regularSlots}
          onChange={onRegularChange}
          onPick={(slotId, field) => setPicker({ slotId, field })}
        />
      </section>

      <TimePickerSheet
        open={!!picker}
        value={pickerValue}
        onClose={() => setPicker(null)}
        onSave={applyTime}
      />
    </>
  );
}

export function buildHoursSummary(regularSlots: HoursTimeSlot[]) {
  return regularSlots.map((s) => formatTimeSlot(s));
}
