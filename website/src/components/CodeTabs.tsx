import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "../lib/utils";

export interface CodeTab { label: string; lang: string; code: string }

export default function CodeTabs({ tabs }: { tabs: CodeTab[] }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(tabs[active].code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50/80 px-3">
        <div role="tablist" className="flex">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={cn(
                "relative px-3 py-3 text-xs font-medium transition-colors sm:text-sm",
                i === active ? "text-gray-900" : "text-gray-500 hover:text-gray-800",
              )}
            >
              {t.label}
              {i === active && <span className="absolute inset-x-3 -bottom-px h-px bg-gray-900" />}
            </button>
          ))}
        </div>
        <button onClick={copy} aria-label="Copy code" className="rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900">
          {copied ? <Check className="size-4 text-teal-700" /> : <Copy className="size-4" />}
        </button>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-gray-700"><code>{tabs[active].code}</code></pre>
    </div>
  );
}
