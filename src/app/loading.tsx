// src/app/loading.tsx — AEHI homepage skeleton
// Shown automatically by Next.js while a page loads

export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-[#030712] text-white animate-pulse">

      {/* Nav placeholder */}
      <div className="h-16 border-b border-white/5 bg-[#030712]/80 backdrop-blur-xl" />

      {/* Hero */}
      <section className="relative pt-32 pb-24 flex flex-col items-center text-center min-h-[600px]">
        <div className="w-64 h-10 rounded-full bg-white/5 mb-8 mx-auto" />
        <div className="w-[480px] max-w-[90vw] h-14 rounded-xl bg-white/5 mb-4 mx-auto" />
        <div className="w-[320px] max-w-[80vw] h-14 rounded-xl bg-white/5 mx-auto" />
        <div className="w-12 h-1 bg-white/10 my-8 mx-auto" />
        <div className="w-[560px] max-w-[90vw] h-4 rounded bg-white/5 mb-2 mx-auto" />
        <div className="w-[420px] max-w-[80vw] h-4 rounded bg-white/5 mx-auto" />
      </section>

      {/* Featured Report Block */}
      <div className="px-6 max-w-7xl mx-auto mb-16">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-12 flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-4">
            <div className="w-32 h-3 rounded bg-white/5" />
            <div className="w-64 h-8 rounded-lg bg-white/5" />
            <div className="w-48 h-4 rounded bg-white/5" />
            <div className="w-full h-4 rounded bg-white/5" />
            <div className="w-3/4 h-4 rounded bg-white/5" />
          </div>
          <div className="flex items-center justify-center shrink-0">
            <div className="w-40 h-40 rounded-full border-4 border-white/5 bg-white/[0.02] flex items-center justify-center">
              <div className="w-16 h-10 rounded bg-white/5" />
            </div>
          </div>
        </div>
      </div>

      {/* Sector Spotlights Grid */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-3">
          <div className="w-48 h-8 rounded-lg bg-white/5 mx-auto" />
          <div className="w-72 h-4 rounded bg-white/5 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-t border-l border-white/[0.06]">
          {/* Large featured cell */}
          <div className="col-span-1 md:col-span-2 md:row-span-2 border-r border-b border-white/[0.06] bg-white/[0.02]">
            <div className="w-full min-h-[300px] bg-white/[0.03]" />
            <div className="p-8 space-y-3">
              <div className="w-24 h-3 rounded bg-white/5" />
              <div className="w-48 h-8 rounded-lg bg-white/5" />
            </div>
          </div>
          {/* Smaller cells */}
          {[0, 1, 2].map(i => (
            <div key={i} className="border-r border-b border-white/[0.06] bg-white/[0.02]">
              <div className="w-full min-h-[160px] bg-white/[0.03]" />
              <div className="p-6 space-y-2">
                <div className="w-20 h-3 rounded bg-white/5" />
                <div className="w-40 h-6 rounded bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Findings */}
      <section className="py-16 bg-[#050B14] border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <div className="w-32 h-8 rounded-lg bg-white/5 mx-auto" />
            <div className="w-56 h-4 rounded bg-white/5 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0, 1, 2].map(i => (
              <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-white/5" />
                <div className="w-full h-4 rounded bg-white/5" />
                <div className="w-3/4 h-4 rounded bg-white/5" />
                <div className="w-full h-3 rounded bg-white/[0.03]" />
                <div className="w-5/6 h-3 rounded bg-white/[0.03]" />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
