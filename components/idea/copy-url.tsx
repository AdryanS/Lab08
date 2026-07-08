'use client'

import { useState } from 'react'
import { Copy } from 'lucide-react'

export function CopyUrl({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      `${window.location.origin}/idea/${slug}`
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center justify-between border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-3">
      <span className="font-[Geist_Mono] text-[11px] text-[#666666]">
        localhost:3000/idea/{slug}
      </span>
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 border border-[#333333] bg-[#000000] px-4 py-2 font-ibm-mono text-[10px] tracking-wider text-white hover:bg-white/5 transition-colors"
      >
        <Copy size={14} />
        {copied ? 'COPIED' : 'COPY'}
      </button>
    </div>
  )
}
