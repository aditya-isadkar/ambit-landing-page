import type { Metadata } from "next";
import { Jost } from "next/font/google";
import Script from "next/script"; // 1. Import Script component
import "./globals.css";

const jost = Jost({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ambit Finvest - Secured Business Loans",
  description: "Get fast, secure loans up to ₹3Cr in just 24 hours. Apply for secured business loans with competitive rates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jost.variable} antialiased overflow-x-hidden`}
      >
        {/* 2. Add the Google Tag script here */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17763188952"
          strategy="afterInteractive"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-17763188952');
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}