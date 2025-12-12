import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhatIsBusinessLoan from "@/components/WhatIsBusinessLoan";
import EligibilityCriteria from "@/components/EligibilityCriteria";
import WhyAmbitFinvest from "@/components/WhyAmbitFinvest";
import EasySteps from "@/components/EasySteps";
import DocumentsRequired from "@/components/DocumentsRequired";
import EMICalculator from "@/components/EMICalculator";
import CustomerStories from "@/components/CustomerStories";
import FAQ from "@/components/FAQ";
import ReadyToGrow from "@/components/ReadyToGrow";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <Header />
      <div id="apply">
        <Hero />
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      <WhatIsBusinessLoan />
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      <div id="eligibility">
        <EligibilityCriteria />
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      <WhyAmbitFinvest />
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      <div id="steps">
        <EasySteps />
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      <DocumentsRequired />
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      <div id="calculator">
        <EMICalculator />
        </div>
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      <CustomerStories />
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      <div id="faq">
        <FAQ />
        </div>
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      <ReadyToGrow />
      </main>
  );
}
