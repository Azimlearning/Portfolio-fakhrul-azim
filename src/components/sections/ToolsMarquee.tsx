'use client';

import React from 'react';
import { tools } from '@/data/tools';

/** Thin auto-scrolling strip of the tools & platforms I work with.
    Pauses on hover; masked edges; content duplicated for a seamless loop. */
export default function ToolsMarquee() {
  const items = [...tools, ...tools]; // ×2 for the -50% slide loop

  return (
    <section aria-label="Tools and platforms" className="w-full py-6">
      <div className="border-y border-[var(--border)] bg-white/[0.015] py-5">
        <div className="marquee" style={{ '--marquee-duration': '46s' } as React.CSSProperties}>
          <div className="marquee-track items-center gap-10 px-5">
            {items.map((tool, i) => (
              <span
                key={`${tool.name}-${i}`}
                className="flex items-center gap-2.5 shrink-0 text-[var(--text-faint)] transition-colors hover:text-[var(--text)]"
                title={tool.name}
              >
                <svg
                  role="img"
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="w-[18px] h-[18px] fill-current opacity-80"
                >
                  <path d={tool.icon.path} />
                </svg>
                <span className="text-[13px] whitespace-nowrap">{tool.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
