import { Navigate, Routes, Route } from 'react-router-dom';
import { MobileShell } from './components/layout/MobileShell';
import { PoiActionSheet } from './components/report/PoiActionSheet';
import { FlowStep1Page } from './pages/FlowStep1Page';
import { PostCreatePage, PostAddLocationPage } from './pages/PostFlowPages';
import { PostCreateLocationPage } from './pages/PostCreateLocationPage';
import { PoiDetailPage } from './pages/PoiDetailPage';
import { PoiAboutPage } from './pages/PoiAboutPage';
import { AddPlacePage } from './pages/AddPlacePage';
import { MapPickerPage } from './pages/MapPickerPage';
import { ReportImagePage } from './pages/ReportImagePage';
import { ReportPlacePage } from './pages/ReportPlacePage';
import { EditSelectPage } from './pages/EditSelectPage';
import {
  EditNamePage,
  EditAddressPage,
  EditPhonePage,
  EditStatusPage,
  EditCategoryPage,
  EditPhotosPage,
  EditIdentityPage,
  EditHoursPage,
  EditHoursDayPage,
  RegionPickerPage,
} from './pages/EditFormsPages';
import { OpeningHoursPage, CategoryPickerPage, CategoryTreePage } from './pages/UtilityPages';
import { FeedbackPage, SuggestionPage, RatePage } from './pages/FeedbackPages';
import { SubmitSuccessPage } from './pages/SubmitSuccessPage';
import { HistoryPage, ProfilePage } from './pages/ProfilePages';
import { EditIdentityIntroPage } from './pages/EditIdentityIntroPage';
import { DemoIndexPage } from './pages/DemoIndexPage';
import { RoomsPage } from './pages/RoomsPage';
import { PoiGalleryPage, PoiPhotoViewerPage } from './pages/PoiGalleryPages';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-200 py-0 md:py-6">
      <MobileShell>
        <Routes>
          <Route path="/" element={<PoiDetailPage />} />
          <Route path="/poi" element={<Navigate to="/" replace />} />
          <Route path="/flow" element={<FlowStep1Page />} />
          <Route path="/poi/gallery" element={<PoiGalleryPage />} />
          <Route path="/poi/gallery/view" element={<PoiPhotoViewerPage />} />
          <Route path="/post" element={<PostCreatePage />} />
          <Route path="/post/add-location" element={<PostAddLocationPage />} />
          <Route path="/post/create-location" element={<PostCreateLocationPage />} />
          <Route path="/about" element={<PoiAboutPage />} />
          <Route path="/add-place" element={<AddPlacePage />} />
          <Route path="/map-picker" element={<MapPickerPage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/demo" element={<DemoIndexPage />} />
          <Route path="/edit/identity-intro" element={<EditIdentityIntroPage />} />
          <Route path="/report" element={<ReportPlacePage />} />
          <Route path="/report/image" element={<ReportImagePage />} />
          <Route path="/edit/select" element={<EditSelectPage />} />
          <Route path="/edit/name" element={<EditNamePage />} />
          <Route path="/edit/address" element={<EditAddressPage />} />
          <Route path="/edit/phone" element={<EditPhonePage />} />
          <Route path="/edit/status" element={<EditStatusPage />} />
          <Route path="/edit/category" element={<EditCategoryPage />} />
          <Route path="/edit/hours" element={<EditHoursPage />} />
          <Route path="/edit/hours/day" element={<EditHoursDayPage />} />
          <Route path="/edit/photos" element={<EditPhotosPage />} />
          <Route path="/edit/identity" element={<EditIdentityPage />} />
          <Route path="/region-picker" element={<RegionPickerPage />} />
          <Route path="/opening-hours" element={<OpeningHoursPage />} />
          <Route path="/category-picker" element={<CategoryPickerPage />} />
          <Route path="/category-tree" element={<CategoryTreePage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/suggestion" element={<SuggestionPage />} />
          <Route path="/rate" element={<RatePage />} />
          <Route path="/success" element={<SubmitSuccessPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <PoiActionSheet />
      </MobileShell>
    </div>
  );
}
