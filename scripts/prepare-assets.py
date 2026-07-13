from pathlib import Path
import subprocess

import imageio_ffmpeg
from PIL import Image, ImageOps


SOURCE = Path(r"G:\AIGC\广告等最终成品")
OUTPUT = Path(__file__).resolve().parents[1] / "public" / "assets"
OUTPUT.mkdir(parents=True, exist_ok=True)

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()


VIDEOS = {
    "hero-headphones": "头戴耳机广告成品.mp4",
    "mecha-toy": "原创机甲玩具广告最终成品.mp4",
    "shishanju": "柿山居民宿广告成品.mp4",
    "green-soda": "青提汽水最终成品.mp4",
    "dumpling-brand": "饺个朋友广告成品.mp4",
}

IMAGES = {
    "phone-detail": "手机详情页.png",
    "mouse-detail": "鼠标详情页.png",
    "magazine-cover": "杂志封面设计.png",
    "book-cover": "书籍封面设计.png",
    "homestay-visual": "民宿视觉提案风格.png",
}


def run(command: list[str]) -> None:
    subprocess.run(command, check=True)


def prepare_video(slug: str, filename: str) -> None:
    source = SOURCE / filename
    video_out = OUTPUT / f"{slug}.mp4"
    poster_out = OUTPUT / f"{slug}-poster.jpg"

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
                "scale=1280:-2",
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
            "scale=1600:-2",
            "-frames:v",
            "1",
            "-q:v",
            "3",
            "-y",
            str(poster_out),
        ]
    )


def save_webp(source: Path, target: Path, max_width: int) -> None:
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        if image.width > max_width:
            height = round(image.height * max_width / image.width)
            image = image.resize((max_width, height), Image.Resampling.LANCZOS)
        image.save(target, "WEBP", quality=84, method=6)


for video_slug, video_filename in VIDEOS.items():
    prepare_video(video_slug, video_filename)

for image_slug, image_filename in IMAGES.items():
    print(f"Optimizing {image_filename}", flush=True)
    width = 900 if image_slug == "homestay-visual" else 1600
    save_webp(SOURCE / image_filename, OUTPUT / f"{image_slug}.webp", width)

pdf_covers = {
    "coldx-cover": Path(__file__).resolve().parents[2] / "tmp" / "pdfs" / "coldx-01.jpg",
    "dumpling-ip-cover": Path(__file__).resolve().parents[2] / "tmp" / "pdfs" / "jiao-01.jpg",
}

for cover_slug, cover_source in pdf_covers.items():
    print(f"Optimizing {cover_source.name}", flush=True)
    save_webp(cover_source, OUTPUT / f"{cover_slug}.webp", 1600)

print(f"Assets ready in {OUTPUT}", flush=True)
