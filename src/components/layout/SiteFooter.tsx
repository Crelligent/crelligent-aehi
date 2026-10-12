import React from 'react';
import Link from 'next/link';

export function SiteFooter() {
  const links = [
    { name: 'Methodology', href: '/methodology' },
    { name: 'Contribute', href: '/contribute' },
    { name: 'Inaugural report', href: '/report' },
    { name: 'Partners', href: '/institutional' },
    { name: 'Privacy Policy', href: 'https://crelligent.com/privacy' },
  ];

  return (
    <footer className="bg-[#0D1F3C] text-white pt-16 pb-8 border-t border-white/10 mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Left */}
          <div>
            <div className="font-head font-bold text-2xl tracking-tight text-white mb-2">
              AEHI
            </div>
            <p className="text-[var(--aehi-muted)] text-sm mb-4">
              A Crelligent Intelligence Product
            </p>
            <a href="https://crelligent.com" className="text-sm font-medium hover:text-[var(--aehi-lime)] transition-colors underline underline-offset-4 decoration-white/20">
              crelligent.com
            </a>
          </div>

          {/* Center */}
          <nav className="flex flex-col gap-3">
            {links.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-sm text-[var(--aehi-muted)] hover:text-white transition-colors w-fit"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div>
            <p className="text-sm text-[var(--aehi-muted)] mb-2">
              © {new Date().getFullYear()} Crelligent & Company Limited. <br />All rights reserved.
            </p>
          </div>
        </div>

        {/* Citation Line */}
        <div className="pt-8 border-t border-white/10 text-xs text-[var(--aehi-dim)] leading-relaxed">
          <p>
            The African Enterprise Health Index is published by Crelligent &amp; Company Limited, Lagos. The inaugural edition is in preparation.
          </p>
        </div>
      </div>
    </footer>
  );
}
