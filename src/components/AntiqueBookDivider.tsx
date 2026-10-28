import React from 'react';

export const AntiqueBookDivider: React.FC = () => (
  <div className="relative z-10 flex items-center justify-center gap-3 px-4 sm:px-6 py-0.5 max-w-2xl mx-auto opacity-75 select-none pointer-events-none text-[#7D4D22]">
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#8B5A2B]/40 to-[#8B5A2B]/70" />
    <svg className="w-24 h-6 text-[#7D4D22] shrink-0" viewBox="0 0 160 28" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M50,14 C42,10 32,8 10,14 M45,14 C38,18 28,20 18,17" />
      <path d="M35,11 C32,8 26,9 28,13 C32,14 36,13 35,11 Z" fill="currentColor" fillOpacity="0.35" />
      <path d="M24,19 C22,22 17,21 18,17 C21,16 25,17 24,19 Z" fill="currentColor" fillOpacity="0.35" />
      <circle cx="80" cy="14" r="3.5" fill="currentColor" fillOpacity="0.8" />
      <circle cx="80" cy="14" r="7" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
      <path d="M80,3 L82.5,10 L89,14 L82.5,18 L80,25 L77.5,18 L71,14 L77.5,10 Z" fill="currentColor" fillOpacity="0.25" />
      <circle cx="68" cy="14" r="1.5" fill="currentColor" />
      <circle cx="92" cy="14" r="1.5" fill="currentColor" />
      <path d="M110,14 C118,10 128,8 150,14 M115,14 C122,18 132,20 142,17" />
      <path d="M125,11 C128,8 134,9 132,13 C128,14 124,13 125,11 Z" fill="currentColor" fillOpacity="0.35" />
      <path d="M136,19 C138,22 143,21 142,17 C139,16 135,17 136,19 Z" fill="currentColor" fillOpacity="0.35" />
    </svg>
    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#8B5A2B]/40 to-[#8B5A2B]/70" />
  </div>
);
