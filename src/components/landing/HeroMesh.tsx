'use client';

import React, { useEffect, useRef } from 'react';

export function HeroMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle resizing
    let width = window.innerWidth;
    let height = 600; // Match the hero section min-height or use parent height
    
    const setSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        canvas.width = width;
        canvas.height = height;
      }
    };
    setSize();
    window.addEventListener('resize', setSize);

    // Mouse interaction
    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Particles
    const particleCount = Math.min(Math.floor(width / 15), 100);
    const particles: { x: number, y: number, vx: number, vy: number, radius: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1
      });
    }

    // Animation Loop
    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach((p, index) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw connections
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 - (dist / 120) * 0.15})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw connection to mouse
        const dxMouse = p.x - mouse.x;
        const dyMouse = p.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < 180) {
          ctx.beginPath();
          // var(--aehi-lime) is #00C985 => rgb(0, 201, 133)
          ctx.strokeStyle = `rgba(0, 201, 133, ${0.4 - (distMouse / 180) * 0.4})`;
          ctx.lineWidth = 1.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        
        // Highlight nodes near mouse
        if (distMouse < 100) {
          ctx.fillStyle = 'rgba(0, 201, 133, 1)';
          ctx.shadowBlur = 15;
          ctx.shadowColor = 'rgba(0, 201, 133, 0.8)';
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', setSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-auto">
      <canvas
        ref={canvasRef}
        className="block w-full h-full opacity-60"
        style={{ cursor: 'crosshair' }}
      />
      {/* Dark gradient overlay to ensure text remains readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#08111F]/50 to-[#08111F] pointer-events-none" />
    </div>
  );
}
