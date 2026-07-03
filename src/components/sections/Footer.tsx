import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[var(--border)] bg-[#070a12]/70 backdrop-blur-md">
      <div className="section-shell py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-display font-medium text-[14px] text-[var(--text)]">
          fakhrul<span className="text-[var(--accent)]">.</span>azim
        </div>

        <p className="text-[13px] text-[var(--text-faint)] text-center">
          © {year} Fakhrul Azim Bin Ahmed Mardzukie · Kuala Lumpur, Malaysia
        </p>

        <a
          href="mailto:fakhrulazim.am@gmail.com"
          className="text-[13px] text-[var(--text-soft)] hover:text-[var(--accent)] transition-colors"
        >
          fakhrulazim.am@gmail.com
        </a>
      </div>
    </footer>
  );
}
