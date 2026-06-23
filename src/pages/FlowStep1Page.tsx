import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';

/** Step 1 Entrance — 两条入口流程总览（对照流程图） */
export function FlowStep1Page() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-100 pb-10">
      <PageHeader title="Step 1 · Entrance" onBack={() => navigate('/')} />
      <p className="px-4 py-3 text-[13px] leading-relaxed text-neutral-600">
        外层导览：<strong>首页 = POI 详情</strong>，返回进入 Post 发布页；发帖 <strong>Add location</strong> 为
        Publish Entry 提报入口。详情 ⋯ 菜单为 POI Entry 提报入口。
      </p>

      {/* Publish Entry */}
      <section className="mx-4 mb-6 overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="bg-neutral-900 px-4 py-2.5 text-[12px] font-bold uppercase tracking-wide text-white">
          Publish Entry · New Location Process
        </div>
        <FlowStep n={1} title="Post 发布页" desc="Add location 行" onClick={() => navigate('/post')} />
        <FlowArrow />
        <FlowStep n={2} title="Add location 搜索" desc="附近地点 + Create a new location" onClick={() => navigate('/post/add-location')} />
        <FlowArrow />
        <FlowStep n={3} title="Create location 表单" desc="+ Add → 填写 Name / 地图 / Photos" onClick={() => navigate('/post/create-location?name=Kongfu+Hotpot')} last />
      </section>

      {/* POI Entry */}
      <section className="mx-4 overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="bg-tiktok px-4 py-2.5 text-[12px] font-bold uppercase tracking-wide text-white">
          POI Entry · Error Reporting
        </div>
        <FlowStep n={1} title="POI 详情页（首页）" desc="返回 → Post 发布页" onClick={() => navigate('/')} />
        <FlowArrow />
        <FlowStep n={2} title="Bottom Sheet" desc="Suggest an edit · Report · Leave feedback" onClick={() => navigate('/?sheet=1')} />
        <FlowArrow />
        <FlowStep n={3} title="Suggest an edit" desc="字段列表 → 子页" onClick={() => navigate('/report')} last />
      </section>

      <p className="mt-6 px-4 text-center text-[12px] text-neutral-500">
        完整界面索引 →{' '}
        <button type="button" className="font-semibold text-google" onClick={() => navigate('/demo')}>
          UI Demo Index
        </button>
      </p>
    </div>
  );
}

function FlowStep({
  n,
  title,
  desc,
  onClick,
  last,
}: {
  n: number;
  title: string;
  desc: string;
  onClick: () => void;
  last?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-start gap-3 px-4 py-4 text-left active:bg-neutral-50 ${last ? '' : 'border-b border-neutral-100'}`}
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-card text-[13px] font-bold text-neutral-700">
        {n}
      </span>
      <span>
        <span className="block text-[15px] font-semibold text-neutral-900">{title}</span>
        <span className="mt-0.5 block text-[13px] text-neutral-500">{desc}</span>
      </span>
      <span className="ml-auto self-center text-neutral-300">›</span>
    </button>
  );
}

function FlowArrow() {
  return (
    <div className="flex justify-center py-0.5 text-neutral-300" aria-hidden="true">
      ↓
    </div>
  );
}
