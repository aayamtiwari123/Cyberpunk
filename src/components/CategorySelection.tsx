import { CategoryNode } from './CategoryNode';

interface Category {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
}

interface CategorySelectionProps {
  categories: Category[];
  onSelectCategory: (categoryId: string) => void;
  characterLevel: number;
  categoryProgress: Record<string, Set<string>>;
}

const categoryPositions = {
  relic: { x: 640, y: 120 },
  body: { x: 320, y: 280 },
  technical: { x: 960, y: 280 },
  intelligence: { x: 320, y: 520 },
  cool: { x: 960, y: 520 },
  matter: { x: 640, y: 680 }
};

export function CategorySelection({ categories, onSelectCategory, characterLevel, categoryProgress }: CategorySelectionProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#1a1520] flex items-center justify-center">
      {/* Dark textured background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1520] via-[#0f0a15] to-[#1a1520]" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139, 69, 69, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 69, 69, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Centered container for all nodes */}
      <div className="relative" style={{ width: '1400px', height: '800px' }}>
        {/* Central level indicator */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
          <div className="text-cyan-400 text-xs tracking-widest mb-2 opacity-70">LEVEL</div>
          <div className="text-6xl text-cyan-400" style={{ textShadow: '0 0 30px rgba(6, 182, 212, 0.6)' }}>
            {characterLevel}
          </div>
          
          {/* Connecting lines from center */}
          <svg className="absolute inset-0 pointer-events-none" style={{ width: '1400px', height: '800px', left: '-700px', top: '-400px' }}>
            {/* Top - Relic */}
            <line x1="700" y1="400" x2="640" y2="120" stroke="rgba(139, 69, 69, 0.4)" strokeWidth="2" />
            {/* Upper Left - Body */}
            <line x1="700" y1="400" x2="320" y2="280" stroke="rgba(139, 69, 69, 0.4)" strokeWidth="2" />
            {/* Upper Right - Technical */}
            <line x1="700" y1="400" x2="960" y2="280" stroke="rgba(139, 69, 69, 0.4)" strokeWidth="2" />
            {/* Lower Left - Intelligence */}
            <line x1="700" y1="400" x2="320" y2="520" stroke="rgba(139, 69, 69, 0.4)" strokeWidth="2" />
            {/* Lower Right - Cool */}
            <line x1="700" y1="400" x2="960" y2="520" stroke="rgba(139, 69, 69, 0.4)" strokeWidth="2" />
            {/* Bottom - Matter */}
            <line x1="700" y1="400" x2="640" y2="680" stroke="rgba(139, 69, 69, 0.4)" strokeWidth="2" />
          </svg>
        </div>

        {/* Category nodes */}
        {categories.map(category => {
          const position = categoryPositions[category.id as keyof typeof categoryPositions] || { x: 50, y: 50 };
          const level = categoryProgress[category.id]?.size || 0;
          
          return (
            <CategoryNode
              key={category.id}
              name={category.name}
              subtitle={category.subtitle}
              level={level}
              icon={category.icon}
              position={position}
              onClick={() => onSelectCategory(category.id)}
            />
          );
        })}
      </div>

      {/* Title */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center z-10">
        <h1 className="text-cyan-400 tracking-widest mb-2" style={{ textShadow: '0 0 20px rgba(6, 182, 212, 0.5)' }}>
          ATTRIBUTE MATRIX
        </h1>
        <p className="text-gray-500 text-sm">Select an attribute to view skill tree</p>
      </div>
    </div>
  );
}
