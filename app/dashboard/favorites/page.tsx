'use client'

import Link from 'next/link'
import { Heart, Share2 } from 'lucide-react'
import { useIdeaStore, type CategoryKey, labels, categoryKeys } from '@/store/idea-store'
import data from '@/data.json'

function ideaSlug(idea: Record<CategoryKey, string>): string {
  return categoryKeys.map((key) => {
    const arr = data[key as keyof typeof data] as string[]
    return arr.indexOf(idea[key])
  }).join('-')
}

export default function FavoritesPage() {
  const saved = useIdeaStore((s) => s.saved)
  const toggleFavorite = useIdeaStore((s) => s.toggleFavorite)
  const favorites = saved.filter((item) => item.favorited)

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-1">
        <h1 className="font-ibm-mono text-2xl font-semibold tracking-wider text-white">
          FAVORITES
        </h1>
        <p className="font-[Geist_Mono] text-[11px] tracking-wide text-[#666666]">
          {favorites.length} {favorites.length === 1 ? 'favorite' : 'favorites'}
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20">
          <span className="font-[Geist_Mono] text-[10px] tracking-widest text-[#444444]">EMPTY</span>
          <p className="font-[Geist] text-sm text-[#666666]">No favorites yet. Save and favorite ideas to see them here.</p>
          <Link href="/dashboard" className="flex h-11 items-center justify-center border border-[#333333] px-6 font-ibm-mono text-[11px] tracking-wider text-white hover:bg-white/5 transition-colors">
            ← GENERATE IDEAS
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {favorites.map((item) => {
            const slug = ideaSlug(item.idea)
            const keys = categoryKeys.slice(0, 6)
            return (
              <div key={item.id} className="flex flex-col border border-[#2A2A2A] bg-[#1A1A1A] p-4 gap-3">
                <div className="grid grid-cols-2 gap-2">
                  {keys.map((k) => (
                    <div key={k} className="flex flex-col gap-0.5">
                      <span className="font-[Geist_Mono] text-[8px] tracking-widest text-[#444444]">{labels[k]}</span>
                      <span className="font-ibm-mono text-[11px] font-semibold text-white truncate">{item.idea[k]}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-1 border-t border-[#2A2A2A]">
                  <button onClick={() => toggleFavorite(item.id)} className="text-[#FF6B00] hover:text-[#FF6B00]/80 transition-colors">
                    <Heart size={16} className="fill-[#FF6B00] text-[#FF6B00]" />
                  </button>
                  <Link href={`/idea/${slug}`} className="flex items-center gap-1.5 font-[Geist_Mono] text-[10px] tracking-wider text-[#666666] hover:text-white transition-colors">
                    <Share2 size={14} />
                    SHARE
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
