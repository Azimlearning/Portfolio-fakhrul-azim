'use client';

import React from 'react';
import { tools } from '@/data/tools';
import type { Tool } from '@/data/tools';

function ToolChip({ tool }: { tool: Tool }) {
  return (
    <span
      className="group flex items-center gap-2.5 shrink-0 rounded-full border border-[var(--border)] bg-white/[0.02] px-4 py-2 transition-colors hover:border-[var(--accent-line)] hover:bg-[var(--accent-dim)]"
      title={tool.name}
    >
      <svg
        role="img"
        aria-hidden
        viewBox="0 0 24 24"
        className="w-4 h-4 fill-[var(--text-faint)] transition-colors group-hover:fill-[var(--accent)]"
      >
        <path d={tool.icon.path} />
      </svg>
      <span className="text-[12.5px] whitespace-nowrap text-[var(--text-soft)] transition-colors group-hover:text-[var(--text)]">
        {tool.name}
      </span>
    </span>
  );
}

/** Two counter-scrolling rows of tool chips; masked edges, pause on hover. */
export default function ToolsMarquee() {
  const mid = Math.ceil(tools.length / 2);
  const rowA = [...tools.slice(0, mid), ...tools.slice(0, mid)];
  const rowB = [...tools.slice(mid), ...tools.slice(mid)];

  return (
    <section aria-label="Tools and platforms" className="w-full py-10">
      <div className="section-shell mb-5">
        <span className="label-mono">Tools I work with</span>
      </div>
      <div className="space-y-3">
        <div className="marquee" style={{ '--marquee-duration': '52s' } as React.CSSProperties}>
          <div className="marquee-track items-center gap-3 pr-3">
            {rowA.map((tool, i) => (
              <ToolChip key={`a-${tool.name}-${i}`} tool={tool} />
            ))}
          </div>
        </div>
        <div className="marquee" style={{ '--marquee-duration': '64s' } as React.CSSProperties}>
          <div className="marquee-track is-reverse items-center gap-3 pr-3">
            {rowB.map((tool, i) => (
              <ToolChip key={`b-${tool.name}-${i}`} tool={tool} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
