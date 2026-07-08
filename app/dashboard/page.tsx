'use client'

import Link from 'next/link'
import { Share2 } from 'lucide-react'
import { CategoryCard } from '@/components/dashboard/category-card'
import { useIdeaStore, categoryKeys } from '@/store/idea-store'

export default function DashboardPage() {
  const generate = useIdeaStore((s) => s.generate)
  const saveCurrent = useIdeaStore((s) => s.saveCurrent)
  const slug = useIdeaStore((s) => s.currentSlug())

  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-ibm-mono text-2xl font-semibold tracking-wider text-white">
            GENERATE
          </h1>
          <p className="font-[Geist_Mono] text-[11px] tracking-wide text-[#666666]">
            Randomize categories to create a unique game idea
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-[Geist_Mono] text-[10px] tracking-wide text-[#444444]">
            G Generate | R Reroll | S Save
          </span>
          <Link
            href={`/idea/${slug}`}
            className="inline-flex items-center gap-1.5 font-[Geist_Mono] text-[10px] tracking-wider text-[#444444] hover:text-white transition-colors"
          >
            <Share2 size={14} />
            SHARE IDEA
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {categoryKeys.map((key) => (
          <CategoryCard key={key} name={key} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-3 pt-4">
        <button
          onClick={generate}
          className="flex h-14 w-[280px] items-center justify-center bg-[#FF6B00] font-ibm-mono text-sm font-semibold tracking-[3px] text-black transition-opacity hover:opacity-90"
        >
          GENERATE
        </button>
        <button
          onClick={saveCurrent}
          className="flex h-14 w-[140px] items-center justify-center border border-[#333333] font-ibm-mono text-xs tracking-wider text-[#666666] hover:text-white hover:border-white/20 transition-colors"
        >
          SAVE
        </button>
        <Link
          href={`/idea/${slug}`}
          className="flex h-14 w-[140px] items-center justify-center border border-[#333333] font-ibm-mono text-xs tracking-wider text-[#666666] hover:text-white hover:border-white/20 transition-colors"
        >
          SHARE
        </Link>
      </div>
    </div>
  )
}
