"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import Link from "next/link";
import ScrollAnimation from "./ScrollAnimation";

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(11.99);
  const [tenure, setTenure] = useState(12);

  const calculateEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);
    return Math.round(emi);
  };

  const totalAmount = calculateEMI() * tenure;
  const totalInterest = totalAmount - loanAmount;

  return (
    <section className="py-20 bg-gradient-to-br from-secondary-burgundy to-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <ScrollAnimation direction="right">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg mb-6">
                <Calculator className="w-5 h-5" />
                <span className="text-sm font-medium">EMI Calculator</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Plan Smart with Our EMI Calculator
              </h2>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Quick EMI estimate—just loan, rate, and tenure. Plan your finances better with our easy-to-use calculator.
              </p>
            </div>
          </ScrollAnimation>

          {/* Right Side - Calculator */}
          <ScrollAnimation direction="left" delay={0.2}>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="space-y-6">
                {/* Loan Amount */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/80">
                    Loan Amount
                  </label>
                  <input
                    type="range"
                    min="100000"
                    max="30000000"
                    step="100000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #f30402 0%, #f30402 ${((loanAmount - 100000) / (30000000 - 100000)) * 100}%, #4b5563 ${((loanAmount - 100000) / (30000000 - 100000)) * 100}%, #4b5563 100%)`
                    }}
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-white/60">₹1 Lakh</span>
                    <span className="text-lg font-bold text-white">₹{(loanAmount / 100000).toFixed(1)} Lakh</span>
                    <span className="text-sm text-white/60">₹3 Cr</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/80">
                    Interest Rate (% per annum)
                  </label>
                  <input
                    type="range"
                    min="8"
                    max="20"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #f30402 0%, #f30402 ${((interestRate - 8) / (20 - 8)) * 100}%, #4b5563 ${((interestRate - 8) / (20 - 8)) * 100}%, #4b5563 100%)`
                    }}
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-white/60">8%</span>
                    <span className="text-lg font-bold text-white">{interestRate.toFixed(2)}%</span>
                    <span className="text-sm text-white/60">20%</span>
                  </div>
                </div>

                {/* Tenure */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/80">
                    Loan Tenure (months)
                  </label>
                  <input
                    type="range"
                    min="6"
                    max="60"
                    step="6"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #f30402 0%, #f30402 ${((tenure - 6) / (60 - 6)) * 100}%, #4b5563 ${((tenure - 6) / (60 - 6)) * 100}%, #4b5563 100%)`
                    }}
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-white/60">6 months</span>
                    <span className="text-lg font-bold text-white">{tenure} months</span>
                    <span className="text-sm text-white/60">60 months</span>
                  </div>
                </div>

                {/* Results */}
                <div className="pt-6 border-t border-white/20 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Monthly EMI</span>
                    <span className="text-3xl font-bold text-secondary-orange">
                      ₹{calculateEMI().toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Total Interest</span>
                    <span className="text-white/80">₹{totalInterest.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Total Amount</span>
                    <span className="text-white/80">₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>

        {/* Moved Calculate EMI Button Below the Calculator */}
        <ScrollAnimation direction="up" delay={0.4}>
          <div className="text-left mt-12">
            <Link
              href="#apply"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:bg-secondary-burgundy transition-all shadow-lg hover:shadow-xl"
            >
              Calculate EMI
            </Link>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}