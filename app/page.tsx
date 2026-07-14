"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";

type ProjectGroup = "横屏商业广告" | "竖屏抖音爆款" | "漫剧作品" | "商业详情" | "品牌全案" | "平面设计";
type MediaType = "video" | "image" | "pages";
type CoverFormat = "landscape" | "portrait" | "vertical";

type Project = {
  id: string;
  index: string;
  title: string;
  english: string;
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
    category: "资讯内容 / 自媒体视频",
    group: "横屏商业广告",
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

const experience = [
  { period: "2024.05 — 至今", company: "湖南日报融媒体传播有限公司", role: "AIGC 编辑", description: "负责企业、科技、产业及新闻稿件撰写，从资料梳理到结构化成稿，持续将复杂信息转译成清晰内容。" },
  { period: "2022.08 — 2023.06", company: "华声在线 · 湘报严选部门", role: "内容 / 直播运营", description: "完成《新湖南》公众号短视频拍摄与后期，并负责直播中控、商城运营、产品与节日文案及抖音助农直播。" },
  { period: "2021.07 — 2021.10", company: "湖南卫视金鹰卡通频道", role: "后期剪辑 / 花字 / 字幕", description: "参与《童趣大冒险》后期制作，在真实栏目流程中完成剪辑、花字与字幕相关工作。" },
];

const toolGroups = [
  ["图像与视频生成", "Midjourney · Stable Diffusion · ComfyUI · FLUX · ImageGen · 即梦 · 可灵 · Runway · Vidu · 海螺 AI"],
  ["大模型与智能体", "ChatGPT · Claude · Gemini · Grok · Kimi · DeepSeek · 豆包 · Codex"],
  ["设计与后期", "Photoshop · Premiere Pro · DaVinci Resolve · 剪映 · Cinema 4D"],
];

const filters: ProjectGroup[] = ["横屏商业广告", "竖屏抖音爆款", "漫剧作品", "商业详情", "品牌全案", "平面设计"];

const rememberPortfolioPosition = () => {
  sessionStorage.setItem("portfolio:return-y", String(window.scrollY));
};

function Arrow() {
  return <span aria-hidden="true">↗</span>;
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
  if (project.media === "video") return project.coverFormat === "vertical" ? "VERTICAL FILM" : "MOTION FILM";
  if (project.media === "pages") return `COMPLETE CASE · ${project.pageCount}P`;
  if (project.long) return "LONGFORM DESIGN";
  return "VISUAL DESIGN";
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
        <div><h3>{project.title}</h3><p>{project.english}</p></div>
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
        <div><h3>{project.title}</h3><p>{project.english}</p></div>
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
          <h2>未来影像<br /><span>旗舰新境</span></h2>
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

function CaseScene({ project }: { project: Project }) {
  const projectIndex = projects.findIndex((item) => item.id === project.id);
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const pages = project.pageCount
    ? Array.from({ length: project.pageCount }, (_, index) => asset(`case-pages/${project.pagePrefix}-${index + 1 < 10 ? "0" : ""}${index + 1}.webp`))
    : [];

  useEffect(() => {
    document.title = `${project.title} — 完整案例`;
    window.scrollTo(0, 0);
    return () => { document.title = "罗天翔 — AIGC 视觉设计作品集"; };
  }, [project]);

  return (
    <main className={`case-scene case-${project.media} case-${project.id}`}>
      <header className="case-header">
        <a href={`${import.meta.env.BASE_URL}#archive`} className="case-back">← 返回原浏览位置</a>
        <span>LUO TIANXIANG · CASE {project.index} / {projects.length}</span>
        <a href="#contact-case">联系合作 <Arrow /></a>
      </header>

      <section className="case-hero shell">
        <div className="case-label"><span>{project.group}</span><span>{project.year}</span></div>
        <h1>{project.title}</h1>
        <p className="case-en">{project.english}</p>
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
        <div><span>NEXT CASE / {nextProject.index}</span><h2>{nextProject.title}</h2></div>
        <a href={`#case/${nextProject.id}`}>查看下一个完整项目 <Arrow /></a>
      </footer>
    </main>
  );
}

function PortfolioHome() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [filter, setFilter] = useState<ProjectGroup>(() => {
    if (typeof window === "undefined") return filters[0];
    const saved = sessionStorage.getItem("portfolio:filter") as ProjectGroup | null;
    return saved && filters.includes(saved) ? saved : filters[0];
  });
  const featuredProjects = projects.filter((project) => project.featured);
  const archiveProjects = useMemo(
    () => projects.filter((project) => project.group === filter),
    [filter],
  );

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
    sessionStorage.setItem("portfolio:filter", filter);
  }, [filter]);

  useEffect(() => {
    const savedY = Number(sessionStorage.getItem("portfolio:return-y"));
    if (!Number.isFinite(savedY) || savedY <= 0) return;
    const firstFrame = requestAnimationFrame(() => window.scrollTo(0, savedY));
    const settle = window.setTimeout(() => {
      window.scrollTo(0, savedY);
      sessionStorage.removeItem("portfolio:return-y");
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
          <a className="brand" href="#top" aria-label="返回首页"><span className="brand-glyph">L<span>+</span></span><span className="brand-copy">LUO TIANXIANG<br />AIGC VISUAL</span></a>
          <nav aria-label="主导航"><a href="#work"><span>01</span> 精选</a><a href="#archive"><span>02</span> 分类作品</a><a href="#experience"><span>03</span> 经历</a><a href="#profile"><span>04</span> 关于</a></nav>
          <a className="contact-pill" href="#contact">联系合作 <Arrow /></a>
        </div>
        <div className="page-progress" style={{ width: `${progress}%` }} />
      </header>

      <section className="hero" id="top">
        <video className="hero-video" src={asset("hero-headphones.mp4")} poster={asset("hero-headphones-poster.jpg")} autoPlay muted loop playsInline preload="metadata" />
        <div className="hero-shade" /><div className="hero-grid" aria-hidden="true" />
        <div className="hero-content shell">
          <div className="hero-eyebrow"><span><i /> COMPLETE PORTFOLIO · 22 PROJECTS</span><span>PORTFOLIO / 2026</span></div>
          <div className="hero-title-wrap"><p className="hero-role">罗天翔 · AI 视觉设计 / AIGC 影像 / 新媒体内容</p><h1>把想象<br /><em>导演成</em><br />真实。</h1></div>
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
          <div className="profile-heading"><p className="overline">BETWEEN IMAGINATION AND EXECUTION</p><h2>在编导思维与生成技术之间，<br /><span>创造可落地的视觉叙事。</span></h2></div>
          <div className="profile-body">
            <figure className="profile-portrait"><img src={asset("luo-tianxiang-profile.jpg")} alt="AIGC 视觉设计师罗天翔个人肖像" /><figcaption><span>LUO TIANXIANG / 罗天翔</span><span>AIGC VISUAL</span></figcaption></figure>
            <div className="profile-copy">
              <p className="intro">我是罗天翔，一名拥有广播电视编导背景的 AIGC 视觉创作者。</p>
              <p>我把导演式的叙事判断、商业视觉的信息组织与生成式 AI 的制作效率放进同一条工作流。从创意提案、脚本分镜、角色场景到剪辑调色，我关心的不只是画面是否惊艳，更在意它是否准确、完整并真正可交付。</p>
              <div className="contact-list"><div><span>NAME</span><b>罗天翔 / LUO TIANXIANG</b></div><div><span>EDUCATION</span><b>西南石油大学 · 广播电视编导</b></div><div><span>EMAIL</span><a href="mailto:1158190818@qq.com">1158190818@QQ.COM <Arrow /></a></div><div><span>PHONE</span><a href="tel:+8618229693585">182 2969 3585 <Arrow /></a></div></div>
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
            <div className="work-heading"><div><p className="overline">CURATED PROJECTS / 2024—2026</p><h2>精选项目</h2></div><p>先从六个代表项目进入完整案例，<br />每张卡片均通往独立展示场景。</p></div>
            <div className="project-grid">{featuredProjects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>

            <section className="archive" id="archive">
              <div className="archive-heading">
                <div><p className="overline">PROJECT CATEGORIES / EVERY WORK INCLUDED</p><h2>分类作品</h2></div>
                <strong>22<sup>/22</sup></strong>
              </div>
              <div className="archive-filters" role="group" aria-label="按类别筛选作品">
                {filters.map((item) => (
                  <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>
                    {item}<sup>{projects.filter((project) => project.group === item).length}</sup>
                  </button>
                ))}
              </div>
              <div className="archive-grid">{archiveProjects.map((project) => <ArchiveCard key={project.id} project={project} />)}</div>
            </section>
          </div>
        </div>
      </section>

      <section className="strengths shell section" id="strengths">
        <div className="section-rail"><span>03</span><p>WHY ME<br />个人优势</p></div>
        <div className="strength-main">
          <div className="strength-heading"><p className="overline">CAPABILITIES / NOT JUST TOOLS</p><h2>从想法，到被看见。<br /><span>再到真正落地。</span></h2></div>
          <div className="strength-grid">{strengths.map((item) => <article className="strength-card" key={item.number}><div className="strength-top"><span>{item.number}</span><i>✦</i></div><div><p>{item.english}</p><h3>{item.title}</h3><div className="card-line" /><p className="strength-copy">{item.copy}</p></div><div className="strength-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}</div>
        </div>
      </section>

      <section className="experience section" id="experience">
        <div className="shell experience-shell">
          <div className="section-rail light"><span>04</span><p>EXPERIENCE<br />经历与工具</p></div>
          <div className="experience-main">
            <div className="experience-heading"><p className="overline">EDITORIAL ROOTS / GENERATIVE FUTURE</p><h2>真实内容经验，<br /><span>驱动新一代视觉创作。</span></h2></div>
            <div className="career-list">
              {experience.map((item, index) => (
                <article className="career-item" key={item.company}>
                  <span className="career-number">0{index + 1}</span>
                  <time>{item.period}</time>
                  <div><h3>{item.company}</h3><p className="career-role">{item.role}</p><p>{item.description}</p></div>
                </article>
              ))}
            </div>
            <div className="experience-bottom">
              <article className="education-card"><p className="overline">EDUCATION & RECOGNITION</p><h3>西南石油大学</h3><p>广播电视编导 · 本科 · 学士学位<br />2018 — 2023</p><div className="award-line"><strong>2020</strong><span>四川省大学生新媒体创意大赛<br />二等奖 × 1 · 三等奖 × 1</span></div><div className="award-line"><strong>06</strong><span>篇文章刊载于“新湖南”网站<br />企业 · 科技 · 产业内容</span></div></article>
              <article className="tools-card"><p className="overline">SELECTED TOOLKIT</p>{toolGroups.map(([label, tools]) => <div key={label}><h3>{label}</h3><p>{tools}</p></div>)}</article>
            </div>
          </div>
        </div>
      </section>

      <footer className="contact" id="contact">
        <div className="contact-grid" aria-hidden="true" />
        <div className="contact-inner shell"><div className="contact-top"><span><i /> OPEN FOR COLLABORATION</span><span>LUO TIANXIANG / CHINA</span></div><div className="contact-title"><p>HAVE A PROJECT IN MIND?</p><h2>让下一个想法，<br /><em>成为真实作品。</em></h2></div><a className="contact-email" href="mailto:1158190818@qq.com"><span>1158190818@QQ.COM</span><Arrow /></a><div className="contact-bottom"><span>© 2026 罗天翔 · AIGC VISUAL DESIGNER</span><div><a href="#top">BACK TO TOP ↑</a><a href="#work">WORKS</a><a href="#experience">EXPERIENCE</a></div><a href="tel:+8618229693585">+86 182 2969 3585</a></div></div>
      </footer>
    </main>
  );
}

export default function Home() {
  const [caseId, setCaseId] = useState(() => typeof window !== "undefined" && window.location.hash.startsWith("#case/") ? window.location.hash.slice(6) : "");

  useEffect(() => {
    const onHashChange = () => setCaseId(window.location.hash.startsWith("#case/") ? window.location.hash.slice(6) : "");
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const project = projects.find((item) => item.id === caseId);
  return project ? <CaseScene project={project} /> : <PortfolioHome />;
}
