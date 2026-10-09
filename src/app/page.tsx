import React from 'react';
import Link from 'next/link';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { FeaturedReportBlock } from '@/components/ui/FeaturedReportBlock';
import { ArchiveList } from '@/components/ui/ArchiveList';
import { FindingCard } from '@/components/data/FindingCard';
import { InstitutionalInquiry } from '@/components/forms/InstitutionalInquiry';
import { loadCurrentEdition } from '@/lib/aehi/loader';
import { HeroMesh } from '@/components/landing/HeroMesh';
import { DiagnosticOrb } from '@/components/landing/DiagnosticOrb';

export default async function HomePage() {
  const data = await loadCurrentEdition();
  
  // Get top 4 sectors for "Special Reports" equivalent
  const topSectors = [...data.sectors].sort((a, b) => b.score - a.score).slice(0, 4);

  return (
    <PageWrapper currentEdition={data.edition}>
      
      {/* 1. Hero Banner */}
      <section className="relative pt-32 pb-24 overflow-hidden flex flex-col items-center justify-center text-center min-h-[600px]">
        {/* Abstract Background element */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none z-0" style={{backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '24px 24px'}} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-b from-[var(--aehi-surface2)] to-transparent blur-[100px] rounded-full pointer-events-none z-0 opacity-50" />
        
        {/* Interactive Telemetry Mesh */}
        <HeroMesh />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-head font-thin tracking-wide leading-tight mb-8 text-transparent bg-clip-text bg-gradient-to-br from-[#0052FF] to-[var(--aehi-lime)]">
            African Enterprise<br />Health Index
          </h1>
          
          <div className="flex justify-center mb-8">
            <span className="w-12 h-1 bg-white" />
          </div>
          
          <p className="text-sm md:text-base text-[var(--aehi-muted)] leading-relaxed mb-10 max-w-3xl mx-auto font-sans font-thin">
            The African Enterprise Health Index is the first systematic benchmark of operating structures across the Nigerian mid-market. It provides a granular, layer-by-layer diagnostic of exactly where enterprise systems break down, empowering leaders and investors to rebuild their connective tissue.
          </p>
        </div>
      </section>

      {/* 2. Featured Report Block */}
      <div className="px-6 relative z-20">
        <FeaturedReportBlock edition={data.edition} overallScore={data.overallScore} />
      </div>

      {/* 3. Sector Spotlights (Equivalent to Special Reports) */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-head font-thin tracking-wide text-white mb-4">Sector Spotlights</h3>
            <p className="text-[var(--aehi-muted)] font-thin">
              Deep-dive diagnostics into the operating health of specific industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-t border-l border-[var(--aehi-border)] bg-[var(--aehi-surface)]">
            {topSectors.map((sector, index) => {
              // Determine bento grid spans based on index
              let gridClasses = "col-span-1 md:col-span-1 md:row-span-1";
              if (index === 0) gridClasses = "col-span-1 md:col-span-2 md:row-span-2";
              else if (index === 1) gridClasses = "col-span-1 md:col-span-2 md:row-span-1";

              return (
                <Link 
                  key={sector.slug}
                  href={`/data?sector=${sector.slug}`}
                  className={`group flex flex-col bg-[var(--aehi-surface)] border-r border-b border-[var(--aehi-border)] hover:bg-[var(--aehi-surface2)] transition-colors rounded-none overflow-hidden ${gridClasses}`}
                >
                  {/* Abstract image placeholder colored by sector rank */}
                  <div className={`w-full bg-gradient-to-br ${
                    index === 0 ? 'from-[#1A6B8A] to-[#0F1D35] min-h-[200px] md:min-h-[300px]' : 
                    index === 1 ? 'from-[#534AB7] to-[#0F1D35] min-h-[160px]' :
                    index === 2 ? 'from-[#0F6E56] to-[#0F1D35] min-h-[160px]' :
                    'from-[#BA7517] to-[#0F1D35] min-h-[160px]'
                  } opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 md:p-8 relative`}>
                    <div className="absolute bottom-4 left-4 text-white font-mono text-4xl font-thin opacity-40 tracking-wider">
                      {sector.score}
                    </div>
                  </div>
                  
                  <div className={`p-6 md:p-8 flex flex-col flex-1 ${index === 0 ? 'justify-end' : ''}`}>
                    <div className="text-[10px] font-mono tracking-widest uppercase text-[var(--aehi-label)] mb-3">
                      {data.edition} Sector Data
                    </div>
                    <h4 className={`${index === 0 ? 'text-4xl' : 'text-2xl'} font-head font-thin text-white mb-4 leading-tight tracking-wide group-hover:text-[var(--aehi-lime)] transition-colors`}>
                      {sector.name} Operating Health
                    </h4>
                    <p className={`text-xs uppercase tracking-widest font-thin text-[var(--aehi-muted)] mt-auto pt-4 border-t border-[var(--aehi-border)] group-hover:text-[var(--aehi-dim)] transition-colors ${index === 0 ? 'text-sm' : ''}`}>
                      Explore the layer breakdown &rarr;
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Insights / Key Findings */}
      <section className="py-24 bg-[#050B14] border-y border-[var(--aehi-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-head font-thin tracking-wide text-white mb-4">Insights</h3>
            <p className="text-[var(--aehi-muted)] font-thin">
              Executive intelligence drawn from the latest {data.edition} dataset.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.keyFindings.map((finding, idx) => (
              <FindingCard key={idx} finding={finding} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. The OS Diagnostic (Equivalent to The Trustmakers block) */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="bg-[var(--aehi-surface)] border border-[var(--aehi-border)] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl relative">
          
          {/* Abstract left side */}
          <div className="w-full md:w-5/12 bg-[#030712] flex items-center justify-center relative overflow-hidden border-r border-[var(--aehi-border)] min-h-[300px]">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--aehi-lime)]/5 to-transparent pointer-events-none z-20" />
            <DiagnosticOrb />
          </div>

          <div className="w-full md:w-7/12 p-12 md:p-16 flex flex-col justify-center">
            <h3 className="text-3xl font-head font-thin tracking-wide text-white mb-4">The OS Diagnostic</h3>
            <p className="text-[15px] text-[var(--aehi-muted)] font-thin mb-8 max-w-md leading-relaxed">
              Join the index. Take the comprehensive ESRE OS Diagnostic for your enterprise and instantly view your OS Performance Score.
            </p>
            <div>
              <Link 
                href="https://crelligent.com/esre" 
                className="text-[var(--aehi-lime)] font-mono text-sm tracking-widest uppercase font-thin hover:underline underline-offset-4"
              >
                Benchmark your enterprise &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Reports Archive */}
      <section className="py-24 bg-[#050B14] border-t border-[var(--aehi-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-head font-thin tracking-wide text-white mb-4">Reports Archive</h3>
            <p className="text-[var(--aehi-muted)] font-thin">
              Access the historical data, methodology, and regional intelligence.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <ArchiveList 
              reports={[
                { title: `${data.edition} African Enterprise Health Index`, url: '/report' },
                // Placeholder for future edition
                // { title: `Q3 2026 African Enterprise Health Index`, url: '/report' }
              ]} 
            />
          </div>
        </div>
      </section>

      {/* 7. Contact Us Form */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-head font-thin tracking-wide text-white mb-4">Contact Us</h3>
            <p className="text-[var(--aehi-muted)] font-thin">
              Interested in licensing data? Get in touch with our Institutional team.
            </p>
          </div>

          <InstitutionalInquiry />
        </div>
      </section>

    </PageWrapper>
  );
}
