"use client";

import { FileText, User, Briefcase, Banknote, CreditCard, Home } from "lucide-react";
import ScrollAnimation from "./ScrollAnimation";

export default function DocumentsRequired() {
  const documentCategories = [
    {
      title: "KYC of Applicant",
      description: "Paperless KYC with quick digital verification.",
      icon: User,
    },
    {
      title: "Business Proof",
      description: "Show valid business activity to unlock up to 70% asset value.",
      icon: Briefcase,
    },
    {
      title: "6-12 Months Bank Statements",
      description: "Recent statements to assess financial flow and stability.",
      icon: Banknote,
    },
    {
      title: "Financial Documents",
      description: "Basic income proof to support loan eligibility.",
      icon: CreditCard,
    },
    {
      title: "Property Papers",
      description: "Submit ownership documents for secured loan processing.",
      icon: Home,
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Decorative Elements */}
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

        <div className="max-w-4xl mx-auto">
          <div className="space-y-3">
            {documentCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <ScrollAnimation key={index} direction="left" delay={index * 0.1}>
                  <div className="group relative flex items-start gap-4 p-4 bg-white rounded-lg border-l-4 border-primary shadow-sm hover:shadow-md transition-all duration-300 hover:border-secondary-burgundy">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
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

