"use client";

import { FileText, Home, Percent } from "lucide-react";
import ScrollAnimation from "./ScrollAnimation";

export default function WhyAmbitFinvest() {
  const reasons = [
    {
      icon: FileText,
      title: "Minimum Documentation",
      description: "Simple, paperless process",
      color: "from-primary to-secondary-burgundy",
    },
    {
      icon: Home,
      title: "High loan on your property",
      description: "Loan up to 70% of asset value",
      color: "from-primary to-secondary-burgundy",
    },
    {
      icon: Percent,
      title: "Attractive rate of interest",
      description: "12% interest—no prepayment fees",
      color: "from-secondary-burgundy to-primary",
    },
  ];

  return (
    <section className="py-10 bg-primary-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation direction="up">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Why Ambit Finvest
            </h2>
            {/* <p className="text-xs text-gray-600 max-w-xl mx-auto">
              Choose us for a seamless and rewarding loan experience.
            </p> */}
          </div>
        </ScrollAnimation>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <ScrollAnimation key={index} direction="up" delay={index * 0.1}>
                  <div className="relative h-full flex flex-col">
                    {/* Icon Circle */}
                    <div className="flex justify-center mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${reason.color} rounded-lg flex items-center justify-center shadow-sm`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="text-center flex-1 flex flex-col">
                      <h3 className="text-sm font-bold text-gray-900 mb-2">{reason.title}</h3>
                      <p className="text-xs text-gray-600 leading-relaxed flex-1">{reason.description}</p>
                    </div>
                  </div>
                </ScrollAnimation>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

