import React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { ReportDownloadGate } from '@/components/forms/ReportDownloadGate';
import { loadCurrentEdition } from '@/lib/aehi/loader';

export default async function ReportPage() {
  const data = await loadCurrentEdition();

  return (
    <PageWrapper currentEdition={data.edition}>
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div>
            <div className="text-[11px] font-mono tracking-widest uppercase text-[var(--aehi-lime)] mb-6">
              Full Report · {data.edition}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-head font-medium text-white leading-[1.1] mb-8">
              Download the definitive guide to Nigerian enterprise operating health.
            </h1>
            
            <div className="prose prose-invert prose-lg text-[var(--aehi-muted)]">
              <p>
                The {data.edition} AEHI Report provides a comprehensive breakdown of systemic performance across nine major sectors in the Nigerian mid-market.
              </p>
              <p>
                Inside the 40-page report, you will find:
              </p>
              <ul className="text-sm space-y-2 mt-4 font-medium text-white">
                <li className="flex gap-3"><span className="text-[var(--aehi-lime)]">✓</span> Layer-by-layer constraint analysis</li>
                <li className="flex gap-3"><span className="text-[var(--aehi-lime)]">✓</span> Revenue band performance variations</li>
                <li className="flex gap-3"><span className="text-[var(--aehi-lime)]">✓</span> Technology stack fragmentation data</li>
                <li className="flex gap-3"><span className="text-[var(--aehi-lime)]">✓</span> Strategic foresight briefings from {data.partners.join(' & ')}</li>
              </ul>
            </div>
          </div>

          <div>
            <ReportDownloadGate editionLabel={data.edition} />
          </div>

        </div>
      </div>
    </PageWrapper>
  );
}
