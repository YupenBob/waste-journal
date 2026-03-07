# WASTE Journal 接稿流程

**原则**：优秀、高效、透明

---

## 📬 1. 投稿渠道

### 接收方式
1. **GitHub Issues**（主要）
   - 仓库：https://github.com/YupenBob/waste-journal/issues
   - 标签：`submission`
   
2. **邮件投稿**（备选）
   - 待配置

3. **表单投稿**（未来）
   - 静态表单 + GitHub API

### 投稿模板
```markdown
---
title: [文章标题]
author: [作者名/匿名]
contact: [联系方式，可选]
category: [bug-report | archaeology | art | black-hole]
tags: [标签 1, 标签 2, ...]
---

## 正文

[文章内容]

## 附件（可选）

- [代码链接]
- [图片/截图]
- [其他材料]
```

---

## 🔍 2. 审核流程

### 初审（自动）
- [ ] 格式检查（GitHub Action）
- [ ] 内容分类
- [ ] 标签建议
- [ ] 重复检测

### 复审（人工/AI）
| 标准 | 要求 |
|------|------|
| **原创性** | 必须原创或明确标注来源 |
| **质量** | 有一定技术价值或娱乐价值 |
| **风格** | 符合 WASTE 调性（学术幽默） |
| **长度** | 300-5000 字 |

### 审核结果
- ✅ **接受** → 进入编辑流程
- ⚠️ **修改后重投** → 给出修改建议
- ❌ **拒绝** → 礼貌回复 + 原因

---

## ✍️ 3. 编辑流程

### 编辑检查清单
- [ ] 标题优化（吸引眼球）
- [ ] 格式统一（Markdown 规范）
- [ ] 代码高亮（语法正确）
- [ ] 图片压缩（<500KB）
- [ ] 标签完善（便于检索）
- [ ] 摘要撰写（100-200 字）

### 编辑工具
- Markdown 编辑器
- 代码格式化工具
- 图片压缩工具
- AI 润色（可选）

---

## 🚀 4. 发布流程

### 发布前检查
- [ ] 作者确认最终稿
- [ ] 分类正确
- [ ] 标签完整
- [ ] SEO 优化（标题、描述）

### 发布步骤
1. 合并到 `main` 分支
2. GitHub Actions 自动构建
3. 部署到 GitHub Pages
4. 社交媒体同步（可选）

### 发布后
- [ ] 通知作者
- [ ] 社交媒体推广
- [ ] 收集读者反馈
- [ ] 统计数据（阅读量、点赞等）

---

## 📊 5. 流程自动化

### GitHub Actions 工作流

```yaml
# .github/workflows/submission.yml
name: Submission Workflow

on:
  issues:
    types: [labeled]

jobs:
  validate:
    if: github.event.label.name == 'submission'
    runs-on: ubuntu-latest
    steps:
      - name: Check format
        run: echo "Validating submission format..."
      
      - name: Auto-label
        run: echo "Adding category labels..."
      
      - name: Notify reviewers
        run: echo "Notifying review team..."
```

### 自动化环节
| 环节 | 自动化程度 |
|------|------------|
| 格式检查 | ✅ 100% |
| 分类建议 | ✅ 80%（AI） |
| 重复检测 | ✅ 90% |
| 编辑润色 | ⚠️ 50%（AI 辅助） |
| 最终审核 | ❌ 100% 人工 |
| 发布部署 | ✅ 100% |

---

## 📈 6. 质量指标

| 指标 | 目标 |
|------|------|
| **初审时间** | <24 小时 |
| **复审时间** | <72 小时 |
| **接受率** | 30-50% |
| **发布频率** | 每周 2-3 篇 |
| **读者满意度** | >4/5 |

---

## 🎯 7. 特殊处理

### 紧急投稿
- 重大 bug/安全漏洞
- 时效性强的内容
- 处理：优先审核，24 小时内发布

### 系列文章
- 多篇相关内容
- 处理：统一规划，连续发布

### 合作投稿
- 多人合作
- 处理：明确署名顺序，统一联系

---

## 📝 8. 投稿者权益

- ✅ 署名权（可匿名）
- ✅ 修改建议权
- ✅ 撤稿权（发布前）
- ✅ 数据所有权

---

**版本**：v1.0  
**更新日期**：2026-03-08  
**维护者**：小 C (Clover)
