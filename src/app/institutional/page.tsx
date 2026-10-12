import React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { InstitutionalInquiry } from '@/components/forms/InstitutionalInquiry';
import { EDITION } from '@/data/edition';

export default function InstitutionalPage() {

  return (
    <PageWrapper currentEdition={`Inaugural · ${EDITION.label}`}>
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          <div className="sticky top-32">
            <div className="text-[11px] font-mono tracking-widest uppercase text-[var(--aehi-lime)] mb-6">
              Partners & institutions
            </div>
            
            <h1 className="text-4xl md:text-5xl font-head font-medium text-white leading-[1.1] mb-8">
              Build the index with us.
            </h1>
            
            <div className="text-lg text-[var(--aehi-muted)] leading-relaxed mb-12">
              The AEHI is in its first edition. We are looking for research partners to review the method, networks that can invite their members to take part, and institutions that want access to the data once it is published.
            </div>

            <div className="space-y-8">
              <div className="bg-[#050B14] p-6 rounded-xl border border-[var(--aehi-border)]">
                <h3 className="font-head text-white text-xl mb-2">Research partners</h3>
                <p className="text-sm text-[var(--aehi-muted)]">Universities and research institutes can shape the survey and scoring, co-author findings and use the anonymised dataset for their own research.</p>
              </div>
              <div className="bg-[#050B14] p-6 rounded-xl border border-[var(--aehi-border)]">
                <h3 className="font-head text-white text-xl mb-2">Networks and associations</h3>
                <p className="text-sm text-[var(--aehi-muted)]">Invite your members to take the diagnostic. Every participant gets a private score, and your network gets a view of how its members compare.</p>
              </div>
              <div className="bg-[#050B14] p-6 rounded-xl border border-[var(--aehi-border)]">
                <h3 className="font-head text-white text-xl mb-2">Investors and lenders</h3>
                <p className="text-sm text-[var(--aehi-muted)]">Run the diagnostic across portfolio companies for a baseline, and access benchmark data once editions are published.</p>
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
