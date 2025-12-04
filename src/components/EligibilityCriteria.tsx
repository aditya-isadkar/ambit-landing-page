"use client";

import { CheckCircle } from "lucide-react";
import ScrollAnimation from "./ScrollAnimation";

export default function EligibilityCriteria() {
  const criteria = [
    {
      value: "23-65 yrs",
      label: "Eligible age",
      description: "Simplified paperwork process with digital document submission",
    },
    {
      value: "700+",
      label: "CIBIL Score",
      description: "Starting from 12% per annum with no prepayment penalty",
    },
    {
      value: "≥3 years",
      label: "Business vintage",
      description: "Up to 70% of property value as loan amount with competitive rates",
    },
  ];

  return (
    <section className="py-10 bg-gray-50 relative">
      <div className="container mx-auto px-4">
        <ScrollAnimation direction="up">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              Eligibility Criteria
            </h2>
            {/* <p className="text-xs text-gray-600">
              Simple requirements to get started
            </p> */}
          </div>
        </ScrollAnimation>

        <div className="max-w-5xl mx-auto">
          {/* Minimal Horizontal Layout */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4">
            {criteria.map((item, index) => (
              <ScrollAnimation key={index} direction="up" delay={index * 0.1}>
                <div className="flex-1 w-full md:w-auto bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-primary transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-lg font-bold text-primary">{item.value}</span>
                        <span className="text-xs font-semibold text-gray-700">{item.label}</span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

