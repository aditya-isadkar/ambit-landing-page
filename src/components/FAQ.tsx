"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ScrollAnimation from "./ScrollAnimation";

const faqs = [
  {
    question: "What is a secured loan?",
    answer: "A secured loan is a loan that is backed by collateral, such as property, equipment, or other valuable assets. This collateral serves as security for the lender, reducing their risk and often resulting in lower interest rates and higher loan amounts compared to unsecured loans.",
  },
  {
    question: "How does secured business loan work?",
    answer: "A secured business loan works by using your business assets (like property, equipment, or inventory) as collateral. The lender evaluates your collateral's value and typically offers up to 70% of its value as a loan. If you default, the lender can seize the collateral to recover their funds. This security allows for better interest rates and longer repayment terms.",
  },
  {
    question: "Who is eligible for secured business loan?",
    answer: "To be eligible for a secured business loan, you typically need: a business vintage of at least 3 years, a CIBIL score above 675, age between 23-65 years, valid ownership proof of collateral, and proper business documentation. The business should also have a stable income and be registered appropriately.",
  },
  {
    question: "What types of collaterals can be used for a secured business loan?",
    answer: "Common types of collaterals accepted for secured business loans include: commercial or residential property, industrial property, machinery and equipment, inventory, accounts receivable, and other valuable business assets. The collateral must have clear ownership and proper valuation documentation.",
  },
  {
    question: "What are the typical interest rates on secured business loan?",
    answer: "Interest rates on secured business loans typically start from 11.99% per annum and can vary based on factors like your credit score, business vintage, collateral value, and loan amount. Rates are generally lower than unsecured loans due to the reduced risk for lenders. Our rates are competitive and transparent with no hidden charges.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <ScrollAnimation direction="up">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              FAQ
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Frequently asked questions about secured business loans
            </p>
          </div>
        </ScrollAnimation>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <ScrollAnimation key={index} direction="up" delay={index * 0.1}>
            <div
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="font-semibold text-gray-900 text-lg">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0 ml-4" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-white border-t border-gray-200">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}

