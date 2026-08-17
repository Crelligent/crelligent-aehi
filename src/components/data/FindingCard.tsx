import React from 'react';

interface FindingCardProps {
  finding: string;
  index: number;
}

export function FindingCard({ finding, index }: FindingCardProps) {
  const formattedIndex = (index + 1).toString().padStart(2, '0');
  
  return (
    <div className="bg-[var(--aehi-surface)] border border-[var(--aehi-border)] p-8 rounded-xl hover:border-[var(--aehi-border-soft)] transition-colors h-full flex flex-col">
      <div className="font-mono text-4xl text-[var(--aehi-dim)] font-light tracking-tighter mb-6">
        {formattedIndex}
      </div>
      <p className="text-[14px] text-[var(--aehi-muted)] leading-relaxed flex-1">
        {finding}
      </p>
    </div>
  );
}
