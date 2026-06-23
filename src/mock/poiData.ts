import type { AddPlaceForm, OpeningHoursDay, QuickMenuItem } from '../types';

/** Mock POI 详情数据 */
export const POI = {
  name: 'HOTEL OSAKA PIK2',
  stars: 3,
  favorites: '8.7K Favorites',
  highlight: 'Photogenic hotel area with a strong Japanese ambiance',
  tags: ['Opened in 2022', 'Family-friendly', 'Cool view'],
  rating: 4.5,
  reviewCount: 1158,
  distance: 'About 1 km from Taman Doa Our Lady of Akita P...',
  addressShort: 'Jl. Osaka Residence II No....',
  addressFull:
    'Jl. Osaka Residence II No.1, Daan Mogot, Kec. Kalideres, Special Capital Region of Jakarta, Daan Mogot, Kalideres, West Jakarta City, Jakarta 11840, Indonesia',
  meta: 'Opened in 2022 · 173 rooms · 33 floors',
  dates: 'Jun 12 – Jun 13 · 1 night · 2 guests',
  roomName: '2 Bedroom Deluxe',
  roomTags: ['Up to 2 pax', '29 m²', 'Pool view'],
  price: 'Rp492.458',
  discount: '-22%',
  heroImage:
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
};

/** Suggest an edit 列表页展示的当前 POI 字段值 */
export const EDIT_POI = {
  name: 'Kongfu Hotpot',
  status: 'Open',
  address: '4-20-2 Shinbashi, Minato-ku, Tokyo',
  category: 'Restaurant',
  phone: '+1 1379290398',
  phones: [
    { id: 'p1', areaCode: '021', number: '65186602' },
    { id: 'p2', areaCode: '', number: '17821727588' },
  ],
  hoursLines: [
    'Mon-Tue: 10:00 - 17:00',
    'Wed: Closed',
    'Thu-Fri: 10:00 - 17:00',
    'Sat: Closed',
    'Sun: Open 24 hours',
  ],
};

export const EDIT_STATUS_OPTIONS = [
  {
    value: 'open',
    label: 'Open',
    hint: 'The store is normally open and can provide services to customers.',
  },
  {
    value: 'temporarily-closed',
    label: 'Temporarily Closed',
    hint: 'The store has temporarily ceased operations due to certain reasons.',
  },
  {
    value: 'coming-soon',
    label: 'Coming Soon',
    hint: 'Will commence business in the short term.',
  },
] as const;

export const PHONE_REGIONS = [
  { code: 'US', dial: '+1', label: 'United States' },
  { code: 'ID', dial: '+62', label: 'Indonesia' },
  { code: 'JP', dial: '+81', label: 'Japan' },
  { code: 'CN', dial: '+86', label: 'China' },
  { code: 'SG', dial: '+65', label: 'Singapore' },
  { code: 'GB', dial: '+44', label: 'United Kingdom' },
];

export const CATEGORY_TREE = [
  { name: 'Restaurant', children: ['Korean Restaurant', 'Japanese Restaurant', 'Chinese Restaurant', 'Vietnamese Restaurant'] },
  { name: 'Hotel', children: [] },
  { name: 'Travel', children: [] },
  { name: 'Shopping', children: [] },
  { name: 'Drink', children: ['Café', 'Bar', 'Bakery shop'] },
];

export const ADDRESS_SUGGESTIONS = [
  'Jl. Osaka Residence II No.1, Kalideres, Jakarta',
  'Jl. Osaka Residence II No.2, Kalideres, Jakarta',
  'Taman Doa Our Lady of Akita Park, Jakarta',
  'Daan Mogot Road, West Jakarta',
];

export const CATEGORIES = [
  'Hotel',
  'Resort',
  'Restaurant',
  'Café',
  'Attraction',
  'Shopping mall',
  'Other',
];

export const IDENTITY_OPTIONS = [
  { id: 'owner', label: 'Business owner or manager' },
  { id: 'employee', label: 'Employee' },
  { id: 'customer', label: 'Customer / visitor' },
  { id: 'local', label: 'Local resident' },
  { id: 'other', label: 'Other' },
];

export const STATUS_OPTIONS: { value: AddPlaceForm['status']; label: string; hint: string }[] = [
  { value: 'open', label: 'Open', hint: 'Place is currently operating' },
  { value: 'closed', label: 'Closed', hint: 'Regularly closed (e.g. outside hours)' },
  { value: 'temporarily-closed', label: 'Temporarily closed', hint: 'Renovation, seasonal closure, etc.' },
  { value: 'permanently-closed', label: 'Permanently closed', hint: 'Business has shut down' },
];

export const DEFAULT_HOURS: OpeningHoursDay[] = [
  { day: 'Mon', open: '09:00', close: '22:00', closed: false },
  { day: 'Tue', open: '09:00', close: '22:00', closed: false },
  { day: 'Wed', open: '09:00', close: '22:00', closed: false },
  { day: 'Thu', open: '09:00', close: '22:00', closed: false },
  { day: 'Fri', open: '09:00', close: '22:00', closed: false },
  { day: 'Sat', open: '10:00', close: '23:00', closed: false },
  { day: 'Sun', open: '10:00', close: '23:00', closed: false },
];

/** 提报快捷导航菜单项 */
export const QUICK_MENU_ITEMS: QuickMenuItem[] = [
  {
    id: 'add',
    label: 'Add a place',
    description: 'Suggest a new location on the map',
    icon: '📍',
    route: '/add-place',
    reportType: 'add-place',
  },
  {
    id: 'edit',
    label: 'Suggest an edit',
    description: 'Fix name, address, hours, and more',
    icon: '✏️',
    route: '/report',
    reportType: 'suggest-edit',
  },
  {
    id: 'feedback',
    label: 'Report a problem / Feedback',
    description: 'Something wrong with this page',
    icon: '⚠️',
    route: '/feedback',
    reportType: 'feedback',
  },
  {
    id: 'suggestion',
    label: 'Leave a suggestion',
    description: 'Share ideas to improve this place',
    icon: '💬',
    route: '/suggestion',
    reportType: 'suggestion',
  },
  {
    id: 'rate',
    label: 'Rate this page',
    description: 'How was your experience on this page?',
    icon: '⭐',
    route: '/rate',
    reportType: 'rate',
  },
];

/** Edit information 页 — 对照流程图 Screen 5（POI Entry） */
export const EDIT_INFO = {
  name: POI.name,
  category: 'Hotel',
  location: POI.addressFull,
  hoursLines: [
    'Monday 10:00 AM – 10:00 PM',
    'Tuesday 10:00 AM – 10:00 PM',
    'Wednesday 10:00 AM – 10:00 PM',
    'Thursday 10:00 AM – 10:00 PM',
    'Friday 10:00 AM – 11:00 PM',
    'Saturday 10:00 AM – 11:00 PM',
    'Sunday 10:00 AM – 10:00 PM',
  ],
  phone: '+62 21 555 0123',
  website: 'www.hotelosakapik2.com',
};

export const EDIT_INFORMATION_FIELDS = [
  { id: 'name', label: 'Place name', route: '/edit/name', getValue: () => EDIT_INFO.name },
  { id: 'category', label: 'Category', route: '/edit/category', getValue: () => EDIT_INFO.category },
  { id: 'location', label: 'Location', route: '/edit/address', getValue: () => EDIT_INFO.location },
  {
    id: 'hours',
    label: 'Hours',
    route: '/edit/hours',
    getValue: () => EDIT_INFO.hoursLines.join('\n'),
  },
  {
    id: 'contact',
    label: 'Phone & website',
    route: '/edit/phone',
    getValue: () => `${EDIT_INFO.phone} · ${EDIT_INFO.website}`,
  },
];

export const EDIT_FIELDS = [
  { id: 'name', label: 'Name', route: '/edit/name', getValue: () => EDIT_POI.name },
  { id: 'status', label: 'Status', route: '/edit/status', getValue: () => EDIT_POI.status },
  { id: 'address', label: 'Address/Coordinates', route: '/edit/address', getValue: () => EDIT_POI.address },
  { id: 'category', label: 'Category', route: '/edit/category', getValue: () => EDIT_POI.category },
  { id: 'phone', label: 'Phone Number', route: '/edit/phone', getValue: () => EDIT_POI.phone },
  { id: 'hours', label: 'Business Hours', route: '/edit/hours', getValue: () => EDIT_POI.hoursLines.join('\n') },
  { id: 'photos', label: 'Photos', route: '/edit/photos', getValue: () => 'Add photos of this place' },
  { id: 'identity', label: 'Your relationship to this place', route: '/edit/identity', getValue: () => '' },
];
