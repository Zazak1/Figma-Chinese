# Figma Chinese (Simplified) Userscript

一个基于 Tampermonkey 的 Figma 网页端汉化脚本。  
通过超大型内置词库（短语词典 + 词元词库）+ 动态文本规则 + DOM 监听，将英文界面文案实时替换为简体中文。

## 项目亮点

- 覆盖 Figma 常见 UI 文案（按钮、菜单、提示、属性面板）
- 内置超大型词库：短语直译 + 词元回退翻译（未收录整句也可按词翻译）
- 支持动态内容翻译（如 `Loading...`、`No results ...`、`Upgrade to ...`）
- 对新增 DOM 自动翻译（`MutationObserver`）
- 避免误改用户输入区（跳过 `input`、`textarea`、`contenteditable` 等）
- 内置缓存，减少重复计算，提高页面交互时的稳定性
- 全能架构：页面类型识别 + 功能开关菜单（持久化）+ URL 变化重建配置 + 可选远程翻译

## 目录结构

```text
.
├── tampermonkey/
│   ├── figma-zh-cn.user.js     # 主脚本（安装入口）
│   └── replacements.js         # 词典替换版本（备用）
├── dict/
│   └── figma-zh-CN.json        # 词典源
└── scripts/
    └── extract_candidates.sh   # 文案候选提取脚本
```

## 处理逻辑（全能模式）

1. 初始化：加载功能开关（`GM_getValue`）和页面配置。
2. 页面识别：按 URL 前缀识别页面类型（`files/design/community/...`）。
3. 首屏翻译：扫描文本节点与属性，按以下优先级处理：
   - 静态词典
   - 动态规则（正则）
   - 词元回退翻译
4. 增量翻译：`MutationObserver` 监听 DOM 变化，仅处理新增或变更节点。
5. URL 变化：检测到路由变化后重建页面配置并清理缓存。
6. 用户控制：通过 Tampermonkey 菜单开关功能（正则/动态规则/词元回退/属性翻译/远程翻译/调试日志）。

## 安装教程

### 1) 安装 Tampermonkey

在浏览器扩展商店安装 Tampermonkey：

- Chrome / Edge：搜索 `Tampermonkey`
- Firefox：搜索 `Tampermonkey`

安装完成后，浏览器工具栏会出现 Tampermonkey 图标。

### 2) 安装脚本（本地方式）

1. 打开 Tampermonkey 控制面板
2. 点击 `Create a new script...`
3. 清空默认内容
4. 将 `tampermonkey/figma-zh-cn.user.js` 全部内容粘贴进去
5. 保存（`Ctrl/Cmd + S`）

### 3) 启用并验证

1. 确认脚本状态为 `Enabled`
2. 打开 [https://www.figma.com/](https://www.figma.com/)
3. 刷新页面
4. 验证常见文案是否已变为中文（例如 `Settings`、`Log out`、`Loading...`）

## 更新词典（可选）

当你想补充新文案时：

1. 编辑 `dict/figma-zh-CN.json`
2. 同步到 `tampermonkey/figma-zh-cn.user.js`（`MAP`）
3. 可选同步到 `tampermonkey/replacements.js`
4. 在 Tampermonkey 中重新保存脚本并刷新 Figma 页面

## 开发与校验

```bash
node --check tampermonkey/figma-zh-cn.user.js
node --check tampermonkey/replacements.js
```

## 常见问题

### 为什么有些文本没被翻译？

- Figma 可能在 `canvas` 或非文本节点渲染该内容
- 文案是新版本新增，词典尚未覆盖
- 文案包含动态变量，需要补充规则

### 为什么输入框里的文字不翻译？

这是设计行为：脚本会主动跳过可编辑区域，避免影响你输入内容。

## 免责声明

本项目为第三方脚本，与 Figma 官方无关。  
请仅在你信任的环境中使用，并自行评估脚本风险。
