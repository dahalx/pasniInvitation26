import React from 'react';

/**
 * Reverent, delicate golden-plum linework backdrop depicting
 * Lord Ganesha (left/top) & Goddess Lakshmi (right/top) flanking an auspicious Lotus Mandala.
 * Designed as subtle atmospheric sacred art behind the invitation content.
 */
export const DeitiesBackdrop: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-start justify-center"
      aria-hidden="true"
    >
      {/* Top Sacred Mandala Arch */}
      <svg
        className="w-[1050px] max-w-none opacity-[0.14] -mt-10 select-none"
        viewBox="0 0 1000 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sacredGold" x1="0" y1="0" x2="1000" y2="500" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#B8860B" />
            <stop offset="50%" stopColor="#701A41" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
        </defs>

        {/* Central Lotus Mandala behind card */}
        <g transform="translate(500, 210)">
          <circle cx="0" cy="0" r="180" stroke="url(#sacredGold)" strokeWidth="1.5" strokeDasharray="6 6" />
          <circle cx="0" cy="0" r="145" stroke="url(#sacredGold)" strokeWidth="1.2" />
          <circle cx="0" cy="0" r="110" stroke="url(#sacredGold)" strokeWidth="1" strokeDasharray="3 5" />
          {Array.from({ length: 16 }).map((_, i) => (
            <path
              key={`mandala-petal-${i}`}
              d="M0 -145 C14 -120 14 -95 0 -80 C-14 -95 -14 -120 0 -145 Z"
              stroke="url(#sacredGold)"
              strokeWidth="1.1"
              fill="rgba(212,175,55,0.12)"
              transform={`rotate(${i * 22.5})`}
            />
          ))}
        </g>

        {/* LEFT DEITY: Lord Ganesha (श्री गणेश) */}
        <g transform="translate(185, 220)" stroke="#701A41" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Halo */}
          <circle cx="0" cy="-42" r="68" stroke="#B8860B" strokeWidth="1.5" strokeDasharray="4 4" fill="rgba(212,175,55,0.10)" />
          {/* Crown (Mukut) */}
          <path d="M-24 -76 L-16 -108 L0 -122 L16 -108 L24 -76 Z" fill="rgba(212,175,55,0.22)" />
          <path d="M-26 -76 Q0 -84 26 -76" />
          <circle cx="0" cy="-126" r="4" fill="#B8860B" />
          {/* Large Ears */}
          <path d="M-24 -64 C-56 -72 -62 -28 -36 -18 C-26 -14 -20 -26 -22 -40" fill="rgba(216,124,160,0.14)" />
          <path d="M24 -64 C56 -72 62 -28 36 -18 C26 -14 20 -26 22 -40" fill="rgba(216,124,160,0.14)" />
          {/* Head & Tilak */}
          <path d="M-24 -72 C-28 -44 -20 -18 0 -16 C20 -18 28 -44 24 -72" />
          <path d="M-4 -66 Q0 -60 4 -66" stroke="#B8860B" />
          <circle cx="0" cy="-58" r="2.2" fill="#701A41" />
          {/* Eyes */}
          <path d="M-14 -52 Q-10 -55 -6 -52" />
          <path d="M6 -52 Q10 -55 14 -52" />
          {/* Graceful Curved Trunk & Tusks */}
          <path d="M-6 -40 C-8 -18 -2 8 14 14 C22 17 26 10 20 5" />
          <path d="M-12 -32 L-22 -24" />
          <path d="M12 -32 L18 -26" />
          {/* Torso & Four Arms */}
          <path d="M-32 -14 C-46 10 -44 48 -24 66 L24 66 C44 48 46 10 32 -14" fill="rgba(216,124,160,0.10)" />
          {/* Upper Arms holding Lotus & Ankusha */}
          <path d="M-34 -4 C-58 -10 -68 -30 -60 -46" />
          <path d="M34 -4 C58 -10 68 -30 60 -46" />
          {/* Lower Arms (Abhaya Mudra & Modak) */}
          <path d="M-36 16 C-56 26 -54 44 -40 44" />
          <path d="M36 16 C56 26 54 44 40 44" />
          <circle cx="40" cy="40" r="6" fill="rgba(212,175,55,0.28)" />
          {/* Crossed Legs & Lotus Seat */}
          <path d="M-44 68 C-28 56 28 56 44 68 C32 82 -32 82 -44 68 Z" />
          {/* Lotus Pedestal */}
          <path d="M-68 84 Q-45 66 -28 84 Q0 62 28 84 Q45 66 68 84 Q0 104 -68 84 Z" fill="rgba(216,124,160,0.22)" stroke="#B8860B" />
        </g>

        {/* RIGHT DEITY: Goddess Lakshmi (श्री लक्ष्मी) */}
        <g transform="translate(815, 220)" stroke="#701A41" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Halo */}
          <circle cx="0" cy="-42" r="68" stroke="#B8860B" strokeWidth="1.5" strokeDasharray="4 4" fill="rgba(212,175,55,0.10)" />
          {/* Ornate Crown (Mukut) */}
          <path d="M-20 -78 L-14 -108 L0 -122 L14 -108 L20 -78 Z" fill="rgba(212,175,55,0.24)" />
          <circle cx="0" cy="-126" r="4" fill="#B8860B" />
          {/* Graceful Face & Bindi */}
          <path d="M-20 -76 C-22 -48 -14 -28 0 -26 C14 -28 22 -48 20 -76" />
          <circle cx="0" cy="-62" r="2.2" fill="#701A41" />
          <path d="M-11 -54 Q-7 -57 -3 -54" />
          <path d="M3 -54 Q7 -57 11 -54" />
          <path d="M-4 -38 Q0 -35 4 -38" />
          {/* Earrings & Necklace */}
          <circle cx="-23" cy="-48" r="4" fill="rgba(212,175,55,0.3)" />
          <circle cx="23" cy="-48" r="4" fill="rgba(212,175,55,0.3)" />
          <path d="M-16 -24 Q0 -12 16 -24" stroke="#B8860B" />
          {/* Draped Saree Torso */}
          <path d="M-22 -22 L-30 58 L30 58 L22 -22 Z" fill="rgba(216,124,160,0.14)" />
          {/* Upper Arms holding Pink Lotuses */}
          <path d="M-22 -14 C-48 -20 -60 -36 -56 -52" />
          <path d="M22 -14 C48 -20 60 -36 56 -52" />
          {/* Left & Right Held Lotuses */}
          <path d="M-66 -54 Q-56 -72 -46 -54 Q-56 -48 -66 -54 Z" fill="rgba(216,124,160,0.35)" stroke="#B8860B" />
          <path d="M46 -54 Q56 -72 66 -54 Q56 -48 46 -54 Z" fill="rgba(216,124,160,0.35)" stroke="#B8860B" />
          {/* Lower Arms (Blessing / Varada Mudra & Gold Coins) */}
          <path d="M-24 6 C-46 18 -46 40 -32 46" />
          <path d="M24 6 C46 18 46 40 32 46" />
          {/* Falling Blessing Gold Coins */}
          <circle cx="-36" cy="54" r="2.5" fill="#B8860B" />
          <circle cx="-41" cy="63" r="2.2" fill="#B8860B" />
          <circle cx="-33" cy="70" r="2" fill="#B8860B" />
          {/* Blooming Pink Lotus Throne */}
          <path d="M-72 82 Q-46 60 -28 82 Q0 56 28 82 Q46 60 72 82 Q0 106 -72 82 Z" fill="rgba(216,124,160,0.25)" stroke="#B8860B" />
        </g>
      </svg>
    </div>
  );
};

/**
 * Clean sacred text header for the top of the invitation card
 * showing Sri Ganesh & Sri Lakshmi flanking "ॐ" (no circular icon badges)
 */
export const DeitiesCardCrest: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-4 sm:gap-7 mb-5 select-none" aria-hidden="true">
      <div className="flex flex-col items-center">
        <span className="font-serif-cormorant text-sm sm:text-base font-semibold tracking-wider text-[#701a41]">
          Sri Ganesh
        </span>
        <span className="text-[0.7rem] font-nepali text-[#be5a83] font-medium">
          श्री गणेशाय नमः
        </span>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-xl sm:text-2xl font-nepali text-[#d4af37] leading-none">ॐ</span>
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mt-1" />
      </div>

      <div className="flex flex-col items-center">
        <span className="font-serif-cormorant text-sm sm:text-base font-semibold tracking-wider text-[#701a41]">
          Sri Lakshmi
        </span>
        <span className="text-[0.7rem] font-nepali text-[#be5a83] font-medium">
          श्री महालक्ष्म्यै नमः
        </span>
      </div>
    </div>
  );
};
