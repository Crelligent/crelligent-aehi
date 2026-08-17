import React from 'react';
import Link from 'next/link';

interface FeaturedReportBlockProps {
  edition: string;
  overallScore: number;
}

export function FeaturedReportBlock({ edition, overallScore }: FeaturedReportBlockProps) {
  return (
    <section className="mt-16 w-full max-w-[1400px] mx-auto bg-white relative flex flex-col md:flex-row shadow-[0_10px_40px_rgba(0,0,0,0.1)] border-b-4 border-b-white">
      
      {/* Left side: Dark Blue Area with Graphics and Text */}
      <div className="w-full md:w-[65%] bg-[#03091B] relative flex overflow-hidden min-h-[480px]">
        
        {/* Concentric Circles Background */}
        <div className="absolute top-1/2 left-[-100px] -translate-y-1/2 w-[800px] h-[800px] border border-white/20 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-[-50px] -translate-y-1/2 w-[600px] h-[600px] border border-white/20 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-[0px] -translate-y-1/2 w-[400px] h-[400px] border border-white/20 rounded-full pointer-events-none" />
        
        {/* Content in the dark blue area */}
        <div className="relative z-10 p-12 lg:p-12 flex flex-col justify-start w-full md:w-1/2 h-full pt-16">
           <h2 className="text-3xl md:text-4xl font-sans font-bold text-white leading-[1.1] mb-8 tracking-tight">
             {edition}<br/>African<br/>Enterprise<br/>Health<br/>Index
           </h2>
           <p className="text-white font-sans text-[13px] font-semibold tracking-wide">
             Global Report<br/><span className="font-normal opacity-80">Operational Health Benchmark</span>
           </p>
        </div>

        {/* Images Grid on the right side of the left block */}
        <div className="hidden md:flex absolute right-0 top-0 w-1/2 h-full flex-col grayscale opacity-90 mix-blend-luminosity z-0 border-l border-white/10">
           <div className="flex-1 bg-[url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600')] bg-cover bg-center border-b border-white/10" />
           <div className="flex-1 flex border-b border-white/10">
             <div className="w-1/2 bg-[url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=400')] bg-cover bg-center border-r border-white/10" />
             <div className="w-1/2 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400')] bg-cover bg-center" />
           </div>
           <div className="flex-1 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=600')] bg-cover bg-center" />
        </div>

        {/* Crelligent Logo Bottom Left */}
        <div className="absolute bottom-10 left-12 z-50 flex items-center gap-2">
          <img src="/logo.png" alt="Crelligent Logo" className="h-6 w-auto object-contain" />
          {/* Fallback text if logo.png doesn't have the text */}
          <span className="text-white/80 font-sans font-medium text-xs tracking-wider">Crelligent<br/>Institute</span>
        </div>

      </div>

      {/* Right side: White background with paragraph */}
      <div className="w-full md:w-[35%] bg-white p-12 lg:p-14 flex flex-col justify-end text-black min-h-[480px]">
        <div className="mt-auto pt-40">
          <p className="text-[15px] text-gray-800 leading-relaxed mb-6 font-sans">
            As economic anxiety, geopolitical tension, and technological disruption intensify, people are narrowing their world to smaller, familiar circles that reflect their views, and this hinders economic and societal progress.
          </p>
          <div>
            <Link 
              href="/report"
              className="inline-flex items-center text-[#0052FF] font-sans font-medium text-[15px] hover:text-blue-800 transition-colors"
            >
              Explore the Findings <span className="ml-2 font-bold text-lg leading-none">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Overlapping White Box */}
      <div className="hidden md:flex flex-col justify-center absolute top-12 left-[48%] lg:left-[45%] z-30 bg-white p-8 lg:px-12 lg:py-10 shadow-[0_2px_15px_rgba(0,0,0,0.08)] w-[380px] xl:w-[460px]">
        <h3 className="text-2xl lg:text-3xl font-sans font-normal text-black mb-3 leading-snug tracking-tight">
          {edition} African Enterprise Health Index
        </h3>
        <p className="text-[#0052FF] font-bold text-[13px] tracking-wide uppercase font-sans">
          SYSTEMIC COHESION REPORT
        </p>
      </div>

    </section>
  );
}
