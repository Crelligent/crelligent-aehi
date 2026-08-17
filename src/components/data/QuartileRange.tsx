import React from 'react';

interface QuartileRangeProps {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  score: number;
  sectorName: string;
}

export function QuartileRange({ min, q1, median, q3, max, score, sectorName }: QuartileRangeProps) {
  // We'll normalize the track to 0-100% based on the max possible score (100)
  // For better visualization, we map 0-100 directly to percentages.
  
  return (
    <div className="w-full">
      <div className="text-[11px] font-mono tracking-widest uppercase text-[var(--aehi-label)] mb-6">
        Score distribution for {sectorName}
      </div>
      
      <div className="relative h-[2px] bg-[var(--aehi-surface2)] w-full rounded-full">
        
        {/* Interquartile Range (Q1 to Q3) */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 h-2 bg-[var(--aehi-dim)] rounded-full"
          style={{ left: `${q1}%`, width: `${q3 - q1}%` }}
        />
        
        {/* Median Marker */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-[var(--aehi-muted)]"
          style={{ left: `${median}%` }}
        />
        
        {/* Min Marker */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-0.5 h-3 bg-[var(--aehi-dim)]"
          style={{ left: `${min}%` }}
        />
        <div className="absolute top-3 text-[10px] font-mono text-[var(--aehi-dim)] -translate-x-1/2" style={{ left: `${min}%` }}>
          {min}
        </div>
        
        {/* Max Marker */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-0.5 h-3 bg-[var(--aehi-dim)]"
          style={{ left: `${max}%` }}
        />
        <div className="absolute top-3 text-[10px] font-mono text-[var(--aehi-dim)] -translate-x-1/2" style={{ left: `${max}%` }}>
          {max}
        </div>

        {/* Sector Score Dot */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] z-10"
          style={{ left: `${score}%`, transform: 'translate(-50%, -50%)' }}
        >
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[12px] font-mono font-medium text-white bg-[var(--aehi-surface2)] px-2 py-0.5 rounded border border-[var(--aehi-border)]">
            {score}
          </div>
        </div>
        
      </div>
      
      <div className="flex justify-between mt-8 text-[11px] font-mono text-[var(--aehi-dim)]">
        <span>Bottom 25%</span>
        <span>Median</span>
        <span>Top 25%</span>
      </div>
    </div>
  );
}
