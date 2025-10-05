import React from "react";
import Image from "next/image";
import type {
  CriterionItemProps,
  EligibilityCriteriaCardProps,
} from "./EligibilityCriteriaCard.types";
import { eligibilityData } from "./EligibilityCriteriaCard.data";

// Criterion Item Component
const CriterionItem: React.FC<CriterionItemProps> = ({ criterion }) => {
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
        <Image src="/check.svg" alt="Check" width={16} height={16} />
      </div>

      <div className="flex-1">
        <h3 className="text-white text-eligibility-value mb-1">
          {criterion.value}
        </h3>
        <p className="text-eligibility-label" style={{ color: "#999999" }}>
          {criterion.label}
        </p>
      </div>
    </div>
  );
};

// Main Eligibility Criteria Card Component
const EligibilityCriteriaCard: React.FC<EligibilityCriteriaCardProps> = ({
  data = eligibilityData,
  className = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div
        className="relative rounded-2xl"
        style={{ boxShadow: "1px 8px 10px 0px #0000001F" }}
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
            {data.criteria.map((criterion, index) => (
              <React.Fragment key={criterion.id}>
                <CriterionItem criterion={criterion} />
                {index < data.criteria.length - 1 && (
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

export default EligibilityCriteriaCard;
