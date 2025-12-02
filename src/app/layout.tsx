import type { Metadata } from "next";
import { Jost } from "next/font/google";
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
        {children}
      </body>
    </html>
  );
}
