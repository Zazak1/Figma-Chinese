// ==UserScript==
// @name         Figma 汉化（简体中文）
// @namespace    https://www.figma.com/
// @version      0.2.0
// @description  Translate Figma UI text to Simplified Chinese in browser (Tampermonkey)
// @author       linyichen
// @match        https://www.figma.com/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const DEBUG = false;
  const STATS = {
    exactHits: 0,
    phraseHits: 0,
    ruleHits: 0,
    cacheHits: 0,
    attrHits: 0,
    nodeScans: 0
  };

  const MAP = 
{
  "Cancel": "取消",
  "Learn more": "了解更多",
  "Name": "名称",
  "Save": "保存",
  "Remove": "移除",
  "Got it": "知道了",
  "Done": "完成",
  "Close": "关闭",
  "Back": "返回",
  "Delete": "删除",
  "None": "无",
  "Copy link": "复制链接",
  "Continue": "继续",
  "Settings": "设置",
  "Edit": "编辑",
  "Next": "下一步",
  "Custom": "自定义",
  "Text": "文本",
  "Color": "颜色",
  "Preview": "预览",
  "View": "视图",
  "Search": "搜索",
  "Image": "图像",
  "Components": "组件",
  "Link": "链接",
  "Members": "成员",
  "Video": "视频",
  "Plugins": "插件",
  "Mixed": "混合",
  "Manage": "管理",
  "Description": "描述",
  "Copy": "复制",
  "Teams": "团队",
  "Review": "审核",
  "File": "文件",
  "FigJam": "FigJam",
  "Update": "更新",
  "Undo": "撤销",
  "Templates": "模板",
  "Other": "其他",
  "Open": "打开",
  "More options": "更多选项",
  "Libraries": "资源库",
  "Fill": "填充",
  "Dismiss": "忽略",
  "Try again": "重试",
  "Title": "标题",
  "Styles": "样式",
  "Style": "样式",
  "Star": "收藏",
  "Opacity": "不透明度",
  "Make": "制作",
  "Left": "左",
  "Go back": "返回",
  "Files": "文件",
  "Design": "设计",
  "Confirm": "确认",
  "Submit": "提交",
  "Something went wrong": "出错了",
  "Section": "分区",
  "Right": "右",
  "Recents": "最近",
  "Organization": "组织",
  "Frame": "画框",
  "Connect": "连接",
  "Alignment": "对齐",
  "Widget": "小组件",
  "Type": "类型",
  "Team": "团队",
  "Stop": "停止",
  "Scale": "缩放",
  "Publish": "发布",
  "Position": "位置",
  "People": "人员",
  "Page": "页面",
  "Line": "线条",
  "Email": "邮箱",
  "Ellipse": "椭圆",
  "Development": "开发",
  "Details": "详情",
  "Create team": "创建团队",
  "Size": "尺寸",
  "Seat type": "席位类型",
  "Restore": "恢复",
  "Prototype": "原型",
  "Offset": "偏移",
  "Direction": "方向",
  "Create": "创建",
  "Content": "内容",
  "Code block": "代码块",
  "Center": "居中",
  "Background": "背景",
  "Back to files": "返回文件",
  "Assets": "资产",
  "Approve": "批准",
  "Admin": "管理员",
  "Workspace": "工作区",
  "Vertical": "垂直",
  "Vector": "矢量",
  "Upgrade to Professional": "升级到专业版",
  "Status": "状态",
  "Solid": "纯色",
  "Reset": "重置",
  "Request sent": "请求已发送",
  "Rename": "重命名",
  "Reload": "重新加载",
  "Rectangle": "矩形",
  "Pending": "待处理",
  "Log in": "登录",
  "Language": "语言",
  "Horizontal": "水平",
  "Figma Slides": "Figma Slides",
  "Figma": "Figma",
  "Connected": "已连接",
  "Community": "社区",
  "Code": "代码",
  "Buzz": "Buzz",
  "Bottom": "底部",
  "Auto": "自动",
  "Added": "已添加",
  "Workspaces": "工作区",
  "Widgets": "小组件",
  "View plans": "查看套餐",
  "Variables": "变量",
  "Upgrade": "升级",
  "Table": "表格",
  "Stamp": "图章",
  "Slides": "幻灯片",
  "Show more": "显示更多",
  "Shape": "形状",
  "See more": "查看更多",
  "Resources": "资源",
  "Removed": "已移除",
  "Projects": "项目",
  "Professional": "专业版",
  "Play": "播放",
  "Overview": "概览",
  "Overlay": "覆盖层",
  "Light": "浅色",
  "Guest": "访客",
  "Export": "导出",
  "Duplicate": "复制副本",
  "Default": "默认",
  "Decline": "拒绝",
  "Dark": "深色",
  "Upload": "上传",
  "Untitled": "未命名",
  "Total": "总计",
  "Suggested": "建议",
  "Spacing": "间距",
  "Slice": "切片",
  "Share": "分享",
  "Send": "发送",
  "Select all": "全选",
  "See all": "查看全部",
  "Retry": "重试",
  "Recommended": "推荐",
  "Published": "已发布",
  "Properties": "属性",
  "Other teams": "其他团队",
  "Not now": "暂不",
  "More actions": "更多操作",
  "More": "更多",
  "Monthly": "按月",
  "Locked": "已锁定",
  "Group": "编组",
  "Go to main component": "转到主组件",
  "Free": "免费",
  "Font size": "字号",
  "Fixed": "固定",
  "Filter": "筛选",
  "Figma Make": "Figma Make",
  "Figma Buzz": "Figma Buzz",
  "Error": "错误",
  "Enabled": "已启用",
  "Duration": "时长",
  "Download": "下载",
  "Disconnect": "断开连接",
  "Dev Mode": "开发模式",
  "Desktop": "桌面端",
  "Created": "已创建",
  "Corner radius": "圆角半径",
  "Contact support": "联系支持",
  "Connector": "连接线",
  "Colors": "颜色",
  "Change language": "更改语言",
  "Billing group": "计费组",
  "AI credits": "AI 点数",
  "AI chat": "AI 聊天",
  "Webpage": "网页",
  "Variable": "变量",
  "Value": "值",
  "Try it out": "试试看",
  "Terms of Service": "服务条款",
  "Team name": "团队名称",
  "Sticky": "便签",
  "Start from scratch": "从零开始",
  "Start": "开始",
  "Square": "正方形",
  "Slot": "插槽",
  "Site": "站点",
  "Select": "选择",
  "Rotation": "旋转",
  "Replace": "替换",
  "Polygon": "多边形",
  "Plugin": "插件",
  "Pages": "页面",
  "Padding": "内边距",
  "Open in new tab": "在新标签页打开",
  "Mind map": "思维导图",
  "Min width": "最小宽度",
  "Medium": "中",
  "Media": "媒体",
  "Leave": "离开",
  "Import": "导入",
  "Home": "首页",
  "Hidden": "隐藏",
  "Grid": "网格",
  "Get started": "开始使用",
  "Full": "完整",
  "From Community": "来自社区",
  "Font": "字体",
  "Find": "查找",
  "Enterprise": "企业版",
  "Embed": "嵌入",
  "Document": "文档",
  "Disabled": "已禁用",
  "Diamond": "菱形",
  "Delay": "延迟",
  "Current": "当前",
  "Created in this file": "创建于此文件",
  "Count": "计数",
  "Connectors": "连接线",
  "Component": "组件",
  "Completed": "已完成",
  "Collection": "集合",
  "Clear search": "清除搜索",
  "Clear": "清除",
  "Blur": "模糊",
  "Basic": "基础",
  "An error occurred": "发生错误",
  "Admins": "管理员",
  "View details": "查看详情",
  "Version": "版本",
  "Unpublish": "取消发布",
  "Union": "联合",
  "Underline": "下划线",
  "Unavailable": "不可用",
  "Unassigned": "未分配",
  "Trigger": "触发器",
  "Triangle": "三角形",
  "Top left": "左上",
  "Timeline": "时间线",
  "Theme": "主题",
  "Text style": "文本样式",
  "Template": "模板",
  "Team project": "团队项目",
  "Tablet": "平板",
  "GitHub": "GitHub",
  "Privacy Policy": "隐私政策",
  "Note:": "注意：",
  "Object": "对象",
  "No results": "无结果",
  "No results found": "未找到结果",
  "Loading": "加载中",
  "Loading...": "加载中...",
  "Log out": "退出登录",
  "Log out of all accounts": "退出所有账号",
  "Help": "帮助",
  "Help and resources": "帮助与资源",
  "Help Center": "帮助中心",
  "Preferences": "偏好设置",
  "Open in app": "在应用中打开",
  "Sign up": "注册",
  "Try Figma Make": "试用 Figma Make",
  "Try Figma Slides": "试用 Figma Slides",
  "Try Figma Sites": "试用 Figma Sites",
  "Try Figma Buzz": "试用 Figma Buzz",
  "Upgrade to Organization": "升级到组织版",
  "Upgrade to a Professional plan": "升级到专业版套餐",
  "Upgrade to an Organization plan": "升级到组织版套餐"
}
;

  const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'PRE', 'TEXTAREA']);
  const ATTRS_TO_TRANSLATE = ['title', 'aria-label', 'placeholder', 'data-tooltip'];
  const TRANSLATION_CACHE = new Map();
  const TRANSLATION_CACHE_MAX_SIZE = 5000;

  const CANONICAL_MAP = new Map();
  const MAP_KEYS = Object.keys(MAP);
  for (const key of MAP_KEYS) {
    CANONICAL_MAP.set(canonicalizeForLookup(key).toLowerCase(), MAP[key]);
  }

  // Build one regex for fast phrase replacement.
  const PHRASE_KEYS = MAP_KEYS
    .filter((k) => k.includes(' '))
    .sort((a, b) => b.length - a.length);

  const PHRASE_REGEX = PHRASE_KEYS.length
    ? new RegExp(`(^|[^A-Za-z0-9])(${PHRASE_KEYS.map(escapeRegExp).join('|')})(?=[^A-Za-z0-9]|$)`, 'gi')
    : null;

  function escapeRegExp(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function normalize(text) {
    return text.replace(/\s+/g, ' ').trim();
  }

  function canonicalizeForLookup(text) {
    return normalize(text)
      .replace(/[’‘]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/…/g, '...')
      .replace(/[–—]/g, '-');
  }

  function splitPadding(text) {
    const match = text.match(/^(\s*)([\s\S]*?)(\s*)$/);
    if (!match) return { lead: '', core: text, tail: '' };
    return { lead: match[1], core: match[2], tail: match[3] };
  }

  function splitTrailingPunctuation(text) {
    const match = text.match(/^(.*?)([:：;；,，.!?！？]+)$/);
    if (!match) return { base: text, suffix: '' };
    return { base: match[1], suffix: match[2] };
  }

  function lookupTranslation(text) {
    const normalized = canonicalizeForLookup(text);
    if (!normalized) return null;
    const exact = MAP[normalized];
    if (exact) return exact;
    return CANONICAL_MAP.get(normalized.toLowerCase()) || null;
  }

  function translateLooseFragment(text) {
    const fragment = normalize(text);
    if (!fragment) return text;
    return lookupTranslation(fragment) || fragment;
  }

  const DYNAMIC_RULES = [
    {
      regex: /^Loading(?:\.\.\.)?$/i,
      translate: () => '加载中...'
    },
    {
      regex: /^Loading (.+?)(?:\.\.\.)?$/i,
      translate: (match) => `正在加载${translateLooseFragment(match[1])}...`
    },
    {
      regex: /^No results(?: found)?$/i,
      translate: () => '未找到结果'
    },
    {
      regex: /^No results (.+)$/i,
      translate: (match) => `无结果 ${translateLooseFragment(match[1])}`
    },
    {
      regex: /^Upgrade to (.+?) plan$/i,
      translate: (match) => `升级到${translateLooseFragment(match[1])}套餐`
    },
    {
      regex: /^Upgrade to (.+?) to (.+)$/i,
      translate: (match) => `升级到${translateLooseFragment(match[1])}以${translateLooseFragment(match[2])}`
    },
    {
      regex: /^Upgrade to (.+?)$/i,
      translate: (match) => `升级到${translateLooseFragment(match[1])}`
    },
    {
      regex: /^Sign up to (.+)$/i,
      translate: (match) => `注册以${translateLooseFragment(match[1])}`
    }
  ];

  function applyDynamicRules(text) {
    for (const rule of DYNAMIC_RULES) {
      const match = text.match(rule.regex);
      if (!match) continue;
      const translated = rule.translate(match);
      if (translated && translated !== text) {
        STATS.ruleHits += 1;
        return translated;
      }
    }
    return null;
  }

  function applyPhraseReplacement(text) {
    if (!PHRASE_REGEX) return text;
    return text.replace(PHRASE_REGEX, (match, leadBoundary, phrase) => {
      const t = lookupTranslation(phrase);
      if (t && t !== phrase) {
        STATS.phraseHits += 1;
        return `${leadBoundary}${t}`;
      }
      return match;
    });
  }

  function setCache(raw, translated) {
    TRANSLATION_CACHE.set(raw, translated);
    if (TRANSLATION_CACHE.size > TRANSLATION_CACHE_MAX_SIZE) {
      TRANSLATION_CACHE.clear();
    }
  }

  function shouldSkipElement(el) {
    if (!el) return true;
    if (SKIP_TAGS.has(el.tagName)) return true;

    // Avoid touching editable/user content areas.
    if (
      el.closest('input, textarea, [contenteditable=""], [contenteditable="true"], [role="textbox"], [data-lexical-editor]')
    ) {
      return true;
    }

    return false;
  }

  function translateText(raw) {
    if (!raw || !/[A-Za-z]/.test(raw)) return raw;

    const cached = TRANSLATION_CACHE.get(raw);
    if (cached !== undefined) {
      STATS.cacheHits += 1;
      return cached;
    }

    const { lead, core, tail } = splitPadding(raw);
    if (!core) {
      setCache(raw, raw);
      return raw;
    }

    // Exact/canonical match first to reduce accidental replacements.
    const direct = lookupTranslation(core);
    if (direct && direct !== core) {
      STATS.exactHits += 1;
      const out = `${lead}${direct}${tail}`;
      setCache(raw, out);
      return out;
    }

    // Labels often appear as "Name:" / "Size:".
    const { base, suffix } = splitTrailingPunctuation(core);
    if (suffix) {
      const punctuated = lookupTranslation(base);
      if (punctuated && punctuated !== base) {
        STATS.exactHits += 1;
        const out = `${lead}${punctuated}${suffix}${tail}`;
        setCache(raw, out);
        return out;
      }
    }

    const dynamic = applyDynamicRules(core);
    if (dynamic && dynamic !== core) {
      const out = `${lead}${dynamic}${tail}`;
      setCache(raw, out);
      return out;
    }

    const replacedCore = applyPhraseReplacement(core);
    const out = `${lead}${replacedCore}${tail}`;
    setCache(raw, out);

    return out;
  }

  function translateAttributes(el) {
    for (const attr of ATTRS_TO_TRANSLATE) {
      const value = el.getAttribute(attr);
      if (!value) continue;
      const translated = translateText(value);
      if (translated !== value) {
        el.setAttribute(attr, translated);
        STATS.attrHits += 1;
      }
    }
  }

  function translateTextNode(node) {
    const parent = node.parentElement;
    if (!parent || shouldSkipElement(parent)) return;

    const raw = node.nodeValue;
    const translated = translateText(raw);
    if (translated !== raw) {
      node.nodeValue = translated;
    }
  }

  function scanSubtree(root) {
    if (!root) return;

    if (root.nodeType === Node.ELEMENT_NODE) {
      const rootEl = root;
      if (shouldSkipElement(rootEl)) return;
      translateAttributes(rootEl);

      const allEls = rootEl.querySelectorAll('*');
      for (const el of allEls) {
        if (shouldSkipElement(el)) continue;
        translateAttributes(el);
      }
    }

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let textNode;
    while ((textNode = walker.nextNode())) {
      STATS.nodeScans += 1;
      translateTextNode(textNode);
    }
  }

  let scheduled = false;
  const queue = new Set();

  function flushQueue() {
    scheduled = false;
    for (const node of queue) {
      try {
        scanSubtree(node);
      } catch (err) {
        if (DEBUG) {
          console.warn('[Figma-ZH] scan failed:', err);
        }
      }
    }
    queue.clear();
  }

  function scheduleScan(node) {
    queue.add(node || document.body);
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(flushQueue);
  }

  function startObserver() {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          for (const addedNode of mutation.addedNodes) {
            scheduleScan(addedNode);
          }
        } else if (mutation.type === 'attributes') {
          scheduleScan(mutation.target);
        } else if (mutation.type === 'characterData') {
          scheduleScan(mutation.target.parentElement || document.body);
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
      attributeFilter: ATTRS_TO_TRANSLATE
    });
  }

  function boot() {
    if (!document.body) {
      window.requestAnimationFrame(boot);
      return;
    }

    scanSubtree(document.body);
    startObserver();

    if (DEBUG) {
      setInterval(() => {
        console.log('[Figma-ZH] stats:', { ...STATS });
      }, 5000);
    }
  }

  boot();
})();
