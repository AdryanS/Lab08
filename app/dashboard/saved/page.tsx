'use client'

import Link from 'next/link'
import { Heart, Share2, Trash2 } from 'lucide-react'
import { useIdeaStore, type CategoryKey, labels, categoryKeys } from '@/store/idea-store'
import data from '@/data.json'
import type { SavedIdea } from '@/store/idea-store'

function ideaSlug(idea: Record<CategoryKey, string>): string {
  return categoryKeys.map((key) => {
    const arr = data[key as keyof typeof data] as string[]
    return arr.indexOf(idea[key])
  }).join('-')
}

function SavedRow({ item, onFavorite, onDelete }: {
  item: SavedIdea
  onFavorite: () => void
  onDelete: () => void
}) {
  const slug = ideaSlug(item.idea)
  const keys = categoryKeys.slice(0, 6)

  return (
    <div className="flex items-center border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-3">
      <div className="flex flex-1 grid-cols-6 gap-x-4 gap-y-0.5 grid">
        {keys.map((k) => (
          <div key={k} className="flex gap-2 truncate">
            <span className="font-[Geist_Mono] text-[8px] tracking-widest text-[#444444] shrink-0">
              {labels[k]}:
            </span>
            <span className="font-ibm-mono text-[11px] font-semibold text-white truncate">
              {item.idea[k]}
            </span>
          </div>
        ))}
      </div>
      <div className="ml-4 flex items-center gap-2 shrink-0">
        <button onClick={onFavorite} className="text-[#666666] hover:text-[#FF6B00] transition-colors">
          {item.favorited ? (
            <Heart size={16} className="fill-[#FF6B00] text-[#FF6B00]" />
          ) : (
            <Heart size={16} />
          )}
        </button>
        <Link href={`/idea/${slug}`} className="text-[#666666] hover:text-white transition-colors">
          <Share2 size={16} />
        </Link>
        <button onClick={onDelete} className="text-[#666666] hover:text-red-400 transition-colors">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}

export default function SavedPage() {
  const saved = useIdeaStore((s) => s.saved)
  const toggleFavorite = useIdeaStore((s) => s.toggleFavorite)
  const deleteSaved = useIdeaStore((s) => s.deleteSaved)

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-1">
        <h1 className="font-ibm-mono text-2xl font-semibold tracking-wider text-white">
          SAVED IDEAS
        </h1>
        <p className="font-[Geist_Mono] text-[11px] tracking-wide text-[#666666]">
          {saved.length} {saved.length === 1 ? 'idea' : 'ideas'} saved
        </p>
      </div>

      {saved.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20">
          <span className="font-[Geist_Mono] text-[10px] tracking-widest text-[#444444]">EMPTY</span>
          <p className="font-[Geist] text-sm text-[#666666]">No saved ideas yet. Generate and save your first idea!</p>
          <Link href="/dashboard" className="flex h-11 items-center justify-center border border-[#333333] px-6 font-ibm-mono text-[11px] tracking-wider text-white hover:bg-white/5 transition-colors">
            ← GENERATE IDEAS
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-px">
          {saved.map((item) => (
            <SavedRow
              key={item.id}
              item={item}
              onFavorite={() => toggleFavorite(item.id)}
              onDelete={() => deleteSaved(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
