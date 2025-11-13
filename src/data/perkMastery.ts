export interface PerkMasteryInfo {
  hours: string;
  outcomes: string;
}

export const perkMastery: Record<string, PerkMasteryInfo> = {
  // Intelligence
  i1: { hours: '50–60', outcomes: 'Use memory palace and Major System to recall formulas, numbers, books and long sequences reliably.' },
  i2: { hours: '50–100', outcomes: 'Perform mental arithmetic, probability and combinatorics quickly and accurately under pressure.' },
  i3: { hours: '40–60', outcomes: 'Analyze complex systems, decompose problems into manageable parts and identify root causes.' },
  i4: { hours: '30–50', outcomes: 'Recognize numeric and behavioral patterns, spot sequences and strategic regularities.' },
  i5: { hours: '40–60', outcomes: 'Run scenario planning and decision-theory style foresight to pick optimal strategies.' },
  i6: { hours: '50–80', outcomes: 'Design algorithms mentally for optimization and complex problem solving.' },
  i7: { hours: '60–100', outcomes: 'Link cross-domain knowledge (physics, chem, engineering) to create integrated solutions.' },
  i8: { hours: '60–100', outcomes: 'Mentally simulate experiments and complex systems to predict outcomes before acting.' },

  // Matter
  m1: { hours: '40–60', outcomes: 'Understand classical mechanics (forces, motion) and apply to real-world problems.' },
  m2: { hours: '40–60', outcomes: 'Work safely with chemistry basics and predict simple lab reactions.' },
  m3: { hours: '50–70', outcomes: 'Apply thermodynamics and energy concepts to engineering tasks and measurements.' },
  m4: { hours: '40–60', outcomes: 'Understand reaction kinetics and control chemical processes.' },
  m5: { hours: '50–70', outcomes: 'Analyze crystal structures, materials defects, and predict material behavior.' },
  m6: { hours: '60–100', outcomes: 'Safely synthesize materials at small scale and design simple lab procedures.' },
  m7: { hours: '60–100', outcomes: 'Apply quantum mechanics concepts to predict chemical/physical properties.' },

  // Technical
  t1: { hours: '30–50', outcomes: 'Quickly diagnose mechanical/electronic objects and propose improvements or repairs.' },
  t2: { hours: '50–70', outcomes: 'Select and optimize materials for reliability, cost or performance.' },
  t3: { hours: '50–80', outcomes: 'Produce CAD designs and fabricate parts with precise tolerances.' },
  t4: { hours: '50–70', outcomes: 'Diagnose, measure and modify electronic circuits using tools and test equipment.' },
  t5: { hours: '30–50', outcomes: 'Predict safe chemical/physical reactions and design reactive experiments.' },
  t6: { hours: '50–70', outcomes: 'Design control systems and closed-loop behavior for stable performance.' },
  t7: { hours: '80–120', outcomes: 'Integrate multi-disciplinary subsystems into robust working systems (robotics, automation).'},
  t8: { hours: '80–120', outcomes: 'Design miniature mechanical/electronic assemblies and precise small-scale devices.'},
  t9: { hours: '80–120', outcomes: 'Create autonomous devices that sense and act without constant human control.'},
  t10: { hours: '80–120', outcomes: 'Analyze failures, optimize designs, and predict long-term system behavior.'},

  // Cool
  c1: { hours: '20–40', outcomes: 'Assemble outfits and use color/fit to convey intended persona and confidence.' },
  c2: { hours: '40–60', outcomes: 'Persuade and present ideas clearly; perform in public speaking and influence contexts.' },
  c3: { hours: '40–60', outcomes: 'Negotiate and mediate disputes to reach favorable, durable agreements.' },
  c4: { hours: '30–50', outcomes: 'Maintain composure, read people and exploit psychological edges in interactions.' },
  c5: { hours: '50–70', outcomes: 'Build reputation and presence to influence groups and networks reliably.' },
  c6: { hours: '50–70', outcomes: 'Sustain subtle influence across groups and social networks.' },

  // Body
  b1: { hours: '50–80', outcomes: 'Achieve significant strength gains and perform high-rep bodyweight feats.' },
  b2: { hours: '40–60', outcomes: 'Develop cardiovascular base and sustain high-intensity or long-duration work.' },
  b3: { hours: '40–60', outcomes: 'Move efficiently with high coordination, balance and reactive ability.' },
  b4: { hours: '30–50', outcomes: 'Tolerate pain/discomfort, perform under physical stress and minor injuries.' },
  b5: { hours: '30–50', outcomes: 'Optimize nutrition, sleep and recovery to maximize daily performance.' },
  b6: { hours: '30–50', outcomes: 'Build self-discipline and habit systems to sustain high-performance routines.' },

  // Relic
  r1: { hours: '40–60', outcomes: 'Develop focused mindfulness and hyper-awareness for sustained attention.' },
  r2: { hours: '50–70', outcomes: 'Use memory palaces and advanced recall techniques across large knowledge sets.' },
  r3: { hours: '40–60', outcomes: 'Synchronize mind and body to perform complex tasks with coordinated awareness.' },
  r4: { hours: '40–60', outcomes: 'Understand tech-human interaction and anticipate digital trends and behavior shifts.' },
  r5: { hours: '50–80', outcomes: 'Enter extended flow states for creative production and high-pressure decision making.' }
};
