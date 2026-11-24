import { Activity, Gauge, Play, Trophy } from "lucide-react";

export default function Doors({ base }: { base: string }) {
  const doors = [
    { Icon: Play, name: "Run", tag: "evalsi run", text: "Run an agent on sandboxed tasks, or a RAG pipeline or model on a dataset. Trials, gates and budgets fail the build when it gets worse.", href: `${base}/docs/guides/gate-an-agent-in-ci/` },
    { Icon: Activity, name: "Watch", tag: "evalsi policy", text: "Continuously evaluate live agent traces, sent over OpenTelemetry or read from MLflow, Phoenix and Langfuse, with sampling, cascades, windowed alerts and promotion to datasets.", href: `${base}/docs/guides/agent-frameworks/` },
    { Icon: Gauge, name: "Score", tag: "evalsi eval", text: "Grade agent runs, RAG answers and outputs you already have. Every mean ships with a confidence interval; records an evaluator can't judge are skipped, never scored zero.", href: `${base}/docs/get-started/` },
    { Icon: Trophy, name: "Reward", tag: "RewardService", text: "Evaluators as RL rewards for TRL, verl and OpenRLHF, and every checkpoint checked against the base model.", href: `${base}/docs/guides/fine-tuning/` },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {doors.map(({ Icon, ...d }) => (
        <a key={d.name} href={d.href} className="flex h-full flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-6 transition-colors hover:border-gray-400 dark:border-white/10 dark:bg-white/[.02]">
          <div className="flex items-center justify-between">
            <Icon className="size-[18px] text-gray-500" strokeWidth={1.5} />
            <code className="rounded-md bg-gray-100 px-2 py-0.5 font-mono text-xs text-gray-500 dark:bg-white/5 dark:text-gray-400">{d.tag}</code>
          </div>
          <h3 className="text-lg font-semibold">{d.name}</h3>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{d.text}</p>
        </a>
      ))}
    </div>
  );
}
