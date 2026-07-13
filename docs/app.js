const projects = [
  { id: "pjsk", index: "01", title: "多模态世界角色系统", en: "MULTIMODAL WORLD BUILDING", description: "把角色设定、叙事规则与视觉生成串联成可复用的创作系统，并保持跨场景的一致性。", tools: "LLM · COMFYUI · WORKFLOW", metric: "1 套系统 / 24 个场景" },
  { id: "future-film", index: "02", title: "算法之后，创意之前", en: "AFTER THE ALGORITHM", description: "一支关于人机协作的概念短片。负责叙事、分镜、生成工作流与后期节奏。", tools: "SCRIPT · VIDEO GEN · EDIT", metric: "00:48 / 12 个镜头" },
  { id: "poster", index: "03", title: "未知字体实验", en: "UNKNOWN TYPE STUDY", description: "以“问号”为视觉语法，探索生成式图像在字体、材质与版式中的可控表达。", tools: "IMAGE GEN · ART DIRECTION", metric: "8 轮迭代 / 2 个方向" },
  { id: "ai-deck", index: "04", title: "AI 产品策略提案", en: "AI PRODUCT STRATEGY", description: "从用户问题、模型能力到商业落地的完整提案，用一条清晰叙事降低复杂度。", tools: "RESEARCH · STORY · PPTX", metric: "32 页 / 3 个决策" },
  { id: "motion", index: "05", title: "生成式动态视觉", en: "GENERATIVE MOTION STUDY", description: "研究提示词、镜头运动和音乐节拍之间的映射，让随机生成拥有导演意图。", tools: "VIDU · SOUND · EDIT", metric: "01:26 / 4K" },
  { id: "research", index: "06", title: "多智能体研究报告", en: "MULTI-AGENT RESEARCH", description: "拆解协作式智能体的能力边界，以信息图和实验结果组织一份可读的技术报告。", tools: "AGENTS · DATA · PPTX", metric: "18 页 / 6 组实验" }
];

const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => header.classList.toggle("is-scrolled", window.scrollY > 24), { passive: true });

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".project-card").forEach((card) => { card.hidden = filter !== "全部" && card.dataset.category !== filter; });
  });
});

const modal = document.querySelector(".modal-backdrop");
let currentProject = null;
function showProject(project) {
  currentProject = project;
  modal.querySelector(".modal-number").textContent = `CASE / ${project.index}`;
  modal.querySelector("#case-title").textContent = project.title;
  modal.querySelector(".modal-en").textContent = project.en;
  modal.querySelector(".modal-desc").textContent = project.description;
  modal.querySelector(".modal-tools").textContent = project.tools;
  modal.querySelector(".modal-metric").textContent = project.metric;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}
function closeModal() { modal.hidden = true; document.body.style.overflow = ""; }
document.querySelectorAll("[data-project]").forEach((button) => button.addEventListener("click", () => showProject(projects.find((project) => project.id === button.dataset.project))));
modal.querySelector(".modal-close").addEventListener("click", closeModal);
modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });
modal.querySelector(".next-case").addEventListener("click", () => showProject(projects[(projects.indexOf(currentProject) + 1) % projects.length]));
window.addEventListener("keydown", (event) => { if (event.key === "Escape") closeModal(); });
