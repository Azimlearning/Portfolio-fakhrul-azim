import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] px-6 text-center">
      <p className="label-mono !text-[var(--accent)] mb-4">404</p>
      <h1 className="display-xl text-gradient text-4xl sm:text-6xl mb-4">
        This page doesn&apos;t exist.
      </h1>
      <p className="text-[15px] text-[var(--text-soft)] mb-9 max-w-[40ch]">
        The link may be outdated, or the page may have moved.
      </p>
      <Link href="/" className="btn btn-primary">
        Back to portfolio
      </Link>
    </div>
  );
}
