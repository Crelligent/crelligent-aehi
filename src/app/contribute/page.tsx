import React from 'react';
import Link from 'next/link';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { loadCurrentEdition } from '@/lib/aehi/loader';

export default async function ContributePage() {
  const data = await loadCurrentEdition();

  return (
    <PageWrapper currentEdition={data.edition}>
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-24">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-[11px] font-mono tracking-widest uppercase text-[var(--aehi-lime)] mb-6">
            Enterprise Contribution
          </div>
          <h1 className="text-4xl md:text-5xl font-head font-medium text-white leading-[1.1] mb-8">
            Add your enterprise data to the AEHI dataset.
          </h1>
          <p className="text-lg text-[var(--aehi-muted)] leading-relaxed">
            The African Enterprise Health Index relies on the anonymised operating data of hundreds of mid-market companies. By participating, you not only improve the rigor of the index, but you also receive a complimentary OS Diagnostic Scorecard for your own organisation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          <div className="bg-[var(--aehi-surface)] p-8 rounded-xl border border-[var(--aehi-border)] text-center">
            <div className="font-mono text-3xl text-white font-medium mb-2">10</div>
            <div className="text-sm text-[var(--aehi-label)] uppercase tracking-widest font-mono mb-4">Minutes</div>
            <p className="text-[var(--aehi-muted)] text-sm">To complete the secure, multi-layer diagnostic assessment.</p>
          </div>
          <div className="bg-[var(--aehi-surface)] p-8 rounded-xl border border-[var(--aehi-border)] text-center">
            <div className="font-mono text-3xl text-white font-medium mb-2">100%</div>
            <div className="text-sm text-[var(--aehi-label)] uppercase tracking-widest font-mono mb-4">Anonymised</div>
            <p className="text-[var(--aehi-muted)] text-sm">Your data is strictly anonymised before joining the aggregated index.</p>
          </div>
          <div className="bg-[var(--aehi-surface)] p-8 rounded-xl border border-[var(--aehi-border)] text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--aehi-lime)]/10 to-transparent pointer-events-none" />
            <div className="font-mono text-3xl text-[var(--aehi-lime)] font-medium mb-2">Free</div>
            <div className="text-sm text-[var(--aehi-label)] uppercase tracking-widest font-mono mb-4">Diagnostic</div>
            <p className="text-[var(--aehi-muted)] text-sm">You receive a private, detailed breakdown of your own OS layer scores.</p>
          </div>
        </div>

        <div className="text-center">
          <a 
            href="https://crelligent.com/esre" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--aehi-lime)] text-[#050505] font-medium text-lg rounded-xl hover:bg-opacity-90 transition-all shadow-[0_0_30px_rgba(0,201,133,0.2)]"
          >
            Start the Diagnostic
            <span aria-hidden="true">&rarr;</span>
          </a>
          <p className="mt-4 text-[13px] text-[var(--aehi-dim)] max-w-md mx-auto">
            You will be redirected to the secure Crelligent ESRE portal. The diagnostic is designed for C-Suite executives and founders.
          </p>
        </div>

      </div>
    </PageWrapper>
  );
}
