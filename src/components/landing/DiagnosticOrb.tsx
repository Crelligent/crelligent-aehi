'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThinkingOrb, OrbState } from 'thinking-orbs';

const DIAGNOSTIC_STAGES = [
  { state: 'breathing' as OrbState, text: 'SYSTEM IDLE', subtext: 'Awaiting Enterprise Telemetry' },
  { state: 'searching' as OrbState, text: 'SCANNING', subtext: 'Connecting to L1_STRAT...' },
  { state: 'working' as OrbState, text: 'ANALYZING', subtext: 'Computing cohesion across 5 layers' },
  { state: 'solving' as OrbState, text: 'RESOLVING', subtext: 'Detecting critical bottlenecks' },
  { state: 'shaping' as OrbState, text: 'COMPLETE', subtext: 'Target Architecture generated' }
];

export function DiagnosticOrb() {
  const [stageIndex, setStageIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) {
      setStageIndex(0);
      return;
    }

    // Cycle through stages
    let current = 1;
    const interval = setInterval(() => {
      if (current >= DIAGNOSTIC_STAGES.length - 1) {
        clearInterval(interval);
        setTimeout(() => setIsRunning(false), 4000); // Reset after 4s
      }
      setStageIndex(current);
      current++;
    }, 2500); // 2.5s per stage

    return () => clearInterval(interval);
  }, [isRunning]);

  const currentStage = DIAGNOSTIC_STAGES[stageIndex];

  return (
    <div 
      className="absolute inset-0 flex flex-col items-center justify-center p-8 cursor-pointer group"
      onClick={() => !isRunning && setIsRunning(true)}
    >
      <div className="relative flex items-center justify-center mb-8">
        {/* Background abstract rings */}
        <div className="absolute w-48 h-48 rounded-full border border-white/5" />
        <div className="absolute w-32 h-32 rounded-full border border-white/10" />
        
        {/* The Thinking Orb (scaled up slightly for impact, keeping native 64px resolution) */}
        <div className="relative z-10 transform scale-150 drop-shadow-[0_0_15px_rgba(0,201,133,0.3)]">
          <ThinkingOrb 
            state={currentStage.state} 
            size={64} 
            theme="dark" 
            speed={isRunning ? 1.2 : 0.8}
          />
        </div>

        {/* Hover prompt (only when idle) */}
        {!isRunning && (
          <div className="absolute -bottom-8 whitespace-nowrap text-[9px] font-mono tracking-widest text-[var(--aehi-lime)] opacity-0 group-hover:opacity-100 transition-opacity">
            [ CLICK TO RUN DIAGNOSTIC ]
          </div>
        )}
      </div>

      <div className="text-center h-16 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage.text}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className={`font-mono text-sm tracking-[0.2em] font-medium mb-1 ${isRunning ? 'text-[var(--aehi-lime)]' : 'text-white/60'}`}>
              {currentStage.text}
            </div>
            <div className="text-[10px] font-sans font-light tracking-wide text-white/40 uppercase">
              {currentStage.subtext}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
