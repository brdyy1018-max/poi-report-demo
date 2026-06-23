import { SelectRow } from '../ui/FormFields';
import { StatusBusinessHoursModule, StatusOpeningDateModule } from './EditStatusFields';
import type { BusinessStatus } from '../../types';

export function showsBusinessHours(status: BusinessStatus | '') {
  return status === 'open' || status === 'coming-soon';
}

export function showsOpeningDate(status: BusinessStatus | '') {
  return status === 'coming-soon';
}

export function isClosedStatus(status: BusinessStatus | '') {
  return status === 'closed' || status === 'temporarily-closed' || status === 'permanently-closed';
}

/** Opening date + business hours — shown based on selected status */
export function StatusFollowUpFields(
  props:
    | {
        variant: 'add-place';
        status: BusinessStatus | '';
        openingDate: string;
        onOpeningDateChange: (value: string) => void;
        hoursSummary?: string;
        hoursPlaceholder?: string;
        onEditHours: () => void;
      }
    | {
        variant: 'edit';
        status: BusinessStatus | '';
        openingDate: string;
        onOpeningDateChange: (value: string) => void;
        hoursLines: string[];
        returnPath?: string;
      },
) {
  const { status, openingDate, onOpeningDateChange } = props;

  if (!showsBusinessHours(status) && !showsOpeningDate(status)) return null;

  return (
    <>
      {showsOpeningDate(status) && (
        <StatusOpeningDateModule openingDate={openingDate} onChange={onOpeningDateChange} />
      )}
      {showsBusinessHours(status) &&
        (props.variant === 'add-place' ? (
          <SelectRow
            label="Business hours"
            value={props.hoursSummary}
            placeholder={props.hoursPlaceholder ?? 'Add opening hours'}
            onClick={props.onEditHours}
          />
        ) : (
          <StatusBusinessHoursModule hoursLines={props.hoursLines} returnPath={props.returnPath} />
        ))}
    </>
  );
}

/** Whether a status change can be submitted (edit / add flows) */
export function isStatusSubmitReady(
  status: BusinessStatus | '',
  opts: { openingDate?: string; hasHours?: boolean },
) {
  if (status === 'open') return !!opts.hasHours;
  if (status === 'coming-soon') return !!opts.openingDate && !!opts.hasHours;
  return true;
}
