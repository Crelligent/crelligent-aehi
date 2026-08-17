'use client'

import React, { useEffect, useState } from 'react';
import { getScoreColour } from '@/lib/aehi/scoring';

interface ScoreDisplayProps {
  score: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showDenominator?: boolean;
  animated?: boolean;
}

export function ScoreDisplay({ score, size = 'lg', showDenominator = true, animated = true }: ScoreDisplayProps) {
  const [displayScore, setDisplayScore] = useState(animated ? 0 : score);

  useEffect(() => {
    if (!animated) return;
    
    let startTimestamp: number | null = null;
    const duration = 800; // ms
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // easeOutExpo
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayScore(Math.floor(easeOut * score));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayScore(score);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [score, animated]);

  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
    xl: 'text-[80px] leading-none',
  };

  const denomSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-[30px]',
  };

  return (
    <div className="flex items-baseline gap-1 font-mono font-bold tracking-tight">
      <span className={`${sizeClasses[size]}`} style={{ color: getScoreColour(score) }}>
        {displayScore}
      </span>
      {showDenominator && (
        <span className={`${denomSizeClasses[size]} text-[var(--aehi-dim)] font-medium`}>
          /100
        </span>
      )}
    </div>
  );
}
