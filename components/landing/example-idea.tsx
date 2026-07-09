const examples = [
  ['GENRE', 'Roguelite'],
  ['GAMEPLAY', 'Parkour'],
  ['GRAPHICS', 'Low Poly'],
  ['STORY', 'Dream World'],
  ['HOOK', 'Time stops when\nyou stop moving'],
]

export function ExampleIdea() {
  return (
    <section className="relative z-10 flex flex-col items-center gap-5">
      <h2 className="font-ibm-mono text-sm font-semibold tracking-wider text-white">
        EXAMPLE IDEA
      </h2>
      <div className="flex border border-[#2A2A2A] bg-[#1A1A1A] p-4">
        {examples.map(([cat, val]) => (
          <div key={cat} className="flex flex-col gap-1.5 px-4 py-3">
            <span className="font-[Geist_Mono] text-[9px] tracking-widest text-[#444444]">
              {cat}
            </span>
            <span className="max-w-[170px] whitespace-pre-line font-ibm-mono text-sm font-semibold text-white leading-tight">
              {val}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
