import React from "react";
import type {
  FeatureItemProps,
  KeyFeaturesCardProps,
} from "./KeyFeaturesCard.types";
import { featuresData } from "./KeyFeaturesCard.data";

// Icon Components
const DiningIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
  >
    <path
      d="M8 4V18M8 18C9.06087 18 10.0783 17.5786 10.8284 16.8284C11.5786 16.0783 12 15.0609 12 14V4M8 18V28M16 4V14M16 14C16 15.0609 16.4214 16.0783 17.1716 16.8284C17.9217 17.5786 18.9391 18 20 18M16 14V28M20 4V18M20 18V28"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ShoppingIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
  >
    <path
      d="M10.6667 13.3333V8C10.6667 6.58551 11.2286 5.22896 12.2288 4.22876C13.229 3.22857 14.5855 2.66667 16 2.66667C17.4145 2.66667 18.771 3.22857 19.7712 4.22876C20.7714 5.22896 21.3333 6.58551 21.3333 8V13.3333M5.33333 10.6667L4 26.6667C4 27.3739 4.28095 28.0522 4.78105 28.5523C5.28115 29.0524 5.95942 29.3333 6.66667 29.3333H25.3333C26.0406 29.3333 26.7189 29.0524 27.219 28.5523C27.719 28.0522 28 27.3739 28 26.6667L26.6667 10.6667H5.33333Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LoungeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
  >
    <path
      d="M4 20L16 8L28 20M6.66667 17.3333V26.6667C6.66667 27.0203 6.80714 27.3594 7.05719 27.6095C7.30724 27.8595 7.64638 28 8 28H24C24.3536 28 24.6928 27.8595 24.9428 27.6095C25.1929 27.3594 25.3333 27.0203 25.3333 26.6667V17.3333"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 28V18.6667C12 18.313 12.1405 17.9739 12.3905 17.7239C12.6406 17.4738 12.9797 17.3333 13.3333 17.3333H18.6667C19.0203 17.3333 19.3594 17.4738 19.6095 17.7239C19.8595 17.9739 20 18.313 20 18.6667V28"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const iconMap = {
  dining: DiningIcon,
  shopping: ShoppingIcon,
  lounge: LoungeIcon,
};

// Feature Item Component
const FeatureItem: React.FC<FeatureItemProps> = ({ feature }) => {
  const IconComponent =
    iconMap[feature.icon as keyof typeof iconMap] || DiningIcon;

  return (
    <div className="flex items-start gap-4 py-4">
      {/* Icon Circle */}
      <div
        className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
        style={{
          background: "rgba(255, 255, 255, 0.08)",
        }}
      >
        <IconComponent className="w-6 h-6 text-white/80" />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-white text-base font-medium mb-1">
          {feature.title}
        </h3>
        <p className="text-white/60 text-sm leading-relaxed">
          {feature.description}
        </p>
      </div>
    </div>
  );
};

// Main Key Features Card Component
const KeyFeaturesCard: React.FC<KeyFeaturesCardProps> = ({
  data = featuresData,
  className = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div
        className="rounded-2xl p-6"
        style={{
          background:
            "linear-gradient(169.98deg, #353F54 27.98%, #222834 81.2%)",
          border: "0.5px solid",
          borderImageSource:
            "linear-gradient(135.66deg, rgba(255, 255, 255, 0.18) -23.01%, rgba(16, 26, 45, 0.6) 40.85%, rgba(255, 255, 255, 0.18) 104.72%)",
          borderImageSlice: 1,
          boxShadow: "1px 8px 10px 0px rgba(0, 0, 0, 0.12)",
        }}
      >
        {/* Header */}
        <h2 className="text-white text-xl font-semibold mb-6">
          {data.heading}
        </h2>

        {/* Features List */}
        <div className="space-y-4">
          {data.features.map((feature, index) => (
            <React.Fragment key={feature.id}>
              <FeatureItem feature={feature} />
              {index < data.features.length - 1 && (
                <div className="h-px bg-white/10" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeyFeaturesCard;
