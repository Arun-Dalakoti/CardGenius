import type { SpendingCategoriesConfig } from "./SpendingCards.types";

export const spendingData: SpendingCategoriesConfig = {
  categories: [
    {
      id: "travel",
      icon: "travel",
      name: "Travel",
      currentAmount: 6000,
      maxAmount: 15000,
      currency: "₹",
      quickIncrements: [1000, 5000],
      savingsMessage: {
        amount: 5000,
        increaseBy: 1000,
      },
    },
    {
      id: "shopping",
      icon: "shopping",
      name: "Shopping",
      currentAmount: 8000,
      maxAmount: 20000,
      currency: "₹",
      quickIncrements: [1000, 5000],
      savingsMessage: {
        amount: 4500,
        increaseBy: 2000,
      },
    },
    {
      id: "fuel",
      icon: "fuel",
      name: "Fuel",
      currentAmount: 4000,
      maxAmount: 10000,
      currency: "₹",
      quickIncrements: [1000, 5000],
      savingsMessage: {
        amount: 3000,
        increaseBy: 1500,
      },
    },
  ],
};

export const iconMap = {
  travel: "/spends/airplane.svg",
  shopping: "/spends/bag.svg",
  fuel: "/spends/fuel.svg",
};
