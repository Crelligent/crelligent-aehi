'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface SiteNavProps {
  currentEdition: string;
}

export function SiteNav({ currentEdition }: SiteNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Methodology', href: '/methodology' },
    { name: 'Contribute', href: '/contribute' },
    { name: 'Inaugural report', href: '/report' },
    { name: 'Partners', href: '/institutional' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-[var(--aehi-bg)]/90 backdrop-blur-md border-[var(--aehi-border)] py-3' 
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Left: Branding */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="Crelligent Logo" className="h-7 w-auto object-contain" />
            <div className="flex items-center gap-2">
              <span className="font-head font-bold text-xl tracking-tight text-white group-hover:text-[var(--aehi-lime)] transition-colors">
                AEHI
              </span>
              <span className="text-[var(--aehi-dim)] text-xs font-medium hidden sm:inline-block">
                by Crelligent
              </span>
            </div>
          </Link>
          <div className="hidden sm:flex items-center px-2 py-0.5 rounded-sm bg-[var(--aehi-surface)] border border-[var(--aehi-border)]">
            <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-[var(--aehi-label)]">
              {currentEdition}
            </span>
          </div>
        </div>

        {/* Center: Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-[var(--aehi-muted)] hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right: CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Link 
            href="/contribute" 
            className="px-5 py-2.5 bg-[var(--aehi-lime)] text-[#050505] font-medium text-sm rounded-[10px] hover:bg-opacity-90 transition-all shadow-[0_0_15px_rgba(0,201,133,0.2)]"
          >
            Take part
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          className="lg:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[var(--aehi-surface)] border-b border-[var(--aehi-border)] p-6 shadow-2xl flex flex-col gap-6">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-lg font-medium text-[var(--aehi-muted)] hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <Link 
            href="/contribute" 
            className="w-full text-center py-3 bg-[var(--aehi-lime)] text-[#050505] font-medium rounded-lg"
            onClick={() => setMobileMenuOpen(false)}
          >
            Take part
          </Link>
        </div>
      )}
    </header>
  );
}
