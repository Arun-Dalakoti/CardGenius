import { create } from "zustand";

interface CategorySavings {
  id: string;
  name: string;
  spent: number;
  saved: number;
  percentage: number;
}

interface SpendingState {
  selectedCategories: string[];
  categorySpends: { [key: string]: number };
  totalSpends: number;
  selectedCard: {
    name: string;
    bank: string;
    cashback: number;
    annualFee: number;
    joiningBonus: number;
    rating?: number;
    reviews?: number;
    rewardPoints?: string;
  } | null;
  categorySavings: CategorySavings[];
  totalSavings: number;
  setSelectedCategories: (categories: string[]) => void;
  setCategorySpends: (spends: { [key: string]: number }) => void;
  setTotalSpends: (total: number) => void;
  setSelectedCard: (card: {
    name: string;
    bank: string;
    cashback: number;
    annualFee: number;
    joiningBonus: number;
    rating?: number;
    reviews?: number;
    rewardPoints?: string;
  }) => void;
  setCategorySavings: (savings: CategorySavings[]) => void;
  setTotalSavings: (total: number) => void;
}

export const useSpendingStore = create<SpendingState>((set) => ({
  selectedCategories: [],
  categorySpends: {},
  totalSpends: 0,
  selectedCard: null,
  categorySavings: [],
  totalSavings: 0,
  setSelectedCategories: (categories) => set({ selectedCategories: categories }),
  setCategorySpends: (spends) => set({ categorySpends: spends }),
  setTotalSpends: (total) => set({ totalSpends: total }),
  setSelectedCard: (card) => set({ selectedCard: card }),
  setCategorySavings: (savings) => set({ categorySavings: savings }),
  setTotalSavings: (total) => set({ totalSavings: total }),
}));
