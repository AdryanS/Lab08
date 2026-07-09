import { Zap, Download, Bookmark } from 'lucide-react'

const features = [
  { icon: Zap, color: '#00E5A0', title: 'ENDLESS COMBOS', desc: 'Over 10 billion possible combinations across 12 categories' },
  { icon: Download, color: '#3B82F6', title: 'EXPORT ANYWHERE', desc: 'Export to Markdown or JSON instantly' },
  { icon: Bookmark, color: '#00E5A0', title: 'SAVE IDEAS', desc: 'Save your favorites and revisit them anytime' },
]

export function FeatureCards() {
  return (
    <section id="features" className="relative z-10 flex flex-col items-center gap-6">
      <h2 className="font-ibm-mono text-lg font-semibold tracking-wider text-white">
        FEATURES
      </h2>
      <div className="flex gap-5">
        {features.map((f, i) => {
          const Icon = f.icon
          return (
            <div
              key={i}
              className="flex w-[340px] flex-col gap-3 border border-[#2A2A2A] bg-[#1A1A1A] p-5"
            >
              <Icon size={24} style={{ color: f.color }} />
              <span className="font-ibm-mono text-xs font-semibold tracking-wider text-white">
                {f.title}
              </span>
              <span className="font-[Geist] text-[11px] leading-relaxed text-[#666666]">
                {f.desc}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
