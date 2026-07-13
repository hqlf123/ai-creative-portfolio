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
