import sharp from "sharp";
import { mkdirSync } from "fs";
import { join } from "path";

const root = "D:\\Cẩm Nang Hàn";
const outDir = join(root, "public", "icons");
mkdirSync(outDir, { recursive: true });

// 도장(seal) 모티프: 종이 배경 + 이중 원 + CNH
// 텍스트는 폰트 의존을 피하려고 path로 그리지 않고 text 사용하되,
// pango가 렌더링하므로 sans-serif bold로 지정
function sealSvg({ size, safe }) {
  // safe: maskable용이면 콘텐츠를 중앙 80% 안에 넣음
  const s = size;
  const cx = s / 2;
  const scale = safe ? 0.72 : 0.88;
  const rOuter = (s / 2) * scale * 0.82;
  const rInner = rOuter * 0.84;
  const strokeOuter = s * 0.028;
  const strokeInner = s * 0.014;
  const fontSize = rInner * 0.62;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
  <rect width="${s}" height="${s}" fill="#F6F1E4"/>
  <circle cx="${cx}" cy="${cx}" r="${rOuter}" fill="none" stroke="#B7292F" stroke-width="${strokeOuter}"/>
  <circle cx="${cx}" cy="${cx}" r="${rInner}" fill="none" stroke="#B7292F" stroke-width="${strokeInner}"/>
  <text x="${cx}" y="${cx + fontSize * 0.36}" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="800" fill="#B7292F" text-anchor="middle" letter-spacing="${fontSize * 0.02}">CNH</text>
</svg>`;
}

async function render(svg, out, size) {
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(out);
  console.log("wrote", out);
}

await render(sealSvg({ size: 512, safe: false }), join(outDir, "icon-512.png"), 512);
await render(sealSvg({ size: 512, safe: false }), join(outDir, "icon-192.png"), 192);
await render(sealSvg({ size: 512, safe: true }), join(outDir, "icon-maskable-512.png"), 512);
await render(sealSvg({ size: 512, safe: true }), join(outDir, "icon-maskable-192.png"), 192);
await render(sealSvg({ size: 512, safe: false }), join(root, "public", "apple-touch-icon.png"), 180);
console.log("done");
