"use client";

import { FileText, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import ScrollAnimation from "./ScrollAnimation";

export default function EasySteps() {
  const steps = [
    {
      icon: FileText,
      title: "Fill Application",
      description: "Complete our simple online form with your business details",
      number: "01",
    },
    {
      icon: CheckCircle,
      title: "Get Approved",
      description: "Our team reviews your application and approves within 24 hours",
      number: "02",
    },
    {
      icon: Clock,
      title: "Receive Funds",
      description: "Get your loan amount directly transferred to your account",
      number: "03",
    },
  ];

  return (
    <section className="py-10 relative overflow-hidden" style={{ backgroundColor: '#fef3e8' }}>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation direction="up">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Apply in 3 Easy Steps
            </h2>
            <p className="text-sm text-gray-600 max-w-xl mx-auto">
              A streamlined process designed to get you the funds you need quickly
            </p>
          </div>
        </ScrollAnimation>

        {/* Compact Horizontal Layout */}
        <div className="max-w-5xl mx-auto mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <ScrollAnimation key={index} direction="up" delay={index * 0.1}>
                  <div className="relative h-full flex flex-col">
                    {/* Step Number Badge */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-20 md:left-0 md:transform-none">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-md border-2 border-white">
                        <span className="text-white font-bold text-xs">{step.number}</span>
                      </div>
                    </div>
                    
                    {/* Content Card */}
                    <div className="pt-6 bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-primary transition-all duration-300 h-full flex flex-col">
                      <div className="flex flex-col items-center text-center flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary-burgundy rounded-lg flex items-center justify-center mb-3 shadow-sm">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-xs text-gray-600 leading-relaxed flex-1">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>
              );
            })}
          </div>
        </div>

        <ScrollAnimation direction="up" delay={0.3}>
          <div className="text-center">
            <Link
              href="#apply"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary-burgundy text-white rounded-lg font-semibold text-sm hover:from-secondary-burgundy hover:to-secondary-burgundy transition-all shadow-md hover:shadow-lg"
            >
              Apply Now
            </Link>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

