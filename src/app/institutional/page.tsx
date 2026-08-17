import React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { InstitutionalInquiry } from '@/components/forms/InstitutionalInquiry';
import { loadCurrentEdition } from '@/lib/aehi/loader';

export default async function InstitutionalPage() {
  const data = await loadCurrentEdition();

  return (
    <PageWrapper currentEdition={data.edition}>
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          <div className="sticky top-32">
            <div className="text-[11px] font-mono tracking-widest uppercase text-[var(--aehi-lime)] mb-6">
              Institutional Access
            </div>
            
            <h1 className="text-4xl md:text-5xl font-head font-medium text-white leading-[1.1] mb-8">
              Raw data for due diligence and portfolio monitoring.
            </h1>
            
            <div className="text-lg text-[var(--aehi-muted)] leading-relaxed mb-12">
              We provide the full, anonymised AEHI dataset to institutional buyers. This data enables systematic assessment of target companies against their peers at an OS-layer level.
            </div>

            <div className="space-y-8">
              <div className="bg-[#050B14] p-6 rounded-xl border border-[var(--aehi-border)]">
                <h3 className="font-head text-white text-xl mb-2">Portfolio Assessment</h3>
                <p className="text-sm text-[var(--aehi-muted)]">Run the AEHI diagnostic across your portfolio companies to establish a baseline OS Score and track improvement post-investment.</p>
              </div>
              <div className="bg-[#050B14] p-6 rounded-xl border border-[var(--aehi-border)]">
                <h3 className="font-head text-white text-xl mb-2">Due Diligence</h3>
                <p className="text-sm text-[var(--aehi-muted)]">Benchmark target companies against the AEHI dataset to identify systemic operational risks before closing.</p>
              </div>
              <div className="bg-[#050B14] p-6 rounded-xl border border-[var(--aehi-border)]">
                <h3 className="font-head text-white text-xl mb-2">API Access</h3>
                <p className="text-sm text-[var(--aehi-muted)]">Connect directly to the AEHI telemetry feed to ingest quarterly updates into your firm's internal intelligence systems.</p>
              </div>
            </div>
          </div>

          <div>
            <InstitutionalInquiry />
          </div>

        </div>
      </div>
    </PageWrapper>
  );
}
