import MultipartForm from "./MultipartForm";
import Image from "next/image";
import bannerImage from "@/assets/Business-Loan.png";

export default function Hero() {
  return (
    <>
      {/* Banner Section - Separate on mobile */}
      <section className="relative overflow-hidden lg:hidden">
        {/* Banner Background Image */}
        <div className="absolute inset-0">
          <Image
            src={bannerImage}
            alt="Business Loan Banner"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 z-0">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Banner Content */}
        <div className="relative z-10 container mx-auto px-4 py-24 pt-16 pb-20">
          <div className="text-white mb-8">
            <h1 className="text-xl font-bold mb-1 leading-tight">
              Secured Business Loan
            </h1>
            <p className="text-xs text-white/90">
              Ambit Finvest: Quick, secure funding.
            </p>
          </div>

          {/* Feature Boxes - Mobile */}
          <div className="flex flex-wrap justify-start gap-10">
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 min-w-[100px] border border-white/20 shadow-lg">
              <div className="text-xs text-white/80 mb-1">Max loan</div>
              <div className="text-xl font-bold text-white">3 Cr</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 min-w-[100px] border border-white/20 shadow-lg">
              <div className="text-xs text-white/80 mb-1">Quick approval</div>
              <div className="text-xl font-bold text-white">24 Hrs</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 min-w-[100px] border border-white/20 shadow-lg">
              <div className="text-xs text-white/80 mb-1">Max tenure</div>
              <div className="text-xl font-bold text-white">15 Yrs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section - Separate on mobile */}
      <section className="lg:hidden bg-white py-4">
        <div className="container mx-auto px-4">
          <MultipartForm />
        </div>
      </section>

      {/* Desktop Layout - Combined Section */}
      <section className="hidden lg:block relative overflow-hidden">
        {/* Banner Background Image */}
        <div className="absolute inset-0">
          <Image
            src={bannerImage}
            alt="Business Loan Banner"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 z-0">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-12 pt-20 pb-24">
          <div className="grid grid-cols-2 gap-8 items-start">
            {/* Banner Content - Left */}
            <div className="text-white">
              <h1 className="text-4xl lg:text-6xl font-bold mb-3 leading-tight">
                Secured Business Loan
              </h1>
              <p className="text-lg lg:text-xl text-white/90">
                Ambit Finvest: Quick, secure funding.
              </p>
            </div>

            {/* Form - Right */}
            <div className="pl-4">
              <MultipartForm />
            </div>
          </div>
        </div>

        {/* Feature Boxes - Bottom with Glass Effect */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pb-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-start gap-3">
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 min-w-[120px] border border-white/20 shadow-lg">
                <div className="text-xs text-white/80 mb-1">Max loan</div>
                <div className="text-2xl md:text-3xl font-bold text-white">3 Cr</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 min-w-[120px] border border-white/20 shadow-lg">
                <div className="text-xs text-white/80 mb-1">Quick approval</div>
                <div className="text-2xl md:text-3xl font-bold text-white">24 Hrs</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 min-w-[120px] border border-white/20 shadow-lg">
                <div className="text-xs text-white/80 mb-1">Max tenure</div>
                <div className="text-2xl md:text-3xl font-bold text-white">15 Yrs</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

