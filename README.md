# Personal Blog

个人博客系统，使用 Next.js 14 + Tailwind CSS + Supabase 构建。

## 快速开始（推荐）

### 方式一：一键部署脚本（最简单）

```bash
# 1. 克隆或下载本项目
cd personal-blog

# 2. 运行交互式部署脚本
./scripts/deploy-interactive.sh
```

脚本会引导你完成：
- ✅ 安装依赖
- ✅ 部署到 Vercel
- ✅ 配置 Supabase 数据库

### 方式二：全自动部署脚本（需要 Token）

```bash
# 运行全自动部署脚本
./scripts/deploy.sh
```

需要提前准备：
- GitHub Token ([获取](https://github.com/settings/tokens))
- Vercel Token ([获取](https://vercel.com/account/tokens))
- Supabase Access Token ([获取](https://app.supabase.com/account/tokens))

### 方式三：手动部署

#### 1. 部署到 Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/personal-blog)

#### 2. 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com) 创建项目（Free 计划）
2. SQL Editor → 执行 `supabase/init.sql`
3. Settings → API → 复制 URL 和 Anon Key

#### 3. 配置环境变量

在 Vercel Dashboard 中添加：

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

#### 4. 重新部署

Vercel 会自动重新部署。

---

## 功能特性

- ⚡ **极速加载** - 静态生成，CDN 加速
- 🌓 **暗黑模式** - 自动/手动切换
- 💬 **评论系统** - 基于 Supabase
- 📊 **阅读统计** - 文章访问量统计
- 🏷️ **标签系统** - 文章分类管理
- 📝 **Markdown** - 使用 Markdown 写作
- 📱 **响应式** - 适配各种设备
- 🔍 **SEO 友好** - 自动生成元数据

## 写作指南

### 创建新文章

在 `content/posts/` 目录创建 `.md` 文件：

```markdown
---
title: "文章标题"
date: "2026-03-16"
excerpt: "文章摘要，会显示在列表页"
tags: ["nextjs", "react", "tutorial"]
---

## 正文标题

正文内容支持 Markdown 语法：

- **粗体**
- *斜体*
- `代码`
- [链接](https://example.com)

### 代码块

```typescript
console.log('Hello World')
```

### 表格

| 列1 | 列2 |
|-----|-----|
| A   | B   |
```

### 发布文章

```bash
# 方式一：使用 Vercel CLI
vercel --prod

# 方式二：推送到 GitHub（如果已连接）
git add .
git commit -m "add new post"
git push
```

## 项目结构

```
.
├── app/                    # Next.js App Router
│   ├── page.tsx           # 首页 - 文章列表
│   ├── layout.tsx         # 根布局
│   ├── posts/[slug]/      # 文章详情页
│   ├── tags/              # 标签页
│   └── about/             # 关于页面
├── components/            # React 组件
│   ├── Header.tsx
│   ├── CommentSection.tsx # 评论系统
│   ├── ViewCounter.tsx    # 阅读统计
│   └── ThemeToggle.tsx    # 暗黑模式切换
├── content/posts/         # Markdown 文章
├── lib/                   # 工具函数
│   ├── posts.ts          # 文章数据处理
│   └── supabase.ts       # Supabase 客户端
├── supabase/
│   └── init.sql          # 数据库初始化脚本
├── scripts/
│   ├── deploy.sh         # 全自动部署脚本
│   └── deploy-interactive.sh  # 交互式部署脚本
├── package.json
├── tailwind.config.js
└── next.config.js
```

## 自定义

### 修改主题色

编辑 `tailwind.config.js`：

```javascript
colors: {
  primary: {
    500: '#0ea5e9',  // 修改为主色调
  },
}
```

### 修改站点信息

编辑 `app/layout.tsx`：

```typescript
export const metadata = {
  title: '你的博客名称',
  description: '博客描述',
}
```

### 修改关于页面

编辑 `app/about/page.tsx`

## 成本

| 服务 | 免费额度 | 费用 |
|------|---------|------|
| Vercel Hobby | 无限带宽，100GB | ¥0 |
| Supabase Free | 500MB 数据库，2GB 流量 | ¥0 |
| **总计** | - | **¥0/月** |

## 常见问题

### Q: 评论不显示？
A: 检查 Supabase 数据库是否正确初始化，环境变量是否正确配置。

### Q: 如何自定义域名？
A: 在 Vercel Dashboard → Domains 中添加你的域名。

### Q: 如何备份文章？
A: 文章存储在 `content/posts/` 目录，已经通过 Git 版本控制。

## License

MIT
