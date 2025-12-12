"use client";
import Header from "@/components/Header";
import BackgroundOne from "@/assets/background-1.jpg";
import BackgroundTwo from "@/assets/background-2.png";
import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ThankYou() {
  const router = useRouter();

  const message = useMemo(() => {
    return "Your application has been submitted. Our team will contact you shortly.";
  }, []);

  const handleSaveContact = () => {
    window.location.href = "tel:+1409331009";
  };

  useEffect(() => {
    try {
      const allow = sessionStorage.getItem("thankyou_access") === "1";
      if (!allow) {
        router.replace("/");
      } else {
        sessionStorage.removeItem("thankyou_access");
      }
    } catch {
      router.replace("/");
    }
  }, [router]);

  return (
    <main className="min-h-screen w-full overflow-x-hidden overflow-y-hidden">
      <Header alwaysVisible />
      <div
        className="relative min-h-screen flex flex-col items-center justify-start text-gray-900 px-4 py-6 pt-20"
        style={{
          backgroundImage: `url(${BackgroundOne.src})`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      >

        <div className="relative w-full max-w-2xl text-center space-y-6">
          <p className="text-xl sm:text-lg leading-relaxed px-4">{message}</p>
          <div className="w-48 mx-auto">
            <img src={BackgroundTwo.src} alt="Decorative Image" className="object-contain w-full" />
          </div>
          <button
            onClick={handleSaveContact}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-10 rounded-full text-2xl sm:text-xl transition-transform transform hover:scale-105"
          >
            Save Contact
          </button>
        </div>

      </div>
    </main>
  );
}
