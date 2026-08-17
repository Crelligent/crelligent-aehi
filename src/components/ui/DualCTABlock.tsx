import React from 'react';
import Link from 'next/link';

interface DualCTABlockProps {
  diagnosticUrl: string;
  institutionalPath: string;
}

export function DualCTABlock({ diagnosticUrl, institutionalPath }: DualCTABlockProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--aehi-border)] rounded-2xl overflow-hidden border border-[var(--aehi-border)]">
      
      {/* Left Block */}
      <div className="bg-[var(--aehi-surface)] p-10 flex flex-col items-start hover:bg-[var(--aehi-surface2)] transition-colors h-full">
        <div className="text-[10px] font-mono tracking-widest uppercase text-[var(--aehi-label)] mb-4">
          For CEOs and Founders
        </div>
        <h3 className="text-2xl font-head font-medium text-white mb-4">
          Benchmark your enterprise against your sector
        </h3>
        <p className="text-[14px] text-[var(--aehi-muted)] mb-10 flex-1 leading-relaxed max-w-[90%]">
          Take the free ESRE OS Diagnostic (10 minutes). Get your OS Performance Score alongside your sector's AEHI benchmark. Your anonymised responses contribute to the next AEHI edition.
        </p>
        <Link 
          href={diagnosticUrl} 
          className="px-6 py-3 bg-[var(--aehi-lime)] text-[#050505] font-medium text-sm rounded-[10px] hover:bg-opacity-90 transition-all shadow-[0_0_20px_rgba(0,201,133,0.15)] inline-flex items-center gap-2"
        >
          Take the free diagnostic
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      {/* Right Block */}
      <div className="bg-[var(--aehi-surface)] p-10 flex flex-col items-start hover:bg-[var(--aehi-surface2)] transition-colors h-full">
        <div className="text-[10px] font-mono tracking-widest uppercase text-[var(--aehi-label)] mb-4">
          For PE Firms, DFIs & Institutional Investors
        </div>
        <h3 className="text-2xl font-head font-medium text-white mb-4">
          Access the full AEHI dataset
        </h3>
        <p className="text-[14px] text-[var(--aehi-muted)] mb-10 flex-1 leading-relaxed max-w-[90%]">
          The premium AEHI report includes full sector data, sub-dimension analysis, revenue band breakdowns, and raw anonymised data tables. Annual data licenses available.
        </p>
        <Link 
          href={institutionalPath} 
          className="px-6 py-3 bg-transparent text-white border border-[var(--aehi-border)] font-medium text-sm rounded-[10px] hover:bg-white/5 transition-all inline-flex items-center gap-2"
        >
          Request the full dataset
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

    </div>
  );
}
