// src/app/report/loading.tsx — AEHI report page skeleton

export default function ReportLoading() {
  return (
    <div className="min-h-screen bg-[#030712] text-white animate-pulse">
      <div className="h-16 border-b border-white/5 bg-[#030712]/80" />

      <main className="max-w-4xl mx-auto px-6 py-24 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="w-32 h-3 rounded bg-white/5" />
          <div className="w-96 h-10 rounded-xl bg-white/5" />
          <div className="w-64 h-4 rounded bg-white/5" />
        </div>

        {/* Report Gate form placeholder */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-12 space-y-6">
          <div className="w-72 h-7 rounded-lg bg-white/5" />
          <div className="w-48 h-3 rounded bg-white/[0.04]" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} className={`space-y-2 ${i === 2 ? 'md:col-span-2' : ''}`}>
                <div className="w-24 h-2 rounded bg-white/5" />
                <div className="w-full h-10 rounded-lg bg-white/[0.04]" />
              </div>
            ))}
          </div>

          <div className="w-full h-12 rounded-lg bg-white/[0.06]" />
        </div>
      </main>
    </div>
  );
}
