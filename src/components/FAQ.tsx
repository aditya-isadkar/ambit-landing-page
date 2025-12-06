"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ScrollAnimation from "./ScrollAnimation";

const faqs = [
  {
    question: "What is a secured business loan?",
    answer: (
      <p>
        It is a business loan against property,where you pledge an asset as
        collateral. If you default, the lender can take the collateral to
        recover the loan.
      </p>
    ),
  },
  {
    question: "How does a secured business loan work?",
    answer: (
      <p>
        The borrower gives collateral, such as property or equipment, to secure
        the loan. Then the lender assesses the value of the collateral and
        approves the secured loan for business based on this, often offering a
        lower interest rate due to reduced risk.
      </p>
    ),
  },
  {
    question: "Who is eligible for a secured business loan?",
    answer: (
      <p>
        Typically, established businesses with valuable assets to pledge are
        eligible. Startups may also be eligible if they have assets to offer as
        collateral.
      </p>
    ),
  },
  {
    question: "What types of collateral can be used for a secured business loan?",
    answer: (
      <p>
        Common collateral includes real estate, equipment, inventory, vehicles,
        and other business assets. In some cases, personal assets, houses,
        flats, lands, etc. can also be used.
      </p>
    ),
  },
  {
    question: "What is the typical interest rate for a secured business loan?",
    answer: (
      <p>
        Interest rates vary based on the lender, collateral, and borrower’s
        credit score but generally range from 8% to 15% annually in India.
      </p>
    ),
  },
  {
    question: "How long does it take to process a secured business loan application?",
    answer: (
      <p>
        The processing time for a secured loan for business usually ranges from
        a few days to a few weeks, depending on the lender&#39;s verification
        process and the complexity of the collateral evaluation.
      </p>
    ),
  },
  {
    question: "Can I prepay my secured business loan?",
    answer: (
      <p>
        Yes, many lenders allow prepayment of secured business loans, but there
        might be a prepayment penalty depending on the loan terms.
      </p>
    ),
  },
  {
    question: "What happens if I default on a secured business loan?",
    answer: (
      <p>
        If you default on the business loan against property, the lender can
        seize the collateral used to secure the loan, which can include business
        or personal assets.
      </p>
    ),
  },
  {
    question: "What is the interest rate for a secured business loan at Ambit Finvest?",
    answer: (
      <p>
        We offer competitive interest rates, it starts from 12% but specific
        rates depend on the loan amount, collateral, and borrower&#39;s
        profile.
      </p>
    ),
  },
  {
    question: "Can I get a loan equivalent to the value of the collateral?",
    answer: (
      <p>
        Lenders generally do not offer a loan amount equal to 100% of the
        collateral’s value. Instead, they provide a percentage (Loan-to-Value
        ratio), usually ranging from 50% to 80%, depending on the property
        valuation.
      </p>
    ),
  },
  {
    question: "Can I also apply for a secured business loan for my startup from Ambit Finvest?",
    answer: (
      <p>
        Yes, Ambit Finvest may offer secured loans to startups if they have
        valuable collateral to pledge.
      </p>
    ),
  },
  {
    question: "What is the application process for a secured business loan?",
    answer: (
      <p>
        The application process generally includes submitting your business
        details, financial statements, credit score, and details of the
        collateral. Lenders will also assess the collateral’s value before
        approving the loan.
      </p>
    ),
  },
  {
    question: "What credit score is required to obtain a secured business loan from Ambit Finvest?",
    answer: (
      <p>
        If your credit score is above 675, you can easily apply for a business
        loan against property with us.
      </p>
    ),
  },
  {
    question: "Which is better: a secured business loan or an unsecured loan?",
    answer: (
      <p>
        Secured loans have lower interest rates and higher loan amounts and also
        require collateral like property or equipment. Business loan against
        property generally has a longer tenure whereas unsecured loans are
        easier to get but come with higher interest rates, smaller loan amounts,
        and shorter loan tenure. The best choice depends on your business needs
        and asset availability.
      </p>
    ),
  },
  {
    question: "Do you have a calculator to help make a decision based on interest rates?",
    answer: (
      <p>
        You can check your loan eligibility using our loan eligibility
        calculator and estimate your payments with our Business Loan EMI
        calculator.
      </p>
    ),
  },
  {
    question: "How can one apply for a secured business loan online or offline?",
    answer: (
      <p>
        You can apply online by clicking on this link{" "}
        <a
          className="text-blue-500"
          href="https://finvest.ambit.co/apply/secured-business-loan"
        >
          https://finvest.ambit.co/apply/secured-business-loan
        </a>{" "}
        and filling out the application form. To apply offline, visit the
        nearest branch or call 9015790157, and our customer support team will
        promptly get in touch with you.
      </p>
    ),
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);

  // Default number of items to show
  const initialItemCount = 5;
  const visibleFaqs = showAll ? faqs : faqs.slice(0, initialItemCount);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
    // Optional: If clicking "Read Less", you might want to scroll the user back up slightly
    // logic for that could go here, but I've kept it simple as requested.
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-50/30 transform skew-x-12 origin-top"></div>

      <div className="container mx-auto px-4 relative z-10">
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
          {visibleFaqs.map((faq, index) => (
            <ScrollAnimation key={index} direction="up" delay={index * 0.1}>
              <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-lg pr-4">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0 ml-4" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 py-4 bg-white border-t border-gray-200 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Read More / Read Less Button */}
        <ScrollAnimation direction="up" delay={0.2}>
          <div className="flex justify-center mt-8">
            <button
              onClick={toggleShowAll}
              className="bg-[#FF0000] hover:bg-red-700 text-white text-lg px-8 py-3 rounded-md transition-colors duration-300"
            >
              {showAll ? "Read Less" : "Read More"}
            </button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}