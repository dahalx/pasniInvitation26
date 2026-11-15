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
    }, 850);
  };

  return (
    <>
      {/* Baby Shriva (pasni.jpg) Soft Watermark Background behind Envelope */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      >
        <img
          src={`${import.meta.env.BASE_URL}assets/aistudio/IMG_20261114_162405_2_2b73687f.jpg`}
          alt=""
          className="w-full h-full object-cover object-[center_18%] opacity-[0.26]"
          style={{ filter: 'saturate(0.88) contrast(0.95)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(251, 244, 237, 0.16) 0%, rgba(247, 228, 236, 0.48) 62%, rgba(239, 199, 217, 0.78) 100%)'
          }}
        />
      </div>

      <section
        className={`relative z-10 w-full max-w-[540px] mt-4 sm:mt-8 text-center transition-all duration-700 ease-in-out ${
          isOpening ? 'opacity-0 scale-95 translate-y-3 pointer-events-none' : 'opacity-100 scale-100'
        }`}
        aria-label="Nepali Maroon Velvet & Zari Invitation Envelope"
      >
        {/* Auspicious Devanagari Greeting Above Envelope */}
        <p className="inline-block font-nepali text-sm tracking-wider text-[#701a41] font-semibold mb-4 px-3.5 py-1 rounded-full bg-[#fffcf8]/75 backdrop-blur-[2px] shadow-2xs border border-[#eab8cd]/60">
          ॐ श्री गणेशाय नमः · शुभ निमन्त्रणा
        </p>

        {/* Sleek Horizontal Clutch Envelope Container (Lighter Maroon Velvet) */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Tap golden Om Shriva seal to open invitation"
          onClick={handleOpen}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleOpen();
            }
          }}
          className="group relative w-full h-[242px] sm:h-[272px] rounded-[14px] cursor-pointer select-none focus:outline-none focus:ring-4 focus:ring-[#d4af37]/45 transition-transform duration-300 hover:scale-[1.015] mb-10"
          style={{
            perspective: '1200px',
            boxShadow: '0 26px 60px rgba(92, 16, 36, 0.34), 0 8px 20px rgba(0, 0, 0, 0.16)'
          }}
        >
          {/* Envelope Lighter Maroon Velvet Base Body */}
          <div
            className="relative w-full h-full rounded-[14px] overflow-hidden border border-[#f3d06b]/55"
            style={{
              background: 'linear-gradient(155deg, #b82845 0%, #921933 52%, #6d0e23 100%)'
            }}
          >
            {/* Subtle Velvet Nap + Faint Dhaka Woven Sheen & Bottom Zari Pattern */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 540 272"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="velvetDhakaSheen" width="24" height="24" patternUnits="userSpaceOnUse">
                  <polygon
                    points="12,2 22,12 12,22 2,12"
                    fill="none"
                    stroke="#F3D06B"
                    strokeWidth="0.7"
                    opacity="0.2"
                  />
                  <circle cx="12" cy="12" r="1.4" fill="#F3D06B" opacity="0.18" />
                </pattern>

                {/* Rich Gold & Pearl Zari/Gota Lace Ribbon Pattern */}
                <pattern id="zariTrim" width="22" height="24" patternUnits="userSpaceOnUse">
                  <rect width="22" height="24" fill="#d4a63c" />
                  <rect y="0" width="22" height="3" fill="#fff6d6" opacity="0.92" />
                  <rect y="21" width="22" height="3" fill="#fff6d6" opacity="0.92" />
                  <rect y="3" width="22" height="18" fill="#a87b1a" opacity="0.4" />
                  {/* Braided gold diamond filigree */}
                  <polygon
                    points="11,4 20,12 11,20 2,12"
                    fill="#fae6a8"
                    stroke="#7a5308"
                    strokeWidth="0.9"
                  />
                  <polygon points="11,8 15,12 11,16 7,12" fill="#a41c38" opacity="0.88" />
                  <circle cx="11" cy="12" r="1.6" fill="#fff9e2" />
                  <circle cx="0" cy="12" r="1.5" fill="#fff9e2" />
                  <circle cx="22" cy="12" r="1.5" fill="#fff9e2" />
                </pattern>
              </defs>

              <rect width="540" height="272" fill="url(#velvetDhakaSheen)" opacity="0.45" />
            </svg>

            {/* Inner Invitation Card (stays hidden inside while closed; slides out on open) */}
            <div
              className={`absolute left-6 right-6 bottom-6 h-[185px] rounded-t-xl bg-[#fbf4ed] border border-[#d4af37]/60 shadow-lg flex flex-col items-center justify-start pt-5 transition-all duration-700 ease-out z-[5] ${
                isOpening ? '-translate-y-20 opacity-100' : 'translate-y-12 opacity-0'
              }`}
            >
              <span className="text-[0.68rem] tracking-[3px] uppercase text-[#701a41] font-semibold">
                निमन्त्रणा · Invitation
              </span>
              <span className="font-script-pinyon text-3xl text-[#701a41] mt-1">
                Shriva&apos;s Pasni
              </span>
            </div>

            {/* Front Lighter Maroon Velvet Envelope Pocket + Bottom Zari Ribbon Band */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              viewBox="0 0 540 272"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="velvetPocketGrad" x1="0" y1="0" x2="540" y2="272" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#b0223f" />
                  <stop offset="55%" stopColor="#8d1730" />
                  <stop offset="100%" stopColor="#6a0c20" />
                </linearGradient>
              </defs>
              {/* Full lower pocket up to diagonal flap seam so zero white shows when closed */}
              <polygon
                points="0,272 0,10 270,214 540,10 540,272"
                fill="url(#velvetPocketGrad)"
              />
              <polygon
                points="0,272 0,10 270,214 540,10 540,272"
                fill="url(#velvetDhakaSheen)"
                opacity="0.35"
              />
              {/* Subtle velvet crease shadow along V-seam */}
              <polyline
                points="0,10 270,214 540,10"
                fill="none"
                stroke="#430512"
                strokeWidth="3"
                opacity="0.48"
              />

              {/* Wide Decorative Gold & Pearl Zari Lace Band Across Bottom Edge */}
              <rect x="0" y="238" width="540" height="24" fill="url(#zariTrim)" />
              <line x1="0" y1="238" x2="540" y2="238" stroke="#f7e7b4" strokeWidth="1.2" />
              <line x1="0" y1="262" x2="540" y2="262" stroke="#7a5308" strokeWidth="1.2" />
            </svg>

            {/* Hinged Full-Width Lighter Maroon Velvet V-Flap with Gota/Zari Piping */}
            <div
              className={`absolute top-0 left-0 right-0 h-[222px] sm:h-[250px] z-20 origin-top transition-transform duration-700 ease-in-out ${
                isOpening ? '[transform:rotateX(175deg)] opacity-85' : '[transform:rotateX(0deg)]'
              }`}
              style={{
                transformStyle: 'preserve-3d',
                filter: 'drop-shadow(0 12px 18px rgba(48, 6, 16, 0.45))'
              }}
            >
              <svg
                className="w-full h-full"
                viewBox="0 0 540 232"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="velvetFlapGrad" x1="270" y1="0" x2="270" y2="225" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#c42c4c" />
                    <stop offset="55%" stopColor="#9c1c37" />
                    <stop offset="100%" stopColor="#771026" />
                  </linearGradient>
                </defs>

                {/* Full-width pointed velvet flap */}
                <polygon points="0,0 540,0 540,14 270,218 0,14" fill="url(#velvetFlapGrad)" />
                <polygon
                  points="0,0 540,0 540,14 270,218 0,14"
                  fill="url(#velvetDhakaSheen)"
                  opacity="0.32"
                />

                {/* Top velvet fold highlight */}
                <line x1="0" y1="2" x2="540" y2="2" stroke="#ea758d" strokeWidth="1.5" opacity="0.42" />

                {/* Gold & Pearl Gota Lace Border along the V-flap edges */}
                <polyline
                  points="1,12 270,217 539,12"
                  fill="none"
                  stroke="#d4a63c"
                  strokeWidth="6.5"
                  strokeLinejoin="round"
                />
                <polyline
                  points="1,12 270,217 539,12"
                  fill="none"
                  stroke="#fff5d4"
                  strokeWidth="3.2"
                  strokeDasharray="3 3"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Golden Glittering Foil Inscription on Top of the Envelope Flap */}
              <div className="absolute top-3.5 sm:top-5 left-0 right-0 px-6 text-center pointer-events-none">
                <p className="font-serif-cormorant italic font-bold text-[1.08rem] sm:text-[1.42rem] tracking-wide leading-tight text-gold-glitter">
                  ✦ A sacred blessing wrapped for Shriva&apos;s Pasni ✦
                </p>
              </div>
            </div>

            {/* Middle of Envelope Flap: Crimson Rose & Emerald Leaf Jeweled Brooch */}
            <div
              className={`absolute left-1/2 top-[116px] sm:top-[128px] -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-500 ${
                isOpening ? 'scale-110 opacity-0 -translate-y-8' : 'group-hover:scale-105'
              }`}
            >
              <div className="relative flex items-center justify-center drop-shadow-[0_6px_14px_rgba(45,4,14,0.45)]">
                <svg className="w-[66px] h-[74px] sm:w-[76px] sm:h-[86px]" viewBox="0 0 110 124" fill="none">
                  <defs>
                    <radialGradient id="roseCrimson" cx="42%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#ea5266" />
                      <stop offset="55%" stopColor="#b01429" />
                      <stop offset="100%" stopColor="#6f0615" />
                    </radialGradient>
                    <linearGradient id="emeraldLeaf" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#35c273" />
                      <stop offset="55%" stopColor="#178548" />
                      <stop offset="100%" stopColor="#0a4a26" />
                    </linearGradient>
                  </defs>

                  {/* Emerald-green jeweled leaves fanning below the rose */}
                  <g stroke="#f5d77f" strokeWidth="1.6">
                    <path d="M55 68 C40 72, 20 82, 16 96 C30 98, 44 88, 55 76 Z" fill="url(#emeraldLeaf)" />
                    <path d="M55 68 C70 72, 90 82, 94 96 C80 98, 66 88, 55 76 Z" fill="url(#emeraldLeaf)" />
                    <path d="M55 72 C46 84, 42 102, 55 114 C68 102, 64 84, 55 72 Z" fill="url(#emeraldLeaf)" />
                    <path d="M55 70 C36 66, 22 68, 18 76 C28 82, 42 80, 55 72 Z" fill="url(#emeraldLeaf)" opacity="0.92" />
                    <path d="M55 70 C74 66, 88 68, 92 76 C82 82, 68 80, 55 72 Z" fill="url(#emeraldLeaf)" opacity="0.92" />
                  </g>
                  <path d="M55 76 L26 91 M55 76 L84 91 M55 76 L55 106" stroke="#fff3c4" strokeWidth="1" opacity="0.75" />

                  {/* Layered Crimson Rose Petals outlined in Gold Zari */}
                  <g stroke="#f7df94" strokeWidth="1.6">
                    <circle cx="55" cy="40" r="24" fill="url(#roseCrimson)" />
                    <path d="M32 45 C24 30, 35 14, 52 16 C44 26, 42 36, 44 48 Z" fill="url(#roseCrimson)" />
                    <path d="M78 45 C86 30, 75 14, 58 16 C66 26, 68 36, 66 48 Z" fill="url(#roseCrimson)" />
                    <path d="M34 54 C30 68, 46 74, 55 66 C48 58, 42 54, 34 54 Z" fill="url(#roseCrimson)" />
                    <path d="M76 54 C80 68, 64 74, 55 66 C62 58, 68 54, 76 54 Z" fill="url(#roseCrimson)" />
                    <path d="M39 40 C38 26, 52 21, 64 26 C72 32, 70 46, 62 54 C52 60, 40 53, 39 40 Z" fill="url(#roseCrimson)" />
                    <path d="M46 39 C46 31, 56 28, 62 33 C66 39, 62 48, 54 49 C48 49, 46 44, 46 39 Z" fill="#820817" />
                    <path d="M50 38 C51 34, 57 34, 59 38 C59 42, 53 43, 50 38 Z" fill="#c9283e" />
                  </g>

                  <circle cx="55" cy="38" r="2.2" fill="#fff5cc" />
                  <circle cx="41" cy="24" r="1.4" fill="#fff5cc" />
                  <circle cx="70" cy="25" r="1.4" fill="#fff5cc" />
                  <circle cx="55" cy="96" r="1.6" fill="#fff5cc" />
                </svg>
              </div>
            </div>

            {/* Golden-Yellow Scalloped Wax Seal Circle with ॐ SHRIVA at the V-Flap Tip */}
            <div
              className={`absolute left-1/2 top-[200px] sm:top-[224px] -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-500 ${
                isOpening ? 'scale-125 opacity-0 rotate-12' : 'group-hover:scale-105'
              }`}
            >
              <div className="animate-pulse-seal relative flex items-center justify-center">
                <svg className="w-[62px] h-[62px] sm:w-[68px] sm:h-[68px]" viewBox="0 0 100 100" fill="none">
                  <defs>
                    <radialGradient id="waxGold" cx="38%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#FFF6C4" />
                      <stop offset="45%" stopColor="#E6BE43" />
                      <stop offset="85%" stopColor="#B0891A" />
                      <stop offset="100%" stopColor="#7E5F09" />
                    </radialGradient>
                  </defs>
                  {/* Scalloped golden wax seal circle */}
                  <path
                    d="M50 4 C58 5 64 9 72 10 C80 12 87 20 89 28 C94 35 96 43 95 52 C96 60 91 69 87 76 C84 85 75 90 67 93 C58 96 49 97 41 94 C32 94 23 89 17 82 C10 76 6 67 6 58 C4 49 5 40 9 32 C12 22 19 15 28 11 C35 7 43 4 50 4 Z"
                    fill="url(#waxGold)"
                    stroke="#FFF5CC"
                    strokeWidth="1.8"
                  />
                  {/* Inner embossed rings */}
                  <circle cx="50" cy="50" r="34" stroke="#755809" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.7" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="#FFF6D1" strokeWidth="1" opacity="0.65" />
                  {/* Om & SHRIVA */}
                  <text
                    x="50"
                    y="49"
                    textAnchor="middle"
                    fill="#5A1331"
                    fontSize="23"
                    fontWeight="bold"
                    fontFamily="Noto Serif Devanagari, serif"
                  >
                    ॐ
                  </text>
                  <text
                    x="50"
                    y="69"
                    textAnchor="middle"
                    fill="#5A1331"
                    fontSize="10"
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

          {/* Hanging Red & Gold Beaded Tassel (Latkan) emerging from below the Om Shriva Seal */}
          <div
            className={`absolute left-1/2 top-[222px] sm:top-[246px] -translate-x-1/2 z-[25] pointer-events-none origin-top transition-all duration-500 ${
              isOpening
                ? 'opacity-0 -translate-y-12 scale-75'
                : 'group-hover:rotate-[10deg]'
            }`}
          >
            <svg width="46" height="64" viewBox="0 0 46 68" fill="none" className="drop-shadow-[0_6px_10px_rgba(30,2,8,0.45)]">
              <defs>
                <radialGradient id="tasselRuby" cx="35%" cy="32%" r="68%">
                  <stop offset="0%" stopColor="#eb4b5e" />
                  <stop offset="55%" stopColor="#9e0c1e" />
                  <stop offset="100%" stopColor="#52020b" />
                </radialGradient>
                <linearGradient id="tasselGold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fff3c4" />
                  <stop offset="50%" stopColor="#d4af37" />
                  <stop offset="100%" stopColor="#8a6511" />
                </linearGradient>
              </defs>
              <circle cx="23" cy="6" r="4" stroke="#f5d77f" strokeWidth="1.6" fill="none" />
              <line x1="23" y1="10" x2="15" y2="48" stroke="#f3d06b" strokeWidth="1.6" />
              <circle cx="21.5" cy="16" r="2.6" fill="url(#tasselGold)" />
              <circle cx="20" cy="22" r="2.8" fill="#fff5dc" stroke="#c89a2e" strokeWidth="0.6" />
              <circle cx="18.5" cy="28" r="2.8" fill="url(#tasselRuby)" stroke="#f3d06b" strokeWidth="0.7" />
              <circle cx="17" cy="34" r="2.6" fill="url(#tasselGold)" />
              <circle cx="15.8" cy="40" r="2.8" fill="#fff5dc" stroke="#c89a2e" strokeWidth="0.6" />
              <path d="M10 45 Q15 41 20 46 L18 49 L12 49 Z" fill="url(#tasselGold)" />
              <circle cx="14.5" cy="54" r="7.2" fill="url(#tasselRuby)" stroke="#f5d77f" strokeWidth="1" />
              <ellipse cx="12.5" cy="51.5" rx="2" ry="1.3" fill="#ffd6dc" opacity="0.6" />
              <circle cx="13.5" cy="63" r="2.2" fill="url(#tasselGold)" />
            </svg>
          </div>
        </div>

        {/* Tap Hint */}
        <p className="mt-7 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[2px] uppercase text-[#5c0b24] px-4 py-1.5 rounded-full bg-[#fffcf8]/75 backdrop-blur-[2px] shadow-xs border border-[#eab8cd]/60">
          <span className="inline-block w-2 h-2 rounded-full bg-[#d4af37]" />
          Tap golden seal to open invitation
          <span className="inline-block w-2 h-2 rounded-full bg-[#d4af37]" />
        </p>

        {onReplayIntro && (
          <div className="mt-3">
            <button
              onClick={onReplayIntro}
              className="text-xs text-[#5c0b24] hover:text-[#701a41] underline underline-offset-4 transition-colors cursor-pointer px-3 py-1 rounded-full bg-[#fffcf8]/65"
            >
              ↺ Replay Ganesha &amp; Lakshmi video intro
            </button>
          </div>
        )}
      </section>
    </>
  );
};
