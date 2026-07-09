import Link from 'next/link'
import { Hero } from '@/components/landing/hero'
import { FeatureCards } from '@/components/landing/feature-cards'
import { ExampleIdea } from '@/components/landing/example-idea'

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#000000] px-8 py-8">
      {/* Grid overlay */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(42,42,42,1) 1px, transparent 1px), linear-gradient(90deg, rgba(42,42,42,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-ibm-mono text-xs font-semibold tracking-widest text-white">
            ✦ INDIE GEN
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#00E5A0]" />
        </div>
        <nav className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="flex h-10 items-center justify-center border border-[#333333] px-5 font-ibm-mono text-[11px] tracking-wider text-white hover:bg-white/5 transition-colors"
          >
            GET STARTED
          </Link>
        </nav>
      </header>

      {/* Main content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-16 pb-20">
        <Hero />
        <FeatureCards />
        <ExampleIdea />
      </div>

      {/* Footer */}
      <footer className="relative z-10 flex items-center justify-center py-6">
        <span className="font-[Geist_Mono] text-[9px] tracking-widest text-[#333333]">
          INDIE GAME IDEA GENERATOR &copy; 2026 &mdash; BUILT FOR CREATORS
        </span>
      </footer>
    </div>
  )
}
