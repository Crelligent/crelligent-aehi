import React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { MethodologyAccordion } from '@/components/ui/MethodologyAccordion';
import { loadCurrentEdition } from '@/lib/aehi/loader';

export default async function MethodologyPage() {
  const data = await loadCurrentEdition();

  const sections = [
    {
      title: 'The ESRE OS Framework',
      content: (
        <>
          <p>The AEHI is built on the Enterprise System Redesign Engagement (ESRE) OS framework, developed by Crelligent. This framework posits that any enterprise functions as an operating system composed of five interconnected layers:</p>
          <ul>
            <li><strong>L1 (Business Design):</strong> The commercial logic, revenue model, and strategic positioning.</li>
            <li><strong>L2 (Operating Model):</strong> The process architecture and resource allocation mechanisms.</li>
            <li><strong>L3 (Technology):</strong> The digital infrastructure and application runtime.</li>
            <li><strong>L4 (Data & Intelligence):</strong> The sensing layer, telemetry feeds, and analytical capabilities.</li>
            <li><strong>L5 (Governance):</strong> Risk management, compliance, and strategic control.</li>
          </ul>
          <p>The index scores each layer out of 10. The overall OS Performance Score is an aggregate of these layer scores, weighted according to the sector's specific structural demands.</p>
        </>
      )
    },
    {
      title: 'Data Collection & Sampling',
      content: (
        <>
          <p>The data for the {data.edition} edition is derived from a sample size of {data.sampleSize} mid-market enterprises operating in Nigeria. Data is collected through:</p>
          <ol>
            <li>Direct diagnostic assessments completed by C-suite executives via the Crelligent platform.</li>
            <li>Anonymised telemetry from active ESRE OS installations managed by Crelligent.</li>
            <li>Structured interviews and audits conducted by our institutional partners.</li>
          </ol>
          <p>To qualify for inclusion, an enterprise must have annual revenues exceeding ₦500M and employ a minimum of 20 full-time staff. Sectors are only represented if they have a statistically significant sample size (n {'>'}= 30).</p>
        </>
      )
    },
    {
      title: 'Scoring & Quartile Thresholds',
      content: (
        <>
          <p>Scores are normalized to a 100-point scale. The thresholds for the {data.edition} index are:</p>
          <ul>
            <li><strong>Top Quartile (Healthy):</strong> Score {data.topQuartileThreshold}–100. Enterprises exhibiting high systemic cohesion and minimal layer constraints.</li>
            <li><strong>Middle Quartiles (At Risk):</strong> Score {data.bottomQuartileThreshold + 1}–{data.topQuartileThreshold - 1}. Enterprises with localized failures or friction in specific OS layers (most commonly L2 Operating Model).</li>
            <li><strong>Bottom Quartile (Critical):</strong> Score 0–{data.bottomQuartileThreshold}. Enterprises experiencing systemic failure, high entropy, or fundamental misalignment between layers.</li>
          </ul>
        </>
      )
    },
    {
      title: 'Anonymisation Protocol',
      content: (
        <>
          <p>All enterprise data is subjected to strict anonymisation protocols before aggregation:</p>
          <ul>
            <li>Company names, executive identities, and proprietary financial metrics are stripped from the dataset.</li>
            <li>Data is aggregated strictly at the sector, geography, and revenue-band levels.</li>
            <li>If a sector or sub-segment contains fewer than 5 enterprises, that data is merged into a broader category to prevent backward identification.</li>
          </ul>
        </>
      )
    }
  ];

  return (
    <PageWrapper currentEdition={data.edition}>
      <div className="max-w-4xl mx-auto px-6 pt-12 pb-24">
        
        <div className="mb-16">
          <div className="text-[11px] font-mono tracking-widest uppercase text-[var(--aehi-lime)] mb-6">
            Methodology & Rigour
          </div>
          <h1 className="text-4xl md:text-5xl font-head font-medium text-white leading-[1.1] mb-8">
            How the index is constructed.
          </h1>
          <p className="text-lg text-[var(--aehi-muted)] leading-relaxed">
            The AEHI is an institutional-grade intelligence product. It is not an opinion survey. It measures the structural integrity of the enterprise operating system using the proprietary ESRE OS assessment framework.
          </p>
        </div>

        <MethodologyAccordion sections={sections} />

      </div>
    </PageWrapper>
  );
}
