import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, ArrowRight } from 'lucide-react';

interface IntroVideoStageProps {
  onContinue: () => void;
  onStartMusic: () => void;
}

export const IntroVideoStage: React.FC<IntroVideoStageProps> = ({ onContinue, onStartMusic }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleProceed = () => {
    if (isExiting) return;
    setIsExiting(true);
    // Stop video audio cleanly before moving to the envelope
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onStartMusic();
    setTimeout(() => {
      onContinue();
    }, 450);
  };

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    // Attempt unmuted autoplay first as requested
    vid.muted = false;
    vid.loop = true;

    const attemptPlay = async () => {
      try {
        await vid.play();
        setIsMuted(false);
      } catch {
        // Keep the intro visible when browser autoplay policy blocks its sound.
        vid.muted = true;
        setIsMuted(true);
        try {
          await vid.play();
        } catch {
          // ignore
        }
      }
    };

    attemptPlay();
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setIsMuted(vid.muted);
    if (!vid.muted) {
      vid.play().catch(() => {});
    }
  };

  return (
    <section
      className={`w-full max-w-[660px] mt-3 sm:mt-5 text-center transition-all duration-500 ease-in-out ${
        isExiting ? 'opacity-0 scale-95 -translate-y-2 pointer-events-none' : 'opacity-100 scale-100 animate-fade-in'
      }`}
      aria-label="Sacred Ganesh and Lakshmi Invitation Introduction"
    >
      {/* Auspicious Sanskrit & English Title */}
      <p className="font-nepali text-xs sm:text-sm tracking-wider text-[#701a41]/90 font-semibold mb-1">
        ॐ श्री गणेशाय नमः · श्री महालक्ष्म्यै नमः
      </p>
      <p className="font-serif-cormorant text-xl sm:text-2xl italic text-[#701a41] mb-4 tracking-wide">
        Divine blessings welcoming you to Shriva&apos;s Pasni
      </p>

      {/* Ornate Cinema Video Container */}
      <div
        className="relative w-full aspect-video rounded-[26px] overflow-hidden border-2 border-[#d4af37]/80 bg-[#2a0b18] group"
        style={{
          boxShadow: '0 24px 60px rgba(112, 26, 65, 0.28), 0 0 0 4px rgba(247, 220, 232, 0.55)'
        }}
      >
        <video
          ref={videoRef}
          src={`${import.meta.env.BASE_URL}assets/aistudio/Deities_holding_invitation_envelope_a8867fb8_1080p_cf317054.mp4`}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Subtle warm vignette */}
        <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-[#f3d06b]/40 rounded-[24px]" />

        {/* Top-Right Video Sound Control */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#3b202b]/75 hover:bg-[#3b202b]/95 text-[#fff8ef] text-[0.7rem] font-medium backdrop-blur-sm border border-[#d4af37]/50 transition-all cursor-pointer"
            title={isMuted ? 'Unmute video sound' : 'Mute video sound'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#f7dce8]" />
                <span>Unmute</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#f3d06b]" />
                <span>Sound On</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Continue to Envelope Button */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handleProceed}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#701a41] to-[#4f102d] text-white px-7 py-3 rounded-full font-sans text-xs sm:text-sm font-semibold tracking-[1.8px] uppercase shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200 cursor-pointer"
        >
          <span>Continue to Envelope</span>
          <ArrowRight className="w-4 h-4 text-[#f3d06b]" />
        </button>
      </div>
    </section>
  );
};
