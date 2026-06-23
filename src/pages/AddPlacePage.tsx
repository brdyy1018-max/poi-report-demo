import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AddPlaceMapPreview } from '../components/report/AddPlaceMapPreview';
import { AddPlaceSocialLinks } from '../components/report/AddPlaceSocialLinks';
import { AddPlaceStatusFields, isStatusSubmitReady } from '../components/report/AddPlaceStatusFields';
import { AddPlaceStepProgress } from '../components/report/AddPlaceStepProgress';
import { BranchNameField } from '../components/report/BranchNameField';
import { IconBack } from '../components/icons/PoiIcons';
import { FieldLabel, PrimaryButton, TextArea, TextInput } from '../components/ui/FormFields';
import { useReport } from '../context/ReportContext';
import { CATEGORIES, DEFAULT_HOURS } from '../mock/poiData';
import type { BusinessStatus } from '../types';

const TOTAL_STEPS = 3;

const DEFAULT_ADDRESS = {
  label: '123 Main Street, New York, NY 10001, USA',
  lat: 40.7128,
  lng: -74.006,
};

function formatHoursSummary(hours: typeof DEFAULT_HOURS) {
  const openDays = hours.filter((d) => !d.closed);
  if (openDays.length === 0) return 'Closed every day';
  if (openDays.length === hours.length && openDays.every((d) => d.open === openDays[0].open && d.close === openDays[0].close)) {
    return `Mon–Sun ${openDays[0].open}–${openDays[0].close}`;
  }
  return `${openDays.length} days set`;
}

/** Add a place — 3-step guided wizard (from Report a place) */
export function AddPlacePage() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const { addPlaceDraft, updateAddPlaceDraft, addSubmission, resetAddPlaceDraft, setMapReturnPath } =
    useReport();
  const [justAdvanced, setJustAdvanced] = useState(false);

  const step = Math.min(TOTAL_STEPS, Math.max(1, Number(params.get('step') || '1')));

  useEffect(() => {
    if (step === 2 && !addPlaceDraft.address) {
      updateAddPlaceDraft({ address: DEFAULT_ADDRESS });
    }
    if (step === 3 && !addPlaceDraft.status) {
      updateAddPlaceDraft({ status: 'open' });
    }
  }, [step, addPlaceDraft.address, addPlaceDraft.status, updateAddPlaceDraft]);

  const goStep = (next: number, opts?: { celebrate?: boolean }) => {
    setParams({ step: String(next) }, { replace: true });
    if (opts?.celebrate !== false && next > step) {
      setJustAdvanced(true);
      window.setTimeout(() => setJustAdvanced(false), 2500);
    }
  };

  const handleBack = () => {
    if (step > 1) goStep(step - 1, { celebrate: false });
    else navigate('/report');
  };

  const goMap = () => {
    setMapReturnPath('/add-place?step=2');
    navigate('/map-picker');
  };

  const step1Ready = addPlaceDraft.photos.length > 0 && addPlaceDraft.name.trim().length > 0;
  const step2Ready = !!addPlaceDraft.address?.label;
  const step3Ready =
    !!addPlaceDraft.category &&
    !!addPlaceDraft.status &&
    isStatusSubmitReady(addPlaceDraft.status, {
      openingDate: addPlaceDraft.openingDate,
      hasHours: addPlaceDraft.hours.length > 0,
    });

  const hoursLabel = useMemo(() => {
    const h = addPlaceDraft.hours.length ? addPlaceDraft.hours : DEFAULT_HOURS;
    const edited = addPlaceDraft.hours.length > 0;
    return edited ? formatHoursSummary(h) : 'Add opening hours';
  }, [addPlaceDraft.hours]);

  const handleStatusChange = (status: BusinessStatus) => {
    updateAddPlaceDraft({
      status,
      ...(status !== 'coming-soon' ? { openingDate: '' } : {}),
    });
  };

  const submit = () => {
    const title = addPlaceDraft.branchName
      ? `${addPlaceDraft.name} (${addPlaceDraft.branchName})`
      : addPlaceDraft.name;
    addSubmission('add-place', 'Add a place', title);
    resetAddPlaceDraft();
    navigate('/success?type=add-place');
  };

  const addPhoto = () => {
    updateAddPlaceDraft({ photos: [...addPlaceDraft.photos, `photo-${addPlaceDraft.photos.length + 1}`] });
  };

  return (
    <div className="flex min-h-screen flex-col bg-white pb-28">
      <header className="sticky top-0 z-20 flex items-center border-b border-neutral-100 bg-white px-2 py-3">
        <button
          type="button"
          aria-label="Back"
          onClick={handleBack}
          className="flex h-10 w-10 items-center justify-center rounded-full active:bg-neutral-100"
        >
          <IconBack />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-bold text-neutral-900">Add a place</h1>
        <div className="w-10" />
      </header>

      <AddPlaceStepProgress
        step={step}
        sectionLabel={
          step === 1 ? 'Cover photo *' : step === 2 ? 'Location *' : 'Final details'
        }
      />

      {justAdvanced && step > 1 && (
        <div className="mx-4 mt-3 flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2.5 text-[13px] font-medium text-green-800">
          <span className="text-base">✓</span>
          Step {step - 1} complete — keep going!
        </div>
      )}

      <div className="flex-1 px-4 py-5">
        {step === 1 && (
          <div className="space-y-5">
            <button
              type="button"
              onClick={addPhoto}
              className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50 py-10 active:bg-neutral-100"
            >
              {addPlaceDraft.photos.length > 0 ? (
                <>
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600">
                    ✓
                  </span>
                  <span className="mt-3 text-[15px] font-semibold text-neutral-900">Photo added</span>
                  <span className="mt-1 text-[13px] text-neutral-500">Tap to replace</span>
                </>
              ) : (
                <>
                  <span className="text-3xl text-neutral-400">📷</span>
                  <span className="mt-3 text-[15px] font-semibold text-neutral-800">
                    Upload a clear photo of the storefront
                  </span>
                </>
              )}
            </button>

            <div>
              <FieldLabel label="Place name" required />
              <TextInput
                placeholder="e.g. J.Chicken PIK"
                value={addPlaceDraft.name}
                onChange={(e) => updateAddPlaceDraft({ name: e.target.value })}
                className="border-0 bg-neutral-100 focus:ring-tiktok/20"
              />
            </div>

            <BranchNameField
              value={addPlaceDraft.branchName}
              onChange={(branchName) => updateAddPlaceDraft({ branchName })}
              inputClassName="border-0 bg-neutral-100 focus:ring-tiktok/20"
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <AddPlaceMapPreview address={addPlaceDraft.address?.label} onEditMap={goMap} />

            <div>
              <FieldLabel label="Address" required />
              <TextArea
                rows={3}
                placeholder="Apartment, suite, unit, building, floor, etc. (optional)"
                value={addPlaceDraft.addressDetail}
                onChange={(e) => updateAddPlaceDraft({ addressDetail: e.target.value })}
                className="border-0 bg-neutral-100 focus:ring-tiktok/20"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <div>
              <FieldLabel label="Category" required />
              <div className="relative">
                <select
                  value={addPlaceDraft.category}
                  onChange={(e) => updateAddPlaceDraft({ category: e.target.value })}
                  className="w-full appearance-none rounded-xl border-0 bg-neutral-100 px-4 py-3.5 text-[15px] outline-none focus:ring-2 focus:ring-tiktok/20"
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400">
                  ▾
                </span>
              </div>
            </div>

            <div>
              <FieldLabel label="Phone number" />
              <div className="flex gap-2">
                <div className="flex w-[88px] shrink-0 items-center justify-center gap-1 rounded-xl bg-neutral-100 px-3 py-3.5 text-[15px]">
                  <span>🇺🇸</span>
                  <span className="font-medium">{addPlaceDraft.phoneCountry}</span>
                </div>
                <TextInput
                  className="flex-1 border-0 bg-neutral-100 focus:ring-tiktok/20"
                  placeholder="Enter phone number"
                  inputMode="tel"
                  value={addPlaceDraft.phoneNumber}
                  onChange={(e) => updateAddPlaceDraft({ phoneNumber: e.target.value })}
                />
              </div>
            </div>

            <AddPlaceSocialLinks
              website={addPlaceDraft.website}
              douyinAccount={addPlaceDraft.douyinAccount}
              onWebsiteChange={(website) => updateAddPlaceDraft({ website })}
              onDouyinChange={(douyinAccount) => updateAddPlaceDraft({ douyinAccount })}
            />

            <AddPlaceStatusFields
              status={addPlaceDraft.status}
              openingDate={addPlaceDraft.openingDate}
              hoursSummary={addPlaceDraft.hours.length > 0 ? hoursLabel : undefined}
              onStatusChange={handleStatusChange}
              onOpeningDateChange={(openingDate) => updateAddPlaceDraft({ openingDate })}
              onEditHours={() => navigate('/opening-hours?return=/add-place?step=3')}
            />
          </div>
        )}
      </div>

      <footer className="fixed bottom-0 left-1/2 w-full max-w-phone -translate-x-1/2 border-t border-neutral-100 bg-white px-4 py-4 safe-bottom">
        {step === 1 && (
          <PrimaryButton disabled={!step1Ready} onClick={() => goStep(2, { celebrate: true })}>
            Next
          </PrimaryButton>
        )}
        {step === 2 && (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => goStep(1, { celebrate: false })}
              className="flex-1 rounded-full border-2 border-tiktok py-3.5 text-[16px] font-semibold text-tiktok active:bg-rose-50"
            >
              Back
            </button>
            <button
              type="button"
              disabled={!step2Ready}
              onClick={() => goStep(3, { celebrate: true })}
              className="flex-1 rounded-full bg-tiktok py-3.5 text-[16px] font-semibold text-white transition active:opacity-90 disabled:bg-neutral-300"
            >
              Next
            </button>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => goStep(2, { celebrate: false })}
              className="w-full rounded-full border-2 border-tiktok py-3 text-[15px] font-semibold text-tiktok active:bg-rose-50"
            >
              Back
            </button>
            <PrimaryButton disabled={!step3Ready} onClick={submit}>
              Submit
            </PrimaryButton>
          </div>
        )}
      </footer>
    </div>
  );
}
