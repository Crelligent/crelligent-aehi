'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// 5 layers, so 5 axes. We'll define a few "sector shapes" (values 0-100)
const SHAPES = [
  [85, 70, 90, 60, 80], // Shape 1: Tech-heavy
  [60, 85, 50, 75, 90], // Shape 2: Process-heavy
  [95, 60, 70, 85, 50], // Shape 3: Sales-heavy
  [75, 75, 75, 75, 75], // Shape 4: Balanced
];

// Calculate coordinates for a 5-point radar given an array of 5 values (0-100)
const getPolygonPoints = (values: number[], radius: number, center: number) => {
  return values.map((val, i) => {
    // 5 points = 72 degrees apart. Start at -90 degrees (top)
    const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
    const r = (val / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');
};

export function HeroRadar() {
  const [shapeIndex, setShapeIndex] = useState(0);
  const size = 600;
  const center = size / 2;
  const maxRadius = 250;

  useEffect(() => {
    const interval = setInterval(() => {
      setShapeIndex((prev) => (prev + 1) % SHAPES.length);
    }, 4000); // Morph every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const currentPoints = getPolygonPoints(SHAPES[shapeIndex], maxRadius, center);

  // Background grid polygons
  const gridLevels = [20, 40, 60, 80, 100];

  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none overflow-hidden mix-blend-screen">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="animate-[spin_60s_linear_infinite]">
        
        {/* Draw concentric pentagon grid */}
        {gridLevels.map((level) => (
          <polygon
            key={level}
            points={getPolygonPoints([level, level, level, level, level], maxRadius, center)}
            fill="none"
            stroke="var(--aehi-border)"
            strokeWidth="1"
            className="opacity-50"
          />
        ))}

        {/* Draw axes lines */}
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
          const x = center + maxRadius * Math.cos(angle);
          const y = center + maxRadius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="var(--aehi-border)"
              strokeWidth="1"
              className="opacity-50"
            />
          );
        })}

        {/* The morphing filled radar */}
        <motion.polygon
          points={currentPoints}
          fill="url(#radarGradient)"
          stroke="var(--aehi-lime)"
          strokeWidth="2"
          animate={{ points: currentPoints }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* The glowing outer points */}
        {SHAPES[shapeIndex].map((val, i) => {
           const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
           const r = (val / 100) * maxRadius;
           const x = center + r * Math.cos(angle);
           const y = center + r * Math.sin(angle);
           return (
             <motion.circle
               key={i}
               r="4"
               fill="var(--aehi-lime)"
               animate={{ cx: x, cy: y }}
               transition={{ duration: 2, ease: "easeInOut" }}
             />
           );
        })}

        {/* Defs for gradients */}
        <defs>
          <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--aehi-lime)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--aehi-lime)" stopOpacity="0.0" />
          </radialGradient>
        </defs>

      </svg>
    </div>
  );
}
