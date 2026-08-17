import React from 'react';
import { SiteNav } from './SiteNav';
import { SiteFooter } from './SiteFooter';

interface PageWrapperProps {
  children: React.ReactNode;
  currentEdition: string;
}

export function PageWrapper({ children, currentEdition }: PageWrapperProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--aehi-bg)] selection:bg-[var(--aehi-lime)] selection:text-[#050505]">
      <SiteNav currentEdition={currentEdition} />
      <main className="flex-1 pt-24 pb-16">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
