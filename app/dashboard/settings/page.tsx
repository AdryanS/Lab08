'use client'

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-1">
        <h1 className="font-ibm-mono text-2xl font-semibold tracking-wider text-white">
          SETTINGS
        </h1>
        <p className="font-[Geist_Mono] text-[11px] tracking-wide text-[#666666]">
          Configure your preferences
        </p>
      </div>

      <div className="flex flex-col gap-px max-w-xl">
        <div className="flex items-center justify-between border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-4">
          <div className="flex flex-col gap-1">
            <span className="font-ibm-mono text-sm font-semibold text-white">THEME</span>
            <span className="font-[Geist_Mono] text-[10px] text-[#666666]">Dark mode (default)</span>
          </div>
          <span className="rounded border border-[#333333] px-2 py-1 font-[Geist_Mono] text-[10px] tracking-wider text-[#666666]">
            DARK
          </span>
        </div>

        <div className="flex items-center justify-between border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-4">
          <div className="flex flex-col gap-1">
            <span className="font-ibm-mono text-sm font-semibold text-white">STORAGE</span>
            <span className="font-[Geist_Mono] text-[10px] text-[#666666]">Ideas saved locally on this browser</span>
          </div>
          <button
            onClick={() => {
              if (confirm('Clear all saved ideas? This cannot be undone.')) {
                localStorage.removeItem('idea-store')
                window.location.reload()
              }
            }}
            className="border border-red-900/50 px-3 py-1.5 font-[Geist_Mono] text-[10px] tracking-wider text-red-400 hover:bg-red-950/30 transition-colors"
          >
            CLEAR ALL
          </button>
        </div>

        <div className="flex items-center justify-between border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-4">
          <div className="flex flex-col gap-1">
            <span className="font-ibm-mono text-sm font-semibold text-white">KEYBOARD SHORTCUTS</span>
            <span className="font-[Geist_Mono] text-[10px] text-[#666666]">G Generate · R Reroll all · S Save</span>
          </div>
        </div>

        <div className="flex items-center justify-between border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-4">
          <div className="flex flex-col gap-1">
            <span className="font-ibm-mono text-sm font-semibold text-white">VERSION</span>
            <span className="font-[Geist_Mono] text-[10px] text-[#666666]">Indie Idea Gen v0.1.0</span>
          </div>
        </div>
      </div>
    </div>
  )
}
