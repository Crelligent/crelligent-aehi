import React from 'react';
import Link from 'next/link';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { InstitutionalInquiry } from '@/components/forms/InstitutionalInquiry';
import { HeroMesh } from '@/components/landing/HeroMesh';
import { DiagnosticOrb } from '@/components/landing/DiagnosticOrb';
import { EDITION, HYPOTHESES, LAYERS } from '@/data/edition';

const STEPS = [
  { when: 'Now', what: 'Enterprises take the diagnostic. Each one gets a private score across the five layers.' },
  { when: 'Q4 2026', what: 'Inaugural edition: what the data shows, with the sample size and method stated in full.' },
  { when: 'Every quarter after', what: 'New editions, so leaders and investors can track how operating health changes.' },
];

export default function HomePage() {
  return (
    <PageWrapper currentEdition={`Inaugural · ${EDITION.label}`}>
      {/* 1. Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden flex flex-col items-center justify-center text-center min-h-[560px]">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] max-w-full bg-gradient-to-b from-[var(--aehi-surface2)] to-transparent blur-[100px] rounded-full pointer-events-none z-0 opacity-50" />
        <HeroMesh />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="text-[11px] font-mono tracking-widest uppercase text-[var(--aehi-lime)] mb-6">{EDITION.statusLabel}</div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-head font-thin tracking-wide leading-tight mb-8 text-transparent bg-clip-text bg-gradient-to-br from-[#0052FF] to-[var(--aehi-lime)]">
            African Enterprise<br />Health Index
          </h1>
          <div className="flex justify-center mb-8"><span className="w-12 h-1 bg-white" /></div>
          <p className="text-base md:text-lg text-[var(--aehi-muted)] leading-relaxed mb-10 max-w-3xl mx-auto font-sans font-light">
            A quarterly benchmark of how well Nigerian mid-market enterprises are run: scored layer by layer, from business design to governance,
            so leaders and investors can see where operating systems break down.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contribute" className="px-8 py-4 bg-[var(--aehi-lime)] text-[#050505] font-medium rounded-xl hover:bg-opacity-90 transition-all">
              Contribute your enterprise
            </Link>
            <Link href="/methodology" className="px-8 py-4 border border-white/20 text-white/80 font-medium rounded-xl hover:bg-white/5 transition-all">
              Read the methodology
            </Link>
          </div>
        </div>
      </section>

      {/* 2. What the index measures */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-head font-thin tracking-wide text-white mb-4">What the index measures</h2>
            <p className="text-[var(--aehi-muted)] font-light max-w-2xl mx-auto">
              Every enterprise is scored on the five layers of Crelligent&apos;s ESRE OS framework. Each layer is scored out of 10 and combined into one OS Performance Score out of 100.
            </p>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-5 gap-0 border-t border-l border-[var(--aehi-border)] bg-[var(--aehi-surface)]">
            {LAYERS.map((l) => (
              <li key={l.code} className="p-6 md:p-7 border-r border-b border-[var(--aehi-border)] flex flex-col gap-3">
                <span className="font-mono text-2xl font-light text-[var(--aehi-lime)]">{l.code}</span>
                <span className="font-head text-lg text-white">{l.name}</span>
                <span className="text-sm text-[var(--aehi-muted)] leading-relaxed">{l.measures}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3. What we are testing */}
      <section className="py-24 bg-[#050B14] border-y border-[var(--aehi-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-head font-thin tracking-wide text-white mb-4">What the first edition will test</h2>
            <p className="text-[var(--aehi-muted)] font-light max-w-2xl mx-auto">
              Three patterns we see repeatedly in Crelligent&apos;s diagnostic work. These are hypotheses. The index exists to find out how widely they hold.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HYPOTHESES.map((h, i) => (
              <div key={h.title} className="p-8 rounded-2xl bg-[var(--aehi-surface)] border border-[var(--aehi-border)]">
                <div className="text-[10px] font-mono tracking-widest uppercase text-[var(--aehi-label)] mb-4">Hypothesis {i + 1}</div>
                <h3 className="text-xl font-head text-white mb-3">{h.title}</h3>
                <p className="text-sm text-[var(--aehi-muted)] leading-relaxed">{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Timeline */}
      <section className="py-24 max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-head font-thin tracking-wide text-white mb-10 text-center">How the index comes together</h2>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <li key={s.when} className="p-6 rounded-xl border border-[var(--aehi-border)] bg-[var(--aehi-surface)]">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs text-[var(--aehi-label)]">0{i + 1}</span>
                <span className="font-head text-white">{s.when}</span>
              </div>
              <p className="text-sm text-[var(--aehi-muted)] leading-relaxed">{s.what}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 5. Diagnostic */}
      <section className="py-12 max-w-7xl mx-auto px-6">
        <div className="bg-[var(--aehi-surface)] border border-[var(--aehi-border)] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl relative">
          <div className="w-full md:w-5/12 bg-[#030712] flex items-center justify-center relative overflow-hidden border-r border-[var(--aehi-border)] min-h-[300px]">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--aehi-lime)]/5 to-transparent pointer-events-none z-20" />
            <DiagnosticOrb />
          </div>
          <div className="w-full md:w-7/12 p-10 md:p-16 flex flex-col justify-center">
            <h2 className="text-3xl font-head font-thin tracking-wide text-white mb-4">Get your own score</h2>
            <p className="text-[15px] text-[var(--aehi-muted)] font-light mb-8 max-w-md leading-relaxed">
              Take the ESRE OS diagnostic in about 10 minutes. You see your OS Performance Score straight away, and your anonymised answers help build the first edition.
            </p>
            <div>
              <a href={EDITION.diagnosticUrl} className="text-[var(--aehi-lime)] font-mono text-sm tracking-widest uppercase hover:underline underline-offset-4">
                Take the diagnostic &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Partners */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-head font-thin tracking-wide text-white mb-4">Work with us on the index</h2>
            <p className="text-[var(--aehi-muted)] font-light">
              We are looking for research partners, and for associations and networks that can invite their members to take part.
            </p>
          </div>
          <InstitutionalInquiry />
        </div>
      </section>
    </PageWrapper>
  );
}
