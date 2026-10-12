import React from 'react';
import Link from 'next/link';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { EDITION, LAYERS } from '@/data/edition';

export const metadata = { title: 'Data | African Enterprise Health Index' };

export default function DataPage() {
  return (
    <PageWrapper currentEdition={`Inaugural · ${EDITION.label}`}>
      <div className="max-w-4xl mx-auto px-6 pt-12 pb-24">
        <div className="text-[11px] font-mono tracking-widest uppercase text-[var(--aehi-lime)] mb-6">Data</div>
        <h1 className="text-4xl md:text-5xl font-head font-medium text-white leading-[1.1] mb-8">
          The data explorer opens with the inaugural edition.
        </h1>
        <p className="text-lg text-[var(--aehi-muted)] leading-relaxed mb-12">
          When the {EDITION.label} edition publishes, this page will show OS Performance Scores by sector, revenue band and location,
          broken down across the five layers. We only publish a breakdown when there are enough enterprises in it to be meaningful and to keep every company anonymous.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-12" aria-label="Layers that will be reported">
          {LAYERS.map((l) => (
            <div key={l.code} className="rounded-lg border border-dashed border-[var(--aehi-border)] p-4 text-center">
              <div className="font-mono text-[var(--aehi-lime)]">{l.code}</div>
              <div className="text-xs text-[var(--aehi-muted)] mt-1">{l.name}</div>
              <div className="font-mono text-2xl text-white/20 mt-3" aria-label="No score yet">–</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/contribute" className="px-6 py-3 bg-[var(--aehi-lime)] text-[#050505] font-medium rounded-lg text-center">Contribute your enterprise</Link>
          <Link href="/report" className="px-6 py-3 border border-white/20 text-white/80 rounded-lg text-center">Get notified when it publishes</Link>
        </div>
      </div>
    </PageWrapper>
  );
}
