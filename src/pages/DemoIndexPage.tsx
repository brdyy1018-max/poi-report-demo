import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';

export interface DemoScreen {
  group: string;
  title: string;
  path: string;
  note?: string;
}

export const DEMO_SCREENS: DemoScreen[] = [
  { group: 'POI Entry', title: 'POI 详情（首页）', path: '/', note: '返回 → Post' },
  { group: '外层导览', title: 'Post 发布页', path: '/post', note: 'Publish Entry · Add location 提报' },
  { group: 'Dev', title: 'Step 1 · Entrance 流程图', path: '/flow', note: '两条入口对照' },
  { group: 'Publish Entry', title: 'Add location 搜索', path: '/post/add-location', note: '搜 Kongfu Hotpot 看 Add 横幅' },
  { group: 'Publish Entry', title: 'Create location（投稿）', path: '/post/create-location?name=Kongfu+Hotpot' },
  { group: 'POI Entry', title: 'Add a place · Step 1', path: '/add-place?step=1', note: 'Cover photo + name' },
  { group: 'POI Entry', title: 'Add a place · Step 2', path: '/add-place?step=2', note: 'Location + address' },
  { group: 'POI Entry', title: 'Add a place · Step 3', path: '/add-place?step=3', note: 'Category + submit' },
  { group: 'POI Entry', title: '全屏看图', path: '/poi/gallery/view?index=1&from=detail', note: '图片报错按钮' },
  { group: 'POI Entry', title: 'Report image', path: '/report/image?index=0' },
  { group: 'POI Entry', title: 'Bottom Sheet', path: '/?sheet=1', note: 'Suggest an edit · Report · Leave feedback' },
  { group: 'POI Entry', title: 'Suggest an edit（列表 hub）', path: '/report', note: '字段列表 · Contributions' },
  { group: 'POI Entry', title: 'Edit information（旧）', path: '/edit/select' },
  { group: 'POI Entry', title: 'About', path: '/about' },
  { group: 'POI Entry', title: 'Rooms', path: '/rooms' },
  { group: '字段编辑', title: 'Modify Name', path: '/edit/name' },
  { group: '字段编辑', title: 'Modify Category', path: '/edit/category' },
  { group: '字段编辑', title: 'Modify Address/Coordinates', path: '/edit/address' },
  { group: '字段编辑', title: 'Modify Business Hours', path: '/edit/hours' },
  { group: '字段编辑', title: 'Modify/Add Phone Number', path: '/edit/phone' },
  { group: '字段编辑', title: 'Add photo', path: '/edit/photos' },
  { group: '字段编辑', title: 'Modify Status', path: '/edit/status' },
  { group: '字段编辑', title: '身份模块（扩展）', path: '/edit/identity-intro' },
  { group: '工具页', title: '地图选点', path: '/map-picker' },
  { group: '工具页', title: '品类选择', path: '/category-picker?return=/add-place' },
  { group: '反馈', title: 'Report', path: '/feedback' },
  { group: '反馈', title: 'Leave a suggestion', path: '/suggestion' },
  { group: '反馈', title: 'Rate this page', path: '/rate' },
  { group: '完成', title: 'Submission completed', path: '/success?type=suggest-edit', note: 'Place submitted + community cards' },
  { group: '完成', title: 'Add place submitted', path: '/success?type=add-place' },
  { group: '完成', title: 'Personal profile', path: '/profile', note: 'Local Explorer · Contributions tab' },
  { group: '完成', title: 'Contributions tab', path: '/profile?tab=contributions' },
];

/** UI 图全览 — 方便对照参考图逐屏验收 */
export function DemoIndexPage() {
  const navigate = useNavigate();
  const groups = [...new Set(DEMO_SCREENS.map((s) => s.group))];

  return (
    <div className="min-h-screen bg-neutral-100 pb-10">
      <PageHeader title="UI Demo Index" onBack={() => navigate('/')} />
      <p className="px-4 py-3 text-[13px] text-neutral-600">对照 Step 1 流程图，点击下方进入各界面</p>
      {groups.map((group) => (
        <section key={group} className="mb-4 px-4">
          <h2 className="mb-2 text-[13px] font-bold uppercase tracking-wide text-neutral-500">{group}</h2>
          <div className="divide-y divide-neutral-100 overflow-hidden rounded-2xl bg-white">
            {DEMO_SCREENS.filter((s) => s.group === group).map((screen) => (
              <DemoRow key={screen.path + screen.title} screen={screen} onGo={() => navigate(screen.path)} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function DemoRow({ screen, onGo }: { screen: DemoScreen; onGo: () => void }) {
  return (
    <button type="button" onClick={onGo} className="flex w-full flex-col px-4 py-3.5 text-left active:bg-neutral-50">
      <span className="text-[15px] font-semibold text-neutral-900">{screen.title}</span>
      {screen.note && <span className="text-[12px] text-neutral-500">{screen.note}</span>}
      <span className="mt-0.5 font-mono text-[11px] text-neutral-400">{screen.path}</span>
    </button>
  );
}
