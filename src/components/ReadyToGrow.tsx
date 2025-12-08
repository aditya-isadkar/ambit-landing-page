"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollAnimation from "./ScrollAnimation";

export default function ReadyToGrow() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#e71c23] via-[#e71c23] to-[#af1d30] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation direction="fade" delay={0.2}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Ready to Grow Your Business?
            </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Get fast, secure loans up to ₹3Cr in just 24 hours
          </p>
          <Link
            href="#apply"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-lg font-semibold text-lg hover:bg-primary-50 transition-all shadow-lg hover:shadow-xl"
          >
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

