import { useState, useMemo, useEffect } from 'react';
import { CategorySelection } from './components/CategorySelection';
import { DetailedPerkTree } from './components/DetailedPerkTree';
import { categories } from './data/perkData';

// Helper functions for localStorage
const loadProgress = (): Record<string, Set<string>> => {
  try {
    const stored = localStorage.getItem('perkProgress');
    if (stored) {
      const parsed = JSON.parse(stored);
      return Object.entries(parsed).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: new Set(value as string[])
      }), {});
    }
  } catch (e) {
    console.error('Failed to load progress:', e);
  }
  return {
    technical: new Set(),
    matter: new Set(),
    intelligence: new Set(),
    cool: new Set(),
    body: new Set(),
    relic: new Set()
  };
};

const saveProgress = (progress: Record<string, Set<string>>) => {
  try {
    const serialized = Object.entries(progress).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: Array.from(value)
    }), {});
    localStorage.setItem('perkProgress', JSON.stringify(serialized));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryProgress, setCategoryProgress] = useState<Record<string, Set<string>>>(loadProgress);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    saveProgress(categoryProgress);
  }, [categoryProgress]);

  const characterLevel = useMemo(() => {
    let totalUnlocked = 0;
    Object.values(categoryProgress).forEach(perks => {
      totalUnlocked += perks.size;
    });
    return Math.floor(totalUnlocked / 5) + 1; // Level up every 5 perks
  }, [categoryProgress]);

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };

  const handlePerkUpdate = (categoryId: string, unlockedPerks: Set<string>) => {
    setCategoryProgress(prev => ({
      ...prev,
      [categoryId]: unlockedPerks
    }));
  };

  const currentCategory = categories.find(c => c.id === selectedCategory);

  return (
    <>
      {!selectedCategory ? (
        <CategorySelection
          categories={categories}
          onSelectCategory={handleSelectCategory}
          characterLevel={characterLevel}
          categoryProgress={categoryProgress}
        />
      ) : currentCategory ? (
        <DetailedPerkTree
          category={currentCategory}
          onBack={handleBack}
          initialUnlockedPerks={categoryProgress[currentCategory.id] || new Set()}
          onPerkUpdate={(perks) => handlePerkUpdate(currentCategory.id, perks)}
        />
      ) : null}
    </>
  );
}
