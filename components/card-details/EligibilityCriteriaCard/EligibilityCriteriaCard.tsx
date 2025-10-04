import React from "react";
import type {
  CriterionItemProps,
  EligibilityCriteriaCardProps,
} from "./EligibilityCriteriaCard.types";
import { eligibilityData } from "./EligibilityCriteriaCard.data";

// Checkmark Icon Component
const CheckmarkIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M20 6L9 17L4 12"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Criterion Item Component
const CriterionItem: React.FC<CriterionItemProps> = ({ criterion }) => {
  return (
    <div className="flex items-start gap-4 py-4">
      {/* Checkmark Circle */}
      <div
        className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
        style={{
          background: "rgba(255, 255, 255, 0.08)",
        }}
      >
        <CheckmarkIcon className="w-5 h-5 text-white" />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-white text-base font-medium mb-1">
          {criterion.value}
        </h3>
        <p className="text-white/60 text-sm">{criterion.label}</p>
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
        className="rounded-2xl p-6"
        style={{
          background:
            "linear-gradient(169.98deg, #353F54 27.98%, #222834 81.2%)",
          border: "0.5px solid",
          borderImageSource:
            "linear-gradient(135.66deg, rgba(255, 255, 255, 0.18) -23.01%, rgba(16, 26, 45, 0.6) 40.85%, rgba(255, 255, 255, 0.18) 104.72%)",
          borderImageSlice: 1,
          boxShadow: "1px 8px 10px 0px #0000001F",
        }}
      >
        {/* Header */}
        <h2 className="text-white text-xl font-semibold mb-6">
          {data.heading}
        </h2>

        {/* Criteria List */}
        <div className="space-y-4">
          {data.criteria.map((criterion, index) => (
            <React.Fragment key={criterion.id}>
              <CriterionItem criterion={criterion} />
              {index < data.criteria.length - 1 && (
                <div className="h-px bg-white/10" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EligibilityCriteriaCard;
