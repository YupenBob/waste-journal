#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re

# 读取共享 header 组件
with open('site/components/header.html', 'r', encoding='utf-8') as f:
    shared_header = f.read()

# 需要更新的页面列表
pages = [
    'archive.html',
    'editorial-board.html',
    'faq.html',
    'submission-guidelines.html',
    'template.html'
]

# CSS 和 JS 引用
css_js_refs = '''
  <link rel="stylesheet" href="css/shared.css">
  <link rel="stylesheet" href="css/pages.css">
'''

js_ref = '''
  <script src="js/main.js"></script>
'''

for page in pages:
    if os.path.exists(f'site/{page}'):
        print(f'正在更新 {page}...')
        
        # 读取原页面
        with open(f'site/{page}', 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 移除原有的 header、top bar、nav 部分
        # 找到 </head> 标签，在其前插入 CSS 引用
        content = re.sub(
            r'(</head>)',
            css_js_refs + r'\1',
            content,
            flags=re.DOTALL
        )
        
        # 找到 <body> 标签，在其后插入共享 header
        content = re.sub(
            r'(<body[^>]*>)',
            r'\1\n' + shared_header,
            content,
            flags=re.DOTALL
        )
        
        # 移除原有的 header、top bar、nav 部分
        # 删除从 <header> 到 </nav> 的所有内容（包括这些标签）
        content = re.sub(
            r'<div class="top-bar">.*?</div>\s*<header>.*?</header>\s*<nav>.*?</nav>',
            '',
            content,
            flags=re.DOTALL
        )
        
        # 如果还有单独的 header 或 nav，也删除
        content = re.sub(r'<header>.*?</header>', '', content, flags=re.DOTALL)
        content = re.sub(r'<nav>.*?</nav>', '', content, flags=re.DOTALL)
        content = re.sub(r'<div class="top-bar">.*?</div>', '', content, flags=re.DOTALL)
        
        # 确保在 </body> 前有 JS 引用（如果还没有的话）
        if '<script src="js/main.js"></script>' not in content:
            content = re.sub(
                r'(</body>)',
                js_ref + r'\1',
                content,
                flags=re.DOTALL
            )
        
        # 写入新文件
        with open(f'site/{page.replace(".html", "-new.html")}', 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f'  ✓ {page} 更新完成')
    else:
        print(f'  ✗ {page} 不存在')

print('\n所有页面更新完成！')