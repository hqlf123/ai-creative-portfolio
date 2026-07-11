"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Category = "全部" | "视频" | "图像" | "PPTX";

type Project = {
  id: string;
  category: Exclude<Category, "全部">;
  index: string;
  title: string;
  en: string;
  description: string;
  tools: string;
  year: string;
  image?: string;
  visual: "image" | "video" | "deck" | "system";
  metric: string;
};

const projects: Project[] = [
  {
    id: "pjsk",
    category: "图像",
    index: "01",
    title: "多模态世界角色系统",
    en: "MULTIMODAL WORLD BUILDING",
    description: "把角色设定、叙事规则与视觉生成串联成可复用的创作系统，并保持跨场景的一致性。",
    tools: "LLM · COMFYUI · WORKFLOW",
    year: "2026",
    image: "/work-world.png",
    visual: "system",
    metric: "1 套系统 / 24 个场景",
  },
  {
    id: "future-film",
    category: "视频",
    index: "02",
    title: "算法之后，创意之前",
    en: "AFTER THE ALGORITHM",
    description: "一支关于人机协作的概念短片。负责叙事、分镜、生成工作流与后期节奏。",
    tools: "SCRIPT · VIDEO GEN · EDIT",
    year: "2026",
    visual: "video",
    metric: "00:48 / 12 个镜头",
  },
  {
    id: "poster",
    category: "图像",
    index: "03",
    title: "未知字体实验",
    en: "UNKNOWN TYPE STUDY",
    description: "以“问号”为视觉语法，探索生成式图像在字体、材质与版式中的可控表达。",
    tools: "IMAGE GEN · ART DIRECTION",
    year: "2026",
    image: "/work-poster.png",
    visual: "image",
    metric: "8 轮迭代 / 2 个方向",
  },
  {
    id: "ai-deck",
    category: "PPTX",
    index: "04",
    title: "AI 产品策略提案",
    en: "AI PRODUCT STRATEGY",
    description: "从用户问题、模型能力到商业落地的完整提案，用一条清晰叙事降低复杂度。",
    tools: "RESEARCH · STORY · PPTX",
    year: "2026",
    visual: "deck",
    metric: "32 页 / 3 个决策",
  },
  {
    id: "motion",
    category: "视频",
    index: "05",
    title: "生成式动态视觉",
    en: "GENERATIVE MOTION STUDY",
    description: "研究提示词、镜头运动和音乐节拍之间的映射，让随机生成拥有导演意图。",
    tools: "VIDU · SOUND · EDIT",
    year: "2025",
    visual: "video",
    metric: "01:26 / 4K",
  },
  {
    id: "research",
    category: "PPTX",
    index: "06",
    title: "多智能体研究报告",
    en: "MULTI-AGENT RESEARCH",
    description: "拆解协作式智能体的能力边界，以信息图和实验结果组织一份可读的技术报告。",
    tools: "AGENTS · DATA · PPTX",
    year: "2025",
    visual: "deck",
    metric: "18 页 / 6 组实验",
  },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function ProjectVisual({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className={`project-visual visual-${project.visual}`}>
        <Image src={project.image} alt={`${project.title}作品预览`} fill sizes="(max-width: 760px) 100vw, 50vw" />
        <span className="visual-code">{project.index} / {project.category}</span>
      </div>
    );
  }

  if (project.visual === "video") {
    return (
      <div className="project-visual visual-video" aria-label="视频作品预览">
        <div className="video-orbit orbit-one" />
        <div className="video-orbit orbit-two" />
        <div className="play"><span>▶</span></div>
        <div className="video-time">{project.metric.split(" /")[0]}</div>
        <div className="visual-code">{project.index} / MOTION</div>
      </div>
    );
  }

  return (
    <div className="project-visual visual-deck" aria-label="PPTX 作品预览">
      <div className="deck-slide deck-back"><span>{project.index}</span></div>
      <div className="deck-slide deck-middle"><i /></div>
      <div className="deck-slide deck-front">
        <small>AI / {project.year}</small>
        <strong>{project.en}</strong>
        <div className="deck-rule" />
      </div>
      <div className="visual-code">{project.index} / DECK</div>
    </div>
  );
}

export default function Home() {
  const [filter, setFilter] = useState<Category>("全部");
  const [selected, setSelected] = useState<Project | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const visible = useMemo(
    () => projects.filter((project) => filter === "全部" || project.category === filter),
    [filter],
  );

  return (
    <main>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label="返回首页">
          <span className="brand-mark">AI</span>
          <span>CREATIVE<br />TECHNOLOGIST</span>
        </a>
        <nav aria-label="主导航">
          <a href="#works">作品</a>
          <a href="#about">关于</a>
          <a href="#contact">联系</a>
        </nav>
        <a className="header-cta" href="#contact">LET&apos;S TALK <Arrow diagonal /></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-kicker"><span className="status-dot" /> AVAILABLE FOR 2026</div>
        <h1>
          把模型能力<br />
          变成<span className="outline-word">可感知</span>的作品。
        </h1>
        <div className="hero-bottom">
          <p>AI 创意技术 / 视觉叙事 / 产品表达<br />从研究、提示工程到最终交付。</p>
          <a className="round-link" href="#works" aria-label="浏览作品"><Arrow diagonal /></a>
        </div>
        <div className="hero-index" aria-hidden="true">PORTFOLIO — 26</div>
      </section>

      <section className="manifesto" id="about">
        <div className="section-label"><span>01</span> / PROFILE</div>
        <div className="manifesto-copy">
          <p>我不只会“调用 AI”。</p>
          <p className="muted">我把复杂模型变成清晰的创作方法，</p>
          <p>让技术真正服务于叙事、审美与决策。</p>
        </div>
        <div className="profile-meta">
          <div><span>FOCUS</span><b>多模态创作<br />生成式设计</b></div>
          <div><span>STACK</span><b>LLM / IMAGE<br />VIDEO / AGENTS</b></div>
          <div><span>BASED</span><b>CHINA<br />REMOTE READY</b></div>
        </div>
      </section>

      <section className="works" id="works">
        <div className="works-head">
          <div>
            <div className="section-label"><span>02</span> / SELECTED WORKS</div>
            <h2>精选作品</h2>
          </div>
          <div className="filters" role="group" aria-label="筛选作品">
            {(["全部", "视频", "图像", "PPTX"] as Category[]).map((item) => (
              <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>
                {item}<sup>{item === "全部" ? projects.length : projects.filter((p) => p.category === item).length}</sup>
              </button>
            ))}
          </div>
        </div>

        <div className="project-grid">
          {visible.map((project) => (
            <article className="project-card" key={project.id}>
              <button className="visual-button" onClick={() => setSelected(project)} aria-label={`查看${project.title}详情`}>
                <ProjectVisual project={project} />
                <span className="view-pill">VIEW CASE <Arrow diagonal /></span>
              </button>
              <div className="project-info">
                <span>{project.index}</span>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.en}</p>
                </div>
                <time>{project.year}</time>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="process">
        <div className="section-label"><span>03</span> / HOW I WORK</div>
        <h2>不是黑箱，<br />是可复用的方法。</h2>
        <ol>
          <li><span>01</span><div><b>定义问题</b><small>CONTEXT &amp; QUESTION</small></div><p>先确认作品要改变谁的认知，以及用什么证据判断它有效。</p></li>
          <li><span>02</span><div><b>设计系统</b><small>WORKFLOW &amp; CONTROL</small></div><p>把模型、提示、素材和人工判断组织成稳定且可迭代的工作流。</p></li>
          <li><span>03</span><div><b>交付表达</b><small>CRAFT &amp; DELIVERY</small></div><p>让每一个镜头、画面和页面都经得起审美与业务目标的检验。</p></li>
        </ol>
      </section>

      <footer id="contact">
        <div className="footer-status"><span className="status-dot" /> 接受实习、合作与有趣的问题</div>
        <h2>一起做点<br /><i>新东西。</i></h2>
        <a className="email-link" href="mailto:hello@example.com">HELLO@EXAMPLE.COM <Arrow diagonal /></a>
        <div className="footer-bottom">
          <span>© 2026 AI CREATIVE PORTFOLIO</span>
          <div><a href="#top">小红书</a><a href="#top">BILIBILI</a><a href="#top">返回顶部 ↑</a></div>
        </div>
      </footer>

      {selected && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelected(null)}>
          <section className="case-modal" role="dialog" aria-modal="true" aria-labelledby="case-title" onMouseDown={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)} aria-label="关闭详情">×</button>
            <div className="modal-number">CASE / {selected.index}</div>
            <h2 id="case-title">{selected.title}</h2>
            <p className="modal-en">{selected.en}</p>
            <p className="modal-desc">{selected.description}</p>
            <div className="modal-stats"><div><span>我的角色</span><b>研究 · 创意 · 制作</b></div><div><span>工具与方法</span><b>{selected.tools}</b></div><div><span>成果</span><b>{selected.metric}</b></div></div>
            <button className="next-case" onClick={() => setSelected(projects[(projects.indexOf(selected) + 1) % projects.length])}>下一个项目 <Arrow /></button>
          </section>
        </div>
      )}
    </main>
  );
}
