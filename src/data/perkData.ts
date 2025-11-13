export interface Perk {
  id: string;
  name: string;
  reading: string;
  mastery: string;
  position: { x: number; y: number };
  requires?: string[];
}

export interface Category {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  perks: Perk[];
  legendary: string;
}

export const categories: Category[] = [
  {
    id: 'technical',
    name: 'TECHNICAL ABILITY',
    subtitle: 'The Maker',
    icon: '⚙️',
    legendary: 'Design, build, and optimize almost any mechanical, electronic, or hybrid system from scratch. Predict performance and innovate reliably.',
    perks: [
      {
        id: 't1',
        name: "Fabricator's Eye",
        reading: 'Engineering mechanics, Make: Electronics, DIY kits',
        mastery: 'Instantly understand mechanical/electronic objects and suggest improvements',
        position: { x: 360, y: 120 }
      },
      {
        id: 't2',
        name: 'Material Whisperer',
        reading: 'Materials science: Callister, lab experiments on metals/polymers',
        mastery: 'Identify likely materials, suggest replacements/optimizations',
        position: { x: 610, y: 120 }
      },
      {
        id: 't3',
        name: 'Precision Builder',
        reading: 'CAD tutorials (Fusion360/SolidWorks), machining practice',
        mastery: 'Build devices to exact specifications without error',
        position: { x: 360, y: 270 },
        requires: ['t1']
      },
      {
        id: 't4',
        name: 'Circuit Sense',
        reading: 'Basic electronics, multimeter/oscilloscope, Arduino/STM32',
        mastery: 'Identify, troubleshoot, and modify circuits quickly',
        position: { x: 610, y: 270 },
        requires: ['t2']
      },
      {
        id: 't5',
        name: 'Reactive Designer',
        reading: 'Safe chemical reactions, Zumdahl Chemistry',
        mastery: 'Combine materials safely and predict reactions',
        position: { x: 860, y: 270 },
        requires: ['t2']
      },
      {
        id: 't6',
        name: 'Loop Master',
        reading: 'Control systems (Ogata), MATLAB simulations',
        mastery: 'Design self-regulating automated systems',
        position: { x: 485, y: 420 },
        requires: ['t3', 't4']
      },
      {
        id: 't7',
        name: 'System Integrator',
        reading: 'Multi-disciplinary design, simple robotics',
        mastery: 'Integrate multiple components into a functional system',
        position: { x: 735, y: 420 },
        requires: ['t4', 't5']
      },
      {
        id: 't8',
        name: 'Nano-Crafter',
        reading: 'Intro to nanotech, miniaturization',
        mastery: 'Design small-scale circuits and mechanical parts',
        position: { x: 485, y: 570 },
        requires: ['t6']
      },
      {
        id: 't9',
        name: 'Autonomous Systems',
        reading: 'Robotics & AI basics, IoT integration',
        mastery: 'Create devices that perform tasks independently',
        position: { x: 735, y: 570 },
        requires: ['t7']
      },
      {
        id: 't10',
        name: 'Predictive Engineer',
        reading: 'Failure analysis, optimization techniques',
        mastery: 'Predict failures and optimize design before building',
        position: { x: 610, y: 720 },
        requires: ['t8', 't9']
      }
    ]
  },
  {
    id: 'matter',
    name: 'MATTER',
    subtitle: 'The Lawsmith',
    icon: '⚛️',
    legendary: 'Predict and synthesize chemical or material outcomes from first principles. Design advanced experiments and materials with accuracy.',
    perks: [
      {
        id: 'm1',
        name: 'Field Weaver',
        reading: 'Classical mechanics: H.K. Dass, Feynman Lectures Vol 1',
        mastery: 'Analyze forces/motion and predict outcomes',
        position: { x: 360, y: 120 }
      },
      {
        id: 'm2',
        name: 'Elemental Architect',
        reading: 'General chemistry: Zumdahl, lab reactions',
        mastery: 'Identify elements, predict reactions',
        position: { x: 680, y: 120 }
      },
      {
        id: 'm3',
        name: 'Energy Transmutation',
        reading: 'Thermodynamics: Feynman Vol 1/2, calorimetry',
        mastery: 'Calculate energy transformations, predict outcomes',
        position: { x: 360, y: 270 },
        requires: ['m1']
      },
      {
        id: 'm4',
        name: 'Reactive Flow',
        reading: 'Chemical kinetics, lab rate experiments',
        mastery: 'Predict reaction rates and direction',
        position: { x: 680, y: 270 },
        requires: ['m2']
      },
      {
        id: 'm5',
        name: 'Lattice Whisperer',
        reading: 'Crystallography, solid state physics',
        mastery: 'Predict crystal structures, defects, material properties',
        position: { x: 520, y: 420 },
        requires: ['m3', 'm4']
      },
      {
        id: 'm6',
        name: 'Material Synthesizer',
        reading: 'Inorganic/organic synthesis, lab practice',
        mastery: 'Design safe chemical synthesis at small scale',
        position: { x: 520, y: 570 },
        requires: ['m5']
      },
      {
        id: 'm7',
        name: 'Predictive ChemPhys',
        reading: 'Quantum mechanics: Griffiths QM, Feynman Vol 3',
        mastery: 'Predict chemical behavior and properties using physics/QM',
        position: { x: 520, y: 720 },
        requires: ['m6']
      }
    ]
  },
  {
    id: 'intelligence',
    name: 'INTELLIGENCE',
    subtitle: 'The Architect',
    icon: '🧠',
    legendary: 'Human supercomputer: instant recall, predictive analysis, multi-domain problem-solving, mental simulation of experiments or systems.',
    perks: [
      {
        id: 'i1',
        name: 'Advanced Memory Recollection',
        reading: 'Memory palace, Major System',
        mastery: 'Recall books, formulas, numbers instantly',
        position: { x: 360, y: 120 }
      },
      {
        id: 'i2',
        name: 'Advanced Mental Math',
        reading: 'Speed arithmetic, probability',
        mastery: 'Solve complex calculations mentally',
        position: { x: 680, y: 120 }
      },
      {
        id: 'i3',
        name: 'Logic & Systems Analysis',
        reading: 'Introduction to Logic, problem decomposition',
        mastery: 'Analyze complex systems systematically',
        position: { x: 360, y: 270 },
        requires: ['i1']
      },
      {
        id: 'i4',
        name: 'Pattern Calculator',
        reading: 'Combinatorics, sequences, number patterns',
        mastery: 'Recognize patterns in numbers, reactions, behaviors',
        position: { x: 680, y: 270 },
        requires: ['i2']
      },
      {
        id: 'i5',
        name: 'Strategic Foresight',
        reading: 'Decision theory, scenario planning',
        mastery: 'Mentally simulate multiple outcomes and choose optimal path',
        position: { x: 520, y: 420 },
        requires: ['i3', 'i4']
      },
      {
        id: 'i6',
        name: 'Algorithmic Mind',
        reading: 'Algorithms, coding',
        mastery: 'Design algorithms mentally for problem solving and optimization',
        position: { x: 360, y: 570 },
        requires: ['i5']
      },
      {
        id: 'i7',
        name: 'Integrated Knowledge',
        reading: 'Cross-domain linking (physics+chem+engineering)',
        mastery: 'Apply multiple knowledge domains to solve problems',
        position: { x: 680, y: 570 },
        requires: ['i5']
      },
      {
        id: 'i8',
        name: 'Mental Simulation',
        reading: 'Case studies, thought experiments',
        mastery: 'Predict outcomes of complex systems before acting',
        position: { x: 520, y: 720 },
        requires: ['i6', 'i7']
      }
    ]
  },
  {
    id: 'cool',
    name: 'COOL',
    subtitle: 'The Phantom Mind',
    icon: '😎',
    legendary: 'Natural influencer and tactician: people respond instinctively to your presence, persuasion, and reputation.',
    perks: [
      {
        id: 'c1',
        name: 'Style & Fashion',
        reading: 'Dressing the Man, observation',
        mastery: 'Convey confidence and authority through appearance',
        position: { x: 410, y: 120 }
      },
      {
        id: 'c2',
        name: 'Charisma & Influence',
        reading: 'Influence by Cialdini, public speaking',
        mastery: 'Persuade, inspire, manipulate people reliably',
        position: { x: 750, y: 120 }
      },
      {
        id: 'c3',
        name: 'Diplomacy & Negotiation',
        reading: 'Getting to Yes',
        mastery: 'Resolve conflicts and negotiate favorable outcomes',
        position: { x: 410, y: 300 },
        requires: ['c1']
      },
      {
        id: 'c4',
        name: 'Composure & Psychological Edge',
        reading: 'Emotional intelligence, mindfulness',
        mastery: 'Maintain calm, read people, respond strategically',
        position: { x: 750, y: 300 },
        requires: ['c2']
      },
      {
        id: 'c5',
        name: 'Reputation & Presence',
        reading: 'Leaders Eat Last, networking',
        mastery: 'Command respect and influence groups effortlessly',
        position: { x: 580, y: 480 },
        requires: ['c3', 'c4']
      },
      {
        id: 'c6',
        name: 'Influence Ripple',
        reading: 'Social dynamics, group behavior analysis',
        mastery: 'Subtly influence outcomes in groups or networks',
        position: { x: 580, y: 660 },
        requires: ['c5']
      }
    ]
  },
  {
    id: 'body',
    name: 'BODY',
    subtitle: 'The Vessel',
    icon: '💪',
    legendary: 'Peak human physical specimen: strength, endurance, agility, resilience, and self-discipline at elite level.',
    perks: [
      {
        id: 'b1',
        name: 'Strength & Power',
        reading: 'Convict Conditioning, progressive overload',
        mastery: 'Extreme strength feats (100+ push-ups/squats/pull-ups)',
        position: { x: 360, y: 120 }
      },
      {
        id: 'b2',
        name: 'Endurance & Stamina',
        reading: 'Cardio, HIIT, running',
        mastery: 'High-intensity activity for extended periods without fatigue',
        position: { x: 680, y: 120 }
      },
      {
        id: 'b6',
        name: 'Self-Control',
        reading: 'Meditation, habit formation',
        mastery: 'Control impulses, sustain high-performance routines',
        position: { x: 1000, y: 120 }
      },
      {
        id: 'b3',
        name: 'Agility & Coordination',
        reading: 'Parkour, gymnastics, balance',
        mastery: 'Move efficiently, react quickly, precise coordination',
        position: { x: 360, y: 300 },
        requires: ['b1', 'b6']
      },
      {
        id: 'b4',
        name: 'Pain Tolerance & Resilience',
        reading: 'Cold exposure, progressive overload',
        mastery: 'Maintain performance under discomfort or minor injury',
        position: { x: 680, y: 300 },
        requires: ['b2', 'b6']
      },
      {
        id: 'b5',
        name: 'Bio-Optimization & Health',
        reading: 'Nutrition, sleep, recovery',
        mastery: 'Peak health, rapid recovery, optimized energy levels',
        position: { x: 520, y: 480 },
        requires: ['b3', 'b4']
      }
    ]
  },
  {
    id: 'relic',
    name: 'RELIC',
    subtitle: 'The Inner Evolution',
    icon: '✨',
    legendary: 'Harmonized mind-body-digital integration; extreme awareness, mental mastery, and creative flow under any circumstance.',
    perks: [
      {
        id: 'r1',
        name: 'Consciousness & Awareness',
        reading: 'Mindfulness, meditation',
        mastery: 'Maintain hyper-awareness and focus under any condition',
        position: { x: 520, y: 120 }
      },
      {
        id: 'r2',
        name: 'Memory & Mental Mastery',
        reading: 'Advanced memory palace',
        mastery: 'Recall and integrate vast information instantly',
        position: { x: 520, y: 300 },
        requires: ['r1']
      },
      {
        id: 'r3',
        name: 'Mind-Body Synchronization',
        reading: 'Yoga, Tai Chi, calisthenics with awareness',
        mastery: 'Perform physical tasks with peak mental coordination',
        position: { x: 360, y: 480 },
        requires: ['r2']
      },
      {
        id: 'r4',
        name: 'Digital / Tech Symbiosis',
        reading: 'Tech-human interaction, digital trends, user psychology, UX/UI principles, social media dynamics, AI impact on society',
        mastery: 'Understand and predict how humans interact with technology; anticipate digital trends and behavioral shifts',
        position: { x: 680, y: 480 },
        requires: ['r2']
      },
      {
        id: 'r5',
        name: 'Self-Transcendence',
        reading: 'Creativity exercises, extreme focus',
        mastery: 'Achieve flow state for extended periods; make complex decisions under pressure',
        position: { x: 520, y: 660 },
        requires: ['r3', 'r4']
      }
    ]
  }
];