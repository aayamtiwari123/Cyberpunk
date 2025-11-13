import { motion } from 'motion/react';
import { Lock, Check, BookOpen, LockKeyhole } from 'lucide-react';
import { useState } from 'react';
import { perkMastery } from '../data/perkMastery';

interface DetailedPerkNodeProps {
  id: string;
  name: string;
  reading: string;
  mastery: string;
  unlocked: boolean;
  locked: boolean;
  available: boolean;
  position: { x: number; y: number };
  onClick: () => void;
  onLockToggle: () => void;
  side?: 'left' | 'right';
}

export function DetailedPerkNode({
  id,
  name,
  reading,
  mastery,
  unlocked,
  locked,
  available,
  position,
  onClick,
  onLockToggle,
  side = 'right'
}: DetailedPerkNodeProps & { id: string }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const detailInfo = perkMastery[id];

  const handleClick = (e: React.MouseEvent) => {
    if (unlocked) {
      setShowMenu(!showMenu);
    } else if (available) {
      onClick();
    }
  };

  const handleContext = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowDetails(true);
  };

  const handleUnlock = () => {
    if (!locked) {
      onClick();
      setShowMenu(false);
    }
  };

  const handleLockToggle = () => {
    onLockToggle();
    setShowMenu(false);
  };

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)'
      }}
      whileHover={{ scale: (available || unlocked) ? 1.1 : 1 }}
      whileTap={{ scale: (available || unlocked) ? 0.95 : 1 }}
      onClick={handleClick}
        onContextMenu={handleContext}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Diamond shape node */}
      <div className="relative">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <defs>
            <linearGradient id={`perk-grad-${name}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: unlocked ? 'rgb(6, 182, 212)' : available ? 'rgb(139, 69, 69)' : 'rgb(30, 30, 30)', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: unlocked ? 'rgb(8, 145, 178)' : available ? 'rgb(100, 40, 40)' : 'rgb(20, 20, 20)', stopOpacity: 0.8 }} />
            </linearGradient>
          </defs>
          
          {/* Outer glow for unlocked */}
          {unlocked && (
            <rect
              x="50" y="50"
              width="62" height="62"
              transform="translate(-31, -31) rotate(45, 50, 50)"
              fill="none"
              stroke={locked ? 'rgb(255, 215, 0)' : 'rgb(6, 182, 212)'}
              strokeWidth="2"
              opacity="0.3"
              filter="blur(4px)"
            />
          )}
          
          {/* Main diamond */}
          <rect
            x="50" y="50"
            width="57" height="57"
            transform="translate(-28.5, -28.5) rotate(45, 50, 50)"
            fill={`url(#perk-grad-${name})`}
            stroke={unlocked ? (locked ? 'rgb(255, 215, 0)' : 'rgb(6, 182, 212)') : available ? 'rgb(139, 69, 69)' : 'rgb(60, 60, 60)'}
            strokeWidth="2"
          />
          
          {/* Inner icon circle */}
          <circle
            cx="50"
            cy="50"
            r="18"
            fill={unlocked ? (locked ? 'rgba(255, 215, 0, 0.3)' : 'rgba(6, 182, 212, 0.3)') : available ? 'rgba(139, 69, 69, 0.3)' : 'rgba(60, 60, 60, 0.3)'}
          />
        </svg>

        {/* Status icon */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {unlocked && locked ? (
            <LockKeyhole className="w-5 h-5 text-yellow-400" />
          ) : unlocked ? (
            <Check className="w-5 h-5 text-cyan-400" />
          ) : !available ? (
            <Lock className="w-5 h-5 text-gray-600" />
          ) : (
            <BookOpen className="w-5 h-5 text-red-400" />
          )}
        </div>

        {/* Corner decorations for unlocked */}
        {unlocked && (
          <>
            <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-0.5 h-2 ${locked ? 'bg-yellow-400' : 'bg-cyan-400'}`}></div>
            <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-0.5 h-2 ${locked ? 'bg-yellow-400' : 'bg-cyan-400'}`}></div>
          </>
        )}
      </div>

      {/* Name label */}
      <div className={`absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-xs text-center w-32 ${
        unlocked ? (locked ? 'text-yellow-400' : 'text-cyan-400') : available ? 'text-red-300' : 'text-gray-600'
      }`}>
        {name}
      </div>

      {/* Action Menu */}
      {showMenu && unlocked && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: side === 'left' ? -10 : 10 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          className={`absolute top-1/2 -translate-y-1/2 bg-gray-900/95 border border-cyan-500/50 rounded shadow-lg z-50 overflow-hidden ${
            side === 'left' ? 'left-full ml-2' : 'right-full mr-2'
          }`}
          style={{ backdropFilter: 'blur(8px)' }}
        >
          <button
            onClick={handleUnlock}
            disabled={locked}
            className={`block w-full px-2 py-1.5 text-left text-xs transition-colors whitespace-nowrap ${
              locked 
                ? 'text-gray-600 cursor-not-allowed bg-gray-800/50' 
                : 'text-red-400 hover:bg-red-900/30'
            }`}
          >
            {locked ? 'Unlock' : 'Unselect'}
          </button>
          <button
            onClick={handleLockToggle}
            className={`block w-full px-2 py-1.5 text-left text-xs transition-colors whitespace-nowrap ${
              locked 
                ? 'text-yellow-400 hover:bg-yellow-900/30' 
                : 'text-yellow-400 hover:bg-yellow-900/30'
            }`}
          >
            {locked ? 'Unlock' : 'Lock'}
          </button>
        </motion.div>
      )}

      {/* Tooltip */}
      {showTooltip && !showMenu && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-1/2 -translate-y-1/2 right-full mr-3 bg-gray-900/95 border border-cyan-500/50 rounded p-2.5 w-64 z-50 backdrop-blur-sm"
        >
          <div className={`text-xs ${unlocked ? (locked ? 'text-yellow-400' : 'text-cyan-400') : 'text-cyan-400'}`}>
            {name}
            {locked && <span className="text-[10px] ml-1">(Locked)</span>}
          </div>
          <div className="text-[10px] text-gray-300 mb-1.5 mt-1.5">
            <span className="text-yellow-500">Reading:</span> {reading}
          </div>
          <div className="text-[10px] text-gray-300">
            <span className="text-green-500">Mastery:</span> {mastery}
          </div>
          {!unlocked && available && (
            <div className="text-[10px] text-cyan-400 mt-1.5">Click to unlock</div>
          )}
          {!available && !unlocked && (
            <div className="text-[10px] text-red-400 mt-1.5">Prerequisites required</div>
          )}
          {unlocked && (
            <div className="text-[10px] text-gray-400 mt-1.5">
              {locked ? 'Click to unlock and manage' : 'Click to unselect or lock'}
            </div>
          )}
        </motion.div>
      )}

      {/* Details Modal (right-click) */}
      {showDetails && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowDetails(false)} />
          <div className="relative bg-gray-900/95 border border-cyan-500/40 rounded-lg p-4 max-w-lg w-[min(90%,560px)] z-70">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-cyan-400 font-medium">{name}</div>
                <div className="text-xs text-gray-300">{reading}</div>
              </div>
              <button className="text-gray-300 text-xs px-2" onClick={() => setShowDetails(false)}>Close</button>
            </div>

            <div className="text-sm text-gray-200 mb-2">{mastery}</div>

            {detailInfo ? (
              <div className="text-sm text-gray-300">
                <div><strong>Estimated Hours:</strong> {detailInfo.hours}</div>
                <div className="mt-2"><strong>What you should be able to do:</strong> {detailInfo.outcomes}</div>
              </div>
            ) : (
              <div className="text-sm text-gray-400">No mastery estimate available for this perk.</div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}