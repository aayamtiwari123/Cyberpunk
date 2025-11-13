import { motion } from 'motion/react';
import { Lock, Check } from 'lucide-react';

interface PerkNodeProps {
  id: string;
  name: string;
  description: string;
  cost: number;
  unlocked: boolean;
  available: boolean;
  category: 'combat' | 'tech' | 'stealth' | 'social';
  position: { x: number; y: number };
  onClick: () => void;
}

const categoryColors = {
  combat: {
    bg: 'bg-red-950/40',
    border: 'border-red-500',
    glow: 'shadow-red-500/50',
    text: 'text-red-400'
  },
  tech: {
    bg: 'bg-cyan-950/40',
    border: 'border-cyan-500',
    glow: 'shadow-cyan-500/50',
    text: 'text-cyan-400'
  },
  stealth: {
    bg: 'bg-purple-950/40',
    border: 'border-purple-500',
    glow: 'shadow-purple-500/50',
    text: 'text-purple-400'
  },
  social: {
    bg: 'bg-yellow-950/40',
    border: 'border-yellow-500',
    glow: 'shadow-yellow-500/50',
    text: 'text-yellow-400'
  }
};

export function PerkNode({
  name,
  description,
  cost,
  unlocked,
  available,
  category,
  position,
  onClick
}: PerkNodeProps) {
  const colors = categoryColors[category];

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)'
      }}
      whileHover={{ scale: available ? 1.1 : 1 }}
      whileTap={{ scale: available ? 0.95 : 1 }}
      onClick={available && !unlocked ? onClick : undefined}
    >
      <div
        className={`w-24 h-24 rounded-lg border-2 ${colors.bg} ${
          unlocked ? colors.border : available ? colors.border : 'border-gray-700'
        } ${
          unlocked ? `shadow-lg ${colors.glow}` : ''
        } backdrop-blur-sm transition-all duration-300 flex flex-col items-center justify-center p-2 relative`}
      >
        {unlocked && (
          <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full ${colors.bg} ${colors.border} border-2 flex items-center justify-center`}>
            <Check className={`w-4 h-4 ${colors.text}`} />
          </div>
        )}
        
        {!unlocked && !available && (
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center">
            <Lock className="w-4 h-4 text-gray-500" />
          </div>
        )}

        <div className={`text-center ${unlocked ? colors.text : available ? colors.text : 'text-gray-500'}`}>
          <div className="text-xs mb-1">{name}</div>
          <div className="text-[10px] opacity-70 line-clamp-2">{description}</div>
        </div>

        <div className={`absolute -bottom-6 text-xs ${colors.text}`}>
          {cost} {cost === 1 ? 'point' : 'points'}
        </div>
      </div>
    </motion.div>
  );
}
