import { Sidebar } from '@/components/dashboard/sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-[#000000]">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div
          className="pointer-events-none fixed inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(42,42,42,1) 1px, transparent 1px), linear-gradient(90deg, rgba(42,42,42,1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative z-10 p-8">{children}</div>
      </main>
    </div>
  )
}
