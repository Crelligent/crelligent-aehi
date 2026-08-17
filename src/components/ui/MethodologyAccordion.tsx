'use client'

import React, { useState } from 'react';

interface MethodologySection {
  title: string;
  content: React.ReactNode;
}

interface MethodologyAccordionProps {
  sections: MethodologySection[];
}

export function MethodologyAccordion({ sections }: MethodologyAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  return (
    <div className="divide-y divide-[var(--aehi-border)] border-y border-[var(--aehi-border)]">
      {sections.map((section, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="py-6">
            <button 
              className="w-full flex items-center justify-between text-left focus:outline-none"
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <h3 className="text-xl font-head font-medium text-white pr-8">
                {index + 1}. {section.title}
              </h3>
              <div className="shrink-0 w-8 h-8 rounded-full border border-[var(--aehi-border)] flex items-center justify-center text-[var(--aehi-dim)] group-hover:text-white transition-colors">
                {isOpen ? '−' : '+'}
              </div>
            </button>
            
            {isOpen && (
              <div className="mt-6 text-[15px] text-[var(--aehi-muted)] leading-relaxed max-w-3xl pr-12 prose prose-invert">
                {section.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
