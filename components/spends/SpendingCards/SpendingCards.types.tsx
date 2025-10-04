export interface SpendingCategory {
  id: string;
  icon: string;
  name: string;
  currentAmount: number;
  maxAmount: number;
  currency?: string;
  quickIncrements: number[];
  savingsMessage?: {
    amount: number;
    increaseBy: number;
  };
}

export interface SpendingCategoriesConfig {
  categories: SpendingCategory[];
}

export interface SpendingCategoryCardProps {
  category: SpendingCategory;
  onAmountChange?: (amount: number) => void;
}

export interface SpendingCategoriesProps {
  data?: SpendingCategoriesConfig;
  onCategoryChange?: (categories: string[]) => void;
  onTotalChange?: (total: number) => void;
  onCategorySpendsChange?: (categorySpends: { [key: string]: number }) => void;
}
