import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { EditInfoSection } from '../components/report/EditInfoSection';
import { MiniMapPreview } from '../components/report/MiniMapPreview';
import { SupplementaryFields } from '../components/report/SupplementaryFields';
import { PageHeader } from '../components/layout/PageHeader';
import { IconChevronRight } from '../components/icons/PoiIcons';
import { OrangeTipBar, PrimaryButton, TextInput } from '../components/ui/FormFields';
import { useReport } from '../context/ReportContext';

/** POI Entry · Edit information — 单页表单（对照流程图 Screen 5） */
export function EditSelectPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { editInfoDraft, updateEditInfoDraft, addSubmission, setMapReturnPath } = useReport();

  useEffect(() => {
    const state = location.state as {
      category?: string;
      address?: string;
      region?: { dial: string };
    } | null;
    if (state?.category) updateEditInfoDraft({ category: state.category });
    if (state?.address) updateEditInfoDraft({ location: state.address });
    if (state?.region) updateEditInfoDraft({ phoneDial: state.region.dial });
  }, [location.state, updateEditInfoDraft]);

  const canSubmit = editInfoDraft.name.trim().length > 0 && editInfoDraft.note.trim().length > 0;

  const submit = () => {
    addSubmission('suggest-edit', 'Edit information', editInfoDraft.note);
    navigate('/success?type=suggest-edit');
  };

  const openMap = () => {
    setMapReturnPath('/edit/select');
    navigate('/map-picker?mode=edit');
  };

  return (
    <div className="flex min-h-screen flex-col bg-white pb-28">
      <PageHeader title="Edit information" onBack={() => navigate('/')} />

      <div className="flex-1 px-4 py-3">
        <OrangeTipBar>Fill in details to speed up the review</OrangeTipBar>

        <div className="mt-4 space-y-0">
          <EditInfoSection label="Place name">
            <TextInput
              value={editInfoDraft.name}
              onChange={(e) => updateEditInfoDraft({ name: e.target.value })}
              placeholder="Enter place name"
              className="border-0 bg-white"
            />
          </EditInfoSection>

          <EditInfoSection
            label="Category"
            onClick={() => navigate('/category-picker?return=/edit/select')}
          >
            <div className="flex items-center justify-between">
              <span className="text-[16px] font-medium text-neutral-900">{editInfoDraft.category}</span>
              <IconChevronRight className="text-neutral-400" />
            </div>
          </EditInfoSection>

          <EditInfoSection label="Location">
            <MiniMapPreview onClick={openMap} />
            <TextInput
              value={editInfoDraft.location}
              onChange={(e) => updateEditInfoDraft({ location: e.target.value })}
              placeholder="Enter address"
              className="mt-3 border-0 bg-white"
            />
          </EditInfoSection>

          <EditInfoSection label="Hours">
            <div className="divide-y divide-neutral-200/80">
              {editInfoDraft.hoursLines.map((line) => {
                const [day, ...rest] = line.split(' ');
                const time = rest.join(' ');
                return (
                  <button
                    key={line}
                    type="button"
                    onClick={() => navigate('/edit/hours/day')}
                    className="flex w-full items-center justify-between py-3 text-left active:opacity-80"
                  >
                    <span className="text-[15px] text-neutral-900">
                      <span className="font-medium">{day}</span>{' '}
                      <span className="text-neutral-600">{time}</span>
                    </span>
                    <IconChevronRight className="shrink-0 text-neutral-400" />
                  </button>
                );
              })}
            </div>
          </EditInfoSection>

          <EditInfoSection label="Phone & website">
            <div className="space-y-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => navigate('/region-picker?return=/edit/select')}
                  className="shrink-0 rounded-xl bg-white px-3 py-3.5 text-[14px] font-medium text-neutral-800"
                >
                  {editInfoDraft.phoneDial}
                </button>
                <TextInput
                  value={editInfoDraft.phone}
                  onChange={(e) => updateEditInfoDraft({ phone: e.target.value })}
                  placeholder="Phone number"
                  className="flex-1 border-0 bg-white"
                />
              </div>
              <TextInput
                value={editInfoDraft.website}
                onChange={(e) => updateEditInfoDraft({ website: e.target.value })}
                placeholder="Website"
                className="border-0 bg-white"
              />
            </div>
          </EditInfoSection>
        </div>

        <div className="mt-2">
          <SupplementaryFields
            note={editInfoDraft.note}
            onNoteChange={(note) => updateEditInfoDraft({ note })}
            photos={editInfoDraft.photos}
            onAddPhoto={() => updateEditInfoDraft({ photos: [...editInfoDraft.photos, `photo-${editInfoDraft.photos.length}`] })}
            onRemovePhoto={(i) =>
              updateEditInfoDraft({ photos: editInfoDraft.photos.filter((_, j) => j !== i) })
            }
          />
        </div>
      </div>

      <footer className="fixed bottom-0 left-1/2 w-full max-w-phone -translate-x-1/2 border-t border-neutral-100 bg-white px-4 py-4 safe-bottom">
        <PrimaryButton disabled={!canSubmit} onClick={submit}>
          Submit
        </PrimaryButton>
      </footer>
    </div>
  );
}
