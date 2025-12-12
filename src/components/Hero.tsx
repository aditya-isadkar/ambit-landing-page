import MultipartForm from "./MultipartForm";
import Image from "next/image";
import bannerImage from "@/assets/Business-Loan.png";

export default function Hero() {
  return (
    <>
      {/* =========================================
          MOBILE BANNER SECTION 
          ========================================= */}
      <section className="relative overflow-hidden lg:hidden h-[500px]">
        {/* Banner Background Image */}
        <div className="absolute inset-0">
          <Image
            src={bannerImage}
            alt="Business Loan Banner"
            fill
            className="object-cover object-[40%]"
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

        {/* Banner Text Content */}
        <div className="relative z-10 container mx-auto px-4 pt-16">
          <div className="text-white">
            <h1 className="text-3xl font-bold mb-2 leading-tight">
              Secured Business Loan
            </h1>
            <p className="text-sm text-white/90">
              Quick & Secure Funding Solutions
            </p>
          </div>
        </div>

        {/* 
            FEATURE BOXES - MOBILE (UPDATED)
            1. flex-col: Stacks them vertically (1 above 2 above 3).
            2. bottom-4 left-4: Positions them inside the banner at the bottom-left.
            3. w-fit: Ensures the container only takes necessary width (not full width).
        */}
        <div className="absolute bottom-14 right-4 z-20 w-fit">
          <div className="flex flex-col gap-3">
            {/* Box 1 - Top */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 w-[140px] border border-white/20 shadow-lg">
              <div className="text-center text-xs text-white/80 mb-1">Max loan</div>
              <div className="text-center text-xl font-bold text-white">3 Cr</div>
            </div>
            
            {/* Box 2 - Middle */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 w-[140px] border border-white/20 shadow-lg">
              <div className="text-center text-xs text-white/80 mb-1">Quick approval</div>
              <div className="text-center text-xl font-bold text-white">24 Hrs</div>
            </div>

            {/* Box 3 - Bottom */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 w-[140px] border border-white/20 shadow-lg">
              <div className="text-center text-xs text-white/80 mb-1">Max tenure</div>
              <div className="text-center text-xl font-bold text-white">15 Yrs</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          MOBILE FORM SECTION 
          ========================================= */}
      {/* Removed mt-16 because boxes are now inside the banner */}
      <section className="lg:hidden bg-white py-4">
        <div className="container mx-auto px-4">
          <MultipartForm />
        </div>
      </section>

      {/* =========================================
          DESKTOP VIEW (Unchanged)
          ========================================= */}
      <section className="hidden lg:block relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={bannerImage}
            alt="Business Loan Banner"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="absolute inset-0 opacity-10 z-0">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12 pt-20 pb-24">
          <div className="grid grid-cols-2 gap-8 items-start">
            <div className="text-white">
              <h1 className="text-4xl lg:text-6xl font-bold mb-3 leading-tight">
                Secured Business Loan
              </h1>
              <p className="text-lg lg:text-xl text-white/90">
                Quick & Secure Funding Solutions
              </p>
            </div>
            <div className="pl-4">
              <MultipartForm />
            </div>
          </div>
        </div>

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