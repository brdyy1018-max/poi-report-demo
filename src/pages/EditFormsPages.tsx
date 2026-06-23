import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { CategoryPickerSheet } from '../components/report/CategoryPickerSheet';
import { BusinessHoursEditor, buildHoursSummary } from '../components/report/BusinessHoursEditor';
import { EditFormLayout, HeaderSubmitButton } from '../components/report/EditFormLayout';
import { BusinessStatusFields } from '../components/report/BusinessStatusFields';
import { BranchNameField } from '../components/report/BranchNameField';
import { isStatusSubmitReady } from '../components/report/StatusFollowUpFields';
import { EditPhoneEvidence, EditPhoneList, hasValidPhones } from '../components/report/EditPhoneFields';
import { EditSubpageExtras } from '../components/report/EditSubpageExtras';
import { MiniMapPreview } from '../components/report/MiniMapPreview';
import { ReadOnlyField, SupplementaryFields } from '../components/report/SupplementaryFields';
import { TimePickerSheet } from '../components/report/TimePickerSheet';
import { AddressAutocomplete } from '../components/ui/AddressAutocomplete';
import { FieldLabel, TextArea, TextInput } from '../components/ui/FormFields';
import { useReport } from '../context/ReportContext';
import { EDIT_POI, EDIT_STATUS_OPTIONS, PHONE_REGIONS } from '../mock/poiData';
import { EDIT_POI_CATEGORY, formatCategoryPath } from '../mock/categoryTreeData';
import type { BusinessStatus, PhoneEntry, ReportType } from '../types';

type EditSubmitMeta = {
  type: ReportType;
  title: string;
  summary: string;
  /** 嵌套编辑（如 status → hours）保存后返回，不跳成功页 */
  returnTo?: string;
};

function useFieldSave(canSave: boolean, onSave: () => void, submission: EditSubmitMeta) {
  const navigate = useNavigate();
  const { addSubmission } = useReport();
  const submit = () => {
    if (!canSave) return;
    onSave();
    if (submission.returnTo) {
      navigate(submission.returnTo);
      return;
    }
    addSubmission(submission.type, submission.title, submission.summary);
    navigate('/success?type=suggest-edit');
  };
  return { submit };
}

/** 01 Modify Name */
export function EditNamePage() {
  const { editInfoDraft, updateEditInfoDraft } = useReport();
  const [correctName, setCorrectName] = useState('');
  const [branchName, setBranchName] = useState(editInfoDraft.branchName);
  const [note, setNote] = useState(editInfoDraft.note);
  const [photos, setPhotos] = useState<string[]>(editInfoDraft.photos);

  const canSubmit = correctName.trim().length > 0 && photos.length > 0;

  const { submit } = useFieldSave(
    canSubmit,
    () =>
      updateEditInfoDraft({
        name: correctName.trim(),
        branchName: branchName.trim(),
        note,
        photos,
      }),
    { type: 'edit-name', title: 'Modify Name', summary: correctName.trim() },
  );

  return (
    <EditFormLayout
      title="Modify Name"
      canSubmit={canSubmit}
      onSubmit={submit}
      showExtras={false}
    >
      <div className="space-y-5">
        <div>
          <FieldLabel label="Correct name" required />
          <TextInput
            value={correctName}
            onChange={(e) => setCorrectName(e.target.value)}
            placeholder="Enter the correct name"
            className="border border-neutral-200 bg-white"
          />
        </div>

        <BranchNameField
          value={branchName}
          onChange={setBranchName}
          inputClassName="border border-neutral-200 bg-white"
        />

        <SupplementaryFields
          note={note}
          onNoteChange={setNote}
          photos={photos}
          onAddPhoto={() => setPhotos((p) => [...p, `photo-${p.length + 1}`])}
          onRemovePhoto={(i) => setPhotos((p) => p.filter((_, j) => j !== i))}
        />
      </div>
    </EditFormLayout>
  );
}

/** 02 Modify Status */
export function EditStatusPage() {
  const { editInfoDraft, updateEditInfoDraft } = useReport();

  const currentOption =
    EDIT_STATUS_OPTIONS.find((o) => o.label === EDIT_POI.status) ?? EDIT_STATUS_OPTIONS[0];
  const [selected, setSelected] = useState<BusinessStatus>(currentOption.value);
  const [openingDate, setOpeningDate] = useState(editInfoDraft.openingDate);

  const statusChanged = selected !== currentOption.value;
  const hasHours = editInfoDraft.hoursLines.length > 0;

  const canSubmit =
    statusChanged &&
    isStatusSubmitReady(selected, { openingDate, hasHours });

  const selectedLabel =
    EDIT_STATUS_OPTIONS.find((o) => o.value === selected)?.label ?? selected;

  const { submit } = useFieldSave(
    canSubmit,
    () =>
      updateEditInfoDraft({
        businessStatus: selected,
        openingDate: selected === 'coming-soon' ? openingDate : '',
      }),
    { type: 'edit-status', title: 'Modify Status', summary: selectedLabel },
  );

  return (
    <EditFormLayout
      title="Modify Status"
      canSubmit={canSubmit}
      onSubmit={submit}
      showExtras={false}
      showCurrentName={false}
    >
      <div className="space-y-5">
        <ReadOnlyField label="Current name" value={EDIT_POI.name} />

        <BusinessStatusFields
          status={selected}
          openingDate={openingDate}
          onStatusChange={setSelected}
          onOpeningDateChange={setOpeningDate}
          name="edit-status"
          showHints
          followUp={{
            variant: 'edit',
            hoursLines: editInfoDraft.hoursLines,
            returnPath: '/edit/status',
          }}
        />
      </div>
    </EditFormLayout>
  );
}

/** 03 Modify Address/Coordinates */
export function EditAddressPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { editInfoDraft, updateEditInfoDraft, setMapReturnPath } = useReport();
  const [address, setAddress] = useState(editInfoDraft.location || EDIT_POI.address);
  const [note, setNote] = useState(editInfoDraft.note);
  const [photos, setPhotos] = useState<string[]>(editInfoDraft.photos);

  const canSubmit = address.trim().length > 0;

  const { submit } = useFieldSave(
    canSubmit,
    () => updateEditInfoDraft({ location: address.trim(), note, photos }),
    { type: 'edit-address', title: 'Modify Address/Coordinates', summary: address.trim() },
  );

  useEffect(() => {
    const next = (location.state as { address?: string })?.address;
    if (next) setAddress(next);
  }, [location.state]);

  const openMap = () => {
    setMapReturnPath('/edit/address');
    navigate('/map-picker?mode=edit');
  };

  return (
    <EditFormLayout
      title="Modify Address/Coordinates"
      canSubmit={canSubmit}
      onSubmit={submit}
      showExtras={false}
    >
      <div className="space-y-5">
        <section>
          <FieldLabel label="Address & Coordinates" required />
          <MiniMapPreview onClick={openMap} editButtonLabel="Edit location" />
          <div className="relative mt-3">
            <AddressAutocomplete
              value={address}
              onChange={setAddress}
              placeholder="Enter address"
              className="border-0 bg-neutral-100 pr-10 focus:ring-tiktok/20"
            />
            {address.length > 0 && (
              <button
                type="button"
                aria-label="Clear address"
                onClick={() => setAddress('')}
                className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-300/80 text-[12px] text-neutral-600 active:bg-neutral-400"
              >
                ×
              </button>
            )}
          </div>
        </section>

        <SupplementaryFields
          note={note}
          onNoteChange={setNote}
          photos={photos}
          onAddPhoto={() => setPhotos((p) => [...p, `photo-${p.length + 1}`])}
          onRemovePhoto={(i) => setPhotos((p) => p.filter((_, j) => j !== i))}
        />
      </div>
    </EditFormLayout>
  );
}

/** 04 Modify Category */
export function EditCategoryPage() {
  const { editInfoDraft, updateEditInfoDraft } = useReport();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedPath, setSelectedPath] = useState(() => {
    const parts = editInfoDraft.category.split(' > ');
    if (parts.length === 3) {
      return { l1: parts[0], l2: parts[1], l3: parts[2] };
    }
    return { ...EDIT_POI_CATEGORY.current };
  });

  const currentDisplay = formatCategoryPath(EDIT_POI_CATEGORY.current);
  const selectedDisplay = formatCategoryPath(selectedPath);
  const hasChange = selectedDisplay !== currentDisplay;

  const { submit } = useFieldSave(
    hasChange,
    () => updateEditInfoDraft({ category: selectedDisplay }),
    { type: 'edit-category', title: 'Modify Category', summary: selectedDisplay },
  );

  return (
    <>
      <EditFormLayout
        title="Modify Category"
        canSubmit={hasChange}
        onSubmit={submit}
        showExtras={false}
      >
        <div className="space-y-5">
          <div>
            <FieldLabel label="Please provide the correct category" required />
            <button
              type="button"
              onClick={() => setPickerOpen(true)}
              className="mt-2 flex w-full items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-left active:bg-neutral-50"
            >
              <span className="min-w-0 flex-1 truncate text-[15px] text-neutral-900">{selectedDisplay}</span>
              <span className="ml-2 shrink-0 text-neutral-400">›</span>
            </button>
            <p className="mt-2 text-[13px] text-neutral-500">
              Current category (reference):{' '}
              <span className="font-medium text-neutral-700">{currentDisplay}</span>
            </p>
          </div>
        </div>
      </EditFormLayout>

      <CategoryPickerSheet
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        initialPath={selectedPath}
        currentPath={EDIT_POI_CATEGORY.current}
        onConfirm={(path) => {
          setSelectedPath(path);
          setPickerOpen(false);
        }}
      />
    </>
  );
}

/** 05 Modify / Add Phone Number */
export function EditPhonePage() {
  const navigate = useNavigate();
  const { editInfoDraft, updateEditInfoDraft, addSubmission } = useReport();
  const [phones, setPhones] = useState<PhoneEntry[]>(
    editInfoDraft.phones.length ? editInfoDraft.phones.map((p) => ({ ...p })) : [{ id: 'p1', areaCode: '', number: '' }],
  );
  const [note, setNote] = useState(editInfoDraft.note);
  const [photos, setPhotos] = useState<string[]>(editInfoDraft.photos);

  const canSubmit = hasValidPhones(phones);

  const submit = () => {
    if (!canSubmit) return;
    updateEditInfoDraft({ phones, note, photos });
    const summary = phones.map((p) => `${p.areaCode} ${p.number}`.trim()).join(', ');
    addSubmission('edit-phone', 'Modify/Add Phone Number', summary || 'Phone updated');
    navigate('/success?type=suggest-edit');
  };

  return (
    <EditFormLayout title="Modify/Add Phone Number" canSubmit={canSubmit} onSubmit={submit} showExtras={false}>
      <EditPhoneList phones={phones} onChange={setPhones} />

      <EditPhoneEvidence
        photos={photos}
        onAddPhoto={() => setPhotos((p) => [...p, `photo-${p.length + 1}`])}
        onRemovePhoto={(i) => setPhotos((p) => p.filter((_, j) => j !== i))}
      />

      <div>
        <div className="relative">
          <TextArea
            rows={4}
            maxLength={300}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Please provide more information to help staff verify"
            className="border border-neutral-200 bg-neutral-50 pb-8"
          />
          <span className="pointer-events-none absolute bottom-3 right-3 text-[12px] text-neutral-400">
            {note.length}/300
          </span>
        </div>
        <p className="mt-4 text-center text-[12px] text-neutral-500">
          Please submit true, accurate, and valid information
        </p>
      </div>
    </EditFormLayout>
  );
}

/** 06 Modify Business Hours */
export function EditHoursPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const backTo = params.get('return') || '/report';
  const { editInfoDraft, updateEditInfoDraft, addSubmission } = useReport();

  const [regularSlots, setRegularSlots] = useState(
    editInfoDraft.regularHourSlots.length
      ? editInfoDraft.regularHourSlots.map((s) => ({ ...s }))
      : [{ id: 'r1', open: '17:00', close: '02:00', overnight: true }],
  );

  const canSave = regularSlots.length > 0;

  const isNestedReturn = backTo.startsWith('/edit/') && backTo !== '/edit/hours';

  const save = () => {
    if (!canSave) return;
    const hoursLines = buildHoursSummary(regularSlots);
    updateEditInfoDraft({ regularHourSlots: regularSlots, hoursLines });
    if (isNestedReturn) {
      navigate(backTo);
      return;
    }
    addSubmission('edit-hours', 'Modify Business Hours', hoursLines.join(', '));
    navigate('/success?type=suggest-edit');
  };

  return (
    <EditFormLayout
      title="Business hours"
      canSubmit={canSave}
      onSubmit={save}
      backTo={backTo}
      showExtras={false}
      showCurrentName={false}
    >
      <div className="space-y-5">
        <ReadOnlyField label="Current name" value={EDIT_POI.name} />
        <BusinessHoursEditor regularSlots={regularSlots} onRegularChange={setRegularSlots} />
      </div>
    </EditFormLayout>
  );
}

export function EditPhotosPage() {
  const { editInfoDraft, updateEditInfoDraft } = useReport();
  const [photos, setPhotos] = useState<{ type: string; id: string }[]>(
    editInfoDraft.photos.map((id, i) => ({ type: ['Exterior', 'Interior', 'Menu'][i] || 'Other', id })),
  );
  const { submit } = useFieldSave(
    photos.length > 0,
    () => updateEditInfoDraft({ photos: photos.map((p) => p.id) }),
    {
      type: 'edit-photos',
      title: 'Add photo',
      summary: `${photos.length} photo${photos.length === 1 ? '' : 's'} uploaded`,
    },
  );

  const PHOTO_TYPES = ['Exterior', 'Interior', 'Menu', 'Storefront sign', 'Other'];

  return (
    <EditFormLayout title="Add photo" canSubmit={photos.length > 0} onSubmit={submit}>
      <div className="rounded-2xl bg-card px-4 py-4">
        <FieldLabel label="Add photos of this place" required hint="Help others recognize this location" />
        <div className="flex flex-wrap gap-3">
          {photos.map((p, i) => (
            <div key={p.id} className="relative h-24 w-24 overflow-hidden rounded-xl bg-neutral-300">
              <span className="absolute bottom-1 left-1 rounded bg-black/50 px-1 text-[9px] text-white">{p.type}</span>
              <button
                type="button"
                onClick={() => setPhotos((arr) => arr.filter((_, j) => j !== i))}
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-[10px] text-white"
              >
                ×
              </button>
            </div>
          ))}
          {PHOTO_TYPES.filter((t) => !photos.some((p) => p.type === t))
            .slice(0, 1)
            .map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setPhotos((arr) => [...arr, { type, id: `${type}-${arr.length}` }])}
                className="flex h-24 w-24 flex-col items-center justify-center rounded-xl bg-neutral-200 text-neutral-500"
              >
                <span className="text-3xl font-light">+</span>
                <span className="text-[10px]">{type}</span>
              </button>
            ))}
        </div>
      </div>
    </EditFormLayout>
  );
}

export function EditIdentityPage() {
  const { editInfoDraft } = useReport();
  const { submit } = useFieldSave(!!editInfoDraft.identity, () => undefined, {
    type: 'edit-identity',
    title: 'Your identity',
    summary: editInfoDraft.identity ?? 'Identity confirmed',
  });

  return (
    <EditFormLayout title="Your identity" canSubmit={!!editInfoDraft.identity} onSubmit={submit}>
      <p className="text-[14px] text-neutral-500">Select how you&apos;re related to this place.</p>
    </EditFormLayout>
  );
}

/** 06 子页 — Edit hours（单日编辑） */
export function EditHoursDayPage() {
  const navigate = useNavigate();
  const { editInfoDraft, updateEditInfoDraft, addSubmission } = useReport();
  const [mode, setMode] = useState<'24h' | 'closed' | 'specific'>('specific');
  const [slots, setSlots] = useState([{ open: '10:00', close: '17:00' }]);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [activeDay, setActiveDay] = useState(0);
  const [picker, setPicker] = useState<{ slot: number; field: 'open' | 'close' } | null>(null);

  const addSlot = () => setSlots((s) => [...s, { open: '14:30', close: '17:00' }]);
  const removeSlot = (i: number) => setSlots((s) => s.filter((_, j) => j !== i));

  const updateTime = (time: string) => {
    if (!picker) return;
    setSlots((s) => {
      const next = [...s];
      next[picker.slot] = { ...next[picker.slot], [picker.field]: time };
      return next;
    });
  };

  const save = () => {
    const label = dayLabels[activeDay];
    let line = `${label} Closed`;
    if (mode === '24h') line = `${label} Open 24 hours`;
    else if (mode === 'specific') {
      const fmt = (t: string) => {
        const [h, m] = t.split(':').map(Number);
        const ap = h >= 12 ? 'PM' : 'AM';
        const hr = h % 12 || 12;
        return `${hr}:${String(m).padStart(2, '0')} ${ap}`;
      };
      line = `${label} ${fmt(slots[0].open)} – ${fmt(slots[0].close)}`;
    }
    const next = [...editInfoDraft.hoursLines];
    next[activeDay] = line;
    updateEditInfoDraft({ hoursLines: next });
    addSubmission('edit-hours', 'Modify Business Hours', line);
    navigate('/success?type=suggest-edit');
  };

  return (
    <div className="min-h-screen bg-white pb-8">
      <PageHeader
        title="Edit hours"
        onBack={() => navigate('/report')}
        right={<HeaderSubmitButton onClick={save} />}
      />

      <div className="space-y-4 px-4 pb-4">
        <ReadOnlyField label="Current name" value={EDIT_POI.name} />
      </div>

      <div className="flex justify-center gap-2 px-4 py-4">
        {days.map((d, i) => (
          <button
            key={`${d}-${i}`}
            type="button"
            onClick={() => setActiveDay(i)}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-semibold ${
              activeDay === i ? 'bg-tiktok text-white' : 'bg-card text-neutral-600'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="space-y-0 px-4">
        {[
          { id: '24h' as const, label: 'Open 24 hours' },
          { id: 'closed' as const, label: 'Closed all day' },
          { id: 'specific' as const, label: 'Specific operating hours' },
        ].map((opt) => (
          <label key={opt.id} className="flex cursor-pointer items-center gap-3 border-b border-neutral-100 py-4">
            <input type="radio" checked={mode === opt.id} onChange={() => setMode(opt.id)} className="accent-tiktok" />
            <span className="text-[15px] font-medium">{opt.label}</span>
          </label>
        ))}

        {mode === 'specific' && (
          <div className="space-y-3 py-3">
            {slots.map((slot, i) => (
              <div key={i} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPicker({ slot: i, field: 'open' })}
                  className="flex flex-1 items-center justify-between rounded-xl bg-card px-3 py-3 text-[15px]"
                >
                  {slot.open}
                  <span className="text-neutral-400">▾</span>
                </button>
                <span>–</span>
                <button
                  type="button"
                  onClick={() => setPicker({ slot: i, field: 'close' })}
                  className="flex flex-1 items-center justify-between rounded-xl bg-card px-3 py-3 text-[15px]"
                >
                  {slot.close}
                  <span className="text-neutral-400">▾</span>
                </button>
                {slots.length > 1 && (
                  <button type="button" onClick={() => removeSlot(i)} className="text-neutral-400">
                    ×
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addSlot} className="text-[14px] font-semibold text-google">
              + Add hours
            </button>
          </div>
        )}
      </div>

      <div className="px-4 pb-6">
        <EditSubpageExtras />
      </div>

      <TimePickerSheet
        open={!!picker}
        value={picker ? slots[picker.slot][picker.field] : '10:00'}
        onClose={() => setPicker(null)}
        onSave={updateTime}
      />
    </div>
  );
}

/** Region 选择（电话区号） */
export function RegionPickerPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const returnTo = params.get('return') || '/edit/phone';
  const [query, setQuery] = useState('');

  const list = useMemo(
    () => PHONE_REGIONS.filter((r) => r.label.toLowerCase().includes(query.toLowerCase()) || r.dial.includes(query)),
    [query],
  );

  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between border-b border-neutral-100 px-4 py-3">
        <h1 className="text-[17px] font-semibold">Region</h1>
        <button type="button" onClick={() => navigate(returnTo)} className="text-xl text-neutral-500">
          ×
        </button>
      </header>
      <div className="px-4 py-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="w-full rounded-xl bg-card px-4 py-3 text-[15px] outline-none"
        />
      </div>
      <nav className="divide-y divide-neutral-100">
        {list.map((r) => (
          <button
            key={r.code}
            type="button"
            onClick={() => navigate(returnTo, { state: { region: r } })}
            className="w-full px-4 py-3.5 text-left text-[15px] active:bg-neutral-50"
          >
            {r.label}
            <span className="text-neutral-500"> ({r.dial})</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
