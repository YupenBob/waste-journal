# W.A.S.T.E. Journal - 共享 Header 组件使用说明

---

## 📁 文件结构

```
site/
├── components/
│   └── header.html          # 共享 Header 组件（修改这里，所有页面生效）
├── js/
│   ├── main.js              # 原有 JavaScript（可删除）
│   └── load-header.js       # Header 加载器（新增）
├── css/
│   └── shared.css           # 共享样式
└── *.html                   # 所有页面
```

---

## 🚀 使用方法

### 步骤 1：在页面 `<head>` 中引入 CSS

```html
<head>
  <link rel="stylesheet" href="css/shared.css">
  <link rel="stylesheet" href="css/pages.css">
</head>
```

### 步骤 2：在 `<body>` 开头引入 JavaScript

```html
<body>
  <!-- Header 通过 JavaScript 动态加载 -->
  <script src="js/load-header.js"></script>
  
  <!-- 页面内容 -->
  <main>
    ...
  </main>
</body>
```

### 步骤 3：（可选）高亮当前页面导航

JavaScript 会自动高亮，无需额外操作。

---

## ✅ 优势

| 特性 | 传统方式 | 共享组件方式 |
|------|----------|--------------|
| **修改 header** | 改 16 个文件 | 改 1 个文件 |
| **代码重复** | 大量重复 | 零重复 |
| **维护成本** | 高 | 低 |
| **加载速度** | 快 | 稍慢（多一次 HTTP 请求） |
| **SEO** | 好 | 好（搜索引擎执行 JS） |

---

## 📝 修改示例

### 修改导航链接

**编辑**：`components/header.html`

```html
<!-- 找到导航部分 -->
<nav>
  <div class="nav-content">
    <ul>
      <li class="nav-item"><a href="index.html">Home</a></li>
      <li class="nav-item"><a href="about.html">About</a></li>
      <!-- 添加新链接 -->
      <li class="nav-item"><a href="new-page.html">New Page</a></li>
    </ul>
  </div>
</nav>
```

**效果**：所有页面的导航栏自动更新！

---

### 修改侧边栏菜单

**编辑**：`components/header.html`

```html
<nav class="sidebar-nav">
  <ul>
    <li><a href="index.html">Home / 主页</a></li>
    <li><a href="about.html">About / 关于</a></li>
    <!-- 添加新菜单项 -->
    <li><a href="new-page.html">New / 新页面</a></li>
  </ul>
</nav>
```

**效果**：所有页面的侧边栏自动更新！

---

### 修改 Logo 或 Slogan

**编辑**：`components/header.html`

```html
<div class="sidebar-header">
  <div class="sidebar-logo">W.A.S.T.E.</div>
  <p class="sidebar-tagline">你的新 Slogan</p>
</div>
```

**效果**：所有页面的侧边栏 Logo 和 Slogan 自动更新！

---

## 🔧 技术细节

### 加载原理

1. 页面加载时，`load-header.js` 执行
2. 通过 `fetch()` 请求 `components/header.html`
3. 获取 HTML 后，插入到 `<body>` 开头
4. 初始化 Sticky Bar、Sidebar 等交互功能

### 浏览器兼容性

- ✅ Chrome / Edge（最新版）
- ✅ Firefox（最新版）
- ✅ Safari（最新版）
- ✅ 手机浏览器（iOS / Android）

### GitHub Pages 兼容

- ✅ 完美兼容
- ✅ 无需服务器配置
- ✅ 纯静态方案

---

## 📋 待办事项

### 需要更新的页面

以下页面需要简化，移除重复的 header 代码：

- [ ] index.html
- [ ] about.html
- [ ] sections.html
- [ ] archive.html
- [ ] editorial-board.html
- [ ] faq.html
- [ ] submission-guidelines.html

### 更新步骤

1. 删除原有的 header HTML 代码
2. 在 `<body>` 开头添加 `<script src="js/load-header.js"></script>`
3. 测试页面功能

---

*最后更新：2026-03-08*  
*W.A.S.T.E. Journal — Highly Refined Rubbish*
