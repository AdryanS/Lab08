import { CopyUrl } from '@/components/idea/copy-url'
import { Bookmark, Share2 } from 'lucide-react'
import data from '@/data.json'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const categoryKeys = [
  'genres',
  'gameplay',
  'graphics',
  'dimension',
  'setting',
  'objective',
  'story',
  'progression',
  'gameLoop',
  'hook',
  'audience',
  'scope',
] as const

type Idea = Record<typeof categoryKeys[number], string>
type CategoryKey = typeof categoryKeys[number]

const labels: Record<CategoryKey, string> = {
  genres: 'GENRE',
  gameplay: 'GAMEPLAY',
  graphics: 'GRAPHICS',
  dimension: 'CAMERA',
  setting: 'SETTING',
  objective: 'OBJECTIVE',
  story: 'STORY',
  progression: 'PROGRESSION',
  gameLoop: 'CORE LOOP',
  hook: 'HOOK',
  audience: 'AUDIENCE',
  scope: 'SCOPE',
}

function parseSlug(slug: string): Idea | null {
  const parts = slug.split('-').map(Number)
  if (parts.length !== categoryKeys.length) return null
  if (parts.some(isNaN)) return null

  const idea: Record<string, string> = {}
  for (let i = 0; i < categoryKeys.length; i++) {
    const key = categoryKeys[i]
    const arr = data[key as keyof typeof data] as string[] | undefined
    if (!arr || parts[i] < 0 || parts[i] >= arr.length) return null
    idea[key] = arr[parts[i]]
  }
  return idea as Idea
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const idea = parseSlug(slug)
  if (!idea) return { title: 'Idea Not Found' }
  return {
    title: `Idea #${slug} — ${idea.genres} ${idea.gameplay}`,
    description: `${idea.genres} · ${idea.gameplay} · ${idea.graphics} · ${idea.setting} — Generated with Indie Idea Gen`,
    openGraph: {
      title: `Indie Game Idea #${slug}`,
      description: `${idea.genres} ${idea.gameplay} game with ${idea.graphics} graphics set in ${idea.setting}. ${idea.hook}`,
    },
  }
}

export default async function IdeaPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const idea = parseSlug(slug)

  if (!idea) notFound()

  const entries = categoryKeys.map((key) => ({
    label: labels[key],
    value: idea[key],
  }))

  const leftCol = entries.slice(0, 6)
  const rightCol = entries.slice(6, 12)

  return (
    <div className="min-h-screen bg-[#000000] font-sans antialiased">
      {/* Grid Pattern Background */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(42,42,42,1) 1px, transparent 1px), linear-gradient(90deg, rgba(42,42,42,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Nav */}
      <nav className="flex h-14 items-center justify-between border-b border-[#2A2A2A] px-10">
        <span className="font-ibm-mono text-xs font-semibold tracking-widest text-white">
          ✦ INDIE GEN
        </span>
        <a
          href="/dashboard"
          className="font-[Geist_Mono] text-[11px] tracking-wider text-[#666666] hover:text-white transition-colors"
        >
          ← BACK TO GENERATOR
        </a>
      </nav>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-8 py-10">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-ibm-mono text-2xl font-semibold tracking-wider text-white">
              IDEA #{slug}
            </h1>
            <p className="font-[Geist_Mono] text-[10px] tracking-wide text-[#666666]">
              Generated from 12 categories
            </p>
          </div>
          <span className="font-[Geist_Mono] text-[10px] tracking-wide text-[#444444]">
            Share this URL to show your idea
          </span>
        </div>

        {/* Actions */}
        <div className="mb-6 flex items-center gap-3">
          <a
            href="/dashboard"
            className="inline-flex h-11 items-center justify-center border border-[#333333] px-6 font-ibm-mono text-[11px] font-medium tracking-wider text-white hover:bg-white/5 transition-colors"
          >
            GENERATE AGAIN
          </a>
          <div className="inline-flex h-11 w-[120px] items-center justify-center gap-2 border border-[#333333] text-[#666666]">
            <Bookmark size={16} />
            <span className="font-ibm-mono text-[11px] tracking-wider">SAVE</span>
          </div>
          <div className="inline-flex h-11 w-[120px] items-center justify-center gap-2 border border-[#333333] text-[#666666]">
            <Share2 size={16} />
            <span className="font-ibm-mono text-[11px] tracking-wider">SHARE</span>
          </div>
        </div>

        {/* Category Grid */}
        <div className="mb-6 grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-px">
            {leftCol.map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between bg-[#1A1A1A] px-4 py-3"
                style={{ border: '0.5px solid #2A2A2A' }}
              >
                <span className="font-[Geist_Mono] text-[9px] tracking-widest text-[#444444]">
                  {label}
                </span>
                <span className="font-ibm-mono text-[13px] font-semibold text-white text-right max-w-[60%]">
                  {value}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-px">
            {rightCol.map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between bg-[#1A1A1A] px-4 py-3"
                style={{ border: '0.5px solid #2A2A2A' }}
              >
                <span className="font-[Geist_Mono] text-[9px] tracking-widest text-[#444444]">
                  {label}
                </span>
                <span className="font-ibm-mono text-[13px] font-semibold text-white text-right max-w-[60%]">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Copy URL */}
        <CopyUrl slug={slug} />
      </main>
    </div>
  )
}
