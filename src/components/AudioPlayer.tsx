import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const toggleSound = () => {
    if (isPlaying) {
      // Stop sound smoothly
      if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 1.2);
        setTimeout(() => {
          osc1Ref.current?.stop();
          osc2Ref.current?.stop();
          audioCtxRef.current?.close();
          audioCtxRef.current = null;
          setIsPlaying(false);
        }, 1200);
      } else {
        setIsPlaying(false);
      }
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        // Warm 432Hz ambient chord (A4 = 432Hz harmonic soothing pitch)
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 2.5); // Soft fade-in
        gain.connect(ctx.destination);
        gainRef.current = gain;

        // Fundamental tone 216Hz
        const osc1 = ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(216, ctx.currentTime);
        osc1.connect(gain);
        osc1.start();
        osc1Ref.current = osc1;

        // Perfect Fifth 324Hz for deep peace
        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(324, ctx.currentTime);
        osc2.connect(gain);
        osc2.start();
        osc2Ref.current = osc2;

        setIsPlaying(true);
      } catch (err) {
        console.error("Audio Web API error:", err);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      title={isPlaying ? "Pausar música de paz" : "Activar ambiente sonoro de paz (432Hz)"}
      className={`relative w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 shadow-xs ${
        isPlaying
          ? 'bg-[#EAE0D3] text-[#8B5A2B] border-[#C8B29B] animate-pulse'
          : 'bg-[#FAF5EF]/80 text-[#3A2A1A] border-[#E2D5C5] hover:bg-[#F2E8DC] hover:text-[#4A3E3D]'
      }`}
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 text-[#8B5A2B]" />
      ) : (
        <VolumeX className="w-5 h-5 opacity-70" />
      )}
    </button>
  );
};
