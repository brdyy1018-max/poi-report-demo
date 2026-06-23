/** Report a place — Suggest an edit 网格入口 */
export const REPORT_EDIT_ACTIONS = [
  { id: 'name', label: 'Edit name', route: '/edit/name', icon: 'edit-name' },
  { id: 'address', label: 'Edit address', route: '/edit/address', icon: 'edit-address' },
  { id: 'phone', label: 'Edit phone', route: '/edit/phone', icon: 'edit-phone' },
  { id: 'hours', label: 'Edit hours', route: '/edit/hours', icon: 'edit-hours' },
  { id: 'category', label: 'Edit category', route: '/edit/category', icon: 'edit-category' },
  { id: 'status', label: 'Edit status', route: '/edit/status', icon: 'edit-status' },
  { id: 'duplicate', label: 'Duplicate place', route: '/feedback?tag=duplicate', icon: 'duplicate' },
  { id: 'close', label: 'Close permanently', route: '/edit/status', icon: 'close' },
] as const;

export const REPORT_FEEDBACK_TAGS = [
  "Can't reach by phone",
  'Place not found on-site',
  'Currently closed',
  'Replaced by new business',
  'Place has relocated',
] as const;
