'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function DataStream() {
  const [mounted, setMounted] = useState(false);
  
  // We'll store an array of data objects instead of just strings
  interface TelemetryItem {
    id: string;
    layer: string;
    status: string;
    sector: string;
    cohesion: number;
    latency: number;
  }
  
  const [streams, setStreams] = useState<TelemetryItem[][]>([[], [], []]);

  useEffect(() => {
    const generateTelemetry = (): TelemetryItem[] => {
      const items: TelemetryItem[] = [];
      const layers = ['L1_STRAT', 'L2_OPMOD', 'L3_TECH', 'L4_DATA', 'L5_GOV'];
      const statuses = ['NOMINAL', 'DEGRADED', 'OPTIMAL', 'CRITICAL', 'SYNCING'];
      const sectors = ['FIN_SVC', 'MANUFAC', 'AGRITECH', 'ENERGY', 'RETAIL'];
      
      for (let i = 0; i < 30; i++) {
        items.push({
          id: Math.random().toString(36).substring(7),
          layer: layers[Math.floor(Math.random() * layers.length)],
          status: statuses[Math.floor(Math.random() * statuses.length)],
          sector: sectors[Math.floor(Math.random() * sectors.length)],
          cohesion: Math.floor(Math.random() * 60 + 30), // 30% to 90%
          latency: Math.floor(Math.random() * 120 + 10),
        });
      }
      return items;
    };

    setStreams([generateTelemetry(), generateTelemetry(), generateTelemetry()]);
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0 bg-[#030712]" />;
  }

  const [stream1, stream2, stream3] = streams;

  const StreamColumn = ({ items, duration, delay = 0 }: { items: TelemetryItem[], duration: number, delay?: number }) => {
    return (
      <div className="relative h-[2000px] overflow-hidden flex flex-col font-mono text-[9px] sm:text-[10px] whitespace-nowrap opacity-70">
        <motion.div
          animate={{ y: [0, -1000] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: duration,
            delay: delay
          }}
          className="flex flex-col gap-6"
        >
          {/* Double the items to ensure seamless looping */}
          {[...items, ...items].map((item, i) => (
            <div key={`${item.id}-${i}`} className="flex flex-col gap-2 text-[var(--aehi-dim)] w-full pr-4">
              <div className="flex items-center justify-between">
                <span>
                  <span className="text-[var(--aehi-lime)] opacity-80 mr-2">{'>'}</span>
                  [{item.sector}] {item.layer}
                </span>
                <span className={item.status === 'CRITICAL' ? 'text-red-400' : 'text-[var(--aehi-dim)]'}>
                  {item.status}
                </span>
              </div>
              
              {/* Horizontal Bar Chart moving with the stream */}
              <div className="flex items-center gap-3 mt-1">
                <span className="opacity-50 w-8 text-[9px]">COH:</span>
                <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full rounded-full ${
                      item.status === 'OPTIMAL' ? 'bg-[var(--aehi-lime)]' :
                      item.status === 'NOMINAL' ? 'bg-[#0052FF]' :
                      item.status === 'SYNCING' ? 'bg-purple-500' :
                      item.status === 'DEGRADED' ? 'bg-amber-400' :
                      'bg-red-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.cohesion}%` }}
                    transition={{ duration: 1, delay: Math.random() }}
                  />
                </div>
                <span className="w-6 text-right text-white font-bold">{item.cohesion}%</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#030712] pointer-events-none p-4 sm:p-8 gap-4 sm:gap-8 mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)">
      
      {/* CSS gradient mask to fade out the top and bottom of the stream */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none" 
        style={{
          background: 'linear-gradient(to bottom, #030712 0%, transparent 20%, transparent 80%, #030712 100%)'
        }}
      />
      
      <div className="w-1/3 h-full overflow-hidden opacity-50 relative z-0">
         <StreamColumn items={stream1} duration={45} />
      </div>
      
      <div className="w-1/3 h-full overflow-hidden opacity-90 relative z-0 mt-16">
         <StreamColumn items={stream2} duration={35} delay={2} />
      </div>
      
      <div className="w-1/3 h-full overflow-hidden opacity-40 relative z-0 mt-8">
         <StreamColumn items={stream3} duration={55} delay={5} />
      </div>

    </div>
  );
}
