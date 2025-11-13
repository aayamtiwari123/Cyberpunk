interface ConnectionLineProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  unlocked: boolean;
  category: 'combat' | 'tech' | 'stealth' | 'social';
}

const categoryColors = {
  combat: '#ef4444',
  tech: '#06b6d4',
  stealth: '#a855f7',
  social: '#eab308'
};

export function ConnectionLine({ from, to, unlocked, category }: ConnectionLineProps) {
  const color = unlocked ? categoryColors[category] : '#4b5563';
  const opacity = unlocked ? 0.8 : 0.3;

  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={color}
        strokeWidth="2"
        opacity={opacity}
        strokeDasharray={unlocked ? '0' : '5,5'}
      />
      {unlocked && (
        <line
          x1={from.x}
          y1={from.y}
          x2={to.x}
          y2={to.y}
          stroke={color}
          strokeWidth="2"
          opacity="0.3"
          filter="blur(4px)"
        />
      )}
    </svg>
  );
}
