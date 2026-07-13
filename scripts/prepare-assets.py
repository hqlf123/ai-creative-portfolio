from pathlib import Path
import shutil
import subprocess

import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageOps


SOURCE = Path(r"D:\剪映\广告等最终成品")
PROJECT = Path(__file__).resolve().parents[1]
WORKSPACE = PROJECT.parent
OUTPUT = PROJECT / "public" / "assets"
CASE_PAGES = OUTPUT / "case-pages"
TMP_PDFS = WORKSPACE / "tmp" / "pdfs"

OUTPUT.mkdir(parents=True, exist_ok=True)
CASE_PAGES.mkdir(parents=True, exist_ok=True)
TMP_PDFS.mkdir(parents=True, exist_ok=True)

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
POPPLER = Path.home() / ".cache" / "codex-runtimes" / "codex-primary-runtime" / "dependencies" / "native" / "poppler" / "Library" / "bin" / "pdftoppm.exe"
PDFTOPPM = str(POPPLER if POPPLER.exists() else shutil.which("pdftoppm"))
PDFINFO_PATH = POPPLER.with_name("pdfinfo.exe")
PDFINFO = str(PDFINFO_PATH if PDFINFO_PATH.exists() else shutil.which("pdfinfo"))


VIDEOS = {
    "hero-headphones": "头戴耳机广告成品.mp4",
    "mecha-toy": "原创机甲玩具广告最终成品.mp4",
    "shishanju": "柿山居民宿广告成品.mp4",
    "green-soda": "青提汽水最终成品.mp4",
    "dumpling-brand": "饺个朋友广告成品.mp4",
    "hosiery": "丝袜广告成品.mp4",
    "game-wholesale": "买量游戏批发广告成品.mp4",
    "power-bank": "充电宝广告成品.mp4",
    "chicken-feet": "凤爪成品.mp4",
    "hanging-sword": "悬剑劫成品.mp4",
    "pocket-fighter": "成品口袋小斗.mp4",
    "wilderness-journey": "成品风野牧旅适配中年版.mp4",
    "warm-grandma": "抖音温馨奶奶小故事成品.mp4",
    "ai-news": "新闻资讯视频最终成品.mp4",
    "fantasy-arena": "虚幻竞技场成品版.mp4",
}

IMAGES = {
    "phone-detail": "手机详情页.png",
    "mouse-detail": "鼠标详情页.png",
    "magazine-cover": "杂志封面设计.png",
    "book-cover": "书籍封面设计.png",
    "homestay-visual": "民宿视觉提案风格.png",
}

PDFS = {
    "coldx": ("coldx详情页.pdf", 110, "coldx-cover"),
    "dumpling-ip": ("饺个朋友IP全案.pdf", 90, "dumpling-ip-cover"),
}


def run(command: list[str]) -> None:
    subprocess.run(command, check=True)


def video_metadata(path: Path) -> dict:
    frames = imageio_ffmpeg.read_frames(str(path))
    metadata = next(frames)
    frames.close()
    return metadata


def prepare_video(slug: str, filename: str) -> None:
    source = SOURCE / filename
    video_out = OUTPUT / f"{slug}.mp4"
    poster_out = OUTPUT / f"{slug}-poster.jpg"
    source_meta = video_metadata(source)
    width, height = source_meta["size"]
    scale = "1280:-2" if width >= height else "-2:1280"

    if not video_out.exists():
        print(f"Encoding {filename}", flush=True)
        run(
            [
                FFMPEG,
                "-hide_banner",
                "-loglevel",
                "error",
                "-i",
                str(source),
                "-vf",
                f"scale={scale}",
                "-c:v",
                "libx264",
                "-preset",
                "medium",
                "-crf",
                "25",
                "-c:a",
                "aac",
                "-b:a",
                "112k",
                "-movflags",
                "+faststart",
                "-y",
                str(video_out),
            ]
        )

    print(f"Poster {filename}", flush=True)
    run(
        [
            FFMPEG,
            "-hide_banner",
            "-loglevel",
            "error",
            "-ss",
            "2",
            "-i",
            str(source),
            "-vf",
            f"scale={scale}",
            "-frames:v",
            "1",
            "-q:v",
            "3",
            "-y",
            str(poster_out),
        ]
    )

    output_meta = video_metadata(video_out)
    duration_delta = abs(float(source_meta["duration"]) - float(output_meta["duration"]))
    if duration_delta > 0.2:
        raise RuntimeError(f"Duration mismatch for {filename}: {duration_delta:.2f}s")
    print(f"Verified {filename}: {output_meta['duration']:.2f}s", flush=True)


def save_webp(source: Path, target: Path, max_width: int, quality: int = 84) -> None:
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        if image.width > max_width:
            height = round(image.height * max_width / image.width)
            image = image.resize((max_width, height), Image.Resampling.LANCZOS)
        image.save(target, "WEBP", quality=quality, method=6)


def make_contact_sheet(images: list[Path], target: Path, title: str) -> None:
    columns = 4
    cell_width, cell_height = 320, 230
    rows = (len(images) + columns - 1) // columns
    sheet = Image.new("RGB", (columns * cell_width, rows * cell_height + 42), "#111313")
    draw = ImageDraw.Draw(sheet)
    draw.text((14, 14), f"{title} - {len(images)} pages", fill="white")
    for index, path in enumerate(images):
        with Image.open(path) as image:
            preview = image.convert("RGB")
            preview.thumbnail((cell_width - 20, cell_height - 38), Image.Resampling.LANCZOS)
            x = (index % columns) * cell_width + (cell_width - preview.width) // 2
            y = (index // columns) * cell_height + 42
            sheet.paste(preview, (x, y))
            draw.text((index % columns * cell_width + 12, y + cell_height - 32), f"PAGE {index + 1:02d}", fill="#c9ff36")
    sheet.save(target, "JPEG", quality=90)


def pdf_page_count(source: Path) -> int:
    result = subprocess.run(
        [PDFINFO, str(source)],
        check=True,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
    )
    for line in result.stdout.splitlines():
        if line.startswith("Pages:"):
            return int(line.split(":", 1)[1].strip())
    raise RuntimeError(f"Could not determine page count for {source.name}")


def prepare_pdf(slug: str, filename: str, dpi: int, cover_slug: str) -> None:
    source = SOURCE / filename
    page_count = pdf_page_count(source)
    render_dir = TMP_PDFS / slug
    render_dir.mkdir(parents=True, exist_ok=True)

    for old_page in render_dir.glob("page-*.jpg"):
        old_page.unlink()
    for old_page in CASE_PAGES.glob(f"{slug}-*.webp"):
        old_page.unlink()

    print(f"Rendering {filename}: {page_count} pages", flush=True)
    run(
        [
            PDFTOPPM,
            "-f",
            "1",
            "-l",
            str(page_count),
            "-jpeg",
            "-jpegopt",
            "quality=92",
            "-r",
            str(dpi),
            str(source),
            str(render_dir / "page"),
        ]
    )

    rendered = sorted(render_dir.glob("page-*.jpg"))
    if len(rendered) != page_count:
        raise RuntimeError(f"Missing pages in {filename}: expected {page_count}, got {len(rendered)}")

    for index, page in enumerate(rendered, start=1):
        save_webp(page, CASE_PAGES / f"{slug}-{index:02d}.webp", 1800, quality=83)
    save_webp(rendered[0], OUTPUT / f"{cover_slug}.webp", 1600, quality=86)
    make_contact_sheet(rendered, TMP_PDFS / f"{slug}-contact.jpg", slug)
    print(f"Verified {filename}: all {page_count} pages", flush=True)


for video_slug, video_filename in VIDEOS.items():
    prepare_video(video_slug, video_filename)

for image_slug, image_filename in IMAGES.items():
    print(f"Optimizing {image_filename}", flush=True)
    width = 1100 if image_slug == "homestay-visual" else 1600
    save_webp(SOURCE / image_filename, OUTPUT / f"{image_slug}.webp", width)

for pdf_slug, (pdf_filename, pdf_dpi, pdf_cover) in PDFS.items():
    prepare_pdf(pdf_slug, pdf_filename, pdf_dpi, pdf_cover)

print(f"Assets ready in {OUTPUT}", flush=True)
