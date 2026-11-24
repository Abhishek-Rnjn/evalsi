// Renders public/og.png, the 1200x630 card that link previews (Open Graph,
// X/Twitter, Slack, LinkedIn) show for every page. Social sites do not render
// SVG, hence a PNG, committed so the site build needs no fonts. Run again
// after changing the text: node scripts/og-image.mjs (needs the Inter font).
import sharp from "sharp";
import { fileURLToPath } from "node:url";

const out = fileURLToPath(new URL("../public/og.png", import.meta.url));

const pills = ["Run", "Watch", "Score", "Reward"];
const pill = (label, i) => {
  const x = 96 + i * 168;
  return `<rect x="${x}" y="470" width="150" height="54" rx="12" fill="#ffffff" fill-opacity="0.04" stroke="#ffffff" stroke-opacity="0.12"/>
  <text x="${x + 75}" y="505" text-anchor="middle" font-size="24" font-weight="500" fill="#eef0f5">${label}</text>`;
};

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0b0d14"/>
  <g font-family="Inter, sans-serif">
    <rect x="96" y="96" width="88" height="88" rx="22" fill="#0f766e"/>
    <path d="M118 141l18 18 29-38" fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="212" y="166" font-size="72" font-weight="600" fill="#eef0f5">Evalsi</text>
    <text x="96" y="290" font-size="46" font-weight="500" fill="#eef0f5">Evaluate AI before you ship,</text>
    <text x="96" y="350" font-size="46" font-weight="500" fill="#eef0f5">while it runs, and as you train it</text>
    <text x="96" y="412" font-size="28" font-weight="400" fill="#a3a9b8">Agents · RAG · LLMs · RL training · pip install evalsi</text>
    ${pills.map(pill).join("\n    ")}
    <text x="1104" y="574" text-anchor="end" font-size="22" font-weight="400" fill="#7a8296">github.com/Abhishek-Rnjn/evalsi</text>
  </g>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
console.log(`wrote ${out}`);
