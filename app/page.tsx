"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";

type ProjectGroup = "横屏商业广告" | "竖屏抖音爆款" | "自媒体资讯内容" | "漫剧作品" | "商业详情" | "品牌全案" | "平面设计";
type MediaType = "video" | "image" | "pages";
type CoverFormat = "landscape" | "portrait" | "vertical";

type Project = {
  id: string;
  index: string;
  title: string;
  english: string;
  listingTitle?: string;
  listingEnglish?: string;
  coverLabel: string;
  category: string;
  group: ProjectGroup;
  year: string;
  cover: string;
  coverFormat: CoverFormat;
  media: MediaType;
  source?: string;
  pagePrefix?: string;
  pageCount?: number;
  featured?: boolean;
  long?: boolean;
  portrait?: boolean;
  position?: string;
  summary: string;
  role: string;
  deliverable: string;
};

type WorkflowStep = {
  number: string;
  phase: string;
  title: string;
  detail: string;
  outputs: string[];
};

type Workflow = {
  id: string;
  number: string;
  title: string;
  english: string;
  eyebrow: string;
  intro: string;
  result: string;
  steps: WorkflowStep[];
  caseIds: string[];
  featuredCaseId?: string;
};

const portfolioMediaCdn = "https://hqlf123.github.io/ai-creative-portfolio/assets/";
const asset = (filename: string) => filename.endsWith(".mp4")
  ? `${portfolioMediaCdn}${filename}`
  : `${import.meta.env.BASE_URL}assets/${filename}`;

const projects: Project[] = [
  {
    id: "headphones",
    index: "01",
    title: "声场之外",
    english: "HEADPHONE COMMERCIAL FILM",
    listingTitle: "高端头戴耳机产品广告",
    listingEnglish: "PREMIUM HEADPHONE PRODUCT FILM",
    coverLabel: "PRODUCT FILM",
    category: "AI 动态影像 / 产品广告",
    group: "横屏商业广告",
    year: "2026",
    cover: asset("hero-headphones-poster.jpg"),
    coverFormat: "landscape",
    media: "video",
    source: asset("hero-headphones.mp4"),
    featured: true,
    summary: "以微距材质、精密结构与低照度氛围，建立高端头戴耳机的科技感与听觉想象。",
    role: "创意概念 · AI 视觉 · 动态剪辑",
    deliverable: "16 秒品牌广告片",
  },
  {
    id: "mecha",
    index: "02",
    title: "钢铁人格",
    english: "ORIGINAL MECHA TOY",
    listingTitle: "原创机甲玩具概念广告",
    listingEnglish: "ORIGINAL MECHA TOY CONCEPT FILM",
    coverLabel: "CONCEPT FILM",
    category: "概念设计 / AI 广告",
    group: "横屏商业广告",
    year: "2026",
    cover: asset("mecha-toy-poster.jpg"),
    coverFormat: "landscape",
    media: "video",
    source: asset("mecha-toy.mp4"),
    featured: true,
    summary: "从原创机甲设定到战场叙事，用统一的机械语言完成角色、世界观与产品广告表达。",
    role: "世界观设定 · 视觉开发 · 成片",
    deliverable: "33 秒原创玩具广告",
  },
  {
    id: "shishanju-film",
    index: "03",
    title: "住进秋天",
    english: "SHISHANJU RETREAT FILM",
    listingTitle: "柿山居民宿品牌形象片",
    listingEnglish: "SHISHANJU HOMESTAY BRAND FILM",
    coverLabel: "BRAND FILM",
    category: "空间叙事 / 民宿广告",
    group: "横屏商业广告",
    year: "2026",
    cover: asset("shishanju-poster.jpg"),
    coverFormat: "landscape",
    media: "video",
    source: asset("shishanju.mp4"),
    featured: true,
    summary: "以克制、温暖的东方生活感组织空间镜头，让一座民宿从建筑变成可被向往的旅居体验。",
    role: "视觉提案 · 场景生成 · 影片制作",
    deliverable: "23 秒品牌形象片",
  },
  {
    id: "phone-detail",
    index: "04",
    title: "未来影像",
    english: "VITARA X1 PRO",
    listingTitle: "VITARA X1 Pro 旗舰手机详情",
    listingEnglish: "FLAGSHIP SMARTPHONE PRODUCT DETAIL",
    coverLabel: "E-COMMERCE DETAIL",
    category: "电商视觉 / 手机详情页",
    group: "商业详情",
    year: "2026",
    cover: asset("phone-v2-hero.png"),
    coverFormat: "landscape",
    media: "image",
    featured: true,
    position: "center top",
    summary: "围绕影像、性能与旗舰工艺重组信息层级，建立从首屏冲击到参数说服的完整电商叙事。",
    role: "视觉策略 · 页面设计 · AI 制图",
    deliverable: "完整手机产品详情页",
  },
  {
    id: "dumpling-ip",
    index: "05",
    title: "饺个朋友",
    english: "BRAND IP SYSTEM",
    listingTitle: "饺个朋友品牌 IP 全案",
    listingEnglish: "DUMPLING BRAND IP SYSTEM",
    coverLabel: "BRAND IP SYSTEM",
    category: "品牌设计 / IP 全案",
    group: "品牌全案",
    year: "2024",
    cover: asset("dumpling-ip-cover.webp"),
    coverFormat: "landscape",
    media: "pages",
    pagePrefix: "dumpling-ip",
    pageCount: 17,
    featured: true,
    summary: "把亲切的社交语义转化成可识别、可延展的饺子 IP，覆盖品牌策略、角色、语言与传播应用。",
    role: "品牌策略 · IP 设计 · 应用延展",
    deliverable: "17 页品牌全案",
  },
  {
    id: "magazine-cover",
    index: "06",
    title: "事事如意",
    english: "EDITORIAL COVER STUDY",
    listingTitle: "事事如意东方杂志封面",
    listingEnglish: "ORIENTAL EDITORIAL COVER DESIGN",
    coverLabel: "EDITORIAL DESIGN",
    category: "平面设计 / 杂志封面",
    group: "平面设计",
    year: "2026",
    cover: asset("magazine-cover.webp"),
    coverFormat: "portrait",
    media: "image",
    featured: true,
    long: true,
    position: "center 18%",
    summary: "以复古雕版、东方祝愿与当代版式构成高密度视觉封面，探索传统意象的现代转译。",
    role: "艺术指导 · 版式设计 · AI 插画",
    deliverable: "完整杂志封面设计",
  },
  {
    id: "coldx-detail",
    index: "07",
    title: "冷萃工坊",
    english: "COLD-X PRODUCT DETAIL",
    listingTitle: "Cold-X 冷萃咖啡机详情",
    listingEnglish: "COLD BREW COFFEE MAKER PRODUCT DETAIL",
    coverLabel: "E-COMMERCE DETAIL",
    category: "电商视觉 / 产品详情页",
    group: "商业详情",
    year: "2026",
    cover: asset("coldx-cover.webp"),
    coverFormat: "portrait",
    media: "pages",
    pagePrefix: "coldx",
    pageCount: 11,
    summary: "围绕快速冷萃、大容量、易清洁和智能操作建立完整卖点链路，形成清晰的家电详情页节奏。",
    role: "信息梳理 · AI 制图 · 页面设计",
    deliverable: "11 页完整产品详情",
  },
  {
    id: "mouse-detail",
    index: "08",
    title: "灵动掌控",
    english: "AURORA M7 DETAIL PAGE",
    listingTitle: "AURORA M7 无线鼠标详情",
    listingEnglish: "WIRELESS MOUSE PRODUCT DETAIL",
    coverLabel: "E-COMMERCE DETAIL",
    category: "电商视觉 / 鼠标详情页",
    group: "商业详情",
    year: "2026",
    cover: asset("mouse-detail.webp"),
    coverFormat: "portrait",
    media: "image",
    long: true,
    position: "center top",
    summary: "从传感器性能、连接方式到握持体验与使用场景，完成一条兼顾科技感和购买说服的页面叙事。",
    role: "卖点规划 · 页面设计 · 产品视觉",
    deliverable: "完整鼠标产品详情页",
  },
  {
    id: "shishanju-visual",
    index: "09",
    title: "柿山居",
    english: "HOMESTAY VISUAL PROPOSAL",
    listingTitle: "柿山居民宿视觉提案",
    listingEnglish: "SHISHANJU HOMESTAY VISUAL PROPOSAL",
    coverLabel: "VISUAL PROPOSAL",
    category: "品牌视觉 / 空间提案",
    group: "商业详情",
    year: "2026",
    cover: asset("homestay-visual.webp"),
    coverFormat: "portrait",
    media: "image",
    long: true,
    position: "center top",
    summary: "以居、憩、栖、浴、庭、食、途、望、读、归十个空间切片，构建温润安静的民宿视觉语言。",
    role: "视觉概念 · 场景设计 · 提案编排",
    deliverable: "完整民宿视觉提案长图",
  },
  {
    id: "book-cover",
    index: "10",
    title: "澄心",
    english: "BOOK COVER DESIGN",
    listingTitle: "澄心东方书籍封面",
    listingEnglish: "ORIENTAL BOOK COVER DESIGN",
    coverLabel: "BOOK DESIGN",
    category: "平面设计 / 书籍封面",
    group: "平面设计",
    year: "2026",
    cover: asset("book-cover.webp"),
    coverFormat: "landscape",
    media: "image",
    summary: "以墨绿、橙色和静坐人物形成克制的精神气质，让东方内观主题在当代书籍语境中成立。",
    role: "艺术指导 · 插画 · 版式设计",
    deliverable: "完整书籍封面展开图",
  },
  {
    id: "hosiery-film",
    index: "11",
    title: "轻奢触感",
    english: "LEGWEAR COMMERCIAL",
    listingTitle: "轻奢裤袜产品短片",
    listingEnglish: "PREMIUM LEGWEAR PRODUCT FILM",
    coverLabel: "FASHION FILM",
    category: "时尚产品 / 短视频广告",
    group: "横屏商业广告",
    year: "2026",
    cover: asset("hosiery-poster.jpg"),
    coverFormat: "landscape",
    media: "video",
    source: asset("hosiery.mp4"),
    summary: "通过开箱、材质与触感细节建立轻奢氛围，在短时长内完成产品质感表达。",
    role: "创意 · AI 画面 · 剪辑",
    deliverable: "15 秒产品广告",
  },
  {
    id: "game-wholesale",
    index: "12",
    title: "一键升级",
    english: "GAME UA CREATIVE",
    listingTitle: "游戏 UA 竖屏买量广告",
    listingEnglish: "GAME UA VERTICAL PERFORMANCE AD",
    coverLabel: "GAME UA CREATIVE",
    category: "游戏买量 / 效果广告",
    group: "竖屏抖音爆款",
    year: "2026",
    cover: asset("game-wholesale-poster.jpg"),
    coverFormat: "vertical",
    media: "video",
    source: asset("game-wholesale.mp4"),
    portrait: true,
    summary: "以直接冲突、即时反馈和升级爽点组织竖屏买量节奏，让信息在前三秒快速成立。",
    role: "买量创意 · 画面生成 · 剪辑",
    deliverable: "15 秒竖屏买量广告",
  },
  {
    id: "power-bank",
    index: "13",
    title: "随身能量",
    english: "POWER BANK SOCIAL AD",
    listingTitle: "充电宝社交平台竖屏广告",
    listingEnglish: "POWER BANK VERTICAL SOCIAL AD",
    coverLabel: "SOCIAL PRODUCT FILM",
    category: "数码产品 / 社交广告",
    group: "竖屏抖音爆款",
    year: "2026",
    cover: asset("power-bank-poster.jpg"),
    coverFormat: "vertical",
    media: "video",
    source: asset("power-bank.mp4"),
    portrait: true,
    summary: "以生活场景切入便携充电需求，用人物演示快速连接产品功能与真实使用情境。",
    role: "脚本 · AI 人物 · 成片",
    deliverable: "15 秒竖屏产品广告",
  },
  {
    id: "chicken-feet",
    index: "14",
    title: "一口上头",
    english: "SNACK FOOD SHORT AD",
    listingTitle: "零食产品竖屏效果广告",
    listingEnglish: "SNACK FOOD VERTICAL PERFORMANCE AD",
    coverLabel: "FOOD PERFORMANCE AD",
    category: "食品饮料 / 效果广告",
    group: "竖屏抖音爆款",
    year: "2026",
    cover: asset("chicken-feet-poster.jpg"),
    coverFormat: "vertical",
    media: "video",
    source: asset("chicken-feet.mp4"),
    portrait: true,
    summary: "以夸张人物反应、口味提示与产品特写形成高密度节奏，强化零食的即时诱惑。",
    role: "创意脚本 · AI 表演 · 剪辑",
    deliverable: "15 秒竖屏食品广告",
  },
  {
    id: "hanging-sword",
    index: "15",
    title: "悬剑劫",
    english: "WUXIA CINEMATIC",
    listingTitle: "悬剑劫武侠概念长片",
    listingEnglish: "WUXIA CINEMATIC CONCEPT FILM",
    coverLabel: "WUXIA CONCEPT FILM",
    category: "叙事影像 / 武侠概念片",
    group: "漫剧作品",
    year: "2026",
    cover: asset("hanging-sword-cover-selected.jpg"),
    coverFormat: "landscape",
    media: "video",
    source: asset("hanging-sword.mp4"),
    summary: "以荒漠、悬剑与江湖危机建立武侠世界观，完成长时叙事、镜头衔接与氛围统一。",
    role: "世界观 · 分镜 · AI 影片",
    deliverable: "172 秒完整武侠概念片",
  },
  {
    id: "pocket-fighter",
    index: "16",
    title: "口袋小斗",
    english: "POCKET FIGHTER CAMPAIGN",
    listingTitle: "怀旧掌机竖屏产品广告",
    listingEnglish: "RETRO HANDHELD VERTICAL PRODUCT AD",
    coverLabel: "SOCIAL PRODUCT FILM",
    category: "怀旧数码 / 产品广告",
    group: "竖屏抖音爆款",
    year: "2026",
    cover: asset("pocket-fighter-poster.jpg"),
    coverFormat: "vertical",
    media: "video",
    source: asset("pocket-fighter.mp4"),
    portrait: true,
    summary: "以真人口播与掌机演示连接怀旧情绪和即玩卖点，形成轻快、直接的社交平台表达。",
    role: "脚本 · AI 人物 · 产品呈现",
    deliverable: "17 秒竖屏产品广告",
  },
  {
    id: "wilderness-journey",
    index: "17",
    title: "风野牧旅",
    english: "WILDERNESS JOURNEY",
    listingTitle: "旷野文旅氛围短片",
    listingEnglish: "WILDERNESS TRAVEL MOOD FILM",
    coverLabel: "TRAVEL MOOD FILM",
    category: "文旅影像 / 人群适配",
    group: "横屏商业广告",
    year: "2026",
    cover: asset("wilderness-journey-poster.jpg"),
    coverFormat: "landscape",
    media: "video",
    source: asset("wilderness-journey.mp4"),
    summary: "以第一视角自然行走和舒缓节奏适配中年受众，传递远离喧嚣、回到旷野的旅行感受。",
    role: "受众适配 · 画面设计 · 成片",
    deliverable: "53 秒横屏文旅影像",
  },
  {
    id: "warm-grandma",
    index: "18",
    title: "奶奶的小故事",
    english: "A WARM GRANDMA STORY",
    listingTitle: "温情家庭竖屏叙事短片",
    listingEnglish: "WARM FAMILY VERTICAL STORY FILM",
    coverLabel: "VERTICAL STORY FILM",
    category: "情感叙事 / 抖音短片",
    group: "竖屏抖音爆款",
    year: "2026",
    cover: asset("warm-grandma-poster.jpg"),
    coverFormat: "vertical",
    media: "video",
    source: asset("warm-grandma.mp4"),
    portrait: true,
    summary: "以温馨家庭叙事与生活细节承载情绪，在短视频语境里完成有起伏、有落点的小故事。",
    role: "故事脚本 · AI 人物 · 剪辑",
    deliverable: "38 秒竖屏情感短片",
  },
  {
    id: "ai-news",
    index: "19",
    title: "AI 时代观察",
    english: "AI NEWS EDITORIAL",
    listingTitle: "AI 时代自媒体资讯视频",
    listingEnglish: "AI NEWS SELF-MEDIA EDITORIAL",
    coverLabel: "EDITORIAL CONTENT",
    category: "资讯内容 / 自媒体视频",
    group: "自媒体资讯内容",
    year: "2026",
    cover: asset("ai-news-poster.jpg"),
    coverFormat: "landscape",
    media: "video",
    source: asset("ai-news.mp4"),
    summary: "以报刊拼贴、资料画面和信息字幕构成新闻语法，提升复杂议题的观看节奏与可信感。",
    role: "内容包装 · 视觉素材 · 后期",
    deliverable: "82 秒资讯成片",
  },
  {
    id: "fantasy-arena",
    index: "20",
    title: "虚幻竞技场",
    english: "FANTASY ARENA",
    listingTitle: "虚幻竞技场游戏概念长片",
    listingEnglish: "FANTASY ARENA CINEMATIC CONCEPT FILM",
    coverLabel: "CINEMATIC CONCEPT",
    category: "概念影像 / 游戏世界观",
    group: "漫剧作品",
    year: "2026",
    cover: asset("fantasy-arena-cover-selected.jpg"),
    coverFormat: "landscape",
    media: "video",
    source: asset("fantasy-arena.mp4"),
    summary: "围绕废土竞技与机械生命建立高强度视觉世界，通过长时镜头组织强化电影化沉浸感。",
    role: "概念设定 · AI 视觉 · 长片剪辑",
    deliverable: "110 秒完整概念片",
  },
  {
    id: "green-soda",
    index: "21",
    title: "青提气泡",
    english: "GREEN GRAPE SODA",
    listingTitle: "青提气泡饮料产品广告",
    listingEnglish: "GREEN GRAPE SODA PRODUCT FILM",
    coverLabel: "BEVERAGE PRODUCT FILM",
    category: "食品饮料 / 产品广告",
    group: "横屏商业广告",
    year: "2026",
    cover: asset("green-soda-poster.jpg"),
    coverFormat: "landscape",
    media: "video",
    source: asset("green-soda.mp4"),
    summary: "用水汽、青提与罐身特写建立清爽口感，将色彩和声音节奏集中在一支短时产品片中。",
    role: "产品视觉 · AI 生成 · 剪辑",
    deliverable: "13 秒饮料广告",
  },
  {
    id: "dumpling-film",
    index: "22",
    title: "饺个朋友品牌片",
    english: "DUMPLING BRAND FILM",
    listingTitle: "饺个朋友品牌 IP 动态短片",
    listingEnglish: "DUMPLING BRAND IP FILM",
    coverLabel: "BRAND IP FILM",
    category: "品牌 IP / 动态广告",
    group: "横屏商业广告",
    year: "2024",
    cover: asset("dumpling-brand-poster.jpg"),
    coverFormat: "landscape",
    media: "video",
    source: asset("dumpling-brand.mp4"),
    summary: "让品牌 IP 从静态设定进入真实产品与餐饮场景，完成角色亲和力和品牌记忆的动态延展。",
    role: "IP 动态化 · 场景生成 · 成片",
    deliverable: "17 秒品牌广告",
  },
];

const strengths = [
  { number: "01", title: "AI 编导全流程", english: "AI CREATIVE DIRECTION", copy: "从需求拆解、脚本与分镜，到角色、场景、镜头调度和节奏剪辑，让每一次生成都服从明确的导演意图。", tags: ["SCRIPT", "STORYBOARD", "VIDEO GEN", "EDIT"] },
  { number: "02", title: "商业视觉落地", english: "COMMERCIAL CRAFT", copy: "围绕卖点、信息层级与转化目标，完成电商详情、品牌 IP、主视觉与动态延展。", tags: ["E-COMMERCE", "CAMPAIGN", "KEY VISUAL"] },
  { number: "03", title: "AIGC 制作交付", english: "AIGC PRODUCTION", copy: "覆盖提示词、角色与场景一致性、生图与视频生成、声音、调色、审片及多平台版本交付。", tags: ["IMAGE GEN", "VIDEO GEN", "SOUND", "QC"] },
  { number: "04", title: "内容策划传播", english: "CONTENT & MEDIA", copy: "把媒体编辑、新闻写作与短视频运营经验转化为清晰、有叙事力、能被传播的视觉内容。", tags: ["EDITORIAL", "COPY", "SOCIAL", "OPERATION"] },
];

const workflows: Workflow[] = [
  {
    id: "direction",
    number: "01",
    title: "AI 编导全流程",
    english: "AI CREATIVE DIRECTION",
    eyebrow: "FROM BRIEF TO FINAL CUT",
    intro: "把模糊需求拆成一条可执行的导演路径：先确定受众、卖点与情绪，再用脚本、分镜和镜头节奏约束每一次生成，最终形成完整成片。",
    result: "让生成不再是随机试图，而是围绕同一导演意图逐镜推进。",
    steps: [
      { number: "01", phase: "BRIEF", title: "需求与目标拆解", detail: "确认受众、传播场景、核心卖点、片长比例与最终行动，让创意从业务问题出发。", outputs: ["需求清单", "受众画像", "交付规格"] },
      { number: "02", phase: "SCRIPT", title: "概念与脚本结构", detail: "提炼一句话创意，设计开场钩子、情绪转折和结尾记忆点，形成可拍摄的节奏段落。", outputs: ["创意主张", "脚本", "节奏表"] },
      { number: "03", phase: "STORYBOARD", title: "分镜与镜头设计", detail: "逐镜确定景别、机位、运镜、时长与转场，提前验证叙事是否清晰、镜头是否可生成。", outputs: ["分镜表", "镜头清单", "运镜说明"] },
      { number: "04", phase: "VISUAL", title: "角色与场景定调", detail: "建立角色、道具、环境和光影基准，用关键帧锁定世界观及视觉一致性。", outputs: ["风格板", "角色设定", "关键帧"] },
      { number: "05", phase: "MOTION", title: "逐镜生成与调度", detail: "按镜头测试动作、镜头运动和首尾帧衔接，筛选可用素材并修正连续性。", outputs: ["动态镜头", "备选版本", "连续性检查"] },
      { number: "06", phase: "FINAL CUT", title: "剪辑、声音与成片", detail: "完成节奏剪辑、音效配乐、字幕、调色与审片，并输出适配不同平台的最终版本。", outputs: ["母版成片", "横竖版", "审片记录"] },
    ],
    caseIds: ["mecha", "shishanju-film", "headphones"],
  },
  {
    id: "commercial",
    number: "02",
    title: "商业视觉落地",
    english: "COMMERCIAL CRAFT",
    eyebrow: "FROM SELLING POINT TO SYSTEM",
    intro: "从产品卖点和转化目标出发，把信息梳理为有先后、有证据、有记忆点的视觉系统，并延展到详情页、品牌 IP、主视觉与动态内容。",
    result: "让好看的画面同时承担说明、说服与品牌识别。",
    steps: [
      { number: "01", phase: "STRATEGY", title: "卖点与人群定位", detail: "区分核心卖点、辅助利益点和信任证据，明确用户为什么停留、为什么相信、为什么行动。", outputs: ["卖点地图", "竞品观察", "沟通优先级"] },
      { number: "02", phase: "STRUCTURE", title: "信息层级规划", detail: "搭建首屏冲击、场景代入、功能解释、细节证明与行动收束的完整浏览路径。", outputs: ["信息架构", "页面线框", "内容清单"] },
      { number: "03", phase: "SYSTEM", title: "视觉语言建立", detail: "确定色彩、字体、构图、材质、光影和图形规范，让多个页面与物料保持同一品牌语气。", outputs: ["视觉方向", "版式规则", "风格规范"] },
      { number: "04", phase: "PRODUCTION", title: "产品与场景制图", detail: "围绕产品特征生成主视觉、功能场景和细节特写，并统一透视、材质和光源逻辑。", outputs: ["主视觉", "产品特写", "场景图"] },
      { number: "05", phase: "EXTENSION", title: "页面与传播延展", detail: "把核心视觉拆解为详情页、海报、社交媒体和动态短片，保证不同触点的识别一致。", outputs: ["详情页", "传播物料", "动态版本"] },
      { number: "06", phase: "REVIEW", title: "商业表达审校", detail: "复核信息准确性、阅读节奏、产品可辨识度和行动引导，完成可直接使用的交付包。", outputs: ["内容审校", "终稿", "交付清单"] },
    ],
    caseIds: ["phone-detail", "dumpling-ip", "shishanju-visual"],
  },
  {
    id: "production",
    number: "03",
    title: "AIGC 制作交付",
    english: "AIGC PRODUCTION",
    eyebrow: "FROM GENERATION TO DELIVERY",
    intro: "把复杂创作拆成可管理的资产与节点：角色、场景、武器、动作、镜头、声音彼此关联，经过一致性控制和多轮审片后汇入最终成片。",
    result: "从单张好图升级为可复用、可追踪、可稳定交付的生产管线。",
    steps: [
      { number: "01", phase: "ASSET MAP", title: "资产拆分与任务建图", detail: "把项目拆为角色、道具、环境、镜头和声音资产，建立依赖关系与版本优先级。", outputs: ["资产表", "节点关系", "版本计划"] },
      { number: "02", phase: "STYLE BIBLE", title: "提示词与视觉基准", detail: "固定世界观、材质、光线、色彩和镜头语言，形成可重复调用的风格基准。", outputs: ["提示词库", "风格圣经", "反向约束"] },
      { number: "03", phase: "CONSISTENCY", title: "角色场景一致性", detail: "通过多视图、参考图与关键特征锁定主体，在不同动作、景别和环境中保持身份稳定。", outputs: ["角色设定", "场景设定", "一致性样片"] },
      { number: "04", phase: "GENERATION", title: "生图与视频节点生成", detail: "按镜头分支生成素材，保留有效迭代和首尾帧关系，逐步汇聚到可剪辑镜头。", outputs: ["图像节点", "视频节点", "镜头备选"] },
      { number: "05", phase: "POST", title: "剪辑、声音与调色", detail: "统一镜头节奏、空间声场、画面色调与特效强度，让不同模型的输出成为同一支作品。", outputs: ["精剪", "声音设计", "调色版"] },
      { number: "06", phase: "QC", title: "审片与多平台交付", detail: "检查穿帮、字幕、安全区、码率和平台比例，保留母版并输出可直接发布的版本。", outputs: ["QC 清单", "母版", "平台版本"] },
    ],
    caseIds: ["fantasy-arena", "hanging-sword"],
    featuredCaseId: "fantasy-arena",
  },
  {
    id: "content",
    number: "04",
    title: "内容策划传播",
    english: "CONTENT & MEDIA",
    eyebrow: "FROM TOPIC TO DISTRIBUTION",
    intro: "把媒体编辑、新闻写作和短视频运营经验转成一套内容生产方法：先找到值得传播的角度，再设计钩子、叙事、包装和发布版本。",
    result: "让内容既讲清楚，也更容易被看见、被理解和被转发。",
    steps: [
      { number: "01", phase: "INSIGHT", title: "选题与受众洞察", detail: "判断信息价值、情绪价值与目标人群，找到适合当前平台的内容切口。", outputs: ["选题池", "受众判断", "传播角度"] },
      { number: "02", phase: "HOOK", title: "标题与开场钩子", detail: "用矛盾、结果、利益或情绪建立前几秒注意力，同时避免标题与内容脱节。", outputs: ["标题组", "前三秒", "封面文案"] },
      { number: "03", phase: "STORY", title: "脚本与信息节奏", detail: "把事实、观点和情绪组织成清晰段落，用画面变化持续承接信息。", outputs: ["口播稿", "画面脚本", "节奏节点"] },
      { number: "04", phase: "FORMAT", title: "视觉包装与制作", detail: "根据资讯、故事、种草或买量目标选择画幅、字幕、配音、音乐和画面风格。", outputs: ["视觉模板", "配音字幕", "成片"] },
      { number: "05", phase: "PUBLISH", title: "平台适配与发布包", detail: "针对不同渠道调整时长、标题、封面、安全区和行动引导，形成可直接发布的素材包。", outputs: ["横竖版本", "标题封面", "发布文案"] },
      { number: "06", phase: "ITERATE", title: "反馈复盘与迭代", detail: "根据完播、停留、互动和转化信号复盘内容结构，沉淀下一轮可复用方法。", outputs: ["复盘记录", "优化假设", "模板沉淀"] },
    ],
    caseIds: ["ai-news", "warm-grandma", "game-wholesale"],
  },
];

const filters: ProjectGroup[] = ["横屏商业广告", "竖屏抖音爆款", "自媒体资讯内容", "漫剧作品", "商业详情", "品牌全案", "平面设计"];

const readSessionValue = (key: string) => {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
};

const writeSessionValue = (key: string, value: string) => {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // Browsing still works when storage is unavailable or blocked.
  }
};

const removeSessionValue = (key: string) => {
  try {
    window.sessionStorage.removeItem(key);
  } catch {
    // Browsing still works when storage is unavailable or blocked.
  }
};

const rememberPortfolioPosition = () => {
  writeSessionValue("portfolio:return-y", String(window.scrollY));
};

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function AvatarIdentity() {
  return (
    <span className="avatar-identity">
      <span className="avatar-thumb" aria-hidden="true">
        <img src={asset("luo-tianxiang-art-avatar.png")} alt="" />
      </span>
      <span className="avatar-copy">
        <b>LUO TIANXIANG</b>
        <small>AIGC VISUAL</small>
      </span>
    </span>
  );
}

function coverFormatLabel(format: CoverFormat) {
  if (format === "vertical") return "9:16 VERTICAL";
  if (format === "portrait") return "PORTRAIT";
  return "16:9 LANDSCAPE";
}

function coverPreviewLabel(project: Project, previewing: boolean) {
  if (!previewing) return `HOVER PREVIEW · ${coverFormatLabel(project.coverFormat)}`;
  if (project.media === "video") return "LIVE PREVIEW · MUTED";
  if (project.media === "pages") return "PAGE PREVIEW · OPEN CASE";
  return "DETAIL PREVIEW · OPEN CASE";
}

function coverTypeLabel(project: Project) {
  return project.coverLabel;
}

function CoverIdentity({ project }: { project: Project }) {
  return (
    <span className="cover-identity" aria-hidden="true">
      <span className="cover-kicker"><i>{coverTypeLabel(project)}</i><b>{project.year}</b></span>
      <strong>{project.title}</strong>
      <em>{project.english}</em>
      <small>{project.category}</small>
    </span>
  );
}

function useCoverPreview(project: Project) {
  const [previewing, setPreviewing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || project.media !== "video") return;

    if (previewing) {
      const playback = video.play();
      playback?.catch(() => undefined);
      return;
    }

    video.pause();
    video.currentTime = 0;
  }, [previewing, project.media]);

  const startPreview = () => setPreviewing(true);
  const stopPreview = () => setPreviewing(false);
  const continuePlayback = () => {
    if (!previewing || !videoRef.current) return;
    videoRef.current.play().catch(() => undefined);
  };

  return {
    previewing,
    videoRef,
    continuePlayback,
    previewEvents: {
      onMouseEnter: startPreview,
      onMouseLeave: stopPreview,
      onFocus: startPreview,
      onBlur: stopPreview,
    },
  };
}

function CoverArtwork({
  project,
  previewing,
  videoRef,
  onCanPlay,
}: {
  project: Project;
  previewing: boolean;
  videoRef: RefObject<HTMLVideoElement | null>;
  onCanPlay: () => void;
}) {
  const pagePreview = project.pagePrefix && (project.pageCount ?? 0) > 1
    ? asset(`case-pages/${project.pagePrefix}-02.webp`)
    : undefined;
  const secondaryPreview = project.id === "phone-detail" ? asset("phone-v2-camera.png") : pagePreview;

  return (
    <>
      <img
        className="media-artwork"
        src={project.cover}
        alt={`${project.title}项目封面`}
        style={{ objectPosition: project.position }}
        loading="lazy"
        decoding="async"
      />
      {secondaryPreview && (
        <img className="media-secondary-artwork" src={secondaryPreview} alt="" aria-hidden="true" loading="lazy" decoding="async" />
      )}
      {project.media === "video" && project.source && (
        <video
          ref={videoRef}
          className="media-video-preview"
          src={previewing ? project.source : undefined}
          poster={project.cover}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          onCanPlay={onCanPlay}
        />
      )}
      <span className="media-preview-shade" aria-hidden="true" />
    </>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const preview = useCoverPreview(project);
  return (
    <article className={`project-card project-${project.id} cover-${project.coverFormat} ${project.id === "headphones" ? "is-wide" : ""}`}>
      <a
        className={`project-media media-stage cover-${project.coverFormat} media-${project.media} ${project.long ? "is-long-artwork" : ""} ${preview.previewing ? "is-previewing" : ""}`}
        href={`#case/${project.id}`}
        onClick={rememberPortfolioPosition}
        aria-label={`预览并查看完整项目：${project.title}`}
        {...preview.previewEvents}
      >
        <CoverArtwork project={project} previewing={preview.previewing} videoRef={preview.videoRef} onCanPlay={preview.continuePlayback} />
        <CoverIdentity project={project} />
        <span className="media-frame-note" aria-hidden="true">{coverPreviewLabel(project, preview.previewing)}</span>
        <span className="project-index">CASE / {project.index}</span>
        <span className="open-project">VIEW COMPLETE CASE <Arrow /></span>
      </a>
      <div className="project-meta">
        <div><h3>{project.listingTitle ?? project.title}</h3><p>{project.listingEnglish ?? project.english}</p></div>
        <div><span>{project.category}</span><time>{project.year}</time></div>
      </div>
    </article>
  );
}

function ArchiveCard({ project }: { project: Project }) {
  const preview = useCoverPreview(project);
  return (
    <article className={`archive-card archive-${project.id} cover-${project.coverFormat}`}>
      <a
        className={`archive-media media-stage cover-${project.coverFormat} media-${project.media} ${project.long ? "is-long-artwork" : ""} ${preview.previewing ? "is-previewing" : ""}`}
        href={`#case/${project.id}`}
        onClick={rememberPortfolioPosition}
        aria-label={`预览并打开完整项目：${project.title}`}
        {...preview.previewEvents}
      >
        <CoverArtwork project={project} previewing={preview.previewing} videoRef={preview.videoRef} onCanPlay={preview.continuePlayback} />
        <CoverIdentity project={project} />
        <span className="media-frame-note" aria-hidden="true">{coverPreviewLabel(project, preview.previewing)}</span>
        <span className="archive-number">{project.index}</span>
        <span className="archive-arrow"><Arrow /></span>
      </a>
      <div className="archive-meta">
        <div><h3>{project.listingTitle ?? project.title}</h3><p>{project.listingEnglish ?? project.english}</p></div>
        <span>{project.group}</span>
      </div>
    </article>
  );
}

function PhoneDetailPage() {
  const heroSpecs = [
    ["2K 144Hz", "超视网膜屏"],
    ["200MP", "超感光主摄"],
    ["5400mAh", "超长续航"],
    ["IP68", "防尘防水"],
    ["3D Sonic", "超声波指纹"],
    ["Ice Blue", "冰川蓝配色"],
  ];
  const performance = [["30%", "CPU 性能提升"], ["25%", "GPU 性能提升"], ["20%", "能效提升"]];
  const lenses = [["200MP", "超感光主摄"], ["50MP", "超广角镜头"], ["64MP", "潜望长焦"], ["TOF", "激光对焦"]];

  return (
    <div className="phone-v2" aria-label="VITARA X1 Pro 高清产品详情页">
      <section className="phone-v2-visual phone-v2-hero-visual">
        <img src={asset("phone-v2-hero.png")} alt="VITARA X1 Pro 深空旗舰手机完整主视觉" />
        <div className="phone-v2-copy phone-v2-copy-left">
          <p className="phone-v2-kicker">VITARA X1 Pro · FLAGSHIP IMAGING</p>
          <h2 className="motion-title">未来影像<br /><span>旗舰新境</span></h2>
          <p>探索科技美学新高度</p>
        </div>
      </section>

      <section className="phone-v2-specs" aria-label="核心卖点">
        {heroSpecs.map(([value, label]) => <div key={value}><strong>{value}</strong><span>{label}</span></div>)}
      </section>

      <section className="phone-v2-split">
        <article className="phone-v2-panel phone-v2-light-panel">
          <p className="phone-v2-kicker">SLIM FLAGSHIP</p>
          <h3>轻薄旗舰<br />手感新生</h3>
          <div className="phone-v2-numbers"><div><strong>7.98</strong><span>mm 机身厚度</span></div><div><strong>196</strong><span>g 轻盈重量</span></div></div>
        </article>
        <article className="phone-v2-panel">
          <p className="phone-v2-kicker">PRECISE CRAFT</p>
          <h3>旗舰工艺<br />精致细节</h3>
          <ul><li>钛金属中框 · 坚固轻盈</li><li>微弧面玻璃 · 光滑无界</li><li>丝绒 AG 玻璃 · 不沾指纹</li></ul>
        </article>
      </section>

      <section className="phone-v2-visual phone-v2-performance">
        <img src={asset("phone-v2-performance.png")} alt="VITARA X1 Pro 芯片与散热系统完整分解视觉" loading="lazy" />
        <div className="phone-v2-copy phone-v2-copy-left">
          <p className="phone-v2-kicker">SNAPDRAGON 8 GEN 3</p>
          <h3>巅峰性能<br /><span>冷静制胜</span></h3>
          <p>全新冰封散热系统，持续释放旗舰性能</p>
          <div className="phone-v2-metrics">{performance.map(([value, label]) => <div key={value}><strong>{value}</strong><span>{label}</span></div>)}</div>
        </div>
      </section>

      <section className="phone-v2-system-grid">
        <article><p className="phone-v2-kicker">MEMORY & STORAGE</p><h3>LPDDR5X + UFS 4.0</h3><strong>至高 16GB + 1TB</strong></article>
        <article><p className="phone-v2-kicker">PERFORMANCE CONTROL</p><h3>性能调度，自由掌控</h3><div className="phone-v2-modes"><span>X-Mode<small>性能模式</small></span><span>Balance<small>均衡模式</small></span><span>Eco<small>节能模式</small></span></div></article>
      </section>

      <section className="phone-v2-visual phone-v2-camera">
        <img src={asset("phone-v2-camera.png")} alt="VITARA X1 Pro 高清影像系统完整视觉" loading="lazy" />
        <div className="phone-v2-copy phone-v2-copy-left">
          <p className="phone-v2-kicker">ULTRA IMAGING SYSTEM</p>
          <h3>2 亿超感光<br /><span>影像系统</span></h3>
          <div className="phone-v2-lenses">{lenses.map(([value, label]) => <div key={value}><strong>{value}</strong><span>{label}</span></div>)}</div>
        </div>
      </section>

      <section className="phone-v2-feature-grid">
        <article><p className="phone-v2-kicker">DISPLAY</p><h3>2K · 144Hz</h3><p>6.78 英寸超视网膜屏</p><div><strong>3000nit</strong><span>峰值亮度</span></div></article>
        <article><p className="phone-v2-kicker">POWER</p><h3>5400mAh</h3><p>全天候超长续航</p><div className="phone-v2-charge"><span><strong>45W</strong>有线快充</span><span><strong>40W</strong>无线快充</span><span><strong>10W</strong>反向充电</span></div></article>
        <article><p className="phone-v2-kicker">ORIGINOS 4</p><h3>智慧体验<br />流畅高效</h3><p>智能侧边栏 · 原子通知 · 跨设备互联</p></article>
        <article><p className="phone-v2-kicker">PRIVACY</p><h3>多重隐私保护</h3><p>应用加密 · 隐私替身 · 权限管理 · 安全芯片</p></article>
      </section>

      <section className="phone-v2-visual phone-v2-durability">
        <img src={asset("phone-v2-durability.png")} alt="VITARA X1 Pro 防水与四色机身完整视觉" loading="lazy" />
        <div className="phone-v2-copy phone-v2-copy-left">
          <p className="phone-v2-kicker">FLAGSHIP QUALITY</p>
          <h3>旗舰品质<br /><span>坚固可靠</span></h3>
          <div className="phone-v2-cert"><span><strong>IP68</strong>防尘防水</span><span><strong>SGS</strong>整机可靠性认证</span><span><strong>TÜV</strong>低蓝光认证</span></div>
        </div>
      </section>

      <section className="phone-v2-footer-grid">
        <article><p className="phone-v2-kicker">PRODUCT SPECIFICATIONS</p><h3>产品参数</h3><dl><div><dt>产品名称</dt><dd>VITARA X1 Pro</dd></div><div><dt>机身尺寸</dt><dd>163.1 × 75.8 × 7.98 mm</dd></div><div><dt>机身重量</dt><dd>196g</dd></div><div><dt>处理器</dt><dd>Snapdragon 8 Gen 3</dd></div><div><dt>存储组合</dt><dd>12GB+256GB / 16GB+512GB / 16GB+1TB</dd></div><div><dt>电池容量</dt><dd>5400mAh</dd></div><div><dt>系统</dt><dd>OriginOS 4</dd></div></dl></article>
        <article><p className="phone-v2-kicker">IN THE BOX</p><h3>包装清单</h3><p>手机主机 · 充电器 · 数据线 · SIM 卡针 · 保护壳 · 说明书</p><div className="phone-v2-colors"><span>曜石黑</span><span>星河银</span><span>冰川蓝</span><span>极光金</span></div></article>
      </section>
    </div>
  );
}

function WorkflowScene({ workflow }: { workflow: Workflow }) {
  const workflowProjects = workflow.caseIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is Project => Boolean(project));

  useEffect(() => {
    document.title = `${workflow.title} — 作品集工作流`;
    window.scrollTo(0, 0);
    return () => {
      document.title = "罗天翔 — AIGC 视觉设计作品集";
    };
  }, [workflow]);

  return (
    <main className={`workflow-scene workflow-${workflow.id}`}>
      <header className="case-header workflow-header">
        <a href={`${import.meta.env.BASE_URL}#strengths`} className="case-back"><b aria-hidden="true">←</b><span>返回四项能力 / WORKFLOW {workflow.number}</span></a>
        <a href={`${import.meta.env.BASE_URL}#top`} className="case-brand" aria-label="返回罗天翔作品集首页"><AvatarIdentity /></a>
        <a href="#workflow-cases">对应案例 <Arrow /></a>
      </header>

      <section className="workflow-hero shell">
        <div className="workflow-hero-index" aria-hidden="true">{workflow.number}</div>
        <div className="workflow-hero-copy">
          <p className="workflow-kicker">{workflow.eyebrow}</p>
          <h1>{workflow.title}</h1>
          <p className="workflow-english">{workflow.english}</p>
          <p className="workflow-intro">{workflow.intro}</p>
          <div className="workflow-result"><span>WORKFLOW OUTCOME</span><strong>{workflow.result}</strong></div>
        </div>
        <div className="workflow-hero-count"><strong>{String(workflow.steps.length).padStart(2, "0")}</strong><span>PRODUCTION<br />STAGES</span></div>
      </section>

      {workflow.featuredCaseId === "fantasy-arena" && (
        <section className="workflow-feature shell" aria-labelledby="featured-workflow-title">
          <div className="workflow-feature-heading">
            <div><span>FEATURED WORKFLOW / REAL PROJECT</span><h2 id="featured-workflow-title">真实节点全景</h2></div>
            <p>用两套真实项目工作流呈现从资产设定到镜头成片的完整生产关系：科幻机甲与东方仙侠，各自保持角色、场景和叙事的一致性。</p>
          </div>
          <div className="workflow-feature-grid">
            <article>
              <div><span>01 / SCI-FI MECHA</span><h3>虚幻竞技场</h3><p>机甲三视图、武器、废墟场景、战斗动作、特效节点与镜头汇流。</p></div>
              <a className="workflow-board" href="#case/fantasy-arena" aria-label="查看虚幻竞技场完整成片">
                <img src={asset("workflows/fantasy-arena-workflow.png")} alt="虚幻竞技场真实 AIGC 制作工作流画布，包含角色、场景、镜头与视频节点" />
                <span><b>10% ZOOM / COMPLETE NODE MAP</b><strong>查看完整成片 <Arrow /></strong></span>
              </a>
            </article>
            <article>
              <div><span>02 / ORIENTAL FANTASY</span><h3>悬剑劫</h3><p>人物多视图、仙剑道具、荒漠天门、剧情分支、火焰特效与成片节点。</p></div>
              <a className="workflow-board" href="#case/hanging-sword" aria-label="查看悬剑劫完整成片">
                <img src={asset("workflows/hanging-sword-workflow.png")} alt="悬剑劫真实 AIGC 制作工作流画布，包含人物、仙剑、场景、剧情与特效节点" />
                <span><b>10% ZOOM / COMPLETE NODE MAP</b><strong>查看完整成片 <Arrow /></strong></span>
              </a>
            </article>
          </div>
        </section>
      )}

      <section className="workflow-process shell" aria-labelledby="workflow-process-title">
        <div className="workflow-section-heading">
          <p>PROCESS / STEP BY STEP</p>
          <h2 id="workflow-process-title">我的工作流程</h2>
        </div>
        <ol className="workflow-steps">
          {workflow.steps.map((step) => (
            <li key={step.number}>
              <div className="workflow-step-number"><span>{step.number}</span><i>{step.phase}</i></div>
              <div className="workflow-step-copy"><h3>{step.title}</h3><p>{step.detail}</p></div>
              <div className="workflow-step-outputs">{step.outputs.map((output) => <span key={output}>{output}</span>)}</div>
            </li>
          ))}
        </ol>
      </section>

      <section className="workflow-cases shell" id="workflow-cases" aria-labelledby="workflow-cases-title">
        <div className="workflow-section-heading">
          <p>PROOF / SELECTED CASES</p>
          <h2 id="workflow-cases-title">对应作品案例</h2>
        </div>
        <div className={`workflow-case-grid ${workflowProjects.length === 2 ? "is-two" : ""}`}>
          {workflowProjects.map((project) => (
            <a className="workflow-case-card" href={`#case/${project.id}`} key={project.id}>
              <div className="workflow-case-media"><img src={project.cover} alt={`${project.listingTitle ?? project.title}项目封面`} /><span>{project.coverLabel}</span></div>
              <div className="workflow-case-copy"><span>CASE / {project.index}</span><h3>{project.listingTitle ?? project.title}</h3><p>{project.listingEnglish ?? project.english}</p><b>查看完整项目 <Arrow /></b></div>
            </a>
          ))}
        </div>
      </section>

      <footer className="workflow-footer shell">
        <a href={`${import.meta.env.BASE_URL}#strengths`}>← 返回四项能力</a>
        <span>{workflow.english} · LUO TIANXIANG</span>
        <a href="mailto:1158190818@qq.com">联系合作 <Arrow /></a>
      </footer>
    </main>
  );
}

function CaseScene({ project }: { project: Project }) {
  const projectIndex = projects.findIndex((item) => item.id === project.id);
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const pages = project.pageCount
    ? Array.from({ length: project.pageCount }, (_, index) => asset(`case-pages/${project.pagePrefix}-${index + 1 < 10 ? "0" : ""}${index + 1}.webp`))
    : [];

  useEffect(() => {
    document.title = `${project.title} — 完整案例`;
    window.scrollTo(0, 0);
    const titles = document.querySelectorAll<HTMLElement>(".motion-title");
    let titleObserver: IntersectionObserver | undefined;

    if ("IntersectionObserver" in window) {
      titleObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-title-visible");
          titleObserver?.unobserve(entry.target);
        });
      }, { rootMargin: "0px 0px -12%", threshold: .18 });
      titles.forEach((title) => titleObserver?.observe(title));
    } else {
      titles.forEach((title) => title.classList.add("is-title-visible"));
    }

    return () => {
      document.title = "罗天翔 — AIGC 视觉设计作品集";
      titleObserver?.disconnect();
    };
  }, [project]);

  return (
    <main className={`case-scene case-${project.media} case-${project.id}`}>
      <header className="case-header">
        <a href={`${import.meta.env.BASE_URL}#archive`} className="case-back"><b aria-hidden="true">←</b><span>返回原浏览位置 / CASE {project.index}</span></a>
        <a href={`${import.meta.env.BASE_URL}#top`} className="case-brand" aria-label="返回罗天翔作品集首页"><AvatarIdentity /></a>
        <a href="#contact-case">联系合作 <Arrow /></a>
      </header>

      <section className="case-hero shell">
        <div className="case-label"><span>{project.group}</span><span>{project.year}</span></div>
        <h1 className="motion-title">{project.title}</h1>
        <p className="case-en">{project.english}</p>
        <p className="case-project-name"><span>PROJECT</span><strong>{project.listingTitle ?? project.title}</strong><b>{project.listingEnglish ?? project.english}</b></p>
        <div className="case-intro">
          <p>{project.summary}</p>
          <dl>
            <div><dt>我的角色</dt><dd>{project.role}</dd></div>
            <div><dt>交付内容</dt><dd>{project.deliverable}</dd></div>
            <div><dt>项目类型</dt><dd>{project.category}</dd></div>
          </dl>
        </div>
        <div className="case-method" aria-label="项目方法">
          <div><span>01 / DIRECTION</span><strong>需求拆解与创意导演</strong></div>
          <div><span>02 / PRODUCTION</span><strong>AIGC 视觉与动态制作</strong></div>
          <div><span>03 / DELIVERY</span><strong>审片、优化与成品交付</strong></div>
        </div>
      </section>

      <section className="case-work">
        {project.media === "video" && project.source && (
          <div className={`case-video-frame ${project.portrait ? "is-portrait" : ""}`}>
            <video src={project.source} poster={project.cover} controls playsInline preload="metadata" />
          </div>
        )}

        {project.id === "phone-detail" && <PhoneDetailPage />}

        {project.media === "image" && project.id !== "phone-detail" && (
          <figure className={`case-image-frame ${project.long ? "is-long" : ""}`}>
            <img src={project.cover} alt={`${project.title}完整作品`} />
            <figcaption>FULL ARTWORK · 100% DISPLAY</figcaption>
          </figure>
        )}

        {project.media === "pages" && (
          <div className="case-pages-wrap">
            <div className="pages-status shell">
              <span>COMPLETE DOCUMENT</span>
              <strong>{project.pageCount} / {project.pageCount} PAGES</strong>
              <span>NO PAGES OMITTED</span>
            </div>
            <div className="case-pages">
              {pages.map((page, index) => (
                <figure key={page}>
                  <img src={page} alt={`${project.title}第 ${index + 1} 页`} loading={index < 2 ? "eager" : "lazy"} />
                  <figcaption>PAGE {String(index + 1).padStart(2, "0")} / {String(project.pageCount).padStart(2, "0")}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}
      </section>

      <footer className="case-footer shell" id="contact-case">
        <div><span>NEXT CASE / {nextProject.index}</span><h2 className="motion-title">{nextProject.title}</h2></div>
        <a href={`#case/${nextProject.id}`}>查看下一个完整项目 <Arrow /></a>
      </footer>
    </main>
  );
}

function PortfolioHome() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("work");
  const [wechatOpen, setWechatOpen] = useState(false);
  const wechatCloseRef = useRef<HTMLButtonElement>(null);
  const [filter, setFilter] = useState<ProjectGroup>(() => {
    if (typeof window === "undefined") return filters[0];
    const saved = readSessionValue("portfolio:filter") as ProjectGroup | null;
    return saved && filters.includes(saved) ? saved : filters[0];
  });
  const featuredProjects = projects.filter((project) => project.featured);
  const archiveProjects = useMemo(() => {
    const filteredProjects = projects.filter((project) => project.group === filter);
    if (filter !== "商业详情") return filteredProjects;

    const detailOrder = ["shishanju-visual", "coldx-detail", "mouse-detail", "phone-detail"];
    return [...filteredProjects].sort(
      (first, second) => detailOrder.indexOf(first.id) - detailOrder.indexOf(second.id),
    );
  }, [filter]);

  useEffect(() => {
    document.title = "罗天翔 — AIGC 视觉设计作品集";
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 28);
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    writeSessionValue("portfolio:filter", filter);
  }, [filter]);

  useEffect(() => {
    const sectionIds = ["profile", "work", "archive", "strengths", "contact"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    let activeFrame = 0;
    const updateActiveSection = () => {
      if (activeFrame) return;
      activeFrame = requestAnimationFrame(() => {
        activeFrame = 0;
        if (window.scrollY < window.innerHeight * .55) {
          setActiveSection("work");
          return;
        }

        const marker = window.innerHeight * .3;
        const containing = sections.filter((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= marker && rect.bottom > marker;
        });
        const active = containing[containing.length - 1] ?? [...sections].sort((first, second) => (
          Math.abs(first.getBoundingClientRect().top - marker) - Math.abs(second.getBoundingClientRect().top - marker)
        ))[0];
        if (active && sectionIds.includes(active.id)) setActiveSection(active.id);
      });
    };

    const titles = document.querySelectorAll<HTMLElement>(".motion-title");
    let titleObserver: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      titleObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-title-visible");
          titleObserver?.unobserve(entry.target);
        });
      }, { rootMargin: "0px 0px -12%", threshold: .18 });
    } else {
      titles.forEach((title) => title.classList.add("is-title-visible"));
    }

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    titles.forEach((title) => titleObserver?.observe(title));
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      cancelAnimationFrame(activeFrame);
      titleObserver?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onPointerMove = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useEffect(() => {
    if (!wechatOpen) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setWechatOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    const focusFrame = requestAnimationFrame(() => wechatCloseRef.current?.focus());
    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [wechatOpen]);

  useEffect(() => {
    const savedY = Number(readSessionValue("portfolio:return-y"));
    if (!Number.isFinite(savedY) || savedY <= 0) return;
    const firstFrame = requestAnimationFrame(() => window.scrollTo(0, savedY));
    const settle = window.setTimeout(() => {
      window.scrollTo(0, savedY);
      removeSessionValue("portfolio:return-y");
    }, 180);
    return () => {
      cancelAnimationFrame(firstFrame);
      window.clearTimeout(settle);
    };
  }, []);

  return (
    <main>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="header-inner">
          <a className="brand" href="#top" aria-label="返回首页"><AvatarIdentity /></a>
          <nav aria-label="主导航"><a className={activeSection === "work" ? "active" : ""} href="#work"><span>01</span> 精选</a><a className={activeSection === "archive" ? "active" : ""} href="#archive"><span>02</span> 分类作品</a><a className={activeSection === "strengths" ? "active" : ""} href="#strengths"><span>03</span> 优势</a><a className={activeSection === "profile" ? "active" : ""} href="#profile"><span>04</span> 关于</a></nav>
          <a className="contact-pill" href="#contact">联系合作 <Arrow /></a>
        </div>
        <div className="page-progress" style={{ width: `${progress}%` }} />
      </header>

      <nav className="mobile-nav" aria-label="手机快捷导航">
        <a className={activeSection === "work" ? "active" : ""} href="#work"><span>01</span>作品</a>
        <a className={activeSection === "archive" ? "active" : ""} href="#archive"><span>02</span>分类</a>
        <a className={activeSection === "strengths" ? "active" : ""} href="#strengths"><span>03</span>优势</a>
        <a className={activeSection === "profile" ? "active" : ""} href="#profile"><span>04</span>关于</a>
        <a className={activeSection === "contact" ? "active" : ""} href="#contact"><span>05</span>联系</a>
      </nav>

      <section className="hero" id="top">
        <video className="hero-video" src={asset("hero-headphones.mp4")} poster={asset("hero-headphones-poster.jpg")} autoPlay muted loop playsInline preload="metadata" />
        <div className="hero-shade" /><div className="hero-grid" aria-hidden="true" />
        <div className="hero-content shell">
          <div className="hero-eyebrow"><span><i /> COMPLETE PORTFOLIO · 22 PROJECTS</span><span>PORTFOLIO / 2026</span></div>
          <div className="hero-title-wrap"><p className="hero-role">罗天翔 · AI 视觉设计 / AIGC 影像 / 新媒体内容</p><h1 className="motion-title">把想象<br /><em>导演成</em><br />真实</h1></div>
          <div className="hero-footer">
            <p>DESIGNING WHAT PEOPLE FEEL<br />BEFORE THEY READ.</p>
            <div className="hero-disciplines"><span>15 FULL FILMS</span><span>28 PDF PAGES</span><span>5 COMPLETE ARTWORKS</span></div>
            <a className="scroll-cue" href="#work"><span>VIEW ALL</span><i>↓</i></a>
          </div>
        </div>
        <div className="hero-side" aria-hidden="true">ART × TECHNOLOGY × BUSINESS</div>
      </section>

      <section className="profile shell section" id="profile">
        <div className="section-rail"><span>01</span><p>PROFILE<br />个人经历</p></div>
        <div className="profile-main">
          <div className="profile-heading"><p className="overline">BETWEEN IMAGINATION AND EXECUTION</p><h2 className="motion-title">在编导思维与生成技术之间<br /><span>创造可落地的视觉叙事</span></h2></div>
          <div className="profile-body">
            <figure className="profile-portrait"><img src={asset("luo-tianxiang-art-avatar.png")} alt="罗天翔的 AIGC 艺术头像" /><figcaption><span>LUO TIANXIANG / 罗天翔</span><span>AIGC VISUAL</span></figcaption></figure>
            <div className="profile-copy">
              <p className="intro">我是罗天翔，一名拥有广播电视编导背景的 AIGC 视觉创作者。</p>
              <p>我把导演式的叙事判断、商业视觉的信息组织与生成式 AI 的制作效率放进同一条工作流。从创意提案、脚本分镜、角色场景到剪辑调色，我关心的不只是画面是否惊艳，更在意它是否准确、完整并真正可交付。</p>
              <div className="contact-list"><div><span>NAME</span><b>罗天翔 / LUO TIANXIANG</b></div><div><span>EDUCATION</span><b>西南石油大学 · 广播电视编导</b></div><div><span>EMAIL</span><a href="mailto:1158190818@qq.com">1158190818@QQ.COM <Arrow /></a></div><div><span>PHONE</span><a href="tel:+8618229693585">182 2969 3585 <Arrow /></a></div><div><span>WECHAT</span><button type="button" className="wechat-list-button" onClick={() => setWechatOpen(true)}>LTX · 点击打开二维码 <Arrow /></button></div></div>
              <a className="resume-link" href={`${import.meta.env.BASE_URL}luo-tianxiang-resume.pdf`} target="_blank" rel="noreferrer">查看完整简历 PDF <Arrow /></a>
            </div>
          </div>
          <div className="profile-stats"><div><strong>22</strong><span>完整项目<br />COMPLETE PROJECTS</span></div><div><strong>15</strong><span>动态影像<br />FULL FILMS</span></div><div><strong>28</strong><span>全案页面<br />PDF PAGES</span></div><div><strong>05</strong><span>完整视觉长图<br />FULL ARTWORKS</span></div></div>
        </div>
      </section>

      <section className="work section" id="work">
        <div className="shell work-shell">
          <div className="section-rail light"><span>02</span><p>SELECTED<br />WORKS</p></div>
          <div className="work-main">
            <div className="work-heading"><div><p className="overline">CURATED PROJECTS / 2024—2026</p><h2 className="motion-title">精选项目</h2></div></div>
            <div className="project-grid">{featuredProjects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>

            <section className="archive" id="archive">
              <div className="archive-heading">
                <div><p className="overline">PROJECT CATEGORIES / EVERY WORK INCLUDED</p><h2 className="motion-title">分类作品</h2></div>
                <strong>22<sup>/22</sup></strong>
              </div>
              <div className="archive-filters" role="group" aria-label="按类别筛选作品">
                {filters.map((item) => (
                  <button key={item} className={filter === item ? "active" : ""} aria-pressed={filter === item} onClick={() => setFilter(item)}>
                    {item}<sup>{projects.filter((project) => project.group === item).length}</sup>
                  </button>
                ))}
              </div>
              <p className="sr-only" aria-live="polite">当前显示 {filter}，共 {archiveProjects.length} 个项目</p>
              <div className="archive-grid">{archiveProjects.map((project) => <ArchiveCard key={project.id} project={project} />)}</div>
            </section>
          </div>
        </div>
      </section>

      <section className="strengths shell section" id="strengths">
        <div className="section-rail"><span>03</span><p>WHY ME<br />个人优势</p></div>
        <div className="strength-main">
          <div className="strength-heading"><p className="overline">CAPABILITIES / NOT JUST TOOLS</p><h2 className="motion-title">从想法到被看见<br /><span>再到真正落地</span></h2></div>
          <div className="strength-grid">{strengths.map((item, index) => <a className="strength-card" href={`#workflow/${workflows[index].id}`} onClick={rememberPortfolioPosition} aria-label={`打开${item.title}作品集工作流`} key={item.number}><div className="strength-top"><span>{item.number}</span><i>✦</i></div><div><p>{item.english}</p><h3>{item.title}</h3><div className="card-line" /><p className="strength-copy">{item.copy}</p></div><div className="strength-card-footer"><div className="strength-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><b>VIEW WORKFLOW <Arrow /></b></div></a>)}</div>
        </div>
      </section>

      <footer className="contact" id="contact">
        <div className="contact-grid" aria-hidden="true" />
        <div className="contact-inner shell"><div className="contact-top"><span><i /> OPEN FOR COLLABORATION</span><span>LUO TIANXIANG / CHINA</span></div><div className="contact-title"><p>HAVE A PROJECT IN MIND?</p><h2 className="motion-title">让下一个想法<br /><em>成为真实作品</em></h2></div><div className="contact-actions"><a className="contact-email" href="mailto:1158190818@qq.com"><span>1158190818@QQ.COM</span><Arrow /></a><button type="button" className="wechat-contact" onClick={() => setWechatOpen(true)}><span><small>WECHAT</small>LTX</span><b>打开二维码 <Arrow /></b></button></div><div className="contact-bottom"><span>© 2026 罗天翔 · AIGC VISUAL DESIGNER</span><div><a href="#top">BACK TO TOP ↑</a><a href="#work">WORKS</a><a href="#strengths">CAPABILITIES</a></div><a href="tel:+8618229693585">+86 182 2969 3585</a></div></div>
      </footer>

      {wechatOpen && (
        <div className="wechat-modal-backdrop" role="presentation" onClick={() => setWechatOpen(false)}>
          <section className="wechat-modal" role="dialog" aria-modal="true" aria-labelledby="wechat-title" onClick={(event) => event.stopPropagation()}>
            <button ref={wechatCloseRef} type="button" className="wechat-modal-close" onClick={() => setWechatOpen(false)} aria-label="关闭微信二维码">×</button>
            <div className="wechat-modal-heading"><p>WECHAT CONTACT / 微信联系</p><h2 className="motion-title is-title-visible" id="wechat-title">添加微信<br /><span>LTX</span></h2></div>
            <a className="wechat-qr-link" href={asset("wechat-ltx-qr.png")} target="_blank" rel="noreferrer" aria-label="在新窗口打开微信二维码原图">
              <img src={asset("wechat-ltx-qr.png")} alt="罗天翔微信二维码，微信号 LTX" />
            </a>
            <p className="wechat-modal-note">扫描二维码添加好友 · 点击二维码可打开原图</p>
          </section>
        </div>
      )}
    </main>
  );
}

export default function Home() {
  const [caseId, setCaseId] = useState("");
  const [workflowId, setWorkflowId] = useState("");

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash;
      setCaseId(hash.startsWith("#case/") ? hash.slice(6) : "");
      setWorkflowId(hash.startsWith("#workflow/") ? hash.slice(10) : "");
    };
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const project = projects.find((item) => item.id === caseId);
  const workflow = workflows.find((item) => item.id === workflowId);
  if (project) return <CaseScene project={project} />;
  if (workflow) return <WorkflowScene workflow={workflow} />;
  return <PortfolioHome />;
}
