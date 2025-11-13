import { useState } from 'react';
import { DetailedPerkNode } from './DetailedPerkNode';
import { ArrowLeft, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Perk {
  id: string;
  name: string;
  reading: string;
  mastery: string;
  position: { x: number; y: number };
  requires?: string[];
}

interface Category {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  perks: Perk[];
  legendary: string;
}

interface DetailedPerkTreeProps {
  category: Category;
  onBack: () => void;
  initialUnlockedPerks: Set<string>;
  onPerkUpdate: (perks: Set<string>) => void;
}

const connections: { [key: string]: { from: string; to: string }[] } = {
  technical: [
    { from: 't1', to: 't3' },
    { from: 't2', to: 't4' },
    { from: 't2', to: 't5' },
    { from: 't3', to: 't6' },
    { from: 't4', to: 't6' },
    { from: 't4', to: 't7' },
    { from: 't5', to: 't7' },
    { from: 't6', to: 't8' },
    { from: 't7', to: 't9' },
    { from: 't8', to: 't10' },
    { from: 't9', to: 't10' }
  ],
  matter: [
    { from: 'm1', to: 'm3' },
    { from: 'm2', to: 'm4' },
    { from: 'm3', to: 'm5' },
    { from: 'm4', to: 'm5' },
    { from: 'm5', to: 'm6' },
    { from: 'm6', to: 'm7' }
  ],
  intelligence: [
    { from: 'i1', to: 'i3' },
    { from: 'i2', to: 'i4' },
    { from: 'i3', to: 'i5' },
    { from: 'i4', to: 'i5' },
    { from: 'i5', to: 'i6' },
    { from: 'i5', to: 'i7' },
    { from: 'i6', to: 'i8' },
    { from: 'i7', to: 'i8' }
  ],
  cool: [
    { from: 'c1', to: 'c3' },
    { from: 'c2', to: 'c4' },
    { from: 'c3', to: 'c5' },
    { from: 'c4', to: 'c5' },
    { from: 'c5', to: 'c6' }
  ],
  body: [
    { from: 'b1', to: 'b3' },
    { from: 'b2', to: 'b4' },
    { from: 'b6', to: 'b3' },
    { from: 'b6', to: 'b4' },
    { from: 'b3', to: 'b5' },
    { from: 'b4', to: 'b5' }
  ],
  relic: [
    { from: 'r1', to: 'r2' },
    { from: 'r2', to: 'r3' },
    { from: 'r2', to: 'r4' },
    { from: 'r3', to: 'r5' },
    { from: 'r4', to: 'r5' }
  ]
};

export function DetailedPerkTree({ category, onBack, initialUnlockedPerks, onPerkUpdate }: DetailedPerkTreeProps) {
  const [unlockedPerks, setUnlockedPerks] = useState<Set<string>>(initialUnlockedPerks);
  const [lockedPerks, setLockedPerks] = useState<Set<string>>(new Set());
  const [showLegendary, setShowLegendary] = useState(false);
  
  // Determine if this attribute is on the left or right side
  const leftAttributes = ['body', 'intelligence'];
  const rightAttributes = ['technical', 'cool', 'matter', 'relic'];
  const side = leftAttributes.includes(category.id) ? 'left' : 'right';

  const isPerkAvailable = (perk: Perk) => {
    if (unlockedPerks.has(perk.id)) return false;
    if (!perk.requires || perk.requires.length === 0) return true;
    return perk.requires.every(req => unlockedPerks.has(req));
  };

  const canUnselectPerk = (perkId: string) => {
    // Check if any unlocked perk depends on this one
    return !category.perks.some(p => 
      unlockedPerks.has(p.id) && 
      p.requires?.includes(perkId)
    );
  };
  // Find all unlocked perks that (directly or indirectly) depend on the given perk
  const findDependentUnlockedPerks = (perkId: string) => {
    const dependents = new Set<string>();
    const lookup: { [key: string]: Perk } = {};
    category.perks.forEach(p => (lookup[p.id] = p));

    const visit = (id: string) => {
      category.perks.forEach(p => {
        if (p.requires?.includes(id) && unlockedPerks.has(p.id) && !dependents.has(p.id)) {
          dependents.add(p.id);
          visit(p.id);
        }
      });
    };

    visit(perkId);
    return Array.from(dependents);
  };

  const togglePerk = (perk: Perk) => {
    if (unlockedPerks.has(perk.id)) {
      // Do not allow unlocking changes for locked perks
      if (lockedPerks.has(perk.id)) return;

      // Allow unselecting — if other unlocked perks depend on this one, cascade-remove them as well
      const dependents = findDependentUnlockedPerks(perk.id);
      const newUnlockedPerks = new Set(unlockedPerks);

      // Remove dependents first
      dependents.forEach(d => newUnlockedPerks.delete(d));
      // Then remove the perk itself
      newUnlockedPerks.delete(perk.id);

      setUnlockedPerks(newUnlockedPerks);
      onPerkUpdate(newUnlockedPerks);
    } else if (isPerkAvailable(perk)) {
      // Unlock the perk
      const newUnlockedPerks = new Set([...unlockedPerks, perk.id]);
      setUnlockedPerks(newUnlockedPerks);
      onPerkUpdate(newUnlockedPerks);

      // Check if all perks are unlocked for legendary
      if (newUnlockedPerks.size === category.perks.length) {
        setShowLegendary(true);
      }
    }
  };

  const toggleLock = (perkId: string) => {
    const newLockedPerks = new Set(lockedPerks);
    if (lockedPerks.has(perkId)) {
      newLockedPerks.delete(perkId);
    } else {
      newLockedPerks.add(perkId);
    }
    setLockedPerks(newLockedPerks);
  };

  const isConnectionUnlocked = (from: string, to: string) => {
    return unlockedPerks.has(from) && unlockedPerks.has(to);
  };

  const categoryConnections = connections[category.id] || [];

  return (
    <div className="min-h-screen bg-[#1a1520] text-white overflow-x-hidden">
      {/* Dark textured background */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#1a1520] via-[#0f0a15] to-[#1a1520]" />
      
      {/* Subtle grid pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139, 69, 69, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 69, 69, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-cyan-500/20 bg-black/40 backdrop-blur-sm">
        <div className="w-full px-4 md:px-8 py-4 flex items-center justify-between max-w-[1600px] mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-900/30 hover:text-cyan-300 transition-colors rounded"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm tracking-wider">BACK TO ATTRIBUTES</span>
          </button>

          <div className="flex items-center gap-4">
            <div className="text-2xl">{category.icon}</div>
            <div>
              <div className="text-cyan-400 tracking-widest" style={{ textShadow: '0 0 20px rgba(6, 182, 212, 0.5)' }}>
                {category.name}
              </div>
              <div className="text-gray-400 text-sm">{category.subtitle}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6 flex-wrap">
            <div className="text-center">
              <div className="text-xs text-gray-400 mb-1">ATTRIBUTE LEVEL</div>
              <div className="text-cyan-400">{unlockedPerks.size}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-400 mb-1">Perks Unlocked</div>
              <div className="text-cyan-400">{unlockedPerks.size} / {category.perks.length}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-400 mb-1">Locked Perks</div>
              <div className="text-yellow-400">{lockedPerks.size}</div>
            </div>
            <div className="text-yellow-500 flex items-center gap-2">
              <span className="text-2xl">0</span>
              <Award className="w-5 h-5" />
              <span className="text-xs text-gray-400">PERK POINTS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Perk Tree Canvas */}
      <div className="relative z-10 w-full px-4 md:px-8 py-6 max-w-[1400px] mx-auto">
          <div className="relative bg-black/20 border border-cyan-500/10 rounded-lg p-6 pr-64 pb-64 mb-8 overflow-auto" style={{ height: '700px' }}>
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {categoryConnections.map(({ from, to }, index) => {
              const fromPerk = category.perks.find(p => p.id === from);
              const toPerk = category.perks.find(p => p.id === to);
              if (!fromPerk || !toPerk) return null;

              const unlocked = isConnectionUnlocked(from, to);
              
              return (
                <g key={index}>
                  <line
                    x1={fromPerk.position.x + 50}
                    y1={fromPerk.position.y + 50}
                    x2={toPerk.position.x + 50}
                    y2={toPerk.position.y + 50}
                    stroke={unlocked ? 'rgb(6, 182, 212)' : 'rgb(100, 40, 40)'}
                    strokeWidth="2"
                    opacity={unlocked ? 0.8 : 0.3}
                  />
                  {unlocked && (
                    <line
                      x1={fromPerk.position.x + 50}
                      y1={fromPerk.position.y + 50}
                      x2={toPerk.position.x + 50}
                      y2={toPerk.position.y + 50}
                      stroke="rgb(6, 182, 212)"
                      strokeWidth="2"
                      opacity="0.3"
                      filter="blur(4px)"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Perk nodes */}
          {category.perks.map(perk => (
            <DetailedPerkNode
              key={perk.id}
              {...perk}
              unlocked={unlockedPerks.has(perk.id)}
              locked={lockedPerks.has(perk.id)}
              available={isPerkAvailable(perk)}
              onClick={() => togglePerk(perk)}
              onLockToggle={() => toggleLock(perk.id)}
              side={side}
            />
          ))}
        </div>

        {/* Legendary unlock notification */}
        <AnimatePresence>
          {showLegendary && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
              onClick={() => setShowLegendary(false)}
            >
              <div className="bg-gradient-to-b from-yellow-900/40 to-gray-900/40 border-2 border-yellow-500 rounded-lg p-8 max-w-2xl mx-4">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-8 h-8 text-yellow-500" />
                  <h2 className="text-yellow-500 tracking-wider">LEGENDARY UNLOCK</h2>
                </div>
                <p className="text-gray-300 leading-relaxed">{category.legendary}</p>
                <button
                  onClick={() => setShowLegendary(false)}
                  className="mt-6 px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-black rounded transition-colors"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legendary preview */}
        <div className="mt-12 bg-black/30 border border-yellow-500/20 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-3">
            <Award className="w-6 h-6 text-yellow-500" />
            <h3 className="text-yellow-500 tracking-wider">Legendary Unlock</h3>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">{category.legendary}</p>
          {unlockedPerks.size === category.perks.length && (
            <div className="mt-3 text-green-500 text-sm flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>UNLOCKED!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}