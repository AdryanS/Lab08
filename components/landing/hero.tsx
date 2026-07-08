import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center gap-4 pt-20 pb-8">
      <div className="inline-flex items-center gap-1.5 border border-[#2A2A2A] px-3.5 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#00E5A0]" />
        <span className="font-[Geist_Mono] text-[10px] tracking-widest text-[#00E5A0]">
          INDIE DEV TOOL
        </span>
      </div>

      <h1 className="max-w-[700px] text-center font-ibm-mono text-[52px] font-bold leading-[1.1] tracking-tight text-white">
        INDIE GAME IDEA
        <br />
        GENERATOR
      </h1>

      <p className="max-w-[640px] text-center font-[Geist] text-[15px] leading-relaxed text-[#666666]">
        Generate unique indie game ideas in seconds. Break creative blocks with randomized mechanics,
        stories, gameplay loops and AI-assisted game design.
      </p>

      <div className="mt-2 flex items-center gap-4">
        <Link
          href="/dashboard"
          className="flex h-14 w-[200px] items-center justify-center bg-[#FF6B00] font-ibm-mono text-[13px] font-semibold tracking-[3px] text-black transition-opacity hover:opacity-90"
        >
          GENERATE IDEA
        </Link>
        <Link
          href="#features"
          className="flex h-11 w-[180px] items-center justify-center border border-[#333333] font-ibm-mono text-[12px] font-medium tracking-wider text-white transition-colors hover:bg-white/5"
        >
          HOW IT WORKS
        </Link>
      </div>
    </section>
  )
}
