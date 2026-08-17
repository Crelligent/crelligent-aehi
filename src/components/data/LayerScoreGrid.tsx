import React from 'react';
import type { LayerScores } from '@/lib/aehi/types';
import { getLayerScoreColour, LAYER_LABELS } from '@/lib/aehi/scoring';

interface LayerScoreGridProps {
  scores: LayerScores;
  primaryConstraintLayer?: string;
  primaryConstraintPercent?: number;
}

export function LayerScoreGrid({ scores, primaryConstraintLayer, primaryConstraintPercent }: LayerScoreGridProps) {
  const layers = ['l1', 'l2', 'l3', 'l4', 'l5'] as const;

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {layers.map(layer => {
        const score = scores[layer];
        const colour = getLayerScoreColour(score);
        const label = LAYER_LABELS[layer];
        const isPrimary = primaryConstraintLayer?.toLowerCase() === layer;
        
        return (
          <div 
            key={layer}
            className={`p-5 rounded-xl border flex flex-col ${
              isPrimary 
                ? 'bg-[var(--aehi-red)]/5 border-[var(--aehi-red)]/30' 
                : 'bg-[var(--aehi-surface)] border-[var(--aehi-border)]'
            }`}
          >
            <div className="text-[10px] font-mono tracking-widest text-[var(--aehi-label)] uppercase mb-1">
              {layer.toUpperCase()} {label.role}
            </div>
            <div className="text-sm font-medium text-[var(--aehi-text)] mb-4">
              {label.name}
            </div>
            
            <div className="mt-auto">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-2xl font-semibold" style={{ color: colour }}>
                  {score.toFixed(1)}
                </span>
                {isPrimary && (
                  <span className="text-[10px] bg-[var(--aehi-red)]/10 text-[var(--aehi-red)] px-2 py-0.5 rounded font-medium">
                    ⚠ PRIMARY
                  </span>
                )}
              </div>
              
              <div className="h-1 bg-[var(--aehi-bg)] rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full"
                  style={{ width: `${(score / 10) * 100}%`, backgroundColor: colour }}
                />
              </div>
              
              {isPrimary && primaryConstraintPercent && (
                <div className="text-[11px] text-[var(--aehi-red)] mt-3">
                  Constraint in {primaryConstraintPercent}% of enterprises
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
