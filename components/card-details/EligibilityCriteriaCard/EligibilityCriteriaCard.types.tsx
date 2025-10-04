export interface EligibilityCriterion {
  id: string;
  value: string;
  label: string;
  checked?: boolean;
}

export interface EligibilityCriteriaConfig {
  heading: string;
  criteria: EligibilityCriterion[];
}

export interface CriterionItemProps {
  criterion: EligibilityCriterion;
}

export interface EligibilityCriteriaCardProps {
  data?: EligibilityCriteriaConfig;
  className?: string;
}
