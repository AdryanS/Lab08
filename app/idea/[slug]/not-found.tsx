import Link from 'next/link'

export default function IdeaNotFound() {
  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(42,42,42,1) 1px, transparent 1px), linear-gradient(90deg, rgba(42,42,42,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="relative text-center">
        <p className="font-[Geist_Mono] text-[10px] tracking-widest text-[#444444] mb-4">
          ERROR 404
        </p>
        <h1 className="font-ibm-mono text-3xl font-semibold tracking-wider text-white mb-2">
          IDEA NOT FOUND
        </h1>
        <p className="font-[Geist_Mono] text-[11px] tracking-wide text-[#666666] mb-8">
          The idea you are looking for does not exist or the URL is invalid.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex h-11 items-center justify-center border border-[#333333] px-6 font-ibm-mono text-[11px] tracking-wider text-white hover:bg-white/5 transition-colors"
        >
          ← BACK TO GENERATOR
        </Link>
      </div>
    </div>
  )
}
