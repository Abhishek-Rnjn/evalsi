import { forwardRef, useRef, type ReactNode } from "react";
import { Activity, Bot, GitPullRequest, Network, FlaskConical, BarChart3, Gauge, LayoutDashboard } from "lucide-react";
import { AnimatedBeam } from "./ui/animated-beam";
import { cn } from "../lib/utils";

const Node = forwardRef<HTMLDivElement, { className?: string; children: ReactNode; label: string }>(
  ({ className, children, label }, ref) => (
    <div className="flex flex-col items-center gap-2">
      <div
        ref={ref}
        className={cn(
          "z-10 flex size-12 items-center justify-center rounded-full border border-gray-200 bg-white p-3 dark:border-white/10 dark:bg-[#0b0d17]",
          className,
        )}
      >
        {children}
      </div>
      <span className="max-w-[7rem] text-center text-xs font-medium text-gray-600 dark:text-gray-400">{label}</span>
    </div>
  ),
);
Node.displayName = "Node";

const icon = "size-[18px] text-gray-600 dark:text-gray-200";

export default function ArchitectureBeams() {
  const container = useRef<HTMLDivElement>(null);
  const center = useRef<HTMLDivElement>(null);
  const ins = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const outs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  const inputs = [
    { label: "Your agent or harness", el: <Bot className={icon} /> },
    { label: "agentgateway", el: <Network className={icon} /> },
    { label: "OTel traces and trace stores", el: <Activity className={icon} /> },
    { label: "CI pipelines", el: <GitPullRequest className={icon} /> },
  ];
  const outputs = [
    { label: "MLflow", el: <FlaskConical className={icon} /> },
    { label: "Langfuse · Phoenix", el: <BarChart3 className={icon} /> },
    { label: "Grafana", el: <Gauge className={icon} /> },
    { label: "Web UI", el: <LayoutDashboard className={icon} /> },
  ];

  return (
    <div ref={container} className="relative flex w-full items-center justify-between gap-4 overflow-hidden px-2 py-6 sm:px-10">
      <div className="flex flex-col justify-center gap-6">
        {inputs.map((n, i) => <Node key={n.label} ref={ins[i]} label={n.label}>{n.el}</Node>)}
      </div>
      <div className="flex flex-col items-center gap-3">
        <div
          ref={center}
          className="z-10 flex size-20 items-center justify-center rounded-2xl bg-teal-700 sm:size-24"
        >
          <svg viewBox="0 0 40 40" className="size-10 sm:size-12" aria-hidden="true">
            <path d="M10 21.5l7 7L30 13" fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="text-sm font-semibold">Evalsi</span>
        <span className="hidden text-center text-xs text-gray-500 sm:block dark:text-gray-400">Score · Run · Watch · Reward</span>
      </div>
      <div className="flex flex-col justify-center gap-6">
        {outputs.map((n, i) => <Node key={n.label} ref={outs[i]} label={n.label}>{n.el}</Node>)}
      </div>

      {ins.map((r, i) => (
        <AnimatedBeam key={`i${i}`} containerRef={container} fromRef={r} toRef={center} curvature={(1.5 - i) * 40} pathColor="#9ca3af" pathOpacity={0.5} />
      ))}
      {outs.map((r, i) => (
        <AnimatedBeam key={`o${i}`} containerRef={container} fromRef={center} toRef={r} curvature={(1.5 - i) * -40} pathColor="#9ca3af" pathOpacity={0.5} />
      ))}
    </div>
  );
}
