export const IMAGE_REPORT_REASONS = [
  {
    id: 'irrelevant',
    title: 'Not relevant',
    desc: "The image doesn't match this place and may be misleading",
  },
  {
    id: 'duplicate',
    title: 'Duplicate',
    desc: 'The same image appears more than once in the gallery',
  },
  {
    id: 'violation',
    title: 'Policy violation',
    desc: 'The image contains nudity, violence, gore, copyright issues, or other violations',
  },
  {
    id: 'low-quality',
    title: 'Low quality',
    desc: 'The image is blurry, distorted, or otherwise unpleasant',
  },
  {
    id: 'other',
    title: 'Other',
    desc: 'Another issue not covered by the options above',
  },
] as const;

export const VIEWER_IMAGES = [
  'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1631049302634-096c5d1d9b0a?auto=format&fit=crop&w=900&q=80',
];
