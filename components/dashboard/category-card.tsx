'use client'

import { Lock, LockOpen, RefreshCw } from 'lucide-react'
import { useIdeaStore, type IdeaState } from '@/store/idea-store'

const categoryKeys = [
  'genres', 'gameplay', 'graphics', 'dimension',
  'setting', 'objective', 'story', 'progression',
  'gameLoop', 'hook', 'audience', 'scope',
] as const

const labels: Record<keyof IdeaState, string> = {
  genres: 'GENRE', gameplay: 'GAMEPLAY', graphics: 'GRAPHICS',
  dimension: 'CAMERA', setting: 'SETTING', objective: 'OBJECTIVE',
  story: 'STORY', progression: 'PROGRESSION', gameLoop: 'CORE LOOP',
  hook: 'HOOK', audience: 'AUDIENCE', scope: 'SCOPE',
}

export function CategoryCard({ name }: { name: keyof IdeaState }) {
  const value = useIdeaStore((s) => s.currentIdea[name])
  const locked = useIdeaStore((s) => s.locked.has(name))
  const reroll = useIdeaStore((s) => s.reroll)
  const toggleLock = useIdeaStore((s) => s.toggleLock)

  return (
    <div className="flex flex-col border border-[#2A2A2A] bg-[#1A1A1A] p-4">
      <div className="flex items-center justify-between">
        <span className="font-[Geist_Mono] text-[10px] tracking-widest text-[#666666]">
          {labels[name]}
        </span>
        <button
          onClick={() => toggleLock(name)}
          className={`transition-colors ${locked ? 'text-[#FF6B00]' : 'text-[#444444] hover:text-white'}`}
          title={locked ? 'Unlock' : 'Lock'}
        >
          {locked ? <Lock size={16} className="fill-[#FF6B00]" /> : <LockOpen size={16} />}
        </button>
      </div>
      <span className="mt-1 font-ibm-mono text-xl font-semibold text-white">
        {value}
      </span>
      <div className="mt-2 flex items-center justify-between">
        <button
          onClick={() => reroll(name)}
          className="text-[#666666] hover:text-white transition-colors"
          title="Reroll"
        >
          <RefreshCw size={16} />
        </button>
      </div>
    </div>
  )
}
