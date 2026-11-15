import React, { useMemo } from 'react';

interface ParticleItem {
  id: number;
  kind: 'dust' | 'flower' | 'petal';
  left: string;
  size: number;
  duration: string;
  delay: string;
  color: string;
  altAnim: boolean;
}

interface GoldDustAndFlowersProps {
  enabled?: boolean;
}

export const GoldDustAndFlowers: React.FC<GoldDustAndFlowersProps> = ({ enabled = true }) => {
  const particles = useMemo<ParticleItem[]>(() => {
    const flowerColors = [
      '#e57ea6', // blush orchid pink (theme match)
      '#f5b041', // marigold gold-orange (traditional Nepali sayapatri)
      '#f299ba', // soft lotus rose
      '#d4af37', // antique gold
      '#fff8ef'  // ivory jasmine petal
    ];

    return Array.from({ length: 38 }, (_, i) => {
      const kind: ParticleItem['kind'] =
        i % 3 === 0 ? 'dust' : i % 3 === 1 ? 'flower' : 'petal';
      return {
        id: i,
        kind,
        left: `${((i * 2.65 + (i % 5) * 1.4) % 98).toFixed(2)}%`,
        size: kind === 'dust' ? 6 + (i % 5) * 2.5 : 14 + (i % 4) * 4,
        duration: `${8 + (i % 8) * 1.4}s`,
        delay: `${((i * 0.43) % 7).toFixed(2)}s`,
        color: flowerColors[i % flowerColors.length],
        altAnim: i % 2 === 1
      };
    });
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((item) => {
        if (item.kind === 'dust') {
          return (
            <span
              key={item.id}
              className="absolute -top-6 select-none animate-gold-dust will-change-transform"
              style={{
                left: item.left,
                animationDuration: item.duration,
                animationDelay: item.delay
              }}
            >
              <svg
                width={item.size}
                height={item.size}
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z"
                  fill="#F3D06B"
                />
                <circle cx="8" cy="8" r="2.2" fill="#FFFDF2" />
              </svg>
            </span>
          );
        }

        if (item.kind === 'flower') {
          return (
            <span
              key={item.id}
              className={`absolute -top-8 select-none will-change-transform ${
                item.altAnim ? 'animate-petal-fall-alt' : 'animate-petal-fall'
              }`}
              style={{
                left: item.left,
                animationDuration: item.duration,
                animationDelay: item.delay
              }}
            >
              {/* 5-petal auspicious marigold / lotus blossom */}
              <svg
                width={item.size}
                height={item.size}
                viewBox="0 0 24 24"
                fill="none"
                style={{ filter: 'drop-shadow(0 2px 3px rgba(112,26,65,0.14))' }}
              >
                {[0, 72, 144, 216, 288].map((deg) => (
                  <ellipse
                    key={deg}
                    cx="12"
                    cy="6.5"
                    rx="3.2"
                    ry="5.2"
                    fill={item.color}
                    opacity="0.88"
                    transform={`rotate(${deg} 12 12)`}
                  />
                ))}
                <circle cx="12" cy="12" r="2.6" fill="#D4AF37" />
              </svg>
            </span>
          );
        }

        // Delicate drifting petal
        return (
          <span
            key={item.id}
            className={`absolute -top-8 select-none will-change-transform ${
              item.altAnim ? 'animate-petal-fall-alt' : 'animate-petal-fall'
            }`}
            style={{
              left: item.left,
              animationDuration: item.duration,
              animationDelay: item.delay
            }}
          >
            <svg
              width={item.size * 0.85}
              height={item.size * 0.85}
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10 1C14 5 17 10 14 16C11 19 6 18 4 14C2 9 6 4 10 1Z"
                fill={item.color}
                opacity="0.82"
              />
            </svg>
          </span>
        );
      })}
    </div>
  );
};
