// Ported from Easy UI (components/magicui/bento-grid.tsx), MIT. See THIRD_PARTY_NOTICES.md.
// Static: the call to action is always shown, and nothing moves on hover.
import type { ComponentType, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

export function BentoGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("grid w-full auto-rows-[23rem] grid-cols-1 gap-4 md:auto-rows-[20rem] md:grid-cols-3", className)}>{children}</div>;
}

interface BentoCardProps {
  name: string;
  className?: string;
  background?: ReactNode;
  // Accepted for compatibility; the illustration carries the card, so no icon is drawn.
  Icon?: ComponentType<{ className?: string; strokeWidth?: number }>;
  description: string;
  href: string;
  cta: string;
}

export function BentoCard({ name, className, background, description, href, cta }: BentoCardProps) {
  return (
    <a
      href={href}
      className={cn(
        "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white transition-colors hover:border-gray-400",
        "dark:border-white/10 dark:bg-white/[.02]",
        className,
      )}
    >
      <div className="absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,#000_40%,transparent_68%)]">{background}</div>
      <div className="z-10 mt-auto flex flex-col gap-1 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{name}</h3>
        <p className="max-w-lg text-sm leading-relaxed text-gray-600 dark:text-gray-400">{description}</p>
        <span className="mt-2 inline-flex items-center text-sm font-medium text-teal-700 dark:text-teal-300">
          {cta}
          <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </a>
  );
}
