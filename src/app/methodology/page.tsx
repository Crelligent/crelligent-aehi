import React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { MethodologyAccordion } from '@/components/ui/MethodologyAccordion';
import { EDITION } from '@/data/edition';

export default function MethodologyPage() {

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
          
        </>
      )
    },
    {
      title: 'Data Collection & Sampling',
      content: (
        <>
          <p>The inaugural {EDITION.label} edition is collecting data now. Data comes from:</p>
          <ol>
            <li>Diagnostic assessments completed by CEOs, founders and senior executives on the Crelligent platform.</li>
            <li>Anonymised results from Crelligent client diagnostics, where clients consent.</li>
          </ol>
          <p>The target population is Nigerian mid-market enterprises: typically 20 or more full-time staff and annual revenue above ₦500M. Each edition states its final sample size, how it was drawn and its limitations. A sector is only reported separately when it has enough responses to be meaningful; otherwise it is folded into a broader group.</p>
        </>
      )
    },
    {
      title: 'Scoring',
      content: (
        <>
          <p>Each of the five layers is scored out of 10 from the diagnostic answers. The layer scores combine into an OS Performance Score out of 100. The Operating Model (L2) carries the highest weight, because in Crelligent&apos;s experience it is the layer that most often holds an enterprise back; the index will test that assumption.</p>
          <p>Score bands (healthy, at risk, critical) and quartile thresholds are set from the data once each edition&apos;s sample is complete, not in advance.</p>
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
            <li>Results are only published in aggregate, by sector, location or revenue band.</li>
            <li>If a sector or sub-segment contains fewer than 5 enterprises, that data is merged into a broader category to prevent backward identification.</li>
          </ul>
        </>
      )
    }
  ];

  return (
    <PageWrapper currentEdition={`Inaugural · ${EDITION.label}`}>
      <div className="max-w-4xl mx-auto px-6 pt-12 pb-24">
        
        <div className="mb-16">
          <div className="text-[11px] font-mono tracking-widest uppercase text-[var(--aehi-lime)] mb-6">
            Methodology & Rigour
          </div>
          <h1 className="text-4xl md:text-5xl font-head font-medium text-white leading-[1.1] mb-8">
            How the index is constructed.
          </h1>
          <p className="text-lg text-[var(--aehi-muted)] leading-relaxed">
            The AEHI measures how well an enterprise is run, layer by layer, using Crelligent's ESRE OS assessment framework. This page sets out the method for the inaugural edition. We will publish any changes alongside each edition.
          </p>
        </div>

        <MethodologyAccordion sections={sections} />

      </div>
    </PageWrapper>
  );
}
