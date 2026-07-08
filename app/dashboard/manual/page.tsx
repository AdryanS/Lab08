'use client'

import Link from 'next/link'
import { Share2 } from 'lucide-react'
import { ManualRow } from '@/components/dashboard/manual-row'
import { useIdeaStore, categoryKeys, labels } from '@/store/idea-store'

export default function ManualPage() {
  const currentIdea = useIdeaStore((s) => s.currentIdea)
  const setValue = useIdeaStore((s) => s.setValue)
  const saveCurrent = useIdeaStore((s) => s.saveCurrent)
  const slug = useIdeaStore((s) => s.currentSlug())

  const leftCol = categoryKeys.slice(0, 6)
  const rightCol = categoryKeys.slice(6, 12)

  function handleSelect(key: string, value: string) {
    setValue(key as typeof categoryKeys[number], value)
  }

  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-ibm-mono text-2xl font-semibold tracking-wider text-white">
            MANUAL CREATE
          </h1>
          <p className="font-[Geist_Mono] text-[11px] tracking-wide text-[#666666]">
            Pick a value for each category to build your game idea
          </p>
        </div>
        <span className="font-[Geist_Mono] text-[10px] tracking-wide text-[#444444]">
          Enter to Create
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          {leftCol.map((key) => (
            <ManualRow
              key={key}
              label={labels[key]}
              categoryKey={key}
              value={currentIdea[key]}
              onSelect={handleSelect}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {rightCol.map((key) => (
            <ManualRow
              key={key}
              label={labels[key]}
              categoryKey={key}
              value={currentIdea[key]}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 pt-4">
        <button className="flex h-14 w-[280px] items-center justify-center bg-[#FF6B00] font-ibm-mono text-sm font-semibold tracking-[3px] text-black transition-opacity hover:opacity-90">
          CREATE
        </button>
        <button
          onClick={saveCurrent}
          className="flex h-11 w-[140px] items-center justify-center border border-[#333333] font-ibm-mono text-xs tracking-wider text-[#666666] hover:text-white hover:border-white/20 transition-colors"
        >
          SAVE
        </button>
        <Link
          href={`/idea/${slug}`}
          className="flex h-11 w-[140px] items-center justify-center border border-[#333333] font-ibm-mono text-xs tracking-wider text-[#666666] hover:text-white hover:border-white/20 transition-colors"
        >
          SHARE
        </Link>
      </div>
    </div>
  )
}
