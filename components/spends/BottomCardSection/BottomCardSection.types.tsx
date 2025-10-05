export interface CreditCard {
  id: string;
  name: string;
  bank: string;
  image: string;
  categories: string[];
  cashback: number;
  annualFee: number;
  joiningBonus: number;
  rating?: number;
  reviews?: number;
  rewardPoints?: string;
}

export interface BottomCardSectionProps {
  selectedCategories: string[];
  totalSpends: number;
  categorySpends?: { [key: string]: number };
}
