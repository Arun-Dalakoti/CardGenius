import type { SavingsData } from "./SavingsCard.types";

export const savingsConfig: SavingsData = {
  totalSavings: 12800,
  categories: [
    {
      id: "travel",
      name: "Travel",
      spent: 11250,
      saved: 6250,
      percentage: 5,
    },
    {
      id: "shopping",
      name: "Shopping",
      spent: 11250,
      saved: 6250,
      percentage: 5,
    },
    {
      id: "fuel",
      name: "Fuel",
      spent: 11250,
      saved: 6250,
      percentage: 5,
    },
  ],
  annualFee: 1200,
};
