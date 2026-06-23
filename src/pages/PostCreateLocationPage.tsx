import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MiniMapPreview } from '../components/report/MiniMapPreview';
import { AddPlaceSocialLinks } from '../components/report/AddPlaceSocialLinks';
import { AddPlaceStatusFields } from '../components/report/AddPlaceStatusFields';
import { FieldLabel, PrimaryButton, TextArea, TextInput } from '../components/ui/FormFields';
import { IconBack, IconChevronRight } from '../components/icons/PoiIcons';
import { useReport } from '../context/ReportContext';
import { DEFAULT_HOURS } from '../mock/poiData';
import { POST_DEFAULT_SEARCH } from '../mock/postFlowData';
import type { BusinessStatus } from '../types';

function formatHoursSummary(hours: typeof DEFAULT_HOURS) {
  const openDays = hours.filter((d) => !d.closed);
  if (openDays.length === 0) return 'Closed every day';
  if (openDays.length === hours.length && openDays.every((d) => d.open === openDays[0].open && d.close === openDays[0].close)) {
    return `Mon–Sun ${openDays[0].open}–${openDays[0].close}`;
  }
  return `${openDays.length} days set`;
}

/** Publish · Create location 表单（搜不到 → + Add 进入） */
export function PostCreateLocationPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { addPlaceDraft, updateAddPlaceDraft, setMapReturnPath, setPostLocation } = useReport();
  const [showMore, setShowMore] = useState(false);

  const prefillName = params.get('name') || POST_DEFAULT_SEARCH;

  useEffect(() => {
    updateAddPlaceDraft({
      name: prefillName,
      ...(addPlaceDraft.address
        ? {}
        : {
            address: {
              label: 'Jl. Osaka Residence II No.1',
              lat: -6.1352,
              lng: 106.7051,
            },
          }),
      ...(!addPlaceDraft.status ? { status: 'open' as BusinessStatus } : {}),
    });
  }, [prefillName, updateAddPlaceDraft, addPlaceDraft.address, addPlaceDraft.status]);

  const hoursLabel = useMemo(() => {
    if (addPlaceDraft.hours.length === 0) return undefined;
    return formatHoursSummary(addPlaceDraft.hours);
  }, [addPlaceDraft.hours]);

  const handleStatusChange = (status: BusinessStatus) => {
    updateAddPlaceDraft({
      status,
      ...(status !== 'coming-soon' ? { openingDate: '' } : {}),
    });
  };

  const goMap = () => {
    setMapReturnPath('/post/create-location');
    navigate('/map-picker');
  };

  const canContinue =
    addPlaceDraft.name.trim().length > 0 &&
    !!addPlaceDraft.address &&
    addPlaceDraft.photos.length > 0;

  return (
    <div className="min-h-screen bg-white pb-36">
      <header className="sticky top-0 z-20 flex items-center border-b border-neutral-100 bg-white px-2 py-3">
        <button
          type="button"
          aria-label="Back"
          onClick={() => navigate('/post/add-location')}
          className="flex h-10 w-10 items-center justify-center rounded-full active:bg-neutral-100"
        >
          <IconBack />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-bold text-neutral-900">Create location</h1>
        <div className="w-10" />
      </header>

      <div className="space-y-5 px-4 py-5">
        <section>
          <FieldLabel label="Name" required />
          <TextInput
            value={addPlaceDraft.name}
            onChange={(e) => updateAddPlaceDraft({ name: e.target.value })}
            placeholder="Business or place name"
            className="border-0 bg-neutral-100"
          />
        </section>

        <section>
          <FieldLabel label="Address & Coordinates" required />
          <MiniMapPreview onClick={goMap} editButtonLabel="Edit location" />
          {addPlaceDraft.address?.label && (
            <p className="mt-2 text-[14px] leading-snug text-neutral-800">{addPlaceDraft.address.label}</p>
          )}
        </section>

        <section>
          <FieldLabel label="Photos" required />
          <p className="mb-3 text-[13px] text-neutral-500">Add photos to help us verify faster</p>
          <div className="flex flex-wrap gap-3">
            {addPlaceDraft.photos.map((id, i) => (
              <div key={id} className="relative h-[88px] w-[88px] overflow-hidden rounded-xl bg-neutral-200">
                <div className="flex h-full items-center justify-center text-2xl">🏢</div>
                <button
                  type="button"
                  onClick={() =>
                    updateAddPlaceDraft({
                      photos: addPlaceDraft.photos.filter((_, j) => j !== i),
                    })
                  }
                  className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-[10px] text-white"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                updateAddPlaceDraft({ photos: [...addPlaceDraft.photos, `photo-${addPlaceDraft.photos.length + 1}`] })
              }
              className="flex h-[88px] w-[88px] items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 text-3xl font-light text-neutral-400"
            >
              +
            </button>
          </div>
        </section>

        <section>
          <div className="relative">
            <TextArea
              rows={4}
              maxLength={300}
              placeholder="Add any additional details about this location..."
              value={addPlaceDraft.description}
              onChange={(e) => updateAddPlaceDraft({ description: e.target.value })}
              className="border-0 bg-neutral-100 pb-8"
            />
            <span className="pointer-events-none absolute bottom-3 right-3 text-[12px] text-neutral-400">
              {addPlaceDraft.description.length}/300
            </span>
          </div>
        </section>

        <button
          type="button"
          onClick={() => setShowMore(!showMore)}
          className="flex w-full items-center justify-between rounded-2xl bg-neutral-100 px-4 py-4 text-left"
        >
          <div>
            <div className="text-[15px] font-semibold text-neutral-900">More information</div>
            <div className="mt-0.5 text-[12px] text-neutral-500">
              Business hours, phone, website, Douyin account, category...
            </div>
          </div>
          <span className={`text-neutral-400 transition ${showMore ? 'rotate-180' : ''}`}>▾</span>
        </button>

        {showMore && (
          <div className="space-y-4 rounded-2xl bg-neutral-50 p-4">
            <button
              type="button"
              onClick={() => navigate('/category-picker?return=/post/create-location')}
              className="flex w-full items-center justify-between py-2 text-left"
            >
              <span className="text-[14px] font-medium">Category</span>
              <span className="flex items-center gap-1 text-[14px] text-neutral-500">
                {addPlaceDraft.category || 'Select'}
                <IconChevronRight className="h-4 w-4" />
              </span>
            </button>
            <div>
              <FieldLabel label="Phone" />
              <TextInput
                value={addPlaceDraft.phoneNumber}
                onChange={(e) => updateAddPlaceDraft({ phoneNumber: e.target.value })}
                placeholder="Phone number"
                className="border-0 bg-white"
              />
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
              hoursSummary={hoursLabel}
              onStatusChange={handleStatusChange}
              onOpeningDateChange={(openingDate) => updateAddPlaceDraft({ openingDate })}
              onEditHours={() => navigate('/opening-hours?return=/post/create-location')}
            />
          </div>
        )}
      </div>

      <footer className="fixed bottom-0 left-1/2 w-full max-w-phone -translate-x-1/2 border-t border-neutral-100 bg-white px-4 py-4 safe-bottom">
        <p className="mb-3 text-center text-[12px] leading-snug text-neutral-500">
          This new addition will only be submitted when the publish is made.
        </p>
        <PrimaryButton
          disabled={!canContinue}
          onClick={() => {
            setPostLocation({ name: addPlaceDraft.name, isNew: true });
            navigate('/post');
          }}
        >
          Continue
        </PrimaryButton>
      </footer>
    </div>
  );
}
