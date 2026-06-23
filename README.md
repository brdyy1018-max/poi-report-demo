# POI 用户提报功能 Expect Demo

TikTok 风格 POI 提报完整交互 Demo，按 **Step 1 · Entrance** 流程图组织两条入口。

## 在线 Demo（GitHub Pages）

**https://brdyy1018-max.github.io/poi-report-demo/**

仓库：https://github.com/brdyy1018-max/poi-report-demo

推送 `main` 分支后会自动重新部署。

## 快速开始

```bash
cd poi-report-demo
npm install
npm run dev
```

打开 **http://localhost:5173/** — **POI 详情页为首页**。

## 外层导览

| 操作 | 路径 |
|------|------|
| 首页 | `/` — HOTEL OSAKA PIK2 详情 |
| 详情返回 | → `/post` TikTok 发布视频页 |
| 发布页返回 | → `/` 回到详情 |

## Step 1 · Entrance（两条提报入口）

### Publish Entry — 发帖新增地点（从 Post 页进入）

1. 详情页点 **返回** → `/post`
2. Post 页 **Add location** → `/post/add-location`
3. 搜不到 → **+ Add** → `/post/create-location` 填写表单 → Continue 回到 Post
4. 点 **Post** 发布时提交新建地点提报

### POI Entry — 详情页报错/编辑

1. `/` — POI 详情，右上角 **⋯** 菜单
2. **Suggest an edit / Report a place** → `/report` 网格 → `/edit/*`
3. 全屏看图 → 图片报错 → `/report/image`

## 验收全部界面

**http://localhost:5173/demo** — UI Demo Index 按流程分组列出所有页面。

**http://localhost:5173/flow** — Step 1 流程图对照（开发用）。

## 主路由

| 路径 | 说明 |
|------|------|
| `/` | POI 详情（首页） |
| `/post` | Publish Entry · Post 发布页 |
| `/flow` | Step 1 流程总览 |
| `/report` | Report a place hub |
| `/demo` | 全屏索引 |
| `/profile` | Inbox / 快捷入口 |
