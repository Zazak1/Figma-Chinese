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
- 全能架构：页面类型识别 + 功能开关菜单（持久化）+ URL 变化重建配置
- 支持远程词库：GitHub 词库自动拉取 + 讯飞接口在线学习 + 本地缓存 + 手动刷新

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

## 快速安装（Tampermonkey）

### 方式 A：一键安装（推荐）

1. 安装浏览器扩展 `Tampermonkey`。
2. 打开下面链接并安装脚本：  
   [figma-zh-cn.user.js](https://raw.githubusercontent.com/Zazak1/Figma-Chinese/main/tampermonkey/figma-zh-cn.user.js)
3. 访问 [https://www.figma.com/](https://www.figma.com/) 并刷新页面。

### 方式 B：本地手动安装

1. 打开 Tampermonkey 控制台，点击 `Create a new script...`
2. 复制 [tampermonkey/figma-zh-cn.user.js](./tampermonkey/figma-zh-cn.user.js) 内容粘贴
3. 保存（`Ctrl/Cmd + S`）并刷新 Figma 页面

## 远程词库

- 默认远程地址：`https://raw.githubusercontent.com/Zazak1/Figma-Chinese/main/dict/figma-zh-CN.json`
- 行为：启动时尝试拉取并合并；失败时自动回退本地内置词库（不影响可用性）
- 讯飞学习：本地词库未命中时，后台调用讯飞接口翻译并写入持久化词库
- 缓存：本地缓存 24 小时

## 菜单功能（Tampermonkey）

- `正则规则`：启用/禁用正则短语翻译
- `动态规则`：启用/禁用动态句式翻译
- `词元回退`：启用/禁用词元级回退翻译
- `属性翻译`：启用/禁用 `title/placeholder/aria-label` 等属性翻译
- `远程翻译`：启用简介“翻译”按钮（调用讯飞）
- `远程词库`：启用/禁用远程词库同步
- `立即刷新远程词库`：手动拉取最新词库
- `清空讯飞学习词库`：清空本地学习缓存
- `调试日志`：输出命中统计和调试日志

## 更新词典（可选）

当你想补充新文案时：

1. 编辑 `dict/figma-zh-CN.json`
2. 提交到仓库 `main` 分支
3. 客户端通过“立即刷新远程词库”即可拉取最新条目

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

### 远程词库/讯飞不生效怎么办？

1. 检查 Tampermonkey 菜单中 `远程词库` 是否启用
2. 确认脚本头部存在 `@connect fanyi.iflyrec.com` 与 `@connect raw.githubusercontent.com`
3. 执行一次 `立即刷新远程词库`
4. 刷新 Figma 页面

### 为什么输入框里的文字不翻译？

这是设计行为：脚本会主动跳过可编辑区域，避免影响你输入内容。

## 免责声明

本项目为第三方脚本，与 Figma 官方无关。  
请仅在你信任的环境中使用，并自行评估脚本风险。
