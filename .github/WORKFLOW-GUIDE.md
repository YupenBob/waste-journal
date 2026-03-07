# 🤖 GitHub Actions 自动化部署指南

**RUBBISH Journal** 已配置 GitHub Actions，实现自动构建和部署！

---

## 📊 工作流程

```mermaid
graph LR
    A[推送代码到 GitHub] --> B{触发 Actions}
    B --> C[自动构建]
    C --> D[上传产物]
    D --> E[部署到 Pages]
    E --> F[🌐 网站上线]
```

---

## ⚙️ 触发条件

| 事件 | 说明 |
|------|------|
| **push** | 推送到 `main` 或 `master` 分支 |
| **pull_request** | 创建 PR 到主分支 |
| **workflow_dispatch** | 手动触发（在 Actions 页面） |

---

## 🚀 自动部署流程

### 1. 构建阶段

```yaml
runs-on: ubuntu-latest
```

**执行步骤**：
1. 📥 检出代码
2. 📦 设置 Node.js 环境
3. 🔧 安装依赖（如有 package.json）
4. 🏗️ 构建网站
5. 📤 上传构建产物

### 2. 部署阶段

```yaml
runs-on: ubuntu-latest
environment: github-pages
```

**执行步骤**：
1. 🚀 部署到 GitHub Pages
2. 📝 输出访问地址

---

## 🌐 访问地址

部署成功后，网站将在以下地址可用：

```
https://YupenBob.github.io/rubbish-journal/
```

---

## 📈 使用配额

| 资源 | 免费额度 | 说明 |
|------|----------|------|
| **运行时间** | 2000 分钟/月 | 每月重置 |
| **并行任务** | 最多 20 个 | 同时运行 |
| **存储** | 500 MB | 构建产物 |
| **带宽** | 100 GB/月 | 页面访问 |

---

## 🔧 手动触发部署

1. 访问 https://github.com/YupenBob/rubbish-journal/actions
2. 点击左侧 "🗑️ RUBBISH Journal - Auto Deploy"
3. 点击 "Run workflow" 按钮
4. 选择分支（默认 main）
5. 点击 "Run workflow"

---

## 📝 日志查看

**查看构建日志**：
1. 访问 Actions 页面
2. 点击最近的运行记录
3. 查看每个步骤的详细日志

**常见日志**：
```
✅ 检出代码
✅ 设置 Node.js v20
✅ 安装依赖
✅ 构建网站
✅ 上传产物
✅ 部署到 Pages
```

---

## 🛠️ 自定义构建

### Hexo 博客

```yaml
- name: 🔧 Hexo 构建
  run: |
    npm install
    hexo generate
```

### Hugo 网站

```yaml
- name: 🔧 Hugo 构建
  run: |
    hugo --minify
```

### Next.js/React

```yaml
- name: 🔧 React 构建
  run: |
    npm ci
    npm run build
```

### 纯静态网站

```yaml
- name: 🔧 静态网站
  run: |
    mkdir -p public
    cp -r site/* public/
```

---

## ⚠️ 常见问题

### Q: 构建失败怎么办？

**A**: 查看 Actions 日志，找到错误步骤

### Q: 如何取消自动部署？

**A**: 删除 `.github/workflows/deploy.yml` 文件

### Q: 如何部署到自定义域名？

**A**: 
1. 在仓库 Settings → Pages 中配置自定义域名
2. 添加 CNAME 文件

### Q: 构建时间太长怎么办？

**A**: 
- 使用缓存（cache: 'npm'）
- 减少不必要的依赖
- 优化构建脚本

---

## 🎯 最佳实践

### 1. 使用缓存

```yaml
- uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

### 2. 设置超时

```yaml
timeout-minutes: 10
```

### 3. 并发控制

```yaml
concurrency:
  group: "pages"
  cancel-in-progress: false
```

### 4. 环境配置

```yaml
environment:
  name: github-pages
  url: ${{ steps.deployment.outputs.page_url }}
```

---

## 📊 与其他平台对比

| 平台 | 免费额度 | 构建时间 | 部署难度 |
|------|----------|----------|----------|
| **GitHub Actions** | 2000 分钟/月 | ~5 分钟 | ⭐⭐⭐⭐⭐ |
| **Vercel** | 无限 | ~3 分钟 | ⭐⭐⭐⭐⭐ |
| **Netlify** | 300 分钟/月 | ~4 分钟 | ⭐⭐⭐⭐ |
| **本地部署** | 无限 | 取决于本地 | ⭐⭐ |

---

## 🦀 小三叶的建议

**适用场景**：
- ✅ 静态网站（Hugo/Hexo/Next.js）
- ✅ 文档站点
- ✅ 博客
- ✅ 项目展示页

**不适用场景**：
- ❌ 需要后端数据库
- ❌ 需要持续运行的服务
- ❌ 需要大量计算资源（超过 2000 分钟/月）

---

**最后更新**：2026-03-07
**状态**：✅ 已配置
