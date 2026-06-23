import { BusinessStatusFields } from './BusinessStatusFields';

interface AddPlaceStatusFieldsProps {
  status: import('../../types').BusinessStatus | '';
  openingDate: string;
  hoursSummary?: string;
  hoursPlaceholder?: string;
  onStatusChange: (status: import('../../types').BusinessStatus) => void;
  onOpeningDateChange: (value: string) => void;
  onEditHours: () => void;
}

/** Status first — hours / opening date shown based on selection (add place) */
export function AddPlaceStatusFields(props: AddPlaceStatusFieldsProps) {
  const { status, openingDate, hoursSummary, hoursPlaceholder, onStatusChange, onOpeningDateChange, onEditHours } =
    props;

  return (
    <BusinessStatusFields
      status={status}
      openingDate={openingDate}
      onStatusChange={onStatusChange}
      onOpeningDateChange={onOpeningDateChange}
      name="add-place-status"
      followUp={{
        variant: 'add-place',
        hoursSummary,
        hoursPlaceholder,
        onEditHours,
      }}
    />
  );
}

export { showsBusinessHours, showsOpeningDate, isClosedStatus, isStatusSubmitReady } from './StatusFollowUpFields';
