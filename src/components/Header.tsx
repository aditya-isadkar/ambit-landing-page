 "use client";
 
 import { useEffect, useState } from "react";
 import Link from "next/link";
 import logo from "@/assets/image.avif"; // Importing the image from src/assets
 import { Menu, X } from "lucide-react";
 import { createPortal } from "react-dom";
 
 export default function Header({ alwaysVisible = false }: { alwaysVisible?: boolean }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [inHero, setInHero] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, mounted]);

  useEffect(() => {
    if (alwaysVisible) {
      setHidden(false);
      return;
    }
    function computeHeroVisible() {
      const el = document.getElementById("apply");
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.bottom > 0 && r.top < window.innerHeight;
    }
    function onScroll() {
      const y = window.scrollY || 0;
      const heroVisible = computeHeroVisible();
      setInHero(heroVisible);
      if (heroVisible) {
        setHidden(false);
      } else {
        if (y < lastY - 5) {
          setHidden(true);
        } else if (y > lastY + 5) {
          setHidden(false);
        }
      }
      setLastY(y);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [lastY]);

  useEffect(() => {
    if (open) setHidden(false);
  }, [open]);
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm transform transition-transform duration-300 ${hidden && !alwaysVisible ? "-translate-y-full" : "translate-y-0"}`}>
      <div className="container mx-auto px-4 py-1">
        <div className="flex items-center justify-between">
           {/* Replaced Text with Image */}
           <Link href="/" className="block">
             <img 
               src={logo.src} // Accessing the src property of the imported image
               alt="Ambit Finvest" 
               className="object-cover h-[70px] md:w-[260px] w-[200px]" // Adjusted height to fit header
             />
           </Link>
 
           <button
             type="button"
             aria-label="Open menu"
             className="md:hidden p-2 rounded hover:bg-gray-100"
             onClick={() => setOpen(true)}
           >
             <Menu className="w-6 h-6 text-gray-700" />
           </button>
 
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
             {/* <Link
               href="#apply"
               className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary-burgundy transition-colors"
             >
               Apply Now
             </Link> */}
           </nav>
         </div>
       </div>
 
      {mounted && open &&
        createPortal(
          <div className="md:hidden fixed inset-0 z-[100] flex flex-col">
            <div className="bg-white">
              <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                  <img 
                    src={logo.src}
                    alt="Ambit Finvest" 
                    className="object-cover h-[70px] md:w-[260px] w-[200px]"
                  />
                  <button
                    type="button"
                    aria-label="Close menu"
                    className="p-2 rounded hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    <X className="w-6 h-6 text-gray-700" />
                  </button>
                </div>
                <div className="mt-2 flex flex-col">
                  <Link href="#eligibility" className="px-2 py-4 text-gray-700 hover:text-primary transition-colors" onClick={() => setOpen(false)}>
                    Eligibility
                  </Link>
                  <Link href="#steps" className="px-2 py-4 text-gray-700 hover:text-primary transition-colors" onClick={() => setOpen(false)}>
                    How It Works
                  </Link>
                  <Link href="#calculator" className="px-2 py-4 text-gray-700 hover:text-primary transition-colors" onClick={() => setOpen(false)}>
                    EMI Calculator
                  </Link>
                  <Link href="#faq" className="px-2 py-4 text-gray-700 hover:text-primary transition-colors" onClick={() => setOpen(false)}>
                    FAQ
                  </Link>
                  {/* <Link href="#apply" className="px-2 py-4 text-gray-700 hover:text-primary transition-colors" onClick={() => setOpen(false)}>
                    Apply Now
                  </Link> */}
                </div>
              </div>
            </div>
            <div className="flex-1" onClick={() => setOpen(false)} />
          </div>,
          document.body
        )
      }
    </header>
  );
}
