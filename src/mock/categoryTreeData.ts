/** 3-level category tree for Modify Category picker */
export interface CategoryLeaf {
  name: string;
}

export interface CategoryMid {
  name: string;
  children: CategoryLeaf[];
}

export interface CategoryRoot {
  name: string;
  children: CategoryMid[];
}

export interface CategoryPath {
  l1: string;
  l2: string;
  l3: string;
}

export function formatCategoryPath(path: CategoryPath) {
  return `${path.l1} > ${path.l2} > ${path.l3}`;
}

export const FULL_CATEGORY_TREE: CategoryRoot[] = [
  {
    name: 'Food',
    children: [
      {
        name: 'Local cuisine',
        children: [{ name: 'Local cuisine' }, { name: 'Regional specialty' }],
      },
      {
        name: 'Southeast Asian',
        children: [{ name: 'Thai' }, { name: 'Vietnamese' }, { name: 'Indonesian' }],
      },
      {
        name: 'Buffet',
        children: [
          { name: 'Buffet' },
          { name: 'BBQ buffet' },
          { name: 'Hot pot buffet' },
          { name: 'Seafood buffet' },
        ],
      },
      {
        name: 'Hot pot',
        children: [{ name: 'Hot pot' }, { name: 'Mala hot pot' }],
      },
    ],
  },
  {
    name: 'Sports & fitness',
    children: [
      {
        name: 'Gym',
        children: [{ name: 'Gym' }, { name: 'CrossFit' }],
      },
      {
        name: 'Outdoor',
        children: [{ name: 'Climbing' }, { name: 'Cycling' }],
      },
    ],
  },
  {
    name: 'Leisure & entertainment',
    children: [
      {
        name: 'Bath & massage',
        children: [{ name: 'Sauna / hot spring' }, { name: 'Spa' }, { name: 'Massage' }],
      },
      {
        name: 'Karaoke',
        children: [{ name: 'Karaoke' }],
      },
    ],
  },
  {
    name: 'Hotel',
    children: [
      {
        name: 'Hotel',
        children: [{ name: 'Hotel' }, { name: 'Resort' }],
      },
    ],
  },
  {
    name: 'Shopping',
    children: [
      {
        name: 'Mall',
        children: [{ name: 'Shopping mall' }, { name: 'Outlet' }],
      },
    ],
  },
];

/** Current POI category (reference) */
export const EDIT_POI_CATEGORY = {
  current: {
    l1: 'Food',
    l2: 'Buffet',
    l3: 'Seafood buffet',
  } satisfies CategoryPath,
};
