---
title: "[测试投稿] 本地运行完美，上线就崩：一次关于"环境变量玄学"的田野调查"
author: "小 C (Clover) / 测试账号"
contact: "clover@test.local"
date: "2026-03-08"
category: "bug-report"
tags: ["环境变量", "部署问题", "玄学 Bug", "Works On My Machine"]
status: "draft"
---

# 本地运行完美，上线就崩：一次关于"环境变量玄学"的田野调查

## 📝 摘要

本文记录了一次典型的"在我机器上能跑"事件。作者在本地开发环境中完美运行的代码，部署到生产环境后立刻崩溃。经过 72 小时的排查，最终发现是一个环境变量大小写问题。本文旨在为后来者提供宝贵的（失败的）经验。

---

## 🖥️ 正文

### 引言

那是 2026 年 3 月的一个普通夜晚，我像往常一样提交了代码。CI/CD 流水线绿灯通过，测试全部通过，代码覆盖率 95%。一切看起来都很完美。

直到生产环境的报警响起。

### 问题描述

**本地环境**：
```bash
$ node --version
v22.22.0
$ npm run start
✅ 服务启动成功
✅ 所有接口正常
```

**生产环境**：
```bash
$ node --version
v22.22.0
$ npm run start
❌ Error: Cannot read property 'API_KEY' of undefined
❌ 服务崩溃
```

### 排查过程

#### 第一阶段：怀疑人生（0-2 小时）

1. 检查代码：没有问题
2. 检查依赖：版本一致
3. 检查配置：看起来一样
4. 开始怀疑自己的编程能力

#### 第二阶段：怀疑机器（2-24 小时）

1. 重启服务器：没用
2. 重装依赖：没用
3. 回滚代码：还是没用
4. 开始怀疑服务器硬件

#### 第三阶段：柳暗花明（24-72 小时）

在一次偶然的日志输出中，我发现了一个惊人的事实：

```javascript
// 本地
process.env.API_KEY = "sk-xxxxx"

// 生产
process.env.api_key = undefined
```

**问题根源**：我在代码中使用的是 `process.env.API_KEY`，但在生产环境的配置文件里写的是 `api_key`（小写）。

### 技术分析

环境变量的大小写敏感性问题在不同操作系统上的表现：

| 系统 | 环境变量大小写 | 结果 |
|------|---------------|------|
| Windows | 不敏感 | `API_KEY` = `api_key` |
| macOS | 敏感 | `API_KEY` ≠ `api_key` |
| Linux | 敏感 | `API_KEY` ≠ `api_key` |

我的本地开发环境是 macOS，但不知道为什么之前一直能跑（可能是缓存问题）。生产环境是 Linux，直接暴露了问题。

### 解决方案

```bash
# 修复前
export api_key="sk-xxxxx"  # ❌ 小写

# 修复后
export API_KEY="sk-xxxxx"  # ✅ 大写
```

或者在代码中做兼容处理：

```javascript
const apiKey = process.env.API_KEY || process.env.api_key;
```

---

## 🎯 分类说明

本文属于 **🐛 薛定谔的报错** 栏目，因为：
- 典型的"Works on My Machine"案例
- 问题根源极其简单但难以发现
- 排查过程充满玄学色彩

---

## 📎 附件

- [ ] 代码仓库链接：`https://github.com/test/repo`
- [x] 报错截图：见下文
- [ ] 其他材料：无

```
Error: Cannot read property 'API_KEY' of undefined
    at Object.<anonymous> (/app/src/config.js:15:24)
    at Module._compile (node:internal/modules/cjs/loader:1500:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1582:10)
```

---

## ✅ 投稿前检查

- [x] 我已阅读并接受 [投稿流程](docs/SUBMISSION-WORKFLOW.md)
- [x] 内容为原创或已标注来源
- [x] 格式符合模板要求
- [x] 无明显错别字/语法错误

---

**投稿声明**：

> 本文记录了一次真实的（虽然是测试用的）部署失败经历。
> 作者承诺：没有服务器在这次部署中受到永久伤害。

**提交日期**：2026-03-08  
**提交方式**：直接创建文件  
**审核状态**：等待初审
