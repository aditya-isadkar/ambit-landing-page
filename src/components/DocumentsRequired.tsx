"use client";

import { FileText, User, Briefcase, Banknote, CreditCard, Home } from "lucide-react";
import ScrollAnimation from "./ScrollAnimation";

export default function DocumentsRequiredDesignTwo() {
  const documentCategories = [
    {
      title: "KYC of Applicant",
      description: "Quick digital verification.",
      icon: User,
    },
    {
      title: "Business Proof",
      description: "Show valid business activity.",
      icon: Briefcase,
    },
    {
      title: "Bank Statements",
      description: "6-12 months financial flow.",
      icon: Banknote,
    },
    {
      title: "Financial Docs",
      description: "Basic income proof docs.",
      icon: CreditCard,
    },
    {
      title: "Property Papers",
      description: "Ownership & secured papers.",
      icon: Home,
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Decorative Elements - Unchanged */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-50/30 transform skew-x-12 origin-top"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation direction="up">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary-burgundy rounded-xl mb-4 shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Documents Required
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Streamlined documentation for a faster loan application process.
            </p>
          </div>
        </ScrollAnimation>

        <div className="w-full">
          {/* Grid setup for 5 columns on desktop, 1 on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {documentCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <ScrollAnimation key={index} direction="up" delay={index * 0.1} className="h-full">
                  <div className="relative h-full flex flex-col">
                    {/* Content Card */}
                    <div className="pt-6 bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-primary transition-all duration-300 h-full flex flex-col">
                      <div className="flex flex-col items-center text-center flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary-burgundy rounded-lg flex items-center justify-center mb-3 shadow-sm">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 mb-2">
                          {category.title}
                        </h3>
                        <p className="text-xs text-gray-600 leading-relaxed flex-1">
                          {category.description}
                        </p>
                      </div>
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