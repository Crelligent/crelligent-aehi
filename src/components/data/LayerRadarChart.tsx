'use client'

import React, { useState, useEffect } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import type { LayerScores } from '@/lib/aehi/types';
import { LAYER_LABELS } from '@/lib/aehi/scoring';

interface LayerRadarChartProps {
  layerScores: LayerScores;
  sectorName: string;
}

export function LayerRadarChart({ layerScores, sectorName }: LayerRadarChartProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const data = [
    { layer: 'L1', score: layerScores.l1, fullMark: 10 },
    { layer: 'L2', score: layerScores.l2, fullMark: 10 },
    { layer: 'L3', score: layerScores.l3, fullMark: 10 },
    { layer: 'L4', score: layerScores.l4, fullMark: 10 },
    { layer: 'L5', score: layerScores.l5, fullMark: 10 },
  ];

  if (!mounted) return <div className="h-[300px] bg-[var(--aehi-surface)] animate-pulse rounded-full opacity-10" />;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const label = LAYER_LABELS[data.layer.toLowerCase()];
      return (
        <div className="bg-[var(--aehi-surface2)] border border-[var(--aehi-border)] p-3 rounded-lg shadow-xl">
          <p className="text-[11px] font-mono text-[var(--aehi-label)] mb-1 uppercase tracking-widest">{data.layer} · {label.name}</p>
          <p className="text-[18px] font-mono font-medium" style={{ color: 'var(--aehi-lime)' }}>
            {data.score.toFixed(1)} <span className="text-[var(--aehi-dim)] text-sm">/ 10</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="rgba(255,255,255,0.05)" />
          <PolarAngleAxis 
            dataKey="layer" 
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11, fontFamily: 'IBM Plex Mono' }} 
          />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Radar 
            name={sectorName} 
            dataKey="score" 
            stroke="var(--aehi-lime)" 
            fill="var(--aehi-lime)" 
            fillOpacity={0.15} 
            dot={{ fill: 'var(--aehi-lime)', r: 3 }} 
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-out"
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
