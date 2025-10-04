export interface SavingsCategory {
  id: string;
  icon: string;
  name: string;
  spent: number;
  saved: number;
  percentage: number;
}

export interface SavingsBreakdownConfig {
  heading: string;
  categories: SavingsCategory[];
  totalSpent: number;
  totalSavings: number;
  averagePercentage: number;
  currency?: string;
}

export interface CategoryRowProps {
  category: SavingsCategory;
  currency: string;
}

export interface SavingsBreakdownCardProps {
  totalSpends: number;
  avgCashback: number;
  categorySpends?: { [key: string]: number };
  onExpand?: () => void;
}
