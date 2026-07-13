"use client";

import { useEffect, useState } from "react";

type Project = {
  id: string;
  index: string;
  title: string;
  english: string;
  category: string;
  year: string;
  cover: string;
  video?: string;
  layout?: "wide" | "tall";
  position?: string;
  summary: string;
  role: string;
  deliverable: string;
};

const projects: Project[] = [
  {
    id: "headphones",
    index: "01",
    title: "声场之外",
    english: "HEADPHONE COMMERCIAL FILM",
    category: "AI 动态影像 / 产品广告",
    year: "2026",
    cover: "/assets/hero-headphones-poster.jpg",
    video: "/assets/hero-headphones.mp4",
    layout: "wide",
    position: "center",
    summary: "以微距材质、精密结构与低照度氛围，建立高端头戴耳机的科技感与听觉想象。",
    role: "创意概念 · AI 视觉 · 动态剪辑",
    deliverable: "品牌广告片",
  },
  {
    id: "mecha",
    index: "02",
    title: "钢铁人格",
    english: "ORIGINAL MECHA TOY",
    category: "概念设计 / AI 广告",
    year: "2026",
    cover: "/assets/mecha-toy-poster.jpg",
    video: "/assets/mecha-toy.mp4",
    summary: "从原创机甲设定到战场叙事，用统一的机械语言完成角色、世界观与产品广告表达。",
    role: "世界观设定 · 视觉开发 · 成片",
    deliverable: "原创玩具广告",
  },
  {
    id: "shishanju",
    index: "03",
    title: "住进秋天",
    english: "SHISHANJU RETREAT",
    category: "空间叙事 / 民宿广告",
    year: "2026",
    cover: "/assets/shishanju-poster.jpg",
    video: "/assets/shishanju.mp4",
    summary: "以克制、温暖的东方生活感组织空间镜头，让一座民宿从建筑变成可被向往的旅居体验。",
    role: "视觉提案 · 场景生成 · 影片制作",
    deliverable: "品牌形象片",
  },
  {
    id: "phone",
    index: "04",
    title: "未来影像",
    english: "VITARA X1 PRO",
    category: "电商视觉 / 详情页",
    year: "2026",
    cover: "/assets/phone-detail.webp",
    layout: "tall",
    position: "center top",
    summary: "围绕影像、性能与旗舰工艺重组信息层级，建立从首屏冲击到参数说服的完整电商叙事。",
    role: "视觉策略 · 页面设计 · AI 制图",
    deliverable: "产品详情页",
  },
  {
    id: "dumpling",
    index: "05",
    title: "饺个朋友",
    english: "BRAND IP SYSTEM",
    category: "品牌设计 / IP 全案",
    year: "2024",
    cover: "/assets/dumpling-ip-cover.webp",
    position: "center",
    summary: "把亲切的社交语义转化成可识别、可延展的饺子 IP，覆盖品牌角色、语言与传播应用。",
    role: "品牌策略 · IP 设计 · 应用延展",
    deliverable: "17P 品牌全案",
  },
  {
    id: "editorial",
    index: "06",
    title: "事事如意",
    english: "EDITORIAL COVER STUDY",
    category: "平面设计 / 封面实验",
    year: "2026",
    cover: "/assets/magazine-cover.webp",
    layout: "tall",
    position: "center 18%",
    summary: "以复古雕版、东方祝愿与当代版式构成高密度视觉封面，探索传统意象的现代转译。",
    role: "艺术指导 · 版式设计 · AI 插画",
    deliverable: "杂志封面",
  },
];

const strengths = [
  {
    number: "01",
    title: "AI 影像导演力",
    english: "AI MOTION DIRECTION",
    copy: "从创意概念、分镜、画面生成到节奏剪辑，让每一次生成都服务于明确的导演意图。",
    tags: ["SCRIPT", "STORYBOARD", "VIDEO GEN", "EDIT"],
  },
  {
    number: "02",
    title: "品牌系统化",
    english: "BRAND SYSTEMS",
    copy: "把定位、视觉语言、IP 角色与应用延展组织成一致的品牌体验，而不是零散的漂亮画面。",
    tags: ["STRATEGY", "IDENTITY", "IP", "GUIDELINE"],
  },
  {
    number: "03",
    title: "商业视觉落地",
    english: "COMMERCIAL CRAFT",
    copy: "理解卖点、信息层级与转化目标，在审美与商业效率之间找到清晰、可执行的解法。",
    tags: ["E-COMMERCE", "CAMPAIGN", "KEY VISUAL"],
  },
  {
    number: "04",
    title: "跨媒介工作流",
    english: "MULTI-MODAL WORKFLOW",
    copy: "灵活组合图像、视频、文字与模型能力，建立稳定、可复用、能持续迭代的创作流程。",
    tags: ["IMAGE", "VIDEO", "LLM", "WORKFLOW"],
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
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
    document.body.style.overflow = selected ? "hidden" : "";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  return (
    <main>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="header-inner">
          <a className="brand" href="#top" aria-label="返回首页">
            <span className="brand-glyph">D<span>+</span></span>
            <span className="brand-copy">VISUAL / AI<br />DESIGNER</span>
          </a>
          <nav aria-label="主导航">
            <a href="#work"><span>01</span> 作品</a>
            <a href="#profile"><span>02</span> 关于</a>
            <a href="#strengths"><span>03</span> 能力</a>
          </nav>
          <a className="contact-pill" href="#contact">联系合作 <Arrow /></a>
        </div>
        <div className="page-progress" style={{ width: `${progress}%` }} />
      </header>

      <section className="hero" id="top">
        <video
          className="hero-video"
          src="/assets/hero-headphones.mp4"
          poster="/assets/hero-headphones-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="hero-shade" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-content shell">
          <div className="hero-eyebrow">
            <span><i /> AVAILABLE FOR SELECTED PROJECTS</span>
            <span>PORTFOLIO / 2026</span>
          </div>
          <div className="hero-title-wrap">
            <p className="hero-role">视觉设计师 / AI 设计师 / 品牌设计师</p>
            <h1>让视觉<br /><em>先于语言</em><br />抵达。</h1>
          </div>
          <div className="hero-footer">
            <p>DESIGNING WHAT PEOPLE FEEL<br />BEFORE THEY READ.</p>
            <div className="hero-disciplines">
              <span>AI MOTION</span>
              <span>BRAND SYSTEM</span>
              <span>COMMERCIAL VISUAL</span>
            </div>
            <a className="scroll-cue" href="#profile" aria-label="向下浏览">
              <span>SCROLL</span><i>↓</i>
            </a>
          </div>
        </div>
        <div className="hero-side" aria-hidden="true">ART × TECHNOLOGY × BUSINESS</div>
      </section>

      <section className="profile shell section" id="profile">
        <div className="section-rail">
          <span>01</span>
          <p>PROFILE<br />个人经历</p>
        </div>
        <div className="profile-main">
          <div className="profile-heading">
            <p className="overline">BETWEEN IMAGINATION AND EXECUTION</p>
            <h2>在创意与技术之间，<br /><span>建立可感知的品牌体验。</span></h2>
          </div>
          <div className="profile-body">
            <figure className="profile-portrait">
              <img src="/assets/book-cover.webp" alt="人物视觉作品《澄心》局部" />
              <figcaption><span>PROFILE VISUAL / 01</span><span>FROM “澄心”</span></figcaption>
            </figure>
            <div className="profile-copy">
              <p className="intro">我是一名视觉设计师、AI 设计师与品牌设计师，持续探索生成式 AI 如何进入真实商业创作。</p>
              <p>从一条广告片、一张主视觉，到一套完整品牌表达，我关注的不只是画面是否好看，更在意它能否准确传递价值、建立记忆，并最终成为可落地的作品。</p>
              <div className="contact-list">
                <div><span>NAME</span><b>YOUR NAME / 待补充</b></div>
                <div><span>BASED</span><b>CHINA · REMOTE READY</b></div>
                <div><span>EMAIL</span><a href="mailto:hello@yourname.com">HELLO@YOURNAME.COM <Arrow /></a></div>
                <div><span>SOCIAL</span><b>小红书 / 抖音 / BEHANCE</b></div>
              </div>
            </div>
          </div>
          <div className="profile-stats" aria-label="项目数据">
            <div><strong>20<sup>+</sup></strong><span>完成项目<br />SELECTED OUTPUTS</span></div>
            <div><strong>15</strong><span>动态影像<br />MOTION FILMS</span></div>
            <div><strong>07</strong><span>品牌与商业视觉<br />VISUAL SYSTEMS</span></div>
            <div><strong>03</strong><span>核心创作维度<br />DESIGN DISCIPLINES</span></div>
          </div>
        </div>
      </section>

      <section className="work section" id="work">
        <div className="shell work-shell">
          <div className="section-rail light">
            <span>02</span>
            <p>SELECTED<br />WORKS</p>
          </div>
          <div className="work-main">
            <div className="work-heading">
              <div>
                <p className="overline">CURATED PROJECTS / 2024—2026</p>
                <h2>精选项目</h2>
              </div>
              <p>跨越 AI 影像、品牌系统、商业广告与平面设计，<br />每一个项目都从真实的表达目标出发。</p>
            </div>
            <div className="project-grid">
              {projects.map((project) => (
                <article className={`project-card ${project.layout ? `is-${project.layout}` : ""}`} key={project.id}>
                  <button className="project-media" onClick={() => setSelected(project)} aria-label={`查看项目：${project.title}`}>
                    <img src={project.cover} alt={`${project.title}项目封面`} style={{ objectPosition: project.position }} />
                    <span className="project-index">CASE / {project.index}</span>
                    {project.video && <span className="play-badge"><i>▶</i> PLAY FILM</span>}
                    <span className="open-project">VIEW PROJECT <Arrow /></span>
                  </button>
                  <div className="project-meta">
                    <div>
                      <h3>{project.title}</h3>
                      <p>{project.english}</p>
                    </div>
                    <div><span>{project.category}</span><time>{project.year}</time></div>
                  </div>
                </article>
              ))}
            </div>
            <div className="archive-note">
              <span>MORE IN ARCHIVE</span>
              <p>另有游戏买量、资讯短片、食品广告、文旅影像等完整作品，可按需提供。</p>
              <i>＋</i>
            </div>
          </div>
        </div>
      </section>

      <section className="strengths shell section" id="strengths">
        <div className="section-rail">
          <span>03</span>
          <p>WHY ME<br />个人优势</p>
        </div>
        <div className="strength-main">
          <div className="strength-heading">
            <p className="overline">CAPABILITIES / NOT JUST TOOLS</p>
            <h2>从想法，到被看见。<br /><span>再到真正落地。</span></h2>
          </div>
          <div className="strength-grid">
            {strengths.map((item) => (
              <article className="strength-card" key={item.number}>
                <div className="strength-top"><span>{item.number}</span><i>✦</i></div>
                <div>
                  <p>{item.english}</p>
                  <h3>{item.title}</h3>
                  <div className="card-line" />
                  <p className="strength-copy">{item.copy}</p>
                </div>
                <div className="strength-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="contact" id="contact">
        <div className="contact-grid" aria-hidden="true" />
        <div className="contact-inner shell">
          <div className="contact-top">
            <span><i /> OPEN FOR COLLABORATION</span>
            <span>BASED IN CHINA / WORKING WORLDWIDE</span>
          </div>
          <div className="contact-title">
            <p>HAVE A PROJECT IN MIND?</p>
            <h2>一起做点<br /><em>值得被记住的。</em></h2>
          </div>
          <a className="contact-email" href="mailto:hello@yourname.com">
            <span>HELLO@YOURNAME.COM</span><Arrow />
          </a>
          <div className="contact-bottom">
            <span>© 2026 VISUAL / AI / BRAND DESIGNER</span>
            <div><a href="#top">BACK TO TOP ↑</a><a href="#work">WORKS</a><a href="#profile">PROFILE</a></div>
            <span>DESIGNED WITH INTENT</span>
          </div>
        </div>
      </footer>

      {selected && (
        <div className="modal-backdrop" onMouseDown={() => setSelected(null)}>
          <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)} aria-label="关闭项目">×</button>
            <div className="modal-media">
              {selected.video ? (
                <video src={selected.video} poster={selected.cover} controls autoPlay playsInline />
              ) : (
                <img src={selected.cover} alt={`${selected.title}项目大图`} />
              )}
            </div>
            <div className="modal-content">
              <div className="modal-kicker"><span>CASE / {selected.index}</span><span>{selected.year}</span></div>
              <h2 id="modal-title">{selected.title}</h2>
              <p className="modal-english">{selected.english}</p>
              <p className="modal-summary">{selected.summary}</p>
              <dl>
                <div><dt>我的角色</dt><dd>{selected.role}</dd></div>
                <div><dt>交付内容</dt><dd>{selected.deliverable}</dd></div>
                <div><dt>项目类型</dt><dd>{selected.category}</dd></div>
              </dl>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
