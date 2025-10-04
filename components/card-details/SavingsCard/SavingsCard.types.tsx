export interface SpendingCategory {
  id: string;
  name: string;
  spent: number;
  saved: number;
  percentage: number;
}

export interface SavingsData {
  totalSavings: number;
  categories: SpendingCategory[];
  annualFee: number;
}

export interface CategoryRowProps {
  category: SpendingCategory;
  currency?: string;
}

export interface SummaryRowProps {
  label: string;
  amount: number;
  currency?: string;
  isNegative?: boolean;
  highlight?: boolean;
  showDivider?: boolean;
}

export interface SavingsCardProps {
  data?: SavingsData;
  currency?: string;
  onEditSpending?: () => void;
}
