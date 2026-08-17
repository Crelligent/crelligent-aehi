'use client'

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import type { AEHISector } from '@/lib/aehi/types';
import { getScoreColour, LAYER_LABELS } from '@/lib/aehi/scoring';
import { TrendIndicator } from './TrendIndicator';

interface SectorScoreBarProps {
  sector: AEHISector;
  animationDelay?: number;
}

export function SectorScoreBar({ sector, animationDelay = 0 }: SectorScoreBarProps) {
  const router = useRouter();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const colour = getScoreColour(sector.score);

  return (
    <div 
      ref={ref}
      onClick={() => router.push(`/data?sector=${sector.slug}`)}
      className="group relative flex items-center gap-4 p-3 -mx-3 rounded-lg hover:bg-[var(--aehi-surface2)] cursor-pointer transition-colors"
    >
      {/* Tooltip on hover */}
      <div className="absolute left-1/2 -top-8 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 bg-[var(--aehi-surface2)] border border-[var(--aehi-border)] text-[11px] px-3 py-1.5 rounded shadow-xl whitespace-nowrap">
        <span className="text-[var(--aehi-muted)]">Primary constraint:</span> <span className="text-white font-medium">{sector.primaryConstraint} · {LAYER_LABELS[sector.primaryConstraint.toLowerCase()].name}</span>
      </div>

      <div className="w-48 shrink-0 text-[13px] font-medium text-white truncate">
        {sector.name}
      </div>

      <div className="flex-1 h-2 bg-[var(--aehi-surface)] rounded-full overflow-hidden">
        <motion.div 
          className="h-full rounded-full"
          style={{ backgroundColor: colour }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${sector.score}%` } : { width: 0 }}
          transition={{ duration: 0.6, delay: animationDelay, ease: "easeOut" }}
        />
      </div>

      <div className="w-12 shrink-0 text-right font-mono font-semibold text-[14px]" style={{ color: colour }}>
        {sector.score}
      </div>

      <div className="w-24 shrink-0 text-right">
        <TrendIndicator trend={sector.trend} />
      </div>
    </div>
  );
}
