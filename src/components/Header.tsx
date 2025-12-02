import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">
            Ambit Finvest
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#eligibility" className="text-gray-700 hover:text-primary transition-colors">
              Eligibility
            </Link>
            <Link href="#steps" className="text-gray-700 hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="#calculator" className="text-gray-700 hover:text-primary transition-colors">
              EMI Calculator
            </Link>
            <Link href="#faq" className="text-gray-700 hover:text-primary transition-colors">
              FAQ
            </Link>
            <Link
              href="#apply"
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary-burgundy transition-colors"
            >
              Apply Now
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

