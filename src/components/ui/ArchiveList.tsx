import React from 'react';
import Link from 'next/link';

interface ReportEdition {
  title: string;
  url: string;
}

interface ArchiveListProps {
  reports: ReportEdition[];
}

export function ArchiveList({ reports }: ArchiveListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
      {reports.map((report, index) => (
        <Link 
          key={index} 
          href={report.url}
          className="group block pb-6 border-b border-[var(--aehi-border)] hover:border-[var(--aehi-lime)] transition-colors"
        >
          <h4 className="text-lg font-head font-medium text-[var(--aehi-muted)] group-hover:text-white transition-colors uppercase tracking-wide">
            {report.title}
          </h4>
          <span className="text-[11px] font-mono text-[var(--aehi-label)] mt-2 block group-hover:text-[var(--aehi-lime)] transition-colors">
            Download PDF Report
          </span>
        </Link>
      ))}
    </div>
  );
}
