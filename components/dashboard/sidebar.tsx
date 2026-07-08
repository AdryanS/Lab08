'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import {
  Sparkles,
  PenTool,
  Bookmark,
  Heart,
  Download,
  Bot,
  Settings,
  LogOut,
} from 'lucide-react'

const items = [
  { href: '/dashboard', icon: Sparkles, label: 'Generate' },
  { href: '/dashboard/manual', icon: PenTool, label: 'Manual Create' },
  { href: '/dashboard/saved', icon: Bookmark, label: 'Saved Ideas' },
  { href: '/dashboard/favorites', icon: Heart, label: 'Favorites' },
  { href: '/dashboard/exports', icon: Download, label: 'Exports' },
]

const proItems = [
  { href: '#', icon: Bot, label: 'AI Tools', pro: true },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
]

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <aside className="flex w-[260px] flex-col border-r border-[#2A2A2A] bg-[#000000]">
      <div className="flex h-14 items-center gap-2.5 border-b border-[#2A2A2A] px-5">
        <span className="font-ibm-mono text-xs font-semibold tracking-widest text-white">
          ✦ INDIE GEN
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-[#00E5A0]" />
      </div>

      <nav className="flex flex-col gap-0.5 px-2 py-2">
        {items.map((item) => {
          const active = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex h-11 items-center gap-3 px-4 transition-colors ${
                active ? 'bg-[#1A1A1A]' : 'hover:bg-white/5'
              }`}
            >
              {active && <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />}
              {!active && <span className="h-1.5 w-1.5 rounded-full bg-transparent" />}
              <Icon size={20} className={active ? 'text-[#FF6B00]' : 'text-[#666666]'} />
              <span
                className={`font-[Geist] text-sm ${
                  active ? 'font-semibold text-white' : 'text-[#666666]'
                }`}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>

      <div className="flex-1" />

      <div className="flex flex-col gap-0.5 px-2 pb-2">
        {proItems.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.label}
              className={`flex h-11 items-center gap-3 px-4 ${
                item.href !== '#' ? 'hover:bg-white/5 cursor-pointer' : ''
              } transition-colors`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-transparent" />
              <Icon size={20} className="text-[#666666]" />
              <span className="font-[Geist] text-sm text-[#666666]">{item.label}</span>
              {item.pro && (
                <span className="ml-auto rounded bg-[#FF6B00] px-1.5 py-0.5 font-[Geist_Mono] text-[8px] font-semibold tracking-wider text-black">
                  PRO
                </span>
              )}
            </div>
          )
        })}

        <div className="mt-2 border-t border-[#2A2A2A]" />

        <div className="flex h-11 items-center gap-3 px-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2A2A2A] font-[Geist] text-xs font-bold text-white">
            {session?.user?.name?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div className="flex flex-1 flex-col min-w-0">
            <span className="truncate font-[Geist] text-sm text-white">
              {session?.user?.name || 'User'}
            </span>
            <span className="truncate font-[Geist_Mono] text-[10px] text-[#666666]">
              {session?.user?.email || ''}
            </span>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="text-[#666666] hover:text-white transition-colors"
            title="Sign out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  )
}
