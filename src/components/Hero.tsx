import MultipartForm from "./MultipartForm";
import Image from "next/image";
import bannerImage from "@/assets/Business-Loan.png";

export default function Hero() {
  return (
    <>
      {/* =========================================
          MOBILE BANNER SECTION 
          ========================================= */}
      {/* 
          1. Removed 'overflow-hidden' from here so the boxes can hang out the bottom.
          2. Kept h-[500px] to maintain banner height.
      */}
      <section className="relative lg:hidden h-[500px]">
        
        {/* Banner Background Image Wrapper
            Added 'overflow-hidden' HERE instead, so the image stays contained 
            but the feature boxes (which are outside this div) can spill out.
        */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={bannerImage}
            alt="Business Loan Banner"
            fill
            className="object-cover"
            priority
          />
           {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 z-0">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
        </div>

        {/* Banner Text Content */}
        <div className="relative z-10 container mx-auto px-4 pt-16">
          <div className="text-white">
            <h1 className="text-3xl font-bold mb-2 leading-tight">
              Secured Business Loan
            </h1>
            <p className="text-sm text-white/90">
              Ambit Finvest: Quick, secure funding.
            </p>
          </div>
        </div>

        {/* 
            FEATURE BOXES - MOBILE
            1. bottom-0: Position at the bottom edge.
            2. translate-y-1/2: This moves it DOWN by 50% of its own height.
               (This creates the "half-in, half-out" glass effect).
        */}
        <div className="absolute bottom-0 left-0 z-20 w-full px-4 translate-y-1/2">
          <div className="flex flex-wrap justify-start gap-3">
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

      {/* =========================================
          MOBILE FORM SECTION 
          ========================================= */}
      {/* 
          Added 'mt-16' (margin-top).
          Since the boxes above are pushed down ~40-50px, we need to push 
          this section down so the boxes don't cover the form title.
      */}
      <section className="lg:hidden bg-white py-4 mt-16">
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
                Ambit Finvest: Quick, secure funding.
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