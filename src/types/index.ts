/** POI 提报 Demo — 共享类型定义 */

export type ReportType =
  | 'add-place'
  | 'suggest-edit'
  | 'feedback'
  | 'suggestion'
  | 'rate'
  | 'edit-name'
  | 'edit-address'
  | 'edit-phone'
  | 'edit-status'
  | 'edit-category'
  | 'edit-hours'
  | 'edit-photos'
  | 'edit-identity';

export type BusinessStatus = 'open' | 'closed' | 'temporarily-closed' | 'permanently-closed' | 'coming-soon';

export interface SubmissionRecord {
  id: string;
  type: ReportType;
  title: string;
  summary: string;
  /** POI name shown on contribution cards */
  poiName?: string;
  thumbnail?: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

/** Post 发布页已选地点（发帖提报入口） */
export interface PostLocationTag {
  name: string;
  /** 新建地点，发布时才提交 */
  isNew?: boolean;
  /** 可跳转至 POI 详情首页 */
  linkedPoi?: boolean;
}

export interface AddressSelection {
  label: string;
  lat: number;
  lng: number;
}

export interface OpeningHoursDay {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

export interface HoursTimeSlot {
  id: string;
  open: string;
  close: string;
  overnight: boolean;
}

export interface AddPlaceForm {
  name: string;
  branchName: string;
  region: string;
  address: AddressSelection | null;
  addressDetail: string;
  description: string;
  photos: string[];
  category: string;
  phoneCountry: string;
  phoneNumber: string;
  website: string;
  douyinAccount: string;
  openingDate: string;
  hours: OpeningHoursDay[];
  status: BusinessStatus | '';
}

export interface QuickMenuItem {
  id: string;
  label: string;
  description?: string;
  icon: string;
  route: string;
  reportType?: ReportType;
}

export type EditIdentityRole = 'merchant' | 'user';

export interface PhoneEntry {
  id: string;
  areaCode: string;
  number: string;
}

export interface EditInfoDraft {
  name: string;
  branchName: string;
  category: string;
  location: string;
  hoursLines: string[];
  phone: string;
  phoneDial: string;
  phones: PhoneEntry[];
  website: string;
  note: string;
  photos: string[];
  identity: EditIdentityRole | null;
  businessStatus: BusinessStatus | '';
  openingDate: string;
  regularHourSlots: HoursTimeSlot[];
}
