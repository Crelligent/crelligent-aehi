import React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { loadCurrentEdition } from '@/lib/aehi/loader';
import { ScoreDisplay } from '@/components/data/ScoreDisplay';
import { LayerRadarChart } from '@/components/data/LayerRadarChart';
import { QuartileRange } from '@/components/data/QuartileRange';
import { LayerScoreGrid } from '@/components/data/LayerScoreGrid';
import { TrendIndicator } from '@/components/data/TrendIndicator';

export default async function DataExplorerPage({
  searchParams,
}: {
  searchParams?: { sector?: string };
}) {
  const data = await loadCurrentEdition();
  
  // Find selected sector or default to first
  const selectedSlug = searchParams?.sector || data.sectors[0].slug;
  const activeSector = data.sectors.find(s => s.slug === selectedSlug) || data.sectors[0];

  return (
    <PageWrapper currentEdition={data.edition}>
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-24">
        
        {/* Header */}
        <div className="mb-12">
          <div className="text-[11px] font-mono tracking-widest uppercase text-[var(--aehi-lime)] mb-4">
            Data Explorer · {data.edition}
          </div>
          <h1 className="text-4xl md:text-5xl font-head font-medium text-white mb-6">
            Interactive Benchmarks
          </h1>
          <p className="text-[var(--aehi-muted)] max-w-3xl leading-relaxed">
            Select a sector below to explore its structural health profile. The radar chart maps the five layers of the OS, revealing exactly where specific industries over-index and where they fail.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Sector Selection */}
          <div className="lg:col-span-3 flex flex-col gap-2">
            <div className="text-[10px] font-mono tracking-widest uppercase text-[var(--aehi-label)] mb-2 px-4">
              Select Sector
            </div>
            {data.sectors.map(sector => {
              const isActive = sector.slug === activeSector.slug;
              return (
                <a 
                  key={sector.slug}
                  href={`/data?sector=${sector.slug}`}
                  className={`px-4 py-3 rounded-lg flex items-center justify-between transition-colors border ${
                    isActive 
                      ? 'bg-[var(--aehi-surface2)] border-[var(--aehi-border)] text-white' 
                      : 'bg-transparent border-transparent text-[var(--aehi-muted)] hover:bg-[var(--aehi-surface)]'
                  }`}
                >
                  <span className="text-sm font-medium">{sector.name}</span>
                  <span className={`text-xs font-mono ${isActive ? 'text-[var(--aehi-lime)]' : ''}`}>
                    {sector.score}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Right Column: Active Sector Data */}
          <div className="lg:col-span-9 bg-[var(--aehi-surface)] border border-[var(--aehi-border)] rounded-2xl p-8 lg:p-12">
            
            {/* Sector Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-12 border-b border-[var(--aehi-border)]">
              <div>
                <h2 className="text-3xl font-head font-medium text-white mb-2">{activeSector.name}</h2>
                <div className="text-sm text-[var(--aehi-muted)] flex items-center gap-4">
                  <span>Sample Size: <span className="text-white font-mono">{activeSector.sampleSize}</span></span>
                  <span className="w-1 h-1 rounded-full bg-[var(--aehi-dim)]" />
                  <span>Primary Constraint: <span className="text-white">{activeSector.primaryConstraint}</span></span>
                </div>
              </div>
              <div className="flex items-end gap-6">
                <div className="text-right">
                  <div className="text-[10px] font-mono tracking-widest uppercase text-[var(--aehi-label)] mb-2">Trend</div>
                  <TrendIndicator trend={activeSector.trend} />
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono tracking-widest uppercase text-[var(--aehi-label)] mb-2">OS Score</div>
                  <ScoreDisplay score={activeSector.score} size="md" />
                </div>
              </div>
            </div>

            {/* Visualizations Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
              
              {/* Radar Chart */}
              <div>
                <div className="text-[11px] font-mono tracking-widest uppercase text-[var(--aehi-label)] mb-6">
                  OS Layer Map
                </div>
                <LayerRadarChart 
                  layerScores={activeSector.layerScores} 
                  sectorName={activeSector.name} 
                />
              </div>

              {/* Quartile and Geography */}
              <div className="flex flex-col justify-center gap-16">
                <QuartileRange 
                  min={activeSector.bottomQuartileScore - 10} // synthetic min for viz
                  q1={activeSector.bottomQuartileScore}
                  median={activeSector.medianScore}
                  q3={activeSector.topQuartileScore}
                  max={activeSector.topQuartileScore + 10} // synthetic max
                  score={activeSector.score}
                  sectorName={activeSector.name}
                />

                <div>
                  <div className="text-[11px] font-mono tracking-widest uppercase text-[var(--aehi-label)] mb-6">
                    Geographic Breakdown
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[#050B14] p-4 rounded-lg border border-[var(--aehi-border)]">
                      <div className="text-[10px] font-mono text-[var(--aehi-label)] uppercase mb-1">Lagos</div>
                      <ScoreDisplay score={activeSector.geographicBreakdown.lagos} size="sm" showDenominator={false} />
                    </div>
                    <div className="bg-[#050B14] p-4 rounded-lg border border-[var(--aehi-border)]">
                      <div className="text-[10px] font-mono text-[var(--aehi-label)] uppercase mb-1">Abuja</div>
                      <ScoreDisplay score={activeSector.geographicBreakdown.abuja} size="sm" showDenominator={false} />
                    </div>
                    <div className="bg-[#050B14] p-4 rounded-lg border border-[var(--aehi-border)]">
                      <div className="text-[10px] font-mono text-[var(--aehi-label)] uppercase mb-1">Rest of Nigeria</div>
                      <ScoreDisplay score={activeSector.geographicBreakdown.other} size="sm" showDenominator={false} />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom: Layer Scores Grid */}
            <LayerScoreGrid 
              scores={activeSector.layerScores} 
              primaryConstraintLayer={activeSector.primaryConstraint}
            />

          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
