import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicAssets = path.join(projectRoot, "public", "assets");
const docsAssets = path.join(projectRoot, "docs", "assets");

const videoSlugs = [
  "hero-headphones",
  "mecha-toy",
  "shishanju",
  "green-soda",
  "dumpling-brand",
  "hosiery",
  "game-wholesale",
  "power-bank",
  "chicken-feet",
  "hanging-sword",
  "pocket-fighter",
  "wilderness-journey",
  "warm-grandma",
  "ai-news",
  "fantasy-arena",
];

const imageSlugs = [
  "phone-detail.webp",
  "mouse-detail.webp",
  "magazine-cover.webp",
  "book-cover.webp",
  "homestay-visual.webp",
];

const phoneDetailAssets = [
  "phone-v2-hero.png",
  "phone-v2-performance.png",
  "phone-v2-camera.png",
  "phone-v2-durability.png",
];

const projectIds = [
  "headphones", "mecha", "shishanju-film", "phone-detail", "dumpling-ip", "magazine-cover",
  "coldx-detail", "mouse-detail", "shishanju-visual", "book-cover", "hosiery-film", "game-wholesale",
  "power-bank", "chicken-feet", "hanging-sword", "pocket-fighter", "wilderness-journey", "warm-grandma",
  "ai-news", "fantasy-arena", "green-soda", "dumpling-film",
];

function assertFile(file) {
  assert.ok(fs.existsSync(file), `Missing file: ${file}`);
  assert.ok(fs.statSync(file).size > 0, `Empty file: ${file}`);
}

test("all 15 complete videos and posters are present in source and GitHub build", () => {
  assert.equal(videoSlugs.length, 15);
  for (const slug of videoSlugs) {
    for (const suffix of [".mp4", "-poster.jpg"]) {
      assertFile(path.join(publicAssets, `${slug}${suffix}`));
      assertFile(path.join(docsAssets, `${slug}${suffix}`));
    }
  }
});

test("all five complete image works are present", () => {
  assert.equal(imageSlugs.length, 5);
  for (const filename of imageSlugs) {
    assertFile(path.join(publicAssets, filename));
    assertFile(path.join(docsAssets, filename));
  }
});

test("future imaging detail page uses sharp text layers and generated visuals", () => {
  const source = fs.readFileSync(path.join(projectRoot, "app", "page.tsx"), "utf8");
  for (const filename of phoneDetailAssets) {
    assertFile(path.join(publicAssets, filename));
    assertFile(path.join(docsAssets, filename));
  }
  assert.ok(source.includes("function PhoneDetailPage()"), "Missing rebuilt phone detail page");
  assert.ok(source.includes("未来影像"), "Phone headline must stay as native text");
  assert.ok(source.includes("Snapdragon 8 Gen 3"), "Performance claims must stay as native text");
  assert.ok(source.includes("VITARA X1 Pro"), "Product model must stay as native text");
});

test("PDF proposals contain every sequential page", () => {
  const pageSets = { coldx: 11, "dumpling-ip": 17 };
  for (const [prefix, count] of Object.entries(pageSets)) {
    for (let page = 1; page <= count; page += 1) {
      const filename = `${prefix}-${String(page).padStart(2, "0")}.webp`;
      assertFile(path.join(publicAssets, "case-pages", filename));
      assertFile(path.join(docsAssets, "case-pages", filename));
    }
    const publicPages = fs.readdirSync(path.join(publicAssets, "case-pages")).filter((name) => name.startsWith(`${prefix}-`));
    const docsPages = fs.readdirSync(path.join(docsAssets, "case-pages")).filter((name) => name.startsWith(`${prefix}-`));
    assert.equal(publicPages.length, count, `${prefix} public page count mismatch`);
    assert.equal(docsPages.length, count, `${prefix} GitHub page count mismatch`);
  }
});

test("all 22 projects are registered in the portfolio", () => {
  const source = fs.readFileSync(path.join(projectRoot, "app", "page.tsx"), "utf8");
  assert.equal(projectIds.length, 22);
  for (const id of projectIds) {
    assert.ok(source.includes(`id: "${id}"`), `Missing project registration: ${id}`);
  }
});

test("full case artwork is always rendered without cropping", () => {
  const source = fs.readFileSync(path.join(projectRoot, "app", "page.tsx"), "utf8");
  const styles = fs.readFileSync(path.join(projectRoot, "app", "globals.css"), "utf8");

  assert.ok(source.includes('className="media-artwork"'), "Every cover must use the shared artwork class");
  assert.match(styles, /\.case-image-frame img\s*\{[^}]*object-fit:\s*contain/s);
  assert.match(styles, /\.case-pages img\s*\{[^}]*object-fit:\s*contain/s);
});

test("all 22 projects have an intentional cover orientation", () => {
  const source = fs.readFileSync(path.join(projectRoot, "app", "page.tsx"), "utf8");
  const styles = fs.readFileSync(path.join(projectRoot, "app", "globals.css"), "utf8");
  const wilderness = source.match(/id: "wilderness-journey"[\s\S]*?deliverable:/)?.[0] ?? "";
  const formats = [...source.matchAll(/coverFormat: "(landscape|portrait|vertical)"/g)].map((match) => match[1]);

  assert.ok(!wilderness.includes("portrait: true"), "Wilderness Journey must open and display as landscape");
  assert.ok(wilderness.includes('coverFormat: "landscape"'), "Wilderness Journey needs a landscape cover");
  assert.equal(formats.length, 22, "Every project needs a cover format");
  assert.equal(formats.filter((format) => format === "landscape").length, 13);
  assert.equal(formats.filter((format) => format === "portrait").length, 4);
  assert.equal(formats.filter((format) => format === "vertical").length, 5);
  assert.ok(source.includes("project-${project.id}"), "Featured cards need stable project-specific classes");
  assert.ok(source.includes("archive-${project.id}"), "Archive cards need stable project-specific classes");
  assert.match(styles, /\.media-stage\.cover-landscape\s*\{[^}]*aspect-ratio:\s*16 \/ 9;/s);
  assert.match(styles, /\.media-stage\.cover-portrait\s*\{[^}]*aspect-ratio:\s*3 \/ 4;/s);
  assert.match(styles, /\.media-stage\.cover-vertical\s*\{[^}]*aspect-ratio:\s*9 \/ 16;/s);
  assert.match(styles, /\.media-stage\s*\{[^}]*padding:\s*0;/s);
  assert.match(styles, /\.media-stage \.media-artwork,[\s\S]*?object-fit:\s*cover;/s);
});

test("cover hover previews support video, image, and page projects", () => {
  const source = fs.readFileSync(path.join(projectRoot, "app", "page.tsx"), "utf8");
  const styles = fs.readFileSync(path.join(projectRoot, "app", "globals.css"), "utf8");

  assert.ok(source.includes("function useCoverPreview"), "Missing shared hover preview behavior");
  assert.ok(source.includes('className="media-video-preview"'), "Video cards need an inline preview layer");
  assert.ok(source.includes("muted"), "Video previews must be muted");
  assert.ok(source.includes("playsInline"), "Video previews must play inline");
  assert.ok(source.includes('preload="none"'), "Video previews must not preload every full film");
  assert.ok(source.includes("media-secondary-artwork"), "Image and page projects need a secondary preview layer");
  assert.ok(source.includes("onMouseEnter: startPreview"), "Desktop hover must start previews");
  assert.match(styles, /\.media-stage\.is-previewing \.media-video-preview\s*\{[^}]*opacity:\s*1;/s);
  assert.match(styles, /\.media-stage\.is-long-artwork\.is-previewing \.media-artwork\s*\{[^}]*animation:\s*cover-pan/s);
});

test("every card renders a visible editorial cover identity", () => {
  const source = fs.readFileSync(path.join(projectRoot, "app", "page.tsx"), "utf8");
  const styles = fs.readFileSync(path.join(projectRoot, "app", "globals.css"), "utf8");

  assert.ok(source.includes("function CoverIdentity"), "Missing shared cover identity component");
  assert.ok(source.includes("<strong>{project.title}</strong>"), "Covers must show each project title");
  assert.ok(source.includes("<em>{project.english}</em>"), "Covers must show each English project name");
  assert.ok(source.includes("<small>{project.category}</small>"), "Covers must show each project category");
  assert.equal((source.match(/<CoverIdentity project=\{project\} \/>/g) ?? []).length, 2, "Featured and archive cards both need cover identities");
  assert.match(styles, /\.cover-identity\s*\{[^}]*background:\s*linear-gradient/s);
  assert.match(styles, /\.media-stage\.is-previewing \.cover-identity\s*\{[^}]*opacity:\s*0;/s);
});

test("the portfolio has a dedicated social cover", () => {
  const html = fs.readFileSync(path.join(projectRoot, "github", "index.html"), "utf8");

  assertFile(path.join(projectRoot, "public", "og.png"));
  assertFile(path.join(projectRoot, "docs", "og.png"));
  assert.ok(html.includes("https://hqlf123.github.io/ai-creative-portfolio/og.png"));
});

test("portfolio categories are complete and returning preserves context", () => {
  const source = fs.readFileSync(path.join(projectRoot, "app", "page.tsx"), "utf8");
  const expectedCounts = {
    "横屏商业广告": 7,
    "竖屏抖音爆款": 5,
    "自媒体资讯内容": 1,
    "漫剧作品": 2,
    "商业详情": 4,
    "品牌全案": 1,
    "平面设计": 2,
  };

  assert.ok(!source.includes('["全部",'), "The removed all-category filter must not return");
  for (const [group, count] of Object.entries(expectedCounts)) {
    const matches = source.match(new RegExp(`group: "${group}"`, "g")) ?? [];
    assert.equal(matches.length, count, `${group} project count mismatch`);
  }
  assert.ok(source.includes('project.group === filter'), "Archive must include featured brand projects in their category");
  assert.ok(source.includes('portfolio:return-y'), "Missing return-position persistence");
  assert.ok(source.includes('portfolio:filter'), "Missing category persistence");
  assert.ok(source.includes("返回原浏览位置"), "Case back action must explain preserved position");
});
