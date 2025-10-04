import type { EligibilityCriteriaConfig } from "./EligibilityCriteriaCard.types";

export const eligibilityData: EligibilityCriteriaConfig = {
  heading: "Eligibility Criteria",
  criteria: [
    {
      id: "age",
      value: "21 – 60 years",
      label: "Age eligibility",
      checked: true,
    },
    {
      id: "income",
      value: "₹6 Lakhs per annum",
      label: "Minimum income",
      checked: true,
    },
    {
      id: "cibil",
      value: "750+",
      label: "CIBIL score",
      checked: true,
    },
  ],
};
