import {
  Zap,
  Bot,
  Download,
  Bookmark,
  Share2,
  Map,
} from 'lucide-react'

const features = [
  { icon: Zap, color: '#00E5A0', title: 'ENDLESS COMBOS', desc: 'Over 10 billion possible combinations across 12 categories' },
  { icon: Bot, color: '#FF6B00', title: 'AI GDD GENERATOR', desc: 'Full Game Design Documents with AI-assisted generation' },
  { icon: Download, color: '#3B82F6', title: 'EXPORT ANYWHERE', desc: 'Export to Markdown, JSON, PDF, or PNG instantly' },
  { icon: Bookmark, color: '#00E5A0', title: 'SAVE IDEAS', desc: 'Save your favorites and revisit them anytime' },
  { icon: Share2, color: '#FF6B00', title: 'STEAM READY', desc: 'Generate Steam descriptions, tags, and store pages' },
  { icon: Map, color: '#3B82F6', title: 'ROADMAPS', desc: 'Create production roadmaps with milestones' },
]

export function FeatureCards() {
  return (
    <section id="features" className="relative z-10 flex flex-col items-center gap-6">
      <h2 className="font-ibm-mono text-lg font-semibold tracking-wider text-white">
        FEATURES
      </h2>
      <div className="flex flex-col gap-5">
        {[0, 3].map((start) => (
          <div key={start} className="flex gap-5">
            {features.slice(start, start + 3).map((f, i) => {
              const Icon = f.icon
              return (
                <div
                  key={start + i}
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
        ))}
      </div>
    </section>
  )
}
