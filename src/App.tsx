import { useState, useMemo } from 'react';
import { CategorySelection } from './components/CategorySelection';
import { DetailedPerkTree } from './components/DetailedPerkTree';
import { categories } from './data/perkData';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryProgress, setCategoryProgress] = useState<Record<string, Set<string>>>({
    technical: new Set(),
    matter: new Set(),
    intelligence: new Set(),
    cool: new Set(),
    body: new Set(),
    relic: new Set()
  });

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
