"use client";

import { TrendingUp, ArrowRight } from "lucide-react";
import ScrollAnimation from "./ScrollAnimation";

export default function WhatIsBusinessLoan() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-primary-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <ScrollAnimation direction="right">
              <div className="relative">
                <div className="inline-flex items-center gap-2 bg-primary-100 px-4 py-2 rounded-full mb-6">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold text-primary">Business Growth</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  What is Business Loan
                </h2>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                  Looking to expand your business? Vyapar Loans offers quick and secure loans tailored for established businesses. Whether it's for inventory, working capital, or scaling operations—we're here to help, with a simple process and fair rates.
                </p>
                {/* <div className="flex items-center gap-3 text-primary font-semibold">
                  <span>Learn More</span>
                  <ArrowRight className="w-5 h-5" />
                </div> */}
              </div>
            </ScrollAnimation>

            {/* Right Side - Visual Element */}
            <ScrollAnimation direction="left" delay={0.2}>
              <div className="relative">
                <div className="relative bg-gradient-to-br from-primary to-secondary-burgundy rounded-3xl p-12 text-white transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary-orange rounded-full opacity-20 blur-2xl"></div>
                  <div className="relative z-10">
                    <div className="text-6xl font-bold mb-4">₹3Cr</div>
                    <div className="text-xl mb-6 opacity-90">Maximum Loan Amount</div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-secondary-orange rounded-full"></div>
                        <span>Quick Approval</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-secondary-orange rounded-full"></div>
                        <span>Flexible Terms</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-secondary-orange rounded-full"></div>
                        <span>Competitive Rates</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 w-full h-full bg-primary-200/30 rounded-3xl -z-10 transform -rotate-3"></div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  );
}

