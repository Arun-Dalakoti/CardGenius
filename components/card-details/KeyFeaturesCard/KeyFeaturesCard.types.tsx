export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface KeyFeaturesConfig {
  heading: string;
  features: Feature[];
}

export interface FeatureItemProps {
  feature: Feature;
}

export interface KeyFeaturesCardProps {
  data?: KeyFeaturesConfig;
  className?: string;
}
