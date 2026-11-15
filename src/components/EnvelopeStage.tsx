import React, { useState } from 'react';
import { playChime } from '../utils/audio';

interface EnvelopeStageProps {
  onOpen: () => void;
  onStartOpening?: () => void;
  onReplayIntro?: () => void;
}

export const EnvelopeStage: React.FC<EnvelopeStageProps> = ({
  onOpen,
  onStartOpening,
  onReplayIntro
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    playChime('untie');
    onStartOpening?.();
    setTimeout(() => {
      onOpen();
    }, 800);
  };

  return (
    <section
      className={`w-full max-w-[490px] mt-4 sm:mt-6 text-center transition-all duration-700 ease-in-out ${
        isOpening ? 'opacity-0 scale-95 translate-y-3 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-label="Nepali Dhaka Invitation Envelope"
    >
      {/* Auspicious Devanagari & English Greeting */}
      <p className="font-nepali text-sm tracking-wider text-[#701a41]/85 font-semibold mb-1">
        ॐ श्री गणेशाय नमः · शुभ निमन्त्रणा
      </p>
      <p className="font-serif-cormorant text-2xl md:text-[1.6rem] italic text-[#701a41] mb-6 tracking-wide drop-shadow-xs">
        A sacred blessing wrapped for Shriva&apos;s Pasni
      </p>

      {/* Envelope Container with 3D Perspective */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Tap wax seal to open Shriva's Pasni invitation"
        onClick={handleOpen}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleOpen();
          }
        }}
        className="group relative w-full h-[325px] sm:h-[345px] rounded-[24px] cursor-pointer select-none focus:outline-none focus:ring-4 focus:ring-[#d87ca0]/40 transition-transform duration-300 hover:scale-[1.015]"
        style={{
          perspective: '1200px',
          boxShadow: '0 26px 65px rgba(112, 26, 65, 0.24)'
        }}
      >
        {/* Envelope Base Body */}
        <div
          className="relative w-full h-full rounded-[24px] overflow-hidden border-2 border-[#d4af37]/60"
          style={{
            background: 'linear-gradient(145deg, #e796b6 0%, #c6628a 48%, #8b2852 100%)'
          }}
        >
          {/* Traditional Nepali Dhaka Geometric Woven Pattern SVG Overlay */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 490 345"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Authentic Nepali Dhaka geometric diamond & chevron weave */}
              <pattern id="dhakaWeave" width="28" height="28" patternUnits="userSpaceOnUse">
                <rect width="28" height="28" fill="none" />
                {/* Outer diamond */}
                <polygon
                  points="14,1 27,14 14,27 1,14"
                  fill="none"
                  stroke="#F7DCE8"
                  strokeWidth="1.1"
                  opacity="0.45"
                />
                {/* Inner traditional stepped diamond */}
                <polygon
                  points="14,6 22,14 14,22 6,14"
                  fill="#D4AF37"
                  opacity="0.28"
                />
                <polygon
                  points="14,10 18,14 14,18 10,14"
                  fill="#701A41"
                  opacity="0.55"
                />
                {/* Corner triangle motifs */}
                <polygon points="0,0 6,0 0,6" fill="#FBF4ED" opacity="0.35" />
                <polygon points="28,0 22,0 28,6" fill="#FBF4ED" opacity="0.35" />
                <polygon points="0,28 6,28 0,22" fill="#FBF4ED" opacity="0.35" />
                <polygon points="28,28 22,28 28,22" fill="#FBF4ED" opacity="0.35" />
              </pattern>

              {/* Dhaka Top/Bottom Woven Border Trim */}
              <pattern id="dhakaTrim" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect width="20" height="20" fill="#701A41" opacity="0.65" />
                <polygon points="10,2 18,10 10,18 2,10" fill="none" stroke="#F3D06B" strokeWidth="1.2" />
                <circle cx="10" cy="10" r="2.2" fill="#F7DCE8" />
                <line x1="0" y1="0" x2="20" y2="0" stroke="#D4AF37" strokeWidth="1.5" />
                <line x1="0" y1="20" x2="20" y2="20" stroke="#D4AF37" strokeWidth="1.5" />
              </pattern>
            </defs>

            {/* Subtle Dhaka Weave Texture across the envelope */}
            <rect width="490" height="345" fill="url(#dhakaWeave)" opacity="0.55" />

            {/* Decorative Top & Bottom Dhaka Woven Borders */}
            <rect x="0" y="0" width="490" height="20" fill="url(#dhakaTrim)" />
            <rect x="0" y="325" width="490" height="20" fill="url(#dhakaTrim)" />

            {/* Side Envelope Fold Lines */}
            <polygon
              points="0,20 245,185 0,325"
              fill="rgba(255,244,237,0.09)"
              stroke="rgba(212,175,55,0.4)"
              strokeWidth="1"
            />
            <polygon
              points="490,20 245,185 490,325"
              fill="rgba(255,244,237,0.09)"
              stroke="rgba(212,175,55,0.4)"
              strokeWidth="1"
            />

            {/* Bottom Pocket Fold */}
            <polygon
              points="0,325 245,155 490,325"
              fill="rgba(112,26,65,0.28)"
              stroke="#D4AF37"
              strokeWidth="1.3"
            />
          </svg>

          {/* Inner Invitation Card Peeking Out During Open Animation */}
          <div
            className={`absolute left-6 right-6 bottom-5 h-[220px] rounded-t-2xl bg-[#fbf4ed] border border-[#d4af37]/50 shadow-lg flex flex-col items-center justify-start pt-6 transition-transform duration-700 ease-out ${
              isOpening ? '-translate-y-24 opacity-100' : 'translate-y-4 opacity-95'
            }`}
          >
            <span className="text-[0.68rem] tracking-[3px] uppercase text-[#701a41] font-semibold">
              निमन्त्रणा · Invitation
            </span>
            <span className="font-script-pinyon text-3xl text-[#701a41] mt-1">
              Shriva&apos;s Pasni
            </span>
          </div>

          {/* Lower Front Envelope Pocket (covers peeking card cleanly until opened) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 490 345"
            preserveAspectRatio="none"
          >
            <polygon
              points="0,345 0,130 245,220 490,130 490,345"
              fill="url(#pocketGrad)"
            />
            <defs>
              <linearGradient id="pocketGrad" x1="0" y1="130" x2="490" y2="345" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ce6c93" />
                <stop offset="50%" stopColor="#b04771" />
                <stop offset="100%" stopColor="#7a1e46" />
              </linearGradient>
            </defs>
            {/* Subtle Dhaka pattern on pocket */}
            <polygon
              points="0,345 0,130 245,220 490,130 490,345"
              fill="url(#dhakaWeave)"
              opacity="0.48"
            />
            {/* Gold trim along V-pocket */}
            <polyline
              points="0,130 245,220 490,130"
              fill="none"
              stroke="#F3D06B"
              strokeWidth="2"
            />
            {/* Bottom Dhaka border */}
            <rect x="0" y="325" width="490" height="20" fill="url(#dhakaTrim)" />
          </svg>

          {/* Bottom Pocket Personalized Label */}
          <div className="absolute bottom-8 left-0 right-0 z-20 text-center pointer-events-none">
            <p className="font-nepali text-xs tracking-[2px] text-[#fff6eb]/95 font-medium drop-shadow-xs">
              श्रीवाको शुभ पास्नी · Fort Worth, TX
            </p>
          </div>

          {/* Hinged Top Triangular Dhaka Envelope Flap */}
          <div
            className={`absolute top-0 left-0 right-0 h-[215px] z-20 origin-top transition-transform duration-700 ease-in-out ${
              isOpening ? '[transform:rotateX(175deg)] opacity-80' : '[transform:rotateX(0deg)]'
            }`}
            style={{
              transformStyle: 'preserve-3d',
              filter: 'drop-shadow(0 10px 18px rgba(79, 16, 45, 0.35))'
            }}
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 490 215"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="flapGrad" x1="245" y1="0" x2="245" y2="215" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#df89ab" />
                  <stop offset="65%" stopColor="#b64f78" />
                  <stop offset="100%" stopColor="#85224c" />
                </linearGradient>
              </defs>
              {/* Pointed Flap Shape */}
              <polygon points="0,0 490,0 245,205" fill="url(#flapGrad)" />
              <polygon points="0,0 490,0 245,205" fill="url(#dhakaWeave)" opacity="0.52" />
              {/* Top Dhaka Trim */}
              <rect x="0" y="0" width="490" height="20" fill="url(#dhakaTrim)" />
              {/* Golden piped flap border */}
              <polyline
                points="2,20 245,205 488,20"
                fill="none"
                stroke="#F3D06B"
                strokeWidth="2.5"
              />
            </svg>
          </div>

          {/* Ornate Golden Wax Seal at Flap Tip */}
          <div
            className={`absolute left-1/2 top-[192px] -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-500 ${
              isOpening ? 'scale-125 opacity-0 rotate-12' : 'group-hover:scale-105'
            }`}
          >
            <div className="animate-pulse-seal relative flex items-center justify-center">
              <svg className="w-[88px] h-[88px]" viewBox="0 0 100 100" fill="none">
                <defs>
                  <radialGradient id="waxGold" cx="38%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#FFF2B2" />
                    <stop offset="45%" stopColor="#D4AF37" />
                    <stop offset="85%" stopColor="#9D7A17" />
                    <stop offset="100%" stopColor="#755809" />
                  </radialGradient>
                </defs>
                {/* Scalloped irregular wax edge */}
                <path
                  d="M50 4 C58 5 64 9 72 10 C80 12 87 20 89 28 C94 35 96 43 95 52 C96 60 91 69 87 76 C84 85 75 90 67 93 C58 96 49 97 41 94 C32 94 23 89 17 82 C10 76 6 67 6 58 C4 49 5 40 9 32 C12 22 19 15 28 11 C35 7 43 4 50 4 Z"
                  fill="url(#waxGold)"
                  stroke="#FFF3C4"
                  strokeWidth="1.5"
                />
                {/* Inner embossed ring */}
                <circle cx="50" cy="50" r="33" stroke="#755809" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.7" />
                <circle cx="50" cy="50" r="29" fill="none" stroke="#FFF3C4" strokeWidth="1" opacity="0.6" />
                {/* Lotus & Om motif */}
                <text
                  x="50"
                  y="49"
                  textAnchor="middle"
                  fill="#5A1331"
                  fontSize="22"
                  fontWeight="bold"
                  fontFamily="Noto Serif Devanagari, serif"
                >
                  ॐ
                </text>
                <text
                  x="50"
                  y="68"
                  textAnchor="middle"
                  fill="#5A1331"
                  fontSize="9.5"
                  fontWeight="700"
                  letterSpacing="1"
                  fontFamily="Montserrat, sans-serif"
                >
                  SHRIVA
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Tap Hint */}
      <p className="mt-6 text-xs sm:text-sm font-semibold tracking-[2px] uppercase text-[#701a41] inline-flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[#d4af37]" />
        Tap golden seal to open invitation
        <span className="inline-block w-2 h-2 rounded-full bg-[#d4af37]" />
      </p>

      {onReplayIntro && (
        <div className="mt-3">
          <button
            onClick={onReplayIntro}
            className="text-xs text-[#755362] hover:text-[#701a41] underline underline-offset-4 transition-colors cursor-pointer"
          >
            ↺ Replay Ganesha &amp; Lakshmi video intro
          </button>
        </div>
      )}
    </section>
  );
};
