import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#000000] px-8">
      {/* Grid overlay */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(42,42,42,1) 1px, transparent 1px), linear-gradient(90deg, rgba(42,42,42,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <span className="font-ibm-mono text-[72px] font-bold tracking-tighter text-white">
          404
        </span>
        <span className="font-ibm-mono text-sm font-semibold tracking-wider text-[#FF6B00]">
          PAGE NOT FOUND
        </span>
        <p className="font-[Geist] text-sm text-[#666666] text-center max-w-sm">
          This page doesn&apos;t exist. The idea may have been deleted or the link is invalid.
        </p>
        <Link
          href="/dashboard"
          className="flex h-11 items-center justify-center border border-[#333333] px-6 font-ibm-mono text-[11px] tracking-wider text-white hover:bg-white/5 transition-colors"
        >
          ← BACK TO DASHBOARD
        </Link>
      </div>
    </div>
  )
}
