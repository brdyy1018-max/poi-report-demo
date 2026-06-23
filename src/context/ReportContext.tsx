import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type {
  AddPlaceForm,
  AddressSelection,
  EditInfoDraft,
  PostLocationTag,
  SubmissionRecord,
  ReportType,
} from '../types';
import { EDIT_INFO, EDIT_POI } from '../mock/poiData';
import { formatCategoryPath, EDIT_POI_CATEGORY } from '../mock/categoryTreeData';

interface ReportContextValue {
  quickMenuOpen: boolean;
  openQuickMenu: () => void;
  closeQuickMenu: () => void;
  submissions: SubmissionRecord[];
  addSubmission: (type: ReportType, title: string, summary: string) => void;
  addPlaceDraft: AddPlaceForm;
  updateAddPlaceDraft: (patch: Partial<AddPlaceForm>) => void;
  resetAddPlaceDraft: () => void;
  editInfoDraft: EditInfoDraft;
  updateEditInfoDraft: (patch: Partial<EditInfoDraft>) => void;
  resetEditInfoDraft: () => void;
  mapReturnPath: string;
  setMapReturnPath: (path: string) => void;
  selectedAddress: AddressSelection | null;
  setSelectedAddress: (addr: AddressSelection | null) => void;
  helpedCount: number;
  postLocation: PostLocationTag | null;
  setPostLocation: (tag: PostLocationTag | null) => void;
}

const emptyDraft = (): AddPlaceForm => ({
  name: '',
  branchName: '',
  region: '',
  address: null,
  addressDetail: '',
  description: '',
  photos: [],
  category: '',
  phoneCountry: '+1',
  phoneNumber: '',
  website: '',
  douyinAccount: '',
  openingDate: '',
  hours: [],
  status: 'open',
});

const ReportContext = createContext<ReportContextValue | null>(null);

const emptyEditInfo = (): EditInfoDraft => ({
  name: EDIT_INFO.name,
  branchName: '',
  category: formatCategoryPath(EDIT_POI_CATEGORY.current),
  location: EDIT_INFO.location,
  hoursLines: [...EDIT_INFO.hoursLines],
  phone: '215550123',
  phoneDial: '+62',
  phones: [...EDIT_POI.phones.map((p) => ({ ...p }))],
  website: EDIT_INFO.website,
  note: '',
  photos: [],
  identity: null,
  businessStatus: 'open',
  openingDate: '',
  regularHourSlots: [{ id: 'r1', open: '17:00', close: '02:00', overnight: true }],
});

export function ReportProvider({ children }: { children: ReactNode }) {
  const [quickMenuOpen, setQuickMenuOpen] = useState(false);
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([
    {
      id: 'demo-phone',
      type: 'edit-phone',
      title: 'Modify phone',
      summary: 'Your feedback is being processed',
      poiName: 'TAG',
      thumbnail:
        'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=200&q=80',
      createdAt: '2026-06-15T17:32:35',
      status: 'pending',
    },
    {
      id: 'demo-name',
      type: 'edit-name',
      title: 'Modify name',
      summary: 'Updated place name spelling',
      poiName: 'HOTEL OSAKA PIK2',
      thumbnail:
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=200&q=80',
      createdAt: '2026-06-14T11:08:20',
      status: 'approved',
    },
    {
      id: 'demo-add',
      type: 'add-place',
      title: 'Add a place',
      summary: 'Kongfu Hotpot (Shimbashi)',
      poiName: 'Kongfu Hotpot',
      thumbnail:
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80',
      createdAt: '2026-06-13T09:45:00',
      status: 'pending',
    },
    {
      id: 'demo-address',
      type: 'edit-address',
      title: 'Modify address',
      summary: 'Corrected street number on map pin',
      poiName: 'HOTEL OSAKA PIK2',
      thumbnail:
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=200&q=80',
      createdAt: '2026-06-12T16:20:11',
      status: 'pending',
    },
    {
      id: 'demo-feedback',
      type: 'feedback',
      title: 'Leave feedback',
      summary: "Can't reach by phone",
      poiName: 'TAG',
      thumbnail:
        'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=200&q=80',
      createdAt: '2026-06-11T08:02:44',
      status: 'approved',
    },
    {
      id: 'demo-rate',
      type: 'rate',
      title: 'Place review',
      summary: 'Great stay — clean rooms and friendly staff',
      poiName: 'HOTEL OSAKA PIK2',
      thumbnail:
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=200&q=80',
      createdAt: '2026-06-10T19:30:00',
      status: 'approved',
    },
  ]);
  const [addPlaceDraft, setAddPlaceDraft] = useState<AddPlaceForm>(emptyDraft());
  const [editInfoDraft, setEditInfoDraft] = useState<EditInfoDraft>(emptyEditInfo());
  const [mapReturnPath, setMapReturnPath] = useState('/add-place');
  const [selectedAddress, setSelectedAddress] = useState<AddressSelection | null>(null);
  const [postLocation, setPostLocation] = useState<PostLocationTag | null>(null);
  const helpedCount = 1284;

  const openQuickMenu = useCallback(() => setQuickMenuOpen(true), []);
  const closeQuickMenu = useCallback(() => setQuickMenuOpen(false), []);

  const addSubmission = useCallback((type: ReportType, title: string, summary: string) => {
    setSubmissions((prev) => [
      {
        id: `sub-${Date.now()}`,
        type,
        title,
        summary,
        createdAt: new Date().toISOString(),
        status: 'pending',
      },
      ...prev,
    ]);
  }, []);

  const updateAddPlaceDraft = useCallback((patch: Partial<AddPlaceForm>) => {
    setAddPlaceDraft((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetAddPlaceDraft = useCallback(() => setAddPlaceDraft(emptyDraft()), []);

  const updateEditInfoDraft = useCallback((patch: Partial<EditInfoDraft>) => {
    setEditInfoDraft((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetEditInfoDraft = useCallback(() => setEditInfoDraft(emptyEditInfo()), []);

  const value = useMemo(
    () => ({
      quickMenuOpen,
      openQuickMenu,
      closeQuickMenu,
      submissions,
      addSubmission,
      addPlaceDraft,
      updateAddPlaceDraft,
      resetAddPlaceDraft,
      editInfoDraft,
      updateEditInfoDraft,
      resetEditInfoDraft,
      mapReturnPath,
      setMapReturnPath,
      selectedAddress,
      setSelectedAddress,
      helpedCount,
      postLocation,
      setPostLocation,
    }),
    [
      quickMenuOpen,
      openQuickMenu,
      closeQuickMenu,
      submissions,
      addSubmission,
      addPlaceDraft,
      updateAddPlaceDraft,
      resetAddPlaceDraft,
      editInfoDraft,
      updateEditInfoDraft,
      resetEditInfoDraft,
      mapReturnPath,
      selectedAddress,
      helpedCount,
      postLocation,
    ],
  );

  return <ReportContext.Provider value={value}>{children}</ReportContext.Provider>;
}

export function useReport() {
  const ctx = useContext(ReportContext);
  if (!ctx) throw new Error('useReport must be used within ReportProvider');
  return ctx;
}
