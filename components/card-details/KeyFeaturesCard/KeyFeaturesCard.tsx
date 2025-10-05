import React from "react";
import Image from "next/image";
import type {
  FeatureItemProps,
  KeyFeaturesCardProps,
} from "./KeyFeaturesCard.types";
import { featuresData } from "./KeyFeaturesCard.data";

// Feature Item Component
const FeatureItem: React.FC<FeatureItemProps> = ({ feature }) => {
  const iconMap: { [key: string]: string } = {
    fork: "/fork.svg",
    bag: "/spends/bag.svg",
    airplane: "/spends/airplane.svg",
  };
  const iconPath = iconMap[feature.icon] || "/fork.svg";

  return (
    <div className="flex items-start gap-4" style={{ padding: "12px 16px" }}>
      <div
        className="flex-shrink-0 rounded-full flex items-center justify-center"
        style={{
          background: "rgba(255, 255, 255, 0.08)",
          width: "40px",
          height: "40px",
        }}
      >
        <Image src={iconPath} alt={feature.title} width={16} height={16} />
      </div>

      <div className="flex-1">
        <h3 className="text-white text-eligibility-value mb-1">
          {feature.title}
        </h3>
        <p className="text-eligibility-label" style={{ color: "#999999" }}>
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
        className="relative rounded-2xl"
        style={{ boxShadow: "1px 8px 10px 0px rgba(0, 0, 0, 0.12)" }}
      >
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background:
              "linear-gradient(135.66deg, rgba(255, 255, 255, 0.18) -23.01%, rgba(16, 26, 45, 0.6) 40.85%, rgba(255, 255, 255, 0.18) 104.72%)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "0.5px",
          }}
        />

        <div
          className="relative rounded-2xl"
          style={{
            background:
              "linear-gradient(169.98deg, #353F54 27.98%, #222834 81.2%)",
          }}
        >
          <h2
            className="text-white text-eligibility-heading"
            style={{ padding: "14px 16px" }}
          >
            {data.heading}
          </h2>

          <div style={{ borderTop: "0.5px solid #FFFFFF1A" }} />

          <div>
            {data.features.map((feature, index) => (
              <React.Fragment key={feature.id}>
                <FeatureItem feature={feature} />
                {index < data.features.length - 1 && (
                  <div
                    style={{
                      borderBottom: "1px dotted #BBBBBB1A",
                      marginLeft: "72px",
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyFeaturesCard;
