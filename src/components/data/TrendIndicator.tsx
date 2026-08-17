import React from 'react';
import { formatTrend } from '@/lib/aehi/scoring';

interface TrendIndicatorProps {
  trend: number;
}

export function TrendIndicator({ trend }: TrendIndicatorProps) {
  const { text, colour } = formatTrend(trend);
  
  return (
    <span 
      className="font-mono text-[11px] font-medium tracking-wide"
      style={{ color: colour }}
    >
      {text}
    </span>
  );
}
