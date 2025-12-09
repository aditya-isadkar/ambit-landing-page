"use client";

import { FileText, User, Briefcase, Banknote, CreditCard, Home } from "lucide-react";
import ScrollAnimation from "./ScrollAnimation";

export default function DocumentsRequired() {
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
    // Updated background classes to match the source code provided
    <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-primary-50 relative overflow-hidden">
      
      {/* Updated Decorative Elements from Source */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
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
          {/* Grid: 1 column on mobile (vertical), 5 columns on desktop (horizontal) */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {documentCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <ScrollAnimation key={index} direction="up" delay={index * 0.1} className="h-full">
                  <div className="group h-full relative bg-white rounded-2xl p-6 pt-8
                    border-t-4 border-t-primary 
                    border-x border-b border-gray-200 
                    hover:border-primary
                    transition-colors duration-300 
                    flex flex-col items-center text-center shadow-sm">
                    
                    {/* Icon Styled EXACTLY like EasySteps (No zoom, specific size) */}
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary-burgundy rounded-lg flex items-center justify-center mb-3 shadow-sm flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    {/* Text Content */}
                    <h3 className="text-sm font-bold text-gray-900 mb-2">
                      {category.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-medium">
                      {category.description}
                    </p>
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