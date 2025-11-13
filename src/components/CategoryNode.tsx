interface CategoryNodeProps {
  name: string;
  subtitle: string;
  level: number;
  icon: string;
  position: { x: number; y: number };
  onClick: () => void;
}

export function CategoryNode({ name, subtitle, level, icon, position, onClick }: CategoryNodeProps) {
  return (
    <div
      className="absolute cursor-pointer transition-opacity hover:opacity-80"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)'
      }}
      onClick={onClick}
    >
      {/* Hexagonal container */}
      <div className="relative">
        {/* Main hexagon */}
        <svg width="200" height="180" viewBox="0 0 200 180">
          <defs>
            <linearGradient id={`grad-${name}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'rgba(60, 20, 20, 0.6)', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: 'rgba(30, 10, 10, 0.8)', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path
            d="M 100 10 L 170 50 L 170 130 L 100 170 L 30 130 L 30 50 Z"
            fill={`url(#grad-${name})`}
            stroke="rgb(139, 69, 69)"
            strokeWidth="2"
          />
        </svg>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-3xl mb-2">{icon}</div>
          <div className="text-cyan-400 text-sm tracking-wider mb-1">{name}</div>
          <div className="text-gray-500 text-xs mb-2">{subtitle}</div>
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path
                d="M 10 2 L 12 8 L 18 8 L 13 12 L 15 18 L 10 14 L 5 18 L 7 12 L 2 8 L 8 8 Z"
                fill="rgb(6, 182, 212)"
                opacity="0.7"
              />
            </svg>
            <span className="text-cyan-400">{level}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
