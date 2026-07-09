'use client'

import { useIdeaStore, categoryKeys, labels } from '@/store/idea-store'

export default function ExportsPage() {
  const saved = useIdeaStore((s) => s.saved)
  const recent = saved.slice(0, 5)

  const exportMarkdown = () => {
    const idea = useIdeaStore.getState().currentIdea
    let md = `# Game Idea\n\n`
    for (const key of categoryKeys) {
      md += `**${labels[key]}**: ${idea[key]}\n\n`
    }
    const blob = new Blob([md], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `game-idea-${Date.now()}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportJSON = () => {
    const idea = useIdeaStore.getState().currentIdea
    const json = JSON.stringify(idea, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `game-idea-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const formats = [
    {
      id: 'markdown', name: 'MARKDOWN', ext: '.md',
      badge: 'FREE', badgeColor: '#00E5A0',
      desc: 'Clean markdown format, ready for documentation',
      action: exportMarkdown,
    },
    {
      id: 'json', name: 'JSON', ext: '.json',
      badge: 'FREE', badgeColor: '#00E5A0',
      desc: 'Structured JSON for developers and tools',
      action: exportJSON,
    },
    {
      id: 'pdf', name: 'PDF', ext: '.pdf',
      badge: 'WIP', badgeColor: '#FF6B00',
      desc: 'Professional PDF document (coming soon)',
      locked: true,
    },
    {
      id: 'png', name: 'PNG', ext: '.png',
      badge: 'WIP', badgeColor: '#FF6B00',
      desc: 'Export as image for social media (coming soon)',
      locked: true,
    },
  ]

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-1">
        <h1 className="font-ibm-mono text-2xl font-semibold tracking-wider text-white">
          EXPORTS
        </h1>
        <p className="font-[Geist_Mono] text-[11px] tracking-wide text-[#666666]">
          Export your game ideas in multiple formats
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {formats.map((fmt) => (
          <div key={fmt.id} className={`flex flex-col border border-[#2A2A2A] bg-[#1A1A1A] p-5 gap-4 ${fmt.locked ? 'opacity-60' : ''}`}>
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <span className="font-ibm-mono text-base font-semibold text-white">{fmt.name}</span>
                <span className="font-[Geist_Mono] text-[10px] text-[#444444]">{fmt.ext}</span>
              </div>
              <span className="rounded px-1.5 py-0.5 font-[Geist_Mono] text-[8px] font-semibold tracking-wider" style={{ backgroundColor: fmt.badgeColor, color: '#000000' }}>
                {fmt.badge}
              </span>
            </div>
            <p className="font-[Geist] text-[11px] leading-relaxed text-[#666666] flex-1">{fmt.desc}</p>
            {!fmt.locked ? (
              <button onClick={fmt.action} className="flex h-10 items-center justify-center border border-[#333333] font-ibm-mono text-[11px] tracking-wider text-white hover:bg-white/5 transition-colors">
                EXPORT
              </button>
            ) : (
              <div className="flex h-10 items-center justify-center border border-[#333333] font-ibm-mono text-[11px] tracking-wider text-[#444444] cursor-not-allowed">
                WIP
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="font-ibm-mono text-sm font-semibold tracking-wider text-white">RECENT EXPORTS</h2>
        {recent.length === 0 ? (
          <div className="flex items-center justify-center border border-[#2A2A2A] bg-[#1A1A1A] py-8">
            <span className="font-[Geist_Mono] text-[10px] tracking-widest text-[#444444]">NO EXPORTS YET</span>
          </div>
        ) : (
          <div className="flex flex-col gap-px">
            {recent.map((item) => (
              <div key={item.id} className="flex items-center justify-between border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="font-ibm-mono text-[12px] font-semibold text-white">
                    {item.idea.genres}_{item.idea.gameplay}.md
                  </span>
                  <span className="font-[Geist_Mono] text-[9px] text-[#444444]">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <button className="font-[Geist_Mono] text-[10px] tracking-wider text-[#666666] hover:text-white transition-colors">
                  ↓ DOWNLOAD
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
