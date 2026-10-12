import React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { NotifyForm } from '@/components/forms/NotifyForm';
import { EDITION } from '@/data/edition';

export const metadata = { title: 'Inaugural report | African Enterprise Health Index' };

export default function ReportPage() {
  return (
    <PageWrapper currentEdition={`Inaugural · ${EDITION.label}`}>
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <div className="text-[11px] font-mono tracking-widest uppercase text-[var(--aehi-lime)] mb-6">
              Inaugural report · {EDITION.label}
            </div>
            <h1 className="text-4xl md:text-5xl font-head font-medium text-white leading-[1.1] mb-8">
              The first AEHI report is being written now.
            </h1>
            <div className="text-[var(--aehi-muted)] text-lg leading-relaxed space-y-5">
              <p>The inaugural edition will benchmark the operating health of Nigerian mid-market enterprises across the five layers of the ESRE OS. It will set out:</p>
              <ul className="text-sm space-y-2 font-medium text-white">
                <li className="flex gap-3"><span className="text-[var(--aehi-lime)]">→</span> Where enterprises are most often constrained, layer by layer</li>
                <li className="flex gap-3"><span className="text-[var(--aehi-lime)]">→</span> How scores differ by sector and company size, where the sample allows</li>
                <li className="flex gap-3"><span className="text-[var(--aehi-lime)]">→</span> What separates the healthiest operators from the rest</li>
                <li className="flex gap-3"><span className="text-[var(--aehi-lime)]">→</span> The full method and sample, so readers can judge the evidence</li>
              </ul>
              <p className="text-sm">Leave your details and we&apos;ll send it to you when it publishes.</p>
            </div>
          </div>
          <div>
            <NotifyForm editionLabel={EDITION.label} />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
